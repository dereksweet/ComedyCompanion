'use strict';

import React, {Component} from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback, Platform, Keyboard } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import Button from '../../components/Button';
import FooterButton from '../../components/FooterButton';

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

    const setListLengthString = setListState.set_list.setListLength();

    return (
      <ShakingView ref={(editSetListView) => this.editSetListView = editSetListView}
                   style={[layoutStyles.modal, layoutStyles.centeredFlex]}>
        <View style={layoutStyles.statusBarBuffer} />
        <View style={layoutStyles.modalContent} onLayout={(event) => this.measureModalView(event)}>
          <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
            <View style={{ height: this.contentHeight() }}>
              <View style={ [layoutStyles.modalContentSection, layoutStyles.centeredFlexRow, { backgroundColor: '#EEEEEE'  }] }>
                <Text style={ layoutStyles.inputLabel }>Name:</Text>
                <TextInput
                  style={ [editSetListStyles.nameInput, this.state.name_input_valid ? {} : layoutStyles.errorInput] }
                  underlineColorAndroid='transparent'
                  placeholder="Name your set list here..."
                  onChangeText={(text) => setListActions.setSLName(text)}
                  value={setListState.set_list._name}
                />
              </View>
              <View style={[layoutStyles.modalContentSection, layoutStyles.centeredFlexRow, {backgroundColor: '#EEEEEE'}]}>
                <View style={[layoutStyles.centeredFlexRow, {flex: 1}]}>
                  <View>
                    <Text style={layoutStyles.inputLabel}>Length:</Text>
                    <Text style={[layoutStyles.inputLabel, {marginLeft: 5}]}>(min)</Text>
                  </View>
                  <TextInput
                    style={editSetListStyles.lengthInput}
                    underlineColorAndroid='transparent'
                    placeholderTextColor='red'
                    placeholder=""
                    onChangeText={(text) => setListActions.setSLLength(text)}
                    keyboardType="numeric"
                    value={setListState.set_list._length ? setListState.set_list._length.toString() : ''}
                  />
                  { setListLengthString !== '0' &&
                    <View>
                      <Text style={layoutStyles.postLabel}>Estimated: </Text>
                      <Text style={layoutStyles.postLabel}>{setListLengthString + ' min'}</Text>
                    </View>
                  }
                </View>
                { setListState.set_list._id != -1 &&
                  <Button
                    onPress={duplicateSetList}
                    buttonText="Duplicate"
                    backgroundColor='orange'
                    additionalStyles={editSetListStyles.duplicateButton}
                  />
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
              <View style={layoutStyles.flexRowStretched}>
                { (setListState.set_list._id !== -1) &&
                <FooterButton
                  onPress={toggleDeleteConfirm}
                  buttonText="Delete"
                  backgroundColor='red'
                />
                }
                <FooterButton
                  onPress={cancel}
                  buttonText="Cancel"
                />
                <FooterButton
                  onPress={save}
                  buttonText="Save"
                  backgroundColor='green'
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        { this.state.show_delete_confirm &&
          <View style={ layoutStyles.confirmBox }>
            <View style={{ paddingBottom: 40, paddingLeft: 20, paddingRight: 20 }}>
              <Text style={{ textAlign: 'center', fontSize: 20 }}>Are you SURE you want to delete this set list?</Text>
            </View>
            <View style={{ paddingTop: 25, flexDirection: 'row' }}>
              <Button
                onPress={toggleDeleteConfirm}
                buttonText="NO"
                backgroundColor='red'
                additionalStyles={[layoutStyles.deleteButton, {marginRight: 10}]}
              />
              <Button
                onPress={destroy}
                buttonText="YES"
                backgroundColor='green'
                additionalStyles={layoutStyles.confirmButton}
              />
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
