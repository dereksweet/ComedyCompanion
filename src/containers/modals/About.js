'use strict';

import React, {Component} from 'react';
import { View, Text, ScrollView, TouchableHighlight, Linking, Image } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {Button} from 'react-native-buttons';

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
                    <Text style={{ fontWeight: 'bold' }}>The Comedy Companion v1.3</Text>
                  </View>
                </View>
                <View style={{ paddingTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ textAlign: 'center' }}>
                    Woah, it feels like a lifetime since I put out an update for this app. See,
                    this game called "Destiny 2" came out and I've been holed up like a fucking
                    hermit at night giving away hours of my life to watch an objectively
                    meaningless number slowly climb closer to 300 rather than bring you updates.
                    I'm not proud of it, but it's the truth. I will chastise myself with 100
                    lashes nightly in repentance. Here are the new features for version 1.3 of
                    The Comedy Companion:
                  </Text>
                </View>
                <View style={{ paddingTop: 10, justifyContent: 'flex-start', alignItems: 'flex-start', padding: 20 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ paddingTop: 9 }}>{bulletIcon}</Text>
                    <Text style={{ textAlign: 'left', fontWeight: 'bold', marginTop: 5, marginLeft: 5 }}>
                      Export Menu! The iCloud backup feature for iOS users has been moved, and a new email
                      export feature for ALL users has been added, to a new top nav section. Look for it
                      in the top right of the app.
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ paddingTop: 9 }}>{bulletIcon}</Text>
                    <Text style={{ textAlign: 'left', fontWeight: 'bold', marginTop: 5, marginLeft: 5 }}>
                      Email Export! You can now export your jokes and set lists at the touch of a button,
                      using your own phone's email capabilities, to any email address you like.
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ paddingTop: 9 }}>{bulletIcon}</Text>
                    <Text style={{ textAlign: 'left', fontWeight: 'bold', marginTop: 5, marginLeft: 5 }}>
                      HTML Formatted emails and Plain Text formatted emails are both supported.
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ paddingTop: 9 }}>{bulletIcon}</Text>
                    <Text style={{ textAlign: 'left', fontWeight: 'bold', marginTop: 5, marginLeft: 5 }}>
                      NOTE: Some Android users may not see anything but weird spacing for the formatted
                      emails. If you experience problems please let me know on the Facebook group.
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
                <View style={{ paddingTop: 10, paddingBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ textAlign: 'center', color: '#FF0000' }}>
                    Disclaimer: By using this application you are taking full responsibility for the integrity of
                    the information stored on your device. None of the contributors to the development of The Comedy
                    Companion are responsible for any loss of data that may occur.
                  </Text>
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
