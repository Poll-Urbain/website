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
      this.characteritics = new Array(); //disctionnary 
    }
}

class Vote {
  constructor(site, user, characteritic) {
    this.site = site;
    this.user = user;
    this.characteritic = characteritic;
  }
}

class User {
  constructor(name, address) {
    this.name = name;
    this.address = address;
    this.coordinates = null;
    this.init()
  }


  // Async method to initialize the coordinates
  init() {
    return geocodeAddress(this.address).then(coords => {
      this.coordinates = coords;
    });
  }
}




function readSitesFromJSON(jsonName) {
  return fetch(jsonName + '.json')
      .then(response => response.json())
      .then(jsonData => {
  
        //user = new User("alan", "6 Boulevard Maréchal Juin, 14000 Caen" );
        //console.log(user.coordinates);
        let sites = [];
        for(let site of jsonData.projects){
          sites.push(site);
        }
        return sites;
      });
}
/*
function addPins(sites){
    sites.forEach(project => {
        marker[i] = L.marker([project.coordinates.latitude, project.coordinates.longitude]).addTo(map);
        htmlPopup = "<div class='popup-content'>" +
      "<b>"+project.name +"</b><br>" +
      "Caractéristiques (proba):"+ project.characteristics+"<br>" +
      '<div><img src="images/'+project.photo_name+'" alt="'+ project.name +'Image"></div>' + //style="'+'"width:100%; height:auto; maxwidth:100px">' +
      '<br><button onclick="onButtonClick()">Voter pour</button>' +
      '<br><label for="dropdown">Choose an option:</label>' +
      '<select id="dropdown">' +
        '<option value="Chaleur">Chaleur</option>' +
        '<option value="Inondation">Inondation</option>' +
        '<option value="Air">Air</option>' +
      '</select>' +
      "</div>";

        marker[i].bindPopup(htmlPopup);
        
        /*console.log("Project Name: " + project.name);
        console.log("Address: " + project.address);
        console.log("Coordinates: " + project.coordinates.latitude + ", " + project.coordinates.longitude);
        console.log("Score: " + project.score);
        console.log("Photo Name: " + project.photo_name);
        console.log("Characteristics: " + project.characteristics.join(", "));
        console.log("\n");
        i++;
      });
}*/

function distance(coord1, coord2) {
  const r = 6371e3; // meter
  const p = Math.PI / 180;

  const a = 0.5 - Math.cos((coord2.lat - coord1.lat) * p) / 2
                + Math.cos(coord1.lat * p) * Math.cos(coord2.lat * p) *
                  (1 - Math.cos((coord2.lon - coord1.lon) * p)) / 2;

  return 2 * r * Math.asin(Math.sqrt(a));
}

/*function computeVoteValue(vote) {

  d = distance(vote.site.coordinates, vote.user.coordinates)
  value = 1/d * vote.site.Nbp1/vote.site.Nbp; // TO change with dict
}*/

// Function to geocode the entered address and display coordinates with parameters
function geocodeAddress(address) {

  // Replace 'YOUR_OPENCAGE_API_KEY' with your actual OpenCage API key
  var apiKey = 'a5d1c0cbcabb4a1a8f506c8415d80cb3';
  var geocodeUrl = 'https://api.opencagedata.com/geocode/v1/json?q=' + encodeURIComponent(address) + '&key=' + apiKey;

  return fetch(geocodeUrl)
    .then(response => response.json())
    .then(data => {
      if (data.results.length > 0) {
        return data.results[0].geometry; // return the coordinates
      } else {
        throw new Error("Geocoding failed. Please enter a valid address.");
      }
    });
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

