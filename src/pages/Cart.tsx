/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */

import { useAppSelector } from '../store/hooks';
import { Product } from '../store/slices/productsSlice';
import '../styles/containers/allProducts.scss';
import Layout from '../components/Layout';
import ProductCardDetailed from '../components/ProductCardDetailed';
import { selectCartProducts } from '../store/features/cart/selectors';
import { selectFavoriteProducts } from '../store/features/favorites/selectors';

const Products = () => {
  const cartProducts = useAppSelector(selectCartProducts);
  const favoriteProducts = useAppSelector(selectFavoriteProducts);

  return (
    <Layout>
      <div className="all-products">
        <h2>Cart</h2>
        <div className="all-products-listing">
          {cartProducts?.map((product: Product) => (
            <ProductCardDetailed
              showAddToCart={false}
              product={product}
              key={`product-card-render-${product.id}}`}
            />
          ))}
        </div>
        <h2>Favorites</h2>
        <div className="all-products-listing">
          {favoriteProducts?.map((product: Product) => (
            <ProductCardDetailed
              showAddToCart={false}
              product={product}
              key={`product-card-render-${product.id}}`}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
