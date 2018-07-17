import {StyleSheet} from 'react-native';

export default editShowStyles = StyleSheet.create({
  venueInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#FFFFFF'
  },
  cityInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#FFFFFF'
  },
  stateInput: {
    width: 55,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#FFFFFF',
    textAlign: 'center'
  },
  setListSelectTitleView: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    paddingBottom: 10,
    paddingTop: 10,
    alignItems: 'center'
  },
  setListSelectTitle: {
    fontWeight: 'bold',
    fontSize: 14
  },
  setListView: {
    flex: 1,
    backgroundColor: '#EEEEFF',
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: 2,
    maxHeight: 40
  },
  setList: {
    color: '#000000',
    padding: 10,
    textAlign: 'center'
  }
});
