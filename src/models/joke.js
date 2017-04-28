import Model from './Model';

export default class Joke extends Model {
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
    _in_development: false,
    _name: '',
    _notes: '',
    _rating: 0.0,
    _created_at: new Date(),
    _updated_at: new Date()
  })
  {
    super();

    this._id             = data._id;
    this._in_development = data._in_development;
    this._name           = data._name;
    this._notes          = data._notes;
    this._rating         = data._rating;
    this._created_at     = data._created_at;
    this._updated_at     = data._updated_at;
  }
}
