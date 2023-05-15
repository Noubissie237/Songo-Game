<?php
    include "bd.php";

    $point = $_GET['val'];
    $tmp = $point;
    $case = 2;

    $req = $mysqli->query("UPDATE joueur2 SET nbrePions=0 WHERE idCase=3");

    
    for($i = $case; $i >= 1; $i--)
    {
        if($point > 0)
        {
            $req1 = $mysqli->query("SELECT * FROM joueur2 WHERE idCase=$i");

            foreach($req1 as $valeur)
                $res = $valeur['nbrePions'];
            $res += 1;
            $req = $mysqli->query("UPDATE joueur2 SET nbrePions=$res WHERE idCase=$i");
        }
        
        $point -= 1;
    }

    if($point > 0)
    {
        for($i = 1; $i <= 7; $i++)
        {
            if($point > 0)
            {
                $req1 = $mysqli->query("SELECT * FROM joueur1 WHERE idCase=$i");
    
                foreach($req1 as $valeur)
                    $res = $valeur['nbrePions'];
                $res += 1;
                $req = $mysqli->query("UPDATE joueur1 SET nbrePions=$res WHERE idCase=$i");
            }
            
            $point -= 1;
        }
    }

    if($point > 0)
    {
        for($i = 7; $i < $tmp; $i--)
        {
            if($point > 0)
            {
                $req1 = $mysqli->query("SELECT * FROM joueur2 WHERE idCase=$i");
    
                foreach($req1 as $valeur)
                    $res = $valeur['nbrePions'];
                $res += 1;
                $req = $mysqli->query("UPDATE joueur2 SET nbrePions=$res WHERE idCase=$i");
            }
            $point -= 1;
        }
    }

    if($point > 0)
    {
        for($i = 1; $i <= 7; $i--)
        {
            if($point > 0)
            {
                $req1 = $mysqli->query("SELECT * FROM joueur1 WHERE idCase=$i");
    
                foreach($req1 as $valeur)
                    $res = $valeur['nbrePions'];
                $res += 1;
                $req = $mysqli->query("UPDATE joueur1 SET nbrePions=$res WHERE idCase=$i");
            }
            
            $point -= 1;
        }
    }




