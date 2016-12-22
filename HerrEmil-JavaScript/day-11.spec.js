let assert = require('assert');
let puzzle = require('./day-11');

const instructions = [
	'The first floor contains a hydrogen-compatible microchip and a lithium-compatible microchip.',
	'The second floor contains a hydrogen generator.',
	'The third floor contains a lithium generator.',
	'The fourth floor contains nothing relevant.',
];

describe('Day 11, Puzzle 1', function() {
	it('should collect all objects on 4th floor in 11 steps', function() {
		assert.equal(puzzle.getNumberOfSteps(instructions), 11);
	});
});
