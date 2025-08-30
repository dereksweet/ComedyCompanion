'use strict';

import React from 'react';
import { TouchableOpacity, View } from 'react-native';

export default function Hamburger({ onPress, color, style }) {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <View style={{ width: 24, height: 2, backgroundColor: color || '#000', marginVertical: 2 }} />
      <View style={{ width: 24, height: 2, backgroundColor: color || '#000', marginVertical: 2 }} />
      <View style={{ width: 24, height: 2, backgroundColor: color || '#000', marginVertical: 2 }} />
    </TouchableOpacity>
  );
}


