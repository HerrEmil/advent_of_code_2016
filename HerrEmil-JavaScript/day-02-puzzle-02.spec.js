let assert = require('assert');
let puzzle = require('./day-02-puzzle-02');

describe('Day 02, Puzzle 02 solution', function() {
	it('should be 5DB3 given example code', function() {
		assert.equal(puzzle.solve('ULL\r\nRRDDD\r\nLURDL\r\nUUUUD'), '5DB3');
	});
});
