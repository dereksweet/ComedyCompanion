'use strict';

import React, {Component} from 'react';
import { View, Text, TextInput, TouchableHighlight, TouchableWithoutFeedback, Platform, Keyboard } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {Button} from 'react-native-ui-xg';

import JokeSelector from './EditSetList/JokeSelector';
import SetListJokes from './EditSetList/SetListJokes';

import ShakingView from '../../components/ShakingView';

import * as routingActions from '../../actions/routingActions';
import * as setListActions from '../../actions/setListActions';

import SetListListHelper from '../../helpers/setListListHelper';

import layoutStyles from '../../stylesheets/layoutStyles';
import editSetListStyles from '../../stylesheets/editSetListStyles';

class EditSetList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal_height: 0,
      keyboard_height: 0,
      show_delete_confirm: false,
      name_input_valid: true
    };
  }

  componentWillMount () {
    var eventVerb = Platform.OS === 'ios'? 'Will' : 'Did';

    this.keyboardDidShowListener = Keyboard.addListener('keyboard' + eventVerb + 'Show', this.keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboard' + eventVerb + 'Hide', this.keyboardDidHide.bind(this));
  }

  keyboardDidShow (e) {
    this.setState({
      keyboard_height: e.endCoordinates.height
    });
  }

  keyboardDidHide (e) {
    this.setState({
      keyboard_height: 0
    });
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();

    SetListListHelper.refreshSLList();
    SetListListHelper.refreshSLListEmpty();
  }

  measureModalView(event) {
    this.setState({
      modal_height: event.nativeEvent.layout.height
    });
  }

  contentHeight() {
    return this.state.modal_height - (Platform.OS === 'ios'? this.state.keyboard_height : 0);
  }

  render() {
    const { setListState, routingActions, setListActions } = this.props;

    const validateFields = () => {
      let fields_valid = true;

      if (setListState.set_list._name === '') {
        fields_valid = false;
        this.setState({
          name_input_valid: false
        });
      }

      if (!fields_valid) {
        this.editSetListView.performShake();
      }

      return fields_valid;
    };

    const cancel = () => {
      routingActions.closeModal();
    };

    const save = () => {
      if (validateFields()) {
        setListState.set_list.save(() => {
          SetListListHelper.refreshSLList();
          SetListListHelper.refreshSLListEmpty();
        });
        cancel();
      }
    };

    const destroy = () => {
      setListState.set_list.destroy();
      cancel();
    };

    const toggleDeleteConfirm = () => {
      this.setState({
        show_delete_confirm: !this.state.show_delete_confirm
      })
    };

    const duplicateSetList = () => {
      setListActions.duplicateSL();
    };

    return (
      <ShakingView ref={(editSetListView) => this.editSetListView = editSetListView}
                   style={[layoutStyles.modal, layoutStyles.centeredFlex]}>
        <View style={layoutStyles.statusBarBuffer} />
        <View style={layoutStyles.modalContent} onLayout={(event) => this.measureModalView(event)}>
          <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
            <View style={{ height: this.contentHeight() }}>
              <View style={ [layoutStyles.modalContentSection, { flexDirection: 'row', alignItems: 'center', backgroundColor: '#EEEEEE'  }] }>
                <Text style={ layoutStyles.inputLabel }>Name:</Text>
                <TextInput style={ [editSetListStyles.nameInput, this.state.name_input_valid ? {} : layoutStyles.errorInput] }
                           underlineColorAndroid='transparent'
                           placeholder="Name your set list here..."
                           onChangeText={(text) => setListActions.setSLName(text)}
                           value={ setListState.set_list._name } />
              </View>
              <View style={ [layoutStyles.modalContentSection, { flexDirection: 'row', alignItems: 'center', backgroundColor: '#EEEEEE'  }] }>
                <View style={ { flex: 1, flexDirection: 'row', alignItems: 'center'  } }>
                  <Text style={ layoutStyles.inputLabel }>Length:</Text>
                  <TextInput style={ editSetListStyles.lengthInput }
                             underlineColorAndroid='transparent'
                             placeholder=""
                             onChangeText={(text) => setListActions.setSLLength(text)}
                             keyboardType="numeric"
                             value={ setListState.set_list._length ? setListState.set_list._length.toString() : '' } />
                  <Text style={ [layoutStyles.inputLabel, {marginLeft: 10}] }>min</Text>
                </View>
                { setListState.set_list._id != -1 &&
                  <View>
                    <Button type="surface" size="large" theme="red" onPress={ duplicateSetList }>
                      <Text style={{ color: 'white', fontWeight: 'bold' }}>Duplicate</Text>
                    </Button>
                  </View>
                }
              </View>
              <View style={{ flex: 1, flexDirection: 'row', borderTopColor: '#CCCCCC', borderTopWidth: 1 }}>
                <View style={{ flex: 1, borderRightColor: '#CCCCCC', borderRightWidth: 1 }}>
                  <JokeSelector />
                </View>
                <View style={{ flex: 1 }}>
                  <SetListJokes />
                </View>
              </View>
              <View style={ { flexDirection: 'row', width: '100%' }}>
                { (setListState.set_list._id != -1) &&
                  <View style={ { flex: 1 } }>
                    <Button type="surface" size="large" theme="red" selfStyle={ layoutStyles.deleteButton } onPress={ toggleDeleteConfirm }>
                      <Text style={layoutStyles.buttonText}>Delete</Text>
                    </Button>
                  </View>
                }
                <View style={ { flex: 1 } }>
                  <Button type="surface" size="large" theme="gray" selfStyle={ layoutStyles.cancelButton } onPress={ cancel }>
                    <Text style={layoutStyles.buttonText}>Cancel</Text>
                  </Button>
                </View>
                <View style={ { flex: 1 } }>
                  <Button type="surface" size="large" theme="blue" selfStyle={ layoutStyles.confirmButton } onPress={ save }>
                    <Text style={layoutStyles.buttonText}>Save</Text>
                  </Button>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        { this.state.show_delete_confirm &&
          <View style={ layoutStyles.confirmBox }>
            <Text style={{ textAlign: 'center', fontSize: 20 }}>Are you SURE you want to delete this set list?</Text>
            <View style={{ paddingTop: 25, flexDirection: 'row' }}>
              <Button type="surface" size="large" theme="red" selfStyle={ layoutStyles.deleteButton } onPress={ toggleDeleteConfirm }>
                <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>NO</Text>
              </Button>
              <Button type="surface" size="large" theme="blue" selfStyle={ [layoutStyles.confirmButton, { marginLeft: 10 }] } onPress={ destroy }>
                <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>YES</Text>
              </Button>
            </View>
          </View>
        }
        </View>
      </ShakingView>
    );
  }
}

export default connect(state => ({
    setListState: state.set_list
  }),
  (dispatch) => ({
    routingActions: bindActionCreators(routingActions, dispatch),
    setListActions: bindActionCreators(setListActions, dispatch)
  })
)(EditSetList);
