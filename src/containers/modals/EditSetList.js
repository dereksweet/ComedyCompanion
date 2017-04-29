'use strict';

import React, {Component} from 'react';
import { View, Text, TouchableHighlight, Platform, Keyboard } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {Button} from 'react-native-ui-xg';

import JokeSelector from './EditSetList/JokeSelector';

import * as routingActions from '../../actions/routingActions';

import layoutStyles from '../../stylesheets/layoutStyles';

class EditSetList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal_height: 0,
      keyboard_height: 0
    }
  }

  componentWillMount () {
    var eventVerb = Platform.OS === 'ios'? 'Will' : 'Did';

    this.keyboardDidShowListener = Keyboard.addListener('keyboard' + eventVerb + 'Show', this.keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboard' + eventVerb + 'Hide', this.keyboardDidHide.bind(this));
  }

  keyboardDidShow (e) {
    this.setState({
      keyboard_height: e.endCoordinates.height
    });
  }

  keyboardDidHide (e) {
    this.setState({
      keyboard_height: 0
    });
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  measureModalView(event) {
    this.setState({
      modal_height: event.nativeEvent.layout.height
    });
  }

  contentHeight() {
    return this.state.modal_height - (Platform.OS === 'ios'? this.state.keyboard_height : 0);
  }

  render() {
    const { routingActions } = this.props;

    const cancel = () => {
      routingActions.closeModal();
    };

    return (
      <View style={layoutStyles.centeredFlex}>
        <View style={layoutStyles.statusBarBuffer} />
        <View style={layoutStyles.modalContent} onLayout={(event) => this.measureModalView(event)}>
          <View style={{ height: this.contentHeight() }}>
            <View style={{ flex: 1, flexDirection: 'row', borderTopColor: '#CCCCCC', borderTopWidth: 1 }}>
              <View style={{ flex: 1, borderRightColor: '#CCCCCC', borderRightWidth: 1 }}>
                <JokeSelector />
              </View>
              <View style={{ flex: 1 }}>

              </View>
            </View>
            <View style={ { flexDirection: 'row', width: '100%' }}>
              <View style={ { flex: 1 } }>
                <Button type="surface" size="large" theme="gray" onPress={ cancel }>
                  <Text style={layoutStyles.buttonText}>Cancel</Text>
                </Button>
              </View>
              <View style={ { flex: 1 } }>
                <Button type="surface" size="large" theme="blue" onPress={ cancel }>
                  <Text style={layoutStyles.buttonText}>Save</Text>
                </Button>
              </View>
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
)(EditSetList);
