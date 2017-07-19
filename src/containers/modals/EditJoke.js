'use strict';

import React, {Component} from 'react';
import { View, Text, TouchableHighlight, TouchableWithoutFeedback, Switch, TextInput, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {Button} from 'react-native-ui-xg';

import * as routingActions from '../../actions/routingActions';
import * as jokeActions from '../../actions/jokeActions';
import * as jokeListActions from '../../actions/jokeListActions';

import ShakingView from '../../components/ShakingView';
import MultilineTextInput from '../../components/MultilineTextinput';

import JokeListHelper from '../../helpers/jokeListHelper';

import layoutStyles from '../../stylesheets/layoutStyles';
import editJokeStyles from '../../stylesheets/editJokeStyles';

class EditJoke extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal_height: 0,
      keyboard_height: 0,
      show_delete_confirm: false,
      show_cancel_confirm: false,
      name_input_valid: true,
      allow_keyboard: true,
      allow_scroll_code: true
    };

    this.dirty = false;
    this.allowKeyboardTimeout = null;
    this.allowScollCodeTimeout = null;
  }

  componentWillMount () {
    var eventVerb = Platform.OS === 'ios'? 'Will' : 'Did';

    this.keyboardDidShowListener = Keyboard.addListener('keyboard' + eventVerb + 'Show', this.keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboard' + eventVerb + 'Hide', this.keyboardDidHide.bind(this));
  }

  keyboardDidShow (e) {
    if (this.state.allow_keyboard) {
      this.setState({
        keyboard_height: e.endCoordinates.height
      });
    }
  }

  keyboardDidHide (e) {
    this.setState({
      keyboard_height: 0
    });
  }

  componentWillUnmount () {
    this.setState({
      allow_keyboard: false,
      allow_scroll_code: false
    });

    if (this.allowKeyboardTimeout) {
      clearTimeout(this.allowKeyboardTimeout);
    }

    if (this.allowScrollCodeTimeout) {
      clearTimeout(this.allowScrollCodeTimeout);
    }

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
    const { jokeState, jokeListState, jokeActions, jokeListActions, routingActions } = this.props;

    const validateFields = () => {
      let fields_valid = true;

      if (jokeState.joke._name === '') {
        fields_valid = false;
        this.setState({
          name_input_valid: false
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

    const onMultilineScroll = () => {
      if (this.state.allow_scroll_code) {
        if (this.allowKeyboardTimeout) {
          clearTimeout(this.allowKeyboardTimeout)
        }

        this.setState({allow_keyboard: false});
        this.allowKeyboardTimeout = setTimeout(() => this.setState({allow_keyboard: true}), 500);
      }
    };

    const onMultilineFocus = () => {
      if (this.allowScrollCodeTimeout) {
        clearTimeout(this.allowScrollCodeTimeout)
      }

      this.setState({ allow_scroll_code: false });
    };

    const onMultilineBlur = () => {
      this.setState({ allow_scroll_code: true });
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
                           editable={ this.state.allow_keyboard }
                           placeholder="Type your joke notes here..."
                           autoComplete={ false }
                           onChangeText={(text) => { jokeActions.setNotes(text); setDirty(); }}
                           onScroll={ onMultilineScroll }
                           onFocus={ onMultilineFocus }
                           onBlur={ onMultilineBlur }
                           value={ jokeState.joke._notes } />
              </View>
              <View style={ { flexDirection: 'row' }}>
                { (jokeState.joke._id != -1) &&
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
    jokeState: state.joke,
    jokeListState: state.joke_list
  }),
  (dispatch) => ({
    routingActions: bindActionCreators(routingActions, dispatch),
    jokeActions: bindActionCreators(jokeActions, dispatch),
    jokeListActions: bindActionCreators(jokeListActions, dispatch)
  })
)(EditJoke);
