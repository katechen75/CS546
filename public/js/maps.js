// Derived from the Google Maps JS API documentation
const zipcodes = require("zipcodes");
let script = document.createElement("script");
script.src =
  "https://maps.googleapis.com/maps/api/js?key=AIzaSyBEPhJJDBFNxN16BquzYkvcwG0ib-z5XoA&callback=initMap";
script.defer = true;
script.async = false;
let currentLoc = zipcodes.lookup(posts.itemLocation);
let cityState = currentLoc.city + ", " + currentLoc.state;
let latitude = currentLoc.latitude;
let longitude = currentLoc.longitude;

window.initMap = function () {
  let gmap = new google.maps.Map(document.getElementById("gmap"), {
    center: { lat: latitude, lng: longitude },
    zoom: 16,
  });
  let marker = new google.maps.Marker({
    position: { lat: latitude, lng: longitude },
    map: gmap,
  });
};

document.head.appendChild(script);
