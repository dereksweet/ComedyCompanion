'use strict';

import React, {Component} from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {Button} from 'react-native-ui-xg';

import layoutStyles from '../../../../stylesheets/layoutStyles';
import showDashboardStyles from '../../../../stylesheets/showDashboardStyles';

import {recIcon, timerIcon} from '../../../../helpers/icons';

import {AudioRecorder, AudioUtils} from 'react-native-audio';

class SoundBoard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    const { showState } = this.props;

    return (
      <View style={ showDashboardStyles.soundBoardView }>
        <View style={{ width: 90, marginLeft: 10, justifyContent: 'center' }}>
          <Button type="surface" size="large" theme="red" onPress={ () => alert('recording') }>
            <Text>{recIcon}</Text>
            <Text style={layoutStyles.buttonText}>Rec</Text>
          </Button>
        </View>
        <View style={{ width: 90, marginLeft: 10, justifyContent: 'center' }}>
          <Button type="surface" size="large" theme="gray" onPress={ () => alert('timing') }>
            <Text>{timerIcon}</Text>
            <Text style={layoutStyles.buttonText}>Time</Text>
          </Button>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={ showDashboardStyles.timerText }>0:00</Text>
        </View>
      </View>
    );
  }
}

export default connect(state => ({
    showState: state.show
  }),
  (dispatch) => ({

  })
)(SoundBoard);
