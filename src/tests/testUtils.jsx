import React from 'react';
import { render as rtlRender } from '@testing-library/react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigationParamList } from '../types/navigationTypes';

function render(ui, { ...options } = {}) {
  // @ts-ignore
  const Wrapper = ({ children }) => children;
  // @ts-ignore
  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

export * from '@testing-library/react-native';
// override React Testing Library's render with our own
export { render };

const RootNavigation = createNativeStackNavigator<RootNavigationParamList>();

export const renderWithNavigation = ({
  screens = {},
  navigatorConfig = {},
} = {}) =>
  render(
    <NavigationContainer>
      <RootNavigation.Navigator {...navigatorConfig}>
        {Object.keys(screens).map(name => (
          // @ts-ignore
          <RootNavigation.Screen
            key={name}
            name={name}
            component={screens[name]}
          />
        ))}
      </RootNavigation.Navigator>
    </NavigationContainer>,
  );
