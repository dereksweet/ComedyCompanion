'use strict';

import React, {Component} from 'react';
import { View, Text, ScrollView, TouchableHighlight } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import showDashboardStyles from '../../../../stylesheets/showDashboardStyles';

class SetListViewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jokeViews: {}
    }
  }

  componentDidMount() {
    let jokeViews = {};
    this.props.showState.show._set_list._jokes.forEach((joke) => {
      jokeViews[joke._id] = false
    });

    this.setState({
      jokeViews: jokeViews
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const jokeViewsChanged = this.state.jokeViews !== nextState.jokeViews;

    return jokeViewsChanged;
  }

  render() {
    const { showState } = this.props;

    const jokeClicked = (joke_id) => {
      let newJokeViews = JSON.parse(JSON.stringify(this.state.jokeViews));
      newJokeViews[joke_id] = !newJokeViews[joke_id];

      this.setState({
        jokeViews: newJokeViews
      });
    };

    return (
      <View style={{ flex: 1 }}>
        <View style={ showDashboardStyles.setListHeader }>
          <Text style={ { fontWeight: 'bold', fontSize: 14 } }>Set List for { showState.show._venue }</Text>
        </View>
        <View style={ { flex: 1 } }>
          <ScrollView style={ { flex: 1 } }>
            { showState.show._set_list._jokes.map((joke) => {
              return <View key={ joke._id } style={ { flex: 1, backgroundColor: '#EEEEFF', borderBottomColor: '#CCCCCC', borderBottomWidth: 2 } }>
                <TouchableHighlight onPress={ () => jokeClicked(joke._id) }>
                  <Text style={{ color: '#000000', padding: 10, textAlign: 'center' }}>{joke._name}</Text>
                </TouchableHighlight>
                  { this.state.jokeViews[joke._id] &&
                    <View style={ { backgroundColor: '#EEEEEE', borderTopColor: '#CCCCCC', borderTopWidth: 1, borderBottomColor: '#CCCCCC', borderBottomWidth: 1 } }>
                      <View style={{padding: 10}}>
                        <Text style={ { fontSize: 10 }}>{ joke._notes }</Text>
                      </View>
                    </View>
                  }
              </View>
            })
            }
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default connect(state => ({
    showState: state.show
  }),
  (dispatch) => ({

  })
)(SetListViewer);
