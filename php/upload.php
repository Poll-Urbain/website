<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type");
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $imageData = $_POST['file'];
        $latitude = $_POST['latitude'];
        $longitude = $_POST['longitude'];

        $uploadsDirectory = '../images/';
        $imageName = 'user_proposition/user_proposition.png';
        $targetFile = $uploadsDirectory . $imageName;

        $jsonFilePath = '../projects.json';

        $existingData = file_get_contents($jsonFilePath);

        $decodedData = json_decode($existingData, true);

        $newProject = array(
            "name" => "Project proposition",
            "address" => "Adress of the ",
            "coordinates" => array(
                "latitude" => $latitude,
                "longitude" => $longitude
            ),
            "photo_name" => "user_proposition/user_proposition.png",
            "number_of_propositions" => 1,
            "characteristics" => [
                "+3°C en été"
            ]
        );

        $decodedData['projects'][] = $newProject;

        $updatedData = json_encode($decodedData, JSON_PRETTY_PRINT);

        echo $updatedData;

        file_put_contents($jsonFilePath, $updatedData);
    }
?>