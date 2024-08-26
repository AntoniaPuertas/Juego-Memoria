//creo un array con ocho emojis
const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
//creo un array que va a contener las cartas, incluye el array anterior dos veces
let cards = [...emojis, ...emojis];
//array que contiene las cartas que están vueltas
let flippedCards = [];
//variable que lleva la cuenta de los aciertos
let matchedPairs = 0;
//variable que lleva la cuenta del número de intentos realizados
let attempts = 0;

//esta función se encarga de barajar las cartas
//se ejecuta una vez al principio del juego
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

//esta función se encarga de mostrar las cartas
//se ejecuta una vez al principio del juego
function createBoard() {
    shuffleArray(cards);
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    cards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.index = index;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

//esta función se ejecuta cuando hacemos click sobre una carta
function flipCard() {
    //comprueba que no haya dos cartas vueltas y que la carta a la que se ha hecho click no esté ya vuelta
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        //si hay menos de dos cartas vueltas y la carta no está vuelta
        //le añade la clase flipped que vuelve la carta (muestra el emoji)
        this.classList.add('flipped');
        //muestra la carta
        this.textContent = cards[this.dataset.index];
        //añade la carta vuelta al array que contiene las cartas vueltas
        flippedCards.push(this);

        //si el array flippedCards contiene dos cartas
        if (flippedCards.length === 2) {
            //añade un intento
            attempts++;
            //actualiza el número de intentos en pantalla
            document.getElementById('score').textContent = `Intentos: ${attempts}`;
            //llama a checkMatch cuando pase un segundo
            setTimeout(checkMatch, 1000);
        }
    }
}

//Esta función comprueba si las cartas que hay en flipedCards son iguales
function checkMatch() {
    //Extraemos las dos cartas del array
    const [card1, card2] = flippedCards;
    //comprueba si son iguales
    if (card1.textContent === card2.textContent) {
        //si son iguales, agregamos un acierto
        matchedPairs++;
        //si ya hemos acertado todo, hemos ganado
        if (matchedPairs === emojis.length) {
            alert(`¡Felicidades! Has completado el juego en ${attempts} intentos.`);
        }
    } else {
        //las cartas no son iguales
        //las oculta otra vez
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.textContent = '';
        card2.textContent = '';
    }
    //vacía el array de cartas vueltas
    flippedCards = [];
}

//Inicio del juego
createBoard();