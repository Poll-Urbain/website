const imageContainer = document.getElementById('image-container');

// Fetch images from the server or use a predefined array
const images = ['campus1.jpg', 'campus2.jpg', 'campus4.jpg'];

// Dynamically load images into the container
images.forEach(image => {
    const imgElement = document.createElement('img');
    imgElement.src = "images/"+image;
    imageContainer.appendChild(imgElement);
});

// Enable drag-and-drop functionality
let draggedItem = null;

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