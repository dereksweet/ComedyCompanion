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
                    <Text style={{ fontWeight: 'bold' }}>The Comedy Companion v1.2</Text>
                  </View>
                </View>
                <View style={{ paddingTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ textAlign: 'center' }}>
                    Hey! What's up? Just your friendly neighborhood spiderman, bringing you
                    version 1.2 of The Comedy Companion! The biggest new feature is for sure the
                    Show Dashboard that will allow you to time or record the audio of your shows.
                    Here are all the new features:
                  </Text>
                </View>
                <View style={{ paddingTop: 10, justifyContent: 'flex-start', alignItems: 'flex-start', padding: 20 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ paddingTop: 9 }}>{bulletIcon}</Text>
                    <Text style={{ textAlign: 'left', fontWeight: 'bold', marginTop: 5, marginLeft: 5 }}>
                      SHOW DASHBOARD! You can now time and record the audio of your shows.
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ paddingTop: 9 }}>{bulletIcon}</Text>
                    <Text style={{ textAlign: 'left', fontWeight: 'bold', marginTop: 5, marginLeft: 5 }}>
                      Tap the timer to enlarge it to full screen, tap it on full screen mode to toggle between
                      portrait and landscape orientation.
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ paddingTop: 9 }}>{bulletIcon}</Text>
                    <Text style={{ textAlign: 'left', fontWeight: 'bold', marginTop: 5, marginLeft: 5 }}>
                      Shows with a recording will have a red record badge on the Show List
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ paddingTop: 9 }}>{bulletIcon}</Text>
                    <Text style={{ textAlign: 'left', fontWeight: 'bold', marginTop: 5, marginLeft: 5 }}>
                      Joke notes larger than one page will now allow you to scroll without bringing up the
                      keyboard each time.
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ paddingTop: 9 }}>{bulletIcon}</Text>
                    <Text style={{ textAlign: 'left', fontWeight: 'bold', marginTop: 5, marginLeft: 5 }}>
                      Basic validation will prevent you from creating jokes and set lists with no name, and
                      shows with no venue.
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
