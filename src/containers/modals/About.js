import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableHighlight, Linking, Image} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import BaseModal from './BaseModal';

import * as routingActions from '../../actions/routingActions';

import FooterButton from '../../components/FooterButton';

import {bulletIcon} from '../../helpers/icons';

import aboutStyles from '../../stylesheets/aboutStyles';
import layoutStyles from '../../stylesheets/layoutStyles';

class About extends Component {
  close = () => {
    const {routingActions} = this.props;

    routingActions.toggleAbout();
  };

  render() {
    return (
      <BaseModal scrollable={true}>
        <ScrollView>
          <View style={aboutStyles.mainView}>
            <View style={aboutStyles.textSection}>
              <Image style={aboutStyles.mascotImage}
                     source={require('../../images/FullMascot.png')}/>
            </View>
            <View style={aboutStyles.textSection}>
              <View style={{borderBottomWidth: 1}}>
                <Text style={{fontWeight: 'bold'}}>The Comedy Companion v1.4</Text>
              </View>
            </View>
            <View style={aboutStyles.textSection}>
              <Text style={{textAlign: 'center'}}>
                Long time no speak. I hope the app is serving you well. I am starting to pick up
                the code and develop some new features that have nagged me while using it the past
                few months. Here are the new features for version 1.4 of The Comedy Companion:
              </Text>
            </View>
            <View style={aboutStyles.featuresSection}>
              <View style={{flexDirection: 'row'}}>
                <Text style={aboutStyles.bullet}>{bulletIcon}</Text>
                <Text style={aboutStyles.featureText}>
                  Joke Times and Set List Length Calculation! You can now associate a number of minutes and
                  seconds with each joke. Then, while building a set list, the estimated length of your
                  set will be displayed.
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={aboutStyles.bullet}>{bulletIcon}</Text>
                <Text style={aboutStyles.featureText}>
                  Set List Building Improvements! When editing a set list, the list of jokes on the left
                  will no longer display jokes that have been added to the set list on the right.
                </Text>
              </View>
            </View>
            <View style={layoutStyles.centerCenter}>
              <Text style={{textAlign: 'center'}}>
                Search for "<Text style={{fontWeight: 'bold'}}>The Comedy Companion</Text>" on Facebook to stay
                aprised of all updates and
                to make any requests.
              </Text>
            </View>
            <View style={aboutStyles.textSection}>
              <Text style={{textAlign: 'center'}}>
                Not only is the app entirely free, but all the code is open source and, if you can code in React
                Native, you can help contribute and make it better! If you'd like to get involved click the following link:
              </Text>
            </View>
            <View style={aboutStyles.textSection}>
              <TouchableHighlight onPress={() => Linking.openURL('http://www.github.com/dereksweet/ComedyCompanion')}>
                <Text style={aboutStyles.githubLink}>
                  www.github.com/dereksweet/ComedyCompanion
                </Text>
              </TouchableHighlight>
            </View>
            <View style={aboutStyles.disclaimerSection}>
              <Text style={aboutStyles.disclaimerText}>
                Disclaimer: By using this application you are taking full responsibility for the integrity of
                the information stored on your device. None of the contributors to the development of The Comedy
                Companion are responsible for any loss of data that may occur.
              </Text>
            </View>
          </View>
        </ScrollView>
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

export default connect(state => ({}),
  (dispatch) => ({
    routingActions: bindActionCreators(routingActions, dispatch)
  })
)(About);
