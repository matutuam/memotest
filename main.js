/*
Inicio
    comenzarJuego
        reiniciarPuntos
        reiniciarColores
        asignarColores
        habilitarInputUsuario
        manejarJuego

    manejarJuego
        1er clickUsuario -> bloquearCuadro
        2do clickUsuario -> bloquearCuadro

        deshabilitarInputUsuario

        compararCuadros ?
            Si -> aumentarPuntaje
                estanTodosOcultos ?
                    Si -> deshabilitarInputUsuario
                       -> terminarJuego
                    No -> habilitarInputUsuario
                       -> manejarJuego
            No -> habilitarInputUsuario
               -> continuarJuego

PD (Sobre habilitarInputUsuario): Chequear si es mejor colocarlo al principio de manejarJuego o directamente como está mostrada en el pseudo-código
*/

let cuadrosUsuario = [];

const $botonJugar = document.querySelector("#boton-jugar");
$botonJugar.onclick = comenzarJuego;

function comenzarJuego() {
    desasignarColores();
    asignarColores();
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

    if (cuadrosUsuario.length === 2) {
        compararCuadros();
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
    }

    cuadrosUsuario = [];
}
