<?php
    include "bd.php";

    $val = $_GET['val'];

    $req = $mysqli->query("SELECT * FROM joueur2 WHERE idCase = $val");

    foreach($req as $nbre)
    {
        echo $nbre['nbrePions'];
    }
