import classNames from 'classnames/bind';
import { Product } from '../store/slices/productsSlice';
import '../styles/containers/productCard.scss';
import FavoriteLogo from '../assets/favorite.svg';
import { selectThemeStatus } from '../store/features/theme/selectors';
import { useAppSelector } from '../store/hooks';

type ProductCardDetailedProps = {
  product: Product;
};
const ProductCardDetailed = ({ product }: ProductCardDetailedProps) => {
  const themeState = useAppSelector(selectThemeStatus);

  const { name, price, image, status } = product;
  return (
    <div className="product-card-detailed">
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
        <img className="product-card-details__favorite" src={FavoriteLogo} alt="favorite-logo" />
        <button
          className={classNames({
            'product-card-detailed-actions__add-to-cart': true,
            'product-card-detailed-actions__add-to-cart-secondary': themeState,
          })}
          type="submit"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCardDetailed;
