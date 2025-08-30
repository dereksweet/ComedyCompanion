'use strict';

import React from 'react';
import { TextInput, View } from 'react-native';

export default function SearchBar({ onSearchChange, style, height, ...rest }) {
  return (
    <View style={[{ height: height || 40 }, style]}>
      <TextInput
        onChangeText={(t) => onSearchChange && onSearchChange(t)}
        autoCorrect={false}
        {...rest}
      />
    </View>
  );
}


