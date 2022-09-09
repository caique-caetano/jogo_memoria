const grid = document.querySelector('.grid');
const scanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const cars = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10'
]

 const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
 }

 let firstCard ='';
 let secondCard='';

 const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length === 20){
        clearInterval(this.loop);
        alert(`Parabéns, ${scanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML}`);
    }
 }

 const checkCards = () => {
    const firstCars = firstCard.getAttribute('data-cars');
    const SecondCars = secondCard.getAttribute('data-cars');

    if (firstCars === SecondCars){

        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();

    } else {

        setTimeout(() => {

            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';

        }, 600);

    }
 }

 const revealCard = ({ target }) => {

    if (target.parentNode.className.includes('reveal-card')){
        return;
    }

    if (firstCard === ''){

    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;

    } else if (secondCard === ''){

        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();

    }

 }

const createCard = (cars) => {

    const grid__card = createElement('div', 'grid__card');
    const card__front = createElement('div','face card__front');
    const card__back = createElement('div', 'face card__back');

    card__front.style.backgroundImage = `url('../images/${cars}.jpg')`;

    grid__card.appendChild(card__front);
    grid__card.appendChild(card__back);

    grid.appendChild(grid__card);

    grid__card.addEventListener('click', revealCard);
    grid__card.setAttribute('data-cars', cars);

    return grid__card;
}

const loadGame = () => {

    const duplicateCars = [...cars, ...cars];

    const shuffleArray = duplicateCars.sort( () => Math.random() - 0.5);

    shuffleArray.forEach((cars) => {
    const cards = createCard(cars);
    grid.appendChild(cards);

    });
}

const startTimer = () => {

this.loop = setInterval(()=> {

    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;

}, 1000)

}

window.onload = () => {
    scanPlayer.innerHTML = localStorage.getItem('player');
    startTimer();
    loadGame();    
}