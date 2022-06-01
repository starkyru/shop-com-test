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
  const urlWithParams = new URL(`${config.API_URL}/products/${productId}`);
  urlWithParams.searchParams.append('publisherId', publisherId);
  urlWithParams.searchParams.append('locale', locale);
  site && urlWithParams.searchParams.append('site', site);
  shipCountry && urlWithParams.searchParams.append('shipCountry', shipCountry);
  return urlWithParams.href;
};

export const fetchProduct = createAsyncThunk(
  'products/fetchProduct',
  async (params: FetchProductParams) => {
    const url = buildFetchProductURL(params);

    const response = await axios.get(url);
    return response.data;
  },
);
