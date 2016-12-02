let day1 = require('./day-01-common');


function move(position, direction, instruction) {
	let distance = instruction.substring(1, instruction.length);
	position[0] += direction[0] * distance;
	position[1] += direction[1] * distance;
}


function solve(input) {
	let instructions = input.split(', ');
	let direction = [1, 0];
	let position = [0, 0];

	for (instruction of instructions) {
		day1.turn(direction, instruction);
		move(position, direction, instruction);
	}

	return day1.getManhattanDistance(position);
}


module.exports.solve = solve;
