import React, {Component} from 'react';
import { View, ScrollView, TouchableHighlight, Text, TextInput, Keyboard, Button as NativeButton } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import FooterButton from '../../components/FooterButton';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

import BaseModal from './BaseModal';

import * as routingActions from '../../actions/routingActions';
import * as showActions from '../../actions/showActions';
import * as showListActions from '../../actions/showListActions';

import ConfirmBox from '../../components/ConfirmBox';

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

  validateFields = () => {
    const {showState} = this.props;

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

  selectSetList = (set_list_id) => {
    const {showActions} = this.props;

    SetList.get(set_list_id).then((set_list) => {
      showActions.setShowSetList(set_list);
      this.hideSetListSelect();
    })
  };

  showSetListSelect = () => {
    this.setState({
      show_set_list_select: true
    });
  };

  hideSetListSelect = () => {
    this.setState({
      show_set_list_select: false
    });
  };

  save = () => {
    const {showState} = this.props;

    if (this.validateFields()) {
      showState.show.save(() => {
        ShowListHelper.refreshShowList();
        ShowListHelper.refreshShowListEmpty();
      });
      this.cancel();
    }
  };

  cancel = () => {
    const {routingActions} = this.props;

    Keyboard.dismiss();
    routingActions.closeModal();
  };

  destroy = () => {
    const {showState, routingActions} = this.props;

    showState.show.destroy();
    routingActions.closeModal();
  };

  toggleDeleteConfirm = () => {
    this.setState({
      show_delete_confirm: !this.state.show_delete_confirm
    })
  };

  render() {
    const {showState, showActions} = this.props;

    return (
      <BaseModal ref={(editShowView) => this.editShowView = editShowView}>
        {this.state.show_set_list_select &&
        <View style={{flex: 1}}>
          <View style={editShowStyles.setListSelectTitleView}>
            <Text style={editShowStyles.setListSelectTitle}>Choose Set List</Text>
          </View>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            {this.state.set_lists.map((set_list) => {
              return <View key={set_list._id} style={editShowStyles.setListView}>
                <TouchableHighlight onPress={() => this.selectSetList(set_list._id)}>
                  <Text style={editShowStyles.setList}>{set_list._name}</Text>
                </TouchableHighlight>
              </View>
            })
            }
          </ScrollView>
          <View style={layoutStyles.flexRowStretched}>
            <FooterButton
              onPress={this.hideSetListSelect}
              buttonText="Cancel"
            />
          </View>
        </View>
        }
        {!this.state.show_set_list_select &&
        <View style={{flex: 1}}>
          <View style={[layoutStyles.modalContentSection, layoutStyles.centeredFlexRow]}>
            <Text style={layoutStyles.inputLabel}>Venue:</Text>
            <TextInput
              style={[editShowStyles.venueInput, this.state.venue_input_valid ? {} : layoutStyles.errorInput]}
              underlineColorAndroid='transparent'
              placeholder="Venue name here..."
              onChangeText={(text) => showActions.setShowVenue(text)}
              value={showState.show._venue}
            />
          </View>
          <View style={[layoutStyles.modalContentSection, layoutStyles.centeredFlexRow]}>
            <Text style={layoutStyles.inputLabel}>City:</Text>
            <TextInput
              style={editShowStyles.cityInput}
              underlineColorAndroid='transparent'
              placeholder="City name here..."
              onChangeText={(text) => showActions.setShowCity(text)}
              value={showState.show._city}
            />
            <Text style={[layoutStyles.inputLabel, {paddingLeft: 10}]}>State:</Text>
            <TextInput
              style={editShowStyles.stateInput}
              underlineColorAndroid='transparent'
              onChangeText={(text) => showActions.setShowState(text.toUpperCase())}
              maxLength={2}
              value={showState.show._state}
            />
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
                onPress={this.showSetListSelect}
              />
            </View>
          </View>
          <View style={[layoutStyles.modalContentSection, {flex: 1}]} />
          <View style={layoutStyles.flexRowStretched}>
            {(showState.show._id !== -1) &&
            <FooterButton
              onPress={this.toggleDeleteConfirm}
              buttonText="Delete"
              backgroundColor='red'
            />
            }
            <FooterButton
              onPress={this.cancel}
              buttonText="Cancel"
            />
            <FooterButton
              onPress={this.save}
              buttonText="Save"
              backgroundColor='green'
            />
          </View>
          {this.state.show_delete_confirm &&
          <ConfirmBox
            confirmText='Are you SURE you want to delete this show?'
            noOnPress={this.toggleDeleteConfirm}
            yesOnPress={this.destroy}
          />
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
