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
        console.log(imageFolder + Sites[i].photo_name + "     " + id);
        if ((imageFolder + Sites[i].photo_name) != id) {
            continue;
        }
        var currentPosition = (currentImage.src).split(".png")[0][-1];
        console.log(currentPosition);
        if ((imageFolder + Sites[i].photo_name) == currentImage.src) {
            console.log(newPhotoName);
            currentImage.src = imageFolder + newPhotoName;
        }
    }
}