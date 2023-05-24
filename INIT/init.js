function newUser()
{
    document.getElementById("cacher").style = "display:inline-block;"
    document.getElementById("bout").style = "background-color:rgba(22, 72, 211, 0.342)"
    document.getElementById("cacher1").style = "display:none";
}

function insert()
{
    var nom = document.getElementById("nom").value;
    var xhttp = new XMLHttpRequest();

    xhttp.open('GET', 'init.php?nom='+nom, true);
    xhttp.send();
}