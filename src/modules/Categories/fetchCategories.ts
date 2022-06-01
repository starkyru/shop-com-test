import config from 'react-native-ultimate-config';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { FetchCategoriesParams } from './categoriesSlice';

const buildFetchCategoriesURL = (params: FetchCategoriesParams) => {
  const { publisherId, locale, site, shipCountry, onlyMaProducts } = params;
  const urlWithParams = new URL(`${config.API_URL}/categories`);
  urlWithParams.searchParams.append('publisherId', publisherId);
  urlWithParams.searchParams.append('locale', locale);
  site && urlWithParams.searchParams.append('site', site);
  shipCountry && urlWithParams.searchParams.append('shipCountry', shipCountry);
  onlyMaProducts !== undefined &&
    urlWithParams.searchParams.append(
      'onlyMaProducts',
      onlyMaProducts.toString(),
    );
  return urlWithParams.href;
};
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (params: FetchCategoriesParams) => {
    const url = buildFetchCategoriesURL(params);

    const response = await axios.get(url);
    return response.data;
  },
);
