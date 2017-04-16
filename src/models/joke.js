export default class Joke {
  static get className() {
    return "Joke";
  }

  constructor(
    id = -1,
    in_development = false,
    name = "",
    notes = "")
  {
    this._id             = id;
    this._in_development = in_development;
    this._name           = name;
    this._notes          = notes;
  }

  save() {
    console.log('saving joke');
    // if (this._id == -1) {
    //   Joke.require(Joke);
    //   Joke.restore('/Joke/*').then((jokes) => {
    //     let max_id = 1;
    //     jokes.forEach((joke) => {
    //       if (joke._id >= max_id) {
    //         max_id = joke._id + 1;
    //       }
    //     });
    //     this._id = max_id;
    //     this.store('/Joke/' + this._id.toString());
    //   });
    // } else {
    //   this.store('/Joke/' + this._id.toString());
    // }
  }
}

Joke.get = function(id) {
  console.log('getting joke');
  // Joke.require(Joke);
  // return Joke.restore('/Joke/' + id.toString()).then((joke) => {
  //   return joke;
  // });
};
