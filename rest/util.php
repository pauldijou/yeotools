<?php
// WARNING
// This file isn't commited to GitHub since it contains the database password
require_once('config.php');

try {
    $dbh = new PDO('mysql:host=mysql5-1.perso;dbname=pauldijou_db', $databaseUser, $databasePassword);
} catch (PDOException $e) {
    print "Erreur !: " . $e->getMessage() . "<br/>";
    die();
}
?>