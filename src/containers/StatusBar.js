import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {View, Text, TouchableHighlight, Keyboard} from 'react-native';
import {connect} from 'react-redux';
import Hamburger from 'react-native-hamburger';

import ExpandingView from '../components/ExpandingView';

import * as routingActions from '../actions/routingActions';
import * as statusBarActions from '../actions/statusBarActions';

import statusBarStyles from '../stylesheets/statusBarStyles';
import layoutStyles from '../stylesheets/layoutStyles';

import {jokesIcon, setListsIcon, showsIcon, settingsIcon, aboutIcon, downloadIcon} from '../helpers/icons';

class StatusBar extends Component {
  constructor(props) {
    super(props);

    this.clickHamburger = this.clickHamburger.bind(this);
    this.clickNavLink = this.clickNavLink.bind(this);
    this.clickSettings = this.clickSettings.bind(this);
    this.clickAbout = this.clickAbout.bind(this);
    this.clickDownload = this.clickDownload.bind(this);
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

  clickDownload() {
    this.props.routingActions.toggleDownload();
  };

  renderStatusBarButton = (onPress, icon) => {
    return (
      <View style={statusBarStyles.statusBarIcon}>
        <TouchableHighlight underlayColor="#EEEEEE"
                            style={statusBarStyles.statusBarButton}
                            onPress={onPress}>
          <Text style={{width: '100%'}}>{icon}</Text>
        </TouchableHighlight>
      </View>
    );
  };

  renderNavBarButton = (pane, icon, text, styles) => {
    return <TouchableHighlight underlayColor="#EEEEEE"
                               style={[statusBarStyles.navLink, styles]}
                               onPress={() => this.clickNavLink(pane)}>
      <View style={{flexDirection: 'row'}}>
        {icon}
        <Text style={statusBarStyles.navLinkText}>{text}</Text>
      </View>
    </TouchableHighlight>
  };

  renderNavBar = () => {
    return <ExpandingView ref={(navBarView) => this.navBarView = navBarView}
                          style={[statusBarStyles.navBar]}
                          expandedHeight={40}>
      {this.renderNavBarButton('jokes', jokesIcon, 'Jokes', {borderRightColor: '#CCCCCC', borderRightWidth: 1})}
      {this.renderNavBarButton('set_lists', setListsIcon, 'Set Lists', {borderRightColor: '#CCCCCC',borderRightWidth: 1})}
      {this.renderNavBarButton('shows', showsIcon, 'Shows')}
    </ExpandingView>
  };

  render() {
    const {statusBarState, routingState} = this.props;

    return (
      <View>
        <View style={layoutStyles.statusBarBuffer}/>
        <View style={layoutStyles.statusBar}>
          <View style={statusBarStyles.hamburger}>
            <Hamburger ref={hamburger => {
              this.hamburger = hamburger
            }}
                       active={statusBarState.hamburger_active}
                       type="spinCross"
                       color="black"
                       onPress={this.clickHamburger}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={statusBarStyles.title}>{routingState.title}</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
            {this.renderStatusBarButton(this.clickAbout, aboutIcon)}
            {this.renderStatusBarButton(this.clickDownload, downloadIcon)}
            {this.renderStatusBarButton(this.clickSettings, settingsIcon)}
          </View>
        </View>
        {this.renderNavBar()}
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
