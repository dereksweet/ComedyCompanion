import { StyleSheet, Platform } from 'react-native';

export default layoutStyles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#F8ECC2'
  },
  centeredFlex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  statusBarBuffer: {
    height: (Platform.OS === 'ios') ? 20 : 0,
    backgroundColor: '#FFFFFF',
    width: '100%'
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
    backgroundColor: "#EEEEEE",
    height: '100%'
  },
  modalContent: {
    flex: 1,
    marginTop: 10
  },
  modalContentSection: {
    borderBottomWidth: 1,
    borderBottomColor: '#999999',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingTop: 10
  },
  inputLabel: {
    paddingRight: 10,
    textAlignVertical: 'center'
  },
  toolbar: {
    width: '100%',
    backgroundColor: '#EEEEFF',
    borderTopColor: '#CCCCCC',
    borderTopWidth: 1,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10
  },
  addButtonView: {
    width: 40,
    height: 40,
    borderLeftColor: '#CCCCCC',
    borderLeftWidth: 1,
    alignItems: 'center'
  },
  addButton: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 7,
    paddingLeft: 7
  }
});
