const game = document.getElementById('shootout')
const cards = document.querySelectorAll('.memory-card')

let hasFlippedCard = false
let lockBoard = false
let firstCard, secondCard

// Game Modes
let modes = [['easy', 16], ['medium', 20], ['hard', 30]]
console.log({modes})


class Card {
  constructor(name, image, health, ammo) {
    this.name = name
    this.image = image
    this.health = health
    this.ammo = ammo
  }
}

// Good Cards
const ammoCards = [...Array(4)].map(i => new Card('ammunition', null, 1, null))
const beerCards = [...Array(4)].map(i => new Card('beer', null, 1, null))
const cigarCards = [...Array(2)].map(i => new Card('cigar', null, 1, null))
const goodCards = [...ammoCards, ...beerCards, ...cigarCards]

// Bad Cards
const enemigoCards = [...Array(2)].map(i => new Card('enemigo', null, -1, null))
const snakeCards = [...Array(2)].map(i => new Card('snake', null, -1, null))
const scorpionCards = [...Array(2)].map(i => new Card('scorpion', null, -1, null))
// const bandito = [...Array(2)].map(i => new Card('bandito', null, null, -1))
const badCards = [...enemigoCards, ...snakeCards, ...scorpionCards]

const allCards = [...goodCards, ...badCards]
console.log({allCards})

function dealCards() {
  card = document.createElement('div')
  allCards.forEach(function() {
    clone = card.cloneNode()
    clone.textContent = this.name
    clone.className = 'memory-card'
    clone.dataset.cardtype = 'cardtype'
    
    game.appendChild(clone)
    console.log(clone)
  })
}
dealCards()


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