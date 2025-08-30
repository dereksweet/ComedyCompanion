'use strict';

import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

export const SegmentedControls = ({ options = [], selectedOption, onSelection, containerStyle, extractText, testOptionEqual }) => {
  const isEqual = testOptionEqual || ((selected, option) => selected === option.value);
  const getLabel = extractText || ((option) => option.label);
  return (
    <View style={[{ flexDirection: 'row' }, containerStyle]}>
      {options.map((opt, idx) => {
        const selected = isEqual(selectedOption, opt);
        return (
          <TouchableOpacity key={idx} onPress={() => onSelection && onSelection(opt)} style={{ padding: 8, borderWidth: 1, borderColor: selected ? '#000' : '#ccc', marginRight: 4 }}>
            <Text style={{ fontWeight: selected ? 'bold' : 'normal' }}>{getLabel(opt)}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default { SegmentedControls };


