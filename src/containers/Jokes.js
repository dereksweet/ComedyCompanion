'use strict';

import React, {Component} from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import {Button} from 'react-native-ui-xg';

import layoutStyles from '../stylesheets/layoutStyles';

import {largeJokesIcon, addJokeIcon} from '../helpers/icons';

export default class Jokes extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={layoutStyles.container}>
        {largeJokesIcon}
        <Text style={ {paddingTop: 25} }>You do not appear to have any jokes yet!</Text>
        <Text style={ {paddingBottom: 20} }>Click the button below to add one..</Text>
        <View style={ {paddingBottom: 100} }>
          <Button type="surface" size="large" theme="red" onPress={() => { console.log('add joke') }}>
            <Text>{addJokeIcon}</Text>
            <Text style={layoutStyles.buttonText}>Add Joke</Text>
          </Button>
        </View>
      </View>
    );
  }
}
