let assert = require('assert');
let puzzle = require('./day-05');

describe('Day 05, Puzzle 2', function() {
	this.timeout(0);
	it('should get the code "05ace8e3" from door "abc"', function() {
		assert.equal(puzzle.getDoor2Password('abc'), '05ace8e3');
	});
});
