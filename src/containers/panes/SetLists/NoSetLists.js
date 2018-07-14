import React, {Component} from 'react';
import { View, Text } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import * as setListActions from '../../../actions/setListActions';
import * as routingActions from '../../../actions/routingActions';

import SetList from '../../../models/set_list';

import layoutStyles from '../../../stylesheets/layoutStyles';

import Button from '../../../components/Button';

import {largeSetListsIcon, addSetListIcon, addJokeIcon} from '../../../helpers/icons';

class NoSetLists extends Component {
  constructor(props) {
    super(props);
  }

  render() {
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
        <View style={ {paddingBottom: 100, alignItems: 'center'} }>
          <Button
            onPress={addSetList}
            buttonText="Add Set List"
            backgroundColor='green'
            additionalStyles={{width: 150, height: 45}}
            icon={addSetListIcon}
          />
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
