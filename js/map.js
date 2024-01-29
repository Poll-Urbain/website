const R = 6371e3; // Earth radius meters


/****************************
 *Coordinates
 *  Longitude(float)
 *  Latitude(float)
 ***************************/
class Coordinates {
    constructor(lat, lon) {
      this.lat = parseFloat(lat);
      this.lon = parseFloat(lon);
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
     computeVoteValue(rankBuilding, rankProject) {
      var totalVote;
      const siteCoord = new Coordinates(this.site.coordinates.latitude, this.site.coordinates.longitude);
      var d = distance(siteCoord, this.user.coordinates);
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
  
  async fetchCoordinates() {
    const coords = await geocodeAddress(this.address);
    this.coordinates = new Coordinates(coords.lat, coords.lng);
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
      
        let sites = [];
        for (let site of jsonData.projects) {
          sites.push(site);
        }
        return sites;
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
  const p = Math.PI / 180;

  const a = 0.5 - Math.cos((point2.lat - point1.lat) * p) / 2
    + Math.cos(point1.lat * p) * Math.cos(point2.lat * p) *
    (1 - Math.cos((point2.lon - point1.lon) * p)) / 2;
  console.log("distance : " + 2 * R * Math.asin(Math.sqrt(a)));
  return 2 * R * Math.asin(Math.sqrt(a));
}

/****************************
 *Compute vote's weight considering user's preferences
 *parameters :
 *   Int voteRank
 *return :
 *   Float voteValue
 ***************************/
function computeWeight(voteRank) {
    return 1 + 0.5 * Math.exp(-voteRank);
}

/****************************
  *Load the rank script 
***************************/
function loadRankScript() {
    var script = document.createElement('script');
    script.src = 'js/rank.js';
    document.head.appendChild(script);
}

function addToVotes(photo_name) {
  if (nbVotes==0){
      alert("Vous n'avez plus de vote disponible, vous pouvez encore revenir sur votre décision en cliquant sur le marqueur rouge");
      return
  }
  images.push(photo_name);
  nbVotes -= 1;
  updateNbVotes();
}

/****************************
 *Adds all Sites on the map with pins 
 *parameters :
 *   Site[] sites
 ***************************/

function addPins(sites) {
    for (let i = 0; i < sites.length; i++) {
        marker[i] = L.marker([sites[i].coordinates.latitude, sites[i].coordinates.longitude]).addTo(map);

        var newPhotoName = sites[i].photo_name.replace(".png", "_1.png");

        htmlPopup = "<div class='popup-content'>" +
            "<b>" + sites[i].name + "</b><br>" +
            "Caractéristiques (proba):" + sites[i].characteristics + "<br>" +
            '<img src="images/' + sites[i].photo_name + '" alt="' + sites[i].name + '" style="width:100%; height:auto;">' +
            "</div>" +
            '<div class="popup-content"><img id=' + sites[i].photo_name + ' src="images/' + newPhotoName + '" alt="' + sites[i].name + 'Image"></div>' + //style="'+'"width:100%; height:auto; maxwidth:100px">' +
            '<button id="next-button" onclick ="swapImages(\'' + sites[i].photo_name + '\')">Next</button>' +
            '<br><button onclick="addToVotes(\"'+newPhotoName+'\")">Voter pour</button>' +
            "</div>";
        marker[i].bindPopup(htmlPopup);
    }
    // Add a zone marker
    var zone = L.marker([49.211029, -0.363451]).addTo(map);

    zone.on('click', function () {
        loadRankScript();
    });

    zone.bindPopup(
        '<div id="image-container" class="image-container">' +
        "<b>Classement des préférences des votes</b><br>" +
        "<br>" +
        '</div>'
    );

    zone.setIcon(L.icon({
        iconUrl: 'images/icons/zone.png',
        iconSize: [30, 50],
        iconAnchor: [25, 50],
        popupAnchor: [0, -50]
    }));
    zone.bindTooltip("Côte de nacre", {
        permanent: true,
        direction: 'right',
        offset: [0, 0]
    });
}