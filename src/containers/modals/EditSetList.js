import React, {Component} from 'react';
import {View, Text, TextInput} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import BaseModal from './BaseModal';
import JokeSelector from './EditSetList/JokeSelector';
import SetListJokes from './EditSetList/SetListJokes';

import * as routingActions from '../../actions/routingActions';
import * as setListActions from '../../actions/setListActions';

import Button from '../../components/Button';
import ConfirmBox from '../../components/ConfirmBox';
import FooterButton from '../../components/FooterButton';

import SetListListHelper from '../../helpers/setListListHelper';

import layoutStyles from '../../stylesheets/layoutStyles';
import editSetListStyles from '../../stylesheets/editSetListStyles';

class EditSetList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show_delete_confirm: false,
      name_input_valid: true
    };
  }

  componentWillUnmount () {
    SetListListHelper.refreshSLList();
    SetListListHelper.refreshSLListEmpty();
  }

  validateFields = () => {
    const {setListState} = this.props;

    let fields_valid = true;

    if (setListState.set_list._name === '') {
      fields_valid = false;
      this.setState({
        name_input_valid: false
      });
    }

    if (!fields_valid) {
      this.editSetListView.shakingView.performShake();
    }

    return fields_valid;
  };

  cancel = () => {
    const {routingActions} = this.props;

    routingActions.closeModal();
  };

  save = () => {
    const {setListState} = this.props;

    if (this.validateFields()) {
      setListState.set_list.save(() => {
        SetListListHelper.refreshSLList();
        SetListListHelper.refreshSLListEmpty();
      });
      this.cancel();
    }
  };

  destroy = () => {
    const {setListState} = this.props;

    setListState.set_list.destroy();
    this.cancel();
  };

  toggleDeleteConfirm = () => {
    this.setState({
      show_delete_confirm: !this.state.show_delete_confirm
    })
  };

  duplicateSetList = () => {
    const {setListActions} = this.props;

    setListActions.duplicateSL();
  };

  render() {
    const {setListState, setListActions} = this.props;

    const setListLengthString = setListState.set_list.setListLength();

    return (
      <BaseModal ref={(editSetListView) => this.editSetListView = editSetListView}>
        <View style={[layoutStyles.modalContentSection, layoutStyles.centeredFlexRow, {backgroundColor: '#EEEEEE'}]}>
          <Text style={layoutStyles.inputLabel}>Name:</Text>
          <TextInput
            style={[editSetListStyles.nameInput, this.state.name_input_valid ? {} : layoutStyles.errorInput]}
            underlineColorAndroid='transparent'
            placeholder="Name your set list here..."
            onChangeText={(text) => setListActions.setSLName(text)}
            value={setListState.set_list._name}
          />
        </View>
        <View style={[layoutStyles.modalContentSection, layoutStyles.centeredFlexRow, {backgroundColor: '#EEEEEE'}]}>
          <View style={[layoutStyles.centeredFlexRow, {flex: 1}]}>
            <View>
              <Text style={layoutStyles.inputLabel}>Length:</Text>
              <Text style={[layoutStyles.inputLabel, {marginLeft: 5}]}>(min)</Text>
            </View>
            <TextInput
              style={editSetListStyles.lengthInput}
              underlineColorAndroid='transparent'
              placeholderTextColor='red'
              placeholder=""
              onChangeText={(text) => setListActions.setSLLength(text)}
              keyboardType="numeric"
              value={setListState.set_list._length ? setListState.set_list._length.toString() : ''}
            />
            {setListLengthString !== '0' &&
            <View>
              <Text style={layoutStyles.postLabel}>Estimated: </Text>
              <Text style={layoutStyles.postLabel}>{setListLengthString + ' min'}</Text>
            </View>
            }
          </View>
          {setListState.set_list._id !== -1 &&
          <Button
            onPress={this.duplicateSetList}
            buttonText="Duplicate"
            backgroundColor='orange'
            additionalStyles={editSetListStyles.duplicateButton}
          />
          }
        </View>
        <View style={editSetListStyles.jokeListViews}>
          <View style={editSetListStyles.jokeSelectorView}>
            <JokeSelector />
          </View>
          <View style={{flex: 1}}>
            <SetListJokes />
          </View>
        </View>
        <View style={layoutStyles.flexRowStretched}>
          {(setListState.set_list._id !== -1) &&
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
          confirmText='Are you SURE you want to delete this set list?'
          noOnPress={this.toggleDeleteConfirm}
          yesOnPress={this.destroy}
        />
        }
      </BaseModal>
    );
  }
}

export default connect(state => ({
    setListState: state.set_list
  }),
  (dispatch) => ({
    routingActions: bindActionCreators(routingActions, dispatch),
    setListActions: bindActionCreators(setListActions, dispatch)
  })
)(EditSetList);
