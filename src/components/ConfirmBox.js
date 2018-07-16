import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Button from './Button';

import layoutStyles from "../stylesheets/layoutStyles";

export default class ConfirmBox extends Component {
  render() {
    return (
      <View style={layoutStyles.confirmBox}>
        <View style={layoutStyles.confirmBoxTextView}>
          <Text style={layoutStyles.confirmBoxText}>
            {this.props.confirmText}
          </Text>
        </View>
        <View style={layoutStyles.confirmBoxButtonsView}>
          <Button
            onPress={this.props.noOnPress}
            buttonText="NO"
            backgroundColor='red'
            additionalStyles={[layoutStyles.deleteButton, {marginRight: 10}]}
          />
          <Button
            onPress={this.props.yesOnPress}
            buttonText="YES"
            backgroundColor='green'
            additionalStyles={layoutStyles.confirmButton}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});