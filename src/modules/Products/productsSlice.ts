import { createSlice } from '@reduxjs/toolkit';
import {
  extractActionErrorText,
  requestFailed,
  requestLoading,
  RequestStatus,
  requestSuccessful,
} from '../../utils/requestStatus';
import { ShopProduct } from '../../types';
import { buildFetchProductsURL, fetchProducts } from './fetchProducts';

export interface ProductsState {
  products: { [key: string]: ShopProduct[] };
  lastItem: { [key: string]: number };
  statuses: { [key: string]: RequestStatus };
}

const initialState: ProductsState = {
  products: {},
  lastItem: {},
  statuses: {},
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        const hash = buildFetchProductsURL(action.meta.arg, false);
        state.statuses[hash] = requestLoading();
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const hash = buildFetchProductsURL(action.meta.arg, false);
        state.statuses[hash] = requestSuccessful();
        /**
         * Here we can run into multiple issues, like run condition.
         * Also, no paging logic is made yet.
         */
        if (!state.products[hash]) {
          state.products[hash] = action.payload.products;
        } else {
          state.products[hash].concat(action.payload.products);
        }
        state.lastItem[hash] =
          (action.meta.arg.start ?? 0) + action.payload.products.length;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        const hash = buildFetchProductsURL(action.meta.arg, false);
        state.statuses[hash] = requestFailed(extractActionErrorText(action));
      });
  },
});

export default productsSlice.reducer;
