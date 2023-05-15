<?php
    include "bd.php";

    $nbre = $_GET['val'];

    $req = $mysqli->query("UPDATE joueur2 SET nbrePions=0 WHERE idCase=$nbre");

