import categoriesReducer from './modules/Categories/categoriesSlice';
import productsReducer from './modules/Products/productsSlice';
import productReducer from './modules/Products/productSlice';

export const createRootReducer = () => ({
  categories: categoriesReducer,
  products: productsReducer,
  product: productReducer,
});
