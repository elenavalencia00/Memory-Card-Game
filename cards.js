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

var primeraCarta = null;
var segundaCarta = null;
var bloqueando = false;
var parejasEncontradas = 0;

function barajar(array) {
    return array.sort(function () { return Math.random() - 0.5; });
}

function animacionBarajado() {
    var cartas = tablero.querySelectorAll('.carta');
    cartas.forEach(function (carta, index) {
        setTimeout(function () {
            carta.style.animation = 'shuffle 0.5s ease';
        }, index * 50);
    });
}

function crearJuego() {
    tablero.innerHTML = '';
    parejasEncontradas = 0;
    primeraCarta = null;
    segundaCarta = null;
    bloqueando = false;

    var cartasJuego = barajar(__spreadArray(__spreadArray([], imagenes, true), imagenes, true));

    cartasJuego.forEach(function (imgSrc, index) {
        var carta = document.createElement('div');
        carta.classList.add('carta');
        carta.style.setProperty('--card-index', index);

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
            voltearCarta(carta);
        });
    });

    // Animación de barajado al inicio
    setTimeout(function () {
        animacionBarajado();
    }, 100);
}

function voltearCarta(carta) {
    var _a, _b;
    if (bloqueando) return;
    if (carta === primeraCarta) return;
    if (carta.classList.contains('encontrada')) return;

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
        primeraCarta.classList.add('encontrada');
        segundaCarta.classList.add('encontrada');
        parejasEncontradas++;

        primeraCarta = null;
        segundaCarta = null;
        bloqueando = false;

        // Verificar si ganó
        if (parejasEncontradas === imagenes.length) {
            setTimeout(function () {
                mostrarVictoria();
            }, 500);
        }
    } else {
        // No coinciden
        setTimeout(function () {
            primeraCarta.classList.remove('volteada');
            segundaCarta.classList.remove('volteada');
            primeraCarta = null;
            segundaCarta = null;
            bloqueando = false;
        }, 1000);
    }
}

function mostrarVictoria() {
    var cartas = tablero.querySelectorAll('.carta');
    
    // Animación de victoria
    cartas.forEach(function (carta, index) {
        setTimeout(function () {
            carta.style.animation = 'victory 0.6s ease';
        }, index * 50);
    });

    // Reiniciar después de la animación
    setTimeout(function () {
        crearJuego();
    }, 2000);
}

// Iniciar el juego
crearJuego();