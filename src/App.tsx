import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './store';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './screens/HomeScreen';
import { CategoryScreen } from './screens/CategoryScreen';
import { AboutScreen } from './screens/AboutScreen';
import { ProductScreen } from './screens/ProductScreen';
import { NativeBaseProvider } from 'native-base';
import axios from 'axios';
import config from 'react-native-ultimate-config';
import { RootNavigationParamList } from './types/navigationTypes';

const RootNavigation = createNativeStackNavigator<RootNavigationParamList>();

// Usually this stuff should be somewhere in Sagas or other middleware.
axios.defaults.headers.common['api_Key'] = config.API_KEY;

const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <RootNavigation.Navigator>
            {/*
              In a production app, it is worth moving navigation
              into a separate component.
           */}
            <RootNavigation.Screen name="Home" component={HomeScreen} />
            <RootNavigation.Screen name="Category" component={CategoryScreen} />
            <RootNavigation.Screen name="Product" component={ProductScreen} />
            <RootNavigation.Screen name="About" component={AboutScreen} />
          </RootNavigation.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
