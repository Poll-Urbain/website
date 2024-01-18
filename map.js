
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
      this.dict = {};
    }
}

class Vote {
  constructor(site, user, characteritic) {
    this.site = site;
    this.user = user;
    this.characteritic = characteritic;
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
        let user = new User("Alan", "4 rue d'auge");
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

function computeVoteValue(vote, rankBuilding, rankProject) {

  d = distance(vote.site.coordinates, vote.user.coordinates)
  value = 1/d * computeWeight(rankBuilding) * computeWeight(rankProject); // TO change with dict
}
