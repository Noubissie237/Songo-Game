var Gpermission; // Tableau Global contenant les permission des joueurs 1 (a l'index 0) et 2 (a l'index 1)

class Songo
{
    constructor(Cj1, Cj2, pt1, pt2)
    {
        this.coteJoueur1 = Cj1; 
        this.coteJoueur2 = Cj2; 
        this.pointJoueur1 = pt1;
        this.pointJoueur2 = pt2;
    }

    nbPoints(idj) // prototype retournant le nombre de point du joueur dont l'id est passé en paramettre
    {
        if(idj == 1)
            return this.pointJoueur1;
        else if(idj == 2)
            return this.pointJoueur2;
        else
            return -1
    }

}

function estBloque(idj)  // prototype permettant de savoir si le joueur dont l'id est passé en paramettre est bloqué en retournant 0 ou pas en retournant 1
{
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            Gpermission = this.response;
    };

    xhttp.open('GET', 'status.php?val='+idj, false);
    xhttp.send();


    if((idj == 1) && (Gpermission == 1))
    {
        xhttp.open('GET', 'changeStatus.php', true);
        xhttp.send();
        return 0
    }
    else if((idj == 1) && (Gpermission == 0))
        return 1
    else if((idj == 2) && (Gpermission == 1))
    {
        xhttp.open('GET', 'changeStatus.php', true);
        xhttp.send();
        return 0
    }
    else if((idj == 2) && (Gpermission == 0))
        return 1
}

function newPart()
{
    var xhttp = new XMLHttpRequest();

    xhttp.open('GET', 'reset.php', true);
    xhttp.send();
}

function menu()
{
    var xhttp = new XMLHttpRequest();

    xhttp.open('GET', 'menu.php', true);
    xhttp.send();
}

function nom1()
{
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            document.getElementById("nkw1").value = this.response;
    }

    xhttp.open('GET', 'nom.php?id=1', true);
    xhttp.send();

}

function nom2()
{
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            document.getElementById("nkw2").value = this.response;
    }

    xhttp.open('GET', 'nom.php?id=2', true);
    xhttp.send();
}

function affiche1(idj,idcase)
{
    if(idcase <= 7)
    {
        var xhttp = new XMLHttpRequest();
    
        xhttp.onreadystatechange = function()
        {
            if(this.readyState == 4 && this.status == 200)
            {
                document.getElementById("J"+idj+"pionsCase"+(idcase-1)).value = this.response;
                document.getElementById("J"+idj+"pions"+(idcase-1)).value = this.response;
            }
        };
    
        xhttp.open('GET', 'affichePoints.php?val='+idcase, true);
        xhttp.send();

        idcase += 1;

        affiche1(idj, idcase);
    }
}

function affiche2(idj,idcase)
{
    if(idcase <= 7)
    {
        var xhttp = new XMLHttpRequest();
    
        xhttp.onreadystatechange = function()
        {
            if(this.readyState == 4 && this.status == 200)
            {
                document.getElementById("J"+idj+"pionsCase"+(idcase-1)).value = this.response;
                document.getElementById("J"+idj+"pions"+(idcase-1)).value = this.response;
            }
        };
    
        xhttp.open('GET', 'affichePoints2.php?val='+idcase, true);
        xhttp.send();

        idcase += 1;

        affiche2(idj, idcase);
    }
}

function score(id)
{
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function()
    {
        if(this.readyState == 4 && this.status == 200)
        {
            document.getElementById("PointJoueur"+id).value = this.response;
        }
    };

    xhttp.open("GET", "score.php?val="+id, true);
    xhttp.send();
}

function init()
{
    var idcase1 = 1;
    var idcase2 = 1;
    affiche1(1,idcase1);
    affiche2(2,idcase2);
    score(1);
    score(2);
    nom1();
    nom2();
}

function refresh()
{
    setInterval(init, 100);
    //init();
}

function allonsY()
{
    var xhttp = new XMLHttpRequest();
    var accord;

    xhttp.onreadystatechange = function(){
        if(this.status==200 && this.readyState == 4)
            accord =  this.response;
    }
    xhttp.open('GET', 'totaljoueur.php', false);
    xhttp.send();

    return accord;
}

function distribution(idj, Case) // prototype permettant d'effectuer la distribution des pions par le joueur dont l'id est passé en paramettre
{
    if(allonsY() == 1)
    {
        if(estBloque(idj) == 0)
        {
            document.getElementById("J"+idj+"pions"+Case).style = "background-color:#106fdb;";
            setTimeout(function(){
                document.getElementById("J"+idj+"pions"+Case).style = "background-color:#6f8683;";
            },1000)
            var xhttp = new XMLHttpRequest();
            var tmp = document.getElementById("J"+idj+"pionsCase"+Case).value;
            var rappel = tmp;
            var checkPrise = false
            var checkPrise1 = false
            if((idj==1 && Case==7 && tmp==1) || (idj==2 && Case==1 && tmp==1))
            {
                alert("Vous ne pouvez pas jouer cette case !");
            }
            else
            {
                var idc; //id du joueur contraire
                if(idj == 1)
                    idc = 2
                else
                    idc = 1

                var progressCase = Case;
                if(idj == 2)
                {
                    xhttp.open("GET","insertEvol2_"+(progressCase-1)+".php?val="+tmp, true);
                    xhttp.send();
                }
                else
                {
                    xhttp.open("GET","insertEvol1_"+(progressCase-1)+".php?val="+tmp, true);
                    xhttp.send();
                }
            }
            if((poursuiteJeu() == 1) || (poursuiteJeu() == 2))
            {
                alert("Fin de la partie, victoire du joueur "+poursuiteJeu())
            }
        }
    }
    else
    {
        document.getElementById("nkw2").style = "background-color:red";
        setTimeout(function(){
            document.getElementById("nkw2").style = "background-color:#a2f1a2;";
        }, 1000);

    }
        
}


function poursuiteJeu()
{
    var xhttp = new XMLHttpRequest();

    a = document.getElementById("PointJoueur1").value;
    b = document.getElementById("PointJoueur2").value;

    var som1 = 0
    var som2 = 0

    for(var i = 1; i<= 7; i++)
    {
        som1 += document.getElementById("J1pions"+i).value;
        som2 += document.getElementById("J2pions"+i).value;
    }

    if((som1 + som2) < 10)
    {
        if((som1 + a) > 35)
        {
            xhttp.open('GET', 'fin.php', true);
            xhttp.send();
            return 1
        }
            
    
        if((som2 + b) > 35) 
        {
            xhttp.open('GET', 'fin.php', true);
            xhttp.send();
            return 2
        }
            
    }
    
    if((a<=35) && (b<=35))
        return 0

    if(a>35 || b>35)
    {
        xhttp.open('GET', 'fin.php', true);
        xhttp.send();
        if(a>35)
        {
            xhttp.open('GET', 'fin.php', true);
            xhttp.send();
            return 1;
        }
        else
        {
            xhttp.open('GET', 'fin.php', true);
            xhttp.send();
            return 2
        }
        
    }
}
