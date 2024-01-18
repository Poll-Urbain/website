
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
      this.characteriticsVote = {};
    }
}

class Vote {
  constructor(site, user, characteritic) {
    this.site = site;
    this.user = user;
    this.characteritic = characteritic;
  }

  computeVoteValue() {
    var totalVote;
    d = distance(this.site.coordinates, this.user.coordinates)
    for(elm of this.site.characteriticsVote) {
      totalVote += this.site.characteriticsVote[elm];
    }
    value = 1/(d+1) * this.site.characteriticsVote[this.characteritic]/totalVote * computeWeight(rankBuilding) * computeWeight(rankProject); 

    return value;
  }
}

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

class User {
  constructor(name, address) {
    this.name = name;
    this.address = address;
    this.coordinates = null;
  }

  async fetchCoordinates() {
    const coords = await geocodeAddress(this.address);
    this.coordinates = coords;
    return coords;
  }
}

function readSitesFromJSON(jsonName) {
  return fetch(jsonName + '.json')
      .then(response => response.json())
      .then(jsonData => {
        var userDataString = localStorage.getItem("userData");
        var userData = JSON.parse(userDataString);
        var userAddress = userData.address;
        var userName = userData.name;
        let user = new User(userName, userAddress);
        return user.fetchCoordinates().then(() => {
          let sites = [];
          for (let site of jsonData.projects) {
            sites.push(site);
          }
          return sites;
        });
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

function computeWeight(i){
  return 1 + 0.5 * Math.exp(-i);
}

function getBuildingList(){
  // TO DO
  //getElementById(eefpzihgiu);
  return [1,2,0];
}

function getCharacteristicList(k){ // Building number k of the zone
  // TO DO 
  // getElementById(qsfvpiq);
  return [0,2,1];
}


