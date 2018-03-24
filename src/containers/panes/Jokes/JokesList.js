'use strict';

import React, {Component} from 'react';
import { View, Text, ListView, TouchableHighlight, Platform, Switch } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import SearchBar from 'react-native-material-design-searchbar';
import moment from 'moment';

import Joke from '../../../models/joke';

import JokeListHelper from '../../../helpers/jokeListHelper';

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

  shouldComponentUpdate(nextProps, nextState) {
    const jokeListChanged = this.props.jokeListState.joke_list !== nextProps.jokeListState.joke_list;

    return jokeListChanged;
  }

  render() {
    const { jokeListState, jokeActions, routingActions, jokeListActions } = this.props;

    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const jokeListDS = ds.cloneWithRows(jokeListState.joke_list.map((joke) => { return joke._name }));

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
                              onPress={ addJoke }>
            <Text style={{width: '100%'}}>{ addIcon }</Text>
          </TouchableHighlight>
        </View>
      );
    };

    const nameFilterChanged = (name_filter) => {
      if (name_filter.nativeEvent) {
        name_filter = name_filter.nativeEvent.text;
      }
      jokeListActions.setJokeListFilter(name_filter);

      JokeListHelper.refreshJokeList({ name_filter: name_filter })
    };

    const inDevelopmentChanged = () => {
      jokeListActions.toggleJokeListInDevelopment();

      JokeListHelper.refreshJokeList({ in_development: !jokeListState.in_development});
    };

    return (
      <View style={{ flex: 1 }}>
        <View style={{ backgroundColor: '#FFFFFF' }}>
          <SearchBar
            ref={(searchBar) => { this.searchBar = searchBar }}
            onSearchChange={ nameFilterChanged }
            height={40}
            placeholder={'Search...'}
            autoCorrect={false}
            padding={0}
            returnKeyType={'done'}
          />
        </View>
        <ListView
          dataSource={ jokeListDS }
          renderRow={ renderRow }
          renderSeparator={ renderSeparator }
          enableEmptySections={ true }
          style={{ backgroundColor: '#FFFFFF', flex: 1 }}
        />
        <View style={ layoutStyles.toolbar }>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={ layoutStyles.inputLabel }>In Development:</Text>
            <Switch onValueChange={ inDevelopmentChanged }
                    value={jokeListState.in_development} />
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
    jokeListState: state.joke_list,
    routingState: state.routing
  }),
  (dispatch) => ({
    jokeActions: bindActionCreators(jokeActions, dispatch),
    jokeListActions: bindActionCreators(jokeListActions, dispatch),
    routingActions: bindActionCreators(routingActions, dispatch)
  })
)(JokesList);
