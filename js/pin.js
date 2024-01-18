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

var projects = [];

window.onload = async function () {
    try {
        projects = await readSitesFromJSON("projects");
    }
    catch (error) {
        console.error("Error loading sites:", error);
    }
};

function swapImages() {
    const currentImage = document.getElementById('current-image');
    console.log(projects.length);
    for (var i = 0; i < projects.length; i++) {
        console.log(projects[i])
        if (projects[i].photo_name == currentImage.src) {
            if (i < projects.length - 1) {
                currentImage.src = projects[i + 1].photo_name;
            }
            else {
                currentImage.src = projects[0].photo_name;
            }
        }
    }
}