'use strict';

import React, {Component} from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {Button} from 'react-native-ui-xg';

import { formatDisplayTime } from '../../helpers/formattingHelper';

import {normalizeWidth} from '../../helpers/sizeHelper';

import * as routingActions from '../../actions/routingActions';

class About extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const displayTimeChanged = this.props.showState.display_time_seconds !== nextProps.showState.display_time_seconds;

    return displayTimeChanged;
  }

  render() {
    const { showState, routingActions } = this.props;

    const close = () => {
      routingActions.toggleTimer();
    };

    return (
      <View style={[layoutStyles.modal, layoutStyles.centeredFlex]}>
        <View style={layoutStyles.statusBarBuffer} />
        <View style={layoutStyles.modalContent}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: normalizeWidth(75) }}>{ formatDisplayTime(showState.display_time_seconds) }</Text>
          </View>
          <View style={{ flexDirection: 'row', width: '100%', borderTopColor: '#999999', borderTopWidth: 1 }}>
            <View style={ { flex: 1 } }>
              <Button type="surface" size="large" theme="gray" selfStyle={ layoutStyles.cancelButton } onPress={ close }>
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
    showState: state.show
  }),
  (dispatch) => ({
    routingActions: bindActionCreators(routingActions, dispatch)
  })
)(About);
