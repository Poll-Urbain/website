function onImageTaken(imageURI) {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            pinOnMap(position.coords.latitude, position.coords.longitude, imageURI);
        }, error => {
            alert("Need permission to use your location in order to use your camera");
        });
    }
    else {
        alert("Geolocation services are not supported by your browser.\n\
                You can not use the camera on this app")
    }
}


function pinOnMap(latitude, longitude, imageURI) {
    var pin =
        "<div class='popup-content'>" +
        "<b>Le Dôme Végétalisé</b><br>" +
        "Caractéristiques (proba): A, B, C<br>" +
        '<img src="' + imageURI + '" Image" style="width:100%; height:auto;">' +
        '<br><button onclick="onButtonClick()">Voter pour</button>' +
        '<br><label for="dropdown">Choose an option:</label>' +
        '<select id="dropdown">' +
        '<option value="option1">Chaleur</option>' +
        '<option value="option2">Inondation</option>' +
        '<option value="option3">Air</option>' +
        '</select>' +
        "</div>";

    var marker = L.marker([latitude, longitude]).addTo(map);
    marker.bindPopup(pin).openPopup();
}

var file = document.getElementById('file-input');

const delay = ms => new Promise(res => setTimeout(res, ms));

async function getImage(event) {
    file = event.target.files[0];
    let url = window.URL.createObjectURL(file);

    await delay(1000);


    onImageTaken(url);
}

file?.addEventListener('change', getImage);