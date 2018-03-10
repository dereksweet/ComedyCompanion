import SweetModel from 'react-native-sweet-record';

import uuidV4 from 'uuid/v4';

const defaults = {
  _uuid: uuidV4(),
  _in_development: false,
  _name: '',
  _notes: '',
  _rating: 0.0,
  _minutes: null,
  _seconds: null
};

export default class Joke extends SweetModel {
  static databaseName() {
    return "CCDB";
  }

  static tableName() {
    return "jokes";
  }

  static dateFields() {
    return ['_created_at', '_updated_at'];
  }

  constructor(data = {
    _id: -1,
    _uuid: defaults._uuid,
    _in_development: defaults._in_development,
    _name: defaults._name,
    _notes: defaults._notes,
    _rating: defaults._rating,
    _minutes: defaults._minutes,
    _seconds: defaults._seconds,
    _created_at: new Date(),
    _updated_at: new Date()
  })
  {
    super();

    this._id             = data._id;
    this._uuid           = data._uuid || defaults._uuid;
    this._in_development = data._in_development || defaults._in_development;
    this._name           = data._name || defaults._name;
    this._notes          = data._notes || defaults._notes;
    this._rating         = data._rating || defaults._rating;
    this._minutes        = data._minutes || defaults._minutes;
    this._seconds        = data._seconds || defaults._seconds;
    this._created_at     = data._created_at;
    this._updated_at     = data._updated_at;
  }
}
