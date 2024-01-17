 
   var map = L.map('map').setView([49.183333, -0.350], 13); // Updated coordinates
   var marker = []
   var i = 0;

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    fetch('projects.json')
      .then(response => response.json())
      .then(jsonData => {
        // Iterating through projects
        jsonData.projects.forEach(project => {
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
          
          console.log("Project Name: " + project.name);
          console.log("Address: " + project.address);
          console.log("Coordinates: " + project.coordinates.latitude + ", " + project.coordinates.longitude);
          console.log("Score: " + project.score);
          console.log("Photo Name: " + project.photo_name);
          console.log("Characteristics: " + project.characteristics.join(", "));
          console.log("\n");
          i++;
        });
      })
      .catch(error => console.error('Error fetching JSON:', error));
    

    // Function to handle button click
    function onButtonClick() {
      var dropdownValue = document.getElementById('dropdown').value;
      alert("Button clicked! Dropdown selected value: " + dropdownValue);
    }

    // Function to geocode the entered address and display coordinates
    function geocodeAddress() {
      var addressInput = document.getElementById('address-input').value;

      // Replace 'YOUR_OPENCAGE_API_KEY' with your actual OpenCage API key
      var apiKey = 'a5d1c0cbcabb4a1a8f506c8415d80cb3';
      var geocodeUrl = 'https://api.opencagedata.com/geocode/v1/json?q=' + encodeURIComponent(addressInput) + '&key=' + apiKey;

      fetch(geocodeUrl)
        .then(response => response.json())
        .then(data => {
          if (data.results.length > 0) {
            var coordinates = data.results[0].geometry;
            var coordinatesText = "Coordinates for '" + addressInput + "': " +
              "Latitude: " + coordinates.lat.toFixed(6) +
              ", Longitude: " + coordinates.lng.toFixed(6);

            // Display coordinates in the side panel
            document.getElementById('spot-info').innerHTML = "<div class='popup-content'>" + coordinatesText + "</div>";
          } else {
            alert("Geocoding failed. Please enter a valid address.");
          }
        })
        .catch(error => {
          console.error('Error during geocoding:', error);
          alert("An error occurred during geocoding. Please try again.");
        });
    }

    // Example side panel
    var spotInfo = document.getElementById('spot-info');

    map.on('click', function(e) {
      var clickedLatLng = e.latlng;
      var clickedCoordinates = "Latitude: " + clickedLatLng.lat.toFixed(6) + "<br>Longitude: " + clickedLatLng.lng.toFixed(6);

      // Display clicked coordinates in the side panel
      spotInfo.innerHTML = "<div class='popup-content'><b>Clicked Point</b><br>" + clickedCoordinates + "</div>";
    });