import SweetModel from 'react-native-sweet-record';

const defaults = {
  _jokes_sort_field: '_updated_at',
  _jokes_sort_order: 'DESC',
  _set_lists_sort_field: '_updated_at',
  _set_lists_sort_order: 'DESC',
  _shows_sort_field: '_date',
  _shows_sort_order: 'DESC',
  _about_version_seen: 0.0
};

export default class Setting extends SweetModel {
  static databaseName() {
    return "CCDB";
  }

  static tableName() {
    return "settings";
  }

  constructor(data = {
    _id: -1,
    _jokes_sort_field: defaults._jokes_sort_field,
    _jokes_sort_order: defaults._jokes_sort_order,
    _set_lists_sort_field: defaults._set_lists_sort_field,
    _set_lists_sort_order: defaults._set_lists_sort_order,
    _shows_sort_field: defaults._shows_sort_field,
    _shows_sort_order: defaults._shows_sort_order,
    _about_version_seen: defaults._about_version_seen
  })
  {
    super();

    this._id                   = data._id;
    this._jokes_sort_field     = data._jokes_sort_field || defaults._jokes_sort_field;
    this._jokes_sort_order     = data._jokes_sort_order || defaults._jokes_sort_order;
    this._set_lists_sort_field = data._set_lists_sort_field || defaults._set_lists_sort_field;
    this._set_lists_sort_order = data._set_lists_sort_order || defaults._set_lists_sort_order;
    this._shows_sort_field     = data._shows_sort_field || defaults._shows_sort_field;
    this._shows_sort_order     = data._shows_sort_order || defaults._shows_sort_order;
    this._about_version_seen   = data._about_version_seen || defaults._about_version_seen;
  }
}
