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
    paddingBottom: 14
  }
});
