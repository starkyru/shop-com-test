import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import axios from 'axios';
import config from 'react-native-ultimate-config';
import { LOCALES_DATA } from './locales';
import intl from 'react-intl-universal';
import { StyleSheet, View } from 'react-native';
import { LoadingAnimation } from './components/LoadingAnimation';
import { RootNavigation } from './RootNavigator';
import { Provider } from 'react-redux';
import { store as mainStore } from './store';

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

const App = ({ store = mainStore }) => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <View style={styles.root}>
          <LoadingAnimation />
          <NavigationContainer>
            <RootNavigation />
          </NavigationContainer>
        </View>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
