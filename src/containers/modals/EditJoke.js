'use strict';

import React, {Component} from 'react';
import { View, Text, TouchableHighlight, Switch } from 'react-native';
import {Button} from 'react-native-ui-xg';

import Joke from '../../models/joke';

import layoutStyles from '../../stylesheets/layoutStyles';

export default class EditJoke extends Component {
  constructor(props) {
    super(props);

    let testJoke = new Joke();
    testJoke._in_development = true;
    // testJoke.setId(1);
    testJoke._name = 'Test Name';
    testJoke._notes = 'Test Notes';
    testJoke.save();
    console.log(testJoke);
  }

  render() {
    return (
      <View style={[layoutStyles.modal, layoutStyles.centeredFlex]}>
        <View style={layoutStyles.statusBarBuffer} />
        <View style={layoutStyles.modalContent}>
          <View style={ { flexDirection: 'row', alignItems: 'center' } }>
            <Text style={ { paddingRight: 10 }}>in Development: </Text>
            <Switch />
          </View>
        </View>
      </View>
    );
  }
}
