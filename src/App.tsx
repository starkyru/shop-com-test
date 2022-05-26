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
import { LOCALES_DATA } from './locales';
import intl from 'react-intl-universal';

import { HeaderTitle } from './components/HeaderTitle';
import { StyleSheet, View } from 'react-native';
import { LoadingAnimation } from './components/LoadingAnimation';

const RootNavigation = createNativeStackNavigator<RootNavigationParamList>();

// Usually this stuff should be somewhere in Sagas or other middleware.
axios.defaults.headers.common['api_Key'] = config.API_KEY;
const options = {
  currentLocale: 'en-US',
  locales: LOCALES_DATA,
  commonLocaleDataUrls: {},
};
intl.init(options);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    overflow: 'visible',
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <View style={styles.root}>
          <LoadingAnimation />
          <NavigationContainer>
            <RootNavigation.Navigator>
              <RootNavigation.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  headerTitle: HeaderTitle,
                }}
              />
              <RootNavigation.Screen
                name="Category"
                component={CategoryScreen}
              />
              <RootNavigation.Screen name="Product" component={ProductScreen} />
              <RootNavigation.Screen name="About" component={AboutScreen} />
              {/*
              In a production app, it is worth moving navigation
              into a separate component.
           */}
            </RootNavigation.Navigator>
          </NavigationContainer>
        </View>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
