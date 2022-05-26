import { Dimensions, Share, StyleSheet, Text } from 'react-native';
import React, { useCallback } from 'react';
import { Button, Image, VStack } from 'native-base';
import { ShopProductFull } from '../../types';
import { unescapeName } from '../../utils/string';
import { t } from '../../utils/intl';
import { Title } from '../../components/Title/Title';
import WebView from 'react-native-webview';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 12,
    backgroundColor: '#ffffff',
    flex: 1,
  },
  soldBy: {
    fontSize: 10,
  },
  image: {
    width: width - 24,
    minHeight: 200,
    justifyContent: 'center',
    marginBottom: 12,
  },
  description: { marginVertical: 12, minHeight: 200, flex: 1 },
});

interface CategoryViewProps {
  product: ShopProductFull;
}

export const ProductView: React.FC<CategoryViewProps> = ({
  product: { image, name, brand, description, referralPageUrl },
}) => {
  const handlePress = useCallback(async () => {
    try {
      const result = await Share.share({
        message: referralPageUrl,
        url: referralPageUrl,
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
  }, [referralPageUrl]);

  const unescapedBrand = unescapeName(brand);
  return (
    <VStack style={styles.root}>
      <Title>{name}</Title>
      {unescapedBrand ? (
        <Text style={styles.soldBy}>Sold by: {unescapedBrand}</Text>
      ) : null}

      <Image
        source={{ uri: image.sizes[0].url }}
        alt={image.caption}
        resizeMode="contain"
        style={styles.image}
      />

      <Button onPress={handlePress}>{t('product.share')}</Button>

      <WebView
        originWhitelist={['*']}
        source={{
          html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>${description}</body></html>`,
        }}
        style={styles.description}
        minimumFontSize={12}
        automaticallyAdjustContentInsets={false}
      />
    </VStack>
  );
};
