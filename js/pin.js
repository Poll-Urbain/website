// function defaultPin() {
//     // get name of the id Element
//     var pinElementId;
//     // get name of the building
//     var pinBuildingName
//     // get the image of the pin location
//     var pinPathImgBefore;
//     var pinLocation = document.getElementById(pinElementId);
//     var defaultPin =
//         "<div class='popup-content'>" +
//             '<b>' + pinBuildingName + '</b><br>' +
//             '<img src=' + pinPathImgBefore + ' style="width:100%; height:auto;">' +
//         '</div>' +
//         '<div>'
//             '<img src=' + pinPathImgBefore + ' style="width:100%; height:auto;">' +
//             '<br><button onclick="onButtonClick()">Voter pour</button>';
//         '</div>';

// }

const imageFolder = './images/test/';
const pathJson = 'https://intensif08.ecole.ensicaen.fr';
const currentImage = document.getElementById('current-image');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');

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

function swapImages() {
    const images = readSitesFromJSON('list')
    const currentImage = document.getElementById('current-image');
    for (var i = 0; i < images.length; i++) {
        if (currentImage.src.match(imageFolder + i + ".png")) {
            console.log(currentImage.src);
            if (i + 1 < images.length) {
                currentImage.src = imageFolder + (i + 1) + ".png";
                break;
            } else {
                currentImage.src = imageFolder + "1.png";
            }
        }
    }
}