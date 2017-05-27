import { StyleSheet, Platform } from 'react-native';

export default SLListStyles = StyleSheet.create({
  setListRow: {
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
  },
  setListName: {
    fontSize: 12
  },
  setListInfoView: {
    alignItems: 'flex-end',
    minWidth: 70,
    borderLeftColor: '#DDDDDD',
    borderLeftWidth: 1
  },
  updatedText: {
    fontSize: 8,
    fontWeight: 'bold'
  },
  lengthText: {
    paddingTop: 5,
    fontSize: 8,
    alignItems: 'flex-end'
  },
  sortByText: {
    fontSize: 12,
    paddingRight: 10
  },
  sortInText: {
    fontSize: 12,
    paddingRight: 13
  },
  sortButtonText: {
    fontSize: 10,
    color: '#FFFFFF'
  },
  jokeInstructions: {
    fontSize: 11,
    color: '#999999'
  }
});
