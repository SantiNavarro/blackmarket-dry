/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import { getListOfProducts } from '../api/queries';
import { selectUserData } from '../store/features/api/selectors';
import { selectFirstFourProducts, selectProducts } from '../store/features/products/selectors';
import { useAppSelector } from '../store/hooks';
import { Product, storeProducts, storeNextPageOfProducts } from '../store/slices/productsSlice';
import '../styles/containers/allProducts.scss';
import Layout from '../components/Layout';
import { selectThemeStatus } from '../store/features/theme/selectors';
import ProductCardDetailed from '../components/ProductCardDetailed';

const Products = () => {
  const productsState = useAppSelector(selectFirstFourProducts);
  const allProducts = useAppSelector(selectProducts);
  const themeState = useAppSelector(selectThemeStatus);

  const userState = useAppSelector(selectUserData);
  const dispatch = useDispatch();
  const { mutateAsync, error, isLoading } = useMutation('products', getListOfProducts);

  const loadMoreProducts = async () => {
    const response = await mutateAsync(userState);

    if (!error) {
      dispatch(storeNextPageOfProducts(response.data?.products));
    }
  };

  return (
    <Layout>
      <div className="all-products">
        <div className="all-products-listing">
          {allProducts?.map((product: Product) => (
            <ProductCardDetailed product={product} key={`product-card-render-${product.id}}`} />
          ))}
        </div>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: '1.2rem' }}>
            <CircularProgress />
          </Box>
        ) : (
          <p
            className={classNames({
              'all-products-load-more': true,
              'all-products-load-more-secondary': themeState,
            })}
            onClick={loadMoreProducts}
          >
            Load more
          </p>
        )}
      </div>
    </Layout>
  );
};

export default Products;
