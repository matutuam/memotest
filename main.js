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

const $botonJugar = document.querySelector("#boton-jugar");
$botonJugar.onclick = comenzarJuego;

function comenzarJuego() {
    desasignarColores();
    asignarColores();
}

function asignarColores() {
    const $cuadros = document.querySelectorAll(".cuadro");
    const listaColores = ["verde", "rojo", "amarillo", "azul", "verde", "rojo", "amarillo", "azul"].sort( () => .5 - Math.random() );

    $cuadros.forEach(function($cuadro, i) {
        $cuadro.classList += ` ${listaColores[i]}`;
        console.log($cuadro, i);
    });
}

function desasignarColores() {
    const $cuadros = document.querySelectorAll(".cuadro");

    $cuadros.forEach(function($cuadro) {
        $cuadro.classList = `col cuadro`;
    });
}
