let assert = require('assert');
let puzzle = require('./day-06');

describe('Day 06, Puzzle 2', function() {
	it('should get the code "advent" given the example code', function() {
		assert.equal(puzzle.leastCommon('eedadn\ndrvtee\neandsr\nraavrd\natevrs\ntsrnev\nsdttsa\nrasrtv\nnssdts\nntnada\nsvetve\ntesnvt\nvntsnd\nvrdear\ndvrsen\nenarar'), 'advent');
	});
});
