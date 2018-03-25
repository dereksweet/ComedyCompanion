import React, { Component } from 'react';
import { Animated } from 'react-native';

export default class ExpandingView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      heightAnim: new Animated.Value(0)
    };
  }
  performExpand() {
    Animated.spring(
      this.state.heightAnim,
      {toValue: this.props.expandedHeight}
    ).start();
  }
  performShrink() {
    Animated.spring(
      this.state.heightAnim,
      {toValue: 0}
    ).start();
  }
  render() {
    return (
      <Animated.View
        style={[...this.props.style, {maxHeight: this.state.heightAnim}]}>
        {this.props.children}
      </Animated.View>
    );
  }
}
