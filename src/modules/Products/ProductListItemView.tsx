import { StyleSheet, Text, TouchableHighlight } from 'react-native';
import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavigationProductScreenProps } from '../../types/navigationTypes';
import { unescapeName } from '../../utils/string';
import { Box, Image } from 'native-base';
import { ShopProduct } from '../../types';

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
    justifyContent: 'flex-start',
    justifyItems: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
  },
  image: {
    height: 40,
    width: 40,
    marginRight: 4,
  },
});

type ProductListItemViewProps = Pick<ShopProduct, 'name' | 'id' | 'image'>;

export const ProductListItemView: React.FC<ProductListItemViewProps> = ({
  name,
  id,
  image,
}) => {
  const navigation = useNavigation<NavigationProductScreenProps>();
  const handlePress = useCallback(() => {
    navigation.navigate('Product', { id: id.toString(), name });
  }, [navigation, id, name]);
  const cleanName = unescapeName(name);
  return (
    <TouchableHighlight
      style={styles.root}
      onPress={handlePress}
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
    >
      <Box style={styles.inner}>
        {image?.sizes[0]?.url && (
          <Image
            source={{ uri: image?.sizes[0]?.url }}
            alt={cleanName}
            resizeMode="contain"
            style={styles.image}
          />
        )}
        <Text>{cleanName}</Text>
      </Box>
    </TouchableHighlight>
  );
};
