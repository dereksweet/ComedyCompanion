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

  shouldComponentUpdate(nextProps) {
    const differentEmpty = this.props.jokeListState.empty !== nextProps.jokeListState.empty;
    return differentEmpty;
  }

  componentDidMount() {
    JokeListHelper.refreshJokeList();
    JokeListHelper.refreshJokeListEmpty();
  }

  render() {
    console.log("Render Jokes.js");

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
