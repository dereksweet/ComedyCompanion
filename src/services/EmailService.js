import React, {Component} from 'react';
import Mailer from 'react-native-mail';
import moment from 'moment';

import {store} from '../App';

import Joke from '../models/joke';
import SetList from '../models/set_list';

export default class EmailService extends Component {
  constructor(props) {
    super(props);

    this.completion_hash = {
      'solid_bits': false,
      'in_development_bits': false,
      'set_lists': false
    };

    this.email = props['email'];
    this.email_type = props['email_type'];

    this.solid_bits = '';
    this.in_development_bits = '';
    this.set_lists = '';
  }

  deliverEmail() {
    let body = this.solid_bits + this.in_development_bits + this.set_lists;

    if (this.email_type === 'formatted') {
      body = body.replace(/(\r\n|\n|\r)/g, "<br>");
    }

    Mailer.mail({
      subject: 'Comedy Companion Export - ' + moment(new Date()).format("MMM DD, YYYY"),
      recipients: [this.email],
      body: body,
      isHTML: this.email_type === 'formatted'
    }, (error, event) => {
      if (error) {
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

    if (this.email_type === 'formatted') {
      joke_body += '<p>';
      joke_body += '  <b><span style="border-bottom: 1px solid #CCCCCC; color: #333333">' + joke._name + '</span></b><br>';
      joke_body += '  <br>';
      joke_body += '  ' + joke._notes;
      joke_body += '</p>';
    } else {
      joke_body += "\n" + joke._name;
      joke_body += "\n------------------\n\n";
      joke_body += joke._notes;
      joke_body += "\n"
    }

    return joke_body;
  }

  formatSetList(set_list) {
    let set_list_body = '';

    if (this.email_type === 'formatted') {
      set_list_body += '<p>';
      set_list_body += '  <b><span style="border-bottom: 1px solid #CCCCCC; color: #333333; margin-bottom: 5px;">' + set_list._name + '</span></b><br>';
      set_list_body += '  <i>Length: ' + set_list._length + '</i><br>';
      set_list_body += '  <br>';

      set_list._jokes.forEach((joke) => {
        set_list_body += joke._name + '<br>';
      });

      set_list_body += '</p>';
    } else {
      set_list_body += "\n" + set_list._name;
      set_list_body += "\n------------------\n\n";

      set_list._jokes.forEach((joke) => {
        set_list_body += joke._name + "\n";
      });

      set_list_body += "\n"
    }

    return set_list_body;
  }

  sendExportEmail() {
    const jokeListState = store.getState().joke_list;
    const setListListState = store.getState().set_list_list;

    if (this.email_type === 'formatted') {
      this.solid_bits = '<h2 style="background-color: #EEEEEE; border-bottom: 3px solid #CCCCCC; border-top: 3px solid #CCCCCC; padding: 10px;">Jokes (Solid Bits)</h2>';
      this.in_development_bits = '<br><br><h2 style="background-color: #EEEEEE; border-bottom: 3px solid #CCCCCC; border-top: 3px solid #CCCCCC; padding: 10px;">Jokes (In Development)</h2>';
      this.set_lists = '<br><br><h2 style="background-color: #EEEEEE; border-bottom: 3px solid #CCCCCC; border-top: 3px solid #CCCCCC; padding: 10px;">Set Lists</h2>';
    } else {
      this.solid_bits = "======================\nJokes (Solid Bits)\n======================\n";
      this.in_development_bits = "\n\n======================\nJokes (In Development)\n======================\n";
      this.set_lists = "\n\n======================\nSet Lists\n======================\n";
    }

    Joke.where({'_in_development': 'EQ|false'}, 'AND', jokeListState.sort_field, jokeListState.sort_order).then((jokes) => {
      jokes.forEach((joke) => {
        this.solid_bits += this.formatJoke(joke);

        if (jokes.indexOf(joke) !== (jokes.length - 1)) {
          if (this.email_type === 'formatted') {
            this.solid_bits += '<hr><hr>'
          } else {
            this.solid_bits += "\n-----\n";
            this.solid_bits += "-----\n";
          }
        }
      });

      this.setComplete('solid_bits');
    });

    Joke.where({'_in_development': 'EQ|true'}, 'AND', jokeListState.sort_field, jokeListState.sort_order).then((jokes) => {
      jokes.forEach((joke) => {
        this.in_development_bits += this.formatJoke(joke);

        if (jokes.indexOf(joke) !== (jokes.length - 1)) {
          if (this.email_type === 'formatted') {
            this.in_development_bits += '<hr><hr>'
          } else {
            this.in_development_bits += "-----\n";
            this.in_development_bits += "-----\n";
          }
        }
      });

      this.setComplete('in_development_bits');
    });

    SetList.all(setListListState.sort_field, setListListState.sort_order).then((set_lists) => {
      set_lists.forEach((set_list) => {
        this.set_lists += this.formatSetList(set_list);

        if (set_lists.indexOf(set_list) !== (set_lists.length - 1)) {
          if (this.email_type === 'formatted') {
            this.set_lists += '<hr><hr>'
          } else {
            this.set_lists += "-----\n";
            this.set_lists += "-----\n";
          }
        }
      });

      this.setComplete('set_lists');
    });
  }
}
