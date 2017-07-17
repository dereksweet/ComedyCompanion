'use strict';

import React, {Component} from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import Sound from 'react-native-sound';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import RNFS from 'react-native-fs';

export default class AudioRecorderService extends Component {
  constructor(props) {
    super(props);

    this.state = {
      audio_path: AudioUtils.DocumentDirectoryPath + '/ComComp_showAudio_' + props.show_id + '.aac',
      currentTime: 0.0,
      recording: false,
      playing: false,
      stoppedRecording: true,
      finished: false,
      hasPermission: undefined,
      sound: null,
      fs_info: null
    };

    this.checkPermission().then((hasPermission) => {
      this.state.hasPermission = hasPermission;

      if (!hasPermission) return;

      RNFS.exists(this.state.audio_path).then((exists) => {
        if (exists) {
          this.state.sound = new Sound(this.state.audio_path, '', (error) => {
            if (error) {
              console.log('failed to load the sound', error);
            }
          });
        }
      });

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

  }

  prepareRecordingPath(){
    console.log('preparing Recording at path: ' + this.state.auto_path);

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

  async stop_recording() {
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

      this.state.sound = new Sound(this.state.audio_path, '', (error) => {
        if (error) {
          console.log('failed to load the sound', error);
        }
      });

      return filePath;
    } catch (error) {
      console.error(error);
    }
  }

  async pause() {
    this.state.sound.pause();
  }

  async play(onEnd) {
    if (this.state.recording) {
      await this.stop_recording();
    }

    // These timeouts are a hacky workaround for some issues with react-native-sound.
    // See https://github.com/zmxv/react-native-sound/issues/89.
    setTimeout(() => {
      console.log('Playing sound at location ' + this.state.audio_path);
      if (!this.state.sound) {
        this.state.sound = new Sound(this.state.audio_path, '', (error) => {
          if (error) {
            console.log('failed to load the sound', error);
          }
        });
      }

      setTimeout(() => {
        this.state.sound.play((success) => {
          if (success) {
            console.log('successfully finished playing');
            onEnd();
          } else {
            console.log('playback failed due to audio decoding errors');
            onEnd();
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
      await AudioRecorder.startRecording();
      console.log('recording started');
    } catch (error) {
      console.error(error);
    }
  }

  setCurrentTime(currentTime) {
    if (this.state.sound) {
      this.state.sound.setCurrentTime(currentTime);
    }
  }

  finishRecording(didSucceed, filePath) {
    this.state.finished = didSucceed;
    console.log(`Finished recording of duration ${this.state.currentTime} seconds at path: ${filePath}`);
  }

  deleteAudioFile() {

    RNFS.exists(this.state.audio_path)
      .then( (result) => {
        console.log("file exists: ", result);

        if(result){
          return RNFS.unlink(this.state.audio_path)
            .then(() => {
              console.log('FILE DELETED');
            })
            // `unlink` will throw an error, if the item to unlink does not exist
            .catch((err) => {
              console.log(err.message);
            });
        }

      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  updateFSInfo() {
    RNFS.getFSInfo()
      .then((fs_info) => {
        console.log("FSInfo: ", fs_info);
        this.state.fs_info = fs_info;
      });
  }

  audioFileSizeMb() {
    RNFS.exists(this.state.audio_path)
      .then( (result) => {
        console.log("file exists (filesize): ", result);

        if(result){

        }

      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  render() {
    return false;
  }
}
