import React, {Component} from 'react';
import {View, ScrollView, Text} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {SegmentedControls} from 'react-native-radio-buttons';

import BaseModal from './BaseModal';

import * as routingActions from '../../actions/routingActions';
import * as jokeListActions from '../../actions/jokeListActions';
import * as setListListActions from '../../actions/setListListActions';
import * as showListActions from '../../actions/showListActions';

import FooterButton from '../../components/FooterButton';

import JokeListHelper from '../../helpers/jokeListHelper';
import SetListListHelper from '../../helpers/setListListHelper';
import ShowListHelper from '../../helpers/showListHelper';

import Setting from '../../models/setting';

import layoutStyles from '../../stylesheets/layoutStyles';
import settingsStyles from '../../stylesheets/settingsStyles';

class Settings extends Component {
  constructor(props) {
    super(props);

    Setting.get(1).then((setting) => {
      this.setting = setting;
    });
  }

  close = () => {
    const {routingActions} = this.props;

    routingActions.toggleSettings();
  };

  jokeSortFieldButtonClicked = (sort_field_option) => {
    const {jokeListActions} = this.props;

    let sort_field = sort_field_option.value;

    this.setting._jokes_sort_field = sort_field;
    this.setting.save();

    jokeListActions.setJokeListSortField(sort_field);

    JokeListHelper.refreshJokeList({sort_field: sort_field});
  };

  jokeSortOrderButtonClicked = (sort_order_option) => {
    const {jokeListActions} = this.props;

    let sort_order = sort_order_option.value;

    this.setting._jokes_sort_order = sort_order;
    this.setting.save();

    jokeListActions.setJokeListSortOrder(sort_order);

    JokeListHelper.refreshJokeList({ sort_order: sort_order });
  };

  setListSortFieldButtonClicked = (sort_field_option) => {
    const {setListListActions} = this.props;

    let sort_field = sort_field_option.value;

    this.setting._set_lists_sort_field = sort_field;
    this.setting.save();

    setListListActions.setSLListSortField(sort_field);

    SetListListHelper.refreshSLList({sort_field: sort_field});
  };

  setListSortOrderButtonClicked = (sort_order_option) => {
    const {setListListActions} = this.props;

    let sort_order = sort_order_option.value;

    this.setting._set_lists_sort_order = sort_order;
    this.setting.save();

    setListListActions.setSLListSortOrder(sort_order);

    SetListListHelper.refreshSLList({sort_order: sort_order});
  };

  showSortFieldButtonClicked = (sort_field_option) => {
    const {showListActions} = this.props;

    let sort_field = sort_field_option.value;

    this.setting._shows_sort_field = sort_field;
    this.setting.save();

    showListActions.setShowListSortField(sort_field);

    ShowListHelper.refreshShowList({sort_field: sort_field});
  };

  showSortOrderButtonClicked = (sort_order_option) => {
    const {showListActions} = this.props;

    let sort_order = sort_order_option.value;

    this.setting._shows_sort_order = sort_order;
    this.setting.save();

    showListActions.setShowListSortOrder(sort_order);

    ShowListHelper.refreshShowList({sort_order: sort_order});
  };

