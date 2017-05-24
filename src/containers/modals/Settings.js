'use strict';

import React, {Component} from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {Button} from 'react-native-ui-xg';
import { SegmentedControls } from 'react-native-radio-buttons';
import iCloudStorage from 'react-native-icloudstore';

import Setting from '../../models/setting';

import JokeListHelper from '../../helpers/jokeListHelper';
import SetListListHelper from '../../helpers/setListListHelper';
import ShowListHelper from '../../helpers/showListHelper';

import Joke from '../../models/joke';
import SetList from '../../models/set_list';
import Show from '../../models/show';

import * as routingActions from '../../actions/routingActions';
import * as jokeListActions from '../../actions/jokeListActions';
import * as setListListActions from '../../actions/setListListActions';
import * as showListActions from '../../actions/showListActions';

import layoutStyles from '../../stylesheets/layoutStyles';
import jokeListStyles from '../../stylesheets/jokeListStyles';
import setListListStyles from '../../stylesheets/setListListStyles';
import showListStyles from '../../stylesheets/showListStyles';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showWriteConfirm: false,
      showReadConfirm: false,
      cloudJokesCount: 0,
      cloudSetListsCount: 0,
      cloudShowsCount: 0,
      localJokesCount: 0,
      localSetListsCount: 0,
      localShowsCount: 0
    };

    Setting.get(1).then((setting) => {
      this.setting = setting;
    });
  }

  render() {
    const { jokeListState, setListListState, showListState, routingActions, jokeListActions, setListListActions, showListActions } = this.props;

    const close = () => {
      routingActions.toggleSettings();
    };

    const jokeSortFieldButtonClicked = (sort_field_option) => {
      let sort_field = sort_field_option.value;

      this.setting._jokes_sort_field = sort_field;
      this.setting.save();

      jokeListActions.setJokeListSortField(sort_field);

      JokeListHelper.refreshJokeList({ sort_field: sort_field });
    };

    const jokeSortOrderButtonClicked = (sort_order_option) => {
      let sort_order = sort_order_option.value;

      this.setting._jokes_sort_order = sort_order;
      this.setting.save();

      jokeListActions.setJokeListSortOrder(sort_order);

      JokeListHelper.refreshJokeList({ sort_order: sort_order });
    };

    const setListSortFieldButtonClicked = (sort_field_option) => {
      let sort_field = sort_field_option.value;

      this.setting._set_lists_sort_field = sort_field;
      this.setting.save();

      setListListActions.setSLListSortField(sort_field);

      SetListListHelper.refreshSLList({ sort_field: sort_field });
    };

    const setListSortOrderButtonClicked = (sort_order_option) => {
      let sort_order = sort_order_option.value;

      this.setting._set_lists_sort_order = sort_order;
      this.setting.save();

      setListListActions.setSLListSortOrder(sort_order);

      SetListListHelper.refreshSLList({ sort_order: sort_order });
    };

    const showSortFieldButtonClicked = (sort_field_option) => {
      let sort_field = sort_field_option.value;

      this.setting._shows_sort_field = sort_field;
      this.setting.save();

      showListActions.setShowListSortField(sort_field);

      ShowListHelper.refreshShowList({ sort_field: sort_field });
    };

    const showSortOrderButtonClicked = (sort_order_option) => {
      let sort_order = sort_order_option.value;

      this.setting._shows_sort_order = sort_order;
      this.setting.save();

      showListActions.setShowListSortOrder(sort_order);

      ShowListHelper.refreshShowList({ sort_order: sort_order });
    };

    const confirmWriteToiCloud = async () => {
      const local_jokes = await Joke.all(null, null, true);
      const local_set_lists = await SetList.all(null, null, true);
      const local_shows = await Show.all(null, null, true);

      this.setState({
        localJokesCount: local_jokes.length,
        localSetListsCount: local_set_lists.length,
        localShowsCount: local_shows.length,
        showWriteConfirm: true
      });
    };

    const cancelWriteToiCloud = async () => {
      this.setState({
        showWriteConfirm: false
      });
    };

    const writeToiCloud = async () => {
      const local_jokes = await Joke.all(null, null, true);
      const local_set_lists = await SetList.all(null, null, true);
      const local_shows = await Show.all(null, null, true);

      await iCloudStorage.setItem('ComedyCompanion:jokes', JSON.stringify(local_jokes));
      await iCloudStorage.setItem('ComedyCompanion:set_lists', JSON.stringify(local_set_lists));
      await iCloudStorage.setItem('ComedyCompanion:shows', JSON.stringify(local_shows));

      if (local_jokes.length > 0) {
        const jokes_next_id = await AsyncStorage.getItem('@' + Joke.databaseName() + ':' + Joke.tableName() + '_next_id');
        await iCloudStorage.setItem('ComedyCompanion:jokes_next_id', jokes_next_id);
      }

      if (local_set_lists.length > 0) {
        const set_lists_next_id = await AsyncStorage.getItem('@' + SetList.databaseName() + ':' + SetList.tableName() + '_next_id');
        await iCloudStorage.setItem('ComedyCompanion:set_lists_next_id', set_lists_next_id);
      }

      if (local_shows.length > 0) {
        const shows_next_id = await AsyncStorage.getItem('@' + Show.databaseName() + ':' + Show.tableName() + '_next_id');
        await iCloudStorage.setItem('ComedyCompanion:shows_next_id', shows_next_id);
      }

      this.setState({
        showWriteConfirm: false
      });

      alert('Write to iCloud Complete!');
    };

    const confirmReadFromiCloud = async () => {
      const cloud_jokes = JSON.parse(await iCloudStorage.getItem('ComedyCompanion:jokes'));
      const cloud_set_lists = JSON.parse(await iCloudStorage.getItem('ComedyCompanion:set_lists'));
      const cloud_shows = JSON.parse(await iCloudStorage.getItem('ComedyCompanion:shows'));

      this.setState({
        cloudJokesCount: cloud_jokes.length,
        cloudSetListsCount: cloud_set_lists.length,
        cloudShowsCount: cloud_shows.length,
        showReadConfirm: true
      });
    };

    const cancelReadFromiCloud = async () => {
      this.setState({
        showReadConfirm: false
      });
    };

    const readFromiCloud = async () => {
      const cloud_jokes = JSON.parse(await iCloudStorage.getItem('ComedyCompanion:jokes'));
      const cloud_set_lists = JSON.parse(await iCloudStorage.getItem('ComedyCompanion:set_lists'));
      const cloud_shows = JSON.parse(await iCloudStorage.getItem('ComedyCompanion:shows'));

      await Joke.destroy_all();
      await SetList.destroy_all();
      await Show.destroy_all();

      for (let i = 0; i < cloud_jokes.length; i++) {
        const cloud_joke = new Joke(cloud_jokes[i]);
        await cloud_joke.save(null, true);
      }

      for (let i = 0; i < cloud_set_lists.length; i++) {
        const cloud_set_list = new SetList(cloud_set_lists[i]);
        await cloud_set_list.save(null, true);
      }

      for (let i = 0; i < cloud_shows.length; i++) {
        const cloud_show = new Show(cloud_shows[i]);
        await cloud_show.save(null, true);
      }

      if (cloud_jokes.length > 0) {
        const jokes_next_id = JSON.parse(await iCloudStorage.getItem('ComedyCompanion:jokes_next_id'));
        await AsyncStorage.setItem('@' + Joke.databaseName() + ':' + Joke.tableName() + '_next_id', JSON.stringify(jokes_next_id));
      }

      if (cloud_set_lists.length > 0) {
        const set_lists_next_id = JSON.parse(await iCloudStorage.getItem('ComedyCompanion:set_lists_next_id'));
        await AsyncStorage.setItem('@' + SetList.databaseName() + ':' + SetList.tableName() + '_next_id', JSON.stringify(set_lists_next_id));
      }

      if (cloud_shows.length > 0) {
        const shows_next_id = JSON.parse(await iCloudStorage.getItem('ComedyCompanion:shows_next_id'));
        await AsyncStorage.setItem('@' + Show.databaseName() + ':' + Show.tableName() + '_next_id', JSON.stringify(shows_next_id));
      }

      await JokeListHelper.refreshJokeList();
      await JokeListHelper.refreshJokeListEmpty();
      await SetListListHelper.refreshSLList();
      await SetListListHelper.refreshSLListEmpty();
      await ShowListHelper.refreshShowList();
      await ShowListHelper.refreshShowListEmpty();

      this.setState({
        showReadConfirm: false
      });

      alert('Read from iCloud Complete!');
    };

    return (
      <View style={[layoutStyles.modal, layoutStyles.centeredFlex]}>
        <View style={layoutStyles.statusBarBuffer} />
        <View style={layoutStyles.modalContent}>
          { this.state.showReadConfirm &&
            <View style={ layoutStyles.confirmBox }>
              <Text style={{ textAlign: 'center' }}>This is what is stored on your iCloud:</Text>
              <Text style={{ paddingTop: 25 }}>{ this.state.cloudJokesCount } Jokes</Text>
              <Text>{ this.state.cloudSetListsCount } Set Lists</Text>
              <Text>{ this.state.cloudShowsCount } Shows</Text>
              <Text style={{ textAlign: 'center', paddingTop: 25, fontWeight: 'bold' }}>ARE YOU SURE YOU WANT TO REPLACE EVERYTHING WITH WHAT IS ON ICLOUD?</Text>
              <View style={{ paddingTop: 25, flexDirection: 'row' }}>
                <Button type="surface" size="large" theme="red" onPress={ cancelReadFromiCloud }>
                  <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>NO</Text>
                </Button>
                <Button selfStyle={{ marginLeft: 10 }} type="surface" size="large" theme="blue" onPress={ readFromiCloud }>
                  <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>YES</Text>
                </Button>
              </View>
            </View>
          }
          { this.state.showWriteConfirm &&
          <View style={ layoutStyles.confirmBox }>
            <Text style={{ textAlign: 'center' }}>This is what is stored on your device:</Text>
            <Text style={{ paddingTop: 25 }}>{ this.state.localJokesCount } Jokes</Text>
            <Text>{ this.state.localSetListsCount } Set Lists</Text>
            <Text>{ this.state.localShowsCount } Shows</Text>
            <Text style={{ textAlign: 'center', paddingTop: 25, fontWeight: 'bold' }}>ARE YOU SURE YOU WANT TO OVERWRITE EVERYTHING ON ICLOUD?</Text>
            <View style={{ paddingTop: 25, flexDirection: 'row' }}>
              <Button type="surface" size="large" theme="red" onPress={ cancelWriteToiCloud }>
                <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>NO</Text>
              </Button>
              <Button selfStyle={{ marginLeft: 10 }} type="surface" size="large" theme="blue" onPress={ writeToiCloud }>
                <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>YES</Text>
              </Button>
            </View>
          </View>
          }
          <View style={{ flex: 1 }}>
            <View style={[layoutStyles.modalContentSection]}>
              <View style={ {borderBottomColor: '#999999', borderBottomWidth: 1, paddingBottom: 5, marginBottom: 10} }>
                <Text style={ layoutStyles.inputLabel }>Jokes Settings</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={ jokeListStyles.sortByText }>Sort by: </Text>
                <SegmentedControls
                  options={
                  [{ label: 'Updated', value: '_updated_at' },
                   { label: 'Name', value: '_name' }]
                }
                  onSelection={ (sort_field) => jokeSortFieldButtonClicked(sort_field) }
                  selectedOption={ jokeListState.sort_field }
                  containerStyle={{ flex: 1 }}
                  extractText={ (option) => option.label }
                  testOptionEqual={(selectedValue, option) => selectedValue === option.value}
                />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 10 }}>
                <Text style={ jokeListStyles.sortInText }>Sort in: </Text>
                <SegmentedControls
                  options={
                  [{ label: 'Ascending Order', value: 'ASC' },
                   { label: 'Descending Order', value: 'DESC' }]
                }
                  onSelection={ (sort_order) => jokeSortOrderButtonClicked(sort_order) }
                  selectedOption={ jokeListState.sort_order }
                  containerStyle={{ flex: 1 }}
                  extractText={ (option) => option.label }
                  testOptionEqual={(selectedValue, option) => selectedValue === option.value}
                />
              </View>
            </View>
            <View style={[layoutStyles.modalContentSection]}>
              <View style={ {borderBottomColor: '#999999', borderBottomWidth: 1, paddingBottom: 5, marginBottom: 10} }>
                <Text style={ layoutStyles.inputLabel }>Set Lists Settings</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={ setListListStyles.sortByText }>Sort by: </Text>
                <SegmentedControls
                  options={
                  [{ label: 'Updated', value: '_updated_at' },
                   { label: 'Name', value: '_name' },
                   { label: 'Length', value: '_length' }]
                }
                  onSelection={ (sort_field) => setListSortFieldButtonClicked(sort_field) }
                  selectedOption={ setListListState.sort_field }
                  containerStyle={{ flex: 1 }}
                  extractText={ (option) => option.label }
                  testOptionEqual={(selectedValue, option) => selectedValue === option.value}
                />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 10 }}>
                <Text style={ setListListStyles.sortInText }>Sort in: </Text>
                <SegmentedControls
                  options={
                  [{ label: 'Ascending Order', value: 'ASC' },
                   { label: 'Descending Order', value: 'DESC' }]
                }
                  onSelection={ (sort_order) => setListSortOrderButtonClicked(sort_order) }
                  selectedOption={ setListListState.sort_order }
                  containerStyle={{ flex: 1 }}
                  extractText={ (option) => option.label }
                  testOptionEqual={(selectedValue, option) => selectedValue === option.value}
                />
              </View>
            </View>
            <View style={[layoutStyles.modalContentSection]}>
              <View style={ {borderBottomColor: '#999999', borderBottomWidth: 1, paddingBottom: 5, marginBottom: 10} }>
                <Text style={ layoutStyles.inputLabel }>Shows Settings</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={ showListStyles.sortByText }>Sort by: </Text>
                <SegmentedControls
                  options={
                  [{ label: 'Venue', value: '_venue' },
                   { label: 'Date', value: '_date' }]
                }
                  onSelection={ (sort_field) => showSortFieldButtonClicked(sort_field) }
                  selectedOption={ showListState.sort_field }
                  containerStyle={{ flex: 1 }}
                  extractText={ (option) => option.label }
                  testOptionEqual={(selectedValue, option) => selectedValue === option.value}
                />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 10 }}>
                <Text style={ showListStyles.sortInText }>Sort in: </Text>
                <SegmentedControls
                  options={
                  [{ label: 'Ascending Order', value: 'ASC' },
                   { label: 'Descending Order', value: 'DESC' }]
                }
                  onSelection={ (sort_order) => showSortOrderButtonClicked(sort_order) }
                  selectedOption={ showListState.sort_order }
                  containerStyle={{ flex: 1 }}
                  extractText={ (option) => option.label }
                  testOptionEqual={(selectedValue, option) => selectedValue === option.value}
                />
              </View>
            </View>
            <View style={[layoutStyles.modalContentSection]}>
              <View style={ {borderBottomColor: '#999999', borderBottomWidth: 1, paddingBottom: 5, marginBottom: 10} }>
                <Text style={ layoutStyles.inputLabel }>iCloud Sync</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Button type="surface" size="large" theme="blue" onPress={ confirmWriteToiCloud }>
                    <Text>Write to iCloud</Text>
                </Button>
                <Button type="surface" size="large" theme="blue" onPress={ confirmReadFromiCloud } selfStyle={{ marginLeft: 10 }}>
                  <Text>Read from iCloud</Text>
                </Button>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row', width: '100%', borderTopColor: '#999999', borderTopWidth: 1 }}>
            <View style={ { flex: 1 } }>
              <Button type="surface" size="large" theme="gray" onPress={ close }>
                <Text style={layoutStyles.buttonText}>Close</Text>
              </Button>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default connect(state => ({
    jokeListState: state.joke_list,
    setListListState: state.set_list_list,
    showListState: state.show_list
  }),
  (dispatch) => ({
    routingActions: bindActionCreators(routingActions, dispatch),
    jokeListActions: bindActionCreators(jokeListActions, dispatch),
    setListListActions: bindActionCreators(setListListActions, dispatch),
    showListActions: bindActionCreators(showListActions, dispatch)
  })
)(Settings);
