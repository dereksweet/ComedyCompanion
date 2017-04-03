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

import Icon from 'react-native-vector-icons/MaterialIcons';

class StatusBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { statusBarState, routingState, statusBarActions, routingActions } = this.props;

    const jokesIcon = (<Icon name="mood" size={25} color="#000" style={ { paddingTop: 6, paddingRight: 10 } } />);
    const setListsIcon = (<Icon name="list" size={25} color="#000" style={ { paddingTop: 6, paddingRight: 10 } } />);
    const showsIcon = (<Icon name="assistant" size={25} color="#000" style={ { paddingTop: 6, paddingRight: 10 } } />);

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
          <View style={ { flexDirection: 'row' } }>
            <Text style={statusBarStyles.title}>{routingState.title}</Text>
          </View>
        </View>
        <View style={ [statusBarStyles.navBar, { height: statusBarState.hamburger_active ? 40 : 0 }] }>
          <TouchableHighlight style={ [statusBarStyles.navLink, { borderRightColor: '#CCCCCC', borderRightWidth: 1}] }
                              onPress={() => clickNavLink('jokes')}>
            <View style={ { flexDirection: 'row' } }>
              { jokesIcon }
              <Text style={statusBarStyles.navLinkText}>Jokes</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={ [statusBarStyles.navLink, { borderRightColor: '#CCCCCC', borderRightWidth: 1}] }
                              onPress={() => clickNavLink('set_lists')}>
            <View style={ { flexDirection: 'row' } }>
              { setListsIcon }
              <Text style={statusBarStyles.navLinkText}>Set Lists</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={statusBarStyles.navLink}
                              onPress={() => clickNavLink('shows')}>
            <View style={ { flexDirection: 'row' } }>
              { showsIcon }
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
