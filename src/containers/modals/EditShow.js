'use strict';

import React, {Component} from 'react';
import { View, Text, TouchableHighlight, Switch, TextInput, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {Button, DatePicker} from 'react-native-ui-xg';
import moment from 'moment';

import * as routingActions from '../../actions/routingActions';
import * as showActions from '../../actions/showActions';
import * as showListActions from '../../actions/showListActions';

import ShowListHelper from '../../helpers/showListHelper';

import layoutStyles from '../../stylesheets/layoutStyles';
import editShowStyles from '../../stylesheets/editShowStyles';

class EditShow extends Component {
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

    ShowListHelper.refreshShowList();
    ShowListHelper.refreshShowListEmpty();
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
    const { showState, showListState, showActions, showListActions, routingActions } = this.props;

    const save = () => {
      showState.show.save(() => {
        ShowListHelper.refreshShowList();
        ShowListHelper.refreshShowListEmpty();
      });
      cancel();
    };

    const cancel = () => {
      Keyboard.dismiss();
      routingActions.closeModal();
    };

    const destroy = () => {
      showState.show.destroy();
      routingActions.closeModal();
    };

    return (
      <View style={[layoutStyles.modal, layoutStyles.centeredFlex]}>
        <View style={layoutStyles.statusBarBuffer} />
        <View style={layoutStyles.modalContent} onLayout={(event) => this.measureModalView(event)}>
          <View style={{ height: this.contentHeight() }}>
            <View style={ [layoutStyles.modalContentSection, { flexDirection: 'row', alignItems: 'center'  }] }>
              <Text style={ layoutStyles.inputLabel }>Venue:</Text>
              <TextInput style={ editShowStyles.venueInput }
                         underlineColorAndroid='transparent'
                         placeholder="Venue name here..."
                         onChangeText={(text) => showActions.setShowVenue(text)}
                         value={ showState.show._venue } />
            </View>
            <View style={ [layoutStyles.modalContentSection, { flexDirection: 'row', alignItems: 'center'  }] }>
              <Text style={ layoutStyles.inputLabel }>City:</Text>
              <TextInput style={ editShowStyles.cityInput }
                         underlineColorAndroid='transparent'
                         placeholder="City name here..."
                         onChangeText={(text) => showActions.setShowCity(text)}
                         value={ showState.show._city} />
            </View>
            <View style={ [layoutStyles.modalContentSection, { flexDirection: 'row', alignItems: 'center'  }] }>
              <Text style={ layoutStyles.inputLabel }>State:</Text>
              <TextInput style={ editShowStyles.stateInput }
                         underlineColorAndroid='transparent'
                         placeholder="State name here..."
                         onChangeText={(text) => showActions.setShowState(text)}
                         value={ showState.show._state} />
            </View>
            <View style={ [layoutStyles.modalContentSection, { flexDirection: 'row', alignItems: 'center'  }] }>
              <Text style={ layoutStyles.inputLabel }>Date:</Text>
              <DatePicker
                style={{width: 200}}
                date={moment(showState.show._date).utc().format("YYYY-MM-DD")}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36,
                    backgroundColor: '#FFFFFF'
                  }
                }}
                onDateChange={(date) => { console.log("Here: ", date); showActions.setShowDate(new Date(date))}}
              />
            </View>
            <View style={ [layoutStyles.modalContentSection, {flex: 1} ] }>

            </View>
            <View style={ { flexDirection: 'row' }}>
              { (showState.show._id != -1) &&
              <View style={ { flex: 1 } }>
                <Button type="surface" size="large" theme="red" onPress={ destroy }>
                  <Text style={layoutStyles.buttonText}>Delete</Text>
                </Button>
              </View>
              }
              <View style={ { flex: 1 } }>
                <Button type="surface" size="large" theme="gray" onPress={ cancel }>
                  <Text style={layoutStyles.buttonText}>Cancel</Text>
                </Button>
              </View>
              <View style={ { flex: 1 } }>
                <Button type="surface" size="large" theme="blue" onPress={ save }>
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
    showState: state.show,
    showListState: state.show_list
  }),
  (dispatch) => ({
    routingActions: bindActionCreators(routingActions, dispatch),
    showActions: bindActionCreators(showActions, dispatch),
    showListActions: bindActionCreators(showListActions, dispatch)
  })
)(EditShow);
