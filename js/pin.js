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
const nbImages = 3;
const currentImage = document.getElementById('current-image');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');

function swapImages() {
    const currentImage = document.getElementById('current-image');
    for (var i = 0; i <= nbImages; i++) {
        if (currentImage.src.match(imageFolder + i + ".png")) {
            console.log(currentImage.src);
            if (i + 1 <= nbImages) {
                currentImage.src = imageFolder + (i + 1) + ".png";
                break;
            } else {
                currentImage.src = imageFolder + "1.png";
            }
        }
    }
}