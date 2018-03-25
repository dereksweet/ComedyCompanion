'use strict';

import React, {Component} from 'react';
import { View, Text, TouchableHighlight, TouchableWithoutFeedback, Switch, TextInput, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {Button} from 'react-native-buttons';

import * as routingActions from '../../actions/routingActions';
import * as jokeActions from '../../actions/jokeActions';
import * as jokeListActions from '../../actions/jokeListActions';

import ShakingView from '../../components/ShakingView';
import MultilineTextInput from '../../components/MultilineTextinput';

import JokeListHelper from '../../helpers/jokeListHelper';

import layoutStyles from '../../stylesheets/layoutStyles';
import editJokeStyles from '../../stylesheets/editJokeStyles';
import editSetListStyles from "../../stylesheets/editSetListStyles";

class EditJoke extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal_height: 0,
      keyboard_height: 0,
      show_delete_confirm: false,
      show_cancel_confirm: false,
      name_input_valid: true,
      minutes_input_valid: true,
      seconds_input_valid: true
    };

    this.dirty = false;
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

    JokeListHelper.refreshJokeList();
    JokeListHelper.refreshJokeListEmpty();
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
    const { jokeState, jokeActions, routingActions } = this.props;

    const validateFields = () => {
      let fields_valid = true;

      if (jokeState.joke._name === '') {
        fields_valid = false;
        this.setState({
          name_input_valid: false
        });
      }

      try {
        const intMinutes = parseInt(jokeState.joke._minutes);

        if (intMinutes > 59 || intMinutes < 0) {
          fields_valid = false;
          this.setState({
            minutes_input_valid: false
          });
        }
      } catch(error) {
        fields_valid = false;
        this.setState({
          minutes_input_valid: false
        });
      }

      try {
        const intSeconds = parseInt(jokeState.joke._seconds);

        if (intSeconds > 59 || intSeconds < 0) {
          fields_valid = false;
          this.setState({
            seconds_input_valid: false
          });
        }
      } catch(error) {
        fields_valid = false;
        this.setState({
          seconds_input_valid: false
        });
      }

      if (!fields_valid) {
        this.editJokeView.performShake();
      }

      return fields_valid;
    };

    const save = () => {
      if (validateFields()) {
        jokeState.joke.save(() => {
          JokeListHelper.refreshJokeList();
          JokeListHelper.refreshJokeListEmpty();
        });
        cancel();
      }
    };

    const cancel = () => {
      Keyboard.dismiss();
      routingActions.closeModal();
    };

    const destroy = () => {
      jokeState.joke.destroy();
      routingActions.closeModal();
    };

    const toggleDeleteConfirm = () => {
      Keyboard.dismiss();

      this.setState({
        show_delete_confirm: !this.state.show_delete_confirm
      })
    };

    const toggleCancelConfirm = () => {
      Keyboard.dismiss();

      if (this.dirty) {
        this.setState({
          show_cancel_confirm: !this.state.show_cancel_confirm
        })
      } else {
        cancel();
      }
    };

    const setDirty = () => {
      this.dirty = true;
    };

    return (
      <ShakingView ref={(editJokeView) => this.editJokeView = editJokeView}
                   style={[layoutStyles.modal, layoutStyles.centeredFlex]}>
        <View style={layoutStyles.statusBarBuffer} />
        <View style={layoutStyles.modalContent} onLayout={(event) => this.measureModalView(event)}>
          <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
            <View style={{ height: this.contentHeight() }}>
              <View style={ [layoutStyles.modalContentSection, { flexDirection: 'row', alignItems: 'center' }] }>
                <Text style={ layoutStyles.inputLabel }>In Development:</Text>
                <Switch onValueChange={ () => { jokeActions.toggleInDevelopment(); setDirty(); }}
                        value={jokeState.joke._in_development} />
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <Text style={ layoutStyles.inputLabel }></Text>
                </View>
                <TextInput style={ [editJokeStyles.timeInput, this.state.minutes_input_valid ? {} : layoutStyles.errorInput] }
                           underlineColorAndroid='transparent'
                           placeholder="min"
                           keyboardType="numeric"
                           onChangeText={(text) => jokeActions.setMinutes(text)}
                           value={ jokeState.joke._minutes !== null ? jokeState.joke._minutes.toString() : '' } />
                <Text style={[layoutStyles.inputLabel, { paddingLeft: 5, paddingRight: 5 }]}>:</Text>
                <TextInput style={ [editJokeStyles.timeInput, this.state.seconds_input_valid ? {} : layoutStyles.errorInput] }
                           underlineColorAndroid='transparent'
                           placeholder="sec"
                           keyboardType="numeric"
                           onChangeText={(text) => jokeActions.setSeconds(text)}
                           value={ jokeState.joke._seconds !== null ? jokeState.joke._seconds.toString() : '' } />
              </View>
              <View style={ [layoutStyles.modalContentSection, { flexDirection: 'row', alignItems: 'center'  }] }>
                <Text style={ layoutStyles.inputLabel }>Name:</Text>
                <TextInput style={ [editJokeStyles.nameInput, this.state.name_input_valid ? {} : layoutStyles.errorInput] }
                           underlineColorAndroid='transparent'
                           placeholder="Name your joke here..."
                           onChangeText={(text) => { jokeActions.setName(text); setDirty(); }}
                           value={ jokeState.joke._name } />
              </View>
              <View style={ [layoutStyles.modalContentSection, {flex: 1} ] }>
                <MultilineTextInput style={ editJokeStyles.notesInput }
                           underlineColorAndroid='transparent'
                           placeholder="Type your joke notes here..."
                           autoComplete={ false }
                           onChangeText={(text) => { jokeActions.setNotes(text); setDirty(); }}
                           value={ jokeState.joke._notes } />
              </View>
              <View style={ { flexDirection: 'row', height: 47 }}>
                { (jokeState.joke._id !== -1) &&
                <View style={ { flex: 1 } }>
                  <Button type="surface" size="large" theme="red" selfStyle={ layoutStyles.deleteButton } onPress={ toggleDeleteConfirm }>
                    <Text style={layoutStyles.buttonText}>Delete</Text>
                  </Button>
                </View>
                }
                <View style={ { flex: 1 } }>
                  <Button type="surface" size="large" theme="gray" selfStyle={ layoutStyles.cancelButton } onPress={ toggleCancelConfirm }>
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
              <Text style={{ textAlign: 'center', fontSize: 20 }}>Are you SURE you want to delete this joke?</Text>
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
          { this.state.show_cancel_confirm &&
            <View style={ layoutStyles.confirmBox }>
              <Text style={{ textAlign: 'center', fontSize: 20 }}>You have changes that will be lost. Are you SURE you want to cancel?</Text>
              <View style={{ paddingTop: 25, flexDirection: 'row' }}>
                <Button type="surface" size="large" theme="red" selfStyle={ layoutStyles.deleteButton } onPress={ toggleCancelConfirm }>
                  <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>NO</Text>
                </Button>
                <Button type="surface" size="large" theme="blue" selfStyle={ [layoutStyles.confirmButton, { marginLeft: 10 }] } onPress={ cancel }>
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
    jokeState: state.joke
  }),
  (dispatch) => ({
    routingActions: bindActionCreators(routingActions, dispatch),
    jokeActions: bindActionCreators(jokeActions, dispatch)
  })
)(EditJoke);
