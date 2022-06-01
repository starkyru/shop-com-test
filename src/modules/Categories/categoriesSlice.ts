import { createSlice } from '@reduxjs/toolkit';
import { ShopCategory, ShopCountry } from '../../types';
import {
  extractActionErrorText,
  requestFailed,
  requestInactive,
  requestLoading,
  RequestStatus,
  requestSuccessful,
} from '../../utils/requestStatus';
import { fetchCategories } from './fetchCategories';

export interface CategoriesState {
  list: ShopCategory[];
  status: RequestStatus;
}

const initialState: CategoriesState = {
  list: [],
  status: requestInactive(),
};

export type FetchCategoriesParams = {
  publisherId: string;
  locale: string;
  site?: string;
  shipCountry?: ShopCountry;
  /**
   * Only Market America products
   */
  onlyMaProducts?: boolean;
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.pending, state => {
        state.status = requestLoading();
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = requestSuccessful();
        state.list = action.payload.categories ?? [];
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = requestFailed(extractActionErrorText(action));
      });
  },
});

export default categoriesSlice.reducer;

// export const selectCategoryById = (state, categoryId) =>
//   state.categories.list.find(category => category.id === categoryId);

// export const { setCategoriesList } = categoriesSlice.actions;
