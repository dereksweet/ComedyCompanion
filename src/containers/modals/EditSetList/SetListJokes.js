'use strict';

import React, {Component} from 'react';
import { View, Text, ListView, TouchableHighlight } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import Joke from '../../../models/joke';

import JokeListHelper from '../../../helpers/jokeListHelper';

import * as setListActions from '../../../actions/setListActions';
import * as routingActions from '../../../actions/routingActions';

import layoutStyles from '../../../stylesheets/layoutStyles';
import jokeListStyles from '../../../stylesheets/jokeListStyles';

class JokeSelector extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    const { setListState, routingActions, setListActions } = this.props;

    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const jokeListDS = ds.cloneWithRows(setListState.set_list._jokes.map((joke) => { return joke.name }));

    const selectJoke = (joke) => {
      setListActions.removeJokeFromSL(joke);
    };

    const renderRow = (rowData, sectionID, rowID, highlightRow) => {
      let joke = setListState.set_list._jokes[rowID];

      return (
        <TouchableHighlight onPress={ () => selectJoke(joke) }>
          <View style={ jokeListStyles.jokeRow }>
            <Text style={ jokeListStyles.jokeName }>{ joke._name }</Text>
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

    return (
      <View style={{ flex: 1 }}>
        <ListView
          dataSource={ jokeListDS }
          renderRow={ renderRow }
          renderSeparator={ renderSeparator }
          enableEmptySections={ true }
          style={{ backgroundColor: '#FFFFFF', flex: 1 }}
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
