let assert = require('assert');
let puzzle = require('./day-07');

describe('Day 07, Puzzle 2', function() {
	it('should verify that "aba[bab]xyz" supports SSL', function() {
		assert.equal(puzzle.supportsSSL('aba[bab]xyz'), true);
	});
	it('should verify that "xyx[xyx]xyx" does not support SSL', function() {
		assert.equal(puzzle.supportsSSL('xyx[xyx]xyx'), false);
	});
	it('should verify that "aaa[kek]eke" does not support SSL', function() {
		assert.equal(puzzle.supportsSSL('aaa[kek]eke'), true);
	});
	it('should verify that "zazbz[bzb]cdb" supports SSL', function() {
		assert.equal(puzzle.supportsSSL('zazbz[bzb]cdb'), true);
	});
});
