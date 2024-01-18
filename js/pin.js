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


function swapImages() {
    const currentImage = document.getElementById('current-image');
    for (var i = 0; i < Sites.length; i++) {
        console.log(imageFolder + Sites[i].photo_name);
        console.log(currentImage.src);
        if ((imageFolder + Sites[i].photo_name) == currentImage.src) {
            console.log("found");
            if (i < Sites.length - 1) {
                currentImage.src = imageFolder + Sites[i + 1].photo_name;
                return;
            }
            else {
                currentImage.src = imageFolder + Sites[0].photo_name;
            }
        }
    }
}