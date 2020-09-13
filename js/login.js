function login(event) {
    event.preventDefault();
    sessionStorage.setItem("loged", "true");
    window.location.href = "index.html"
}

function userName() {
    var user = document.getElementById("inputEmail").value;
    sessionStorage.setItem("user", user);
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("form").addEventListener("submit", login);
});