class PortfolioPage {
  title;
  description;
  /// Should be:{title:string,file:string}
  playlist = [];
  /// Stores the index of the current howl
  index = 0;

  // Gets the current howl(sound player)
  get howl() {
    let _p = this.playlist[this.index];

    if (_p.howl == null || _p.howl == undefined) {
      // Setup howl
      _p.howl = new Howl({
        src: _p.file,
      });
    }

    console.log(_p.howl);
    return _p.howl;
  }

  constructor({ title, description, playlist }) {
    this.title = title;
    this.description = description;
    this.playlist = playlist;

    this.setHtml();
  }

  static fromJson(json) {
    let _p = new PortfolioPage({
      title: json.title,
      description: json.description,
      playlist: json.playlist,
    });
    return _p;
  }

  toJson() {
    return this;
    return {
      title: this.title,
      description: this.description,
      playlist: this.playlist,
    };
  }

  play() {
    var self = this;
    // Dont play if playing
    if (!self.howl.playing()) {
      self.howl.play();
    }
  }

  pause() {
    if (this.howl != null) {
      this.howl.pause();
    }
  }

  next() {
    // Stop the the current howl
    this.howl.stop();
    this.index++;
    // Play the next howl
    this.howl.play();
    //TODO loop?
  }

  seek(index) {
    // Stop the the current howl
    this.howl.stop();
    this.index = index;
    // Play the howl
    this.howl.play();
  }

  // Sets this portfolio items html
  setHtml() {
    //TODO setup html and bind elements(BUttOns)
  }
}

let testPage;

function _init() {
  console.log("Init");

  // Get portfolio data
  fetch("/data/portfolio.json")
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
      let json = JSON.parse(data);
      json.items.forEach((itemJson) => {
        testPage = PortfolioPage.fromJson(itemJson);
        console.log(JSON.stringify(testPage));
      });
    });
  //
}
_init();
