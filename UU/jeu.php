<?php
    include "bd.php";
    
    $val = $_GET['val'];


    $req = $mysqli->query("SELECT * FROM joueur1 WHERE idCase = $val");

    foreach($req as $test)
    {
        echo $test['idCase'];
    }