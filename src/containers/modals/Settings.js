'use strict';

import React, {Component} from 'react';
import { View, Text } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {Button} from 'react-native-ui-xg';

import * as routingActions from '../../actions/routingActions';

import layoutStyles from '../../stylesheets/layoutStyles';

class Settings extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { routingActions } = this.props;

    const close = () => {
      routingActions.toggleSettings();
    };

    return (
      <View style={[layoutStyles.modal, layoutStyles.centeredFlex]}>
        <View style={layoutStyles.statusBarBuffer} />
        <View style={layoutStyles.modalContent}>
          <View style={{ flex: 1 }}>
            <Text>Settings</Text>
          </View>
          <View style={ { flexDirection: 'row', width: '100%' }}>
            <View style={ { flex: 1 } }>
              <Button type="surface" size="large" theme="gray" onPress={ close }>
                <Text style={layoutStyles.buttonText}>Close</Text>
              </Button>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default connect(state => ({

  }),
  (dispatch) => ({
    routingActions: bindActionCreators(routingActions, dispatch)
  })
)(Settings);
