import { Text, TouchableHighlight } from 'react-native';
import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavigationCategoryScreenProps } from '../../types/navigationTypes';

interface CategoryViewProps {
  name: string;
  id: string;
}
export const ProductView: React.FC<CategoryViewProps> = ({ name, id }) => {
  const navigation = useNavigation<NavigationCategoryScreenProps>();
  const handlePress = useCallback(() => {
    navigation.navigate('Category', { id, name });
  }, [navigation, id, name]);
  return (
    <TouchableHighlight onPress={handlePress}>
      <Text key={id}>{name}</Text>
    </TouchableHighlight>
  );
};
