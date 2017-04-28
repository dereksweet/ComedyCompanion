'use strict';

import React, {Component} from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import * as jokeListActions from '../../actions/jokeListActions';

import NoJokes from './Jokes/NoJokes';
import JokesList from './Jokes/JokesList';

import JokeListHelper from '../../helpers/jokeListHelper';

import layoutStyles from '../../stylesheets/layoutStyles';

class Jokes extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    JokeListHelper.refreshJokeList();
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
