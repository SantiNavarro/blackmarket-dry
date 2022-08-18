/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */

import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import { searchProducts } from '../api/queries';
import { selectUserData } from '../store/features/api/selectors';
import { useAppSelector } from '../store/hooks';
import { Product } from '../store/slices/productsSlice';
import '../styles/containers/allProducts.scss';
import Layout from '../components/Layout';
import ProductCardDetailed from '../components/ProductCardDetailed';
import { selectSearchMatches, selectSearchText } from '../store/features/search/selectors';
import { storeSearchMatches } from '../store/slices/searchSlice';

const Search = () => {
  const userState = useAppSelector(selectUserData);
  const searchTextState = useAppSelector(selectSearchText);
  const searchMatchesState = useAppSelector(selectSearchMatches);

  const searchMutation = useMutation(() => searchProducts(userState, searchTextState));
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await searchMutation.mutateAsync();

      if (!searchMutation.error) {
        dispatch(storeSearchMatches(response.data?.products));
      }
    };
    fetchProducts();
  }, [searchTextState]);

  return (
    <Layout>
      {searchMutation.isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: '1.2rem' }}>
          <CircularProgress />
        </Box>
      ) : (
        <div className="all-products">
          <div className="all-products-listing">
            {searchMatchesState?.map((product: Product) => (
              <ProductCardDetailed product={product} key={`product-card-render-${product.id}}`} />
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Search;
