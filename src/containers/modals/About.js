'use strict';

import React, {Component} from 'react';
import { View, Text, ScrollView, TouchableHighlight, Linking, Image } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {Button} from 'react-native-ui-xg';

import * as routingActions from '../../actions/routingActions';

import {bulletIcon} from '../../helpers/icons';

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
            <ScrollView>
              <View style={{ flex: 1, paddingLeft: 10, paddingRight: 10 }}>
                <View style={{ paddingTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                  <Image style={{ width: 100, height: 110, marginTop: 15 }} source={ require('../../images/FullMascot.png') } />
                </View>
                <View style={{ paddingTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ borderBottomWidth: 1 }}>
                    <Text style={{ fontWeight: 'bold' }}>The Comedy Companion v1.1</Text>
                  </View>
                </View>
                <View style={{ paddingTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ textAlign: 'center' }}>
                    Wow, the interest in the app since it launched has been
                    just amazing. More than 500 comics have already downloaded the app, and a big thanks to
                    everyone who wrote me with feedback and feature requests. I decided a few emergency features
                    had to be released immediately due to your feedback, here they are:
                  </Text>
                </View>
                <View style={{ paddingTop: 10, justifyContent: 'flex-start', alignItems: 'flex-start', padding: 20 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ paddingTop: 9 }}>{bulletIcon}</Text>
                    <Text style={{ textAlign: 'left', fontWeight: 'bold', marginTop: 5, marginLeft: 5 }}>
                      You can now duplicate Set Lists
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ paddingTop: 9 }}>{bulletIcon}</Text>
                    <Text style={{ textAlign: 'left', fontWeight: 'bold', marginTop: 5, marginLeft: 5 }}>
                      Android users should ALL be able to put carriage returns in their joke notes
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ paddingTop: 9 }}>{bulletIcon}</Text>
                    <Text style={{ textAlign: 'left', fontWeight: 'bold', marginTop: 5, marginLeft: 5 }}>
                      Tap anywhere outside of a text input to dismiss the keyboard
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ paddingTop: 9 }}>{bulletIcon}</Text>
                    <Text style={{ textAlign: 'left', fontWeight: 'bold', marginTop: 5, marginLeft: 5 }}>
                      You will be asked to confirm if you have made changes to something and want to cancel
                    </Text>
                  </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ textAlign: 'center' }}>
                    Search for "<Text style={{ fontWeight: 'bold' }}>The Comedy Companion</Text>" on Facebook to stay aprised of all updates and
                    to make any requests.
                  </Text>
                </View>
                <View style={{ paddingTop: 15, justifyContent: 'center', alignItems: 'center' }}>
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
                    and see your upcoming shows. It's also entirely free for fans and comics alike. Click the link below to join!
                  </Text>
                </View>
                <View style={{ paddingTop: 10, paddingBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableHighlight onPress={ () => Linking.openURL('http://www.comediate.com') }>
                    <Text style={{ textAlign: 'center', color: '#0000FF' }}>
                      www.comediate.com
                    </Text>
                  </TouchableHighlight>
                </View>
              </View>
            </ScrollView>
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

  }),
  (dispatch) => ({
    routingActions: bindActionCreators(routingActions, dispatch)
  })
)(About);
