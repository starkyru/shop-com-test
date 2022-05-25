import { Share, Text } from 'react-native';
import React, { useCallback } from 'react';
import { Button, Image, VStack } from 'native-base';
import { ShopProductFull } from '../../types';
import { unescapeName } from '../../utils/string';
import { t } from '../../utils/intl';

interface CategoryViewProps {
  product: ShopProductFull;
}
export const ProductView: React.FC<CategoryViewProps> = ({
  product: { image, name, brand },
}) => {
  const handlePress = useCallback(async () => {
    try {
      const result = await Share.share({
        message: 'Share this wonderful product with friends',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.error(error);
    }
  }, []);
  return (
    <VStack>
      <Text>{unescapeName(name)}</Text>
      <Text>Sold by: {unescapeName(brand)}</Text>
      {image.sizes[0] && (
        /**
         * Probably I have to choose optimal image for the resolution.
         */
        <Image
          source={{ uri: image.sizes[0].url }}
          width={image.sizes[0].width}
          height={image.sizes[0].height}
          alt={image.caption}
        />
      )}
      <Button onPress={handlePress}>Share</Button>
    </VStack>
  );
};
