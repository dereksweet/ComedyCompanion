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
      switch (routingState.visible_pane) {
        case 'jokes':
          this.jokesPane.slideLeft();
          this.setListsPane.slideCenter();
          actions.setVisiblePane('set_lists');
          break;
        case 'set_lists':
          this.setListsPane.slideLeft();
          this.showsPane.slideCenter();
          actions.setVisiblePane('shows');
          break;
      }
    };

    const handleSwipeRight = () => {
      switch (routingState.visible_pane) {
        case 'set_lists':
          this.setListsPane.slideRight();
          this.jokesPane.slideCenter();
          actions.setVisiblePane('jokes');
          break;
        case 'shows':
          this.showsPane.slideRight();
          this.setListsPane.slideCenter();
          actions.setVisiblePane('set_lists');
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
    const paneHeight = height - statusBarState.height;

    return (
      <View style={layoutStyles.container}>
        <GestureRecognizer
            onSwipe={(direction, state) => onSwipe(direction, state)}
            config={swipe_config}>
          <StatusBar />
          <View style={{flex: 1}}>
            {
              <SlidingPane style={[{position: 'absolute', width: width, height: paneHeight, borderColor: 'black', borderWidth: 1}]}
                           ref={ (jokesPane) => this.jokesPane = jokesPane}>
                  <Jokes />
              </SlidingPane>
            }
            {
              <SlidingPane style={[{position: 'absolute', width: width, height: paneHeight, borderColor: 'black', borderWidth: 1}]}
                           ref={ (setListsPane) => this.setListsPane = setListsPane}>
                <SetLists />
              </SlidingPane>
            }
            {
              <SlidingPane style={[{position: 'absolute', width: width, height: paneHeight, borderColor: 'black', borderWidth: 1}]}
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
