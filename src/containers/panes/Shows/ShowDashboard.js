'use strict';

import React, {Component} from 'react';
import { View, Text, ScrollView, TouchableHighlight } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import {AudioRecorder, AudioUtils} from 'react-native-audio';

import SoundBoard from './ShowDashboard/SoundBoard';
import SetListViewer from './ShowDashboard/SetListViewer';

import layoutStyles from '../../../stylesheets/layoutStyles';

class ShowDashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // const showDateString = moment(showState.show._date).format('MMddYYYY');
    // const showIDString = showState.show._id.toString();
    // let audioPath = AudioUtils.DocumentDirectoryPath + '/ComComp/showAudio_' + showDateString + '_' + showIDString + '.aac';

    return (
      <View style={{ flex: 1 }}>
        <View style={layoutStyles.statusBarBuffer} />
        <SoundBoard />
        <SetListViewer />
      </View>
    );
  }
}

export default connect(state => ({

  }),
  (dispatch) => ({

  })
)(ShowDashboard);
