//import * as fs from 'fs';

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


function readSitesFromJSON(jsonName) {
  const fs = require('fs');
  fs.readFile(jsonName + '.json', 'utf-8', function (err, data) {
    if (err) throw err;
    var sites = new Site();
    sites = JSON.parse(data);
  
    sites.forEach((element) => console.log(element));
  });
}

function distance(coord1, coord2) {
  const r = 6371e3; // meter
  const p = Math.PI / 180;

  const a = 0.5 - Math.cos((coord2.lat - coord1.lat) * p) / 2
                + Math.cos(coord1.lat * p) * Math.cos(coord2.lat * p) *
                  (1 - Math.cos((coord2.lon - coord1.lon) * p)) / 2;

  return 2 * r * Math.asin(Math.sqrt(a));
}


/*
function distance(coord1, coord2) {
    var φ1 = coord.lat * Math.PI/180; // φ, λ in radians
    var φ2 = coord2.lat * Math.PI/180;
    var Δφ = (coord2.lat - coord1.lat) * Math.PI/180;
    var Δλ = (coord2.lon - coord1.lon) * Math.PI/180;
    
    var haversine = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c; // in metres
    return d;
}*/

