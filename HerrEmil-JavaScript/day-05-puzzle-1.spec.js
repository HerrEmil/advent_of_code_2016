let assert = require('assert');
let puzzle = require('./day-05');

describe('Day 05, Puzzle 1', function() {
	this.timeout(0);
	it('should get the code "18f47a30" from door "abc"', function() {
		assert.equal(puzzle.getDoor1Password('abc'), '18f47a30');
	});
});
