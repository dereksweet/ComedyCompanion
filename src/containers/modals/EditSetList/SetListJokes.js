'use strict';

import React, {Component} from 'react';
import { View, Text, ListView, TouchableHighlight } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import SortableListView from 'react-native-sortable-listview';

import * as setListActions from '../../../actions/setListActions';
import * as routingActions from '../../../actions/routingActions';

import jokeListStyles from '../../../stylesheets/jokeListStyles';
import setListListStyles from '../../../stylesheets/setListListStyles';

class JokeSelector extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    console.log("Render SetListJokes.js");

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
          style={ [setListListStyles.setListJokeRow, {borderBottomWidth: 1, borderBottomColor: '#CCCCCC'}] }
          {...this.props.sortHandlers}>
          <View style={ {alignItems: 'center'} }>
            <Text style={ jokeListStyles.jokeName }>{ rowData._name }</Text>
          </View>
        </TouchableHighlight>
      );
    };

    return (
      <View style={{ flex: 1 }}>
        <View style={{ backgroundColor: '#EEEEEE', height: 50, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
          <Text style={{ color: '#000000' }}>Set List</Text>
          <Text style={ setListListStyles.jokeInstructions }>tap to remove</Text>
          <Text style={ setListListStyles.jokeInstructions }>hold to reorder</Text>
        </View>
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
