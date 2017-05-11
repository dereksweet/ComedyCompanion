import Model from './Model';
import SetList from './set_list';

export default class Show extends Model {
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
    return [{ field: '_set_list', class: SetList, array: false}];
  }

  constructor(data = {
    _id: -1,
    _venue: '',
    _date: new Date(),
    _city: '',
    _state: '',
    _set_list: new SetList(),
    _created_at: new Date(),
    _updated_at: new Date()
  })
  {
    super();

    this._id             = data._id;
    this._venue          = data._venue;
    this._date           = data._date;
    this._city           = data._city;
    this._state          = data._state;
    this._set_list       = new SetList(data._set_list);
    this._created_at     = data._created_at;
    this._updated_at     = data._updated_at;
  }
}
