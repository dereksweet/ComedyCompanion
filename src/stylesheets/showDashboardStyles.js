import { StyleSheet, Dimensions, Platform, PixelRatio } from 'react-native';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export function normalize(size) {
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(size))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(size)) - 2
  }
}

export default showDashbordStyles = StyleSheet.create({
  soundBoardView: {
    height: 75,
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
    fontSize: normalize(40),
    fontWeight: 'bold',
    color: '#FFFFFF'
  }
});
