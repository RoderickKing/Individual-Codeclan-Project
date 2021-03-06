const RequestHelper = require("../helpers/request_helper.js");
const PubSub = require("../helpers/pub_sub.js");

class Location {
  constructor() {
    this.data = [];
  }

  bindEvents() {
    //takes location index from users selection
    //then finds the location by index and publishes to location_view.js
    PubSub.subscribe("Location:change-location", event => {
      const newLocationIndex = event.detail;
      const newLocation = this.data[newLocationIndex];
      PubSub.publish("Location:location-selection-ready", newLocation);
    });

    PubSub.subscribe("Form-View:Ready-add-new-location", event => {
      const newLocation = event.detail;
      this.postLocation(newLocation);
    });
  }
  //gets data from backend and publishes location data
  getData() {
    const url = "http://localhost:3000/photoApp";
    const request = new RequestHelper(url);
    request
      .get()
      .then(data => {
        this.data = data;

        PubSub.publish("Location:location-data-loaded", this.data);
      })
      .catch(message => {
        console.error(message);
      });
  }

  postLocation(char) {
    const url = `http://localhost:3000/photoApp`;
    const request = new RequestHelper(url);
    request
      .post(char)
      .then(location => {
        this.data = location;
        PubSub.publish("Location:location-data-loaded", location);
      })
      .catch(console.error);
  }
}

module.exports = Location;
