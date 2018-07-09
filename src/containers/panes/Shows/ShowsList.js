'use strict';

import React, {Component} from 'react';
import { View, Text, ListView, ScrollView, TouchableHighlight, Platform, Switch, Modal } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {Button} from 'react-native-buttons';
import FooterButton from '../../../components/FooterButton';
import SearchBar from 'react-native-material-design-searchbar';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import moment from 'moment';

import ShowDashboard from './ShowDashboard';

import Show from '../../../models/show';

import ShowListHelper from '../../../helpers/showListHelper';

import * as showActions from '../../../actions/showActions';
import * as showListActions from '../../../actions/showListActions';
import * as routingActions from '../../../actions/routingActions';

import layoutStyles from '../../../stylesheets/layoutStyles';
import showListStyles from '../../../stylesheets/showListStyles';

import {addIcon, recIconBadge} from '../../../helpers/icons';

class ShowsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show_dashboard_visible: false
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const showListChanged = this.props.showListState.show_list !== nextProps.showListState.show_list;
    const showDashboardVisibleChanged = this.state.show_dashboard_visible !== nextState.show_dashboard_visible;

    return showListChanged || showDashboardVisibleChanged;
  }

  render() {
    const { showListState, showActions, routingActions, showListActions } = this.props;

    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const showListDS = ds.cloneWithRows(showListState.show_list.map((show) => { return show._venue }));

    const addShow = () => {
      showActions.setShow(new Show());
      routingActions.openModal();
    };

    const editShow = (id) => {
      Show.get(id, true).then((show) => {
        showActions.setShow(show);
        routingActions.openModal();
      });
    };

    const viewSetList = (id) => {
      Show.get(id, true).then((show) => {
        showActions.setShow(show);

        this.setState({
          show_dashboard_visible: true
        });
      });
    };

    const hideSetList = () => {
      this.setState({
        show_dashboard_visible: false
      });
    };

    const renderRow = (rowData, sectionID, rowID, highlightRow) => {
      let show = showListState.show_list[rowID];

      return (
        <TouchableHighlight onPress={ () => editShow(show._id) }>
          <View style={ showListStyles.showRow }>
            <View style={{ flex: 1 }}>
              <Text style={ showListStyles.showName }>{ show._venue }</Text>
              <Text style={ showListStyles.updatedText }>{ moment(show._date).utc().format("MMM DD, YYYY") } in { show._city }, { show._state }</Text>
            </View>
            <View style={{ alignItems: 'flex-end', flexDirection: 'row' }}>
              <View style={ showListStyles.recIconBadgeView }>{ show._has_recording && recIconBadge }</View>
              <View style={ showListStyles.showInfoView }>
                <TouchableHighlight underlayColor="#EEEEEE" onPress={ () => viewSetList(show._id) } style={{ flex: 1, marginLeft: 10 }}>
                  <View style={{ flex: 1, alignItems: 'flex-end', backgroundColor: '#EEFFEE', padding: 10, borderColor: '#EEEEEE', borderWidth: 1 }}>
                    <Text style={{ textAlign: 'center', fontSize: 10 }}>Show Dashboard</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </TouchableHighlight>
      );
    };

    const renderSeparator = (sectionID, rowID, adjacentRowHighlighted) => {
      return (
        <View
          key={`${sectionID}-${rowID}`}
          style={{
            height: 1,
            backgroundColor: '#CCCCCC'
          }}
        />
      );
    };

    const renderAddButton = () => {
      return (
        <View style={ layoutStyles.addButtonView }>
          <TouchableHighlight underlayColor="#EEEEEE"
                              style={ layoutStyles.addButton }
                              onPress={ addShow }>
            <Text style={{width: '100%'}}>{ addIcon }</Text>
          </TouchableHighlight>
        </View>
      );
    };

    const venueFilterChanged = (venue_filter) => {
      if (venue_filter.nativeEvent) {
        venue_filter = venue_filter.nativeEvent.text;
      }
      showListActions.setShowListFilter(venue_filter);

      ShowListHelper.refreshShowList({ venue_filter: venue_filter })
    };

    return (
      <View style={{ flex: 1 }}>
        <View style={{ backgroundColor: '#FFFFFF' }}>
          <SearchBar
            ref={(searchBar) => { this.searchBar = searchBar }}
            onSearchChange={ venueFilterChanged }
            height={40}
            inputStyle={{borderWidth: 0, borderBottomWidth: 1, borderColor: '#ddd'}}
            placeholder={'Search...'}
            autoCorrect={false}
            padding={0}
            returnKeyType={'done'}
          />
        </View>
        <ListView
          dataSource={ showListDS }
          renderRow={ renderRow }
          renderSeparator={ renderSeparator }
          enableEmptySections={ true }
          style={{ backgroundColor: '#FFFFFF', flex: 1 }}
        />
        <View style={ layoutStyles.toolbar }>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text></Text>
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            { renderAddButton() }
          </View>
        </View>
        <Modal style={ layoutStyles.modal }
               animationType={ "fade" }
               transparent={false}
               visible={this.state.show_dashboard_visible}
               onRequestClose={() => { }}>
          <ShowDashboard />
          <View style={{ flexDirection: 'row', width: '100%' }}>
            <FooterButton
              onPress={hideSetList}
              buttonText="Close"
            />
          </View>
        </Modal>
      </View>
    );
  }
}

export default connect(state => ({
    showListState: state.show_list,
    routingState: state.routing
  }),
  (dispatch) => ({
    showActions: bindActionCreators(showActions, dispatch),
    showListActions: bindActionCreators(showListActions, dispatch),
    routingActions: bindActionCreators(routingActions, dispatch)
  })
)(ShowsList);
