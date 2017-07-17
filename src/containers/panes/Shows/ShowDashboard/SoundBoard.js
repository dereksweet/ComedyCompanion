'use strict';

import React, {Component} from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {Button} from 'react-native-ui-xg';
import Swipeout from 'react-native-swipeout';

import { normalizeWidth } from '../../../../helpers/sizeHelper';
import { formatDisplayTime } from '../../../../helpers/formattingHelper';

import Show from '../../../../models/show';

import layoutStyles from '../../../../stylesheets/layoutStyles';
import showDashboardStyles from '../../../../stylesheets/showDashboardStyles';

import * as showActions from '../../../../actions/showActions';

import {
  backIcon,
  recIcon,
  recIconDisabled,
  timerIcon,
  pauseIcon,
  stopIcon,
  rewindIcon,
  rewindIconDisabled,
  fastForwardIcon,
  fastForwardIconDisabled,
  back30Icon,
  back30IconDisabled,
  forward30Icon,
  forward30IconDisabled,
  playIcon } from '../../../../helpers/icons';

import {AudioRecorder, AudioUtils} from 'react-native-audio';

class SoundBoard extends Component {
  constructor(props) {
    super(props);

    this.startTiming = this.startTiming.bind(this);
    this.stopTiming = this.stopTiming.bind(this);
    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.pressPlayPauseStop = this.pressPlayPauseStop.bind(this);
    this.stopPlaying = this.stopPlaying.bind(this);
    this.startPlaying = this.startPlaying.bind(this);
    this.rewind = this.rewind.bind(this);
    this.fastForward = this.fastForward.bind(this);
    this.back30 = this.back30.bind(this);
    this.forward30 = this.forward30.bind(this);
    this.deleteRecording = this.deleteRecording.bind(this);
    this.stopRunningProcesses = this.stopRunningProcesses.bind(this);
    this.showRecordingInfo = this.showRecordingInfo.bind(this);
  }

  componentDidMount() {
    this.props.showActions.setDisplayTimer(this.props.showState.show._show_time_seconds);
  }

  componentWillUnmount() {
    this.stopRunningProcesses();
  }

  stopRunningProcesses() {
    if (this.props.showState.is_timing)
      this.stopTiming();

    if (this.props.showState.is_recording)
      this.stopRecording();

    if (this.props.showState.is_playing)
      this.stopPlaying();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const showTimerChanged = this.props.showState.is_timing !== nextProps.showState.is_timing;
    const showPlayingChanged = this.props.showState.is_playing !== nextProps.showState.is_playing;
    const displayTimeChanged = this.props.showState.display_time_seconds !== nextProps.showState.display_time_seconds;
    const hasRecordingChanged = this.props.showState.show._has_recording !== nextProps.showState.show._has_recording;
    const isRecordingChanged = this.props.showState.is_recording !== nextProps.showState.is_recording;
    const isPlayingChanged = this.props.showState.is_playing !== nextProps.showState.is_playing;
    const isTimingChanged = this.props.showState.is_timing !== nextProps.showState.is_timing;

    return showTimerChanged || showPlayingChanged || displayTimeChanged || hasRecordingChanged || isRecordingChanged || isPlayingChanged || isTimingChanged;
  }

  startTiming() {
    this.props.showActions.setDisplayTimer(0.0);

    this.props.showActions.startShowTimer();

    this.props.startTimerInterval();
  }

  stopTiming() {
    this.props.showActions.stopShowTimer();

    this.props.stopTimerInterval();

    this.props.showState.show.save();
  }

  startRecording() {
    if ((!this.props.showState.is_timing) && (!this.props.showState.is_playing)) {
      this.props.showActions.setHasRecording(true);
      this.props.showActions.startRecording();

      this.props.showActions.setDisplayTimer(0.0);

      this.props.startTimerInterval();

      this.props.showState.audio_service.record();
    }
  }

