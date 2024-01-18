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

const imageFolder = 'https://intensif08.ecole.ensicaen.fr/images/';
const pathJson = 'https://intensif08.ecole.ensicaen.fr';
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');


function swapImages(id) {
    const currentImage = document.getElementById(id);
    for (var i = 0; i < Sites.length; i++) {
        if ((Sites[i].photo_name) != id) {
            continue;
        }
        var currentPosition = (currentImage.src).split(".png")[0].slice(-1);
        console.log(currentPosition);
        var newPhotoName = (currentImage.src).split(".png")[0].slice(0, -2) + (parseInt(currentPosition) + 1) % Sites[i].number_of_propositions + ".png";
        console.log(newPhotoName);
        currentImage.src = newPhotoName;
    }
}