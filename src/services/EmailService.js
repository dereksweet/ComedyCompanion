'use strict';

import React, {Component} from 'react';
import { Platform, AlertIOS } from 'react-native';
import Mailer from 'react-native-mail';
import moment from 'moment';

import Joke from '../models/joke';
import SetList from '../models/set_list';

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
      subject: 'Comedy Companion Export - ' + moment(new Date()).format("YYYY-MM-DD"),
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

    if (this.completion_hash['solid_bits'] && this.completion_hash['in_development_bits']) {
      this.deliverEmail();
    }
  }

  formatJoke(joke, final) {
    let joke_body = '';

    joke_body += '<p>';
    joke_body += '  <b><span style="border-bottom: 1px solid #CCCCCC; color: #333333">' + joke._name + '</span></b><br>';
    joke_body += '  <br>';
    joke_body += '  ' + joke._notes;
    joke_body += '</p>';

    if (!final)
      joke_body += '<hr><hr>';

    return joke_body;
  }

  sendExportEmail() {
    this.solid_bits = '<h2 style="background-color: #EEEEEE; border-bottom: 3px solid #CCCCCC; border-top: 3px solid #CCCCCC; padding: 10px;">Jokes (Solid Bits)</h2>';
    this.in_development_bits = '<br><br><h2 style="background-color: #EEEEEE; border-bottom: 3px solid #CCCCCC; border-top: 3px solid #CCCCCC; padding: 10px;">Jokes (In Development)</h2>';
    this.set_lists = '<br><br><h2 style="background-color: #EEEEEE; border-bottom: 3px solid #CCCCCC; border-top: 3px solid #CCCCCC; padding: 10px;">Set Lists</h2>';

    Joke.where({ '_in_development':'EQ|false'}).then((jokes) => {
      jokes.forEach((joke) => {
        let final = jokes.indexOf(joke) == (jokes.length - 1);
        this.solid_bits += this.formatJoke(joke, final);
      });

      this.setComplete('solid_bits');
    });

    Joke.where({ '_in_development':'EQ|true'}).then((jokes) => {
      jokes.forEach((joke) => {
        let final = jokes.indexOf(joke) == (jokes.length - 1);
        this.in_development_bits += this.formatJoke(joke, final);
      });

      this.setComplete('in_development_bits');
    });
  }

  render() {
    return false;
  }
}
