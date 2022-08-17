/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { Product } from '../store/slices/productsSlice';
import '../styles/containers/productCard.scss';
import { selectThemeStatus } from '../store/features/theme/selectors';
import { useAppSelector } from '../store/hooks';
import { addProductToCart } from '../store/slices/cartSlice';
import UnfavoritedLogo from '../assets/unfavorited.svg';
import FavoritedLogo from '../assets/favorited.png';
import { addProductToFavorites, removeProductFromFavorites } from '../store/slices/favoritesSlice';
import Toast from './Toast';
import { selectFavoriteProductById } from '../store/features/favorites/selectors';
import { RootState } from '../store';

type ProductCardDetailedProps = {
  product: Product;
  showAddToCart?: boolean;
};
const ProductCardDetailed = ({ product, showAddToCart = true }: ProductCardDetailedProps) => {
  const themeState = useAppSelector(selectThemeStatus);
  const isFavorited = useAppSelector((state: RootState) => {
    return selectFavoriteProductById(state, product.id);
  });
  const dispatch = useDispatch();
  const [toastStatus, setToastStatus] = useState<boolean>(false);

  const handleFavoriting = () => {
    if (isFavorited) {
      dispatch(removeProductFromFavorites(product));
    } else {
      dispatch(addProductToFavorites(product));
    }
  };
  const handleAddToCart = () => {
    dispatch(addProductToCart(product));
    setToastStatus(true);
    setTimeout(() => setToastStatus(false), 2000);
  };
  const { name, price, image, status, id } = product;
  return (
    <div
      className="product-card-detailed"
      key={`product-card-detailed-${id}`}
      id={`product-card-detailed-${id}`}
    >
      <div className="product-card-detailed-container-listing">
        <div className="product-card-image-detailed" style={{ backgroundImage: `url(${image})` }} />
        <div className="product-card-detailed-stats-listing">
          <p className="product-card-detailed-stats-listing__par">{name}</p>
          <p
            className={classNames({
              'product-card-details-status-new': status === 'New',
              'product-card-details-status-restored': status === 'Restored',
            })}
          >
            {status}
          </p>
          <p className="product-card-detailed-stats-listing__par">{`$${price}`}</p>
        </div>
      </div>
      <div className="product-card-detailed-actions">
        <img
          onClick={handleFavoriting}
          style={{ width: '30px', height: '30px', cursor: 'pointer' }}
          src={isFavorited ? FavoritedLogo : UnfavoritedLogo}
          alt="favorite-icon"
        />
        <Toast open={toastStatus} message="Product added to cart" />
        {showAddToCart && (
          <button
            onClick={handleAddToCart}
            className={classNames({
              'product-card-detailed-actions__add-to-cart': true,
              'product-card-detailed-actions__add-to-cart-secondary': themeState,
            })}
            type="submit"
          >
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCardDetailed;
