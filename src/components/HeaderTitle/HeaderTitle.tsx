import React from 'react';
import { TextProps } from 'react-native';
import Logo from '../../assets/shop-logo-us.svg';

export const HeaderTitle: React.FC<TextProps> = () => {
  return <Logo height={50} width="100%" />;
};
