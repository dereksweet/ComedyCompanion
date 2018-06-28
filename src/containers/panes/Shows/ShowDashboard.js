'use strict';

import React, {Component} from 'react';
import { View, Text, ScrollView, TouchableHighlight } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {Button} from 'react-native-buttons';

import {AudioRecorder, AudioUtils} from 'react-native-audio';
import KeepAwake from 'react-native-keep-awake';

import SoundBoard from './ShowDashboard/SoundBoard';
import SetListViewer from './ShowDashboard/SetListViewer';

import * as showActions from '../../../actions/showActions';

import Show from '../../../models/show';

import { formatDisplayTime, formatBytesInMegabytes, formatBytesInGigabytes } from '../../../helpers/formattingHelper';
import ShowListHelper from '../../../helpers/showListHelper';

import layoutStyles from '../../../stylesheets/layoutStyles';

class ShowDashboard extends Component {
  constructor(props) {
    super(props);

    this.deleteRecording = this.deleteRecording.bind(this);
    this.replaceRecording = this.replaceRecording.bind(this);
    this.updateDisplayTimer = this.updateDisplayTimer.bind(this);
    this.startTimerInterval = this.startTimerInterval.bind(this);
    this.stopTimerInterval = this.stopTimerInterval.bind(this);
    this.toggleRecordingInfo = this.toggleRecordingInfo.bind(this);

    this.timerInterval = null;
  }

  updateDisplayTimer() {
    if (this.props.showState.is_playing) {
      this.props.showState.audio_service.state.sound.getCurrentTime((time) => {
        this.props.showActions.setDisplayTimer(time);
      });
    } else if (this.props.showState.is_recording) {
      this.props.showActions.setDisplayTimer(this.props.showState.audio_service.state.currentTime);
    } else {
      let new_show_time_seconds = Math.floor((new Date() - this.props.showState.timer_start) / 1000);
      this.props.showActions.updateShowTimer(new_show_time_seconds);
      this.props.showActions.setDisplayTimer(new_show_time_seconds);
    }
  };

  startTimerInterval() {
    this.timerInterval = setInterval(this.updateDisplayTimer, 100);
  }

  stopTimerInterval() {
    clearInterval(this.timerInterval);
  }

