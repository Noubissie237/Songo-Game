
let permission1 = 0 // permission de jouer du joueur 1, il est donc le deuxieme a jouer
let permission2 = 1 // permission de jouer du joueur 2, il est donc le premier a jouer

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

    estBloque(idj)  // prototype permettant de savoir si le joueur dont l'id est passé en paramettre est bloqué en retournant 0 ou pas en retournant 1
    {
        if(idj == 1)
            if(permission1 == 0)
                return 0
            else
                return 1
        else
            if(permission2 == 0)
                return 0
            else
                return 1
    }

    distribution(idj) // prototype permettant d'effectuer la distribution des pions par le joueur dont l'id est passé en paramettre
    {
        
    }

}


function init()
{
    document.getElementById("PointJoueur1").value = 0
    document.getElementById("PointJoueur2").value = 0

    for(let j = 1; j <= 2; j++)
        for(let i = 1; i<= 7; i++)
            document.getElementById("J"+j+"pionsCase"+i).value = 5
    
}

/*function debut()
{
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    const Largeur = 900;
    const Longueur = 50;

    ctx.fillRect(0,0,Largeur,Longueur)


function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    document.getElementById("demo").innerHTML = this.responseText;
    }
    };
    xhttp.open("GET", "ajax_info.txt", true);
    xhttp.send();
}
}*/