'use strict';

import React, {Component} from 'react';
import { View, Text, ListView, TouchableHighlight, Platform, Keyboard, Switch } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import SearchBar from 'react-native-material-design-searchbar';
import moment from 'moment';

import SetList from '../../../models/set_list';

import SetListListHelper from '../../../helpers/setListListHelper';

import * as setListActions from '../../../actions/setListActions';
import * as setListListActions from '../../../actions/setListListActions';
import * as routingActions from '../../../actions/routingActions';

import layoutStyles from '../../../stylesheets/layoutStyles';
import setListListStyles from '../../../stylesheets/setListListStyles';

import {addIcon} from '../../../helpers/icons';

class SetListsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view_height: 0,
      keyboard_height: 0
    }
  }

  componentWillMount () {
    var eventVerb = Platform.OS === 'ios'? 'Will' : 'Did';

    this.keyboardDidShowListener = Keyboard.addListener('keyboard' + eventVerb + 'Show', this.keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboard' + eventVerb + 'Hide', this.keyboardDidHide.bind(this));
  }

  keyboardDidShow (e) {
    if (this.props.routingState.pane === 'set_lists') {
      this.setState({
        keyboard_height: e.endCoordinates.height
      });
    }
  }

  keyboardDidHide (e) {
    if (this.props.routingState.pane === 'set_lists') {
      this.setState({
        keyboard_height: 0
      });
    }
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  measureView(event) {
    if (this.props.routingState.pane === 'set_lists') {
      this.setState({
        view_height: event.nativeEvent.layout.height
      });
    }
  }

  contentHeight() {
    return this.state.view_height - (Platform.OS === 'ios'? this.state.keyboard_height : 0);
  }

  render() {
    console.log("Render SetListsList.js");

    const { setListListState,  routingActions, setListActions, setListListActions } = this.props;

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
                <Text style={ setListListStyles.lengthText }>Length: { set_list._length } min</Text>
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
          <TouchableHighlight style={ layoutStyles.addButton }
                              onPress={ addSL }>
            <Text style={{width: '100%'}}>{ addIcon }</Text>
          </TouchableHighlight>
        </View>
      );
    };

    return (
      <View style={{ flex: 1 }}  onLayout={(event) => this.measureView(event)}>
        <View style={{ height: this.contentHeight(), justifyContent: 'flex-start' }}>
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
    setListListActions: bindActionCreators(setListListActions, dispatch),
    routingActions: bindActionCreators(routingActions, dispatch)
  })
)(SetListsList);
