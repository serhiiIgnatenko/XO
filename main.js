// Initial data and flags
const fieldOfPlay = document.getElementById('field');
const reset = document.querySelector('.reset');
const cellArr = fieldOfPlay.querySelectorAll('.cell');
const informationContainer = document.querySelector('.information-line');
let arrX = [];
let arrO = [];
let moves = 0;
let gamer = 1;
let linePosition = 1;
let courentArr = arrX;

//Positions of winning combinations
const winCombination = {
	1: [11, 12, 13],
	2: [21, 22, 23],
	3: [31, 32, 33],
	4: [11, 21, 31],
	5: [12, 22, 32],
	6: [13, 23, 33],
	7: [11, 22, 33],
	8: [13, 22, 31],
}

//Checkbox blocking. launching the player's turn function.
fieldOfPlay.addEventListener("click", (e) => {
	if (e.target.type == 'checkbox') {
		e.target.setAttribute('disabled', 'disabled');
		let element = e.target;
		playersMove(element);
	}
})

//formation of the player array. Checking the array for winning combinations.
function playersMove(element) {

	let id = element.getAttribute('id');
	id = Number(id);

	addClassName(element);

	courentArr.push(id);

	detector(courentArr, winCombination);
}

//Adding a class to display the desired image.
function addClassName(elem) {
	if (gamer == 1) {
		elem.classList.add('cross');
	};

	if (gamer == 2) {
		elem.classList.add('circle');
	}
}

//Runs a function that checks for one of the 8 winning combinations.
//Saving the number of the winning combination in linePosition.
function detector(arr, obj) {
	moves++;

	for (const key in obj) {
		if (obj.hasOwnProperty.call(obj, key)) {
			const element = obj[key];

			let result = winDetector(arr, element);
			if (result) {
				linePosition = key;
				return endGame(result);
			};
		}
	};

	checkingMoves(moves);
	changeGamer();
};

//Checking if a winning combination exists in the player's array. return true or false.
function winDetector(arr, winCombinationArr) {
	let win = winCombinationArr.every(elem => arr.includes(elem));
	return win;
};

//Check for a limit on the number of steps.
function checkingMoves(moves) {
	if (moves === 9) {
		return endGame(moves);
	} else {
		console.log('continue');
	}
}

// Changing the player and the value of the check array.
function changeGamer() {
	if (gamer == 1) {
		gamer = 2;
		courentArr = arrO;
	} else {
		gamer = 1;
		courentArr = arrX;
	}
	changingPlayerInformation(gamer);
}

//Displaying information about which player's turn.
function changingPlayerInformation(gamer) {
	if (gamer === 1) {
		informationContainer.classList.remove('circle');
		informationContainer.classList.add('cross');
	}
	if (gamer === 2) {
		informationContainer.classList.remove('cross');
		informationContainer.classList.add('circle');
	}
}

//Formatting text for the end of the game.
function endGame(flag) {
	let informeText = ''
	if (typeof (flag) == 'number' && flag === 9) {
		informeText = `No more moves.
		Game restart`;
	} else {
		let nameWiner = gamer == 1 ? 'Cross' : "Circle";
		informeText = `Winner ${nameWiner}.
		Game restart`;
		disabledCell();
		setTimeout(() => drawWinnerLine(), 1000);
	};

	setTimeout(() => resetGame(informeText), 3000);
}

//Blocking free cells. Subject to winning and the availability of free cells.
function disabledCell() {
	for (const cell of cellArr) {
		if (!cell.hasAttribute('disabled')) {
			cell.setAttribute('disabled', 'disabled');
		}
	};
}

//The function shapes coordinates for displaying a winning line depending on the winning combination.
function drawWinnerLine() {
	switch (linePosition) {
		case '1':
			setWinnerLineStyle(14.5, 0, 0);
			break;
		case '2':
			setWinnerLineStyle(49, 0, 0);
			break;
		case '3':
			setWinnerLineStyle(83.5, 0, 0);
			break;
		case '4':
			setWinnerLineStyle(-1, 15.2, 90);
			break;
		case '5':
			setWinnerLineStyle(-1, 50, 90);
			break;
		case '6':
			setWinnerLineStyle(-1, 84.6, 90);
			break;
		case '7':
			setWinnerLineStyle(0, 1, 45);
			break;
		case '8':
			setWinnerLineStyle(0, 99, 135);
			break;
		default:
			console.log('non-existent value');
			break;
	};

	fieldOfPlay.classList.add('line');
	setTimeout(() => fieldOfPlay.classList.add('line__show'), 500);
}

//the function sets the styles for the winning line.
function setWinnerLineStyle(top, left, rotate) {

	fieldOfPlay.style.setProperty('--positionTop', `${top}%`);
	fieldOfPlay.style.setProperty('--positionLeft', `${left}%`);
	fieldOfPlay.style.setProperty('--rotateValue', `${rotate}deg`);
	if (rotate == 45 || rotate == 135) {
		let width = 100 * Math.sqrt(2);
		fieldOfPlay.style.setProperty('--width', `${width}%`);
	}
}

//Reset all values ​​to initial.
function resetGame(informeText = 'Game restart') {
	finallMessage(informeText);
	arrO.length = 0;
	arrX.length = 0;
	moves = 0;
	courentArr = arrX;
	gamer = 1;
	deletedWinnerLine();
	clearCell();
	changingPlayerInformation(gamer);
}

//Displaying the result of the game.
function finallMessage(msg) {
	let msgContainer = document.createElement('div');
	msgContainer.classList.add('msg');
	msgContainer.classList.add('show');
	fieldOfPlay.appendChild(msgContainer);
	msgContainer.innerText = `${msg}`;

	setTimeout(() => {
		msgContainer.classList.remove('show');
		fieldOfPlay.querySelector('.msg').remove();
	}, 2500)
}

//Removing the winning line and clearing styles.
function deletedWinnerLine() {
	fieldOfPlay.classList.remove('line__show');
	fieldOfPlay.classList.remove('line');
	fieldOfPlay.removeAttribute('style');
}

//Cell cleaning. Their styles. Reset the selected state.
function clearCell() {
	for (const cell of cellArr) {
		cell.removeAttribute('disabled');
		cell.checked = false;
		cell.classList.remove('cross', 'circle');
	};
}

//Output of initial information about which player it is now to move.
changingPlayerInformation(gamer);

//Reload game on button click.
reset.addEventListener('click', () => resetGame());
