import React, { useEffect, useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { CategoryScreenProps } from '../../types/navigationTypes';
import {
  buildFetchProductsURL,
  fetchProducts,
  FetchProductsParams,
} from '../../modules/Products/fetchProducts';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks';
import { ProductListItemView } from '../../modules/Products/ProductListItemView';
import { unescapeName } from '../../utils/string';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { ShopProduct } from '../../types';
import { Spinner } from 'native-base';
import { PRODUCTS_PER_PAGE } from '../../utils/const';
import { isRequestLoading } from '../../utils/requestStatus';

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

const keyExtractor = (item: ShopProduct) => item.id.toString();

export const CategoryScreen = ({ route }: CategoryScreenProps) => {
  const { id, name } = route.params;
  // const navigation = useNavigation<NavigationProductScreenProps>();
  const dispatch = useAppDispatch();
  // const handlePress = useCallback(() => {
  //   navigation.navigate('Category', { id, name });
  // }, [navigation, id, name]);

  const initialFetchParams = useMemo(() => {
    return {
      publisherId: 'TEST',
      locale: 'en_US',
      site: 'shop',
      shipCountry: 'US',
      onlyMaProducts: true,
      categoryId: id,
      perPage: PRODUCTS_PER_PAGE,
    } as FetchProductsParams;
  }, [id]);

  const hash = useMemo(
    () => buildFetchProductsURL(initialFetchParams, false),
    [initialFetchParams],
  );
  const products = useAppSelector(state => state.products.products[hash]);
  const status = useAppSelector(state => state.products.statuses[hash]);
  const currentCategory = useAppSelector(state =>
    state.categories.list.find(category => category.id === id),
  );

  useEffect(() => {
    dispatch(fetchProducts(initialFetchParams));
  }, [dispatch, initialFetchParams]);

  const renderItem = ({ item }: { item: ShopProduct }) => {
    return <ProductListItemView id={item.id} name={item.name} />;
  };

  const handleEndReached = () => {
    if (
      currentCategory &&
      status &&
      products &&
      !isRequestLoading(status) &&
      products.length < currentCategory.productCount
    ) {
      dispatch(
        fetchProducts({
          ...initialFetchParams,
          start: products.length ?? 0,
        }),
      );
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.root}>
        <Text style={styles.title}>{unescapeName(name)}</Text>
        {products ? (
          <FlatList
            data={products}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            onEndReached={handleEndReached}
          />
        ) : (
          <Spinner /> /* should be skeleton here */
        )}
      </View>
    </ScreenWrapper>
  );
};
