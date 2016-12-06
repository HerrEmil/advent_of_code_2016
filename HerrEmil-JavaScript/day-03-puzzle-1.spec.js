let assert = require('assert');
let puzzle = require('./day-03-puzzle-1');

describe('Day 03, Puzzle 1 solution', function() {
	it('should be false given input "5, 10, 25"', function() {
		assert.equal(puzzle.solve('5 10 25'), false);
	});
});
