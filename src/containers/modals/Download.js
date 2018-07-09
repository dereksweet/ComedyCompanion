'use strict';

import React, {Component} from 'react';
import {View, ScrollView, Text, TextInput, AsyncStorage, Platform} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Button} from 'react-native-buttons';
import FooterButton from '../../components/FooterButton';
import iCloudStorage from 'react-native-icloudstore';
import {SegmentedControls} from 'react-native-radio-buttons';

import Setting from '../../models/setting';

import JokeListHelper from '../../helpers/jokeListHelper';
import SetListListHelper from '../../helpers/setListListHelper';
import ShowListHelper from '../../helpers/showListHelper';

import Joke from '../../models/joke';
import SetList from '../../models/set_list';
import Show from '../../models/show';

import * as routingActions from '../../actions/routingActions';
import * as downloadActions from '../../actions/downloadActions';

import EmailService from '../../services/EmailService';

import layoutStyles from '../../stylesheets/layoutStyles';
import downloadStyles from '../../stylesheets/downloadStyles';

class Download extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showWriteConfirm: false,
      writeLoadComplete: false,
      writing: false,
      showReadConfirm: false,
      readLoadComplete: false,
      reading: false,
      cloudJokesCount: 0,
      cloudSetListsCount: 0,
      cloudShowsCount: 0,
      localJokesCount: 0,
      localSetListsCount: 0,
      localShowsCount: 0,
      export_email_valid: true
    };

    Setting.get(1).then((setting) => {
      this.setting = setting;
    });
  }

  close = () => {
    this.props.routingActions.toggleDownload();
  };

  confirmWriteToiCloud = async () => {
    this.setState({
      showWriteConfirm: true,
      writeLoadComplete: false
    });

    const local_jokes = await Joke.all(null, null, true);
    const local_set_lists = await SetList.all(null, null, true);
    const local_shows = await Show.all(null, null, true);

    this.setState({
      localJokesCount: local_jokes.length,
      localSetListsCount: local_set_lists.length,
      localShowsCount: local_shows.length,
      writeLoadComplete: true
    });
  };

  cancelWriteToiCloud = async () => {
    this.setState({
      showWriteConfirm: false,
      writeLoadComplete: false,
      writing: false
    });
  };

  writeToiCloud = async () => {
    this.setState({
      writing: true
    });

    const local_jokes = await Joke.all(null, null, true);
    const local_set_lists = await SetList.all(null, null, true);
    const local_shows = await Show.all(null, null, true);

    await iCloudStorage.setItem('ComedyCompanion:jokes', JSON.stringify(local_jokes));
    await iCloudStorage.setItem('ComedyCompanion:set_lists', JSON.stringify(local_set_lists));
    await iCloudStorage.setItem('ComedyCompanion:shows', JSON.stringify(local_shows));

    if (local_jokes.length > 0) {
      const jokes_next_id = await AsyncStorage.getItem('@' + Joke.databaseName() + ':' + Joke.tableName() + '_next_id');
      await iCloudStorage.setItem('ComedyCompanion:jokes_next_id', jokes_next_id);
    }

    if (local_set_lists.length > 0) {
      const set_lists_next_id = await AsyncStorage.getItem('@' + SetList.databaseName() + ':' + SetList.tableName() + '_next_id');
      await iCloudStorage.setItem('ComedyCompanion:set_lists_next_id', set_lists_next_id);
    }

    if (local_shows.length > 0) {
      const shows_next_id = await AsyncStorage.getItem('@' + Show.databaseName() + ':' + Show.tableName() + '_next_id');
      await iCloudStorage.setItem('ComedyCompanion:shows_next_id', shows_next_id);
    }

    this.setState({
      showWriteConfirm: false,
      writeLoadComplete: false,
      writing: false
    });

    alert('Write to iCloud Complete!');
  };

  confirmReadFromiCloud = async () => {
    this.setState({
      showReadConfirm: true,
      readLoadComplete: false
    });

    const cloud_jokes = JSON.parse(await iCloudStorage.getItem('ComedyCompanion:jokes'));
    const cloud_set_lists = JSON.parse(await iCloudStorage.getItem('ComedyCompanion:set_lists'));
    const cloud_shows = JSON.parse(await iCloudStorage.getItem('ComedyCompanion:shows'));

    this.setState({
      cloudJokesCount: cloud_jokes.length,
      cloudSetListsCount: cloud_set_lists.length,
      cloudShowsCount: cloud_shows.length,
      readLoadComplete: true
    });
  };

  cancelReadFromiCloud = async () => {
    this.setState({
      showReadConfirm: false,
      readLoadComplete: false,
      reading: false
    });
  };

  readFromiCloud = async () => {
    this.setState({
      reading: true
    });

    const cloud_jokes = JSON.parse(await iCloudStorage.getItem('ComedyCompanion:jokes'));
    const cloud_set_lists = JSON.parse(await iCloudStorage.getItem('ComedyCompanion:set_lists'));
    const cloud_shows = JSON.parse(await iCloudStorage.getItem('ComedyCompanion:shows'));

    await Joke.destroy_all();
    await SetList.destroy_all();
    await Show.destroy_all();

    for (let i = 0; i < cloud_jokes.length; i++) {
      const cloud_joke = new Joke(cloud_jokes[i]);
      await cloud_joke.save(null, true);
    }

    for (let i = 0; i < cloud_set_lists.length; i++) {
      const cloud_set_list = new SetList(cloud_set_lists[i]);
      await cloud_set_list.save(null, true);
    }

    for (let i = 0; i < cloud_shows.length; i++) {
      let cloud_show = new Show(cloud_shows[i]);
      cloud_show._has_recording = false;
      cloud_show._show_time_seconds = 0;
      await cloud_show.save(null, true);
    }

    if (cloud_jokes.length > 0) {
      const jokes_next_id = JSON.parse(await iCloudStorage.getItem('ComedyCompanion:jokes_next_id'));
      await AsyncStorage.setItem('@' + Joke.databaseName() + ':' + Joke.tableName() + '_next_id', JSON.stringify(jokes_next_id));
    }

    if (cloud_set_lists.length > 0) {
      const set_lists_next_id = JSON.parse(await iCloudStorage.getItem('ComedyCompanion:set_lists_next_id'));
      await AsyncStorage.setItem('@' + SetList.databaseName() + ':' + SetList.tableName() + '_next_id', JSON.stringify(set_lists_next_id));
    }

    if (cloud_shows.length > 0) {
      const shows_next_id = JSON.parse(await iCloudStorage.getItem('ComedyCompanion:shows_next_id'));
      await AsyncStorage.setItem('@' + Show.databaseName() + ':' + Show.tableName() + '_next_id', JSON.stringify(shows_next_id));
    }

    await JokeListHelper.refreshJokeList();
    await JokeListHelper.refreshJokeListEmpty();
    await SetListListHelper.refreshSLList();
    await SetListListHelper.refreshSLListEmpty();
    await ShowListHelper.refreshShowList();
    await ShowListHelper.refreshShowListEmpty();

    this.setState({
      showReadConfirm: false,
      readLoadComplete: false,
      reading: false
    });

    alert('Read from iCloud Complete!');
  };

  updateExportEmail = (email) => {
    this.setting._export_email = email;
    this.setting.save();

    this.props.downloadActions.setExportEmail(email);
  };

  sendExportEmail = () => {
    let email_service = new EmailService({
      'email': this.props.downloadState.export_email,
      'email_type': this.props.downloadState.export_email_type
    });
    email_service.sendExportEmail();
  };

  exportEmailTypeButtonClicked = (export_email_type) => {
    this.setting._export_email_type = export_email_type;
    this.setting.save();

    this.props.downloadActions.setExportEmailType(export_email_type);
  };

  render() {
    const {downloadState} = this.props;

    return (
      <View style={[layoutStyles.modal, layoutStyles.centeredFlex]}>
        <View style={layoutStyles.statusBarBuffer}/>
        <View style={layoutStyles.modalContent}>
          <ScrollView>
            {Platform.OS === 'ios' &&
            <View style={[layoutStyles.modalContentSection]}>
              <View style={{borderBottomColor: '#999999', borderBottomWidth: 1, paddingBottom: 5, marginBottom: 10}}>
                <Text style={layoutStyles.settingsSectionTitle}>iCloud Sync <Text
                  style={{fontWeight: '100', fontSize: 10}}>(must be signed into iCloud on device)</Text></Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex: 4, height: 50}}>
                  <Button type="surface" size="large" theme="blue" selfStyle={layoutStyles.confirmButton}
                          onPress={this.confirmWriteToiCloud}>
                    <Text style={{color: '#FFFFFF'}}>Write to iCloud</Text>
                  </Button>
                </View>
                <View style={{flex: 4, height: 50}}>
                  <Button type="surface" size="large" theme="blue"
                          selfStyle={[layoutStyles.confirmButton, {marginLeft: 10}]}
                          onPress={this.confirmReadFromiCloud}>
                    <Text style={{color: '#FFFFFF'}}>Read from iCloud</Text>
                  </Button>
                </View>
                <View style={{flex: 1}} />
              </View>
              <View style={{paddingTop: 5}}>
                <Text style={{fontWeight: '100', fontSize: 10}}>Note: Your audio recordings are not backed up /
                  restored</Text>
              </View>
            </View>
            }
            <View style={[layoutStyles.modalContentSection]}>
              <View style={{borderBottomColor: '#999999', borderBottomWidth: 1, paddingBottom: 5, marginBottom: 10}}>
                <Text style={layoutStyles.settingsSectionTitle}>Email Export <Text
                  style={{fontWeight: '100', fontSize: 10}}>(must have email set up on device)</Text></Text>
              </View>
              <View>
                <Text style={{fontSize: 12, marginBottom: 10}}>Send yourself an email with all of your jokes and set
                  lists detailed. Just enter your email and select a type below and click "Send Email" and it should
                  show up in your inbox momentarily. Note: Formatted emails may look terrible on some Android
                  devices.</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                <Text style={layoutStyles.inputLabel}>Email:</Text>
                <TextInput
                  style={[downloadStyles.exportEmailInput, this.state.export_email_valid ? {} : layoutStyles.errorInput]}
                  underlineColorAndroid='transparent'
                  placeholder="Email Address here..."
                  onChangeText={(text) => {
                    this.updateExportEmail(text)
                  }}
                  autoCapitalize="none"
                  value={downloadState.export_email}/>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                <SegmentedControls
                  options={
                    [{label: 'Formatted', value: 'formatted'},
                      {label: 'Plain Text', value: 'plain_text'}]
                  }
                  onSelection={(export_email_type) => this.exportEmailTypeButtonClicked(export_email_type.value)}
                  selectedOption={downloadState.export_email_type}
                  containerStyle={{flex: 1}}
                  extractText={(option) => option.label}
                  testOptionEqual={(selectedValue, option) => selectedValue === option.value}
                />
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex: 1, height: 50}}>
                  <Button type="surface" size="large" theme="blue" selfStyle={layoutStyles.confirmButton}
                          onPress={this.sendExportEmail}>
                    <Text style={{color: '#FFFFFF'}}>Send Email</Text>
                  </Button>
                </View>
                <View style={{flex: 2}} />
              </View>
              <View style={{paddingTop: 5}}>
                <Text style={{fontWeight: '100', fontSize: 10}}>Note: Your audio recordings are not emailed to you</Text>
              </View>
            </View>
          </ScrollView>
          {this.state.showReadConfirm &&
          <View style={layoutStyles.confirmBox}>
            {this.state.readLoadComplete && !this.state.reading &&
            <View style={{flex: 1, alignSelf: 'center', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{textAlign: 'center'}}>This is what is stored on your iCloud:</Text>
              <Text style={{paddingTop: 25}}>{this.state.cloudJokesCount} Jokes</Text>
              <Text>{this.state.cloudSetListsCount} Set Lists</Text>
              <Text>{this.state.cloudShowsCount} Shows</Text>
              <Text style={{textAlign: 'center', paddingTop: 25, fontWeight: 'bold'}}>ARE YOU SURE YOU WANT TO REPLACE EVERYTHING WITH WHAT IS ON ICLOUD AND LOSE ALL YOUR AUDIO RECORDINGS?</Text>
              <View style={{paddingTop: 25, flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <Button type="surface" size="large" theme="red" selfStyle={layoutStyles.deleteButton}
                          onPress={this.cancelReadFromiCloud}>
                    <Text style={{color: '#FFFFFF', fontWeight: 'bold'}}>NO</Text>
                  </Button>
                </View>
                <View style={{flex: 1, marginRight: 10}}>
                  <Button type="surface" size="large" theme="blue"
                          selfStyle={[layoutStyles.confirmButton, {marginLeft: 10}]} onPress={this.readFromiCloud}>
                    <Text style={{color: '#FFFFFF', fontWeight: 'bold'}}>YES</Text>
                  </Button>
                </View>
              </View>
            </View>
            }
            {!this.state.readLoadComplete && !this.state.reading &&
            <View style={{flex: 1, alignSelf: 'center', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{textAlign: 'center'}}>Preloading iCloud Data</Text>
              <Text style={{textAlign: 'center'}}>Please Wait...</Text>
            </View>
            }
            {this.state.reading &&
            <View style={{flex: 1, alignSelf: 'center', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{textAlign: 'center'}}>Reading from iCloud</Text>
            </View>
            }
          </View>
          }
          {this.state.showWriteConfirm &&
          <View style={layoutStyles.confirmBox}>
            {this.state.writeLoadComplete && !this.state.writing &&
            <View style={{flex: 1, alignSelf: 'center', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{textAlign: 'center'}}>This is what is stored on your device:</Text>
              <Text style={{paddingTop: 25}}>{this.state.localJokesCount} Jokes</Text>
              <Text>{this.state.localSetListsCount} Set Lists</Text>
              <Text>{this.state.localShowsCount} Shows</Text>
              <Text style={{textAlign: 'center', paddingTop: 25, fontWeight: 'bold'}}>ARE YOU SURE YOU WANT TO OVERWRITE EVERYTHING ON ICLOUD? YOUR AUDIO RECORDINGS WILL NOT BE BACKED UP!</Text>
              <View style={{paddingTop: 25, flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <Button type="surface" size="large" theme="red" selfStyle={layoutStyles.deleteButton}
                          onPress={this.cancelWriteToiCloud}>
                    <Text style={{color: '#FFFFFF', fontWeight: 'bold'}}>NO</Text>
                  </Button>
                </View>
                <View style={{flex: 1, marginRight: 10}}>
                  <Button type="surface" size="large" theme="blue"
                          selfStyle={[layoutStyles.confirmButton, {marginLeft: 10}]} onPress={this.writeToiCloud}>
                    <Text style={{color: '#FFFFFF', fontWeight: 'bold'}}>YES</Text>
                  </Button>
                </View>
              </View>
            </View>
            }
            {!this.state.writeLoadComplete && !this.state.writing &&
            <View style={{flex: 1, alignSelf: 'center', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{textAlign: 'center'}}>Preloading Device Data</Text>
              <Text style={{textAlign: 'center'}}>Please Wait...</Text>
            </View>
            }
            {this.state.writing &&
            <View style={{flex: 1, alignSelf: 'center', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{textAlign: 'center'}}>Writing to iCloud</Text>
            </View>
            }
          </View>
          }
          <View style={{ flexDirection: 'row', width: '100%' }}>
            <FooterButton
              onPress={this.close}
              buttonText="Close"
            />
          </View>
        </View>
      </View>
    );
  }
}

export default connect(state => ({
    downloadState: state.download
  }),
  (dispatch) => ({
    routingActions: bindActionCreators(routingActions, dispatch),
    downloadActions: bindActionCreators(downloadActions, dispatch)
  })
)(Download);
