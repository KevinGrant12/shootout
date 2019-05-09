const game = document.getElementById('shootout')
const cards = document.querySelectorAll('.memory-card')

let hasFlippedCard = false
let lockBoard = false
let firstCard, secondCard

class Card {
  constructor(name, imgUrl, health, ammo) {
    this.name = name
    this.health = health
    this.ammo = ammo
    this.imgUrl = imgUrl
    this.addImages = (card) => {
      let frontFace = new Image()
      frontFace.src = this.imgUrl
      frontFace.className = 'front-face'
      let backFace = new Image()
      backFace.src = 'img/card-back.svg'
      backFace.className = 'back-face'
      card.append(backFace)
      card.append(frontFace)
    }
  }
  createCard(imgUrl) {
    let card = document.createElement('div')
    card.className = 'memory-card ' + this.name
    card.dataset.health = this.health
    card.dataset.ammo = this.ammo
    this.addImages(card)
    // game.appendChild(card)
    return card
  }
}

const gameModeBtns = document.querySelectorAll('.game-mode-btn')

// Game Mode Configuration
const gameModeToAmounts = new Map([
  ['easy', {ammo: 4, beer: 4, cigar: 2, enemigo: 2, snake: 2, scorpion: 2} ],
  ['medium', {ammo: 6, beer: 4, cigar: 4, enemigo: 4, snake: 2, scorpion: 2} ],
  // ['hard', {ammo: 4, beer: 4, cigar: 4, enemigo: 2, snake: 2, scorpion: 2} ]
])

// Select Game Mode
function selectGameMode(e) {
  let gameMode = e.target.getAttribute('data-mode')
  const cardAmounts = gameModeToAmounts.get(gameMode)
  console.log(gameMode)
  document.querySelector('#gameModeBtns').style.display = 'none'
  dealCards(cardAmounts)
}

gameModeBtns.forEach(btn => btn.addEventListener('click', selectGameMode))




// Deal Cards
function dealCards(cardAmounts) {
// Good Cards
const ammoCards = [...Array(cardAmounts.ammo)].map(i => new Card('ammunition', 'img/react.svg', null, 1).createCard())
const beerCards = [...Array(cardAmounts.beer)].map(i => new Card('beer', 'img/angular.svg', 1, null).createCard())
const cigarCards = [...Array(cardAmounts.cigar)].map(i => new Card('cigar', 'img/ember.svg', 1, null).createCard())
const goodCards = [...ammoCards, ...beerCards, ...cigarCards]

// Bad Cards
const enemigoCards = [...Array(2)].map(i => new Card('enemigo', 'img/vue.svg', -1, null).createCard())
const snakeCards = [...Array(2)].map(i => new Card('snake', 'img/backbone.svg', -1, null).createCard())
const scorpionCards = [...Array(2)].map(i => new Card('scorpion', 'img/aurelia.svg', -1, null).createCard())
// const bandito = [...Array(2)].map(i => new Card('bandito', null, null, -1))
const badCards = [...enemigoCards, ...snakeCards, ...scorpionCards]

// All Cards
const allCards = [...goodCards, ...badCards]
  console.log({allCards})
  allCards.map(card => game.appendChild(card))
}

// function dealCards() {
//   card = document.createElement('div')
//   allCards.forEach(function() {
//     clone = card.cloneNode()
//     clone.textContent = this.name
//     clone.className = 'memory-card'
//     clone.dataset.cardtype = 'cardtype'
    
//     game.appendChild(clone)
//     console.log(clone)
//   })
// }
// dealCards()


function flipCard() {
  if (lockBoard) return
  if (this === firstCard) return

  this.classList.add('flip')

  if (!hasFlippedCard) {
   hasFlippedCard = true
   firstCard = this
   return
  }

  secondCard = this

  checkForMatch()

}

function checkForMatch() {
  let isMatch = firstCard.dataset.cardtype === secondCard.dataset.cardtype
  isMatch ? disableCards() : unflipCards()
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard)
  secondCard.removeEventListener('click', flipCard)

  resetBoard()
}

function unflipCards() {
  lockBoard = true
  setTimeout(() => {
    firstCard.classList.remove('flip')
    secondCard.classList.remove('flip')

    resetBoard()
  }, 1500)
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false]
  [firstCard, secondCard] = [null,null]
}

(function shuffle() {
  console.log('shuffle')
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12)
    card.style.order = randomPos
  })
})()

cards.forEach(card => card.addEventListener('click', flipCard))