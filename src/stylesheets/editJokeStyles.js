import { StyleSheet, Platform } from 'react-native';

export default editJokeStyles = StyleSheet.create({
  nameInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#FFFFFF'
  },
  notesInput: {
    textAlignVertical: 'top',
    width: '100%',
    height: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#FFFFFF',
    fontSize: 18
  }
});
