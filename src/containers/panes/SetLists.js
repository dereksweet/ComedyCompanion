'use strict';

import React, {Component} from 'react';
import { View, Text } from 'react-native';
import {Button} from 'react-native-ui-xg';

import layoutStyles from '../../stylesheets/layoutStyles';

import {largeSetListsIcon, addSetListIcon} from '../../helpers/icons';

export default class Jokes extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={layoutStyles.centeredFlex}>
        {largeSetListsIcon}
        <Text style={ {paddingTop: 25} }>You do not appear to have any set lists yet!</Text>
        <Text style={ {paddingBottom: 20} }>Click the button below to add one..</Text>
        <View style={ {paddingBottom: 100} }>
          <Button type="surface" size="large" theme="red" onPress={ this.props.openModal }>
            <Text>{addSetListIcon}</Text>
            <Text style={layoutStyles.buttonText}>Add Set List</Text>
          </Button>
        </View>
      </View>
    );
  }
}
