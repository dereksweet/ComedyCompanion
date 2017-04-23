import { StyleSheet, Platform } from 'react-native';

export default statusBarStyles = StyleSheet.create({
  hamburger: {
    marginTop: 2,
    borderRightColor: '#CCCCCC',
    borderRightWidth: 1
  },
  gearIcon: {
    width: 40,
    borderLeftColor: '#CCCCCC',
    borderLeftWidth: 1,
    alignItems: 'center'
  },
  title: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  navBar: {
    height: 40,
    backgroundColor: '#EEFFEE',
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    flexDirection : 'row',
    overflow: 'hidden'
  },
  navLink: {
    flex: 1,
    alignItems: 'center'
  },
  navLinkText: {
    paddingTop: 10,
    paddingBottom: 10
  },
  navLinkIcon: {
    paddingTop: 6,
    paddingRight: 10
  }
});
