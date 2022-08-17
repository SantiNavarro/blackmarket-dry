/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import '../styles/containers/productCard.scss';
import { addProductToCart, CartProduct, removeProductFromCart } from '../store/slices/cartSlice';
import { useIsSmallDevice } from '../hooks/useWindowSize';

type CartCardProps = {
  product: CartProduct;
};
const CartCard = ({ product }: CartCardProps) => {
  const dispatch = useDispatch();
  const isSmallDevice = useIsSmallDevice();

  const { name, price, image, status, id, amount } = product;
  return (
    <div className="favorite-card-detailed" key={`product-card-detailed-${id}`}>
      {isSmallDevice ? (
        <div className="product-card-detailed-container">
          <div>
            <p className="product-card-detailed-stats__par">{name}</p>
            <div
              className="product-card-image-detailed"
              style={{ backgroundImage: `url(${image})` }}
            />
          </div>

          <div className="product-card-detailed-stats">
            <div className="product-card-details-mobile">
              <p
                className={classNames({
                  'product-card-details-status-new': status === 'New',
                  'product-card-details-status-restored': status === 'Restored',
                })}
              >
                {status}
              </p>
              <p
                className="favorite-card-remove"
                onClick={() => dispatch(removeProductFromCart(product))}
              >
                Remove item
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="product-card-detailed-container">
          <div
            className="product-card-image-detailed"
            style={{ backgroundImage: `url(${image})` }}
          />
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
            <p
              className="favorite-card-remove"
              onClick={() => dispatch(removeProductFromCart(product))}
            >
              Remove item
            </p>
          </div>
        </div>
      )}
      <div className="product-card-detailed-actions">
        <p className="product-card-detailed-stats__par">{`$${price}`}</p>

        <div className="cart-card-count">
          <button type="submit" onClick={() => dispatch(removeProductFromCart(product))}>
            -
          </button>
          <p>{amount}</p>
          <button type="submit" onClick={() => dispatch(addProductToCart(product))}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
