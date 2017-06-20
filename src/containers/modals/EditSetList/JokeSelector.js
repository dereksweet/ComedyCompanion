'use strict';

import React, {Component} from 'react';
import { View, Text, ListView, TouchableHighlight, Switch } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import SearchBar from 'react-native-material-design-searchbar';

import Joke from '../../../models/joke';

import JokeListHelper from '../../../helpers/jokeListHelper';

import * as jokeListActions from '../../../actions/jokeListActions';
import * as setListActions from '../../../actions/setListActions';

import layoutStyles from '../../../stylesheets/layoutStyles';
import jokeListStyles from '../../../stylesheets/jokeListStyles';
import setListListStyles from '../../../stylesheets/setListListStyles';

class JokeSelector extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    JokeListHelper.refreshJokeListSelector();
  }

  render() {
    const { jokeListState, jokeListActions, setListActions } = this.props;

    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const jokeListDS = ds.cloneWithRows(jokeListState.joke_list_selector.map((joke) => { return joke.name }));
    
    const selectJoke = (id) => {
      Joke.get(id).then((joke) => {
        setListActions.addJokeToSL(joke);
      });
    };

    const renderRow = (rowData, sectionID, rowID, highlightRow) => {
      let joke = jokeListState.joke_list_selector[rowID];

      return (
        <TouchableHighlight onPress={ () => selectJoke(joke._id) }>
          <View style={ setListListStyles.jokeSelectorRow }>
            <Text style={ [jokeListStyles.jokeName, { textAlign: 'center' }] }>{ joke._name }</Text>
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

    const nameFilterChanged = (name_filter) => {
      if (name_filter.nativeEvent) {
        name_filter = name_filter.nativeEvent.text;
      }
      jokeListActions.setJokeListFilterSelector(name_filter);

      JokeListHelper.refreshJokeListSelector({ name_filter: name_filter })
    };

    const inDevelopmentChanged = () => {
      jokeListActions.toggleJokeListInDevelopmentSelector();

      JokeListHelper.refreshJokeListSelector({ in_development: !jokeListState.in_development_selector});
    };

    return (
      <View style={{ flex: 1 }}>
        <View style={{ backgroundColor: '#EEEEFF', height: 50, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
          <Text style={{ color: '#000000' }}>My Jokes</Text>
          <Text style={ setListListStyles.jokeInstructions }>tap to add</Text>
        </View>
        <View style={{ backgroundColor: '#FFFFFF', width: '100%' }}>
          <SearchBar
            ref={(searchBar) => { this.searchBar = searchBar }}
            onSearchChange={ nameFilterChanged }
            height={30}
            placeholder={'Search...'}
            inputProps={{ value: jokeListState.name_filter_selector }}
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
            <Text style={ layoutStyles.inputLabel }>In Dev:</Text>
            <Switch onValueChange={ inDevelopmentChanged }
                    value={jokeListState.in_development_selector} />
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
    jokeListActions: bindActionCreators(jokeListActions, dispatch),
    setListActions: bindActionCreators(setListActions, dispatch)
  })
)(JokeSelector);
