import React, {Component} from 'react';
import {View, Text, ListView, TouchableHighlight, Switch} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import SearchBar from 'react-native-material-design-searchbar';

import Joke from '../../../models/joke';

import JokeListHelper from '../../../helpers/jokeListHelper';

import * as jokeListActions from '../../../actions/jokeListActions';
import * as setListActions from '../../../actions/setListActions';

import layoutStyles from '../../../stylesheets/layoutStyles';
import jokeListStyles from '../../../stylesheets/jokeListStyles';
import editSetListStyles from '../../../stylesheets/editSetListStyles';

class JokeSelector extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    JokeListHelper.refreshJokeListSelector();
  }

  selectJoke = (id) => {
    Joke.get(id).then((joke) => {
      this.props.setListActions.addJokeToSL(joke);
      JokeListHelper.refreshJokeListSelector();
    });
  };

  renderRow = (rowData, sectionID, rowID, highlightRow) => {
    let joke = this.props.jokeListState.joke_list_selector[rowID];

    return (
      <TouchableHighlight onPress={() => this.selectJoke(joke._id)}>
        <View style={editSetListStyles.jokeSelectorRow}>
          <Text style={[jokeListStyles.jokeName, {textAlign: 'center'}]}>{joke._name}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  renderSeparator = (sectionID, rowID, adjacentRowHighlighted) => {
    return (
      <View key={`${sectionID}-${rowID}`} style={layoutStyles.listViewSeparator} />
    );
  };

  nameFilterChanged = (name_filter) => {
    if (name_filter.nativeEvent) {
      name_filter = name_filter.nativeEvent.text;
    }
    this.props.jokeListActions.setJokeListFilterSelector(name_filter);

    JokeListHelper.refreshJokeListSelector({name_filter: name_filter})
  };

  inDevelopmentChanged = () => {
    this.props.jokeListActions.toggleJokeListInDevelopmentSelector();

    JokeListHelper.refreshJokeListSelector({in_development: !this.props.jokeListState.in_development_selector});
  };

  render() {
    const {jokeListState} = this.props;

    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const jokeListDS = ds.cloneWithRows(jokeListState.joke_list_selector.map((joke) => { return joke.name }));

    return (
      <View style={{flex: 1}}>
        <View style={editSetListStyles.setListJokesHeader}>
          <Text>My Jokes</Text>
          <Text style={editSetListStyles.jokeInstructions}>tap to add</Text>
        </View>
        <View style={{backgroundColor: 'white', width: '100%'}}>
          <SearchBar
            ref={(searchBar) => {this.searchBar = searchBar}}
            onSearchChange={this.nameFilterChanged}
            height={40}
            inputStyle={{borderWidth: 0, borderBottomWidth: 1, borderColor: '#ddd'}}
            placeholder={'Search...'}
            inputProps={{value: jokeListState.name_filter_selector}}
            autoCorrect={false}
            padding={0}
            returnKeyType={'done'}
          />
        </View>
        <ListView
          dataSource={jokeListDS}
          renderRow={this.renderRow}
          renderSeparator={this.renderSeparator}
          enableEmptySections={true}
          style={layoutStyles.flexListView}
        />
        <View style={layoutStyles.toolbar}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={layoutStyles.inputLabel}>In Dev:</Text>
            <Switch onValueChange={this.inDevelopmentChanged}
                    value={jokeListState.in_development_selector}/>
          </View>
        </View>
      </View>
    );
  }
}

export default connect(state => ({
    jokeListState: state.joke_list,
    setListState: state.set_list,
  }),
  (dispatch) => ({
    jokeListActions: bindActionCreators(jokeListActions, dispatch),
    setListActions: bindActionCreators(setListActions, dispatch)
  })
)(JokeSelector);