  componentDidMount() {
    if (this.props.showState.show._has_recording) {
      this.props.showState.audio_service.updateFileInfo();
      this.props.showState.audio_service.updateFSInfo();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const deleteRecordingConfirmChanged = this.props.showState.delete_recording_confirm !== nextProps.showState.delete_recording_confirm;
    const replaceRecordingConfirmChanged = this.props.showState.replace_recording_confirm !== nextProps.showState.replace_recording_confirm;
    const showRecordingInfoChanged = this.props.showState.show_recording_info !== nextProps.showState.show_recording_info;
    const fileSizeChanged = (this.props.showState.audio_service.state.file_info && this.props.showState.audio_service.state.file_info.size !== nextProps.showState.audio_service.state.file_info.size) || false;
    const freeSpaceChanged = (this.props.showState.audio_service.state.fs_info && this.props.showState.audio_service.state.fs_info.freeSpace !== nextProps.showState.audio_service.state.fs_info.freeSpace) || false;

    return deleteRecordingConfirmChanged || replaceRecordingConfirmChanged || showRecordingInfoChanged || fileSizeChanged || freeSpaceChanged;
  }

  deleteRecording() {
    this.props.showActions.setHasRecording(false);
    this.props.showActions.toggleDeleteRecordingConfirm();
    this.props.showActions.resetShowTimer();
    this.props.showActions.setDisplayTimer(0.0);

    // Unfortunately we have to also modify and save the show saved in the state, just updating the show in redux state is not enough
    let show = new Show(this.props.showState.show);
    show._has_recording = false;
    show._show_time_seconds = 0;
    show.save();

    this.props.showState.audio_service.deleteAudioFile();

    ShowListHelper.refreshShowList();
  }

  replaceRecording() {
    this.props.showActions.toggleReplaceRecordingConfirm();

    this.props.showActions.setDisplayTimer(0.0);

    this.props.showActions.startRecording();
    this.startTimerInterval();

    this.props.showState.audio_service.record();

    KeepAwake.activate();
  }

  toggleRecordingInfo() {
    this.props.showActions.toggleRecordingInfo();
  }

  render() {
    const { showState, showActions } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <View style={layoutStyles.statusBarBuffer} />
        <SoundBoard startTimerInterval={ this.startTimerInterval } stopTimerInterval={ this.stopTimerInterval } />
        <SetListViewer />
        { showState.delete_recording_confirm &&
          <View style={ layoutStyles.confirmBox }>
            <View style={{ paddingBottom: 40, paddingLeft: 20, paddingRight: 20 }}>
              <Text style={{ textAlign: 'center', fontSize: 20 }}>Are you SURE you want to delete this recording?</Text>
            </View>
            <View style={{ paddingTop: 25, flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <Button type="surface" size="large" theme="red" selfStyle={ layoutStyles.deleteButton } onPress={ showActions.toggleDeleteRecordingConfirm }>
                  <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>NO</Text>
                </Button>
              </View>
              <View style={{ flex: 1, marginRight: 10 }}>
                <Button type="surface" size="large" theme="blue" selfStyle={ [layoutStyles.confirmButton, { marginLeft: 10 }] } onPress={ this.deleteRecording }>
                  <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>YES</Text>
                </Button>
              </View>
            </View>
          </View>
        }
        { showState.replace_recording_confirm &&
          <View style={ layoutStyles.confirmBox }>
            <View style={{ paddingBottom: 40, paddingLeft: 20, paddingRight: 20 }}>
              <Text style={{ textAlign: 'center', fontSize: 20 }}>Are you SURE you want to replace this recording?</Text>
            </View>
            <View style={{ paddingTop: 25, flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <Button type="surface" size="large" theme="red" selfStyle={ layoutStyles.deleteButton } onPress={ showActions.toggleReplaceRecordingConfirm }>
                  <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>NO</Text>
                </Button>
              </View>
              <View style={{ flex: 1, marginRight: 10 }}>
                <Button type="surface" size="large" theme="blue" selfStyle={ [layoutStyles.confirmButton, { marginLeft: 10 }] } onPress={ this.replaceRecording }>
                  <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>YES</Text>
                </Button>
              </View>
            </View>
          </View>
        }
        { showState.show_recording_info &&
          <View style={ layoutStyles.confirmBox }>
            <View style={{ paddingBottom: 40, paddingLeft: 20, paddingRight: 20 }}>
              <Text style={{ textAlign: 'center', fontSize: 15 }}>
                <Text style={{ fontWeight: 'bold' }}>Recording Length</Text>: { formatDisplayTime(showState.show._show_time_seconds) }
              </Text>
              <Text style={{ textAlign: 'center', fontSize: 15 }}>
                <Text style={{ fontWeight: 'bold' }}>Recording Size</Text>: { formatBytesInMegabytes(showState.audio_service.state.file_info.size) }
              </Text>
              <Text style={{ textAlign: 'center', fontSize: 15 }}>
                <Text style={{ fontWeight: 'bold' }}>Remaining Space</Text>: { formatBytesInGigabytes(showState.audio_service.state.fs_info.freeSpace) }
              </Text>
              <Text style={{ textAlign: 'center', fontSize: 15, paddingTop: 10, paddingBottom: 10 }}>
                You could hold { Math.floor(showState.audio_service.state.fs_info.freeSpace / showState.audio_service.state.file_info.size).toLocaleString() } more recordings this size
              </Text>
            </View>
            <View style={{ paddingTop: 25, flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <Button type="surface" size="large" theme="red" selfStyle={ layoutStyles.confirmButton } onPress={ this.toggleRecordingInfo }>
                  <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>OK</Text>
                </Button>
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
)(ShowDashboard);
