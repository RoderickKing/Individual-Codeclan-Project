const PubSub = require("../helpers/pub_sub.js");
var SunCalc = require("suncalc");

class LocationView {
  constructor(container) {
    this.container = container;
  }

  bindEvents() {
    PubSub.subscribe("Location:location-selection-ready", event => {
      const location = event.detail;
      console.log("data", location);
      this.render(location);
    });
  }

  render(location) {
    console.log("inside render");
    this.clearLocations();
    const card1 = this.createNotesCard(location);
    this.container.appendChild(card1);
    const card2 = this.createSunriseTimeCard(location);
    this.container.appendChild(card2);
    const card3 = this.createSunsetTimeCard(location);
    this.container.appendChild(card3);
  }

  clearLocations() {
    this.container.innerHTML = "";
  }

  createNotesCard(location) {
    const meta = document.createElement("div");
    meta.classList.add("meta");
    meta.innerHTML = `<span><br><b>Notes</b> ${
      location.photo_notes
    } <br><br>Lat.: ${location.lat} <br> Long. :${location.long}</span>`;

    const header = document.createElement("div");
    header.classList.add("header");
    header.innerHTML = `Data for ${location.placename}`;

    const content = document.createElement("div");
    content.classList.add("content");

    const card = document.createElement("div");

    card.classList.add("ui");

    // keep below

    card.classList.add("card");

    content.appendChild(header);
    content.appendChild(meta);
    card.appendChild(content);

    return card;
  }

  createSunriseTimeCard(location) {
    var the_times = {};
    the_times = this.derive_times(location.lat, location.long);

    const sunrise =
      `<br><b>Sunrise</b>` +
      the_times.sunrise +
      `<br><br><b>Golden Hour End</b>` +
      the_times.goldenHourEnd +
      `<br>`;

    const meta = document.createElement("div");
    meta.classList.add("meta");

    meta.innerHTML = sunrise;

    const header = document.createElement("div");
    header.classList.add("header");
    header.innerHTML = `Sunrise Data for ${location.placename}`;

    const content = document.createElement("div");
    content.classList.add("content");

    const card = document.createElement("div");

    card.classList.add("ui");

    // keep below

    card.classList.add("card");

    content.appendChild(header);
    content.appendChild(meta);
    card.appendChild(content);

    return card;
  }
  createSunsetTimeCard(location) {
    var the_times = {};
    the_times = this.derive_times(location.lat, location.long);

    const sunset =
      `<br><b>Sunset</b>` +
      the_times.sunset +
      `<br><br><b>Golden Hour End</b>` +
      the_times.goldenHour;

    const meta = document.createElement("div");
    meta.classList.add("meta");

    meta.innerHTML = sunset;

    const header = document.createElement("div");
    header.classList.add("header");
    header.innerHTML = `Sunset Data for ${location.placename}`;

    const content = document.createElement("div");
    content.classList.add("content");

    const card = document.createElement("div");

    card.classList.add("ui");

    // keep below

    card.classList.add("card");

    content.appendChild(header);
    content.appendChild(meta);
    card.appendChild(content);

    return card;
  }

  derive_times(lat, long) {
    var times = SunCalc.getTimes(new Date(), lat, long);
    return times;
  }
  //
  // // get position of the sun (azimuth and altitude) at today's sunrise
  // var sunrisePos = SunCalc.getPosition(times.sunrise, lat, long);
  // // get position of the sun (azimuth and altitude) at today's sunset
  // //console.dir(sunrisePos);
  //
  // //var sunriseAzimuth = (sunrisePos.azimuth * 180) / Math.PI;
  // var sunriseAzimuth = sunrisePos;
  //
  // console.dir(sunrisePos);
  // var sunsetPos = SunCalc.getPosition(times.sunset, lat, long);
}
module.exports = LocationView;
