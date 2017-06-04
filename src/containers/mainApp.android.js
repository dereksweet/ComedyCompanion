'use strict';

const VERSION=1.0;

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import { View, Modal } from 'react-native';
import { connect } from 'react-redux';

import Setting from '../models/setting';

import * as routingActions from '../actions/routingActions';
import * as jokeListActions from '../actions/jokeListActions';
import * as setListListActions from '../actions/setListListActions';
import * as showListActions from '../actions/showListActions';

import layoutStyles from '../stylesheets/layoutStyles';

import StatusBar from './StatusBar';

import Jokes from './panes/Jokes';
import EditJoke from './modals/EditJoke';
import SetLists from './panes/SetLists';
import EditSetList from './modals/EditSetList';
import Shows from './panes/Shows';
import EditShow from './modals/EditShow';
import Settings from './modals/Settings';
import About from './modals/About';

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

      if (this.setting._about_version_seen < VERSION) {
        this.props.routingActions.toggleAbout();
        this.setting._about_version_seen = VERSION;
        this.setting.save();
      }

      setTimeout(() => this.props.routingActions.hideLoading(), 500);
    });
  }

  render() {
    const { routingState, routingActions } = this.props;

    const setActivePane = (pane) => {
      routingActions.setPane(pane);
    };

    return (
      <View style={[layoutStyles.centeredFlex, layoutStyles.mainContainer]}>
        <View style={{ flex: 1 }}>
          <StatusBar setActivePane={setActivePane} />
          <View style={{ flex: 1 }}>
            { routingState.pane == 'jokes' && <Jokes /> }
            { routingState.pane == 'set_lists' && <SetLists /> }
            { routingState.pane == 'shows' && <Shows /> }
          </View>
        </View>
        <Modal style={ layoutStyles.modal }
               animationType={ "none" }
               transparent={false}
               visible={routingState.modal_visible}
               onRequestClose={() => { }}>
          { routingState.pane == 'jokes' && <EditJoke /> }
          { routingState.pane == 'set_lists' && <EditSetList /> }
          { routingState.pane == 'shows' && <EditShow /> }
        </Modal>
        <Modal style={ layoutStyles.modal }
               animationType={ "none" }
               transparent={false}
               visible={routingState.settings_visible}
               onRequestClose={() => { }}>
          <Settings />
        </Modal>
        <Modal style={ layoutStyles.modal }
               animationType={ "none" }
               transparent={false}
               visible={routingState.about_visible}
               onRequestClose={() => { }}>
          <About />
        </Modal>
        { routingState.show_loading && <View style={ layoutStyles.loadingScreen } /> }
      </View>
    );
  }
}

export default connect(state => ({
    routingState: state.routing
  }),
  (dispatch) => ({
    routingActions: bindActionCreators(routingActions, dispatch),
    jokeListActions: bindActionCreators(jokeListActions, dispatch),
    setListListActions: bindActionCreators(setListListActions, dispatch),
    showListActions: bindActionCreators(showListActions, dispatch)
  })
)(MainApp);
