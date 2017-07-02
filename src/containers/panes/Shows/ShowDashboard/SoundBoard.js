'use strict';

import React, {Component} from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {Button} from 'react-native-ui-xg';

import layoutStyles from '../../../../stylesheets/layoutStyles';
import showDashboardStyles from '../../../../stylesheets/showDashboardStyles';

import * as showActions from '../../../../actions/showActions';

import {recIcon, timerIcon, pauseIcon, stopIcon} from '../../../../helpers/icons';

import {AudioRecorder, AudioUtils} from 'react-native-audio';

class SoundBoard extends Component {
  constructor(props) {
    super(props);

    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.updateShowTimer = this.updateShowTimer.bind(this);
    this.displayShowTime = this.displayShowTime.bind(this);

    this.timerInterval = null;
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    this.stopTimer();
  }

  updateShowTimer() {
    this.props.showActions.updateShowTimer();
  };

  shouldComponentUpdate(nextProps, nextState) {
    const showTimerChanged = this.props.showState.timer_running !== nextProps.showState.timer_running;
    const showSecondsChanged = this.props.showState.show._show_time_seconds !== nextProps.showState.show._show_time_seconds;

    return showTimerChanged || showSecondsChanged;
  }

  startTimer() {
    this.props.showActions.startShowTimer();

    this.timerInterval = setInterval(this.updateShowTimer, 1000);
  }

  stopTimer() {
    this.props.showActions.stopShowTimer();

    clearInterval(this.timerInterval);

    this.props.showState.show.save();
  }

  displayShowTime() {
    const total_seconds = this.props.showState.show._show_time_seconds;

    const hours = Math.floor(total_seconds / 3600);
    const minutes = Math.floor((total_seconds - (hours * 3600)) / 60);
    const seconds = Math.floor(total_seconds - (hours * 3600) - (minutes * 60));

    return `${hours > 0 ? hours.toString() + ':' : ''}${minutes > 9 ? minutes.toString() : '0' + minutes.toString()}:${seconds > 9 ? seconds.toString() : '0' + seconds.toString()}`;
  }

  render() {
    const { showState } = this.props;

    return (
      <View style={ showDashboardStyles.soundBoardView }>
        <View style={ showDashboardStyles.buttonView }>
          <Button type="surface" size="large" theme="red" onPress={ () => alert('recording') }>
            <Text>{recIcon}</Text>
            <Text style={layoutStyles.buttonText}>Rec</Text>
          </Button>
        </View>
        <View style={ showDashboardStyles.buttonView }>
          { !showState.timer_running &&
            <Button type="surface" size="large" theme="gray" onPress={ this.startTimer }>
              <Text>{timerIcon}</Text>
              <Text style={layoutStyles.buttonText}>Time</Text>
            </Button> }
          { showState.timer_running &&
            <Button type="surface" size="large" theme="gray" selfStyle={ { borderColor: '#FF0000' } } onPress={ this.stopTimer }>
              <Text>{stopIcon}</Text>
              <Text style={layoutStyles.buttonText}>Stop</Text>
            </Button> }
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={ showDashboardStyles.timerText }>{ this.displayShowTime() }</Text>
        </View>
      </View>
    );
  }
}

export default connect(state => ({
    showState: state.show
  }),
  (dispatch) => ({
    showActions: bindActionCreators(showActions, dispatch)
  })
)(SoundBoard);
