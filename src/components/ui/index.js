'use strict';

import React from 'react';
import { TouchableOpacity, Text, View, Platform } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';

export const Button = ({ children, onPress, selfStyle }) => (
  <TouchableOpacity onPress={onPress} style={selfStyle} activeOpacity={0.7}>
    {typeof children === 'string' ? <Text>{children}</Text> : children}
  </TouchableOpacity>
);

export const DatePicker = ({ date, onDateChange, style }) => {
  const current = date ? new Date(date) : new Date();
  return (
    <View style={style}>
      <RNDateTimePicker
        value={current}
        mode="date"
        display={Platform.OS === 'ios' ? 'inline' : 'default'}
        onChange={(event, selectedDate) => {
          if (selectedDate && onDateChange) {
            const yyyy = selectedDate.getFullYear();
            const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
            const dd = String(selectedDate.getDate()).padStart(2, '0');
            onDateChange(`${yyyy}-${mm}-${dd}`);
          }
        }}
      />
    </View>
  );
};

export default { Button, DatePicker };


