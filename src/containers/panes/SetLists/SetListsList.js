'use strict';

import React, {Component} from 'react';
import { View, Text, ListView, TouchableHighlight, Platform, Switch } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

import SetList from '../../../models/set_list';

import * as setListActions from '../../../actions/setListActions';
import * as routingActions from '../../../actions/routingActions';

import layoutStyles from '../../../stylesheets/layoutStyles';
import setListListStyles from '../../../stylesheets/setListListStyles';

import {addIcon} from '../../../helpers/icons';

class SetListsList extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const setListListChanged = this.props.setListListState.sl_list !== nextProps.setListListState.sl_list;

    return setListListChanged;
  }

  render() {
    const { setListListState,  routingActions, setListActions } = this.props;

    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const setListListDS = ds.cloneWithRows(setListListState.sl_list.map((set_list) => { return set_list._name }));

    const addSL = () => {
      setListActions.setSL(new SetList());
      routingActions.openModal();
    };

    const editSL = (id) => {
      SetList.get(id, true).then((set_list) => {
        setListActions.setSL(set_list);
        routingActions.openModal();
      });
    };

    const renderRow = (rowData, sectionID, rowID, highlightRow) => {
      let set_list = setListListState.sl_list[rowID];

      return (
        <TouchableHighlight onPress={ () => editSL(set_list._id) }>
          <View style={ setListListStyles.setListRow }>
            <View style={{ flex: 1 }}>
              <Text style={ setListListStyles.jokeName }>{ set_list._name }</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <View style={ setListListStyles.setListInfoView }>
                <Text style={ setListListStyles.updatedText }>Last Updated:</Text>
                <Text style={ setListListStyles.updatedText }>{ moment(set_list._updated_at).format("MMM DD, YYYY") }</Text>
                <Text style={ setListListStyles.lengthText }>Length: { set_list._length || set_list.setListLength() } min</Text>
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
            backgroundColor: '#CCCCCC',
          }}
        />
      );
    };

    const renderAddButton = () => {
      return (
        <View style={ layoutStyles.addButtonView }>
          <TouchableHighlight underlayColor="#EEEEEE"
                              style={ layoutStyles.addButton }
                              onPress={ addSL }>
            <Text style={{width: '100%'}}>{ addIcon }</Text>
          </TouchableHighlight>
        </View>
      );
    };

    return (
      <View style={{ flex: 1 }}>
        <View style={{ justifyContent: 'flex-start' }}>
          <ListView
            dataSource={ setListListDS }
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
