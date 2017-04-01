'use strict';

import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';

import layoutStyles from '../stylesheets/layoutStyles';

export default class Jokes extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { setVisiblePane } = this.props;
    return (
      <View style={layoutStyles.container}>
        <Text>Shows</Text>
        <TouchableHighlight onPress={() => setVisiblePane('jokes')}>
          <Text>Go To Jokes</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
