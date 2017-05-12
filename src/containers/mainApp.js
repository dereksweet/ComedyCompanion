'use strict';

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import { View, Text, TouchableHighlight, Dimensions, Modal } from 'react-native';
import { connect } from 'react-redux';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {Button} from 'react-native-ui-xg';
import iCloudStorage from 'react-native-icloudstore';

import {SlidingPane, SlidingPaneWrapper} from 'react-native-sliding-panes';

import Setting from '../models/setting';

import * as routingActions from '../actions/routingActions';
import * as jokeListActions from '../actions/jokeListActions';
import * as setListListActions from '../actions/setListListActions';
import * as showListActions from '../actions/showListActions';

import layoutStyles from '../stylesheets/layoutStyles';

import StatusBar from './StatusBar.js';

import Jokes from './panes/Jokes.js';
import EditJoke from './modals/EditJoke.js';
import SetLists from './panes/SetLists.js';
import EditSetList from './modals/EditSetList.js';
import Shows from './panes/Shows.js';
import EditShow from './modals/EditShow.js';
import Settings from './modals/Settings';

import JokeListHelper from '../helpers/jokeListHelper';
import SetListListHelper from '../helpers/setListListHelper';
import ShowListHelper from '../helpers/showListHelper';

class MainApp extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    Setting.get(1).then((setting) => {
      if (setting) {
        this.setting = setting;
      } else {
        this.setting = new Setting();
        this.setting.save();
      }

      this.props.jokeListActions.setJokeListSortField(this.setting._jokes_sort_field);
      this.props.jokeListActions.setJokeListSortOrder(this.setting._jokes_sort_order);
      this.props.setListListActions.setSLListSortField(this.setting._set_lists_sort_field);
      this.props.setListListActions.setSLListSortOrder(this.setting._set_lists_sort_order);
      this.props.showListActions.setShowListSortField(this.setting._shows_sort_field);
      this.props.showListActions.setShowListSortOrder(this.setting._shows_sort_order);

      JokeListHelper.refreshJokeList();
      SetListListHelper.refreshSLList();
      ShowListHelper.refreshShowList();
    });

    // iCloudStorage.removeItem('MY_TEST');
    // iCloudStorage.setItem('MY_TEST', 'BLAH BLOO');
    // iCloudStorage.getItem('MY_TEST').then(result => console.log(result));
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
    actions: bindActionCreators(routingActions, dispatch),
    jokeListActions: bindActionCreators(jokeListActions, dispatch),
    setListListActions: bindActionCreators(setListListActions, dispatch),
    showListActions: bindActionCreators(showListActions, dispatch)
  })
)(MainApp);
