import React, {Component} from 'react';
import { View, Text, Switch, TextInput, Keyboard } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import BaseModal from './BaseModal';

import * as jokeActions from '../../actions/jokeActions';
import * as routingActions from '../../actions/routingActions';

import Button from '../../components/Button';
import FooterButton from '../../components/FooterButton';
import MultilineTextInput from '../../components/MultilineTextinput';

import JokeListHelper from '../../helpers/jokeListHelper';

import editJokeStyles from '../../stylesheets/editJokeStyles';
import layoutStyles from '../../stylesheets/layoutStyles';

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

  componentWillUnmount () {
    JokeListHelper.refreshJokeList();
    JokeListHelper.refreshJokeListEmpty();
  }

  validateFields = () => {
    const {jokeState} = this.props;

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
    } catch (error) {
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
    } catch (error) {
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

  save = () => {
    const {jokeState} = this.props;

    if (this.validateFields()) {
      jokeState.joke.save(() => {
        JokeListHelper.refreshJokeList();
        JokeListHelper.refreshJokeListEmpty();
      });
      this.cancel();
    }
  };

  cancel = () => {
    const {routingActions} = this.props;

    Keyboard.dismiss();
    routingActions.closeModal();
  };

  destroy = () => {
    const {jokeState, routingActions} = this.props;

    jokeState.joke.destroy();
    routingActions.closeModal();
  };

  toggleDeleteConfirm = () => {
    Keyboard.dismiss();

    this.setState({
      show_delete_confirm: !this.state.show_delete_confirm
    })
  };

  toggleCancelConfirm = () => {
    Keyboard.dismiss();

    if (this.dirty) {
      this.setState({
        show_cancel_confirm: !this.state.show_cancel_confirm
      })
    } else {
      this.cancel();
    }
  };

  setDirty = () => {
    this.dirty = true;
  };

  render() {
    const {jokeState, jokeActions} = this.props;

    return (
      <BaseModal ref={(editJokeView) => this.editJokeView = editJokeView}>
        <View style={[layoutStyles.modalContentSection, layoutStyles.centeredFlexRow]}>
          <Text style={layoutStyles.inputLabel}>In Development:</Text>
          <Switch
            value={jokeState.joke._in_development}
            onValueChange={() => {
              jokeActions.toggleInDevelopment();
              this.setDirty();
            }}
          />
          <View style={{flex: 1}} />
          <TextInput
            style={[editJokeStyles.timeInput, this.state.minutes_input_valid ? {} : layoutStyles.errorInput]}
            underlineColorAndroid='transparent'
            placeholder="min"
            keyboardType="numeric"
            onChangeText={(text) => jokeActions.setMinutes(text)}
            value={jokeState.joke._minutes !== null ? jokeState.joke._minutes.toString() : ''}
          />
          <Text style={[layoutStyles.inputLabel, {paddingLeft: 5, paddingRight: 5}]}>:</Text>
          <TextInput
            style={[editJokeStyles.timeInput, this.state.seconds_input_valid ? {} : layoutStyles.errorInput]}
            underlineColorAndroid='transparent'
            placeholder="sec"
            keyboardType="numeric"
            onChangeText={(text) => jokeActions.setSeconds(text)}
            value={jokeState.joke._seconds !== null ? jokeState.joke._seconds.toString() : ''}
          />
        </View>
        <View style={[layoutStyles.modalContentSection, layoutStyles.centeredFlexRow]}>
          <Text style={layoutStyles.inputLabel}>Name:</Text>
          <TextInput
            value={jokeState.joke._name}
            style={[editJokeStyles.nameInput, this.state.name_input_valid ? {} : layoutStyles.errorInput]}
            underlineColorAndroid='transparent'
            placeholder="Name your joke here..."
            onChangeText={(text) => {
              jokeActions.setName(text);
              this.setDirty();
            }}
          />
        </View>
        <View style={[layoutStyles.modalContentSection, {flex: 1}]}>
          <MultilineTextInput
            value={jokeState.joke._notes}
            style={editJokeStyles.notesInput}
            underlineColorAndroid='transparent'
            placeholder="Type your joke notes here..."
            autoComplete={false}
            onChangeText={(text) => {
              jokeActions.setNotes(text);
              this.setDirty();
            }}
          />
        </View>

        <View style={layoutStyles.flexRowStretched}>
          {(jokeState.joke._id !== -1) &&
          <FooterButton
            onPress={this.toggleDeleteConfirm}
            buttonText="Delete"
            backgroundColor='red'
          />
          }
          <FooterButton
            onPress={this.toggleCancelConfirm}
            buttonText="Cancel"
          />
          <FooterButton
            onPress={this.save}
            buttonText="Save"
            backgroundColor='green'
          />
        </View>

        {this.state.show_delete_confirm &&
        <View style={layoutStyles.confirmBox}>
          <View style={layoutStyles.confirmBoxTextView}>
            <Text style={layoutStyles.confirmBoxText}>
              Are you SURE you want to delete this joke?
            </Text>
          </View>
          <View style={layoutStyles.confirmBoxButtonsView}>
            <Button
              onPress={this.toggleDeleteConfirm}
              buttonText="NO"
              backgroundColor='red'
              additionalStyles={[layoutStyles.deleteButton, {marginRight: 10}]}
            />
            <Button
              onPress={this.destroy}
              buttonText="YES"
              backgroundColor='green'
              additionalStyles={layoutStyles.confirmButton}
            />
          </View>
        </View>
        }
        {this.state.show_cancel_confirm &&
        <View style={layoutStyles.confirmBox}>
          <View style={layoutStyles.confirmBoxTextView}>
            <Text style={layoutStyles.confirmBoxText}>
              You have changes that will be lost. Are you SURE you want to cancel?
            </Text>
          </View>
          <View style={layoutStyles.confirmBoxButtonsView}>
            <Button
              onPress={this.toggleCancelConfirm}
              buttonText="NO"
              backgroundColor='red'
              additionalStyles={[layoutStyles.deleteButton, {marginRight: 10}]}
            />
            <Button
              onPress={this.cancel}
              buttonText="YES"
              backgroundColor='green'
              additionalStyles={layoutStyles.confirmButton}
            />
          </View>
        </View>
        }
      </BaseModal>
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
