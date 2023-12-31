let cuadrosElegidos = [];
let cuadrosCorrectos = [];

const COLORES = ["verde", "rojo", "azul", "amarillo"];

const $botonJugar = document.querySelector("#boton-jugar");
$botonJugar.onclick = comenzarJuego;

function comenzarJuego() {
    desasignarColores();
    asignarColores();
    ocultarCuadros();
    ocultarAlertaGanador();
    habilitarInputUsuario();
}

function asignarColores() {
    const $cuadros = document.querySelectorAll(".cuadro");
    const listaColores = [...COLORES, ...COLORES].sort(() => 0.5 - Math.random());

    $cuadros.forEach(function($cuadro, i) {
        $cuadro.classList += ` ${listaColores[i]}`;
    });
}

function desasignarColores() {
    const $cuadros = document.querySelectorAll(".cuadro");

    $cuadros.forEach(function($cuadro) {
        $cuadro.classList = `col cuadro`;
    });
}

function habilitarInputUsuario() {
    const $cuadros = document.querySelectorAll(".cuadro");

    $cuadros.forEach($cuadro => {
        $cuadro.addEventListener("click", manejarInputUsuario);
    });
}

function deshabilitarInputUsuario() {
    const $cuadros = document.querySelectorAll(".cuadro");

    $cuadros.forEach($cuadro => {
        $cuadro.removeEventListener("click", manejarInputUsuario);
    });
}

function habilitarCuadro($cuadro) {
    $cuadro.addEventListener("click", manejarInputUsuario);
}

function deshabilitarCuadro($cuadro) {
    $cuadro.removeEventListener("click", manejarInputUsuario);
}

function manejarInputUsuario(e) {
    const $cuadro = e.target;
    cuadrosElegidos.push($cuadro);
    mostrarCuadros($cuadro);
    deshabilitarCuadro($cuadro);

    if (cuadrosElegidos.length === 2) {
        deshabilitarInputUsuario();

        setTimeout(() => {
            compararCuadros();
            habilitarInputUsuario();
        }, 500);
    }
}

function compararCuadros() {
    const sonIguales = cuadrosElegidos[0].className === cuadrosElegidos[1].className;

    if (!sonIguales) {
        ocultarCuadro(cuadrosElegidos[0]);
        ocultarCuadro(cuadrosElegidos[1]);
        habilitarCuadro(cuadrosElegidos[0]);
        habilitarCuadro(cuadrosElegidos[1]);
    } else {
        cuadrosCorrectos.push(cuadrosElegidos[0], cuadrosElegidos[1]);
    }

    if (cuadrosCorrectos.length === 8) {
        mostrarAlertaGanador();

        cuadrosCorrectos = [];
    }

    cuadrosElegidos = [];
}

function ocultarCuadros() {
    const $cuadros = document.querySelectorAll(".cuadro");

    $cuadros.forEach($cuadro => {
        $cuadro.classList.add("tapada");
    });
}

function ocultarCuadro($cuadro) {
    $cuadro.classList.add("tapada");
}

function mostrarCuadros($cuadro) {
    $cuadro.classList.remove("tapada");
}

function mostrarAlertaGanador() {
    document.querySelector("#alerta").classList.remove("oculto");
}

function ocultarAlertaGanador() {
    document.querySelector("#alerta").classList.add("oculto");
}
