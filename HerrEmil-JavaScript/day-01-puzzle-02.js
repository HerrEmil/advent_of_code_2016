let day1 = require('./day-01-common');


function move(position, direction, instruction, visited, repeated) {
	let distance = instruction.substring(1, instruction.length);
	let nextPosition = [];

	for (let i = 0; i < distance; i += 1) {
		nextPosition[0] = position[0] + direction[0];
		nextPosition[1] = position[1] + direction[1];

		for(visitedPosition of visited) {
			if (visitedPosition[0] == nextPosition[0] &&
				visitedPosition[1] == nextPosition[1]) {
				repeated.push([nextPosition[0], nextPosition[1]]);
			}
		}
		position[0] = nextPosition[0];
		position[1] = nextPosition[1];
		visited.push([position[0], position[1]]);
	}
}


function solve(input) {
	let instructions = input.split(', ');
	let direction = [1, 0];
	let position = [0, 0];
	let repeated = [];
	let visited = [];

	for (instruction of instructions) {
		day1.turn(direction, instruction);
		move(position, direction, instruction, visited, repeated);
	}

	return day1.getManhattanDistance(repeated[0]);
}

module.exports.solve = solve;
