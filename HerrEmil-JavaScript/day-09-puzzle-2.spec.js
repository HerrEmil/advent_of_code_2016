let assert = require('assert');
let puzzle = require('./day-09');

describe('Day 09, Puzzle 2', function() {
	it('should decompress "(3x3)XYZ" into "XYZXYZXYZ"', function() {
		assert.equal(puzzle.decompressV2length('(3x3)XYZ'), 9);
	});

	it('should decompress "X(8x2)(3x3)ABCY" into "XABCABCABCABCABCABCY"',
		function() {
			assert.equal(puzzle.decompressV2length('X(8x2)(3x3)ABCY'), 20);
		});

	it('should decompress "(27x12)(20x12)(13x14)(7x10)(1x12)A" into a 241920 character long string',
		function() {
			assert.equal(puzzle.decompressV2length('(27x12)(20x12)(13x14)(7x10)(1x12)A'), 241920);
		});

	it('should decompress "(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN" into a 445 character long string',
		function() {
			assert.equal(puzzle.decompressV2length('(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN'), 445);
		});
});
