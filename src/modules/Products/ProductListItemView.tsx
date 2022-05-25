import { Text, TouchableHighlight } from 'react-native';
import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavigationProductScreenProps } from '../../types/navigationTypes';
import { unescapeName } from '../../utils/string';

interface ProductListItemViewProps {
  name: string;
  id: number;
}
export const ProductListItemView: React.FC<ProductListItemViewProps> = ({
  name,
  id,
}) => {
  const navigation = useNavigation<NavigationProductScreenProps>();
  const handlePress = useCallback(() => {
    navigation.navigate('Product', { id: id.toString(), name });
  }, [navigation, id, name]);
  return (
    <TouchableHighlight onPress={handlePress}>
      <Text key={id}>{unescapeName(name)}</Text>
    </TouchableHighlight>
  );
};
