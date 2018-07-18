import React, {Component} from 'react';
import {View, Text, ListView, TouchableHighlight, Modal} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import FooterButton from '../../../components/FooterButton';
import SearchBar from 'react-native-material-design-searchbar';
import moment from 'moment';

import ShowDashboard from './ShowDashboard';

import * as showActions from '../../../actions/showActions';
import * as showListActions from '../../../actions/showListActions';
import * as routingActions from '../../../actions/routingActions';

import ShowListHelper from '../../../helpers/showListHelper';
import {addIcon, recIconBadge} from '../../../helpers/icons';

import Show from '../../../models/show';

import layoutStyles from '../../../stylesheets/layoutStyles';
import showListStyles from '../../../stylesheets/showListStyles';

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

  addShow = () => {
    const {showActions, routingActions} = this.props;

    showActions.setShow(new Show());
    routingActions.openModal();
  };

  editShow = (id) => {
    const {showActions, routingActions} = this.props;

    Show.get(id, true).then((show) => {
      showActions.setShow(show);
      routingActions.openModal();
    });
  };

  viewSetList = (id) => {
    const {showActions} = this.props;

    Show.get(id, true).then((show) => {
      showActions.setShow(show);

      this.setState({
        show_dashboard_visible: true
      });
    });
  };

  hideSetList = () => {
    this.setState({
      show_dashboard_visible: false
    });
  };

  renderRow = (rowData, sectionID, rowID, highlightRow) => {
    const {showListState} = this.props;

    let show = showListState.show_list[rowID];

    return (
      <TouchableHighlight onPress={() => this.editShow(show._id)}>
        <View style={showListStyles.showRow}>
          <View style={{flex: 1}}>
            <Text style={showListStyles.showName}>{show._venue}</Text>
            <Text style={showListStyles.updatedText}>{moment(show._date).utc().format("MMM DD, YYYY")} in {show._city}, {show._state}</Text>
          </View>
          <View style={layoutStyles.flexRowEnd}>
            <View style={showListStyles.recIconBadgeView}>{show._has_recording && recIconBadge}</View>
            <TouchableHighlight
              underlayColor="#EEEEEE"
              onPress={() => this.viewSetList(show._id)}
              style={{marginLeft: 10}}>
              <View style={showListStyles.setListAndTimerRecButton}>
                <Text style={{textAlign: 'center', fontSize: 10}}>Set List & Timer/Rec</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  renderSeparator = (sectionID, rowID, adjacentRowHighlighted) => {
    return <View key={`${sectionID}-${rowID}`} style={layoutStyles.listViewSeparator} />;
  };

  renderAddButton = () => {
    return (
      <View style={layoutStyles.addButtonView}>
        <TouchableHighlight
          underlayColor="#EEEEEE"
          style={layoutStyles.addButton}
          onPress={this.addShow}>
          <Text style={{width: '100%'}}>{addIcon}</Text>
        </TouchableHighlight>
      </View>
    );
  };

  venueFilterChanged = (venue_filter) => {
    const {showListActions} = this.props;

    if (venue_filter.nativeEvent) {
      venue_filter = venue_filter.nativeEvent.text;
    }
    showListActions.setShowListFilter(venue_filter);

    ShowListHelper.refreshShowList({venue_filter: venue_filter})
  };

  render() {
    const {showListState} = this.props;

    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const showListDS = ds.cloneWithRows(showListState.show_list.map((show) => {
      return show._venue
    }));

    return (
      <View style={{flex: 1}}>
        <View style={{backgroundColor: '#FFFFFF'}}>
          <SearchBar
            ref={(searchBar) => {this.searchBar = searchBar}}
            onSearchChange={ this.venueFilterChanged }
            height={40}
            inputStyle={{borderWidth: 0, borderBottomWidth: 1, borderColor: '#ddd'}}
            placeholder={'Search...'}
            autoCorrect={false}
            padding={0}
            returnKeyType={'done'}
          />
        </View>
        <ListView
          dataSource={showListDS}
          renderRow={this.renderRow}
          renderSeparator={this.renderSeparator}
          enableEmptySections={true}
          style={layoutStyles.flexListView}
        />
        <View style={layoutStyles.toolbar}>
          <View style={layoutStyles.centeredFlexRow} />
          <View style={layoutStyles.flexEnd}>
            {this.renderAddButton()}
          </View>
        </View>
        <Modal style={layoutStyles.modal}
               animationType={"fade"}
               transparent={false}
               visible={this.state.show_dashboard_visible}
               onRequestClose={() => {}}>
          <ShowDashboard/>
          <View style={layoutStyles.flexRowStretched}>
            <FooterButton
              onPress={this.hideSetList}
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
