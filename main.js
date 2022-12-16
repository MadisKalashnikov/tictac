const ticTac = (function() {
	let turn = 0
	const winningCombinations = [
		[0,1,2],
		[3,4,5],
		[6,7,8],

		[0,3,6],
		[1,4,7],
		[2,5,8],

		[0,4,8],
		[2,4,6]
	]

	let switchTurn = false
	let firstTurn = "first"
	let secondTurn = "second"

	const selections = document.querySelector("#player-selections")
	const selected = document.querySelector("#players-selected")
	const gameBoard = document.querySelector("#game-board")
	const gameTiles = gameBoard.querySelectorAll("#game-tiles>div")
	
	const announcement = document.querySelector("#announcement")

	const firstAvatarImgs = document.querySelectorAll("#first>img")
	const secondAvatarImgs = document.querySelectorAll("#second>img")
	const firstSelected = document.querySelector("#first-selected")
	const secondSelected = document.querySelector("#second-selected")
	
	const placeMark = (tile, turn) => {
		tile.classList.add(`${turn}`)
		tile.dataset.mark = `${turn}`
	}
	const swapTurns = () => {
		switchTurn = !switchTurn
	}
	const checkForWin = (currentTurn) => {
		return winningCombinations.some(combination => {
			return combination.every(tile => {
				return gameTiles[tile].classList.contains(currentTurn)
			})
		})
	}
	const endGame = (draw = false, winner, ) => {
		announcement.textContent = draw ? "A draw!" : `${winner === 'X' ? "Player one" : "Player two"} won`
		gameTiles.forEach(tile => tile.removeEventListener("click", handleClick))
	}
	const checkIfChosen = (first, second) => {
		if (first === second) {
			alert("cant choose same avatars")
			return true
		}
	}
	const removeActiveClasses = (section) => {
		if (section === "first") {
			firstAvatarImgs.forEach(img => img.classList.remove("active"))
		} else if (section === "second") {
			secondAvatarImgs.forEach(img => img.classList.remove("active"))
		}
	}
	const chooseAvatar = (e) => {
		let targetParent = e.target.parentElement.id
		let targetImg = e.target
		let targetName = e.target.dataset.name
		if (targetParent === 'first') {
			if (checkIfChosen(targetName, secondTurn) === true) return
			firstTurn = targetName
			removeActiveClasses("first")
			targetImg.classList.add("active")
		}
		if (targetParent === 'second') {
			if (checkIfChosen(targetName, firstTurn) === true) return
			secondTurn = `${targetName}`
			removeActiveClasses("second")
			targetImg.classList.add("active")
		}
	}
	firstAvatarImgs.forEach(img => img.addEventListener("click", chooseAvatar))
	secondAvatarImgs.forEach(img => img.addEventListener("click", chooseAvatar))
	const displaySelected = () => {
		firstSelected.src = `media/${firstTurn}.png`
		secondSelected.src = `media/${secondTurn}.png`
	}
	const startGame = () => {
		if (firstTurn === "first" || secondTurn === "second") {
			alert("choose both avatars")
			return
		}
		gameBoard.classList.add("active")
		selections.classList.add("hide")
		selected.classList.toggle("hide")
		displaySelected()
	}
	const startBtn = document.querySelector("#player-selections > button")
	startBtn.addEventListener("click", startGame)

	const handleClick = (e) => {
		const tile = e.target
		const currentTurn = switchTurn ? "O" : "X"
		let avatar = switchTurn 
			? `media/${secondTurn}.png` 
			: `media/${firstTurn}.png`
		let imgEl = document.createElement("img")
		imgEl.src = avatar
		if (tile.dataset.mark.length > 0) {
			return
		 } else {
			placeMark(tile, currentTurn)
			tile.append(imgEl)
			swapTurns()
			turn++
		}
		if (checkForWin(currentTurn)) {
			endGame(false,`${currentTurn}`)
		} else if (turn === 9 && !checkForWin()) {
			endGame(true)
		}
		
	}
	const resetBoard = () => {
		gameTiles.forEach(tile => {
			tile.innerHTML = ""
			tile.dataset.mark = ""
			tile.classList.remove("X", "O")
			switchTurn = false
			gameTiles.forEach(tile => tile.addEventListener("click", handleClick))
		})
		turn = 0
		announcement.textContent = ""
	}
	const resetBtn = document.querySelector("#resetBtn")
	resetBtn.addEventListener("click", resetBoard)

	const toMenu = () => {
		gameBoard.classList.toggle("active")
		selections.classList.toggle("hide")
		selected.classList.toggle("hide")
		removeActiveClasses("first")
		removeActiveClasses("second")
		resetBoard()
		firstTurn = "first"
		secondTurn = "second"
	}
	const toMenuBtn = document.querySelector("#toSelectionBtn")
	toMenuBtn.addEventListener("click", toMenu)
	gameTiles.forEach(tile => tile.addEventListener("click", handleClick))
})()
