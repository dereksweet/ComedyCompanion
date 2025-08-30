'use strict';

import AsyncStorage from '@react-native-async-storage/async-storage';

const prefix = 'iCloudShim:';

export default {
  async setItem(key, value) {
    return AsyncStorage.setItem(prefix + key, value);
  },
  async getItem(key) {
    return AsyncStorage.getItem(prefix + key);
  },
  async removeItem(key) {
    return AsyncStorage.removeItem(prefix + key);
  }
};


