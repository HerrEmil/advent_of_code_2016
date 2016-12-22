// const fs = require('fs');
// const input = fs.readFileSync('day-11-input.txt').toString().trim();
// console.log('Day 11, puzzle 1 solution: ' +
// 	getNumberOfSteps(input.split(/\r?\n/)));

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
		}
	}

	return {
		elevator: 0,
		distance: 0,
		floors: floors,
	};
}

function chipsFrying(floor) {
	const chips = floor.filter((object) => object.includes('microchip'));
	const generators = floor.filter((object) => object.includes('generator'));
	let chipType = '';

	if (generators.length > 0) {
		const chipsLength = chips.length;
		for (let i = 0; i < chipsLength; ++i) {
			chipType = chips[i].substr(0, chips[i].indexOf(' '));

			// Check if current chip has matching generator
			if (!generators.some((g) => g.startsWith(chipType))) {
				return true;
			}
		}
	}

	return false;
}

function getPairsString(state) {
	let pairs = [];
	let unpaired = {};

	for (let i = 0; i < state.floors.length; ++i) {
		for (let j = 0; j < state.floors[i].length; ++j) {
			unpaired[state.floors[i][j]] = i;
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

	return pairs.join('');
}

function validState(state) {
	for (let i = 0; i < 4; ++i) {
		if (chipsFrying(state.floors[i])) {
			return false;
		}
	}

	return true;
}

function getFollowingStates(state) {
	state.distance += 1;
	let moves = [];
	const numberOfObjects = state.floors[state.elevator].length;
	const floor = state.elevator;
	const above = floor + 1;
	const below = floor - 1;
	let nextState = JSON.parse(JSON.stringify(state));

	for (let i = 0; i < numberOfObjects; ++i) {
		if (floor < 3) {
			// Move one object up
			nextState.elevator = above;
			nextState.floors[above].push(nextState.floors[floor].splice(i, 1)[0]);
			moves.push(nextState);
			nextState = JSON.parse(JSON.stringify(state));

			// Move two up (unless we're moving the last object on the floor)
			if (i < numberOfObjects - 1) {
				nextState.elevator = above;
				let objects = nextState.floors[floor].splice(i, 2);
				nextState.floors[above].push(objects[0]);
				nextState.floors[above].push(objects[1]);
				moves.push(nextState);
				nextState = JSON.parse(JSON.stringify(state));
			}
		}

		if (floor > 0) {
			// Move one object down
			nextState.elevator = below;
			nextState.floors[below].push(nextState.floors[floor].splice(i, 1)[0]);
			moves.push(nextState);
			nextState = JSON.parse(JSON.stringify(state));

			// Move two down (unless we're moving the last object on the floor)
			if (i < numberOfObjects - 1) {
				nextState.elevator = below;
				let objects = nextState.floors[floor].splice(i, 2);
				nextState.floors[below].push(objects[0]);
				nextState.floors[below].push(objects[1]);
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
	return state.elevator === 3 &&
		state.floors[0].length === 0 &&
		state.floors[1].length === 0 &&
		state.floors[2].length === 0;
}

function getNumberOfSteps(instructions) {
	let initialState = getInitialState(instructions);
	let states = getFollowingStates(initialState);
	let currentState = {};
	let previousStates = [];

	while (states.length > 0) {
		currentState = states.splice(0, 1)[0];

		if (isFinal(currentState)) {
			return currentState.distance;
		} else if (!previousStates.includes(currentState.elevator +
				getPairsString(currentState))) {
			let followingStates = getFollowingStates(currentState);
			let newStates = followingStates.filter(function(state) {
				return !previousStates.includes(state.elevator + getPairsString(state));
			});
			previousStates.push(currentState.elevator + getPairsString(currentState));
			previousStates.sort();
			states = states.concat(newStates);
		}
	}

	return -1;
}

module.exports.getNumberOfSteps = getNumberOfSteps;


// Pairs could be represented as a pair of floor numbers, i.e. [1,1], [2,3],
// their names are not relevant
