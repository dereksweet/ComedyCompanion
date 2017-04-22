'use strict';

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import { View, Text, TouchableHighlight } from 'react-native';
import Hamburger from 'react-native-hamburger';
import { connect } from 'react-redux';

import ExpandingView from '../components/ExpandingView';

import Joke from '../models/Joke';

import * as routingActions from '../actions/routingActions';
import * as jokeActions from '../actions/jokeActions';
import * as statusBarActions from '../actions/statusBarActions';

import statusBarStyles from '../stylesheets/statusBarStyles';
import layoutStyles from '../stylesheets/layoutStyles';

import {jokesIcon, setListsIcon, showsIcon, addIcon} from '../helpers/icons';

class StatusBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { statusBarState, routingState, statusBarActions, routingActions, jokeActions } = this.props;

    const clickNavLink = (pane) => {
      routingActions.setPane(pane);
      this.props.setActivePane(pane);
      statusBarActions.toggleHamburgerActive();
      this.hamburger._animate();
      this.navBarView.performShrink();
    };

    const clickHamburger = () => {
      statusBarActions.toggleHamburgerActive();

      statusBarState.hamburger_active ? this.navBarView.performShrink() : this.navBarView.performExpand();
    };

    const addJoke = () => {
      if (routingState.pane == 'jokes') {
        jokeActions.setJoke(new Joke());
      }

      routingActions.openModal();
    };

    let renderAddButton = () => {
      return (
        <View style={ statusBarStyles.addIcon }>
          <TouchableHighlight style={{ flex: 1, alignItems: 'center', paddingTop: 7, paddingLeft: 7 }}
                              onPress={ addJoke }>
            <Text style={{width: '100%'}}>{ addIcon }</Text>
          </TouchableHighlight>
        </View>
      );
    };

    const renderNavBarButton = (pane, icon, text, styles) => {
      return  <TouchableHighlight style={ [statusBarStyles.navLink, styles] }
                                  onPress={() => clickNavLink(pane)}>
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
                       onPress={() => clickHamburger()}
            />
          </View>
          <View style={ { flexDirection: 'row' } }>
            <Text style={statusBarStyles.title}>{routingState.title}</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
            { renderAddButton() }
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
  jokeActions: bindActionCreators(jokeActions, dispatch),
  statusBarActions: bindActionCreators(statusBarActions, dispatch),
  routingActions: bindActionCreators(routingActions, dispatch)
})
)(StatusBar);
