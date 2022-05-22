import React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

interface ProductScreenProps {}

export const ProductScreen: React.FC<ProductScreenProps> = ({}) => {
  return <View style={styles.root}></View>;
};
