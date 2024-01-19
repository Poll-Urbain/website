
const R = 6371e3; // Earth radius meters


/****************************
 *Coordinates
 *  Longitude(float)
 *  Latitude(float)
 ***************************/
class Coordinates {
    constructor(lat, lon) {
        this.lat = lat;
        this.lon = lon;
    }
}

/****************************
 *Renovation Site
 *  name(string) : eventual building name
 *  address(string) : postal address
 *  coordinates(object)
 *  imageName(string) : name of the original building image
 *  characteristicsVote(dictionnary<string,int>) : Compile all votes toward 
 *                                                 a characteristic on the given site
 ***************************/
class Site {
    constructor(coordinates) {
      this.name = null;
      this.address = null;
      this.coordinates = coordinates;
      this.imageName = null;
      this.characteriticsVote = {};
    }
}

/****************************
 *Vote
 *  site(object) : site user is voting for
 *  user(object) : user who votes
 *  characteritic(string) : characteritic user is voting for 
 ***************************/
class Vote {
  constructor(site, user, characteritic) {
    this.site = site;
    this.user = user;
    this.characteritic = characteritic;
  }

/****************************
 *Compute the value of user's vote considering some information :
 *  Distance between user's address and site's address
 *  Site's locals priority
 *  User's preferences
 *return :
 *   Float voteValue
 ***************************/
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

/****************************
 *Decode an address into geographical coordinates (long/lat)
 *parameters :
 *   String address
 *return :
 *   Coordinates addressCoord
 ***************************/
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

/****************************
 *User
 *  name(String) : User's name
 *  address(String) : User's postal address
 *  coordinates(Object) : User's address coordinates
 ***************************/
class User {
  constructor(name, address) {
    this.name = name;
    this.address = address;
    this.coordinates = null;
  }
coordinates
  async fetchCoordinates() {
    const coords = await geocodeAddress(this.address);
    this.coordinates = coords;
    return coords;
  }
}

/****************************
 *Read all renovation sites stored in a JSON file
 *parameters :
 *   String jsonName (w/o extension .json)
 *return :
 *   Sites[] sites
 ***************************/
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

/****************************
 *Compute the distance between two points with coordinates
 *parameters :
 *   Coordinates Point1
 *   Coordinates Point2
 *return :
 *   Float distance
 ***************************/
function distance(point1, point2) {
  const r = 6371e3; // meter
  const p = Math.PI / 180;

  const a = 0.5 - Math.cos((point2.lat - point1.lat) * p) / 2
                + Math.cos(point1.lat * p) * Math.cos(point2.lat * p) *
                  (1 - Math.cos((point2.lon - point1.lon) * p)) / 2;

  return 2 * r * Math.asin(Math.sqrt(a));
}

/****************************
 *Compute vote's weight considering user's preferences
 *parameters :
 *   Int voteRank
 *return :
 *   Float voteValue
 ***************************/
function computeWeight(voteRank){
  return 1 + 0.5 * Math.exp(-voteRank);
}




