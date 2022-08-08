import classNames from 'classnames/bind';
import { Product } from '../store/slices/productsSlice';
import '../styles/containers/productCard.scss';
import FavoriteLogo from '../assets/favorite.svg';

type ProductCardProps = {
  product: Product;
};
const ProductCard = ({ product }: ProductCardProps) => {
  const { name, price, image, status } = product;
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
            <img
              className="product-card-details__favorite"
              src={FavoriteLogo}
              alt="favorite-logo"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
