const Location = require("../models/location.js");
const PubSub = require("../helpers/pub_sub.js");

class FormView {
  constructor(element) {
    this.element = element;
    this.coords = null;
  }

  bindEvents() {
    PubSub.subscribe("Location:add-location", evt => {
      console.log(evt.detail);
      this.coords = evt.detail;
    });

    this.element.addEventListener("submit", event => {
      event.preventDefault();
      var lat = this.coords[0];
      var lng = this.coords[1];
      const newLocation = {};

      newLocation.placename = event.target["placename"].value;
      newLocation.photo_notes = event.target["photo_notes"].value;
      newLocation.lat = lat;
      newLocation.lng = lng;

      PubSub.publish("Form-View:Ready-add-new-location", newLocation);

      this.element.reset();
    });
  }
}
module.exports = FormView;
