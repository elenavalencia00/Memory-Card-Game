const tablero = document.getElementById('tablero') as HTMLDivElement;

const imagenes: string[] = [
  'assets/cat.jpeg',
  'assets/ball.jpeg',
  'assets/bear.jpeg',
  'assets/cake.jpeg',
  'assets/coffee.jpeg',
  'assets/gameboy.jpeg',
  'assets/pc.jpeg',
  'assets/umbrella.jpeg'
];


let cartasJuego = [...imagenes, ...imagenes].sort(() => Math.random() - 0.5);

let primeraCarta: HTMLDivElement | null = null;
let segundaCarta: HTMLDivElement | null = null;
let bloqueando = false;


cartasJuego.forEach((imgSrc) => {
  const carta = document.createElement('div');
  carta.classList.add('carta');

  const trasera = document.createElement('img');
  trasera.src = 'assets/questions.jpeg';
  trasera.classList.add('trasera');

  const frente = document.createElement('img');
  frente.src = imgSrc;
  frente.classList.add('frente');

  carta.appendChild(trasera);
  carta.appendChild(frente);
  tablero.appendChild(carta);

  // Evento click
  carta.addEventListener('click', () => {
    if (bloqueando) return;
    if (carta === primeraCarta) return;

    carta.classList.add('volteada');

    if (!primeraCarta) {
      primeraCarta = carta;
      return;
    }

    segundaCarta = carta;
    bloqueando = true;

    const img1 = primeraCarta.querySelector('.frente')?.getAttribute('src');
    const img2 = segundaCarta.querySelector('.frente')?.getAttribute('src');

    if (img1 === img2) {
   
      primeraCarta = null;
      segundaCarta = null;
      bloqueando = false;
    } else {
    
      setTimeout(() => {
        primeraCarta!.classList.remove('volteada');
        segundaCarta!.classList.remove('volteada');
        primeraCarta = null;
        segundaCarta = null;
        bloqueando = false;
      }, 1000);
    }
  });
});
