'use strict';

import React, {Component} from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import * as setListListActions from '../../actions/setListListActions';

import NoSetLists from './SetLists/NoSetLists';
import SetListsList from './SetLists/SetListsList';

import SetListListHelper from '../../helpers/setListListHelper';

import layoutStyles from '../../stylesheets/layoutStyles';

class SetLists extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    SetListListHelper.refreshSLList();
    SetListListHelper.refreshSLListEmpty();
  }

  render() {
    console.log("Render SetLists.js");

    const { setListListState } = this.props;

    return (
      <View style={layoutStyles.centeredFlex}>
        { (setListListState.empty) && <NoSetLists /> }
        { (!setListListState.empty) && <SetListsList /> }
      </View>
    );
  }
}

export default connect(state => ({
    setListListState: state.set_list_list
  }),
  (dispatch) => ({
    setListListActions: bindActionCreators(setListListActions, dispatch)
  })
)(SetLists);
