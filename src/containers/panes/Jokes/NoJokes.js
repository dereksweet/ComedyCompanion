'use strict';

import React, {Component} from 'react';
import { View, Text } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {Button} from 'react-native-ui-xg';

import * as jokeActions from '../../../actions/jokeActions';
import * as routingActions from '../../../actions/routingActions';

import Joke from '../../../models/joke';

import layoutStyles from '../../../stylesheets/layoutStyles';

import {largeJokesIcon, addJokeIcon} from '../../../helpers/icons';

class Jokes extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { routingActions, jokeActions } = this.props;

    const addJoke = () => {
      jokeActions.setJoke(new Joke());
      routingActions.openModal();
    };

    return (
      <View style={layoutStyles.centeredFlex}>
        {largeJokesIcon}
        <Text style={ {paddingTop: 25} }>You do not appear to have any jokes yet!</Text>
        <Text style={ {paddingBottom: 20} }>Click the button below to add one..</Text>
        <View style={ {paddingBottom: 100} }>
          <Button type="surface" size="large" theme="red" onPress={ addJoke }>
            <Text>{addJokeIcon}</Text>
            <Text style={layoutStyles.buttonText}>Add Joke</Text>
          </Button>
        </View>
      </View>
    );
  }
}

export default connect(state => ({

  }),
  (dispatch) => ({
    jokeActions: bindActionCreators(jokeActions, dispatch),
    routingActions: bindActionCreators(routingActions, dispatch)
  })
)(Jokes);
