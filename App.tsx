import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import config from 'react-native-ultimate-config';
import axios from 'axios';

interface ShopLink {
  href: string;
  rel: string;
  type: string;
}

interface ShopCategory {
  id: string;
  links: ShopLink[];
  name: String;
  productCount: number;
  subCategories: ShopCategory[];
}

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [result, setResult] = useState<null | ShopCategory[]>(null);

  useEffect(() => {
    let isComponentMounted = true;

    async function fetch() {
      const url = `${config.API_URL}/categories?publisherId=TEST&locale=en_US&site=shop&shipCountry=US&onlyMaProducts=false`;
      // tslint:disable
      console.log(url);
      const res = await axios.get(url, {
        headers: { api_Key: config.API_KEY },
      });

      // Make sure component is still mounted.

      console.log(res);
      if (isComponentMounted) {
        setResult(res.data.categories || null);
      }
    }

    fetch();
    return () => {
      isComponentMounted = false;
    };
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
      >
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}
        >
          {result && Array.isArray(result) ? (
            result.map(category => {
              return <Text key={category.id}>{category.name}</Text>;
            })
          ) : (
            <Text>Loading</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
