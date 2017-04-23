'use strict';

import React, {Component} from 'react';
import { View, Text, ListView, TouchableHighlight, Platform, Keyboard } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {Button} from 'react-native-ui-xg';
import SearchBar from 'react-native-material-design-searchbar';
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
    this.setState({
      keyboard_height: e.endCoordinates.height
    });
  }

  keyboardDidHide (e) {
    this.setState({
      keyboard_height: 0
    });
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  measureView(event) {
    this.setState({
      view_height: event.nativeEvent.layout.height
    });
  }

  contentHeight() {
    return this.state.view_height - (Platform.OS === 'ios'? this.state.keyboard_height : 0);
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

    const sortButtonClicked = (sort_field) => {
      const field = jokeListState.sort_field;
      const order = jokeListState.sort_order;

      const new_order = field == sort_field ? (order == 'ASC' ? 'DESC' : 'ASC') : 'ASC';

      jokeListActions.setJokeListSort(sort_field, new_order);

      Joke.where({ '_name': "LIKE|'" + jokeListState.name_filter + "'" }, 'AND', sort_field, new_order).then((jokes) => {
        jokeListActions.setJokeList(jokes);
      });
    };

    const nameFilterChanged = (name_filter) => {
      jokeListActions.setJokeListFilter(name_filter);

      Joke.where({ '_name': "LIKE|'" + name_filter + "'" }, 'AND', jokeListState.sort_field, jokeListState.sort_order).then((jokes) => {
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
      <View style={{ flex: 1 }}  onLayout={(event) => this.measureView(event)}>
        <View style={{ height: this.contentHeight(), justifyContent: 'flex-start' }}>
          <View style={{ backgroundColor: '#FFFFFF', width: '100%' }}>
            <SearchBar
              ref={(searchBar) => { this.searchBar = searchBar }}
              onSearchChange={ nameFilterChanged }
              height={20}
              onFocus={() => console.log('On Focus')}
              onBlur={() => console.log('On Blur')}
              placeholder={'Search...'}
              autoCorrect={false}
              padding={0}
              returnKeyType={'search'}
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
