import Model from './Model';
import Joke from './joke';

import uuidV4 from 'uuid/v4';

export default class SetList extends Model {
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
    return [{ field: '_jokes', class: Joke, array: true}];
  }

  constructor(data = {
    _id: -1,
    _uuid: uuidV4(),
    _name: '',
    _length: 0,
    _jokes: [],
    _created_at: new Date(),
    _updated_at: new Date()
  })
  {
    super();

    this._id             = data._id;
    this._uuid           = data._uuid;
    this._name           = data._name;
    this._length         = data._length;
    this._jokes          = data._jokes.map((joke) => new Joke(joke));
    this._created_at     = data._created_at;
    this._updated_at     = data._updated_at;
  }
}
