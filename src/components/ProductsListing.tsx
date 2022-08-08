/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getListOfProducts } from '../api/queries';
import { selectUserData } from '../store/features/api/selectors';
import { selectFirstFourProducts, selectProducts } from '../store/features/products/selectors';
import { useAppSelector } from '../store/hooks';
import { Product, storeProducts } from '../store/slices/productsSlice';
import '../styles/containers/productsListing.scss';
import Modal from './Modal';
import ProductCard from './ProductCard';

const ProductsListing = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const productsState = useAppSelector(selectFirstFourProducts);
  const allProducts = useAppSelector(selectProducts);

  const userState = useAppSelector(selectUserData);
  const dispatch = useDispatch();
  const { mutateAsync, error } = useMutation('products', getListOfProducts);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await mutateAsync(userState);

      if (!error) {
        dispatch(storeProducts(response.data?.products));
      }
    };
    fetchProducts();
  }, [dispatch, mutateAsync, error, userState]);

  return (
    <div className="products-listing">
      <div className="products-listing-container">
        {productsState?.map((product: Product) => (
          <ProductCard product={product} key={`product-card-render-${product.id}}`} />
        ))}
      </div>
      <p onClick={() => navigate('/products')} className="products-listing-see-all">
        See all
      </p>
    </div>
  );
};

export default ProductsListing;
