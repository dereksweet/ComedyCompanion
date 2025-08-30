const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const shim = (p) => path.resolve(__dirname, 'src', 'shims', p);

const config = {
  transformer: {
    unstable_allowRequireContext: true,
  },
  resolver: {
    extraNodeModules: {
      'react-native-ui-xg': shim('react-native-ui-xg.js'),
      'react-native-material-design-searchbar': shim('react-native-material-design-searchbar.js'),
      'react-native-radio-buttons': shim('react-native-radio-buttons.js'),
      'react-native-hamburger': shim('react-native-hamburger.js'),
      'react-native-sortable-listview': shim('react-native-sortable-listview/index.js'),
      'react-native-icloudstore': shim('react-native-icloudstore.js'),
      'react-native-keep-awake': shim('react-native-keep-awake.js'),
      'react-native-audio': shim('react-native-audio.js'),
      'react-native-sound': shim('react-native-sound.js'),
      'react-native-swipeout': shim('react-native-swipeout.js'),
      'react-native-fs': shim('react-native-fs.js'),
      'react-native-mail': shim('react-native-mail.js'),
      'uuid/v4': shim('uuid_v4.js'),
      ListView: shim('ListView.js'),
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
