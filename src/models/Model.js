import { AsyncStorage } from 'react-native';

export default class Model {
  static tableName() {
    return "MUST OVERWRITE TABLENAME";
  }

  async getNextID() {
    String.prototype.left = function(n) {
      return this.substring(0, n);
    };

    const allKeys = await AsyncStorage.getAllKeys();
    let max_id = 1;
    allKeys.forEach((key) => {
      let splitKey = key.split('/');
      if (splitKey[0] === '@CCDB:' + this.constructor.tableName()) {
        const key_id = parseInt(splitKey[1]);
        if (key_id >= max_id) {
          max_id = key_id + 1;
        }
      }
    });

    return max_id;
  }

  async destroy() {
    console.log('destroying');

    try {
      await AsyncStorage.removeItem('@CCDB:' + this.constructor.tableName() + '/' + this._id.toString());
    } catch (error) {
      console.log("Error destroying " + this._id.toString());
    }
  }

  async save() {
    console.log('saving');

    if (this._id == -1) {
      this._id = await this.getNextID();
    }

    try {
      await AsyncStorage.setItem('@CCDB:' + this.constructor.tableName() + '/' + this._id.toString(), JSON.stringify(this));
    } catch (error) {
      console.log("There was an error saving: ", this);
    }
  }
}

Model.get = async function(id) {
  try {
    const value = await AsyncStorage.getItem('@CCDB:' + this.tableName() + '/' + id.toString());
    if (value !== null){
      let data = JSON.parse(value);
      return new this.prototype.constructor(data);
    } else {
      throw "404 retrieving " + id.toString();
    }
  } catch (error) {
    console.log(error);
  }
};

Model.all = async function() {
  try {
    let results = [];

    const allKeys = await AsyncStorage.getAllKeys();
    for (let i = 0; i < allKeys.length; i++) {
      let key = allKeys[i];
      let splitKey = key.split('/');
      if (splitKey[0] === '@CCDB:' + this.tableName()) {
        const key_id = parseInt(splitKey[1]);
        const joke = await this.get(key_id);
        results.push(joke);
      }
    }

    return results;
  } catch (error) {
    console.log(error);
  }
};

Model.destroy_all = async function() {
  all_items = await this.all();

  for (let i = 0; i < all_items.length; i++) {
    item = all_items[i];
    item.destroy();
  }
};
