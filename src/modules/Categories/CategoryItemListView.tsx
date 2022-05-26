import { StyleSheet, Text, TouchableHighlight } from 'react-native';
import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavigationCategoryScreenProps } from '../../types/navigationTypes';
import { unescapeName } from '../../utils/string';
import { Box, Flex } from 'native-base';

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 50,
    paddingLeft: 12,
    paddingRight: 12,
  },
  inner: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    justifyItems: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
  },
  title: {
    fontWeight: 'bold',
    textAlignVertical: 'center',
  },
});

interface CategoryItemListViewProps {
  name: string;
  id: string;
  productCount: number;
}

export const CategoryItemListView: React.FC<CategoryItemListViewProps> = ({
  name,
  id,
  productCount,
}) => {
  const navigation = useNavigation<NavigationCategoryScreenProps>();

  const handlePress = useCallback(() => {
    navigation.navigate('Category', { id, name });
  }, [navigation, id, name]);

  return (
    <TouchableHighlight
      style={styles.root}
      onPress={handlePress}
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
    >
      <Box style={styles.inner}>
        <Text style={styles.title} lineBreakMode={'tail'} numberOfLines={1}>
          {unescapeName(name)}
        </Text>
        <Text>{productCount}</Text>
      </Box>
    </TouchableHighlight>
  );
};
