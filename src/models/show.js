import SweetModel from 'react-native-sweet-record';

import SetList from './set_list';

import AudioService from '../services/AudioService';

import uuidV4 from 'uuid/v4';

const defaults = {
  _uuid: uuidV4(),
  _venue: '',
  _date: new Date(),
  _city: '',
  _state: '',
  _set_list: new SetList(),
  _show_time_seconds: 0,
  _has_recording: false
};

export default class Show extends SweetModel {
  static databaseName() {
    return "CCDB";
  }

  static tableName() {
    return "shows";
  }

  static dateFields() {
    return ['_date', '_created_at', '_updated_at'];
  }

  static modelFields() {
    return [{field: '_set_list', class: SetList, array: false}];
  }

  constructor(data = {
    _id: -1,
    _uuid: defaults._uuid,
    _venue: defaults._venue,
    _date: defaults._date,
    _city: defaults._city,
    _state: defaults._state,
    _set_list: defaults._set_list,
    _show_time_seconds: defaults._show_time_seconds,
    _has_recording: defaults._has_recording,
    _created_at: new Date(),
    _updated_at: new Date()
  })
  {
    super();

    this._id                = data._id;
    this._uuid              = data._uuid || defaults._uuid;
    this._venue             = data._venue || defaults._venue;
    this._date              = data._date || defaults._date;
    this._city              = data._city || defaults._city;
    this._state             = data._state || defaults._state;
    this._set_list          = new SetList(data._set_list || defaults._set_list);
    this._show_time_seconds = data._show_time_seconds || defaults._show_time_seconds;
    this._has_recording     = data._has_recording || defaults._has_recording;
    this._created_at        = data._created_at;
    this._updated_at        = data._updated_at;
  }

  destroy() {
    if (this._has_recording) {
      let audio_service = new AudioService({show_id: this._id});
      audio_service.deleteAudioFile();
    }

    super.destroy();
  }
}
