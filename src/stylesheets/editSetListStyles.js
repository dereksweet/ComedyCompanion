import { StyleSheet } from 'react-native';

export default editSetListStyles = StyleSheet.create({
  nameInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#FFFFFF'
  },
  lengthInput: {
    width: 55,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#FFFFFF',
    textAlign: 'center'
  },
  duplicateButton: {
    width: 100,
    height: 40
  },
  jokeSelectorRow: {
    width: '100%',
    minHeight: 30,
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  jokeInstructions: {
    fontSize: 11,
    color: '#999999'
  },
  setListJokesHeader: {
    backgroundColor: '#EEEEFF',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC'
  },
  setListJokeRow: {
    width: '100%',
    minHeight: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row'
  }
});
