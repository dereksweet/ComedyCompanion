import {StyleSheet} from 'react-native';

export default downloadStyles = StyleSheet.create({
  sectionHeader: {
    borderBottomColor: '#999999',
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginBottom: 10
  },
  exportEmailInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#FFFFFF'
  },
  buttonView: {
    flex: 1,
    height: 45
  },
  smallText: {
    fontWeight: '100',
    fontSize: 10
  },
  popupWindow: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  popupWarningText: {
    textAlign: 'center',
    paddingTop: 25,
    fontWeight: 'bold'
  }
});
