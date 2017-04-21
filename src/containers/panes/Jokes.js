'use strict';

import React, {Component} from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import * as jokesActions from '../../actions/jokesActions';

import NoJokes from './Jokes/NoJokes';
import JokesList from './Jokes/JokesList';

import Joke from '../../models/Joke';

import layoutStyles from '../../stylesheets/layoutStyles';

class Jokes extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    Joke.all().then((jokes) => {
      jokesActions.setJokeList(jokes);
    });
  }

  componentDidMount() {
    const { jokesActions } = this.props;

    // Joke.destroy_all();

    Joke.all().then((jokes) => {
      jokesActions.setJokeList(jokes);
    });
  }

  render() {
    console.log("Rendering");
    const { jokesState } = this.props;

    return (
      <View style={layoutStyles.centeredFlex}>
        { jokesState.joke_list.length == 0 && <NoJokes /> }
        { jokesState.joke_list.length > 0 && <JokesList /> }
      </View>
    );
  }
}

export default connect(state => ({
    jokesState: state.jokes
  }),
  (dispatch) => ({
    jokesActions: bindActionCreators(jokesActions, dispatch)
  })
)(Jokes);
