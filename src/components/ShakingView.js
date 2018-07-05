import React, { Component } from 'react';
import { Animated } from 'react-native';

export default class ShakingView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      leftAnim: new Animated.Value(0)
    };
  }

  performShake() {
    Animated.sequence([
      Animated.timing(
        this.state.leftAnim,
        { toValue: 25, duration: 100 }
      ),
      Animated.timing(
        this.state.leftAnim,
        { toValue: -25, duration: 50 }
      ),
      Animated.timing(
        this.state.leftAnim,
        { toValue:0, duration: 50 }
      )]).start();
  }

  render() {
    return (
      <Animated.View
        style={[...this.props.style, { left: this.state.leftAnim }]}>
        { this.props.children }
      </Animated.View>
    );
  }
}
