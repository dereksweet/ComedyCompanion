import React, {Component} from 'react';
import { View, Text } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import * as jokeActions from '../../../actions/jokeActions';
import * as routingActions from '../../../actions/routingActions';

import Button from '../../../components/Button';

import {largeJokesIcon, addJokeIcon} from '../../../helpers/icons';

import Joke from '../../../models/joke';

import layoutStyles from '../../../stylesheets/layoutStyles';

class NoJokes extends Component {
  addJoke = () => {
    const { routingActions, jokeActions } = this.props;

    jokeActions.setJoke(new Joke());
    routingActions.openModal();
  };

  render() {
    return (
      <View style={layoutStyles.centeredFlex}>
        {largeJokesIcon}
        <Text style={{paddingTop: 25}}>You do not appear to have any jokes yet!</Text>
        <Text style={{paddingBottom: 20}}>Click the button below to add one..</Text>
        <View style={{paddingBottom: 100, alignItems: 'center'}}>
          <Button
            onPress={this.addJoke}
            buttonText="Add Joke"
            backgroundColor='green'
            additionalStyles={{width: 150, height: 45}}
            icon={addJokeIcon}
          />
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
)(NoJokes);
