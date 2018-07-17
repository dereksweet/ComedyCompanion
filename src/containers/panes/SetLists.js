import React, {Component} from 'react';
import {View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import NoSetLists from './SetLists/NoSetLists';
import SetListsList from './SetLists/SetListsList';

import * as setListListActions from '../../actions/setListListActions';

import SetListListHelper from '../../helpers/setListListHelper';

import layoutStyles from '../../stylesheets/layoutStyles';

class SetLists extends Component {
  componentDidMount() {
    SetListListHelper.refreshSLListEmpty();
  }

  shouldComponentUpdate(nextProps) {
    const differentEmpty = this.props.setListListState.empty !== nextProps.setListListState.empty;

    return differentEmpty;
  }

  render() {
    const {setListListState} = this.props;

    return (
      <View style={layoutStyles.centeredFlex}>
        {(setListListState.empty) && <NoSetLists />}
        {(!setListListState.empty) && <SetListsList />}
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
