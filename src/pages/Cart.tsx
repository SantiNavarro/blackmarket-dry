/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import { useAppSelector } from '../store/hooks';
import '../styles/containers/allProducts.scss';
import '../styles/containers/cart.scss';
import Layout from '../components/Layout';
import { selectCartProducts, selectCartTotal } from '../store/features/cart/selectors';
import { selectFavoriteProducts } from '../store/features/favorites/selectors';
import FavoriteCard from '../components/FavoriteCard';
import CartCard from '../components/CartCard';
import { CartProduct, clearCart } from '../store/slices/cartSlice';
import { Product } from '../store/slices/productsSlice';
import { selectThemeStatus } from '../store/features/theme/selectors';

const Cart = () => {
  const cartProducts = useAppSelector(selectCartProducts);
  const favoriteProducts = useAppSelector(selectFavoriteProducts);
  const cartTotal = useAppSelector(selectCartTotal);
  const themeState = useAppSelector(selectThemeStatus);
  const dispatch = useDispatch();

  return (
    <Layout>
      <div className="all-products">
        <div className="cart-section">
          {cartProducts.length > 0 ? (
            <div className="cart-header">
              <h2>My shopping cart</h2>
              <button
                className={classNames({
                  'cart-total__button': true,
                  'cart-total__button-secondary': themeState,
                })}
                type="button"
                onClick={() => dispatch(clearCart())}
              >
                Clear cart
              </button>
            </div>
          ) : (
            <h2>My shopping cart</h2>
          )}

          <div className="cart-listing">
            {cartProducts?.map((product: CartProduct) => (
              <CartCard product={product} key={`cart-card-render-${product.id}}`} />
            ))}
          </div>
          <div className="cart-total">
            <h2>TOTAL</h2>
            <div />
            <h2>{`$${cartTotal}`}</h2>
            <button
              className={classNames({
                'cart-total__button': true,
                'cart-total__button-secondary': themeState,
              })}
              type="button"
            >
              Go to checkout
            </button>
          </div>
        </div>
        <div className="cart-section">
          <h2>My favourites</h2>
          <div className="cart-listing">
            {favoriteProducts?.map((product: Product) => (
              <FavoriteCard product={product} key={`favorite-card-render-${product.id}}`} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
