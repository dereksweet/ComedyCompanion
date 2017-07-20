import { Dimensions, Platform, PixelRatio } from 'react-native';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

// based on iphone 5s's scale
const scaleWidth = SCREEN_WIDTH / 320;
const scaleHeight = SCREEN_HEIGHT / 568;

export function normalizeWidth(size) {
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(size * scaleWidth))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(size * scaleWidth)) - 2
  }
}

export function normalizeHeight(size) {
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(size * scaleHeight))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(size * scaleHeight)) - 2
  }
}
