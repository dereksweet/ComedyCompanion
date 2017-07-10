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

    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.displayShowTime = this.displayShowTime.bind(this);
    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.pressPlayPauseStop = this.pressPlayPauseStop.bind(this);
    this.stopPlaying = this.stopPlaying.bind(this);
    this.play = this.play.bind(this);
    this.rewind = this.rewind.bind(this);
    this.fastForward = this.fastForward.bind(this);
    this.back30 = this.back30.bind(this);
    this.forward30 = this.forward30.bind(this);
    this.deleteRecording = this.deleteRecording.bind(this);
    this.stopRunningProcesses = this.stopRunningProcesses.bind(this);
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    this.stopRunningProcesses();
  }

  stopRunningProcesses() {
    if (this.props.showState.is_timing)
      this.stopTimer();

    if (this.props.showState.is_recording)
      this.stopRecording();

    if (this.props.showState.is_playing)
      this.stopPlaying();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const showTimerChanged = this.props.showState.is_timing !== nextProps.showState.is_timing;
    const showSecondsChanged = this.props.showState.show._show_time_seconds !== nextProps.showState.show._show_time_seconds;
    const hasRecordingChanged = this.props.showState.show._has_recording !== nextProps.showState.show._has_recording;

    return showTimerChanged || showSecondsChanged || hasRecordingChanged;
  }

  startTimer() {
    this.props.showActions.startShowTimer();

    this.props.startTimerInterval();
  }

  stopTimer() {
    this.props.showActions.stopShowTimer();

    this.props.stopTimerInterval();

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
    if (!this.props.showState.is_timing) {
      this.props.showActions.setHasRecording(true);
      this.props.showActions.startRecording();

      this.props.startTimerInterval();

      this.props.showState.audio_service.record();
    }
  }

  stopRecording() {
    this.props.showActions.stopRecording();

    this.props.stopTimerInterval();

    this.props.showState.show.save();

    this.props.showState.audio_service.stop_recording();
  }

  play() {
    this.props.showActions.startPlaying();

    this.props.startTimerInterval();

    this.props.showState.audio_service.play(this.stopPlaying);
  }

  stopPlaying() {
    this.props.showActions.stopPlaying();

    this.props.stopTimerInterval();

    this.props.showState.audio_service.stop_playing();
  }

  rewind() {
    if (!this.props.showState.is_recording) {
      if (this.props.showState.is_playing) {
        this.stopPlaying();
      }

      this.props.showActions.resetShowTimer();

      this.props.showState.audio_service.setCurrentTime(0.0);
    }
  }

  fastForward() {
    if (!this.props.showState.is_recording)
      alert('fast foward');
  }

  back30() {
    if (!this.props.showState.is_recording)
      alert('back30');
  }

  forward30() {
    if (!this.props.showState.is_recording)
      alert('forward30');
  }

  pressPlayPauseStop() {
    if (this.props.showState.is_recording)
      this.stopRecording();
    else if (this.props.showState.is_playing)
      this.stopPlaying();
    else
      this.play();
  }

  deleteRecording() {
    if (!this.props.showState.is_recording && !this.props.showState.is_playing) {
      this.props.showActions.toggleDeleteRecordingConfirm();
    }
  }

  render() {
    const { showState, showActions } = this.props;

    const swipeoutButtons = showState.show._has_recording ? [{ text: 'Delete', backgroundColor: '#FF0000', underlayColor: '#DD0000', onPress: this.deleteRecording }] : [];

    return (
      <View>
        { showState.show._has_recording &&
          <Swipeout right={ swipeoutButtons } autoClose={ true }>
            <View style={ showDashboardStyles.soundBoardView }>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={ showDashboardStyles.buttonView }>
                  { !showState.is_recording &&
                    <Button type="surface" size="large" theme="red" onPress={ showActions.toggleReplaceRecordingConfirm }>
                      <Text>{recIcon}</Text>
                      <Text style={layoutStyles.buttonText}>Rec</Text>
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
                      <Text style={ [showDashboardStyles.timerText, { marginLeft: 10, color: showState.is_recording ? '#DD4444' : '#FFFFFF' }] }>{ this.displayShowTime() }</Text>
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
                  <Button type="surface" size="large" theme="gray" onPress={ this.startTimer }>
                    <Text>{timerIcon}</Text>
                    <Text style={layoutStyles.buttonText}>Time</Text>
                  </Button> }
                { showState.is_timing &&
                  <Button type="surface" size="large" theme="gray" selfStyle={ { borderColor: '#FF0000', borderWidth: 2 } } onPress={ this.stopTimer }>
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
