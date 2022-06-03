import config from 'react-native-ultimate-config';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { FetchCategoriesParams } from './categoriesSlice';

export type FetchCategoriesActionParams = {
  fetchParams: FetchCategoriesParams;
  baseUrl?: string;
};

export const buildFetchCategoriesURL = (
  params: FetchCategoriesParams,
  baseUrl: string = config.API_URL,
) => {
  const { publisherId, locale, site, shipCountry, onlyMaProducts } = params;
  const urlWithParams = new URL(`${baseUrl}/categories`);
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
  async (params: FetchCategoriesActionParams) => {
    const url = buildFetchCategoriesURL(params.fetchParams, params.baseUrl);

    const response = await axios.get(url);
    return response.data;
  },
);
