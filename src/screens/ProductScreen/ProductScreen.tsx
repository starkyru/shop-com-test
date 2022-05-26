import React, { useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks';
import {
  buildFetchProductURL,
  fetchProduct,
  FetchProductParams,
} from '../../modules/Products/fetchProduct';
import { ProductScreenProps } from '../../types/navigationTypes';
import { ProductView } from '../../modules/Products/ProductView';
import { ProductSkeleton } from '../../modules/Products/ProductSkeleton';
import { ScreenWrapper } from '../../components/ScreenWrapper';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export const ProductScreen = ({ route }: ProductScreenProps) => {
  const { id } = route.params;

  const dispatch = useAppDispatch();

  /**
   * Some issues with an api. Products are listed with id: number, but we're fetching details with id: string;
   */

  const fetchParams = useMemo(() => {
    return {
      publisherId: 'TEST',
      locale: 'en_US',
      site: 'shop',
      shipCountry: 'US',
      productId: id.toString(),
    } as FetchProductParams;
  }, [id]);

  const hash = useMemo(() => buildFetchProductURL(fetchParams), [fetchParams]);
  const product = useAppSelector(state => state.product.products[hash]);

  useEffect(() => {
    dispatch(fetchProduct(fetchParams));
  }, [dispatch, fetchParams]);

  return (
    <ScreenWrapper>
      <View style={styles.root}>
        {product ? <ProductView product={product} /> : <ProductSkeleton />}
      </View>
    </ScreenWrapper>
  );
};
