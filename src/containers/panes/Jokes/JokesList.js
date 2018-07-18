import React, {Component} from 'react';
import { View, Text, ListView, TouchableHighlight, Platform, Switch } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import SearchBar from 'react-native-material-design-searchbar';
import moment from 'moment';

import * as jokeActions from '../../../actions/jokeActions';
import * as jokeListActions from '../../../actions/jokeListActions';
import * as routingActions from '../../../actions/routingActions';

import JokeListHelper from '../../../helpers/jokeListHelper';
import {addIcon} from '../../../helpers/icons';

import Joke from '../../../models/joke';

import layoutStyles from '../../../stylesheets/layoutStyles';
import jokeListStyles from '../../../stylesheets/jokeListStyles';

class JokesList extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    const jokeListChanged = this.props.jokeListState.joke_list !== nextProps.jokeListState.joke_list;

    return jokeListChanged;
  }

  addJoke = () => {
    const {jokeActions, routingActions} = this.props;

    jokeActions.setJoke(new Joke());
    routingActions.openModal();
  };

  editJoke = (id) => {
    const {jokeActions, routingActions} = this.props;

    Joke.get(id).then((joke) => {
      jokeActions.setJoke(joke);
      routingActions.openModal();
    });
  };

  renderRow = (rowData, sectionID, rowID, highlightRow) => {
    const {jokeListState} = this.props;

    let joke = jokeListState.joke_list[rowID];

    return (
      <TouchableHighlight onPress={() => this.editJoke(joke._id)}>
        <View style={jokeListStyles.jokeRow}>
          <View style={{flex: 1}}>
            <Text style={jokeListStyles.jokeName}>{joke._name}</Text>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <View style={jokeListStyles.jokeInfoView}>
              <Text style={jokeListStyles.updatedText}>Last Updated:</Text>
              <Text style={jokeListStyles.updatedText}>{moment(joke._updated_at).format("MMM DD, YYYY")}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  renderSeparator = (sectionID, rowID, adjacentRowHighlighted) => {
    return <View key={`${sectionID}-${rowID}`} style={layoutStyles.listViewSeparator} />;
  };

  renderAddButton = () => {
    return (
      <View style={layoutStyles.addButtonView}>
        <TouchableHighlight
          underlayColor="#EEEEEE"
          style={layoutStyles.addButton}
          onPress={this.addJoke}>
          <Text style={{width: '100%'}}>{addIcon}</Text>
        </TouchableHighlight>
      </View>
    );
  };

  nameFilterChanged = (name_filter) => {
    const {jokeListActions} = this.props;

    if (name_filter.nativeEvent) {
      name_filter = name_filter.nativeEvent.text;
    }
    jokeListActions.setJokeListFilter(name_filter);

    JokeListHelper.refreshJokeList({name_filter: name_filter})
  };

  inDevelopmentChanged = () => {
    const {jokeListState, jokeListActions} = this.props;

    jokeListActions.toggleJokeListInDevelopment();

    JokeListHelper.refreshJokeList({in_development: !jokeListState.in_development});
  };

  render() {
    const {jokeListState} = this.props;

    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const jokeListDS = ds.cloneWithRows(jokeListState.joke_list.map((joke) => {
      return joke._name
    }));

    return (
      <View style={{flex: 1}}>
        <View style={{backgroundColor: '#FFFFFF'}}>
          <SearchBar
            ref={(searchBar) => {this.searchBar = searchBar}}
            onSearchChange={this.nameFilterChanged}
            height={40}
            inputStyle={{borderWidth: 0, borderBottomWidth: 1, borderColor: '#ddd'}}
            placeholder={'Search...'}
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
          <View style={layoutStyles.centeredFlexRow}>
            <Text style={layoutStyles.inputLabel}>In Development:</Text>
            <Switch onValueChange={this.inDevelopmentChanged}
                    value={jokeListState.in_development}/>
          </View>
          <View style={layoutStyles.flexEnd}>
            {this.renderAddButton()}
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
