'use strict';

import React, {Component} from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {Button} from 'react-native-ui-xg';
import Swipeout from 'react-native-swipeout';

import { normalizeHeight, normalizeWidth } from '../../../../helpers/sizeHelper';

import layoutStyles from '../../../../stylesheets/layoutStyles';
import showDashboardStyles from '../../../../stylesheets/showDashboardStyles';

import * as showActions from '../../../../actions/showActions';

import {backIcon, recIcon, timerIcon, pauseIcon, stopIcon, rewindIcon, fastForwardIcon, back30Icon, forward30Icon, playIcon} from '../../../../helpers/icons';

import {AudioRecorder, AudioUtils} from 'react-native-audio';

class SoundBoard extends Component {
  constructor(props) {
    super(props);

    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.updateShowTimer = this.updateShowTimer.bind(this);
    this.displayShowTime = this.displayShowTime.bind(this);
    this.startRecording = this.startRecording.bind(this);

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
    const hasRecordingChanged = this.props.showState.show._has_recording !== nextProps.showState.show._has_recording;

    return showTimerChanged || showSecondsChanged || hasRecordingChanged;
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

  startRecording() {
    this.props.showActions.setHasRecording(true);
  }

  render() {
    const { showState, showActions } = this.props;

    const swipeoutButtons = showState.show._has_recording ? [{ text: 'Delete', backgroundColor: '#FF0000', underlayColor: '#DD0000', onPress: showActions.toggleDeleteRecordingConfirm }] : [];

    return (
      <View>
        { showState.show._has_recording &&
          <Swipeout right={ swipeoutButtons } autoClose={ true }>
            <View style={ showDashboardStyles.soundBoardView }>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={ showDashboardStyles.buttonView }>
                  <Button type="surface" size="large" theme="red" onPress={ this.startRecording }>
                    <Text>{recIcon}</Text>
                    <Text style={layoutStyles.buttonText}>Rec</Text>
                  </Button>
                  <Text style={{ color: '#CCCCCC', marginTop: 3, fontSize: normalizeWidth(10), alignSelf: 'center', alignItems: 'center' }}>swipe { backIcon } to del</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={ showDashboardStyles.playbackControlView }>
                      <Button type="surface" size="default" theme="gray" onPress={ () => { alert('rewind') } }>
                        <Text style={{ left: -2, width: 20 }}>{rewindIcon}</Text>
                      </Button>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={ [showDashboardStyles.timerText, { marginLeft: 10 }] }>{ this.displayShowTime() }</Text>
                    </View>
                    <View style={ showDashboardStyles.playbackControlView }>
                      <Button type="surface" size="default" theme="gray" onPress={ () => { alert('ffwd') } }>
                        <Text style={{ left: -2, width: 20 }}>{fastForwardIcon}</Text>
                      </Button>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={ [showDashboardStyles.playbackControlView, { marginBottom: 5 }] }>
                      <Button type="surface" size="default" theme="gray" onPress={ () => { alert('back30') } }>
                        <Text style={{ left: -2, width: 20 }}>{back30Icon}</Text>
                      </Button>
                    </View>
                    <View style={ [showDashboardStyles.playbackControlView, { marginBottom: 5 }] }>
                      <Button type="surface" size="default" theme="gray" onPress={ () => { alert('play') } }>
                        <Text style={{ left: -2, width: 20 }}>{playIcon}</Text>
                      </Button>
                    </View>
                    <View style={ [showDashboardStyles.playbackControlView, { marginBottom: 5 }] }>
                      <Button type="surface" size="default" theme="gray" onPress={ () => { alert('forward30') } }>
                        <Text style={{ left: -2, width: 20 }}>{forward30Icon}</Text>
                      </Button>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Swipeout>
        }
        { !showState.show._has_recording &&
          <View style={ showDashboardStyles.soundBoardView }>
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <View style={ showDashboardStyles.buttonView }>
                <Button type="surface" size="large" theme="red" onPress={ this.startRecording }>
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
          </View>
        }
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
