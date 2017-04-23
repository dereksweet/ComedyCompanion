'use strict';

import React, {Component} from 'react';
import { View, Text, ListView, TouchableHighlight } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {Button} from 'react-native-ui-xg';

import Joke from '../../../models/Joke';

import * as jokeActions from '../../../actions/jokeActions';
import * as jokeListActions from '../../../actions/jokeListActions';
import * as routingActions from '../../../actions/routingActions';

import layoutStyles from '../../../stylesheets/layoutStyles';
import jokeListStyles from '../../../stylesheets/jokeListStyles';

import {addIcon} from '../../../helpers/icons';

class JokesList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { jokeActions, jokeListActions, routingActions, jokeListState } = this.props;

    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const jokeListDS = ds.cloneWithRows(jokeListState.joke_list.map((joke) => { return joke.name }));

    const addJoke = () => {
      jokeActions.setJoke(new Joke());
      routingActions.openModal();
    };

    const editJoke = (id) => {
      Joke.get(id).then((joke) => {
        jokeActions.setJoke(joke);
        routingActions.openModal();
      });
    };

    const renderRow = (rowData, sectionID, rowID, highlightRow) => {
      let joke_name = jokeListState.joke_list[rowID]._name;
      let joke_id = jokeListState.joke_list[rowID]._id;

      return (
        <TouchableHighlight onPress={ () => editJoke(joke_id) }>
          <View style={{ width: '100%', height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: '#EEEEEE' }}><Text>{ joke_name }</Text></View>
        </TouchableHighlight>
      );
    };

    const renderSeparator = (sectionID, rowID, adjacentRowHighlighted) => {
      return (
        <View
          key={`${sectionID}-${rowID}`}
          style={{
            height: adjacentRowHighlighted ? 4 : 1,
            backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
          }}
        />
      );
    };

    const renderAddButton = () => {
      return (
        <View style={ jokeListStyles.addIcon }>
          <TouchableHighlight style={{ flex: 1, alignItems: 'center', paddingTop: 7, paddingLeft: 7 }}
                              onPress={ addJoke }>
            <Text style={{width: '100%'}}>{ addIcon }</Text>
          </TouchableHighlight>
        </View>
      );
    };

    return (
      <View style={layoutStyles.centeredFlex}>
        <ListView
          dataSource={jokeListDS}
          renderRow={renderRow}
          renderSeparator={renderSeparator}
          style={{ backgroundColor: '#FFFFFF', flex: 1 }}
        />
        <View style={{ width: '100%', backgroundColor: '#EEEEEE', borderTopColor: '#CCCCCC', borderTopWidth: 1, height: 40, flexDirection: 'row', alignItems: 'center', paddingLeft: 10}}>
          <View>
            <Text>Sort by: </Text>
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            { renderAddButton() }
          </View>
        </View>
      </View>
    );
  }
}

export default connect(state => ({
    jokeListState: state.joke_list
  }),
  (dispatch) => ({
    jokeActions: bindActionCreators(jokeActions, dispatch),
    jokeListActions: bindActionCreators(jokeListActions, dispatch),
    routingActions: bindActionCreators(routingActions, dispatch)
  })
)(JokesList);
