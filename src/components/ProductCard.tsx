/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { Product } from '../store/slices/productsSlice';
import '../styles/containers/productCard.scss';
import UnfavoritedLogo from '../assets/unfavorited.svg';
import FavoritedLogo from '../assets/favorited.png';

import { addProductToFavorites, removeProductFromFavorites } from '../store/slices/favoritesSlice';
import { useAppSelector } from '../store/hooks';
import { RootState } from '../store';
import { selectFavoriteProductById } from '../store/features/favorites/selectors';

type ProductCardProps = {
  product: Product;
};
const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useDispatch();
  const { name, price, image, status, id } = product;
  const isFavorited = useAppSelector((state: RootState) => {
    return selectFavoriteProductById(state, product.id);
  });
  const handleFavoriting = () => {
    if (isFavorited) {
      dispatch(removeProductFromFavorites(product));
    } else {
      dispatch(addProductToFavorites(product));
    }
  };
  return (
    <div className="product-card" key={`product-card-${id}`} id={`product-card-${id}`}>
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
            <img
              onClick={handleFavoriting}
              style={{ width: '30px', height: '30px' }}
              src={isFavorited ? FavoritedLogo : UnfavoritedLogo}
              alt="favorite-icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
