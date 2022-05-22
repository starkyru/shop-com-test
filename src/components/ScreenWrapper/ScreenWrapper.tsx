import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: 'white' },
});

interface IScreenWrapperProps {
  children: React.ReactNode;
}

function ScreenWrapper({ children }: IScreenWrapperProps) {
  return (
    <>
      <SafeAreaView style={styles.root}>
        <StatusBar barStyle={'dark-content'} />
        {children}
      </SafeAreaView>
    </>
  );
}

export { ScreenWrapper };
