'use strict';

import React from 'react';
import { FlatList, View } from 'react-native';

class DataSource {
  constructor() {}
  cloneWithRows(rows) {
    return { _data: Array.isArray(rows) ? rows : [] };
  }
}

export default function ListView({ dataSource, renderRow, renderSeparator, style }) {
  const data = (dataSource && dataSource._data) || [];
  return (
    <FlatList
      style={style}
      data={data}
      keyExtractor={(_, idx) => String(idx)}
      renderItem={({ item, index }) => renderRow && renderRow(item, null, index)}
      ItemSeparatorComponent={() => (renderSeparator ? renderSeparator('s', 'r') : <View />)}
    />
  );
}

ListView.DataSource = DataSource;

export { DataSource };


