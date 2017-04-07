'use strict';

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import { View, Text, TouchableHighlight, Dimensions } from 'react-native';
import * as routingActions from '../actions/routingActions';
import { connect } from 'react-redux';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import SlidingPane from '../components/SlidingPane';

import layoutStyles from '../stylesheets/layoutStyles';

import StatusBar from './StatusBar.js';

import Jokes from './panes/Jokes.js';
import SetLists from './panes/SetLists.js';
import Shows from './panes/Shows.js';

class MainApp extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setListsPane.warpRight();
    this.showsPane.warpRight();
  }

  render() {
    const { routingState, statusBarState, actions } = this.props;

    const swipe_config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };

    const handleSwipeLeft = () => {
      switch (routingState.title) {
        case 'Jokes':
          this.jokesPane.slideLeft();
          this.setListsPane.slideCenter();
          actions.setTitle('set_lists');
          // actions.setVisiblePanes(['set_lists']);
          break;
        case 'Set Lists':
          this.setListsPane.slideLeft();
          this.showsPane.slideCenter();
          actions.setTitle('shows');
          // actions.setVisiblePanes(['shows']);
          break;
      }
    };

    const handleSwipeRight = () => {
      switch (routingState.title) {
        case 'Set Lists':
          this.setListsPane.slideRight();
          this.jokesPane.slideCenter();
          actions.setTitle('jokes');
          // actions.setVisiblePanes(['jokes']);
          break;
        case 'Shows':
          this.showsPane.slideRight();
          this.setListsPane.slideCenter();
          actions.setTitle('set_lists');
          // actions.setVisiblePanes(['set_lists']);
          break;
      }
    };

    const onSwipe = (gestureName, gestureState) => {
        const {SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
        switch (gestureName) {
            case SWIPE_LEFT:
                handleSwipeLeft();
                break;
            case SWIPE_RIGHT:
                handleSwipeRight();
                break;
            default:
                break;
        }
    };

    let {height, width} = Dimensions.get('window');
    const paneHeight = height - 61;

    const setActivePane = (pane) => {
      switch (pane) {
        case 'jokes':
          switch (routingState.title) {
            case 'Set Lists':
              this.setListsPane.slideRight();
              break;
            case 'Shows':
              this.setListsPane.warpRight();
              this.showsPane.slideRight();
              break;
          }

          this.jokesPane.slideCenter();
          break;
        case 'set_lists':
          switch (routingState.title) {
            case 'Jokes':
              this.jokesPane.slideLeft();
              break;
            case 'Shows':
              this.showsPane.slideRight();
              break;
          }

          this.setListsPane.slideCenter();
          break;
        case 'shows':
          switch (routingState.title) {
            case 'Jokes':
              this.setListsPane.warpLeft();
              this.jokesPane.slideLeft();
              break;
            case 'Set Lists':
              this.setListsPane.slideLeft();
              break;
          }

          this.showsPane.slideCenter();
          break;
      }
      actions.setTitle(pane);
    };

    return (
      <View style={layoutStyles.container}>
        <GestureRecognizer
            onSwipe={(direction, state) => onSwipe(direction, state)}
            config={swipe_config}>
          <StatusBar setActivePane={setActivePane} />
          <View style={{flex: 1}}>
            {
              (routingState.visible_panes.indexOf('jokes') != -1) &&
              <SlidingPane style={[{position: 'absolute', width: width, height: paneHeight, borderColor: 'gray', borderWidth: 1}]}
                           ref={ (jokesPane) => this.jokesPane = jokesPane}>
                  <Jokes />
              </SlidingPane>
            }
            {
              (routingState.visible_panes.indexOf('set_lists') != -1) &&
              <SlidingPane style={[{position: 'absolute', width: width, height: paneHeight, borderColor: 'gray', borderWidth: 1}]}
                           ref={ (setListsPane) => this.setListsPane = setListsPane}>
                <SetLists />
              </SlidingPane>
            }
            {
              (routingState.visible_panes.indexOf('shows') != -1) &&
              <SlidingPane style={[{position: 'absolute', width: width, height: paneHeight, borderColor: 'gray', borderWidth: 1}]}
                           ref={ (showsPane) => this.showsPane = showsPane}>
                <Shows />
              </SlidingPane>
            }
          </View>
        </GestureRecognizer>
      </View>
    );
  }
}

export default connect(state => ({
    routingState: state.routing,
    statusBarState: state.statusBar
  }),
  (dispatch) => ({
    actions: bindActionCreators(routingActions, dispatch)
  })
)(MainApp);
