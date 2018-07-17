import { StyleSheet, Platform } from 'react-native';

export default showListStyles = StyleSheet.create({
  showRow: {
    width: '100%',
    minHeight: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7f7f7',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row'
  },
  showName: {
    fontSize: 12
  },
  showInfoView: {
    width: 90,
    borderLeftColor: '#DDDDDD',
    borderLeftWidth: 1
  },
  updatedText: {
    fontSize: 8,
    fontWeight: 'bold'
  },
  locationText: {
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
  recIconBadgeView: {
    paddingBottom: 14,
    top: 5,
    left: 10
  },
  setListAndTimerRecButton: {
    flex: 1,
    alignItems: 'flex-end',
    backgroundColor: '#fff',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 3,
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 3
  }
});
