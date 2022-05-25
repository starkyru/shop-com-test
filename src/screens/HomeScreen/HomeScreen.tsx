import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { fetchCategories } from '../../modules/Categories/categoriesSlice';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks';
import { selectAllCategories } from '../../modules/Categories/categoriesSelectors';
import { CategoryItemListView } from '../../modules/Categories/CategoryItemListView';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

interface HomeScreenProps {}

export const HomeScreen: React.FC<HomeScreenProps> = ({}) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectAllCategories);

  useEffect(() => {
    dispatch(
      fetchCategories({
        publisherId: 'TEST',
        locale: 'en_US',
        site: 'shop',
        shipCountry: 'US',
        onlyMaProducts: true,
      }),
    );
  }, [dispatch]);

  return (
    <ScreenWrapper>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.root}>
          {categories && Array.isArray(categories) ? (
            categories.map(category => {
              return (
                <CategoryItemListView
                  key={category.id}
                  name={category.name}
                  id={category.id}
                />
              );
            })
          ) : (
            <Text>Loading</Text>
          )}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};
