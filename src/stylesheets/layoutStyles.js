import { StyleSheet, Platform } from 'react-native';

export default layoutStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8ECC2'
  },
  statusBarBuffer: {
    height: (Platform.OS === 'ios') ? 20 : 0,
    backgroundColor: '#FFFFFF'
  },
  statusBar: {
    height: 40,
    backgroundColor: '#EEEEFF',
    width: '100%',
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    borderTopColor: '#DDDDDD',
    borderTopWidth: 1,
    flexDirection: 'row'
  },
  button: {
    borderColor: '#999999',
    borderWidth: 2,
    backgroundColor: '#EEEEEE',
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 10,
    paddingTop: 10
  },
  buttonText: {
    color: '#FFFFFF',
    paddingLeft: 10,
    paddingTop: 4
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: "#EEEEEE"
  }
});
