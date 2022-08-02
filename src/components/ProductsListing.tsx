/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { getListOfProducts } from '../api/queries';
import { selectUserData } from '../store/features/api/selectors';
import { selectProducts } from '../store/features/products/selectors';
import { useAppSelector } from '../store/hooks';
import { storeProducts } from '../store/slices/productsSlice';
import '../styles/containers/productsListing.scss';

const ProductsListing = () => {
  const productsState = useAppSelector(selectProducts);
  const userState = useAppSelector(selectUserData);
  const dispatch = useDispatch();
  const { mutateAsync, error } = useMutation('products', getListOfProducts);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await mutateAsync(userState);

      if (!error) {
        dispatch(storeProducts(response.data?.products));
      }
    };
    fetchProducts();
  }, [dispatchEvent]);

  return <p className="products-listing-container">{`productsListing:${productsState.length}`}</p>;
};

export default ProductsListing;
