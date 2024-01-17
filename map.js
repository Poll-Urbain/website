import * as fs from 'fs';

const R = 6371e3; // Earth radius metres

class Coordinates {
    constructor(lat, lon) {
        this.lat = lat;
        this.lon = lon;
    }
}

class Site {
    constructor(coordinates) {
      this.name = null;
      this.address = null;
      this.coordinates = coordinates;
      this.imageName = null;
      this.score = null;
      this.characteritics = new Array();
    }
}
  
window.addEventListener('load', function(){
  readSitesFromJSON("projects");
});

function readSitesFromJSON(jsonName) {
  const fs = require('fs');
  fs.readFile(jsonName + '.json', 'utf-8', function (err, data) {
    if (err) throw err;
    var sites = new Site();
    sites = JSON.parse(data);
  
    sites.forEach((element) => console.log(element));
  });
}



function distance(site1, site2) {
    var φ1 = site1.Coordinates.lat * Math.PI/180; // φ, λ in radians
    var φ2 = site2.Coordinates.lat * Math.PI/180;
    var Δφ = (site2.Coordinates.lat - site1.Coordinates.lat) * Math.PI/180;
    var Δλ = (site2.Coordinates.lon - site1.Coordinates.lon) * Math.PI/180;
    
    var haversine = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c; // in metres
}

