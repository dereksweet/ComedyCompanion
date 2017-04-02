'use strict';

import React, {Component} from 'react';
import { View, Text } from 'react-native';

import layoutStyles from '../stylesheets/layoutStyles';

export default class Jokes extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={layoutStyles.container}>
        <Text>Shows</Text>
      </View>
    );
  }
}
