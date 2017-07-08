'use strict';

import React, {Component} from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import Sound from 'react-native-sound';
import {AudioRecorder, AudioUtils} from 'react-native-audio';

export default class AudioRecorderService extends Component {
  constructor(props) {
    super(props);

    this.state = {
      audio_path: AudioUtils.DocumentDirectoryPath + '/ComComp/showAudio_' + props.show_id + '.aac',
      currentTime: 0.0,
      recording: false,
      stoppedRecording: true,
      finished: false,
      hasPermission: undefined
    };

    this.checkPermission().then((hasPermission) => {
      this.state.hasPermission = hasPermission;

      if (!hasPermission) return;

      this.prepareRecordingPath(this.state.audio_path);

      AudioRecorder.onProgress = (data) => {
        console.log(data.currentTime);
        this.state.currentTime = Math.floor(data.currentTime);
      };

      AudioRecorder.onFinished = (data) => {
        // Android callback comes in the form of a promise instead.
        if (Platform.OS === 'ios') {
          this.finishRecording(data.status === "OK", data.audioFileURL);
        }
      };
    });
  }

  componentDidMount() {
    console.log('mounted boyee');
  }

  prepareRecordingPath(){
    AudioRecorder.prepareRecordingAtPath(this.state.audio_path, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: "Low",
      AudioEncoding: "aac",
      AudioEncodingBitRate: 32000
    });
  }

  checkPermission() {
    if (Platform.OS !== 'android') {
      return Promise.resolve(true);
    }

    const rationale = {
      'title': 'Microphone Permission',
      'message': 'This application uses the microphone to record your shows for later playback'
    };

    return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, rationale)
      .then((result) => {
        return (result === true || result === PermissionsAndroid.RESULTS.GRANTED);
      });
  }

  async pause() {
    if (!this.state.recording) {
      return;
    }

    this.state.stoppedRecording = true;
    this.state.recording = false;

    try {
      const filePath = await AudioRecorder.pauseRecording();

      // Pause is currently equivalent to stop on Android.
      if (Platform.OS === 'android') {
        this.finishRecording(true, filePath);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async stop() {
    if (!this.state.recording) {
      console.warn('Can\'t stop, not recording!');
      return;
    }

    this.state.stoppedRecording = true;
    this.state.recording = false;

    try {
      const filePath = await AudioRecorder.stopRecording();

      if (Platform.OS === 'android') {
        this.finishRecording(true, filePath);
      }
      return filePath;
    } catch (error) {
      console.error(error);
    }
  }

  async play() {
    if (this.state.recording) {
      await this.stop();
    }

    // These timeouts are a hacky workaround for some issues with react-native-sound.
    // See https://github.com/zmxv/react-native-sound/issues/89.
    setTimeout(() => {
      var sound = new Sound(this.state.audio_path, '', (error) => {
        if (error) {
          console.log('failed to load the sound', error);
        }
      });

      setTimeout(() => {
        sound.play((success) => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
      }, 100);
    }, 100);
  }

  async record() {
    if (this.state.recording) {
      console.warn('Already recording!');
      return;
    }

    if (!this.state.hasPermission) {
      console.warn('Can\'t record, no permission granted!');
      return;
    }

    if(this.state.stoppedRecording){
      console.log('preparing path');
      this.prepareRecordingPath(this.state.audioPath);
    }

    this.state.recording = true;

    try {
      console.log('start Recording');
      const filePath = await AudioRecorder.startRecording();
      console.log('recording started');
    } catch (error) {
      console.error(error);
    }
  }

  finishRecording(didSucceed, filePath) {
    this.state.finished = didSucceed;
    console.log(`Finished recording of duration ${this.state.currentTime} seconds at path: ${filePath}`);
  }

  render() {
    return false;
  }
}
