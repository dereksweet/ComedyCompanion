import SweetModel from 'react-native-sweet-record';

import Joke from './joke';

import uuidV4 from 'uuid/v4';

const defaults = {
  _uuid: uuidV4(),
  _name: '',
  _length: 0,
  _jokes: []
};


export default class SetList extends SweetModel {
  static databaseName() {
    return "CCDB";
  }

  static tableName() {
    return "set_lists";
  }

  static dateFields() {
    return ['_created_at', '_updated_at'];
  }

  static modelFields() {
    return [{field: '_jokes', class: Joke, array: true}];
  }

  containsJoke(joke) {
    for (let i = 0; i < this._jokes.length; i++) {
      if (this._jokes[i]._id === joke._id) {
        return true;
      }
    }

    return false;
  }

  setListLength() {
    let totalSeconds = 0;

    for (let i = 0; i < this._jokes.length; i++) {
      const joke = this._jokes[i];

      totalSeconds += ((joke._minutes || 0) * 60) + (joke._seconds || 0);
    }

    return (totalSeconds / 60).toFixed(0).toString();
  }

  constructor(data = {
    _id: -1,
    _uuid: defaults._uuid,
    _name: defaults._name,
    _length: defaults._length,
    _jokes: defaults._jokes,
    _created_at: new Date(),
    _updated_at: new Date()
  })
  {
    super();

    this._id             = data._id;
    this._uuid           = data._uuid || defaults._uuid;
    this._name           = data._name || defaults._name;
    this._length         = data._length || defaults._length;
    this._jokes          = data._jokes ? data._jokes.map((joke) => new Joke(joke)) : defaults._jokes;
    this._created_at     = data._created_at;
    this._updated_at     = data._updated_at;
  }
}
