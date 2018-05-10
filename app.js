var scores, roundScore, activePlayer, activeGame

newGameSession()

function newGameSession() {
	if (activePlayer != undefined) {
		document
			.querySelector(`.player-${activePlayer}-panel`)
			.classList.remove('winner')
		document.querySelector('.player-1-panel').classList.remove('active')
		document.querySelector('.player-0-panel').classList.add('active')
	}

	scores = [0, 0]
	roundScore = 0
	activePlayer = 0
	activeGame = true

	resetCurrentScore()

	document.getElementById('score-0').textContent = '0'
	document.getElementById('score-1').textContent = '0'

	document.getElementById(`name-0`).textContent = 'Player 1'
	document.getElementById(`name-1`).textContent = 'Player 2'

	hideDice()
}

function nextPlayer() {
	activePlayer = activePlayer === 0 ? 1 : 0
	roundScore = 0

	resetCurrentScore()

	document.querySelector('.player-0-panel').classList.toggle('active')
	document.querySelector('.player-1-panel').classList.toggle('active')

	hideDice()
}

function resetCurrentScore() {
	document.getElementById('current-0').textContent = '0'
	document.getElementById('current-1').textContent = '0'
}

function hideDice() {
	document.querySelector('.dice').style.display = 'none'
}

document.querySelector('.btn-new').addEventListener('click', newGameSession)

document.querySelector('.btn-roll').addEventListener('click', () => {
	if (!activeGame) return

	var dice = Math.floor(Math.random() * 6) + 1
	var diceDOM = document.querySelector('.dice')
	diceDOM.style.display = 'block'
	diceDOM.src = `dice-${dice}.png`

	if (dice !== 1) {
		roundScore += dice
		document.querySelector(`#current-${activePlayer}`).textContent = roundScore
	} else {
		nextPlayer()
	}
})

document.querySelector('.btn-hold').addEventListener('click', () => {
	if (!activeGame) return
	// Add CURRENT score to GLOBAL score
	scores[activePlayer] += roundScore
	document.getElementById(`score-${activePlayer}`).textContent =
		scores[activePlayer]

	if (scores[activePlayer] >= 100) {
		activeGame = false
		document.getElementById(`name-${activePlayer}`).textContent = 'Winner!'
		document
			.querySelector(`.player-${activePlayer}-panel`)
			.classList.add('winner')
		document
			.querySelector(`.player-${activePlayer}-panel`)
			.classList.remove('active')
		hideDice()
	} else {
		nextPlayer()
	}
})
