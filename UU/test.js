function valeur(str)
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
        {
            document.getElementById("bot").value = this.response;
        }
    };
    xhttp.open("GET", "jeu.php?val="+str, true);
    xhttp.send();
}