import React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

interface AboutScreenProps {}

export const AboutScreen: React.FC<AboutScreenProps> = ({}) => {
  return <View style={styles.root}></View>;
};
