let cuadrosUsuario = [];

const $botonJugar = document.querySelector("#boton-jugar");
$botonJugar.onclick = comenzarJuego;

function comenzarJuego() {
    desasignarColores();
    asignarColores();
    ocultarCuadros();
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

function manejarInputUsuario(e) {
    const $cuadro = e.target;
    cuadrosUsuario.push($cuadro);
    mostrarCuadros($cuadro);

    if (cuadrosUsuario.length === 2) {
        setTimeout(() => {
            compararCuadros();
        }, 1000);
    }
}

function compararCuadros() {
    const clasesCuadro1 = Array.from(cuadrosUsuario[0].classList).join(' ');
    const clasesCuadro2 = Array.from(cuadrosUsuario[1].classList).join(' ');

    console.log(clasesCuadro1, clasesCuadro2);
    const sonIguales = clasesCuadro1 === clasesCuadro2;

    if (sonIguales) {
        alert("Correcto!");
    } else {
        alert("Incorrecto!");
        ocultarCuadros();
    }

    cuadrosUsuario = [];
}

function ocultarCuadros() {
    const $cuadros = document.querySelectorAll(".cuadro");

    $cuadros.forEach($cuadro => {
        $cuadro.classList += ` tapada`;
    });
}

function ocultarCuadro() {
    for (let i = 0; i < cuadrosUsuario.length; i++) {
        cuadrosUsuario[i].classList.add("tapada");
    }
}

function mostrarCuadros($cuadro) {
    $cuadro.classList.remove("tapada");
}
