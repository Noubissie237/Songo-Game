<?php
    include "bd.php";

    $point = $_GET['val'];
    $tmp = $point;
    $case = 4;
    $pos = array();
    $ying = 0;
    $pos1 = $pos-1;
    $continue = 1;

    $req = $mysqli->query("UPDATE joueur2 SET nbrePions=0 WHERE idCase=5");
    
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
        for($i = 1; $i < 7; $i++)
        {
            if($point > 0)
            {
                $req1 = $mysqli->query("SELECT * FROM joueur1 WHERE idCase=$i");
    
                foreach($req1 as $valeur)
                    $res = $valeur['nbrePions'];
                $res += 1;
                $req = $mysqli->query("UPDATE joueur1 SET nbrePions=$res WHERE idCase=$i");
                $pos[$ying] = 1;
                $ying ++;
            }
            else
            {
                $pf = count($pos);
                $req = $mysqli->query("SELECT * FROM joueur1 WHERE idCase=$pf");
                foreach($req as $valeu)
                    $res26 = $valeu['nbrePions'];
                if($res26!=2 and $res26!=3 and $res26!=4)
                {
                    $continue = 0;
                }
                if($continue == 1)
                {
                    $up1 = $mysqli->query("SELECT * FROM score WHERE id=2");
                    foreach($up1 as $u)
                        $sc = $u['scores'];
                    $sc += $res26;
                    $up = $mysqli->query("UPDATE score SET scores=$sc WHERE id=2");
                    $up2 = $mysqli->query("UPDATE joueur1 SET nbrePions=0 WHERE idCase=$pf");
                }
            }
            $point -= 1;
        }
    }

    if($point > 0)
    {
        for($i = 7; $i > $case; $i++)
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

