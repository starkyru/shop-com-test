import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ShopCategory, ShopCountry } from '../../types';
import {
  extractActionErrorText,
  requestFailed,
  requestInactive,
  requestLoading,
  RequestStatus,
  requestSuccessful,
} from '../../utils/requestStatus';
import axios from 'axios';
import config from 'react-native-ultimate-config';

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

const buildFetchCategoriesURL = (params: FetchCategoriesParams) => {
  const { publisherId, locale, site, shipCountry, onlyMaProducts } = params;
  const UrlWithParams = new URL(`${config.API_URL}/categories`);
  UrlWithParams.searchParams.append('publisherId', publisherId);
  UrlWithParams.searchParams.append('locale', locale);
  site && UrlWithParams.searchParams.append('site', site);
  shipCountry && UrlWithParams.searchParams.append('shipCountry', shipCountry);
  onlyMaProducts !== undefined &&
    UrlWithParams.searchParams.append(
      'onlyMaProducts',
      onlyMaProducts.toString(),
    );
  return UrlWithParams.href;
};
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (params: FetchCategoriesParams) => {
    const url = buildFetchCategoriesURL(params);

    const response = await axios.get(url);
    return response.data;
  },
);

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
