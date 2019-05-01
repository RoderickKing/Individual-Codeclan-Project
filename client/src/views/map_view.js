const PubSub = require("../helpers/pub_sub.js");
const SunCalc = require("suncalc");

class MapView {
  constructor() {
    this.myMap = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 54.397, lng: -3.644 },
      zoom: 8
    });

    this.myMap.addListener("click", event => {
      this.placeMarkerAndPanTo(
        event.latLng.lat(),
        event.latLng.lng(),
        this.myMap
      );
    });
  }

  placeMarkerAndPanTo(lat, lng, myMap) {
    console.log("coord are ", lat, " ", lng);
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(lat, lng),
      map: myMap,
      animation: google.maps.Animation.DROP
    });
    myMap.panTo(marker.position);
  }
}

module.exports = MapView;
