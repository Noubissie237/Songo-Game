<?php

    include "bd.php";

    $id = $_GET['val'];

    $req1 = $mysqli->query("SELECT * FROM permission WHERE id=$id");

    foreach($req1 as $el1)
        $stat1 = $el1['valeur'];

    echo $stat1;    