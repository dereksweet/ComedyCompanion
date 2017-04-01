'use strict';

import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8ECC2'
  }
});

export default class Jokes extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { setVisiblePane } = this.props;
    return (
      <View style={styles.container}>
        <Text>Jokes</Text>
        <TouchableHighlight onPress={() => setVisiblePane('set_lists')}>
          <Text>Go To Set Lists</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
