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
import Settings from './modals/Settings';

class MainApp extends Component {
  constructor(props) {
    super(props);
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

    return (
      <View style={[layoutStyles.centeredFlex, layoutStyles.mainContainer]}>
        <View style={{ flex: 1 }}>
          <StatusBar setActivePane={setActivePane} />
          <SlidingPaneWrapper style={{}} ref={(slidingPaneWrapper) => { this.slidingPaneWrapper = slidingPaneWrapper }}>
            <SlidingPane style={[{borderColor: '#DDDDDD', borderWidth: 1}]}
                         ref={ (jokesPane) => { this.jokesPane = jokesPane} }>
                <Jokes />
            </SlidingPane>
            <SlidingPane style={[{borderColor: '#DDDDDD', borderWidth: 1}]}
                         ref={ (setListsPane) => { this.setListsPane = setListsPane} }>
              <SetLists />
            </SlidingPane>
            <SlidingPane style={[{borderColor: '#DDDDDD', borderWidth: 1}]}
                         ref={ (showsPane) => { this.showsPane = showsPane} }>
              <Shows />
            </SlidingPane>
          </SlidingPaneWrapper>
        </View>
        <Modal style={ layoutStyles.modal }
               animationType={"slide"}
               transparent={false}
               visible={routingState.modal_visible}
               onRequestClose={() => { }}>
          { routingState.pane == 'jokes' && <EditJoke /> }
          { routingState.pane == 'set_lists' && <EditSetList /> }
          { routingState.pane == 'shows' && <EditShow /> }
        </Modal>
        <Modal style={ layoutStyles.modal }
               animationType={"fade"}
               transparent={false}
               visible={routingState.settings_visible}
               onRequestClose={() => { }}>
          <Settings />
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
