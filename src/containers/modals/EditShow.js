'use strict';

import React, {Component} from 'react';
import { View, ScrollView, TouchableHighlight, TouchableWithoutFeedback, Text, TextInput, Platform, Keyboard, Button as NativeButton } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {Button} from 'react-native-buttons';
// import { DatePicker } from 'react-native-ui-xg';
import moment from 'moment';

import ShakingView from '../../components/ShakingView';

import * as routingActions from '../../actions/routingActions';
import * as showActions from '../../actions/showActions';
import * as showListActions from '../../actions/showListActions';

import SetList from '../../models/set_list';

import ShowListHelper from '../../helpers/showListHelper';

import layoutStyles from '../../stylesheets/layoutStyles';
import editShowStyles from '../../stylesheets/editShowStyles';

class EditShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal_height: 0,
      keyboard_height: 0,
      show_set_list_select: false,
      set_lists: [],
      show_delete_confirm: false,
      venue_input_valid: true
    }
  }

  componentWillMount () {
    SetList.all(
      this.props.setListListState.sort_field,
      this.props.setListListState.sort_order
    ).then((set_lists) => {
      this.setState({
        set_lists: set_lists
      });
    });

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

    const validateFields = () => {
      let fields_valid = true;

      if (showState.show._venue === '') {
        fields_valid = false;
        this.setState({
          venue_input_valid: false
        });
      }

      if (!fields_valid) {
        this.editShowView.performShake();
      }

      return fields_valid;
    };

    const selectSetList = (set_list_id) => {
      SetList.get(set_list_id).then((set_list) => {
        showActions.setShowSetList(set_list);
        hideSetListSelect();
      })
    };

    const save = () => {
      if (validateFields()) {
        showState.show.save(() => {
          ShowListHelper.refreshShowList();
          ShowListHelper.refreshShowListEmpty();
        });
        cancel();
      }
    };

    const cancel = () => {
      Keyboard.dismiss();
      routingActions.closeModal();
    };

    const destroy = () => {
      showState.show.destroy();
      routingActions.closeModal();
    };

    const toggleDeleteConfirm = () => {
      this.setState({
        show_delete_confirm: !this.state.show_delete_confirm
      })
    };

    const showSetListSelect = () => {
      this.setState({
        show_set_list_select: true
      });
    };

    const hideSetListSelect = () => {
      this.setState({
        show_set_list_select: false
      });
    };

    return (
      <ShakingView ref={(editShowView) => this.editShowView = editShowView}
                   style={[layoutStyles.modal, layoutStyles.centeredFlex]}>
        <View style={layoutStyles.statusBarBuffer} />
        <View style={layoutStyles.modalContent} onLayout={(event) => this.measureModalView(event)}>
          { this.state.show_set_list_select &&
            <View>
              <View style={ { width: '100%', backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#CCCCCC', paddingBottom: 10, paddingTop: 10, alignItems: 'center' } }>
                <Text style={ { fontWeight: 'bold', fontSize: 14 } }>Choose Set List</Text>
              </View>
              <View style={ { flex: 1 } }>
                <ScrollView>
                  { this.state.set_lists.map((set_list) => {
                      return <View key={ set_list._id } style={ { flex: 1, backgroundColor: '#EEEEFF', borderBottomColor: '#CCCCCC', borderBottomWidth: 2 } }>
                               <TouchableHighlight onPress={ () => selectSetList(set_list._id) }>
                                 <Text style={{ color: '#000000', padding: 10, textAlign: 'center' }}>{set_list._name}</Text>
                               </TouchableHighlight>
                             </View>
                    })
                  }
                </ScrollView>
              </View>
              <View style={ { width: '100%' } }>
                <Button type="surface" size="large" theme="gray" selfStyle={ layoutStyles.cancelButton } onPress={ hideSetListSelect }>
                  <Text style={layoutStyles.buttonText}>Cancel</Text>
                </Button>
              </View>
            </View>
          }
          { !this.state.show_set_list_select &&
            <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
              <View style={{ height: this.contentHeight() }}>
                <View style={ [layoutStyles.modalContentSection, { flexDirection: 'row', alignItems: 'center'  }] }>
                  <Text style={ layoutStyles.inputLabel }>Venue:</Text>
                  <TextInput style={ [editShowStyles.venueInput, this.state.venue_input_valid ? {} : layoutStyles.errorInput] }
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
                  <Text style={ [layoutStyles.inputLabel, { paddingLeft: 10 }] }>State:</Text>
                  <TextInput style={ editShowStyles.stateInput }
                             underlineColorAndroid='transparent'
                             onChangeText={(text) => showActions.setShowState(text.toUpperCase())}
                             maxLength={ 2 }
                             value={ showState.show._state} />
                </View>
                <View style={ [layoutStyles.modalContentSection, { flexDirection: 'row', alignItems: 'center'  }] }>
                  <Text style={ layoutStyles.inputLabel }>Date:</Text>
                  {/*<DatePicker*/}
                    {/*style={{width: 200}}*/}
                    {/*date={moment(showState.show._date).utc().format("YYYY-MM-DD")}*/}
                    {/*mode="date"*/}
                    {/*placeholder="select date"*/}
                    {/*format="YYYY-MM-DD"*/}
                    {/*confirmBtnText="Confirm"*/}
                    {/*cancelBtnText="Cancel"*/}
                    {/*customStyles={{*/}
                      {/*dateIcon: {*/}
                        {/*position: 'absolute',*/}
                        {/*left: 0,*/}
                        {/*top: 4,*/}
                        {/*marginLeft: 0*/}
                      {/*},*/}
                      {/*dateInput: {*/}
                        {/*marginLeft: 36,*/}
                        {/*backgroundColor: '#FFFFFF'*/}
                      {/*}*/}
                    {/*}}*/}
                    {/*onDateChange={(date) => { showActions.setShowDate(new Date(date))}}*/}
                  {/*/>*/}
                </View>
                <View style={ [layoutStyles.modalContentSection, { flexDirection: 'row', alignItems: 'center'  }] }>
                  <Text style={ layoutStyles.inputLabel }>Set List:</Text>
                  <View style={ { flex: 1, alignItems: 'flex-start' } }>
                    <NativeButton title={ showState.show._set_list._id != -1 ? showState.show._set_list._name : 'No Set List Selected' }
                                  onPress={ showSetListSelect } />
                  </View>
                </View>
                <View style={ [layoutStyles.modalContentSection, {flex: 1} ] }>

                </View>
                <View style={ { flexDirection: 'row' }}>
                  { (showState.show._id != -1) &&
                  <View style={ { flex: 1 } }>
                    <Button type="surface" size="large" theme="red" selfStyle={ layoutStyles.deleteButton } onPress={ toggleDeleteConfirm }>
                      <Text style={layoutStyles.buttonText}>Delete</Text>
                    </Button>
                  </View>
                  }
                  <View style={ { flex: 1 } }>
                    <Button type="surface" size="large" theme="gray" selfStyle={ layoutStyles.cancelButton } onPress={ cancel }>
                      <Text style={layoutStyles.buttonText}>Cancel</Text>
                    </Button>
                  </View>
                  <View style={ { flex: 1 } }>
                    <Button type="surface" size="large" theme="blue" selfStyle={ layoutStyles.confirmButton } onPress={ save }>
                      <Text style={layoutStyles.buttonText}>Save</Text>
                    </Button>
                  </View>
                </View>
                { this.state.show_delete_confirm &&
                  <View style={ layoutStyles.confirmBox }>
                    <Text style={{ textAlign: 'center', fontSize: 20 }}>Are you SURE you want to delete this show?</Text>
                    <View style={{ paddingTop: 25, flexDirection: 'row' }}>
                      <Button type="surface" size="large" theme="red" selfStyle={ layoutStyles.deleteButton } onPress={ toggleDeleteConfirm }>
                        <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>NO</Text>
                      </Button>
                      <Button type="surface" size="large" theme="blue" selfStyle={ [layoutStyles.confirmButton, { marginLeft: 10 }] } onPress={ destroy }>
                        <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>YES</Text>
                      </Button>
                    </View>
                  </View>
                }
              </View>
            </TouchableWithoutFeedback>
          }
        </View>
      </ShakingView>
    );
  }
}

export default connect(state => ({
    showState: state.show,
    showListState: state.show_list,
    setListListState: state.set_list_list
  }),
  (dispatch) => ({
    routingActions: bindActionCreators(routingActions, dispatch),
    showActions: bindActionCreators(showActions, dispatch),
    showListActions: bindActionCreators(showListActions, dispatch)
  })
)(EditShow);
