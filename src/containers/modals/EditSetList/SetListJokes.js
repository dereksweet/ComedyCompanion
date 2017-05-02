'use strict';

import React, {Component} from 'react';
import { View, Text, ListView, TouchableHighlight } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import SortableListView from 'react-native-sortable-listview';

import * as setListActions from '../../../actions/setListActions';
import * as routingActions from '../../../actions/routingActions';

import jokeListStyles from '../../../stylesheets/jokeListStyles';

class JokeSelector extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    const { setListState, setListActions } = this.props;

    const selectJoke = (joke) => {
      setListActions.removeJokeFromSL(joke);
    };

    let data = {};
    setListState.set_list._jokes.forEach((joke, i) => {
      data['joke_' + joke._id] = joke;
    });

    let order = Object.keys(data);

    const renderRow = (rowData, sectionID, rowID, highlightRow) => {
      return (
        <TouchableHighlight
          underlayColor={'#ccc'}
          delayLongPress={500}
          onPress={ () => selectJoke(rowData) }
          style={ [jokeListStyles.jokeRow, {borderBottomWidth: 1, borderBottomColor: '#CCCCCC'}] }
          {...this.props.sortHandlers}>
          <Text>{ rowData._name }</Text>
        </TouchableHighlight>
      );
    };

    return (
      <View style={{ flex: 1 }}>
        <SortableListView
          style={{flex: 1}}
          data={data}
          order={order}
          onRowMoved={e => {
            setListState.set_list._jokes.splice(e.to, 0, setListState.set_list._jokes.splice(e.from, 1)[0]);
            setListActions.setSL(setListState.set_list);
          }}
          renderRow={renderRow}
        />
      </View>
    );
  }
}

export default connect(state => ({
    setListState: state.set_list
  }),
  (dispatch) => ({
    setListActions: bindActionCreators(setListActions, dispatch),
    routingActions: bindActionCreators(routingActions, dispatch)
  })
)(JokeSelector);
