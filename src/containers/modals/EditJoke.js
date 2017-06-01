'use strict';

import React, {Component} from 'react';
import { View, Text, TouchableHighlight, Switch, TextInput, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {Button} from 'react-native-ui-xg';

import * as routingActions from '../../actions/routingActions';
import * as jokeActions from '../../actions/jokeActions';
import * as jokeListActions from '../../actions/jokeListActions';

import JokeListHelper from '../../helpers/jokeListHelper';

import layoutStyles from '../../stylesheets/layoutStyles';
import editJokeStyles from '../../stylesheets/editJokeStyles';

class EditJoke extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal_height: 0,
      keyboard_height: 0,
      show_delete_confirm: false
    }
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
    const { jokeState, jokeListState, jokeActions, jokeListActions, routingActions } = this.props;

    const save = () => {
      jokeState.joke.save(() => {
        JokeListHelper.refreshJokeList();
        JokeListHelper.refreshJokeListEmpty();
      });
      cancel();
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
      this.setState({
        show_delete_confirm: !this.state.show_delete_confirm
      })
    };

    return (
      <View style={[layoutStyles.modal, layoutStyles.centeredFlex]}>
        <View style={layoutStyles.statusBarBuffer} />
        <View style={layoutStyles.modalContent} onLayout={(event) => this.measureModalView(event)}>
          <View style={{ height: this.contentHeight() }}>
            <View style={ [layoutStyles.modalContentSection, { flexDirection: 'row', alignItems: 'center' }] }>
              <Text style={ layoutStyles.inputLabel }>In Development:</Text>
              <Switch onValueChange={ jokeActions.toggleInDevelopment }
                      value={jokeState.joke._in_development} />
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Text style={ layoutStyles.inputLabel }></Text>
              </View>
            </View>
            <View style={ [layoutStyles.modalContentSection, { flexDirection: 'row', alignItems: 'center'  }] }>
              <Text style={ layoutStyles.inputLabel }>Name:</Text>
              <TextInput style={ editJokeStyles.nameInput }
                         underlineColorAndroid='transparent'
                         placeholder="Name your joke here..."
                         onChangeText={(text) => jokeActions.setName(text)}
                         value={ jokeState.joke._name } />
            </View>
            <View style={ [layoutStyles.modalContentSection, {flex: 1} ] }>
              <TextInput style={ editJokeStyles.notesInput }
                         multiline={ true }
                         underlineColorAndroid='transparent'
                         placeholder="Type your joke notes here..."
                         autoComplete={ false }
                         onChangeText={(text) => jokeActions.setNotes(text)}
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
        </View>
      </View>
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
