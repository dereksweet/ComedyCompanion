import React, {Component} from 'react';
import { View, ScrollView, TouchableHighlight, TouchableWithoutFeedback, Text, TextInput, Platform, Keyboard, Button as NativeButton } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import Button from '../../components/Button';
import FooterButton from '../../components/FooterButton';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

import BaseModal from './BaseModal';

import * as routingActions from '../../actions/routingActions';
import * as showActions from '../../actions/showActions';
import * as showListActions from '../../actions/showListActions';

import ShowListHelper from '../../helpers/showListHelper';

import SetList from '../../models/set_list';

import layoutStyles from '../../stylesheets/layoutStyles';
import editShowStyles from '../../stylesheets/editShowStyles';

class EditShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
  }

  componentWillUnmount () {
    ShowListHelper.refreshShowList();
    ShowListHelper.refreshShowListEmpty();
  }

  render() {
    const { showState, showActions, routingActions } = this.props;

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
      <BaseModal ref={(editShowView) => this.editShowView = editShowView}>
        { this.state.show_set_list_select &&
          <View style={{ flex: 1 }}>
            <View style={{ width: '100%', backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#CCCCCC', paddingBottom: 10, paddingTop: 10, alignItems: 'center' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Choose Set List</Text>
            </View>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              { this.state.set_lists.map((set_list) => {
                  return <View key={ set_list._id } style={ { flex: 1, backgroundColor: '#EEEEFF', borderBottomColor: '#CCCCCC', borderBottomWidth: 2, maxHeight: 40 } }>
                           <TouchableHighlight onPress={ () => selectSetList(set_list._id) }>
                             <Text style={{ color: '#000000', padding: 10, textAlign: 'center' }}>{set_list._name}</Text>
                           </TouchableHighlight>
                         </View>
                })
              }
            </ScrollView>
            <View style={{ flexDirection: 'row', height: 47, borderTopColor: '#999999', borderTopWidth: 1 }}>
              <View style={ { flex: 1, flexDirection: 'row' } }>
                <FooterButton
                  onPress={hideSetListSelect}
                  buttonText="Cancel"
                />
              </View>
            </View>
          </View>
        }
        {!this.state.show_set_list_select &&
        <View style={{flex: 1}}>
          <View style={[layoutStyles.modalContentSection, layoutStyles.centeredFlexRow]}>
            <Text style={layoutStyles.inputLabel}>Venue:</Text>
            <TextInput style={[editShowStyles.venueInput, this.state.venue_input_valid ? {} : layoutStyles.errorInput]}
                       underlineColorAndroid='transparent'
                       placeholder="Venue name here..."
                       onChangeText={(text) => showActions.setShowVenue(text)}
                       value={showState.show._venue}/>
          </View>
          <View style={[layoutStyles.modalContentSection, layoutStyles.centeredFlexRow]}>
            <Text style={layoutStyles.inputLabel}>City:</Text>
            <TextInput style={editShowStyles.cityInput}
                       underlineColorAndroid='transparent'
                       placeholder="City name here..."
                       onChangeText={(text) => showActions.setShowCity(text)}
                       value={showState.show._city}/>
            <Text style={[layoutStyles.inputLabel, {paddingLeft: 10}]}>State:</Text>
            <TextInput style={editShowStyles.stateInput}
                       underlineColorAndroid='transparent'
                       onChangeText={(text) => showActions.setShowState(text.toUpperCase())}
                       maxLength={2}
                       value={showState.show._state}/>
          </View>
          <View style={[layoutStyles.modalContentSection, layoutStyles.centeredFlexRow]}>
            <Text style={layoutStyles.inputLabel}>Date:</Text>
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
              onDateChange={(date) => {
                showActions.setShowDate(new Date(date))
              }}
            />
          </View>
          <View style={[layoutStyles.modalContentSection, layoutStyles.centeredFlexRow]}>
            <Text style={layoutStyles.inputLabel}>Set List:</Text>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <NativeButton
                title={showState.show._set_list._id != -1 ? showState.show._set_list._name : 'No Set List Selected'}
                onPress={showSetListSelect}/>
            </View>
          </View>
          <View style={[layoutStyles.modalContentSection, {flex: 1}]}>

          </View>
          <View style={layoutStyles.flexRowStretched}>
            {(showState.show._id != -1) &&
            <FooterButton
              onPress={toggleDeleteConfirm}
              buttonText="Delete"
              backgroundColor='red'
            />
            }
            <FooterButton
              onPress={cancel}
              buttonText="Cancel"
            />
            <FooterButton
              onPress={save}
              buttonText="Save"
              backgroundColor='green'
            />
          </View>
          {this.state.show_delete_confirm &&
          <View style={layoutStyles.confirmBox}>
            <View style={layoutStyles.confirmBoxTextView}>
              <Text style={layoutStyles.confirmBoxText}>
                Are you SURE you want to delete this show?
              </Text>
            </View>
            <View style={layoutStyles.confirmBoxButtonsView}>
              <Button
                onPress={toggleDeleteConfirm}
                buttonText="NO"
                backgroundColor='red'
                additionalStyles={[layoutStyles.deleteButton, {marginRight: 10}]}
              />
              <Button
                onPress={destroy}
                buttonText="YES"
                backgroundColor='green'
                additionalStyles={layoutStyles.confirmButton}
              />
            </View>
          </View>
          }
        </View>
        }
      </BaseModal>
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
