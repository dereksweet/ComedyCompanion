'use strict';

import React, {Component} from 'react';
import { View, Text, TouchableHighlight, Linking, Image } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {Button} from 'react-native-ui-xg';

import * as routingActions from '../../actions/routingActions';

class About extends Component {
    constructor(props) {
      super(props);

      this.state = {

      };
    }

    render() {
      const { routingActions } = this.props;

      const close = () => {
        routingActions.toggleAbout();
      };

      return (
        <View style={[layoutStyles.modal, layoutStyles.centeredFlex]}>
          <View style={layoutStyles.statusBarBuffer} />
          <View style={layoutStyles.modalContent}>
            <View style={{ flex: 1, paddingLeft: 10, paddingRight: 10 }}>
              <View style={{ paddingTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                <Text>LOGO HERE</Text>
              </View>
              <View style={{ paddingTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ borderBottomWidth: 1 }}>
                  <Text style={{ fontWeight: 'bold' }}>The Comedy Companion v1.0</Text>
                </View>
              </View>
              <View style={{ paddingTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ textAlign: 'center' }}>
                  Thanks for downloading the premiere version of The Comedy Companion!
                  I really hope it's a big help to comedians around the world. Using this app you can manage
                  your Jokes, Set Lists, and Shows.
                </Text>
              </View>
              <View style={{ paddingTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ textAlign: 'center' }}>
                  Not only is the app entirely free, but all the code is open source and, if you can code in React Native,
                  you can help contribute and make it better! If you'd like to get involved click the following link:
                </Text>
              </View>
              <View style={{ paddingTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableHighlight onPress={ () => Linking.openURL('http://www.github.com/dereksweet/ComedyCompanion') }>
                  <Text style={{ textAlign: 'center', color: '#0000FF' }}>
                    www.github.com/dereksweet/ComedyCompanion
                  </Text>
                </TouchableHighlight>
              </View>
              <View style={{ paddingTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ textAlign: 'center' }}>
                  Oh, and by the way, have you signed up for Comediate yet? It's the best new way for people to find your comedy
                  and see your upcoming shows. It's also entirely free for fans and comics alike. Click the button below to join!
                </Text>
              </View>
              <View style={{ paddingTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableHighlight onPress={ () => Linking.openURL('http://www.comediate.com') }>
                  <Image style={{ width: 100, height: 100 }} source={ require('../../images/comediate.png') } />
                </TouchableHighlight>
              </View>
            </View>
            <View style={{ flexDirection: 'row', width: '100%', borderTopColor: '#999999', borderTopWidth: 1 }}>
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
)(About);
