import React, {Component} from 'react';

import {store} from '../App';

import * as showListActions from '../actions/showListActions';

import Show from '../models/show';

export default class ShowListHelper extends Component {
  static refreshShowList({venue_filter = null, sort_field = null, sort_order = null} = {}) {
    const showListState = store.getState().show_list;

    const my_venue_filter = venue_filter || showListState.venue_filter;
    const my_sort_field = sort_field || showListState.sort_field;
    const my_sort_order = sort_order || showListState.sort_order;

    Show.where(
      {'_venue': "LIKE|'" + my_venue_filter + "'", '_city': "LIKE|'" + my_venue_filter + "'"},
      'OR',
      my_sort_field,
      my_sort_order
    ).then((shows) => {
      store.dispatch(showListActions.setShowList(shows));
    });
  }

  static refreshShowListEmpty() {
    Show.all().then((shows) => {
      store.dispatch(showListActions.setShowListEmpty(shows.length === 0));
    });
  }
}
