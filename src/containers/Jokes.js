'use strict';

import React, {Component} from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

import layoutStyles from '../stylesheets/layoutStyles';

export default class Jokes extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { setVisiblePane } = this.props;
    return (
      <View style={layoutStyles.container}>
        <Text>Jokes</Text>
        <TouchableHighlight onPress={() => setVisiblePane('set_lists')}>
          <Text>Go To Set Lists</Text>
        </TouchableHighlight>
      </View>
    );
  }
}