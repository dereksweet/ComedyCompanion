'use strict';

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import { View, Text } from 'react-native';
import Hamburger from 'react-native-hamburger';
import { connect } from 'react-redux';

import * as routingActions from '../actions/routingActions';
import * as statusBarActions from '../actions/statusBarActions';

import statusBarStyles from '../stylesheets/statusBarStyles';
import layoutStyles from '../stylesheets/layoutStyles';

class StatusBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state, actions } = this.props;
    return (
      <View>
        <View style={layoutStyles.statusBarBuffer} />
        <View style={layoutStyles.statusBar}>
          <View style={statusBarStyles.hamburger}>
            <Hamburger active={state.hamburger_active}
                       type="spinCross"
                       color="black"
                       onPress={() => actions.toggleHamburgerActive()}
            />
          </View>
          <View style={statusBarStyles.title}>
            <Text>Comedy Companion</Text>
          </View>
        </View>
        <View style={[statusBarStyles.navBar, { height: state.hamburger_active ? 40 : 0 }] }>

        </View>
      </View>
    );
  }
}

export default connect(state => ({
  state: state.statusBar
}),
(dispatch) => ({
  actions: bindActionCreators(statusBarActions, dispatch)
})
)(StatusBar);
