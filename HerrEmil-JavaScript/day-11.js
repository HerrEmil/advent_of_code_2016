const fs = require('fs');
const input = fs.readFileSync('day-11-input.txt').toString().trim();
console.log('Day 11, puzzle 1 solution: ' +
	getNumberOfSteps(input.split(/\r?\n/)));

/* jshint esversion: 6 */

function getInitialState(instructions) {
	let floors = [];
	let currentFloor = '';

	for (let i = 0; i < 4; ++i) {
		floors[i] = [];
		currentFloor = instructions[i].substring(
			instructions[i].indexOf('contains ') + 9);

		if (currentFloor.startsWith('nothing relevant')) {
			floors[i].push();
			break;
		}

		floors[i] = currentFloor
			.replace(' and ', ', ')
			.replace(', , ', ', ')
			.replace('.', '')
			.split(', ');

		const floorLength = floors[i].length;
		for (let j = 0; j < floorLength; ++j) {
			floors[i][j] = floors[i][j].replace(/a /g, '');
			floors[i][j] = floors[i][j].replace(/-compatible/g, '');
			floors[i][j] = floors[i][j].charAt(0) +
				floors[i][j].substr(floors[i][j].indexOf(' ') + 1, 1);
		}
	}

	return [
		0, // elevator position
		pairsToFloors(floorsToPairs(floors)), // floors
		0, // distance
	];
}

function chipsFrying(floor) {
	const chips = floor.filter((object) => object.charAt(1) === 'm');
	const generators = floor.filter((object) => object.charAt(1) === 'g');
	let chipType = '';

	if (generators.length > 0) {
		const chipsLength = chips.length;
		for (let i = 0; i < chipsLength; ++i) {
			chipType = chips[i].charAt(0);

			// Check if current chip has matching generator
			if (!generators.some((g) => g.charAt(0) === chipType)) {
				return true;
			}
		}
	}

	return false;
}

function pairsToFloors(pairs) {
	let floors = [
		[],
		[],
		[],
		[],
	];
	let materialChars = ['a', 'b', 'c', 'd', 'e'];

	for (let i = 0; i < pairs.length; ++i) {
		let stringPair = pairs[i].toString();

		if (pairs[i] < 10) {
			stringPair = '0' + stringPair;
		}

		floors[stringPair.charAt(0)].push(materialChars[i] + 'g');
		floors[stringPair.charAt(1)].push(materialChars[i] + 'm');
	}

	return floors;
}

function floorsToPairs(floors) {
	let pairs = [];
	let unpaired = {};

	for (let i = 0; i < floors.length; ++i) {
		for (let j = 0; j < floors[i].length; ++j) {
			unpaired[floors[i][j]] = i;
		}
	}

	for (object in unpaired) {
		if (unpaired.hasOwnProperty(object)) {
			pairs.push(object + unpaired[object]);
		}
	}

	pairs.sort();

	for (let i = 0; i < pairs.length; ++i) {
		pairs[i] = pairs[i].substring(pairs[i].length - 1);
	}

	let joinedPairs = [];

	for (let i = 0; i < pairs.length; i += 2) {
		joinedPairs.push(pairs[i] + pairs[i + 1]);
	}

	joinedPairs.sort();

	return joinedPairs;
}

function validState(state) {
	for (let i = 0; i < 4; ++i) {
		if (chipsFrying(state[1][i])) {
			return false;
		}
	}

	return true;
}

function getFollowingStates(state) {
	state[2] += 1;
	let moves = [];
	const numberOfObjects = state[1][state[0]].length;
	const floor = state[0];
	const above = floor + 1;
	const below = floor - 1;
	let nextState = JSON.parse(JSON.stringify(state));

	for (let i = 0; i < numberOfObjects; ++i) {
		if (floor < 3) {
			// Move one object up
			nextState[0] = above;
			nextState[1][above].push(nextState[1][floor].splice(i, 1)[0]);
			moves.push(nextState);
			nextState = JSON.parse(JSON.stringify(state));

			// Move two up (unless we're moving the last object on the floor)
			if (i < numberOfObjects - 1) {
				nextState[0] = above;
				let objects = nextState[1][floor].splice(i, 2);
				nextState[1][above].push(objects[0]);
				nextState[1][above].push(objects[1]);
				moves.push(nextState);
				nextState = JSON.parse(JSON.stringify(state));
			}
		}

		if (floor > 0) {
			// Move one object down
			nextState[0] = below;
			nextState[1][below].push(nextState[1][floor].splice(i, 1)[0]);
			moves.push(nextState);
			nextState = JSON.parse(JSON.stringify(state));

			// Move two down (unless we're moving the last object on the floor)
			if (i < numberOfObjects - 1) {
				nextState[0] = below;
				let objects = nextState[1][floor].splice(i, 2);
				nextState[1][below].push(objects[0]);
				nextState[1][below].push(objects[1]);
				moves.push(nextState);
				nextState = JSON.parse(JSON.stringify(state));
			}
		}
	}

	// remove invalid states
	moves = moves.filter((state) => validState(state));

	return moves;
}

function isFinal(state) {
	return state[0] === 3 &&
		state[1][0].length === 0 &&
		state[1][1].length === 0 &&
		state[1][2].length === 0;
}

function getNumberOfSteps(instructions) {
	const initial = getInitialState(instructions);
	let states = getFollowingStates(initial);
	let currentState = {};
	let previousStates = [];
	previousStates.push(initial[0] + floorsToPairs(initial[1]).join(''));

	while (states.length > 0) {
		currentState = states.splice(0, 1)[0];

		if (isFinal(currentState)) {
			return currentState[2];
		} else if (!previousStates.includes(currentState[0] +
				floorsToPairs(currentState[1]).join(''))) {
			let followingStates = getFollowingStates(currentState);
			let newStates = followingStates.filter(function(state) {
				return !previousStates.includes(state[0] +
					floorsToPairs(state[1]).join(''));
			});
			previousStates.push(currentState[0] +
				floorsToPairs(currentState[1]).join(''));
			states = states.concat(newStates);
		}
	}


	return -1;
}

module.exports.getNumberOfSteps = getNumberOfSteps;
