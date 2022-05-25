import axios from 'axios';
import config from 'react-native-ultimate-config';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ShopCountry } from '../../types';

export type FetchProductParams = {
  publisherId: string;
  locale: string;
  site?: string;
  shipCountry?: ShopCountry;
  productId: string;
};

export const buildFetchProductURL = (params: FetchProductParams) => {
  const { publisherId, locale, site, shipCountry, productId } = params;
  const UrlWithParams = new URL(`${config.API_URL}/products/${productId}`);
  UrlWithParams.searchParams.append('publisherId', publisherId);
  UrlWithParams.searchParams.append('locale', locale);
  site && UrlWithParams.searchParams.append('site', site);
  shipCountry && UrlWithParams.searchParams.append('shipCountry', shipCountry);
  return UrlWithParams.href;
};

export const fetchProduct = createAsyncThunk(
  'products/fetchProduct',
  async (params: FetchProductParams) => {
    const url = buildFetchProductURL(params);

    const response = await axios.get(url);
    return response.data;
  },
);
