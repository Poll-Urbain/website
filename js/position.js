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
            const reader = new FileReader();
            reader.onload = function (e) {
                const fileContent = e.target.result;
                console.log(fileContent);

                formData.append('file', fileContent);
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
            };

            reader.readAsText(file);
        }, error => {
            alert("Need permission to use your location in order to use your camera");
        });
    }
    else {
        alert("Geolocation services are not supported by your browser.\n\
                You can not use the camera on this app")
    }
}

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
            '<br><button onclick="onButtonClick()">Voter pour</button>' +
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

var file = document.getElementById('file-input');

function getImage(event) {
    file = event.target.files[0];
    let url = window.URL.createObjectURL(file);

    onImageTaken(url);
}

file?.addEventListener('change', getImage);