import axios from 'axios';
import config from 'react-native-ultimate-config';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ShopCountry } from '../../types';
import { FetchCategoriesParams } from '../Categories/categoriesSlice';

export type FetchProductParams = {
  publisherId: string;
  locale: string;
  site?: string;
  shipCountry?: ShopCountry;
  productId: string;
};

export type FetchProductActionParams = {
  fetchParams: FetchProductParams;
  baseUrl?: string;
};

export const buildFetchProductURL = (
  params: FetchProductParams,
  baseUrl = config.API_URL,
) => {
  const { publisherId, locale, site, shipCountry, productId } = params;
  const urlWithParams = new URL(`${baseUrl}/products/${productId}`);
  urlWithParams.searchParams.append('publisherId', publisherId);
  urlWithParams.searchParams.append('locale', locale);
  site && urlWithParams.searchParams.append('site', site);
  shipCountry && urlWithParams.searchParams.append('shipCountry', shipCountry);
  return urlWithParams.href;
};

export const fetchProduct = createAsyncThunk(
  'products/fetchProduct',
  async (params: FetchProductActionParams) => {
    const url = buildFetchProductURL(params.fetchParams, params.baseUrl);

    const response = await axios.get(url);
    return response.data;
  },
);
