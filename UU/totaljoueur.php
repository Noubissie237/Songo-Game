<?php
    include "bd.php";

    $req1 = $mysqli->query("SELECT * FROM personne WHERE id=1");
    $req2 = $mysqli->query("SELECT * FROM personne WHERE id=2");

    foreach($req1 as $a)
        $res1 = $a['nom'];
    foreach($req2 as $b)
        $res2 = $b['nom'];

    if(($res1 != 'en attente du joueur 1') && ($res2 != 'en attente du joueur 2'))
        echo 1;
    else
        echo 0;