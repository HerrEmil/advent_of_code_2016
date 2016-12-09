let assert = require('assert');
let puzzle = require('./day-07');

describe('Day 07, Puzzle 1', function() {
	it('should verify that "abba[mnop]qrst" supports TLS', function() {
		assert.equal(puzzle.supportsTLS('abba[mnop]qrst'), true);
	});
	it('should verify that "abcd[bddb]xyyx" does not support TLS', function() {
		assert.equal(puzzle.supportsTLS('abcd[bddb]xyyx'), false);
	});
	it('should verify that "aaaa[qwer]tyui" does not support TLS', function() {
		assert.equal(puzzle.supportsTLS('aaaa[qwer]tyui'), false);
	});
	it('should verify that "ioxxoj[asdfgh]zxcvbn" supports TLS', function() {
		assert.equal(puzzle.supportsTLS('ioxxoj[asdfgh]zxcvbn'), true);
	});
});
