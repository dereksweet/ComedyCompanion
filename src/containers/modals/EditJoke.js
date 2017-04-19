'use strict';

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { View, Text, TouchableHighlight, Switch } from 'react-native';
import {Button} from 'react-native-ui-xg';

import * as jokesActions from '../../actions/jokesActions';

import layoutStyles from '../../stylesheets/layoutStyles';

class EditJoke extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { jokesState, jokesActions } = this.props;

    return (
      <View style={[layoutStyles.modal, layoutStyles.centeredFlex]}>
        <View style={layoutStyles.statusBarBuffer} />
        <View style={layoutStyles.modalContent}>
          <View style={ layoutStyles.modalContentSection }>
            <Text style={{ paddingRight: 10 }}>In Development:</Text>
            <Switch onValueChange={ jokesActions.toggleInDevelopment }
                    value={jokesState.joke._in_development} />
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
              <Text style={{ paddingRight: 10 }}>Rating: { jokesState.joke._rating.toFixed(1) }</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default connect(state => ({
    jokesState: state.jokes
  }),
  (dispatch) => ({
    jokesActions: bindActionCreators(jokesActions, dispatch)
  })
)(EditJoke);
