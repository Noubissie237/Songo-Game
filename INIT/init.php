<?php

    $mysqli = new mysqli("localhost", "root", "", "songo");

    $nom = $_GET['nom'];

    $req1 = $mysqli->query("SELECT * FROM personne WHERE id=1");

    foreach($req1 as $a)
        $res = $a['nom'];

    if($res == 'en attente du joueur 1')
        $req = $mysqli->query("UPDATE personne SET nom='$nom' WHERE id=1");
    else
        $req = $mysqli->query("UPDATE personne SET nom='$nom' WHERE id=2");
