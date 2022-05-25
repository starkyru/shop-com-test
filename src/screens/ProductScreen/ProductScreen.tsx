import React, { useEffect, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks';
import { fetchProduct } from '../../modules/Products/fetchProduct';
import {
  buildFetchProductURL,
  FetchProductParams,
} from '../../modules/Products/fetchProduct';
import { ProductScreenProps } from '../../types/navigationTypes';
import he from 'he';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export const ProductScreen = ({ route }: ProductScreenProps) => {
  const { id } = route.params;
  // const navigation = useNavigation<NavigationProductScreenProps>();
  const dispatch = useAppDispatch();
  // const handlePress = useCallback(() => {
  //   navigation.navigate('Category', { id, name });
  // }, [navigation, id, name]);

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
    <View style={styles.root}>
      {product && (
        <>
          <Text>{he.decode(product.name)}</Text>
        </>
      )}
    </View>
  );
};
