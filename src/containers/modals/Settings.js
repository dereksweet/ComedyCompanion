'use strict';

import React, {Component} from 'react';
import { View, Text } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {Button} from 'react-native-ui-xg';
import { SegmentedControls } from 'react-native-radio-buttons';

import JokeListHelper from '../../helpers/jokeListHelper';
import SetListListHelper from '../../helpers/setListListHelper';
import ShowListHelper from '../../helpers/showListHelper';

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
  }

  render() {
    const { jokeListState, setListListState, showListState, routingActions, jokeListActions, setListListActions, showListActions } = this.props;

    const close = () => {
      routingActions.toggleSettings();
    };

    const jokeSortFieldButtonClicked = (sort_field_option) => {
      let sort_field = sort_field_option.value;

      jokeListActions.setJokeListSortField(sort_field);

      JokeListHelper.refreshJokeList({ sort_field: sort_field });
    };

    const jokeSortOrderButtonClicked = (sort_order_option) => {
      let sort_order = sort_order_option.value;

      jokeListActions.setJokeListSortOrder(sort_order);

      JokeListHelper.refreshJokeList({ sort_order: sort_order });
    };

    const setListSortFieldButtonClicked = (sort_field_option) => {
      let sort_field = sort_field_option.value;

      setListListActions.setSLListSortField(sort_field);

      SetListListHelper.refreshSLList({ sort_field: sort_field });
    };

    const setListSortOrderButtonClicked = (sort_order_option) => {
      let sort_order = sort_order_option.value;

      setListListActions.setSLListSortOrder(sort_order);

      SetListListHelper.refreshSLList({ sort_order: sort_order });
    };

    const showSortFieldButtonClicked = (sort_field_option) => {
      let sort_field = sort_field_option.value;

      showListActions.setShowListSortField(sort_field);

      ShowListHelper.refreshShowList({ sort_field: sort_field });
    };

    const showSortOrderButtonClicked = (sort_order_option) => {
      let sort_order = sort_order_option.value;

      showListActions.setShowListSortOrder(sort_order);

      ShowListHelper.refreshShowList({ sort_order: sort_order });
    };

    return (
      <View style={[layoutStyles.modal, layoutStyles.centeredFlex]}>
        <View style={layoutStyles.statusBarBuffer} />
        <View style={layoutStyles.modalContent}>
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
                   { label: 'Name', value: '_name' },
                   { label: 'Rating', value: '_rating' }]
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
