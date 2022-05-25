import { Text, TouchableHighlight } from 'react-native';
import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavigationCategoryScreenProps } from '../../types/navigationTypes';
import { unescapeName } from '../../utils/string';

interface CategoryItemListViewProps {
  name: string;
  id: string;
}
export const CategoryItemListView: React.FC<CategoryItemListViewProps> = ({
  name,
  id,
}) => {
  const navigation = useNavigation<NavigationCategoryScreenProps>();

  const handlePress = useCallback(() => {
    navigation.navigate('Category', { id, name });
  }, [navigation, id, name]);

  return (
    <TouchableHighlight onPress={handlePress}>
      <Text key={id}>{unescapeName(name)}</Text>
    </TouchableHighlight>
  );
};