  stopRecording() {
    this.props.showActions.stopRecording();

    this.props.stopTimerInterval();

    let recordingTime = Math.floor(this.props.showState.audio_service.state.currentTime);
    this.props.showActions.updateShowTimer(recordingTime);
    this.props.showActions.setDisplayTimer(recordingTime);

    let new_show = new Show(this.props.showState.show);
    new_show._show_time_seconds = recordingTime;
    new_show.save();

    this.props.showState.audio_service.stop_recording();

    this.props.showState.audio_service.updateFileInfo();
    this.props.showState.audio_service.updateFSInfo();
  }

  startPlaying() {
    const current_timer = this.props.showState.display_time_seconds;
    const recording_length = this.props.showState.show._show_time_seconds;

    if (Math.abs(current_timer - recording_length) <= 1.0) {
      this.props.showActions.setDisplayTimer(0.0);
      this.props.showState.audio_service.setCurrentTime(0.0);
    }

    this.props.showActions.startPlaying();

    this.props.startTimerInterval();

    this.props.showState.audio_service.play(this.stopPlaying);
  }

  stopPlaying() {
    this.props.showActions.stopPlaying();

    this.props.stopTimerInterval();

    this.props.showState.audio_service.pause();
  }

  rewind() {
    if (!this.props.showState.is_recording) {
      if (this.props.showState.is_playing) {
        this.stopPlaying();
      }

      this.props.showActions.setDisplayTimer(0.0);
      this.props.showState.audio_service.setCurrentTime(0.0);
    }
  }

  fastForward() {
    if (!this.props.showState.is_recording) {
      const recording_length = Math.floor(this.props.showState.show._show_time_seconds);

      this.props.showActions.setDisplayTimer(recording_length);
      this.props.showState.audio_service.setCurrentTime(recording_length);
    }
  }

  back30() {
    if (!this.props.showState.is_recording) {
      const minus_30 = this.props.showState.display_time_seconds - 30;

      const new_seconds = minus_30 < 0 ? 0 : minus_30;

      this.props.showActions.setDisplayTimer(new_seconds);
      this.props.showState.audio_service.setCurrentTime(new_seconds);
    }

  }

  forward30() {
    if (!this.props.showState.is_recording) {
      const plus_30 = this.props.showState.display_time_seconds + 30;
      const recording_length = Math.floor(this.props.showState.show._show_time_seconds);

      const new_seconds = plus_30 > recording_length ? recording_length : plus_30;

      this.props.showActions.setDisplayTimer(new_seconds);
      this.props.showState.audio_service.setCurrentTime(new_seconds);
    }
  }

  pressPlayPauseStop() {
    if (this.props.showState.is_recording)
      this.stopRecording();
    else if (this.props.showState.is_playing)
      this.stopPlaying();
    else
      this.startPlaying();
  }

  deleteRecording() {
    if (!this.props.showState.is_recording && !this.props.showState.is_playing) {
      this.props.showActions.toggleDeleteRecordingConfirm();
    }
  }

  showRecordingInfo() {
    this.props.showActions.toggleRecordingInfo();
  }

