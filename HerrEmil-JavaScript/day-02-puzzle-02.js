const keypad = [
	'0000000',
	'0001000',
	'0023400',
	'0567890',
	'00ABC00',
	'000D000',
	'0000000',
];

let currentX = 1;
let currentY = 3;

function updatePosition(instruction) {
	if (instruction == 'U' &&
		keypad[currentY - 1].charAt(currentX) != 0) {
		currentY -= 1;
	} else if (instruction == 'L' &&
		keypad[currentY].charAt(currentX - 1) != 0) {
		currentX -= 1;
	} else if (instruction == 'R' &&
		keypad[currentY].charAt(currentX + 1) != 0) {
		currentX += 1;
	} else if (instruction == 'D' &&
		keypad[currentY + 1].charAt(currentX) != 0) {
		currentY += 1;
	}

	return keypad[currentY].charAt(currentX);
}

function navigate(instructions) {
	for (instruction of instructions) {
		position = updatePosition(instruction);
	}

	return position;
}

function solve(string) {
	let lines = string.split(/\r?\n/);
	let output = '';

	for (line of lines) {
		output += navigate(line);
	}

	return output;
}

// let fs = require('fs');
// let bathroomCode = fs.readFileSync('day-02-bathroom-code.txt').toString();
// let answer = solve(bathroomCode);
// console.log(answer);

module.exports.solve = solve;
