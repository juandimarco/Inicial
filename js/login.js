function manejadorDeEvento(evento) {
    evento.preventDefault();
    sessionStorage.setItem("loged", "true");
    window.location.href = "index.html"
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("form").addEventListener("submit", manejadorDeEvento)
});


/*function login() {
    if (localStorage.getItem("email").value !== "" & inputPassword !== "") {
    window.location.assign("index.html");
    }
}*/