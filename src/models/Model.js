import { AsyncStorage } from 'react-native';

export default class Model {
  static databaseName() {
    return "MUST OVERWRITE DBNAME";
  }

  static tableName() {
    return "MUST OVERWRITE TABLENAME";
  }

  static dateFields() {
    return [];
  }

  static modelFields() {
    return [];
  }

  async getNextID() {
    String.prototype.left = function(n) {
      return this.substring(0, n);
    };

    const allKeys = await AsyncStorage.getAllKeys();
    let max_id = 1;
    allKeys.forEach((key) => {
      let splitKey = key.split('/');
      if (splitKey[0] === '@' + this.constructor.databaseName() + ':' + this.constructor.tableName()) {
        const key_id = parseInt(splitKey[1]);
        if (key_id >= max_id) {
          max_id = key_id + 1;
        }
      }
    });

    return max_id;
  }

  async destroy() {
    try {
      await AsyncStorage.removeItem('@' + this.constructor.databaseName() + ':' + this.constructor.tableName() + '/' + this._id.toString());
    } catch (error) {
      console.log("Error destroying " + this._id.toString());
    }
  }

  async save(callback = null) {
    if (this._id == -1) {
      this._id = await this.getNextID();
    }

    this._updated_at = new Date();

    try {
      AsyncStorage.setItem(
        '@' + this.constructor.databaseName() + ':' + this.constructor.tableName() + '/' + this._id.toString(),
        JSON.stringify(this),
        callback
      );
    } catch (error) {
      reject(error);
    }
  }
}

Model.get = async function(id) {
  const value = await AsyncStorage.getItem('@' + this.databaseName() + ':' + this.tableName() + '/' + id.toString());
  if (value !== null){
    let data = JSON.parse(value);
    this.dateFields().forEach((dateField) => {
      if (data[dateField]) {
        data[dateField] = new Date(data[dateField]);
      }
    });
    for (let i = 0; i < this.modelFields().length; i++) {
      const modelField = this.modelFields()[i];
      if (modelField.array) {
        for (let j = 0; j < data[modelField.field].length; j++) {
          const model = await modelField.class.get(data[modelField.field][j]._id);
          if (model) {
            data[modelField.field][j] = model;
          } else {
            data[modelField.field].splice(j, 1);
          }
        }
      } else {
        const model = await modelField.class.get(data[modelField.field]._id);
        data[modelField.field] = model ? model : new modelField.class();
      }
    }
    let returnObject = new this.prototype.constructor(data);
    returnObject.save();

    return returnObject;
  }
};

Model.all = async function(sort_field = '_id', sort_order = 'ASC') {
  try {
    let results = [];

    const allKeys = await AsyncStorage.getAllKeys();
    for (let i = 0; i < allKeys.length; i++) {
      let key = allKeys[i];
      let splitKey = key.split('/');
      if (splitKey[0] === '@' + this.databaseName() + ':' + this.tableName()) {
        const key_id = parseInt(splitKey[1]);
        const joke = await this.get(key_id);
        results.push(joke);
      }
    }

    return results.sort((a,b) => {
      if (a[sort_field] < b[sort_field])
        return sort_order.toUpperCase() == 'ASC' ? -1 : 1;
      if (b[sort_field] < a[sort_field])
        return sort_order.toUpperCase() == 'ASC' ? 1 : -1;

      return 0;
    } );
  } catch (error) {
    console.log(error);
  }
};

Model.where = async function(filter_hash, operation = 'AND', sort_field = '_id', sort_order= 'ASC') {
  try {
    let myOperation = operation.toUpperCase();
    let results = [];
    let keys = Object.keys(filter_hash);

    let all_items = await this.all();

    for (let i = 0; i < all_items.length; i++) {
      let item = all_items[i];

      if (results.indexOf(item) == -1) {
        let add_item = -1;

        for (let j = 0; j < keys.length; j++) {
          let key = keys[j];
          let filter = filter_hash[key];
          let comparator = filter.split('|')[0];
          let value = eval(filter.split('|')[1]);

          let match = false;

          switch (comparator.toUpperCase()) {
            case 'EQ':
              match = (item[key] == value);
              break;
            case 'GT':
              match = (item[key] > value);
              break;
            case 'GTE':
              match = (item[key] >= value);
              break;
            case 'LT':
              match = (item[key] < value);
              break;
            case 'LTE':
              match = (item[key] <= value);
              break;
            case 'LIKE':
              match = value !== '' ? (item[key].toLowerCase().indexOf(value.toLowerCase()) !== -1) : true;
              break;
          }

          if (match) {
            if ((myOperation == 'OR') || (add_item != 0)) {
              add_item = 1;
            }
          } else if (myOperation == 'AND') {
            add_item = 0;
          }
        }

        if (add_item == 1) {
          results.push(item);
        }
      }
    }

    return results.sort((a,b) => {
      if (a[sort_field] < b[sort_field])
        return sort_order.toUpperCase() == 'ASC' ? -1 : 1;
      if (b[sort_field] < a[sort_field])
        return sort_order.toUpperCase() == 'ASC' ? 1 : -1;

      return 0;
    } );
  } catch(error) {
    console.log(error);
  }
};

Model.destroy_all = async function(callback = null) {
  all_items = await this.all();

  for (let i = 0; i < all_items.length; i++) {
    item = all_items[i];
    await item.destroy();
  }

  if (callback) {
    callback();
  }
};
