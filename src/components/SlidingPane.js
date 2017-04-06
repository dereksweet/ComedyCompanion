import React, { Component } from 'react';
import { Animated, Dimensions } from 'react-native';

export default class SlidingPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leftAnim: new Animated.Value(0)
    };
  }
  warpLeft() {
    var {height, width} = Dimensions.get('window');

    this.setState({leftAnim: new Animated.Value(-width)});
  }
  slideLeft() {
    var {height, width} = Dimensions.get('window');

    Animated.spring(
      this.state.leftAnim,
      {toValue: -width}
    ).start();
  }
  slideCenter() {
    Animated.spring(
      this.state.leftAnim,
      {toValue: 0}
    ).start();
  }
  slideRight() {
    var {height, width} = Dimensions.get('window');

    Animated.spring(
      this.state.leftAnim,
      {toValue: width}
    ).start();
  }
  warpRight() {
    var {height, width} = Dimensions.get('window');

    this.setState({leftAnim: new Animated.Value(width)});
  }
  render() {
    return (
      <Animated.View
        style={[...this.props.style, { left: this.state.leftAnim }]}>
        {this.props.children}
      </Animated.View>
    );
  }
}
