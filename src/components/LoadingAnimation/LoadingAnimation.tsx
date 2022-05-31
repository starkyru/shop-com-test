import React, { useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Logo from '../../assets/shop-logo-us.svg';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const { width, height } = Dimensions.get('window');

const initialSize = 18;
const initialTop = height / 2 - initialSize - 4.5;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
    zIndex: 8001,
    backgroundColor: '#ffffff',
  },
  circle: {
    position: 'absolute',
    zIndex: 8001,
    backgroundColor: '#00a8ca',
    left: width / 2 - initialSize / 2 + 2.5,
    top: initialTop,
    width: initialSize,
    height: initialSize,
    borderRadius: 999999,
  },
  image: {
    position: 'absolute',
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
    top: 0,
    left: 24,
  },
  imageContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0,
    zIndex: 8000,
    left: 0,
  },
});

export const LoadingAnimation = () => {
  const [display, setDisplay] = useState(true);
  const size = useSharedValue(1);
  const imageOpacity = useSharedValue(100);
  const top = useSharedValue(initialTop);
  const bg = useSharedValue('white');

  top.value = withDelay(
    300 * 7,
    withTiming(getStatusBarHeight() + 17, { duration: 100 }),
  );

  imageOpacity.value = withDelay(300 * 7, withTiming(0, { duration: 100 }));

  bg.value = withDelay(300 * 7, withTiming('#ffffff00', { duration: 300 }));

  size.value = withSequence(
    withTiming(1.1, { duration: 300 }),
    withTiming(1, { duration: 300 }),
    withTiming(1.25, { duration: 300 }),
    withTiming(1, { duration: 300 }),
    withTiming(1.7, { duration: 300 }),
    withTiming(1, { duration: 300 }),
    withTiming(200, { duration: 300 }),
    withTiming(0.5, { duration: 500 }, () => {
      setDisplay(false);
    }),
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scaleX: size.value }, { scaleY: size.value }],
      top: top.value,
    };
  });
  const bgAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: bg.value,
    };
  });
  const imageContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: imageOpacity.value,
    };
  });

  return display ? (
    <Animated.View style={[styles.root, bgAnimatedStyle]}>
      <Animated.View style={[styles.circle, animatedStyle]} />
      <Animated.View style={[styles.imageContainer, imageContainerStyle]}>
        <Logo width={width - 24 - 12} style={styles.image} />
      </Animated.View>
    </Animated.View>
  ) : null;
};
