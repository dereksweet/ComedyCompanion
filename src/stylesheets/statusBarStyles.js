import { StyleSheet, Platform } from 'react-native';

export default statusBarStyles = StyleSheet.create({
  hamburger: {
    marginTop: 2,
    borderRightColor: '#CCCCCC',
    borderRightWidth: 1
  },
  title: {
    marginTop: 10,
    marginLeft: 10
  },
  navBar: {
    height: 40,
    backgroundColor: '#EEFFEE',
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    flexDirection : 'row'
  },
  navLink: {
    flex: 1,
    alignItems: 'center'
  },
  navLinkText: {
    paddingTop: 10,
    paddingBottom: 10
  }
});
