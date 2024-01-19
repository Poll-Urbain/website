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
        var newPhotoName = (currentImage.src).split(".png")[0].slice(0, -1) + ((parseInt(currentPosition)) % (Sites[i].number_of_propositions) + 1) + ".png";
        currentImage.src = newPhotoName;
    }
}