'use strict';

import React, {Component} from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import * as showListActions from '../../actions/showListActions';

import NoShows from './Shows/NoShows';
import ShowsList from './Shows/ShowsList';

import ShowListHelper from '../../helpers/showListHelper';

import layoutStyles from '../../stylesheets/layoutStyles';

class Shows extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    ShowListHelper.refreshShowList();
    ShowListHelper.refreshShowListEmpty();
  }

  render() {
    const { showListState } = this.props;

    return (
      <View style={layoutStyles.centeredFlex}>
        { (showListState.empty) && <NoShows /> }
        { (!showListState.empty) && <ShowsList /> }
      </View>
    );
  }
}

export default connect(state => ({
    showListState: state.show_list
  }),
  (dispatch) => ({
    showListActions: bindActionCreators(showListActions, dispatch)
  })
)(Shows);
