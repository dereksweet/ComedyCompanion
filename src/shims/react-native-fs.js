'use strict';

export default {
  exists: async () => false,
  unlink: async () => {},
  stat: async () => ({ size: 0 }),
  getFSInfo: async () => ({}),
};


