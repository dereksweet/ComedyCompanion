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
                    <Text style={{ fontWeight: 'bold' }}>The Comedy Companion v1.4</Text>
                  </View>
                </View>
                <View style={{ paddingTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ textAlign: 'center' }}>
                    Long time no speak. I hope the app is serving you well. I am starting to pick up
                    the code and develop some new features that have nagged me while using it the past
                    few months. Here are the new features for version 1.4 of The Comedy Companion:
                  </Text>
                </View>
                <View style={{ paddingTop: 10, justifyContent: 'flex-start', alignItems: 'flex-start', padding: 20 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ paddingTop: 9 }}>{bulletIcon}</Text>
                    <Text style={{ textAlign: 'left', fontWeight: 'bold', marginTop: 5, marginLeft: 5 }}>
                      Joke Times and Set List Length Calculation! You can now associate a number of minutes and
                      seconds with each joke. Then, while building a set list, if you have not defined a length
                      the calculated length will be displayed.
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ paddingTop: 9 }}>{bulletIcon}</Text>
                    <Text style={{ textAlign: 'left', fontWeight: 'bold', marginTop: 5, marginLeft: 5 }}>
                      Set List Building Improvements! When editing a set list, the list of jokes on the left
                      will no longer display jokes that have been added to the set list on the right.
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
