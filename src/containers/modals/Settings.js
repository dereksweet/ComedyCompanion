'use strict';

import React, {Component} from 'react';
import { View, Text } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {Button} from 'react-native-ui-xg';
import { SegmentedControls } from 'react-native-radio-buttons';

import Joke from '../../models/Joke';

import * as routingActions from '../../actions/routingActions';
import * as jokeListActions from '../../actions/jokeListActions';

import layoutStyles from '../../stylesheets/layoutStyles';

class Settings extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { jokeListState, routingActions, jokeListActions } = this.props;

    const close = () => {
      routingActions.toggleSettings();
    };

    const sortFieldButtonClicked = (sort_field_option) => {
      let sort_field = sort_field_option.value;

      jokeListActions.setJokeListSortField(sort_field);

      Joke.where({ '_name': "LIKE|'" + jokeListState.name_filter + "'" }, 'AND', sort_field, jokeListState.sort_order).then((jokes) => {
        jokeListActions.setJokeList(jokes);
      });
    };

    const sortOrderButtonClicked = (sort_order_option) => {
      let sort_order = sort_order_option.value;

      jokeListActions.setJokeListSortOrder(sort_order);

      Joke.where({ '_name': "LIKE|'" + jokeListState.name_filter + "'" }, 'AND', jokeListState.sort_field, sort_order).then((jokes) => {
        jokeListActions.setJokeList(jokes);
      });
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
                  onSelection={ (sort_field) => sortFieldButtonClicked(sort_field) }
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
                  onSelection={ (sort_order) => sortOrderButtonClicked(sort_order) }
                  selectedOption={ jokeListState.sort_order }
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
    jokeListState: state.joke_list
  }),
  (dispatch) => ({
    routingActions: bindActionCreators(routingActions, dispatch),
    jokeListActions: bindActionCreators(jokeListActions, dispatch)
  })
)(Settings);
