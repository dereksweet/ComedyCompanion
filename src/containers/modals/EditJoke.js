'use strict';

import React, {Component} from 'react';
import { View, Text, TouchableHighlight, Switch, TextInput, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {Button} from 'react-native-ui-xg';

import * as jokesActions from '../../actions/jokesActions';
import * as layoutActions from '../../actions/layoutActions';

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
    const { layoutActions } = this.props;

    // layoutActions.setKeyboardHeight(e.endCoordinates.height);
    this.setState({
      keyboard_height: e.endCoordinates.height
    });
  }

  keyboardDidHide (e) {
    const { layoutActions } = this.props;

    // layoutActions.setKeyboardHeight(0);
    this.setState({
      keyboard_height: 0
    });
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  measureModalView(event) {
    console.log("Mesuring Modal View: ", event.nativeEvent.layout.height);

    // layoutActions.setModalHeight(event.nativeEvent.layout.height);
    this.setState({
      modal_height: event.nativeEvent.layout.height
    });
  }

  contentHeight() {
    return this.state.modal_height - (Platform.OS === 'ios'? this.state.keyboard_height : 0);
  }

  render() {
    const { jokesState, jokesActions, layoutState } = this.props;

    const save = () => {
      jokesState.joke.save();
      cancel();
    };

    const cancel = () => {
      Keyboard.dismiss();
      this.props.closeModal();
    };

    return (
      <View style={[layoutStyles.modal, layoutStyles.centeredFlex]}>
        <View style={layoutStyles.statusBarBuffer} />
        <View style={layoutStyles.modalContent} onLayout={(event) => this.measureModalView(event)}>
          <View style={{ height: this.contentHeight() }}>
            <View style={ [layoutStyles.modalContentSection, { flexDirection: 'row' }] }>
              <Text style={{ paddingRight: 10 }}>In Development:</Text>
              <Switch onValueChange={ jokesActions.toggleInDevelopment }
                      value={jokesState.joke._in_development} />
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Text>Rating: { jokesState.joke._rating.toFixed(1) }</Text>
              </View>
            </View>
            <View style={ [layoutStyles.modalContentSection, { flexDirection: 'row' }] }>
              <Text style={{ paddingRight: 10 }}>Title:</Text>
              <TextInput style={ editJokeStyles.nameInput }
                         onChangeText={(text) => jokesActions.setName(text)}
                         value={ jokesState.joke._name } />
            </View>
            <View style={ [layoutStyles.modalContentSection, {flex: 1} ] }>
              <TextInput style={ editJokeStyles.notesInput }
                         multiline={ true }
                         placeholder="Type your joke notes here..."
                         autoComplete={ false }
                         onChangeText={(text) => jokesActions.setNotes(text)}
                         value={ jokesState.joke._notes } />
            </View>
            <View style={ { flexDirection: 'row' }}>
              <View style={ { width: '50%' } }>
                <Button type="surface" size="large" theme="gray" onPress={ cancel }>
                  <Text style={layoutStyles.buttonText}>Cancel</Text>
                </Button>
              </View>
              <View style={ { width: '50%' } }>
                <Button type="surface" size="large" theme="red" onPress={ save }>
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
    jokesState: state.jokes,
    layoutState: state.layout
  }),
  (dispatch) => ({
    jokesActions: bindActionCreators(jokesActions, dispatch),
    layoutActions: bindActionCreators(layoutActions, dispatch)
  })
)(EditJoke);
