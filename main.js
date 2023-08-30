let cuadrosElegidos = [];
let cuadrosCorrectos = [];

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
    const listaColores = ["verde", "rojo", "amarillo", "azul", "verde", "rojo", "amarillo", "azul"].sort( () => .5 - Math.random() );

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

function manejarInputUsuario(e) {
    const $cuadro = e.target;
    cuadrosElegidos.push($cuadro);
    mostrarCuadros($cuadro);

    if (cuadrosElegidos.length === 2) {
        deshabilitarInputUsuario();

        setTimeout(() => {
            compararCuadros();
            habilitarInputUsuario();
        }, 500);
    }
}

function compararCuadros() {
    const clasesCuadro1 = Array.from(cuadrosElegidos[0].classList).join(' ');
    const clasesCuadro2 = Array.from(cuadrosElegidos[1].classList).join(' ');
    const sonIguales = clasesCuadro1 === clasesCuadro2;

    if (!sonIguales) {
        ocultarCuadro(cuadrosElegidos[0]);
        ocultarCuadro(cuadrosElegidos[1]);
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
        $cuadro.classList += ` tapada`;
    });
}

function ocultarCuadro() {
    for (let i = 0; i < cuadrosElegidos.length; i++) {
        cuadrosElegidos[i].classList.add("tapada");
    }
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
