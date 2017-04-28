'use strict';

import React, {Component} from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import * as jokeListActions from '../../actions/jokeListActions';

import NoJokes from './Jokes/NoJokes';
import JokesList from './Jokes/JokesList';

import Joke from '../../models/joke';

import layoutStyles from '../../stylesheets/layoutStyles';

class Jokes extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { jokeListState, jokeListActions } = this.props;

    Joke.where(
      { '_name': "LIKE|'" + jokeListState.name_filter + "'", '_in_development':'EQ|' + jokeListState.in_development.toString() },
      'AND',
      jokeListState.sort_field,
      jokeListState.sort_order
    ).then((jokes) => {
      jokeListActions.setJokeList(jokes);
    });
  }

  render() {
    const { jokeListState } = this.props;

    return (
      <View style={layoutStyles.centeredFlex}>
        { (jokeListState.empty) && <NoJokes /> }
        { (!jokeListState.empty) && <JokesList /> }
      </View>
    );
  }
}

export default connect(state => ({
    jokeListState: state.joke_list
  }),
  (dispatch) => ({
    jokeListActions: bindActionCreators(jokeListActions, dispatch)
  })
)(Jokes);
