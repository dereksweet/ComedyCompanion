import { StyleSheet, Platform } from 'react-native';

export default jokeListStyles = StyleSheet.create({
  jokeRow: {
    width: '100%',
    minHeight: 60,
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
    fontSize: 12
  },
  jokeInfoView: {
    alignItems: 'flex-end',
    minWidth: 70,
    borderLeftColor: '#DDDDDD',
    borderLeftWidth: 1
  },
  updatedText: {
    fontSize: 8,
    fontWeight: 'bold'
  },
  ratingText: {
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
    color: '#FFFFFF',
  }
});
