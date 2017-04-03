import React, { Component } from 'react';
import { Animated } from 'react-native';

export default class FadeInView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0) // init opacity 0
    };
  }
  performFadeIn() {
    Animated.timing(          // Uses easing functions
      this.state.fadeAnim,    // The value to drive
      {toValue: 1}            // Configuration
    ).start();                // Don't forget start!
  }
  performFadeOut() {
    Animated.timing(          // Uses easing functions
      this.state.fadeAnim,    // The value to drive
      {toValue: 0}            // Configuration
    ).start();                // Don't forget start!
  }
  render() {
    return (
      <Animated.View          // Special animatable View
        style={[...this.props.style, {opacity: this.state.fadeAnim}]}>
        {this.props.children}
      </Animated.View>
    );
  }
}
