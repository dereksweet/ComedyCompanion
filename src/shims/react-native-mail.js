'use strict';

export default {
  mail: (options, callback) => {
    // No-op shim; pretend success
    if (callback) callback(null, 'sent');
  },
};


