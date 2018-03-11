'use strict';

import React, {Component} from 'react';

import * as jokeListActions from '../actions/jokeListActions';

import Joke from '../models/joke';

import {store} from '../App';

export default class JokeListHelper extends Component {
    static refreshJokeList({ name_filter = null, in_development_filter = null, sort_field = null, sort_order = null } = {}) {
        const jokeListState = store.getState().joke_list;

        const my_name_filter = name_filter || jokeListState.name_filter;
        const my_in_development_filter = in_development_filter || jokeListState.in_development;
        const my_sort_field = sort_field || jokeListState.sort_field;
        const my_sort_order = sort_order || jokeListState.sort_order;

        Joke.where(
            { '_name': "LIKE|'" + my_name_filter + "'", '_in_development':'EQ|' + my_in_development_filter.toString() },
            'AND',
            my_sort_field,
            my_sort_order
        ).then((jokes) => {
            store.dispatch(jokeListActions.setJokeList(jokes));
        });
    }

    static refreshJokeListEmpty() {
        Joke.all().then((jokes) => {
            store.dispatch(jokeListActions.setJokeListEmpty(jokes.length === 0));
        });
    }

    static refreshJokeListSelector({ name_filter = null, in_development_filter = null, sort_field = null, sort_order = null } = {}) {
        const jokeListState = store.getState().joke_list;
        const setListState = store.getState().set_list;

        const my_name_filter = name_filter || jokeListState.name_filter_selector;
        const my_in_development_filter = in_development_filter || jokeListState.in_development_selector;
        const my_sort_field = sort_field || jokeListState.sort_field;
        const my_sort_order = sort_order || jokeListState.sort_order;

        Joke.where(
          { '_name': "LIKE|'" + my_name_filter + "'", '_in_development':'EQ|' + my_in_development_filter.toString() },
          'AND',
          my_sort_field,
          my_sort_order
        ).then((jokes) => {
            let finalJokes = [];

            if (setListState.set_list) {
              for (let i = 0; i < jokes.length; i++){
                if (!setListState.set_list.containsJoke(jokes[i])) {
                  finalJokes.push(jokes[i]);
                }
              }
            }
            else {
              finalJokes = jokes;
            }

            store.dispatch(jokeListActions.setJokeListSelector(finalJokes));
        });
    }
}
