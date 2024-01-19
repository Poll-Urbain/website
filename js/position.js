navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
    /* result.status = "prompt" */
});


navigator.geolocation.getCurrentPosition(function (result) { /* ... */ })

navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
    /* result.status = "granted" */
});

function onImageTaken(imageURI) {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const formData = new FormData();

            formData.append('file', imageURI);
            formData.append('latitude', position.coords.latitude);
            formData.append('longitude', position.coords.longitude);

            fetch('https://intensif08.ecole.ensicaen.fr/php/upload.php', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    console.log('Data uploaded successfully!');
                } else {
                    console.log('Failed to upload data.');
                }
            })
            .catch(error => {
                console.log('Error during data upload:', error);
            });
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

function getImage(event) {
    file = event.target.files[0];
    let url = window.URL.createObjectURL(file);

    onImageTaken(url);
}

file?.addEventListener('change', getImage);