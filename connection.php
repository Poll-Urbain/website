<?php
// 1. database credentials
$host = "etudiant";
$db_name = "poll_urbain";
$username = "etudiant";
$password = "iJtFnOWkuB";
  
// 2. connect to database
global $connexion;
try {
    $connexion = new PDO("mysql:host={$host};dbname={$db_name}", "{$username}", "{$password}");
    echo "CONNECTED";
} catch (PDOException $e) {
    die('Connection failed : ' . $e->getMessage());
}

?>