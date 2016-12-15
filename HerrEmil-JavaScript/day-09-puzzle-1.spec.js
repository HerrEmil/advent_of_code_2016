let assert = require('assert');
let puzzle = require('./day-09');

describe('Day 09, Puzzle 1', function() {
	it('should decompress "ADVENT" into "ADVENT"', function() {
		assert.equal(puzzle.decompress('ADVENT'), 'ADVENT');
	});
	it('should decompress "A(1x5)BC" into "ABBBBBC"', function() {
		assert.equal(puzzle.decompress('A(1x5)BC'), 'ABBBBBC');
	});
	it('should decompress "(3x3)XYZ" into "XYZXYZXYZ"', function() {
		assert.equal(puzzle.decompress('(3x3)XYZ'), 'XYZXYZXYZ');
	});
	it('should decompress "A(2x2)BCD(2x2)EFG" into "ABCBCDEFEFG"', function() {
		assert.equal(puzzle.decompress('A(2x2)BCD(2x2)EFG'), 'ABCBCDEFEFG');
	});
	it('should decompress "(6x1)(1x3)A" into "(1x3)A"', function() {
		assert.equal(puzzle.decompress('(6x1)(1x3)A'), '(1x3)A');
	});
	it('should decompress "X(8x2)(3x3)ABCY" into "X(3x3)ABC(3x3)ABCY"',
		function() {
			assert.equal(puzzle.decompress('X(8x2)(3x3)ABCY'), 'X(3x3)ABC(3x3)ABCY');
		});
});
