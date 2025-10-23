var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var tablero = document.getElementById('tablero');
var imagenes = [
    'assets/cat.jpeg',
    'assets/ball.jpeg',
    'assets/bear.jpeg',
    'assets/cake.jpeg',
    'assets/coffee.jpeg',
    'assets/gameboy.jpeg',
    'assets/pc.jpeg',
    'assets/umbrella.jpeg'
];
// Duplicar y barajar
var cartasJuego = __spreadArray(__spreadArray([], imagenes, true), imagenes, true).sort(function () { return Math.random() - 0.5; });
var primeraCarta = null;
var segundaCarta = null;
var bloqueando = false;
// Crear cartas
cartasJuego.forEach(function (imgSrc) {
    var carta = document.createElement('div');
    carta.classList.add('carta');
    var trasera = document.createElement('img');
    trasera.src = 'assets/questions.jpeg';
    trasera.classList.add('trasera');
    var frente = document.createElement('img');
    frente.src = imgSrc;
    frente.classList.add('frente');
    carta.appendChild(trasera);
    carta.appendChild(frente);
    tablero.appendChild(carta);
    // Evento click
    carta.addEventListener('click', function () {
        var _a, _b;
        if (bloqueando)
            return;
        if (carta === primeraCarta)
            return;
        carta.classList.add('volteada');
        if (!primeraCarta) {
            primeraCarta = carta;
            return;
        }
        segundaCarta = carta;
        bloqueando = true;
        var img1 = (_a = primeraCarta.querySelector('.frente')) === null || _a === void 0 ? void 0 : _a.getAttribute('src');
        var img2 = (_b = segundaCarta.querySelector('.frente')) === null || _b === void 0 ? void 0 : _b.getAttribute('src');
        if (img1 === img2) {
            // Coinciden
            primeraCarta = null;
            segundaCarta = null;
            bloqueando = false;
        }
        else {
            // No coinciden
            setTimeout(function () {
                primeraCarta.classList.remove('volteada');
                segundaCarta.classList.remove('volteada');
                primeraCarta = null;
                segundaCarta = null;
                bloqueando = false;
            }, 1000);
        }
    });
});
