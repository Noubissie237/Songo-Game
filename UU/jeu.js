var permission1 = true // permission de jouer du joueur 1, il est donc le premier a jouer
var permission2 = false // permission de jouer du joueur 2, il est donc le deuxieme a jouer

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
    if((idj == 1) && (permission1))
    {
        permission1 = false
        permission2 = true
        return 0
    }
    else if((idj == 1) && (!permission1))
        return 1
    else if((idj == 2) && (permission2))
    {
        permission1 = true
        permission2 = false
        return 0
    }
    else if((idj == 2) && (!permission2))
        return 1
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
}

function distribution(idj, Case) // prototype permettant d'effectuer la distribution des pions par le joueur dont l'id est passé en paramettre
{

    if(estBloque(idj) == 0)
    {

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
    
            document.getElementById("J"+idj+"pionsCase"+Case).value = 0;
            document.getElementById("J"+idj+"pions"+Case).value = 0
            var progressCase = Case;
            if(idj == 2)
            {
                var debC = 1
                while(tmp > 0)
                {
                    
                    if(progressCase > 1)
                    {
                        document.getElementById("J"+idj+"pionsCase"+(progressCase-1)).value = eval(document.getElementById("J"+idj+"pionsCase"+(progressCase-1)).value + '+' + 1);
                        document.getElementById("J"+idj+"pions"+(progressCase-1)).value =  document.getElementById("J"+idj+"pionsCase"+(progressCase-1)).value 
                        progressCase -= 1;
                    }
                    else
                    {
                        checkPrise = true
                        document.getElementById("J"+idc+"pionsCase"+debC).value = eval(document.getElementById("J"+idc+"pionsCase"+debC).value + '+' + 1);
                        document.getElementById("J"+idc+"pions"+debC).value = document.getElementById("J"+idc+"pionsCase"+debC).value
                        debC += 1;
                        if(debC > 7)
                        {
                            var newInd = 7
                            if(rappel <= 13)
                            {
                                while (tmp > 0)
                                {
                                    document.getElementById("J"+idj+"pionsCase"+newInd).value  = eval(document.getElementById("J"+idj+"pionsCase"+newInd).value  + '+' + 1);
                                    document.getElementById("J"+idj+"pions"+newInd).value      = eval(document.getElementById("J"+idj+"pions"+newInd).value      + '+' + 1);
                                    newInd -= 1
                                    tmp-=1
                                }
                            }

                        }
                    }
                    tmp -= 1;
                }
                if(checkPrise)
                {
                    prise((debC-1),idj,idc)
                }
            }
            else
            {
                var debC = 7
                while(tmp > 0)
                {
                    
                    if(progressCase < 7)
                    {
                        document.getElementById("J"+idj+"pionsCase"+(progressCase+1)).value = eval(document.getElementById("J"+idj+"pionsCase"+(progressCase+1)).value + '+' + 1);
                        document.getElementById("J"+idj+"pions"+(progressCase+1)).value =  document.getElementById("J"+idj+"pionsCase"+(progressCase+1)).value 
                        progressCase += 1;
                    }
                    else
                    {
                        checkPrise1 = true
                        document.getElementById("J"+idc+"pionsCase"+debC).value = eval(document.getElementById("J"+idc+"pionsCase"+debC).value + '+' + 1);
                        document.getElementById("J"+idc+"pions"+debC).value = document.getElementById("J"+idc+"pionsCase"+debC).value
                        debC -= 1;
                        if(debC < 1)
                        {
                            var newInd = 1
                            if(rappel <= 13)
                            {
                                while (tmp > 0)
                                {
                                    document.getElementById("J"+idj+"pionsCase"+newInd).value  = eval(document.getElementById("J"+idj+"pionsCase"+newInd).value  + '+' + 1);
                                    document.getElementById("J"+idj+"pions"+newInd).value      = eval(document.getElementById("J"+idj+"pions"+newInd).value      + '+' + 1);
                                    newInd += 1
                                    tmp-=1
                                }
                            }
                            else
                            {
                                debC = 1;
                                while (tmp > 0)
                                {
                                    checkPrise1 = true
                                    document.getElementById("J"+idc+"pionsCase"+debC).value = eval(document.getElementById("J"+idc+"pionsCase"+debC).value + '+' + 1);
                                    document.getElementById("J"+idc+"pions"+debC).value = document.getElementById("J"+idc+"pionsCase"+debC).value   
                                    debC += 1         
                                }
                            }

                        }
                    }
                    tmp -= 1;
                }
                if(checkPrise1)
                {
                    prise((debC+1),idj,idc)
                }
            }
            init();
        }
    }
   
}

function prise(lastCase,idj,idc)
{
    var avance = true

    if(idc == 1)
    {
        for( i = lastCase; i >= 1; i--)
        {
            checkPions = document.getElementById("J"+idc+"pions"+i).value;
            if((checkPions != 2) && (checkPions != 3) && (checkPions != 4))
            {
                avance = false
            }
            if(avance)
            {                
                document.getElementById("PointJoueur"+idj).value = eval(document.getElementById("PointJoueur"+idj).value + '+' + checkPions)
                document.getElementById("J"+idc+"pions"+i).value = 0
                document.getElementById("J"+idc+"pionsCase"+i).value = 0
            }
        
        }
    }
    else
    {
        for(var i = lastCase; i <= 7; i+=1)
        {
            checkPions = document.getElementById("J"+idc+"pions"+i).value;
            if((checkPions != 2) && (checkPions != 3) && (checkPions != 4))
            {
                avance = false
            }
            if(avance)
            {
                document.getElementById("PointJoueur"+idj).value = eval(document.getElementById("PointJoueur"+idj).value + '+' + checkPions)
                document.getElementById("J"+idc+"pions"+i).value = 0
                document.getElementById("J"+idc+"pionsCase"+i).value = 0
            }
        
        }
    }
    if((poursuiteJeu() == 1) || (poursuiteJeu() == 2))
    {
        alert("Fin de la partie, victoire du joueur "+poursuiteJeu())
    }
}

function poursuiteJeu()
{
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
            return 1
    
        if((som2 + b) > 35) 
            return 2
    }
    
    if((a<=35) && (b<=35))
        return 0

    if(a>35 || b>35)
    {
        permission1 = false
        permission2 = false
        if(a>35)
            return 1
        return 2
    }
}