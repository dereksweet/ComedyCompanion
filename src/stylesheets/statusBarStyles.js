import { StyleSheet } from 'react-native';

export default statusBarStyles = StyleSheet.create({
  hamburger: {
    marginTop: 2
  },
  statusBarIcon: {
    width: 36,
    alignItems: 'center'
  },
  statusBarButton: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 7
  },
  title: {
    marginTop: 11,
    marginLeft: 10,
    marginRight: 10
  },
  navBar: {
    backgroundColor: '#DDDDFF',
    borderTopWidth: 1,
    borderColor: '#ccc',
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
