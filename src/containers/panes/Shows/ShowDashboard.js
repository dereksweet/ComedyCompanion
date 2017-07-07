'use strict';

import React, {Component} from 'react';
import { View, Text, ScrollView, TouchableHighlight } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {Button} from 'react-native-ui-xg';

import {AudioRecorder, AudioUtils} from 'react-native-audio';

import SoundBoard from './ShowDashboard/SoundBoard';
import SetListViewer from './ShowDashboard/SetListViewer';

import * as showActions from '../../../actions/showActions';

import Show from '../../../models/show';

import layoutStyles from '../../../stylesheets/layoutStyles';

class ShowDashboard extends Component {
  constructor(props) {
    super(props);

    this.deleteRecording = this.deleteRecording.bind(this);
    this.replaceRecording = this.replaceRecording.bind(this);
    this.updateShowTimer = this.updateShowTimer.bind(this);
    this.startTimerInterval = this.startTimerInterval.bind(this);
    this.stopTimerInterval = this.stopTimerInterval.bind(this);

    this.timerInterval = null;
  }

  updateShowTimer() {
    this.props.showActions.updateShowTimer();
  };

  startTimerInterval() {
    this.timerInterval = setInterval(this.updateShowTimer, 1000);
  }

  stopTimerInterval() {
    clearInterval(this.timerInterval);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const deleteRecordingConfirmChanged = this.props.showState.delete_recording_confirm !== nextProps.showState.delete_recording_confirm;
    const replaceRecordingConfirmChanged = this.props.showState.replace_recording_confirm !== nextProps.showState.replace_recording_confirm;

    return deleteRecordingConfirmChanged || replaceRecordingConfirmChanged;
  }

  deleteRecording() {
    this.props.showActions.setHasRecording(false);
    this.props.showActions.toggleDeleteRecordingConfirm();
    this.props.showActions.resetShowTimer();

    // Unfortunately we have to also modify and save the show saved in the state, just updating the show in redux state is not enough
    let show = new Show(this.props.showState.show);
    show._has_recording = false;
    show._show_time_seconds = 0;
    show.save();
  }

  replaceRecording() {
    this.props.showActions.toggleReplaceRecordingConfirm();

    this.props.showActions.startRecording();
    this.startTimerInterval();
  }

  render() {
    const { showState, showActions } = this.props;

    // const showDateString = moment(showState.show._date).format('MMddYYYY');
    // const showIDString = showState.show._id.toString();
    // let audioPath = AudioUtils.DocumentDirectoryPath + '/ComComp/showAudio_' + showDateString + '_' + showIDString + '.aac';

    return (
      <View style={{ flex: 1 }}>
        <View style={layoutStyles.statusBarBuffer} />
        <SoundBoard startTimerInterval={ this.startTimerInterval } stopTimerInterval={ this.stopTimerInterval } />
        <SetListViewer />
        { showState.delete_recording_confirm &&
          <View style={ layoutStyles.confirmBox }>
            <Text style={{ textAlign: 'center', fontSize: 20 }}>Are you SURE you want to delete this recording?</Text>
            <View style={{ paddingTop: 25, flexDirection: 'row' }}>
              <Button type="surface" size="large" theme="red" selfStyle={ layoutStyles.deleteButton } onPress={ showActions.toggleDeleteRecordingConfirm }>
                <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>NO</Text>
              </Button>
              <Button type="surface" size="large" theme="blue" selfStyle={ [layoutStyles.confirmButton, { marginLeft: 10 }] } onPress={ this.deleteRecording }>
                <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>YES</Text>
              </Button>
            </View>
          </View>
        }
        { showState.replace_recording_confirm &&
          <View style={ layoutStyles.confirmBox }>
            <Text style={{ textAlign: 'center', fontSize: 20 }}>Are you SURE you want to replace this recording?</Text>
            <View style={{ paddingTop: 25, flexDirection: 'row' }}>
              <Button type="surface" size="large" theme="red" selfStyle={ layoutStyles.deleteButton } onPress={ showActions.toggleReplaceRecordingConfirm }>
                <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>NO</Text>
              </Button>
              <Button type="surface" size="large" theme="blue" selfStyle={ [layoutStyles.confirmButton, { marginLeft: 10 }] } onPress={ this.replaceRecording }>
                <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>YES</Text>
              </Button>
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
