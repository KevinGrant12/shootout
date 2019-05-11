const game = document.getElementById('shootout')
// const cards = document.querySelectorAll('.memory-card')

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
    return card
  }
}

// Game Mode Configuration
const gameModeToAmounts = new Map([
  ['easy',
    {
      ammo: 4,
      beer: 4,
      food: 2,
      cigar: 0,
      snake: 2,
      scorpion: 2,
      enemigo: 2,
      bandito: 0,
      rival: 0
    }
  ],
  ['medium',
    {
      ammo: 4,
      beer: 4,
      food: 2,
      cigar: 2,
      snake: 2,
      scorpion: 2,
      enemigo: 4,
      bandito: 4,
      rival: 0 
    }
  ],
  ['hard',
    {
      ammo: 4,
      beer: 4,
      food: 4,
      cigar: 4,
      snake: 2,
      scorpion: 2,
      enemigo: 4,
      bandito: 4,
      rival: 4
    }
  ],
])

const gameModeBtns = document.querySelectorAll('.game-mode-btn').forEach(btn => btn.addEventListener('click', selectGameMode))

function selectGameMode(e) {
  let gameMode = e.target.getAttribute('data-mode')
  const cardAmounts = gameModeToAmounts.get(gameMode)
  console.log(gameMode)
  document.querySelector('#gameModeBtns').style.display = 'none'
  dealCards(cardAmounts)
}

function dealCards(cardAmounts) {
  // Good Cards
  const ammoCards = [...Array(cardAmounts.ammo)].map(i => new Card('ammunition', 'img/react.svg', null, 1).createCard())
  const beerCards = [...Array(cardAmounts.beer)].map(i => new Card('beer', 'img/angular.svg', 1, null).createCard())
  const foodCards = [...Array(cardAmounts.food)].map(i => new Card('food', 'img/angular.svg', 1, null).createCard())
  const cigarCards = [...Array(cardAmounts.cigar)].map(i => new Card('cigar', 'img/ember.svg', 1, null).createCard())

  // Bad Cards
  const snakeCards = [...Array(cardAmounts.snake)].map(i => new Card('snake', 'img/backbone.svg', -1, null).createCard())
  const scorpionCards = [...Array(cardAmounts.scorpion)].map(i => new Card('scorpion', 'img/aurelia.svg', -1, null).createCard())
  const enemigoCards = [...Array(cardAmounts.enemigo)].map(i => new Card('enemigo', 'img/vue.svg', -1, null).createCard())
  const banditoCards = [...Array(cardAmounts.bandito)].map(i => new Card('bandito', 'img/aurelia.svg', -1, null).createCard())
  const rivalCards = [...Array(cardAmounts.rival)].map(i => new Card('rival', 'img/aurelia.svg', -1, null).createCard())

  // Card Collection
  const goodCards = [...ammoCards, ...beerCards, ...foodCards, ...cigarCards]
  const badCards = [...snakeCards, ...scorpionCards, ...enemigoCards, ...banditoCards, ...rivalCards]
  const allCards = [...goodCards, ...badCards]

  // Deal Cards Randomly
  allCards.forEach(card => {
    let randomPos = Math.floor(Math.random() * allCards.length)
    card.style.order = randomPos
    console.log(card)
    game.appendChild(card)
  })
}

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


cards.forEach(card => card.addEventListener('click', flipCard))