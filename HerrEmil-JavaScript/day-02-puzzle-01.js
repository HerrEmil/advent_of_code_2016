function updatePosition(position, instruction) {
	if (instruction == 'U') {
		if (position > 3) {
			position -= 3;
		}
	} else if (instruction == 'L') {
		if (position % 3 != 1) {
			position -= 1;
		}
	} else if (instruction == 'R') {
		if (position % 3 != 0) {
			position += 1;
		}
	} else if (instruction == 'D') {
		if (position < 7) {
			position += 3;
		}
	}

	return position;
}

function navigate(instructions, position) {
	for (instruction of instructions) {
		position = updatePosition(position, instruction);
	}

	return position;
}

function solve(string) {
	let lines = string.split(/\r?\n/);
	let output = '';

	for (let i = 0; i < lines.length; i += 1) {
		if (i == 0) {
			output += navigate(lines[0], 5);
		} else {
			output += navigate(lines[i], parseInt(output.slice(-1)), 10);
		}
	}
	return parseInt(output, 10);
}

// let fs = require('fs');
// let bathroomCode = fs.readFileSync('day-02-bathroom-code.txt').toString();
// let answer = solve(bathroomCode);
// console.log(answer);

module.exports.solve = solve;
