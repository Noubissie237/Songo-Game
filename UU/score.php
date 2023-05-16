<?php
    include "bd.php";

    $val = $_GET['val'];

    $req = $mysqli->query("SELECT * FROM score WHERE id = $val");

    foreach($req as $nbre)
    {
        echo $nbre['scores'];
    }
