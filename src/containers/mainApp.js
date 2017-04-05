'use strict';

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import { View, Text, TouchableHighlight } from 'react-native';
import * as routingActions from '../actions/routingActions';
import { connect } from 'react-redux';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import layoutStyles from '../stylesheets/layoutStyles';

import StatusBar from './StatusBar.js';

import Jokes from './Jokes.js';
import SetLists from './SetLists.js';
import Shows from './Shows.js';

class MainApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state, actions } = this.props;

    const swipe_config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };

    const handleSwipeLeft = () => {
      switch (state.visible_pane) {
        case 'jokes':
          actions.setVisiblePane('set_lists');
          break;
        case 'set_lists':
          actions.setVisiblePane('shows');
          break;
      }
    };

    const handleSwipeRight = () => {
      switch (state.visible_pane) {
        case 'set_lists':
          actions.setVisiblePane('jokes');
          break;
        case 'shows':
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

    return (
      <View style={layoutStyles.container}>
        <GestureRecognizer
            onSwipe={(direction, state) => onSwipe(direction, state)}
            config={swipe_config}>
          <StatusBar />
          {state.visible_pane == 'jokes' && <Jokes />}
          {state.visible_pane == 'set_lists' && <SetLists />}
          {state.visible_pane == 'shows' && <Shows />}
        </GestureRecognizer>
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
