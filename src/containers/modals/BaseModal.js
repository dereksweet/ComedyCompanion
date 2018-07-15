import React, {Component} from 'react';
import {View, TouchableWithoutFeedback, Keyboard, Platform} from 'react-native';

import ShakingView from '../../components/ShakingView';

import layoutStyles from "../../stylesheets/layoutStyles";

export default class BaseModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal_height: 0,
      keyboard_height: 0
    };
  }

  componentWillMount () {
    let eventVerb = Platform.OS === 'ios'? 'Will' : 'Did';

    this.keyboardDidShowListener = Keyboard.addListener('keyboard' + eventVerb + 'Show', this.keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboard' + eventVerb + 'Hide', this.keyboardDidHide.bind(this));
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
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

  measureModalView(event) {
    this.setState({
      modal_height: event.nativeEvent.layout.height
    });
  }

  contentHeight() {
    return this.state.modal_height - (Platform.OS === 'ios'? this.state.keyboard_height : 0);
  }

  performShake() {
    this.shakingView.performShake();
  }

  render() {
    return (
      <ShakingView ref={(shakingView) => this.shakingView = shakingView}
                   style={[layoutStyles.modal, layoutStyles.centeredFlex]}>
        <View style={layoutStyles.statusBarBuffer}/>
        <View style={layoutStyles.modalContent} onLayout={(event) => this.measureModalView(event)}>
          {
            this.props.scrollable ?
              <View style={{height: this.contentHeight()}}>
                {this.props.children}
              </View>
              :
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{height: this.contentHeight()}}>
                  {this.props.children}
                </View>
              </TouchableWithoutFeedback>
          }
        </View>
      </ShakingView>
    );
  }
}
