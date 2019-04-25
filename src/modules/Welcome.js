const welcome = {
  date: function() {
    return new Date();
  },
  today: function() {
    return this.shortToLong(this.date().toDateString());
  },

  day: function() {
    return this.date().getDay();
  },

  nowHour: function() {
    return this.date().getHours();
  },

  welcomeMessage: function(el) {
    return (document.getElementById("welcoming").innerHTML =
      "Good " + el + ",");
  },

  morQuote: function() {
    return (document.getElementById("quotes_text").innerHTML =
      "I opened two gifts this morning. They were my eyes.");
  },

  aftQuote: function() {
    return (document.getElementById("quotes_text").innerHTML =
      "Get busy living or get busy dying. - Stephen King");
  },

  eveQuote: function() {
    return (document.getElementById("quotes_text").innerHTML =
      "Eighty percent of success is showing up. – Woody Allen");
  },

  nowTime: function() {
    if (this.nowHour() >= 5 && this.nowHour() <= 11) {
      this.welcomeMessage("morning");
      this.morQuote();
      this.randomPicGen("mor_1", "mor_2");
    } else if (this.nowHour() >= 12 && this.nowHour() <= 17) {
      this.welcomeMessage("afternoon");
      this.aftQuote();
      this.randomPicGen("after_1", "after_2");
    } else {
      this.welcomeMessage("evening");
      this.eveQuote();
      this.randomPicGen("eve_1", "eve_2");
    }
  },

  randomPicGen: function(pic1, pic2) {
    var randomPic = Math.floor(Math.random() * 2 + 1);

    if (randomPic === 1) {
      document.getElementById("main_pic").style.backgroundImage =
        "linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)), url(images/" +
        pic1 +
        ".jpg";
    } else {
      document.getElementById("main_pic").style.backgroundImage =
        "linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)), url(images/" +
        pic2 +
        ".jpg";
    }
  },

  addAttribute: function() {
    return event.target.getAttribute("day-name");
  }
};

export { welcome };
