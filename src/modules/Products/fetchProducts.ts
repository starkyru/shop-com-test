import axios from 'axios';
import config from 'react-native-ultimate-config';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ShopCountry } from '../../types';

export type FetchProductsParams = {
  publisherId: string;
  locale: string;
  site?: string;
  shipCountry?: ShopCountry;
  /**
   * Only Market America products
   */
  onlyMaProducts?: boolean;
  /**
   * search term
   */
  term?: string;
  /**
   * perPage count of where to start including in the return
   */
  start?: number;
  /**
   * up to 50 products per page, 15 products is the default when parm is not used
   */
  perPage?: number;
  /**
   * locate these values in the historgrams returned when searching products, then use them for filtering
   */
  brandId?: string;
  /**
   * locate these values in the historgrams returned when searching products, then use them for filtering
   */
  categoryId?: string;
  /**
   * locate these values in the historgrams returned when searching products, then use them for filtering
   */
  sellerId?: string;
  /**
   * use to filter the return set. example [15.01 TO 25.00]. auto distributed range provided in histogram
   */
  priceRangeId?: string;
};

export const buildFetchProductsURL = (
  params: FetchProductsParams,
  addPaging: boolean = true,
) => {
  const {
    publisherId,
    locale,
    site,
    shipCountry,
    onlyMaProducts,
    term,
    start,
    categoryId,
    perPage,
    priceRangeId,
    sellerId,
    brandId,
  } = params;
  const urlWithParams = new URL(`${config.API_URL}/products`);
  urlWithParams.searchParams.append('publisherId', publisherId);
  urlWithParams.searchParams.append('locale', locale);
  site && urlWithParams.searchParams.append('site', site);
  shipCountry && urlWithParams.searchParams.append('shipCountry', shipCountry);
  onlyMaProducts !== undefined &&
    urlWithParams.searchParams.append(
      'onlyMaProducts',
      onlyMaProducts.toString(),
    );
  term && urlWithParams.searchParams.append('term', term);
  addPaging &&
    typeof start === 'number' &&
    urlWithParams.searchParams.append('start', start.toString());
  addPaging &&
    typeof perPage === 'number' &&
    urlWithParams.searchParams.append('perPage', perPage.toString());
  categoryId && urlWithParams.searchParams.append('categoryId', categoryId);
  priceRangeId &&
    urlWithParams.searchParams.append('priceRangeId', priceRangeId);
  sellerId && urlWithParams.searchParams.append('sellerId', sellerId);
  brandId && urlWithParams.searchParams.append('brandId', brandId);
  return urlWithParams.href;
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params: FetchProductsParams) => {
    const url = buildFetchProductsURL(params);

    const response = await axios.get(url);
    return response.data;
  },
);
