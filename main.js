let fieldOfPlay = document.getElementById('field');
let reset = document.querySelector('.reset');
let cellArr = fieldOfPlay.querySelectorAll('.cell');
let arrX = [];
let arrO = [];
let counter = 0;
let gamer = 1;
let courentArr = arrX;

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

function winDetector(arr, winCobinationArr) {
	let win = winCobinationArr.every(elem => {
		// console.log('arr:', arr)
		// console.log('elem:', elem)
		let x = arr.includes(elem);
		// console.log(x);
		return x;
	});
	return win;
};

function detector(arr, obj) {
	// console.log('start detector');
	counter++;

	for (const key in obj) {
		if (obj.hasOwnProperty.call(obj, key)) {
			const element = obj[key];

			let result = winDetector(arr, element);
			// console.log(x);
			if (result) {

				return endGame(result);
			};
		}
	}
	// console.log('not win combination');
	chekingCounter(counter);
	changeGamer();
};

function chekingCounter(counter) {
	// console.log('counter = ', counter);
	if (counter === 9) {
		return endGame(counter);
	} else {
		console.log('continue');
	}
}

function changeGamer() {
	// console.log('changin gamer');
	if (gamer == 1) {
		gamer = 2;
		courentArr = arrO;
	} else {
		gamer = 1;
		courentArr = arrX;
	}
	// console.log(`next gamer ${gamer}`)
	// console.log(`---------------`)
}

function endGame(flag) {
	let informeText = ''
	if (typeof (flag) == 'number' && flag === 9) {
		// console.log('no more moves. draw.');
		informeText = 'no more moves. Game restart';
	} else {
		// console.log('win');
		let nameWiner = gamer == 1 ? 'Cross' : "Circle";
		informeText = `win gamer ${nameWiner}. Game restart`;
		disabledCell();
	};
	// resetGame();
	// setTimeout(() => alert(informeText), 1500)
	setTimeout(() => resetGame(informeText), 1500);
}

function resetGame(informeText = 'Game restart') {
	console.log(informeText);
	alert(informeText);
	arrO.length = 0;
	arrX.length = 0;
	counter = 1;
	courentArr = arrX;
	gamer = 1;
	clearCell();

	// console.log('arrX', arrX)
	// console.log('arrO', arrO)
	// console.log('counter', counter)
	// console.log('gamer', gamer)
	// console.log('courentArr', courentArr)
}

fieldOfPlay.addEventListener("click", (e) => {
	if (e.target.type == 'checkbox') {
		// console.log('click');
		// console.log(e.target);
		// e.target.classList.add('cross');
		e.target.setAttribute('disabled', 'disabled');
		let element = e.target;
		playersMove(element);
	}
})

function playersMove(element) {
	// console.log('playersMove');

	let id = element.getAttribute('id');
	id = Number(id);
	// console.log('click on:', id);

	addClassName(element);

	courentArr.push(id);
	// console.log('Push id', id);

	detector(courentArr, winCombination);
}

function addClassName(elem) {
	if (gamer == 1) {
		elem.classList.add('cross');
		// console.log('add class name "Cross"')
	};

	if (gamer == 2) {
		elem.classList.add('circle');
		// console.log('Add class name "Circle"');
	}
}

function disabledCell() {
	for (const cell of cellArr) {
		console.log(cell);
		if (!cell.hasAttribute('disabled')) {
			cell.setAttribute('disabled', 'disabled');
		}
	};
}

function clearCell() {
	for (const cell of cellArr) {
		cell.removeAttribute('disabled');
		cell.checked = false;
		cell.classList.remove('cross', 'circle');
	};
}

reset.addEventListener('click', () => resetGame());

// arrX.push(11, 12, 22, 31, 23);
// let c = detector(courentArr, winCombination);

// arrO.push(13, 21, 32, 33);
// c = detector(courentArr, winCombination);

// console.log(c);
