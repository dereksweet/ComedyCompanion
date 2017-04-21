'use strict';

import React, {Component} from 'react';
import { View, Text } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {Button} from 'react-native-ui-xg';

import Joke from '../../../models/Joke';

import * as jokeActions from '../../../actions/jokeActions';
import * as routingActions from '../../../actions/routingActions';

import layoutStyles from '../../../stylesheets/layoutStyles';

import {largeJokesIcon, jokesIcon} from '../../../helpers/icons';

class JokesList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { jokeActions, routingActions } = this.props;

    const editJoke = () => {
      Joke.get(1).then((joke) => {
        jokeActions.setJoke(joke);
        routingActions.openModal();
      });
    };

    return (
      <View style={layoutStyles.centeredFlex}>
        {largeJokesIcon}
        <Text style={ {paddingTop: 25} }>You have a joke!</Text>
        <Text style={ {paddingBottom: 20} }>Click the button below to edit it..</Text>
        <View style={ {paddingBottom: 100} }>
          <Button type="surface" size="large" theme="red" onPress={ editJoke }>
            <Text style={{ color: '#FFFFFF' }}>Edit Joke</Text>
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
)(JokesList);
