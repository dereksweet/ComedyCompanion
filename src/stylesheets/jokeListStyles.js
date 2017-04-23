import { StyleSheet, Platform } from 'react-native';

export default jokeListStyles = StyleSheet.create({
  jokeRow: {
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
  jokeName: {
    fontSize: 10
  },
  jokeInfoView: {
    alignItems: 'flex-end',
    minWidth: 60,
    borderLeftColor: '#DDDDDD',
    borderLeftWidth: 1
  },
  updatedText: {
    fontSize: 6,
    fontWeight: 'bold'
  },
  ratingText: {
    paddingTop: 5,
    fontSize: 6,
    alignItems: 'flex-end'
  },
  sortByText: {
    fontSize: 10
  },
  sortButtonText: {
    fontSize: 8,
    color: '#FFFFFF',
  }
});
