var imageContainer = document.getElementById('image-container');
var images = ['campus1/campus1.png', 'campus2/campus2.png', 'campus4/campus4.png'];
var draggedItem = null;

// Dynamically load images into the container
images.forEach(image => {
    const voteElement = document.createElement('div');
    const imgElement = document.createElement('img');
    imgElement.src = "../images/" + image;
    imgElement.style = "width: 100%; height: auto;";
    const caracteristics = document.createElement('div');
    const caracteristic1 = document.createElement('div');
    const caracteristic2 = document.createElement('div');
    const caracteristic3 = document.createElement('div');
    voteElement.appendChild(imgElement);
    caracteristic1.innerHTML = "Chaleur   <select id=\"dropdown\">" +
        "<option value=\"1\">Rank 1</option>" +
        "<option value=\"2\">Rank 2</option>" +
        "<option value=\"3\">Rank 3</option>" +
        "</select>";
    caracteristic2.innerHTML = "Inondation   <select id=\"dropdown\">" +
        "<option value=\"1\">Rank 1</option>" +
        "<option value=\"2\">Rank 2</option>" +
        "<option value=\"3\">Rank 3</option>" +
        "</select>";
    caracteristic3.innerHTML = "Air   <select id=\"dropdown\">" +
        "<option value=\"1\">Rank 1</option>" +
        "<option value=\"2\">Rank 2</option>" +
        "<option value=\"3\">Rank 3</option>" +
        "</select>";
    caracteristics.appendChild(caracteristic1);
    caracteristics.appendChild(caracteristic2);
    caracteristics.appendChild(caracteristic3);
    voteElement.appendChild(caracteristics);
    imageContainer.appendChild(voteElement);
});

// Enable drag-and-drop functionality

imageContainer.addEventListener('dragstart', (e) => {
    draggedItem = e.target;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', draggedItem);
});

imageContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
});

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