/**
 * Created by Laptop on 03/10/2022.
 */
var palabras = ["HTML","MYSQL","ORACLE","ALURA","JAVASCRIPT","BOLIVIA","CODIGO","FUENTE","FRONTEND","BACKEND"];
var palabra;
var pantalla;
var pincel;
var intentoserroneos;
var aciertos;
var letraserroneas;
var letrasescritas;
var inicializado=false;
function iniciarValores() {
    palabra = [];
    pantalla = document.querySelector("canvas");
    pincel = pantalla.getContext("2d");
    pincel.fillStyle = "#0A3871";
    intentoserroneos = 0;
    aciertos = 0;
    letraserroneas = "";
    letrasescritas = "";
    inicializado=true;
    console.log(palabras)
    sortearpalabra();
}
function dibujarbase() {
    pincel.fillRect(0,395,300,5);
}
function dibujarpostevertical() {
    pincel.fillRect(80,0,5,395);
}
function dibujarpostehorizontal() {
    pincel.fillRect(80,0,170,5);
}
function dibujarsoga() {
    pincel.fillRect(250,0,5,50);
}
function dibujarcabeza() {
    pincel.beginPath();
    pincel.arc(250,80,30,0,2*Math.PI);
    pincel.fill();
}
function dibujarcuerpo(){
    pincel.fillRect(250,110,5,130);
}
function dibujarmanoderecha() {
    pincel.beginPath();
    pincel.moveTo(250,110);
    pincel.lineTo(215,175);
    pincel.lineTo(219,178);
    pincel.lineTo(254,113);
    pincel.fill();
}
function dibujarmanoizquierda() {
    pincel.beginPath();
    pincel.moveTo(255,110);
    pincel.lineTo(290,175);
    pincel.lineTo(286,178);
    pincel.lineTo(251,113);
    pincel.fill();
}
function dibujarmanos(){
    dibujarmanoderecha();
    dibujarmanoizquierda();
}
function dibujarpiederecha() {
    pincel.beginPath();
    pincel.moveTo(250,237);
    pincel.lineTo(215,302);
    pincel.lineTo(219,305);
    pincel.lineTo(254,240);
    pincel.fill();
}
function dibujarpieizquierda() {
    pincel.beginPath();
    pincel.moveTo(255,237);
    pincel.lineTo(290,302);
    pincel.lineTo(286,305);
    pincel.lineTo(251,240);
    pincel.fill();
}
function dibujarpies() {
    dibujarpieizquierda();
    dibujarpiederecha();
}
function sortearpalabra() {
    var aleatorio = parseInt(Math.round(Math.random() * (palabras.length - 1)));
    var pruebapalabra = palabras[aleatorio];
    for (k=0; k<pruebapalabra.length; k++){
        palabra.push(pruebapalabra[k])
    }
    aciertos = palabra.length;
    const listadeletras = document.getElementById("listaletras");
    const thead = document.createElement("thead");
    listadeletras.appendChild(thead);
    for (i=0; i<palabra.length; i++){
        const columnas = document.createElement("th");
        const lavel = document.createElement("lavel");
        lavel.textContent = palabra[i];
        lavel.className = "ocultarletra";
        columnas.appendChild(lavel);
        thead.appendChild(columnas);
    }
    const tr = document.createElement("tr");
    listadeletras.appendChild(tr);
    for (j=0; j<palabra.length; j++){
        const columnas = document.createElement("td");
        const hr = document.createElement("hr");
        columnas.appendChild(hr);
        tr.appendChild(columnas);
    }
}
function verificarLetra(codigoletra) {
    if (inicializado){
        var acertado = false; //variable que ayuda si acerto en un caracter de la palabra
        if (intentoserroneos<=7){//verificamos que los intentos fallidos sean menor a 8 intentos
            if (codigoletra>64 && codigoletra<91){//verficamos que la letra escrita sea mayusacula
                for (i=0; i<palabra.length; i++){//recoremos la palabra
                    if (codigoletra == palabra[i].charCodeAt()){//verificamos que el caracter escrito este dentro de la palabra
                        acertado = true;//cambiamos el valor a verdadero si la letra esta dentro de la palabra
                        /*modificamos el valor de la class del lavel para que sea visible en el tablero*/
                        var th = document.getElementsByTagName("th");//
                        var lavel = th[i].firstElementChild;//
                        lavel.className = "mostrarletra";//
                        aciertos--;//realizamos un control de asiertos realizados para un control, disminuyendo del tamanio de la palabra
                        palabra.splice(i,1,"0");//cambiamos el contenido del caracter dentro de la palabra por 0 para que ya no tome en cuenta el mismo carcater
                        letrasescritas = letrasescritas+String.fromCharCode(codigoletra);//concatenamos la letra escrita para un control
                    }
                }
                if (!acertado && aciertos>0){//verificamos que no haya acertado en la letra y los aciertos realizados sean mayores a cero
                    var letranorepetida = true;//inicializamos la variable en verdadero para los caracteres que no estan escritos
                    for (j=0; j<letrasescritas.length; j++){//realizamos un recorrido a todas las letras escritas
                        if (codigoletra == letrasescritas[j].charCodeAt()){//verificamos si la letra escrita esta entre las lestras ya escritas
                            letranorepetida = false;//cambiamos el valor a falso si la letra ya esta escrita
                            alert("Esa letra ya fue escrita! Intente con otra letra");//mandamos el popap alerta para decir que esa letra ya esta escrita
                        }
                    }
                    if (letranorepetida){//verificamos que la letra erronea no este escrita
                        letrasescritas = letrasescritas+String.fromCharCode(codigoletra);//concatenamos la letra escrita para un control
                        switch (intentoserroneos){
                            case 0:
                                dibujarbase();
                                break;
                            case 1:
                                dibujarpostevertical();
                                break;
                            case 2:
                                dibujarpostehorizontal();
                                break;
                            case 3:
                                dibujarsoga();
                                break;
                            case 4:
                                dibujarcabeza();
                                break;
                            case 5:
                                dibujarcuerpo();
                                break;
                            case 6:
                                dibujarmanos();
                                break;
                            case 7:
                                dibujarpies();
                                break;
                        }
                        intentoserroneos++;
                        mostrarletrasfallidas(codigoletra);//enviamos la letra fallida a la funcion para ser escrita
                    }
                }
            }
            else{
                alert("INSERTE SOLO LETRAS MAYUSCULAS");//mandamos el popap alerta para decir que solo se escribe en letras mayusculas
            }
            if (aciertos<1){//verificamos si gano preguntado si la variable es menor uno
                alert("Felicidades usted gano el juego");//mandamos el popap alerta para felicitar que gano la partida
            }
        }
        else {
            alert("Usted a Perdio, vuelva a jugar")//mandamos el popap alerta para decir que perdio en el juego
        }
    }
}
function mostrarletrasfallidas(codigoletra) {
    var letra = String.fromCharCode(codigoletra);
    letraserroneas = letraserroneas + letra;
    var parrafoletras = document.getElementById("letrasequivocadas");
    parrafoletras.innerHTML = letraserroneas;
    if (intentoserroneos==8){//verificamos si gano preguntado si la variable es menor uno
        alert("Usted a Perdio, vuelva a jugar");//mandamos el popap alerta para felicitar que gano la partida
    }
}
function agregarPalabra() {
    var nuevapalabra = document.querySelector("#textnuevapalabra");
    if (nuevapalabra.value.length>2){
        palabras.push(nuevapalabra.value.toUpperCase());
        console.log(palabras)
        window.location.href="iniciarJuego.html";
    }
    else{
        alert("La palabra no cumple los requisitos minimos de longitud");
        window.location.href="nuevaPalabra.html";
    }
}
document.addEventListener('keyup', function () {
    verificarLetra(event.key.charCodeAt());
});
