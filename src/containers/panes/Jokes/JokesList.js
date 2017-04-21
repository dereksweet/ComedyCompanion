'use strict';

import React, {Component} from 'react';
import { View, Text } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {Button} from 'react-native-ui-xg';

import * as routingActions from '../../../actions/routingActions';

import layoutStyles from '../../../stylesheets/layoutStyles';

import {largeJokesIcon, addJokeIcon} from '../../../helpers/icons';

class JokesList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { routingActions } = this.props;

    const addJoke = () => {
      routingActions.openModal();
    };

    return (
      <View style={layoutStyles.centeredFlex}>
        <Text>Hi There</Text>
      </View>
    );
  }
}

export default connect(state => ({

  }),
  (dispatch) => ({
    routingActions: bindActionCreators(routingActions, dispatch)
  })
)(JokesList);
