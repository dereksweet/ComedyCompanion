import React, {Component} from 'react';

import {store} from '../App';

import * as setListListActions from '../actions/setListListActions';

import SetList from '../models/set_list';

export default class SetListListHelper extends Component {
  static refreshSLList({sort_field = null, sort_order = null} = {}) {
    const setListListState = store.getState().set_list_list;

    const my_sort_field = sort_field || setListListState.sort_field;
    const my_sort_order = sort_order || setListListState.sort_order;

    SetList.all(
      my_sort_field,
      my_sort_order
    ).then((set_lists) => {
      store.dispatch(setListListActions.setSLList(set_lists));
    });
  }

  static refreshSLListEmpty() {
    SetList.all().then((set_lists) => {
      store.dispatch(setListListActions.setSLListEmpty(set_lists.length === 0));
    });
  }
}
