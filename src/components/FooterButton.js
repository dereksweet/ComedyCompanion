import React, {Component} from 'react';
import {View, TouchableHighlight, Text, StyleSheet} from 'react-native';

export default class FooterButton extends Component {
  render() {
    return (
      <TouchableHighlight style={[styles.button, {backgroundColor: this.props.backgroundColor || '#BBBBBB'}]} onPress={this.props.onPress}>
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
    flex: 1,
    flexBasis: 1,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontWeight: '700'
  }
});