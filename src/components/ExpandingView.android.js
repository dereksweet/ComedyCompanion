import React, { Component } from 'react';
import { View } from 'react-native';

export default class ExpandingView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 0
    };
  }
  performExpand() {
    this.setState({
      height: this.props.expandedHeight
    })
  }
  performShrink() {
    this.setState({
      height: 0
    })
  }
  render() {
    return (
      <View style={[...this.props.style, {maxHeight: this.state.height}]}>
        {this.props.children}
      </View>
    );
  }
}
