import React, {Component} from 'react';
import {View, Text, ListView, TouchableHighlight} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import moment from 'moment';

import * as setListActions from '../../../actions/setListActions';
import * as routingActions from '../../../actions/routingActions';

import {addIcon} from '../../../helpers/icons';

import SetList from '../../../models/set_list';

import layoutStyles from '../../../stylesheets/layoutStyles';
import setListListStyles from '../../../stylesheets/setListListStyles';

class SetListsList extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    const setListListChanged = this.props.setListListState.sl_list !== nextProps.setListListState.sl_list;

    return setListListChanged;
  }

  addSL = () => {
    const {routingActions, setListActions} = this.props;

    setListActions.setSL(new SetList());
    routingActions.openModal();
  };

  editSL = (id) => {
    const {routingActions, setListActions} = this.props;

    SetList.get(id, true).then((set_list) => {
      setListActions.setSL(set_list);
      routingActions.openModal();
    });
  };

  renderRow = (rowData, sectionID, rowID, highlightRow) => {
    const {setListListState} = this.props;

    let set_list = setListListState.sl_list[rowID];

    return (
      <TouchableHighlight onPress={() => this.editSL(set_list._id)}>
        <View style={setListListStyles.setListRow}>
          <View style={{flex: 1}}>
            <Text style={setListListStyles.jokeName}>{set_list._name}</Text>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <View style={setListListStyles.setListInfoView}>
              <Text style={setListListStyles.updatedText}>Last Updated:</Text>
              <Text style={setListListStyles.updatedText}>{moment(set_list._updated_at).format("MMM DD, YYYY")}</Text>
              <Text style={setListListStyles.lengthText}>Length: {set_list._length || set_list.setListLength()} min</Text>
            </View>
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
          onPress={this.addSL}>
          <Text style={{width: '100%'}}>{addIcon}</Text>
        </TouchableHighlight>
      </View>
    );
  };

  render() {
    const {setListListState} = this.props;

    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const setListListDS = ds.cloneWithRows(setListListState.sl_list.map((set_list) => {
      return set_list._name
    }));

    return (
      <View style={{flex: 1}}>
        <ListView
          dataSource={setListListDS}
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
      </View>
    );
  }
}

export default connect(state => ({
    setListListState: state.set_list_list,
    routingState: state.routing
  }),
  (dispatch) => ({
    setListActions: bindActionCreators(setListActions, dispatch),
    routingActions: bindActionCreators(routingActions, dispatch)
  })
)(SetListsList);
