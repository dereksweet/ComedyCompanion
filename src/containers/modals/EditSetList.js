'use strict';

import React, {Component} from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import {Button} from 'react-native-ui-xg';

import layoutStyles from '../../stylesheets/layoutStyles';

export default class EditSetList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={layoutStyles.centeredFlex}>
        <Text>Editing Set List</Text>
      </View>
    );
  }
}
