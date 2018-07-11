'use strict';

import React, {Component} from 'react';
import { View, Text, TouchableHighlight, Modal } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout';

import { normalizeWidth } from '../../../../helpers/sizeHelper';
import { formatDisplayTime } from '../../../../helpers/formattingHelper';

import Timer from '../../../modals/Timer';

import Show from '../../../../models/show';

import layoutStyles from '../../../../stylesheets/layoutStyles';
import showDashboardStyles from '../../../../stylesheets/showDashboardStyles';

import * as showActions from '../../../../actions/showActions';
import * as routingActions from '../../../../actions/routingActions';

import Button from '../../../../components/Button';

import ShowListHelper from '../../../../helpers/showListHelper';

import KeepAwake from 'react-native-keep-awake';

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
    this.showTimer = this.showTimer.bind(this);
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
    const timerVisibleChanged = this.props.routingState.timer_visible !== nextProps.routingState.timer_visible;

    return showTimerChanged || showPlayingChanged || displayTimeChanged || hasRecordingChanged || isRecordingChanged || isPlayingChanged || isTimingChanged || timerVisibleChanged;
  }

  startTiming() {
    this.props.showActions.setDisplayTimer(0.0);

    this.props.showActions.startShowTimer();

    this.props.startTimerInterval();

    KeepAwake.activate();
  }

  stopTiming() {
    this.props.showActions.stopShowTimer();

    this.props.stopTimerInterval();

    this.props.showState.show.save();

    KeepAwake.deactivate();
  }

  startRecording() {
    if ((!this.props.showState.is_timing) && (!this.props.showState.is_playing)) {
      this.props.showActions.setHasRecording(true);
      this.props.showActions.startRecording();

      this.props.showActions.setDisplayTimer(0.0);

      this.props.startTimerInterval();

      this.props.showState.audio_service.record();

      KeepAwake.activate();
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

    KeepAwake.deactivate();

    this.props.showState.audio_service.updateFileInfo();
    this.props.showState.audio_service.updateFSInfo();

    ShowListHelper.refreshShowList();
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

    KeepAwake.activate();
  }

  stopPlaying() {
    this.props.showActions.stopPlaying();

    this.props.stopTimerInterval();

    this.props.showState.audio_service.pause();

    KeepAwake.deactivate();
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

  showTimer() {
    if (this.props.showState.is_recording || this.props.showState.is_timing) {
      this.props.routingActions.toggleTimer();
    }
  }

  render() {
    const { showState, routingState, showActions } = this.props;

    const swipeoutButtons = showState.show._has_recording ? [{ text: 'Info', backgroundColor: '#CCCCCC', underLayColor: '#999999', onPress: this.showRecordingInfo }, { text: 'Delete', backgroundColor: '#FF0000', underlayColor: '#DD0000', onPress: this.deleteRecording }] : [];

    return (
      <View>
        { showState.show._has_recording &&
          <Swipeout right={ swipeoutButtons } autoClose={ true }>
            <View style={ showDashboardStyles.soundBoardView }>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={ showDashboardStyles.buttonView }>
                  <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                  { !showState.is_recording &&
                  <Button
                    onPress={showState.is_playing ? () => {} : showActions.toggleReplaceRecordingConfirm}
                    buttonText="Rec"
                    backgroundColor={showState.is_playing ? "gray" : "red"}
                    icon={showState.is_playing ? recIconDisabled : recIcon}
                    additionalStyles={{width: 100, height: 40}}
                  /> }
                  { showState.is_recording &&
                  <Button
                    onPress={showState.is_playing ? () => {} : this.stopRecording}
                    buttonText="Stop"
                    backgroundColor="red"
                    icon={stopIcon}
                    additionalStyles={{width: 100, height: 40, borderColor: '#FF0000', borderWidth: 2}}
                  /> }
                  </View>
                  <View style={{ marginBottom: 10 }}>
                    <Text style={{ color: '#CCCCCC', marginTop: 3, fontSize: normalizeWidth(10), alignSelf: 'center', alignItems: 'center' }}>swipe { backIcon } to del</Text>
                  </View>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={ showDashboardStyles.playbackControlView }>
                      <Button
                        onPress={this.rewind}
                        icon={showState.is_recording ? rewindIconDisabled : rewindIcon}
                        additionalStyles={{width: 45, height: 32}}
                      />
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                      <TouchableHighlight underlayColor='rgba(0,0,0,0)' onPress={ this.showTimer }>
                        <Text style={ [showDashboardStyles.timerText, { marginLeft: 10, color: showState.is_recording ? '#DD4444' : '#FFFFFF' }] }>{ formatDisplayTime(showState.display_time_seconds) }</Text>
                      </TouchableHighlight>
                    </View>
                    <View style={ showDashboardStyles.playbackControlView }>
                      <Button
                        onPress={this.fastForward}
                        icon={showState.is_recording ? fastForwardIconDisabled : fastForwardIcon}
                        additionalStyles={{width: 45, height: 32}}
                      />
                    </View>
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={ [showDashboardStyles.playbackControlView, { marginBottom: 5 }] }>
                      <Button
                        onPress={this.back30}
                        icon={showState.is_recording ? back30IconDisabled : back30Icon}
                        additionalStyles={{width: 45, height: 32}}
                      />
                    </View>
                    <View style={ [showDashboardStyles.playbackControlView, { marginBottom: 5 }] }>
                      <Button
                        onPress={this.pressPlayPauseStop}
                        icon={showState.is_recording ? stopIcon : showState.is_playing ? pauseIcon : playIcon}
                        additionalStyles={{width: 45, height: 32}}
                      />
                    </View>
                    <View style={ [showDashboardStyles.playbackControlView, { marginBottom: 5 }] }>
                      <Button
                        onPress={this.forward30}
                        icon={showState.is_recording ? forward30IconDisabled : forward30Icon}
                        additionalStyles={{width: 45, height: 32}}
                      />
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
                <Button
                  onPress={this.startRecording}
                  buttonText="Rec"
                  textColor={showState.is_timing ? '#AAA' : '#FFF'}
                  backgroundColor={showState.is_timing ? "gray" : "red"}
                  icon={showState.is_timing ? recIconDisabled : recIcon}
                  additionalStyles={{width: 100, height: 40}}
                />
              </View>
              <View style={ showDashboardStyles.buttonView }>
                { !showState.is_timing &&
                <Button
                  onPress={this.startTiming}
                  buttonText="Time"
                  icon={timerIcon}
                  additionalStyles={{width: 100, height: 40}}
                /> }
                { showState.is_timing &&
                <Button
                  onPress={this.stopTiming}
                  buttonText="Stop"
                  icon={stopIcon}
                  additionalStyles={{borderColor: '#FF0000', borderWidth: 2, height: 40}}
                /> }
              </View>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableHighlight underlayColor='rgba(0,0,0,0)' onPress={ this.showTimer }>
                  <Text style={ showDashboardStyles.timerText }>{ formatDisplayTime(showState.display_time_seconds) }</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        }
        <Modal style={ layoutStyles.modal }
               animationType={ "fade" }
               transparent={false}
               visible={routingState.timer_visible}
               onRequestClose={() => { }}>
          <Timer />
        </Modal>
      </View>
    );
  }
}

export default connect(state => ({
    showState: state.show,
    routingState: state.routing
  }),
  (dispatch) => ({
    showActions: bindActionCreators(showActions, dispatch),
    routingActions: bindActionCreators(routingActions, dispatch)
  })
)(SoundBoard);
