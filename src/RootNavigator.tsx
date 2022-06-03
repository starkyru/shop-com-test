import { HomeScreen } from './screens/HomeScreen';
import { HeaderTitle } from './components/HeaderTitle';
import { CategoryScreen } from './screens/CategoryScreen';
import { ProductScreen } from './screens/ProductScreen';
import { AboutScreen } from './screens/AboutScreen';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootNavigationParamList } from './types/navigationTypes';

const RootNavigator = createNativeStackNavigator<RootNavigationParamList>();

export const RootNavigation: React.FC<any> = () => {
  return (
    <RootNavigator.Navigator>
      <RootNavigator.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: HeaderTitle,
        }}
      />
      <RootNavigator.Screen name="Category" component={CategoryScreen} />
      <RootNavigator.Screen name="Product" component={ProductScreen} />
      <RootNavigator.Screen name="About" component={AboutScreen} />
    </RootNavigator.Navigator>
  );
};
