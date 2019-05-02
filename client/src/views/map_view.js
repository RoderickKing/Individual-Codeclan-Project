const PubSub = require("../helpers/pub_sub.js");

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
    var coords = [];
    coords[0] = lat;
    coords[1] = lng;

    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(lat, lng),
      map: myMap,
      animation: google.maps.Animation.DROP
    });
    myMap.panTo(marker.position);
    PubSub.publish("Location:add-location", coords);
  }
}

module.exports = MapView;
