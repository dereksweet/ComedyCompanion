'use strict';

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import * as routingActions from '../actions/routingActions';
import { connect } from 'react-redux';

import layoutStyles from '../stylesheets/layoutStyles';

import Jokes from './Jokes.js'
import SetLists from './SetLists.js'
import Shows from './Shows.js'

class MainApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state, actions } = this.props;
    return (
      <View style={layoutStyles.container}>
        <Text>Comedy Companion</Text>
        {state.visible_pane == 'jokes' && <Jokes {...actions} />}
        {state.visible_pane == 'set_lists' && <SetLists {...actions} />}
        {state.visible_pane == 'shows' && <Shows {...actions} />}
      </View>
    );
  }
}

export default connect(state => ({
    state: state.routing
  }),
  (dispatch) => ({
    actions: bindActionCreators(routingActions, dispatch)
  })
)(MainApp);
