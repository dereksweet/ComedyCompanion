'use strict';

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import { View, Text, TouchableHighlight } from 'react-native';
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
    const { statusBarState, routingState, statusBarActions, routingActions } = this.props;

    const clickNavLink = (pane) => {
      routingActions.setVisiblePane(pane);
      statusBarActions.toggleHamburgerActive();
      this.hamburger._animate();
    };

    return (
      <View>
        <View style={layoutStyles.statusBarBuffer} />
        <View style={layoutStyles.statusBar}>
          <View style={statusBarStyles.hamburger}>
            <Hamburger ref={hamburger => { this.hamburger = hamburger }}
                       active={statusBarState.hamburger_active}
                       type="spinCross"
                       color="black"
                       onPress={() => statusBarActions.toggleHamburgerActive()}
            />
          </View>
          <View style={statusBarStyles.title}>
            <Text>{routingState.title}</Text>
          </View>
        </View>
        <View style={ [statusBarStyles.navBar, { height: statusBarState.hamburger_active ? 40 : 0 }] }>
          <TouchableHighlight style={ [statusBarStyles.navLink, { borderRightColor: '#CCCCCC', borderRightWidth: 1}] }
                              onPress={() => clickNavLink('jokes')}>
            <View >
              <Text style={statusBarStyles.navLinkText}>Jokes</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={ [statusBarStyles.navLink, { borderRightColor: '#CCCCCC', borderRightWidth: 1}] }
                              onPress={() => clickNavLink('set_lists')}>
            <View>
              <Text style={statusBarStyles.navLinkText}>Set Lists</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={statusBarStyles.navLink}
                              onPress={() => clickNavLink('shows')}>
            <View>
              <Text style={statusBarStyles.navLinkText}>Shows</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default connect(state => ({
  statusBarState: state.statusBar,
  routingState: state.routing
}),
(dispatch) => ({
  statusBarActions: bindActionCreators(statusBarActions, dispatch),
  routingActions: bindActionCreators(routingActions, dispatch)
})
)(StatusBar);
