<?php
$folderPath = "./images/test/"; // replace with your folder path

if (is_dir($folderPath)) {
    // Scan the folder and retrieve all files and directories
    $allFiles = scandir($folderPath);

    // Filter out '.' and '..' and directories
    $files = array_filter($allFiles, function ($item) use ($folderPath) {
        return is_file($folderPath . '/' . $item);
    });

    // Count the number of files
    $fileCount = count($files);
    echo "The folder contains $fileCount files.";
} else {
    echo "The specified path is not a directory.";
}
?>