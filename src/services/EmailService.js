'use strict';

import React, {Component} from 'react';
import { Platform, AlertIOS } from 'react-native';
import Mailer from 'react-native-mail';
import moment from 'moment';

import Joke from '../models/joke';
import SetList from '../models/set_list';

import {store} from '../App';

export default class EmailService extends Component {
  constructor(props) {
    super(props);

    this.completion_hash = {
      'solid_bits':false,
      'in_development_bits':false,
      'set_lists':false
    };

    this.email = props['email'];

    this.solid_bits = '';
    this.in_development_bits = '';
    this.set_lists = '';
  }

  deliverEmail() {
    let body = this.solid_bits + this.in_development_bits + this.set_lists;
    body = body.replace(/(\r\n|\n|\r)/g,"<br>");

    Mailer.mail({
      subject: 'Comedy Companion Export - ' + moment(new Date()).format("MMM DD, YYYY"),
      recipients: [this.email],
      body: body,
      isHTML: true
    }, (error, event) => {
      if(error) {
        alert('Could not send mail. Please send a mail to dereksweet@gmail.com');
      }
    });
  }

  setComplete(completed_key) {
    this.completion_hash[completed_key] = true;

    if (this.completion_hash['solid_bits']
      && this.completion_hash['in_development_bits']
      && this.completion_hash['set_lists']) {
      this.deliverEmail();
    }
  }

  formatJoke(joke) {
    let joke_body = '';

    joke_body += '<p>';
    joke_body += '  <b><span style="border-bottom: 1px solid #CCCCCC; color: #333333">' + joke._name + '</span></b><br>';
    joke_body += '  <br>';
    joke_body += '  ' + joke._notes;
    joke_body += '</p>';

    return joke_body;
  }

  formatSetList(set_list) {
    let set_list_body = '';

    set_list_body += '<p>';
    set_list_body += '  <b><span style="border-bottom: 1px solid #CCCCCC; color: #333333; margin-bottom: 5px;">' + set_list._name + '</span></b><br>';
    set_list_body += '  <i>Length: ' + set_list._length + '</i><br>';
    set_list_body += '  <br>';

    set_list._jokes.forEach((joke) => {
      set_list_body += joke._name + '<br>';
    });

    set_list_body += '</p>';

    return set_list_body;
  }

  sendExportEmail() {
    const jokeListState = store.getState().joke_list;
    const setListListState = store.getState().set_list_list;
    
    this.solid_bits = '<h2 style="background-color: #EEEEEE; border-bottom: 3px solid #CCCCCC; border-top: 3px solid #CCCCCC; padding: 10px;">Jokes (Solid Bits)</h2>';
    this.in_development_bits = '<br><br><h2 style="background-color: #EEEEEE; border-bottom: 3px solid #CCCCCC; border-top: 3px solid #CCCCCC; padding: 10px;">Jokes (In Development)</h2>';
    this.set_lists = '<br><br><h2 style="background-color: #EEEEEE; border-bottom: 3px solid #CCCCCC; border-top: 3px solid #CCCCCC; padding: 10px;">Set Lists</h2>';

    Joke.where({ '_in_development':'EQ|false'},'AND', jokeListState.sort_field, jokeListState.sort_order).then((jokes) => {
      jokes.forEach((joke) => {
        this.solid_bits += this.formatJoke(joke);

        if (jokes.indexOf(joke) != (jokes.length - 1)) {
          this.solid_bits += '<hr><hr>'
        }
      });

      this.setComplete('solid_bits');
    });

    Joke.where({ '_in_development':'EQ|true'},'AND', jokeListState.sort_field, jokeListState.sort_order).then((jokes) => {
      jokes.forEach((joke) => {
        this.in_development_bits += this.formatJoke(joke);

        if (jokes.indexOf(joke) != (jokes.length - 1)) {
          this.in_development_bits += '<hr><hr>'
        }
      });

      this.setComplete('in_development_bits');
    });

    SetList.all(setListListState.sort_field, setListListState.sort_order).then((set_lists) => {
      set_lists.forEach((set_list) => {
        this.set_lists += this.formatSetList(set_list);

        if (set_lists.indexOf(set_list) != (set_lists.length - 1)) {
          this.set_lists += '<hr><hr>'
        }
      });

      this.setComplete('set_lists');
    });
  }

  render() {
    return false;
  }
}
