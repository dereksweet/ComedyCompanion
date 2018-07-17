import React, {Component} from 'react';
import {View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import NoShows from './Shows/NoShows';
import ShowsList from './Shows/ShowsList';

import * as showListActions from '../../actions/showListActions';

import ShowListHelper from '../../helpers/showListHelper';

import layoutStyles from '../../stylesheets/layoutStyles';

class Shows extends Component {
  componentDidMount() {
    ShowListHelper.refreshShowListEmpty();
  }

  shouldComponentUpdate(nextProps) {
    const differentEmpty = this.props.showListState.empty !== nextProps.showListState.empty;

    return differentEmpty;
  }

  render() {
    const {showListState} = this.props;

    return (
      <View style={layoutStyles.centeredFlex}>
        {(showListState.empty) && <NoShows />}
        {(!showListState.empty) && <ShowsList />}
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
