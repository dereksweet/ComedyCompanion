import Model from './Model';

export default class Setting extends Model {
  static databaseName() {
    return "CCDB";
  }

  static tableName() {
    return "settings";
  }

  constructor(data = {
    _id: -1,
    _jokes_sort_field: '_updated_at',
    _jokes_sort_order: 'DESC',
    _set_lists_sort_field: '_updated_at',
    _set_lists_sort_order: 'DESC',
    _shows_sort_field: '_date',
    _shows_sort_order: 'DESC'
  })
  {
    super();

    this._id                   = data._id;
    this._jokes_sort_field     = data._jokes_sort_field;
    this._jokes_sort_order     = data._jokes_sort_order;
    this._set_lists_sort_field = data._set_lists_sort_field;
    this._set_lists_sort_order = data._set_lists_sort_order;
    this._shows_sort_field     = data._shows_sort_field;
    this._shows_sort_order     = data._shows_sort_order;
  }
}
