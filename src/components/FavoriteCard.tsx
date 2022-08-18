/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { Product } from '../store/slices/productsSlice';
import '../styles/containers/productCard.scss';
import { selectThemeStatus } from '../store/features/theme/selectors';
import { useAppSelector } from '../store/hooks';
import { addProductToCart } from '../store/slices/cartSlice';
import { addProductToFavorites, removeProductFromFavorites } from '../store/slices/favoritesSlice';
import Toast from './Toast';
import { selectFavoriteProductById } from '../store/features/favorites/selectors';
import { RootState } from '../store';
import { useIsSmallDevice } from '../hooks/useWindowSize';

type FavoriteCardProps = {
  product: Product;
};
const FavoriteCard = ({ product }: FavoriteCardProps) => {
  const themeState = useAppSelector(selectThemeStatus);
  const isFavorited = useAppSelector((state: RootState) => {
    return selectFavoriteProductById(state, product.id);
  });
  const isSmallDevice = useIsSmallDevice();

  const dispatch = useDispatch();
  const [toastStatus, setToastStatus] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const handleFavoriting = () => {
    if (isFavorited) {
      dispatch(removeProductFromFavorites(product));
    } else {
      dispatch(addProductToFavorites(product));
    }
  };
  const handleAddToCart = () => {
    dispatch(addProductToCart(product));
    setLoading(true);
    // mocking add to cart API behavior
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    setTimeout(() => {
      setToastStatus(true);
    }, 1000);
    setTimeout(() => {
      setToastStatus(false);
    }, 2000);
  };
  const { name, price, image, status, id } = product;
  return isSmallDevice ? (
    <div
      className="favorite-card-detailed"
      key={`product-card-detailed-${id}`}
      id={`product-card-detailed-${id}`}
    >
      <div className="product-card-detailed-container">
        <div className="favorite-card-header">
          <p className="product-card-detailed-stats__par">{name}</p>

          <div
            className="product-card-image-detailed"
            style={{ backgroundImage: `url(${image})` }}
          />
        </div>
        <div className="product-card-detailed-stats">
          <p
            className={classNames({
              'product-card-details-status-new': status === 'New',
              'product-card-details-status-restored': status === 'Restored',
            })}
          >
            {status}
          </p>
          <p className="favorite-card-remove" onClick={handleFavoriting}>
            Remove from favorites
          </p>
        </div>
      </div>
      <div className="product-card-detailed-actions">
        <p className="product-card-detailed-stats__par">{`$${price}`}</p>

        <Toast open={toastStatus} message="Product added to cart" />

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: '1.2rem' }}>
            <CircularProgress />
          </Box>
        ) : (
          <button
            onClick={handleAddToCart}
            className={classNames({
              'product-card-detailed-actions__add-to-cart': true,
              'product-card-detailed-actions__add-to-cart-secondary': themeState,
            })}
            type="submit"
          >
            Send to cart
          </button>
        )}
      </div>
    </div>
  ) : (
    <div
      className="favorite-card-detailed"
      key={`product-card-detailed-${id}`}
      id={`product-card-detailed-${id}`}
    >
      <div className="product-card-detailed-container">
        <div className="product-card-image-detailed" style={{ backgroundImage: `url(${image})` }} />
        <div className="product-card-detailed-stats">
          <p className="product-card-detailed-stats__par">{name}</p>
          <p
            className={classNames({
              'product-card-details-status-new': status === 'New',
              'product-card-details-status-restored': status === 'Restored',
            })}
          >
            {status}
          </p>
          <p className="product-card-detailed-stats__par">{`$${price}`}</p>
        </div>
      </div>
      <div className="product-card-detailed-actions">
        <p className="favorite-card-remove" onClick={handleFavoriting}>
          Remove from favorites
        </p>
        <Toast open={toastStatus} message="Product added to cart" />

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: '1.2rem' }}>
            <CircularProgress />
          </Box>
        ) : (
          <button
            onClick={handleAddToCart}
            className={classNames({
              'product-card-detailed-actions__add-to-cart': true,
              'product-card-detailed-actions__add-to-cart-secondary': themeState,
            })}
            type="submit"
          >
            Send to cart
          </button>
        )}
      </div>
    </div>
  );
};

export default FavoriteCard;
