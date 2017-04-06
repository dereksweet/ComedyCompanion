'use strict';

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import { View, Text, TouchableHighlight } from 'react-native';
import Hamburger from 'react-native-hamburger';
import { connect } from 'react-redux';

import ExpandingView from '../components/ExpandingView';

import * as routingActions from '../actions/routingActions';
import * as statusBarActions from '../actions/statusBarActions';

import statusBarStyles from '../stylesheets/statusBarStyles';
import layoutStyles from '../stylesheets/layoutStyles';

import {jokesIcon, setListsIcon, showsIcon} from '../helpers/icons';

class StatusBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { statusBarState, routingState, statusBarActions, routingActions } = this.props;

    const clickNavLink = (pane) => {
      routingActions.setTitle(pane);
      // routingActions.setVisiblePanes([pane]);
      statusBarActions.toggleHamburgerActive();
      this.hamburger._animate();
      this.navBarView.performShrink();
    };

    const clickHamburger = () => {
      statusBarActions.toggleHamburgerActive();

      statusBarState.hamburger_active ? this.navBarView.performShrink() : this.navBarView.performExpand();
    };

    let renderNavBarButton = (pane, icon, text, styles) => {
      return  <TouchableHighlight style={ [statusBarStyles.navLink, styles] }
                                  onPress={() => clickNavLink(pane)}>
                <View style={ { flexDirection: 'row' } }>
                  { icon }
                  <Text style={statusBarStyles.navLinkText}>{text}</Text>
                </View>
              </TouchableHighlight>
    };

    let renderNavBar = () => {
      return  <ExpandingView ref={(navBarView) => this.navBarView = navBarView}
                                style={ [statusBarStyles.navBar] }
                                expandedHeight={40}>
                { renderNavBarButton('jokes', jokesIcon, 'Jokes', { borderRightColor: '#CCCCCC', borderRightWidth: 1 }) }
                { renderNavBarButton('set_lists', setListsIcon, 'Set Lists', { borderRightColor: '#CCCCCC', borderRightWidth: 1 }) }
                { renderNavBarButton('shows', showsIcon, 'Shows') }
              </ExpandingView>
    };

    let measureView = (event) => {
      statusBarActions.setStatusBarHeight(event.nativeEvent.layout.height);
    };

    return (
      <View onLayout={(event) => measureView(event)}>
        <View style={layoutStyles.statusBarBuffer} />
        <View style={layoutStyles.statusBar}>
          <View style={statusBarStyles.hamburger}>
            <Hamburger ref={hamburger => { this.hamburger = hamburger }}
                       active={statusBarState.hamburger_active}
                       type="spinCross"
                       color="black"
                       onPress={() => clickHamburger()}
            />
          </View>
          <View style={ { flexDirection: 'row' } }>
            <Text style={statusBarStyles.title}>{routingState.title}</Text>
          </View>
        </View>
        { renderNavBar() }
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
