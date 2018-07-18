import React, {Component} from 'react';
import {View, TouchableHighlight, Text, StyleSheet} from 'react-native';

export default class Button extends Component {
  render() {
    return (
      <TouchableHighlight style={[styles.button, {backgroundColor: this.props.backgroundColor || '#BBBBBB'}, this.props.additionalStyles]} onPress={this.props.onPress}>
        <View style={styles.buttonView}>
          {this.props.icon && <Text style={this.props.buttonText && {marginRight: 10}}>{this.props.icon}</Text>}
          {this.props.buttonText && <Text style={[styles.text, {color: this.props.textColor || 'white'}]}>{this.props.buttonText}</Text>}
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  buttonView: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6
  },
  text: {
    color: '#FFFFFF',
    fontWeight: '700'
  }
});