  render() {
    const {jokeListState, setListListState, showListState} = this.props;

    return (
      <BaseModal scrollable={true}>
        <ScrollView style={{flex: 1}}>
          <View style={[layoutStyles.modalContentSection]}>
            <View style={settingsStyles.settingsSectionTitleView}>
              <Text style={settingsStyles.settingsSectionTitle}>Jokes Settings</Text>
            </View>
            <View style={layoutStyles.centeredFlexRow}>
              <Text style={settingsStyles.sortByText}>Sort by: </Text>
              <SegmentedControls
                options={
                  [{label: 'Updated', value: '_updated_at'},
                    {label: 'Name', value: '_name'}]
                }
                onSelection={(sort_field) => this.jokeSortFieldButtonClicked(sort_field)}
                selectedOption={jokeListState.sort_field}
                containerStyle={{flex: 1}}
                extractText={(option) => option.label}
                testOptionEqual={(selectedValue, option) => selectedValue === option.value}
              />
            </View>
            <View style={layoutStyles.centeredFlexRowTopPadded}>
              <Text style={settingsStyles.sortInText}>Sort in: </Text>
              <SegmentedControls
                options={
                  [{label: 'Ascending Order', value: 'ASC'},
                    {label: 'Descending Order', value: 'DESC'}]
                }
                onSelection={(sort_order) => this.jokeSortOrderButtonClicked(sort_order)}
                selectedOption={jokeListState.sort_order}
                containerStyle={{flex: 1}}
                extractText={(option) => option.label}
                testOptionEqual={(selectedValue, option) => selectedValue === option.value}
              />
            </View>
          </View>
          <View style={[layoutStyles.modalContentSection]}>
            <View style={settingsStyles.settingsSectionTitleView}>
              <Text style={layoutStyles.settingsSectionTitle}>Set Lists Settings</Text>
            </View>
            <View style={layoutStyles.centeredFlexRow}>
              <Text style={settingsStyles.sortByText}>Sort by: </Text>
              <SegmentedControls
                options={
                  [{label: 'Updated', value: '_updated_at'},
                    {label: 'Name', value: '_name'},
                    {label: 'Length', value: '_length'}]
                }
                onSelection={(sort_field) => this.setListSortFieldButtonClicked(sort_field)}
                selectedOption={setListListState.sort_field}
                containerStyle={{flex: 1}}
                extractText={(option) => option.label}
                testOptionEqual={(selectedValue, option) => selectedValue === option.value}
              />
            </View>
            <View style={layoutStyles.centeredFlexRowTopPadded}>
              <Text style={settingsStyles.sortInText}>Sort in: </Text>
              <SegmentedControls
                options={
                  [{label: 'Ascending Order', value: 'ASC'},
                    {label: 'Descending Order', value: 'DESC'}]
                }
                onSelection={(sort_order) => this.setListSortOrderButtonClicked(sort_order)}
                selectedOption={setListListState.sort_order}
                containerStyle={{flex: 1}}
                extractText={(option) => option.label}
                testOptionEqual={(selectedValue, option) => selectedValue === option.value}
              />
            </View>
          </View>
          <View style={[layoutStyles.modalContentSection]}>
            <View style={settingsStyles.settingsSectionTitleView}>
              <Text style={layoutStyles.settingsSectionTitle}>Shows Settings</Text>
            </View>
            <View style={layoutStyles.centeredFlexRow}>
              <Text style={settingsStyles.sortByText}>Sort by: </Text>
              <SegmentedControls
                options={
                  [{label: 'Venue', value: '_venue'},
                    {label: 'City', value: '_city'},
                    {label: 'Date', value: '_date'}]
                }
                onSelection={(sort_field) => this.showSortFieldButtonClicked(sort_field)}
                selectedOption={showListState.sort_field}
                containerStyle={{flex: 1}}
                extractText={(option) => option.label}
                testOptionEqual={(selectedValue, option) => selectedValue === option.value}
              />
            </View>
            <View style={layoutStyles.centeredFlexRowTopPadded}>
              <Text style={settingsStyles.sortInText}>Sort in: </Text>
              <SegmentedControls
                options={
                  [{label: 'Ascending Order', value: 'ASC'},
                    {label: 'Descending Order', value: 'DESC'}]
                }
                onSelection={(sort_order) => this.showSortOrderButtonClicked(sort_order)}
                selectedOption={showListState.sort_order}
                containerStyle={{flex: 1}}
                extractText={(option) => option.label}
                testOptionEqual={(selectedValue, option) => selectedValue === option.value}
              />
            </View>
          </View>
        </ScrollView>
        <View style={layoutStyles.flexRowStretched}>
          <FooterButton
            onPress={this.close}
            buttonText="Close"
          />
        </View>
      </BaseModal>
    );
  }
}

export default connect(state => ({
    jokeListState: state.joke_list,
    setListListState: state.set_list_list,
    showListState: state.show_list
  }),
  (dispatch) => ({
    routingActions: bindActionCreators(routingActions, dispatch),
    jokeListActions: bindActionCreators(jokeListActions, dispatch),
    setListListActions: bindActionCreators(setListListActions, dispatch),
    showListActions: bindActionCreators(showListActions, dispatch)
  })
)(Settings);
