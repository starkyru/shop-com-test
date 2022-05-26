import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScreenWrapper } from '../../components/ScreenWrapper';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

interface AboutScreenProps {}

export const AboutScreen: React.FC<AboutScreenProps> = ({}) => {
  return (
    <ScreenWrapper>
      <View style={styles.root}></View>
    </ScreenWrapper>
  );
};
