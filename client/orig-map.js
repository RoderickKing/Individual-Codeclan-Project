document.addEventListener("DOMContentLoaded", function() {});

var map;

function initMap() {
  const static_data = [
    {
      lat: 53.81768,
      lng: -1.537657
    },
    {
      lat: 53.790123,
      lng: -1.53243
    },
    {
      lat: 53.756745,
      lng: -1.5309087
    },
    {
      lat: 53.6474675,
      lng: -1.49564554
    },
    {
      lat: 53.69123456,
      lng: -1.6545466
    }
  ];

  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8
  });

  plotMarkers(static_data);

  map.addListener("click", function(event) {
    placeMarkerAndPanTo(event.latLng.lat(), event.latLng.lng(), map);
  });
}

var markers;
var bounds;

function plotMarkers(m) {
  markers = [];
  bounds = new google.maps.LatLngBounds();

  m.forEach(function(marker) {
    var position = new google.maps.LatLng(marker.lat, marker.lng);

    markers.push(
      new google.maps.Marker({
        position: position,
        map: map,
        animation: google.maps.Animation.DROP
      })
    );

    bounds.extend(position);
  });

  map.fitBounds(bounds);
}

function placeMarkerAndPanTo(lat, lng, map) {
  console.log(lat, lng);
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(lat, lng),
    map: map
  });

  map.panTo(marker.position);
}
