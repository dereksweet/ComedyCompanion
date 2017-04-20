'use strict';

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import { View, Text, TouchableHighlight, Dimensions, Modal } from 'react-native';
import * as routingActions from '../actions/routingActions';
import { connect } from 'react-redux';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {Button} from 'react-native-ui-xg';

import {SlidingPane, SlidingPaneWrapper} from 'react-native-sliding-panes';

import layoutStyles from '../stylesheets/layoutStyles';

import StatusBar from './StatusBar.js';

import Jokes from './panes/Jokes.js';
import EditJoke from './modals/EditJoke.js';
import SetLists from './panes/SetLists.js';
import EditSetList from './modals/EditSetList.js';
import Shows from './panes/Shows.js';
import EditShow from './modals/EditShow.js';

class MainApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false
    }
  }

  componentDidMount() {
    this.setupSlidingPanes();
  }

  setupSlidingPanes() {
    this.jokesPane.warpCenter();
    this.setListsPane.warpRight();
    this.showsPane.warpRight();
    this.slidingPaneWrapper.childPanes = [this.jokesPane, this.setListsPane, this.showsPane];
  }

  render() {
    const { routingState, actions } = this.props;

    const swipe_config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };

    const handleSwipeLeft = () => {
      switch (routingState.pane) {
        case 'jokes':
          actions.setPane('set_lists');
          break;
        case 'set_lists':
          actions.setPane('shows');
          break;
      }
      this.slidingPaneWrapper.slideAllLeft();
    };

    const handleSwipeRight = () => {
      switch (routingState.pane) {
        case 'set_lists':
          actions.setPane('jokes');
          break;
        case 'shows':
          actions.setPane('set_lists');
          break;
      }
      this.slidingPaneWrapper.slideAllRight();
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

    const setActivePane = (pane) => {
      switch (pane) {
        case 'jokes':
          this.slidingPaneWrapper.setActive(0);
          break;
        case 'set_lists':
          this.slidingPaneWrapper.setActive(1);
          break;
        case 'shows':
          this.slidingPaneWrapper.setActive(2);
          break;
      }
      actions.setPane(pane);
    };

    const openModal = () => {
      this.setState({
        modalVisible: true
      });
    };

    const closeModal = () => {
      this.setState({
        modalVisible: false
      });
    };

    return (
      <View style={[layoutStyles.centeredFlex, layoutStyles.mainContainer]}>
        <GestureRecognizer
            onSwipe={(direction, state) => onSwipe(direction, state)}
            config={swipe_config}>
          <StatusBar setActivePane={setActivePane} />
          <SlidingPaneWrapper style={{}} ref={(slidingPaneWrapper) => { this.slidingPaneWrapper = slidingPaneWrapper }}>
            <SlidingPane style={[{borderColor: '#DDDDDD', borderWidth: 1}]}
                         ref={ (jokesPane) => { this.jokesPane = jokesPane} }>
                <Jokes openModal={ openModal } />
            </SlidingPane>
            <SlidingPane style={[{borderColor: '#DDDDDD', borderWidth: 1}]}
                         ref={ (setListsPane) => { this.setListsPane = setListsPane} }>
              <SetLists openModal={ openModal } />
            </SlidingPane>
            <SlidingPane style={[{borderColor: '#DDDDDD', borderWidth: 1}]}
                         ref={ (showsPane) => { this.showsPane = showsPane} }>
              <Shows openModal={ openModal } />
            </SlidingPane>
          </SlidingPaneWrapper>
        </GestureRecognizer>

        <Modal style={ layoutStyles.modal }
               animationType={"slide"}
               transparent={false}
               visible={this.state.modalVisible}
               onRequestClose={() => { }}>
          { routingState.pane == 'jokes' && <EditJoke closeModal={ closeModal } /> }
          { routingState.pane == 'set_lists' && <EditSetList closeModal={ closeModal } /> }
          { routingState.pane == 'shows' && <EditShow closeModal={ closeModal } /> }
        </Modal>
      </View>
    );
  }
}

export default connect(state => ({
    routingState: state.routing
  }),
  (dispatch) => ({
    actions: bindActionCreators(routingActions, dispatch)
  })
)(MainApp);
