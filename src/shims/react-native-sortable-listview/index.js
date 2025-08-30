'use strict';

import React from 'react';
import { FlatList } from 'react-native';

export default function SortableListView({ data, order, renderRow, style }) {
  const items = (order || Object.keys(data || {})).map((k) => data[k]);
  return (
    <FlatList
      style={style}
      data={items}
      keyExtractor={(_, idx) => String(idx)}
      renderItem={({ item, index }) => renderRow && renderRow(item, index)}
    />
  );
}


