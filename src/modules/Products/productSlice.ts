import { createSlice } from '@reduxjs/toolkit';
import {
  extractActionErrorText,
  requestFailed,
  requestLoading,
  RequestStatus,
  requestSuccessful,
} from '../../utils/requestStatus';
import { ShopProductFull } from '../../types';
import { buildFetchProductURL, fetchProduct } from './fetchProduct';

export interface ProductState {
  products: { [key: string]: ShopProductFull };
  statuses: { [key: string]: RequestStatus };
}

const initialState: ProductState = {
  products: {},
  statuses: {},
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProduct.pending, (state, action) => {
        const hash = buildFetchProductURL(action.meta.arg.fetchParams);

        state.statuses[hash] = requestLoading();
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        const hash = buildFetchProductURL(action.meta.arg.fetchParams);
        state.statuses[hash] = requestSuccessful();

        state.products[hash] = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        const hash = buildFetchProductURL(action.meta.arg.fetchParams);

        state.statuses[hash] = requestFailed(extractActionErrorText(action));
      });
  },
});

export default productSlice.reducer;
