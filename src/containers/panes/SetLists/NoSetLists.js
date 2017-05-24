'use strict';

import React, {Component} from 'react';
import { View, Text } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {Button} from 'react-native-ui-xg';

import * as setListActions from '../../../actions/setListActions';
import * as routingActions from '../../../actions/routingActions';

import SetList from '../../../models/set_list';

import layoutStyles from '../../../stylesheets/layoutStyles';

import {largeSetListsIcon, addSetListIcon} from '../../../helpers/icons';

class NoSetLists extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("Render NoSetLists.js");

    const { routingActions, setListActions } = this.props;

    const addSetList = () => {
      setListActions.setSL(new SetList());
      routingActions.openModal();
    };

    return (
      <View style={layoutStyles.centeredFlex}>
        {largeSetListsIcon}
        <Text style={ {paddingTop: 25} }>You do not appear to have any set lists yet!</Text>
        <Text style={ {paddingBottom: 20} }>Click the button below to add one..</Text>
        <View style={ {paddingBottom: 100} }>
          <Button type="surface" size="large" theme="red" onPress={ addSetList }>
            <Text>{addSetListIcon}</Text>
            <Text style={layoutStyles.buttonText}>Add Set List</Text>
          </Button>
        </View>
      </View>
    );
  }
}

export default connect(state => ({

  }),
  (dispatch) => ({
    setListActions: bindActionCreators(setListActions, dispatch),
    routingActions: bindActionCreators(routingActions, dispatch)
  })
)(NoSetLists);
