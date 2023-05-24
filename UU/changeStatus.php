<?php

    include "bd.php";

    $req1 = $mysqli->query("SELECT * FROM permission WHERE id=1");
    $req2 = $mysqli->query("SELECT * FROM permission WHERE id=2");

    foreach($req1 as $a)
        $res1 = $a['valeur'];
    foreach($req2 as $b)
        $res2 = $b['valeur'];

    $req3 = $mysqli->query("UPDATE permission SET valeur=$res2 WHERE id=1");
    
    $req4 = $mysqli->query("UPDATE permission SET valeur=$res1 WHERE id=2");


