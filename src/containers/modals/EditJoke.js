'use strict';

import React, {Component} from 'react';
import { View, Text, TouchableHighlight, Switch, TextInput, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {Button} from 'react-native-ui-xg';

import * as routingActions from '../../actions/routingActions';
import * as jokeActions from '../../actions/jokeActions';
import * as jokeListActions from '../../actions/jokeListActions';

import Joke from '../../models/Joke';

import layoutStyles from '../../stylesheets/layoutStyles';
import editJokeStyles from '../../stylesheets/editJokeStyles';

class EditJoke extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal_height: 0,
      keyboard_height: 0
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
    const { jokeListActions } = this.props;

    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();

    Joke.all().then((jokes) => {
      jokeListActions.setJokeList(jokes);
    });
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
        Joke.all(jokeListState.sort_order, jokeListState.sort_direction).then((jokes) => {
          jokeListActions.setJokeList(jokes);
        });
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
                <Text style={ layoutStyles.inputLabel }>Rating: { jokeState.joke._rating.toFixed(1) }</Text>
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
                <Button type="surface" size="large" theme="red" onPress={ destroy }>
                  <Text style={layoutStyles.buttonText}>Delete</Text>
                </Button>
              </View>
              }
              <View style={ { flex: 1 } }>
                <Button type="surface" size="large" theme="gray" onPress={ cancel }>
                  <Text style={layoutStyles.buttonText}>Cancel</Text>
                </Button>
              </View>
              <View style={ { flex: 1 } }>
                <Button type="surface" size="large" theme="blue" onPress={ save }>
                  <Text style={layoutStyles.buttonText}>Save</Text>
                </Button>
              </View>
            </View>
          </View>
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