  render() {
    const { showState, showActions } = this.props;

    const swipeoutButtons = showState.show._has_recording ? [{ text: 'Info', backgroundColor: '#CCCCCC', underLayColor: '#999999', onPress: this.showRecordingInfo }, { text: 'Delete', backgroundColor: '#FF0000', underlayColor: '#DD0000', onPress: this.deleteRecording }] : [];

    return (
      <View>
        { showState.show._has_recording &&
          <Swipeout right={ swipeoutButtons } autoClose={ true }>
            <View style={ showDashboardStyles.soundBoardView }>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={ showDashboardStyles.buttonView }>
                  { !showState.is_recording &&
                    <Button type="surface" size="large" theme={ showState.is_playing ? "gray" : "red" } onPress={ showState.is_playing ? () => {} : showActions.toggleReplaceRecordingConfirm }>
                      <Text>{showState.is_playing ? recIconDisabled : recIcon}</Text>
                      <Text style={[layoutStyles.buttonText, { color: showState.is_timing ? '#AAA' : '#FFF' }]}>Rec</Text>
                    </Button> }
                  { showState.is_recording &&
                    <Button type="surface" size="large" theme="red" selfStyle={ { borderColor: '#FF0000', borderWidth: 2 } } onPress={ this.stopRecording }>
                      <Text>{stopIcon}</Text>
                      <Text style={layoutStyles.buttonText}>Stop</Text>
                    </Button> }

                  <Text style={{ color: '#CCCCCC', marginTop: 3, fontSize: normalizeWidth(10), alignSelf: 'center', alignItems: 'center' }}>swipe { backIcon } to del</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={ showDashboardStyles.playbackControlView }>
                      <Button type="surface" size="default" theme="gray" onPress={ this.rewind }>
                        <Text style={{ left: -2, width: 20 }}>{showState.is_recording ? rewindIconDisabled : rewindIcon}</Text>
                      </Button>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={ [showDashboardStyles.timerText, { marginLeft: 10, color: showState.is_recording ? '#DD4444' : '#FFFFFF' }] }>{ formatDisplayTime(showState.display_time_seconds) }</Text>
                    </View>
                    <View style={ showDashboardStyles.playbackControlView }>
                      <Button type="surface" size="default" theme="gray" onPress={ this.fastForward }>
                        <Text style={{ left: -2, width: 20 }}>{showState.is_recording ? fastForwardIconDisabled : fastForwardIcon}</Text>
                      </Button>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={ [showDashboardStyles.playbackControlView, { marginBottom: 5 }] }>
                      <Button type="surface" size="default" theme="gray" onPress={ this.back30 }>
                        <Text style={{ left: -2, width: 20 }}>{showState.is_recording ? back30IconDisabled : back30Icon}</Text>
                      </Button>
                    </View>
                    <View style={ [showDashboardStyles.playbackControlView, { marginBottom: 5 }] }>
                      <Button type="surface" size="default" theme="gray" onPress={ this.pressPlayPauseStop }>
                        <Text style={{ left: -2, width: 20 }}>{ showState.is_recording ? stopIcon : showState.is_playing ? pauseIcon : playIcon}</Text>
                      </Button>
                    </View>
                    <View style={ [showDashboardStyles.playbackControlView, { marginBottom: 5 }] }>
                      <Button type="surface" size="default" theme="gray" onPress={ this.forward30 }>
                        <Text style={{ left: -2, width: 20 }}>{showState.is_recording ? forward30IconDisabled : forward30Icon}</Text>
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
                <Button type="surface" size="large" theme={ showState.is_timing ? "gray" : "red" } onPress={ this.startRecording }>
                  <Text>{showState.is_timing ? recIconDisabled : recIcon}</Text>
                  <Text style={[layoutStyles.buttonText, { color: showState.is_timing ? '#AAA' : '#FFF' }]}>Rec</Text>
                </Button>
              </View>
              <View style={ showDashboardStyles.buttonView }>
                { !showState.is_timing &&
                  <Button type="surface" size="large" theme="gray" onPress={ this.startTiming }>
                    <Text>{timerIcon}</Text>
                    <Text style={layoutStyles.buttonText}>Time</Text>
                  </Button> }
                { showState.is_timing &&
                  <Button type="surface" size="large" theme="gray" selfStyle={ { borderColor: '#FF0000', borderWidth: 2 } } onPress={ this.stopTiming }>
                    <Text>{stopIcon}</Text>
                    <Text style={layoutStyles.buttonText}>Stop</Text>
                  </Button> }
              </View>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={ showDashboardStyles.timerText }>{ formatDisplayTime(showState.display_time_seconds) }</Text>
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
