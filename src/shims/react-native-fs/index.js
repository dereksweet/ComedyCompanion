'use strict';

const RNFS = {
  exists: async () => false,
  unlink: async () => {},
  stat: async () => ({ size: 0 }),
  getFSInfo: async () => ({}),
};

export default RNFS;
module.exports = RNFS;


