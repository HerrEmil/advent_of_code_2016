let assert = require('assert');
let puzzle = require('./day-04');

describe('Day 04, Puzzle 2', function() {
	it('should shift "a" to "b"', function() {
		assert.equal(puzzle.shift('a', 1), 'b');
	});
	it('should shift "z" to "a"', function() {
		assert.equal(puzzle.shift('z', 1), 'a');
	});
	it('should decypher "qzmt-zixmtkozy-ivhz-343" to "very encrypted name"',
		function() {
			assert.equal(puzzle.decypher(
				'qzmt-zixmtkozy-ivhz-343'), 'very encrypted name');
		});
});
