/*

    SCOPO DEL GIOCO:
    Il computer deve generare 16 numeri casuali tra 1 e 100.
    In seguito deve chiedere all’utente di inserire un numero alla volta, sempre
    compreso tra 1 e 100.
    Se il numero è presente nella lista dei numeri generati, la partita termina,
    altrimenti si continua chiedendo all’utente un altro numero.
    La partita termina quando il giocatore inserisce un numero “vietato” o
    raggiunge il numero massimo possibile di numeri consentiti.
    Al termine della partita il software deve comunicare il punteggio, cioè il
    numero di volte che l’utente ha inserito un numero consentito.

    BONUS: all’inizio il software richiede anche una difficoltà all’utente che
    cambia il range di numeri casuali.
    Con difficoltà 0=> tra 1 e 100,
    con difficoltà 1 =>  tra 1 e 80,
    con difficoltà 2=> tra 1 e 50

*/

var numOfLocations = null;
var levelOfGame = parseInt(prompt("Scegli 0 per difficoltà BASSA | 1 per difficoltà MEDIA | 2 per difficoltà ALTA"));

switch (levelOfGame) {
    case 0:
        numOfLocations = 100;
        break;
    case 1:
        numOfLocations = 80;
        break;
    case 2:
        numOfLocations = 50;
        break;
    default:
        numOfLocations = 100;
}

var mineLocations = [];
var numOfMines = 16;
var numOfNotMines = numOfLocations - numOfMines;

while (mineLocations.length <= numOfMines) {
    var mine = numRandomMinMax(1, numOfLocations);
    //console.log(mine); //debug
    if (!mineLocations.includes(mine)) {
        mineLocations.push(mine);
        //console.log(mineLocations); //debug
    }
}
console.log(mineLocations.sort(function(a, b){return a-b}));

var userAttemps = [];

while (userAttemps.length <= numOfNotMines) {
    var userAttemp = parseInt(prompt("Inserisci un numero da 1 a 100"));
    console.log(userAttemp);

    if ((!isNaN(userAttemp)) && (userAttemp <= numOfLocations) && (userAttemp >= 1)) {

        if (!userAttemps.includes(userAttemp) && !mineLocations.includes(userAttemp)) {
            userAttemps.push(userAttemp);
            console.log(userAttemps);
        } else if (mineLocations.includes(userAttemp)) {
            document.getElementById('bomb').play();
            alert("boom!");
            break
        } else if (userAttemps.length == numOfNotMines) {
            alert("Win!");
            break
        } else {
            userAttemp = alert("Hai già inserito questo numero. Inserisci un altro numero da 1 a 100");

        }

    } else {
        userAttemp = alert("Non è un inserimento valido, ritenta. Inserisci un altro numero da 1 a 100");
    }
}


function numRandomMinMax(min, max) {
    var numRandom = Math.floor(Math.random() * (max - min + 1) ) + min;
    return numRandom;
}
