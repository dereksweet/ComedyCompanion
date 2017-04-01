'use strict';

import React, {Component} from 'react';
import { View, Text } from 'react-native';

import layoutStyles from '../stylesheets/layoutStyles';

export default class StatusBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <View style={layoutStyles.statusBarBuffer} />
        <View style={layoutStyles.statusBar}>
          <Text>Comedy Companion</Text>
        </View>
      </View>
    );
  }
}
