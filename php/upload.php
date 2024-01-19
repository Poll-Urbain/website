<?php
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $imageURI = $_POST['file'];
        $latitude = $_POST['latitude'];
        $longitude = $_POST['longitude'];
        echo '<script>';
        echo 'pinOnMap(' . $latitude . ', ' . $longitude .', ' . $imageURI . ');';
        echo '</script>';
        $imageContents = file_get_contents($imageURI);

        $uploadsDirectory = 'uploads/';
        $imageName = 'image_' . time() . '.jpg';
        $targetFile = $uploadsDirectory . $imageName;

        file_put_contents($targetFile, $imageContents);

        echo 'Data uploaded successfully!';
    } else {
        echo 'Invalid request method.';
    }
?>