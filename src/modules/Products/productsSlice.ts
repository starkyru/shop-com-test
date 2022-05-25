import { createSlice } from '@reduxjs/toolkit';
import {
  extractActionErrorText,
  requestFailed,
  requestLoading,
  RequestStatus,
  requestSuccessful,
} from '../../utils/requestStatus';
import { ShopProductsResponse } from '../../types';
import { buildFetchProductsURL, fetchProducts } from './fetchProducts';

export interface ProductsState {
  products: { [key: string]: ShopProductsResponse };
  statuses: { [key: string]: RequestStatus };
}

const initialState: ProductsState = {
  products: {},
  statuses: {},
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        const hash = buildFetchProductsURL(action.meta.arg);
        state.statuses[hash] = requestLoading();
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const hash = buildFetchProductsURL(action.meta.arg);
        state.statuses[hash] = requestSuccessful();
        /**
         * Here we can run into multiple issues, like run condition.
         * Also, no paging logic is made yet.
         */
        state.products[hash] = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        const hash = buildFetchProductsURL(action.meta.arg);
        state.statuses[hash] = requestFailed(extractActionErrorText(action));
      });
  },
});

export default productsSlice.reducer;
