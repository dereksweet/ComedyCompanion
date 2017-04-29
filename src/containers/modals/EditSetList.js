'use strict';

import React, {Component} from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {Button} from 'react-native-ui-xg';

import JokeSelector from './EditSetList/JokeSelector';

import * as routingActions from '../../actions/routingActions';
import * as jokeListActions from '../../actions/jokeListActions';

import JokeListHelper from '../../helpers/jokeListHelper';

import layoutStyles from '../../stylesheets/layoutStyles';

class EditSetList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { routingActions } = this.props;

    const cancel = () => {
      routingActions.closeModal();
    };

    return (
      <View style={layoutStyles.centeredFlex}>
        <View style={layoutStyles.statusBarBuffer} />
        <View style={layoutStyles.modalContent}>
          <View style={{ flex: 1, flexDirection: 'row', borderTopColor: '#CCCCCC', borderTopWidth: 1 }}>
            <View style={{ flex: 1, borderRightColor: '#CCCCCC', borderRightWidth: 1 }}>
              <JokeSelector />
            </View>
            <View style={{ flex: 1 }}>

            </View>
          </View>
          <View style={ { flexDirection: 'row', width: '100%' }}>
            <View style={ { flex: 1 } }>
              <Button type="surface" size="large" theme="gray" onPress={ cancel }>
                <Text style={layoutStyles.buttonText}>Cancel</Text>
              </Button>
            </View>
            <View style={ { flex: 1 } }>
              <Button type="surface" size="large" theme="blue" onPress={ cancel }>
                <Text style={layoutStyles.buttonText}>Save</Text>
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
)(EditSetList);
