import { StyleSheet, Platform } from 'react-native';

export default jokeListStyles = StyleSheet.create({
  jokeRow: {
    width: '100%',
    minHeight: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEEEEE',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row'
  },
  jokeName: {
    fontSize: 10
  },
  updatedText: {
    fontSize: 6,
    fontWeight: 'bold'
  },
  ratingText: {
    paddingTop: 5,
    fontSize: 6,
    alignItems: 'flex-end'
  }
});
