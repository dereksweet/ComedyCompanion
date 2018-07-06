const VERSION = 1.4;

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {View, Image, Modal} from 'react-native';
import {connect} from 'react-redux';

import {SlidingPane, SlidingPaneWrapper} from 'react-native-sliding-panes';

import Setting from '../models/setting';

import * as routingActions from '../actions/routingActions';
import * as jokeListActions from '../actions/jokeListActions';
import * as setListListActions from '../actions/setListListActions';
import * as showListActions from '../actions/showListActions';
import * as downloadActions from '../actions/downloadActions';

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
import Download from './modals/Download';

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
      this.props.downloadActions.setExportEmail(this.setting._export_email);
      this.props.downloadActions.setExportEmailType(this.setting._export_email_type);

      JokeListHelper.refreshJokeList();
      SetListListHelper.refreshSLList();
      ShowListHelper.refreshShowList();

      if (this.setting._about_version_seen < VERSION) {
        this.props.routingActions.toggleAbout();
        this.setting._about_version_seen = VERSION;
        this.setting.save();
      }

      setTimeout(() => this.props.routingActions.hideLoading(), 1000);
    });
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

  setActivePane = (pane) => {
    const {routingActions} = this.props;

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

    routingActions.setPane(pane);
  };

  render() {
    const {routingState} = this.props;

    return (
      <View style={layoutStyles.mainContainer}>
        <View style={{flex: 1}}>
          <StatusBar setActivePane={this.setActivePane}/>
          <SlidingPaneWrapper style={{}} ref={(slidingPaneWrapper) => {
            this.slidingPaneWrapper = slidingPaneWrapper
          }}>
            <SlidingPane style={[{borderColor: '#DDDDDD', borderWidth: 1}]}
                         ref={(jokesPane) => {
                           this.jokesPane = jokesPane
                         }}>
              <Jokes/>
            </SlidingPane>
            <SlidingPane style={[{borderColor: '#DDDDDD', borderWidth: 1}]}
                         ref={(setListsPane) => {
                           this.setListsPane = setListsPane
                         }}>
              <SetLists/>
            </SlidingPane>
            <SlidingPane style={[{borderColor: '#DDDDDD', borderWidth: 1}]}
                         ref={(showsPane) => {
                           this.showsPane = showsPane
                         }}>
              <Shows/>
            </SlidingPane>
          </SlidingPaneWrapper>
        </View>
        <Modal style={layoutStyles.modal}
               animationType={"slide"}
               transparent={false}
               visible={routingState.modal_visible}
               onRequestClose={() => {
               }}>
          {routingState.pane === 'jokes' && <EditJoke/>}
          {routingState.pane === 'set_lists' && <EditSetList/>}
          {routingState.pane === 'shows' && <EditShow/>}
        </Modal>
        <Modal style={layoutStyles.modal}
               animationType={"fade"}
               transparent={false}
               visible={routingState.settings_visible}
               onRequestClose={() => {
               }}>
          <Settings/>
        </Modal>
        <Modal style={layoutStyles.modal}
               animationType={"fade"}
               transparent={false}
               visible={routingState.about_visible}
               onRequestClose={() => {
               }}>
          <About/>
        </Modal>
        <Modal style={layoutStyles.modal}
               animationType={"fade"}
               transparent={false}
               visible={routingState.download_visible}
               onRequestClose={() => {
               }}>
          <Download/>
        </Modal>
        {routingState.show_loading &&
        <View style={layoutStyles.loadingScreen}>
          <Image style={{width: 300, height: 300, marginTop: 15}} source={require('../images/Loading.png')}/>
        </View>
        }
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
    showListActions: bindActionCreators(showListActions, dispatch),
    downloadActions: bindActionCreators(downloadActions, dispatch)
  })
)(MainApp);
