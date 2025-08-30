'use strict';

export const AudioRecorder = {
  onProgress: () => {},
  onFinished: () => {},
  prepareRecordingAtPath: () => {},
  async startRecording() {},
  async stopRecording() { return ''; },
  async pauseRecording() { return ''; },
};

export const AudioUtils = {
  DocumentDirectoryPath: ''
};


