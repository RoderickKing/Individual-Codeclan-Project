const Location = require("./models/location.js");
const SelectLocationView = require("./views/select_location_view.js");
const LocationView = require("./views/location_view.js");
const MapView = require("./views/map_view.js");

document.addEventListener("DOMContentLoaded", () => {
  console.log("JavaScript Loaded");

  const myMap = new MapView();

  const locationContainer = document.querySelector("#location-container");
  const locationView = new LocationView(locationContainer);
  locationView.bindEvents();

  const selectLocationView = new SelectLocationView();
  selectLocationView.bindEvents();

  const location = new Location();
  location.bindEvents();
  location.getData();
});
