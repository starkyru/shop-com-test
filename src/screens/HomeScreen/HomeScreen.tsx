import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import config from 'react-native-ultimate-config';
import axios from 'axios';
import { ShopCategory } from '../../types';
import { ScreenWrapper } from '../../components/ScreenWrapper';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

interface HomeScreenProps {}

export const HomeScreen: React.FC<HomeScreenProps> = ({}) => {
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
  return (
    <ScreenWrapper>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        // style={backgroundStyle}
      >
        <View style={styles.root}>
          {result && Array.isArray(result) ? (
            result.map(category => {
              return <Text key={category.id}>{category.name}</Text>;
            })
          ) : (
            <Text>Loading</Text>
          )}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};
