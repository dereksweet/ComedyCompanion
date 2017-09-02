'use strict';

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import { View, Text, TouchableHighlight, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import Hamburger from 'react-native-hamburger';

import ExpandingView from '../components/ExpandingView';

import * as routingActions from '../actions/routingActions';
import * as statusBarActions from '../actions/statusBarActions';

import statusBarStyles from '../stylesheets/statusBarStyles';
import layoutStyles from '../stylesheets/layoutStyles';

import {jokesIcon, setListsIcon, showsIcon, settingsIcon, aboutIcon} from '../helpers/icons';

class StatusBar extends Component {
  constructor(props) {
    super(props);

    this.clickHamburger = this.clickHamburger.bind(this);
    this.clickNavLink = this.clickNavLink.bind(this);
    this.clickSettings = this.clickSettings.bind(this);
    this.clickAbout = this.clickAbout.bind(this);
  }

  clickHamburger() {
    Keyboard.dismiss();

    this.props.statusBarActions.toggleHamburgerActive();

    this.props.statusBarState.hamburger_active ? this.navBarView.performShrink() : this.navBarView.performExpand();
  };

  clickNavLink(pane) {
    Keyboard.dismiss();

    this.props.routingActions.setPane(pane);
    this.props.setActivePane(pane);
    this.props.statusBarActions.toggleHamburgerActive();
    this.hamburger._animate();

    this.navBarView.performShrink();
  };

  clickSettings() {
    this.props.routingActions.toggleSettings();
  };

  clickAbout() {
    this.props.routingActions.toggleAbout();
  };

  render() {
    const { statusBarState, routingState, statusBarActions, routingActions } = this.props;

    const renderSettingsButton = () => {
      return (
        <View style={ statusBarStyles.statusBarIcon }>
          <TouchableHighlight underlayColor="#EEEEEE"
                              style={{ flex: 1, alignItems: 'center', paddingTop: 7, paddingLeft: 7 }}
                              onPress={ this.clickSettings }>
            <Text style={{width: '100%'}}>{ settingsIcon }</Text>
          </TouchableHighlight>
        </View>
      );
    };

    const renderAboutButton = () => {
      return (
        <View style={ statusBarStyles.statusBarIcon }>
          <TouchableHighlight underlayColor="#EEEEEE"
                              style={{ flex: 1, alignItems: 'center', paddingTop: 7, paddingLeft: 7 }}
                              onPress={ this.clickAbout }>
            <Text style={{width: '100%'}}>{ aboutIcon }</Text>
          </TouchableHighlight>
        </View>
      );
    };

    const renderNavBarButton = (pane, icon, text, styles) => {
      return  <TouchableHighlight underlayColor="#EEEEEE"
                                  style={ [statusBarStyles.navLink, styles] }
                                  onPress={() => this.clickNavLink(pane)}>
                <View style={ { flexDirection: 'row' } }>
                  { icon }
                  <Text style={statusBarStyles.navLinkText}>{text}</Text>
                </View>
              </TouchableHighlight>
    };

    const renderNavBar = () => {
      return  <ExpandingView ref={(navBarView) => this.navBarView = navBarView}
                                style={ [statusBarStyles.navBar] }
                                expandedHeight={40}>
                { renderNavBarButton('jokes', jokesIcon, 'Jokes', { borderRightColor: '#CCCCCC', borderRightWidth: 1 }) }
                { renderNavBarButton('set_lists', setListsIcon, 'Set Lists', { borderRightColor: '#CCCCCC', borderRightWidth: 1 }) }
                { renderNavBarButton('shows', showsIcon, 'Shows') }
              </ExpandingView>
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
                       onPress={ this.clickHamburger }
            />
          </View>
          <View style={ { flexDirection: 'row' } }>
            <Text style={statusBarStyles.title}>{routingState.title}</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
            { renderAboutButton() }
            { renderSettingsButton() }
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
