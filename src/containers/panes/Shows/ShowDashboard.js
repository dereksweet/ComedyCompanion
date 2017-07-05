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

import layoutStyles from '../../../stylesheets/layoutStyles';

class ShowDashboard extends Component {
  constructor(props) {
    super(props);

    this.deleteRecording = this.deleteRecording.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const deleteRecordingConfirmChanged = this.props.showState.delete_recording_confirm !== nextProps.showState.delete_recording_confirm;

    return deleteRecordingConfirmChanged;
  }

  deleteRecording() {
    this.props.showActions.setHasRecording(false);
    this.props.showActions.toggleDeleteRecordingConfirm();
    this.props.showState.show.save();
    this.props.showActions.resetShowTimer();
  }

  render() {
    const { showState, showActions } = this.props;

    // const showDateString = moment(showState.show._date).format('MMddYYYY');
    // const showIDString = showState.show._id.toString();
    // let audioPath = AudioUtils.DocumentDirectoryPath + '/ComComp/showAudio_' + showDateString + '_' + showIDString + '.aac';

    return (
      <View style={{ flex: 1 }}>
        <View style={layoutStyles.statusBarBuffer} />
        <SoundBoard />
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
