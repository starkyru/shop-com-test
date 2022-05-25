import React, { useEffect, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  CategoryScreenProps,
  NavigationCategoryScreenProps,
} from '../../types/navigationTypes';
import {
  buildFetchProductsURL,
  fetchProducts,
  FetchProductsParams,
} from '../../modules/Products/fetchProducts';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks';
import { ProductListItemView } from '../../modules/Products/ProductListItemView';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export const CategoryScreen = ({ route }: CategoryScreenProps) => {
  const { id, name } = route.params;
  // const navigation = useNavigation<NavigationProductScreenProps>();
  const dispatch = useAppDispatch();
  // const handlePress = useCallback(() => {
  //   navigation.navigate('Category', { id, name });
  // }, [navigation, id, name]);

  const fetchParams = useMemo(() => {
    return {
      publisherId: 'TEST',
      locale: 'en_US',
      site: 'shop',
      shipCountry: 'US',
      onlyMaProducts: true,
      categoryId: id,
    } as FetchProductsParams;
  }, [id]);
  const hash = useMemo(() => buildFetchProductsURL(fetchParams), [fetchParams]);
  const products = useAppSelector(state => state.products.products[hash]);

  useEffect(() => {
    dispatch(fetchProducts(fetchParams));
  }, [dispatch, fetchParams]);

  return (
    <View style={styles.root}>
      <Text>{name}</Text>
      {products &&
        products.products &&
        products.products.map(product => (
          <ProductListItemView
            key={product.id}
            id={product.id}
            name={product.name}
          />
        ))}
    </View>
  );
};
