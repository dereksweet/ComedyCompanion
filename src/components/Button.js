import React, {Component} from 'react';
import {View, TouchableHighlight, Text, StyleSheet} from 'react-native';

export default class Button extends Component {
  render() {
    return (
      <TouchableHighlight style={[styles.button, {backgroundColor: this.props.backgroundColor, height: this.props.height, width: this.props.width}]} onPress={this.props.onPress}>
        <View style={styles.buttonView}>
          {this.props.icon && <Text style={{marginRight: 10}}>{this.props.icon}</Text>}
          <Text style={[styles.text, {color: this.props.textColor || 'white'}]}>{this.props.buttonText}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  buttonView: {
    flexDirection:'row',
    alignItems: 'center'
  },
  button: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontWeight: '700'
  }
});