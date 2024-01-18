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
    console.log(id);
    for (var i = 0; i < Sites.length; i++) {
        for (var j = 1; j <= Sites[i].number_of_propositions; j++) {
            if ((imageFolder + Sites[i].photo_name) == currentImage.src) {
                var newPhotoName = Sites[i].photo_name.replace(".png", "_" + i + ".png");
                console.log(newPhotoName);
                currentImage.src = imageFolder + newPhotoName;
            }
        }
    }
}