import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { unescapeName } from '../../utils/string';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  title: {
    fontWeight: 'bold',
    paddingTop: 20,
    paddingBottom: 6,
    fontSize: 16,
  },
});

export const Title = ({ children }: { children: string }) => {
  return (
    <Text style={styles.title} numberOfLines={0}>
      {unescapeName(children)}
    </Text>
  );
};
