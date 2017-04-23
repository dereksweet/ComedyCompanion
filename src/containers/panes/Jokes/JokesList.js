'use strict';

import React, {Component} from 'react';
import { View, Text, ListView, TouchableHighlight } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {Button} from 'react-native-ui-xg';
import moment from 'moment';

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
    const { jokeActions, routingActions, jokeListState } = this.props;

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
      let joke = jokeListState.joke_list[rowID];

      return (
        <TouchableHighlight onPress={ () => editJoke(joke._id) }>
          <View style={ jokeListStyles.jokeRow }>
            <View style={{ flex: 1 }}>
              <Text style={ jokeListStyles.jokeName }>{ joke._name }</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <View style={{ alignItems: 'flex-end', minWidth: 60, borderLeftColor: '#DDDDDD', borderLeftWidth: 1 }}>
                <Text style={ jokeListStyles.updatedText }>Last Updated:</Text>
                <Text style={ jokeListStyles.updatedText }>{ moment(joke._updated_at).format("MMM DD, YYYY") }</Text>
                <Text style={ jokeListStyles.ratingText }>Rating: { joke._rating.toFixed(1) }</Text>
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
            height: adjacentRowHighlighted ? 4 : 1,
            backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
          }}
        />
      );
    };

    const renderAddButton = () => {
      return (
        <View style={ layoutStyles.addButtonView }>
          <TouchableHighlight style={ layoutStyles.addButton }
                              onPress={ addJoke }>
            <Text style={{width: '100%'}}>{ addIcon }</Text>
          </TouchableHighlight>
        </View>
      );
    };

    return (
      <View style={layoutStyles.centeredFlex}>
        <ListView
          dataSource={ jokeListDS }
          renderRow={ renderRow }
          renderSeparator={ renderSeparator }
          style={{ backgroundColor: '#FFFFFF', flex: 1 }}
        />
        <View style={ layoutStyles.toolbar }>
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
