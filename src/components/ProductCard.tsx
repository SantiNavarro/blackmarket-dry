/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useState } from 'react';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { Product } from '../store/slices/productsSlice';
import '../styles/containers/productCard.scss';
import UnfavoriteLogo from '../assets/favorite.svg';
import FavoritedLogo from '../assets/favorite.png';

import { addProductToFavorites, removeProductFromFavorites } from '../store/slices/favoritesSlice';

type ProductCardProps = {
  product: Product;
};
const ProductCard = ({ product }: ProductCardProps) => {
  const [favorited, setFavorited] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { name, price, image, status } = product;

  const handleFavoriting = () => {
    if (favorited) {
      dispatch(removeProductFromFavorites(product));
      setFavorited(false);
    } else {
      dispatch(addProductToFavorites(product));
      setFavorited(true);
    }
  };
  return (
    <div className="product-card">
      <div className="product-card-container">
        <div className="product-card-image" style={{ backgroundImage: `url(${image})` }} />
        <div className="product-card-details">
          <div className="product-card-details__top">
            <p>{`$${price}`}</p>

            <p
              className={classNames({
                'product-card-details-status-new': status === 'New',
                'product-card-details-status-restored': status === 'Restored',
              })}
            >
              {status}
            </p>
          </div>
          <div className="product-card-details__bottom">
            <p>{name}</p>

            <div
              className="product-card-details__favorited"
              onClick={handleFavoriting}
              style={{
                backgroundColor: favorited ? '#FFFFFF' : '#000000',
                WebkitMask: `url(${favorited ? FavoritedLogo : UnfavoriteLogo}) no-repeat center`,
                mask: `url(${favorited ? FavoritedLogo : UnfavoriteLogo}) no-repeat center`,
              }}
            />
            <img src={FavoritedLogo} alt="fav" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
