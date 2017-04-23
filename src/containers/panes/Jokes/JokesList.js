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
    const { jokeListState, jokeActions, routingActions, jokeListActions } = this.props;

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
              <View style={ jokeListStyles.jokeInfoView }>
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
                              onPress={ addJoke }>
            <Text style={{width: '100%'}}>{ addIcon }</Text>
          </TouchableHighlight>
        </View>
      );
    };

    const sortButtonClicked = (sort_order) => {
      const order = jokeListState.sort_order;
      const direction = jokeListState.sort_direction;

      const new_direction = order == sort_order ? (direction == 'ASC' ? 'DESC' : 'ASC') : 'ASC';

      jokeListActions.setJokeListOrder(sort_order, new_direction);

      Joke.all(sort_order, new_direction).then((jokes) => {
        jokeListActions.setJokeList(jokes);
      });
    };

    const renderSortButton = (sort_order, button_text) => {
      return (
        <Button type="surface"
                size="small"
                theme="red"
                selfStyle={{ marginLeft: 10 }}
                onPress={ () => sortButtonClicked(sort_order) }>
          <Text style={jokeListStyles.sortButtonText}>{ button_text }</Text>
        </Button>
      )
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
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={ jokeListStyles.sortByText }>Sort by: </Text>
            { renderSortButton('_updated_at', 'Updated') }
            { renderSortButton('_name', 'Name') }
            { renderSortButton('_rating', 'Rating') }
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
