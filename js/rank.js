var imageContainer = document.getElementById('image-container');
var draggedItem = null;
var userDataString = localStorage.getItem("userData");
var userData = JSON.parse(userDataString);
var userAddress = userData.address;
var userName = userData.name;
var user2 = new User(userName, userAddress);
user2.fetchCoordinates()
    .then(() => {
        console.log(user2.coordinates.lat);
    });




// Dynamically load images into the container
function printVotes(){
var i = 0;
images.forEach(image => {
    const voteElement = document.createElement('div');

    const delButton = document.createElement('button');
    delButton.innerHTML = "Supprimer le vote";
    delButton.onclick = function (){
        var index = images.indexOf(image);
        if (index !== -1) {
          images.splice(index, 1);
          nbVotes+=1;
          updateNbVotes();
        }}

    const imgElement = document.createElement('img');
    imgElement.src = "images/"+image;
    imgElement.style = "width: 100%; height: auto;";

    
    const caracteristics = document.createElement('div');
    const caracteristic1 = document.createElement('div');
    const caracteristic2 = document.createElement('div');
    const caracteristic3 = document.createElement('div');
    voteElement.appendChild(imgElement);
    caracteristic1.innerHTML = "Chaleur   <select id=\"chaleur"+image+i+"\">" +
        "<option value=\"1\">Rank 1</option>" +
        "<option value=\"2\">Rank 2</option>" +
        "<option value=\"3\">Rank 3</option>" +
        "</select>";
    caracteristic2.innerHTML = "Inondation   <select id=\"inondation"+image+i+"\">" +
        "<option value=\"1\">Rank 1</option>" +
        "<option value=\"2\">Rank 2</option>" +
        "<option value=\"3\">Rank 3</option>" +
        "</select>";
    caracteristic3.innerHTML = "Air   <select id=\"air"+image+i+"\">" +
        "<option value=\"1\">Rank 1</option>" +
        "<option value=\"2\">Rank 2</option>" +
        "<option value=\"3\">Rank 3</option>" +
        "</select>";
const scoreDiv1 = document.createElement('div');
    const scoreDiv2 = document.createElement('div');
    const scoreDiv3 = document.createElement('div');

    caracteristics.appendChild(caracteristic1);
    caracteristics.appendChild(caracteristic2);
    caracteristics.appendChild(caracteristic3);
    var tmpSite = getSite(image);
    var site = new Site(new Coordinates(tmpSite.lat, tmpSite.lon));
    let vote = new Vote(site, user2, "Chaleur");
    //document.getElementById("chaleur"+image).value
    scoreDiv1.innerHTML = "Score de ce vote: " + vote.computeVoteValue(1, i);
    scoreDiv2.innerHTML = "Score de ce vote: " + vote.computeVoteValue(2, i);
    scoreDiv3.innerHTML = "Score de ce vote: " + vote.computeVoteValue(3, i);
    caracteristic1.appendChild(scoreDiv1);
    caracteristic2.appendChild(scoreDiv2);
    caracteristic3.appendChild(scoreDiv3);

    voteElement.appendChild(delButton);
    voteElement.appendChild(caracteristics);

    imageContainer.appendChild(voteElement);
i++;
});
}
// Enable drag-and-drop functionality

imageContainer.addEventListener('dragstart', (e) => {
    draggedItem = e.target;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', draggedItem);
});

imageContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
});

imageContainer.addEventListener('onchange', printVotes());

imageContainer.addEventListener('drop', (e) => {
    e.preventDefault();
    if (e.target.tagName === 'IMG') {
        const droppedItem = e.target;
        const temp = document.createElement('div');

        // Swap the positions of the dragged and dropped items
        draggedItem.parentNode.insertBefore(temp, draggedItem);
        droppedItem.parentNode.insertBefore(draggedItem, droppedItem);
        temp.parentNode.insertBefore(droppedItem, temp);

        temp.parentNode.removeChild(temp);
    }
});