import React, { useEffect, useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
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
import { unescapeName } from '../../utils/string';
import { ScreenWrapper } from '../../components/ScreenWrapper';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  title: {
    fontWeight: 'bold',
    height: 50,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 20,
    paddingBottom: 6,
    fontSize: 16,
    textAlignVertical: 'center',
    alignItems: 'center',
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
    <ScreenWrapper>
      <View style={styles.root}>
        <Text style={styles.title}>{unescapeName(name)}</Text>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          {products &&
            products.products &&
            products.products.map(product => (
              <ProductListItemView
                key={product.id}
                id={product.id}
                name={product.name}
              />
            ))}
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};
