// let fs = require('fs');
// let input = fs.readFileSync('day-08-input.txt').toString();
// let resultScreen = solve(50, 6, input);
// console.log('Day 08, puzzle 1 solution: ' + countPixels(resultScreen));
// console.log('Day 08, puzzle 2 solution: ');
// prettyPrint(resultScreen);

// function prettyPrint(screen) {
// 	for (row of screen) {
// 		console.log(row.join(''));
// 	}
// }

function addRect(screen, instruction) {
	let rectWidth = parseInt(instruction.substring(
		instruction.lastIndexOf('rect ') + 5,
		instruction.lastIndexOf('x')), 10);
	let rectHeight = parseInt(instruction.substring(
		instruction.lastIndexOf('x') + 1), 10);

	for (let y = 0; y < rectHeight; y += 1) {
		for (let x = 0; x < rectWidth; x += 1) {
			screen[y][x] = '#';
		}
	}
}

function rotateRow(screen, instruction) {
	let row = parseInt(instruction.substring(instruction.lastIndexOf('y=') + 2,
		instruction.lastIndexOf(' by')), 10);
	let steps = parseInt(instruction.substring(
		instruction.lastIndexOf('by ') + 3), 10);
	let screenWidth = screen[0].length;
	let resultRow = new Array(screenWidth);

	for (let y = 0; y < screenWidth; y += 1) {
		resultRow[(y + steps) % screenWidth] = screen[row][y];
	}
	for (let y = 0; y < screenWidth; y += 1) {
		screen[row][y] = resultRow[y];
	}
}

function rotateColumn(screen, instruction) {
	let column = parseInt(instruction.substring(instruction.lastIndexOf('x=') + 2,
		instruction.lastIndexOf(' by')), 10);
	let steps = parseInt(instruction.substring(
		instruction.lastIndexOf('by ') + 3), 10);
	let screenHeight = screen.length;
	let resultColumn = new Array(screenHeight);

	for (let x = 0; x < screenHeight; x += 1) {
		resultColumn[(x + steps) % screenHeight] = screen[x][column];
	}
	for (let x = 0; x < screenHeight; x += 1) {
		screen[x][column] = resultColumn[x];
	}
}

function makeScreen(width, height) {
	let screen = new Array(height);
	for (let i = 0; i < screen.length; i += 1) {
		screen[i] = new Array(width).fill('.');
	}

	return screen;
}

function updateScreen(screen, instruction) {
	if (instruction.startsWith('rect')) {
		addRect(screen, instruction);
	} else if (instruction.startsWith('rotate')) {
		let rotateInstruction = instruction.substring(7);

		if (rotateInstruction.startsWith('row')) {
			rotateRow(screen, instruction);
		} else if (rotateInstruction.startsWith('column')) {
			rotateColumn(screen, instruction);
		}
	}
}

function solve(width, height, input) {
	let instructions = input.split(/\r?\n/);
	let screen = makeScreen(width, height);

	for (instruction of instructions) {
		updateScreen(screen, instruction);
	}

	return screen;
}

function countPixels(screen) {
	let pixels = 0;

	for (row of screen) {
		for (pixel of row) {
			if (pixel == '#') {
				pixels += 1;
			}
		}
	}

	return pixels;
}

module.exports.solve = solve;
module.exports.countPixels = countPixels;
