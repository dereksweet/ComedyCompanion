'use strict';

import React, {Component} from 'react';
import { View, Text, TouchableHighlight, Switch } from 'react-native';
import {Button} from 'react-native-ui-xg';

import Joke from '../../models/joke';

import layoutStyles from '../../stylesheets/layoutStyles';

export default class EditJoke extends Component {
  constructor(props) {
    super(props);

    // let testJoke = new Joke();
    // testJoke._in_development = true;
    // testJoke._name = 'Test Name1';
    // testJoke._notes = 'Test Notes1';
    // testJoke._rating = 0.1;
    // testJoke.save();

    // Joke.get(1).then((joke) => {
    //   console.log(joke);
    //   joke._in_development = false;
    //   joke.save();
    // });

    // Joke.all().then((jokes) => {
    //   console.log(jokes);
    // });

    // Joke.where('AND', { _rating: "eq|0.2", _name: "eq|'Test Name2'" }).then((jokes) => {
    //   console.log(jokes);
    // });

    // Joke.destroy_all();
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
