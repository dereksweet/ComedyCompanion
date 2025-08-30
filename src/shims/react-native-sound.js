'use strict';

export default class Sound {
  constructor(path, basePath, callback) {
    if (callback) callback();
  }
  play(callback) { if (callback) callback(true); }
  pause() {}
  setCurrentTime() {}
}


