import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { Product } from '../store/slices/productsSlice';
import '../styles/containers/productCard.scss';
// import FavoriteLogo from '../assets/favorite.svg';
import { selectThemeStatus } from '../store/features/theme/selectors';
import { useAppSelector } from '../store/hooks';
import { addProductToCart } from '../store/slices/cartSlice';

type ProductCardDetailedProps = {
  product: Product;
};
const ProductCardDetailed = ({ product }: ProductCardDetailedProps) => {
  const themeState = useAppSelector(selectThemeStatus);
  const dispatch = useDispatch();

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
        {/* <div
          className="product-card-details__favorite"
          src={FavoriteLogo}
          style={{
            backgroundColor: favorited ? '#FFFFFF' : '#000000',
            WebkitMask: `url(${FavoriteLogo}) no-repeat center`,
            mask: `url(${FavoriteLogo}) no-repeat center`,
          }}
        /> */}
        <button
          onClick={() => dispatch(addProductToCart(product))}
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
