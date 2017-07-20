import { StyleSheet } from 'react-native';
import { normalizeHeight, normalizeWidth } from '../helpers/sizeHelper';

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
