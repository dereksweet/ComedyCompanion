import React, {Component} from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import BaseModal from './BaseModal';

import * as routingActions from '../../actions/routingActions';

import FooterButton from '../../components/FooterButton';

import {formatDisplayTime} from '../../helpers/formattingHelper';
import {normalizeWidth} from '../../helpers/sizeHelper';

import layoutStyles from "../../stylesheets/layoutStyles";

class About extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orientation: 'v'
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const orientationChanged = this.state.orientation !== nextState.orientation;
    const displayTimeChanged = this.props.showState.display_time_seconds !== nextProps.showState.display_time_seconds;

    return orientationChanged || displayTimeChanged;
  }

  toggleOrientation = () => {
    this.setState({orientation: this.state.orientation === 'v' ? 'h' : 'v'});
  };

  close = () => {
    const {routingActions} = this.props;

    routingActions.toggleTimer();
  };

  render() {
    const {showState} = this.props;

    const horiz = this.state.orientation === 'v';

    return (
      <BaseModal>
        <View style={layoutStyles.centeredFlex}>
          <TouchableHighlight
            style={[layoutStyles.centeredFlex, {width: '100%'}]} underlayColor="rgba(0,0,0,0)"
            onPress={this.toggleOrientation}>
            <Text style={{fontSize: normalizeWidth(horiz ? 75 : 90), transform: [{rotate: horiz ? '0deg' : '90deg'}]}}>
              {formatDisplayTime(showState.display_time_seconds)}
            </Text>
          </TouchableHighlight>
        </View>
        <View style={layoutStyles.flexRowStretched}>
          <FooterButton
            onPress={this.close}
            buttonText="Close"
          />
        </View>
      </BaseModal>
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
