'use strict';

import React from 'react';
import { TouchableOpacity, Text, View, TextInput, Platform } from 'react-native';

export const Button = ({ children, onPress, selfStyle }) => (
  <TouchableOpacity onPress={onPress} style={selfStyle} activeOpacity={0.7}>
    {typeof children === 'string' ? <Text>{children}</Text> : children}
  </TouchableOpacity>
);

export const DatePicker = ({ value, onChange, style }) => (
  <View style={style}>
    <TextInput value={value} onChangeText={(t) => onChange && onChange(t)} />
  </View>
);

export default { Button, DatePicker };


