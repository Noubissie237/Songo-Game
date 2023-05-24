<?php
    include "bd.php";

    $req = $mysqli->query("UPDATE permission SET valeur=0 WHERE id=1");
    $req = $mysqli->query("UPDATE permission SET valeur=0 WHERE id=2");