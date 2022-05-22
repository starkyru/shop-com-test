import React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

interface CategoryScreenProps {}

export const CategoryScreen: React.FC<CategoryScreenProps> = ({}) => {
  return <View style={styles.root}></View>;
};
