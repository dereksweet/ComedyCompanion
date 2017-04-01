'use strict';

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import * as routingActions from '../actions/routingActions';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8ECC2'
  }
});

class MainApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state, actions } = this.props;
    console.log(state);
    return (
      <View style={styles.container}>
        <Text>Comedy Companion</Text>
        <Text>{state.visible_pane}</Text>
        <TouchableHighlight onPress={() => actions.setVisiblePane('set_lists')}>
          <Text>Change Pane</Text>
        </TouchableHighlight>
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
