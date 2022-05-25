import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export type RootNavigationParamList = {
  Home: undefined;
  Product: { id: string; name: string };
  Category: { id: string; name: string };
  About: undefined;
};

export type NavigationHomeScreenProps = NativeStackScreenProps<
  RootNavigationParamList,
  'Home'
>;

export type ProductScreenProps = NativeStackScreenProps<
  RootNavigationParamList,
  'Product'
>;
export type NavigationProductScreenProps = NativeStackNavigationProp<
  RootNavigationParamList,
  'Product'
>;

export type CategoryScreenProps = NativeStackScreenProps<
  RootNavigationParamList,
  'Category'
>;

export type NavigationCategoryScreenProps = NativeStackNavigationProp<
  RootNavigationParamList,
  'Category'
>;

export type NavigationAboutScreenProps = NativeStackScreenProps<
  RootNavigationParamList,
  'About'
>;
