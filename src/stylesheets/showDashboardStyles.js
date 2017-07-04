import { StyleSheet, Dimensions, Platform, PixelRatio } from 'react-native';

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

export default showDashbordStyles = StyleSheet.create({
  soundBoardView: {
    minHeight: normalizeHeight(75),
    borderBottomWidth: 4,
    borderTopWidth: 4,
    borderBottomColor: '#CCCCCC',
    borderTopColor: '#CCCCCC',
    backgroundColor: '#999999',
    flexDirection: 'row'
  },
  setListHeader: {
    width: '100%', 
    backgroundColor: '#EEEEEE',
    borderTopWidth: 1,
    borderTopColor: '#999999',
    borderBottomWidth: 1, 
    borderBottomColor: '#999999',
    paddingBottom: 10, 
    paddingTop: 10, 
    alignItems: 'center'
  },
  timerText: {
    fontSize: normalizeWidth(30),
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  buttonView: {
    width: normalizeWidth(85),
    marginLeft: 10,
    justifyContent: 'center'
  },
  playbackControlView: {
    width: normalizeWidth(35),
    marginLeft: 10,
    justifyContent: 'center'
  }
});
