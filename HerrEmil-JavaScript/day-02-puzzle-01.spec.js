let assert = require('assert');
let puzzle = require('./day-02-puzzle-01');

describe('Day 02, Puzzle 01 solution', function() {
	it('should be 1985 given example code', function() {
		assert.equal(puzzle.solve('ULL\r\nRRDDD\r\nLURDL\r\nUUUUD'), 1985);
	});
});
