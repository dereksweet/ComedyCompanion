import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux';

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

  jokeClicked = (joke_id) => {
    let newJokeViews = JSON.parse(JSON.stringify(this.state.jokeViews));
    newJokeViews[joke_id] = !newJokeViews[joke_id];

    this.setState({
      jokeViews: newJokeViews
    });
  };

  render() {
    const {showState} = this.props;

    return (
      <View style={{flex: 1}}>
        <View style={showDashboardStyles.setListHeader}>
          <Text style={{fontWeight: 'bold', fontSize: 14}}>Set List for {showState.show._venue}</Text>
        </View>
        <View style={{flex: 1}}>
          <ScrollView style={{flex: 1}}>
            {showState.show._set_list._jokes.map((joke) => {
              return <View key={joke._id} style={showDashboardStyles.setListView}>
                <TouchableHighlight onPress={() => this.jokeClicked(joke._id)}>
                  <Text style={showDashboardStyles.jokeName}>{joke._name}</Text>
                </TouchableHighlight>
                {this.state.jokeViews[joke._id] &&
                <View style={showDashboardStyles.jokeNotesView}>
                  <View style={{padding: 10}}>
                    <Text style={{fontSize: 10}}>{joke._notes}</Text>
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
