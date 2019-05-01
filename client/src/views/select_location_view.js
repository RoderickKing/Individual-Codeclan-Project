const PubSub = require("../helpers/pub_sub.js");

class SelectLocationView {
  constructor() {
    this.element = document.querySelector("#location-list");
  }

  //subscribes to location.js to recieve all location data
  //then passes data into selectLocationList() as argument
  bindEvents() {
    PubSub.subscribe("Location:location-data-loaded", event => {
      const allLocations = event.detail;

      this.selectLocationList(allLocations);
    });
    //listens for change in location selection from dropdown list and
    //publishes the index of the new location back to location.js
    this.element.addEventListener("change", event => {
      const selectIndex = event.target.value;
      PubSub.publish("Location:change-location", selectIndex);
    });
  }

  //creates option/dropdown menu displaying Location name
  //and sets value as the Location index
  selectLocationList(locationData) {
    locationData.forEach((location, index) => {
      const option = document.createElement("option");
      option.textContent = location.placename;
      option.value = index;
      this.element.appendChild(option);
    });
  }
}

module.exports = SelectLocationView;
