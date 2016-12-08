let assert = require('assert');
let puzzle = require('./day-06');

describe('Day 06, Puzzle 1', function() {
	it('should get the code "easter" given the example code', function() {
		assert.equal(puzzle.mostCommon('eedadn\ndrvtee\neandsr\nraavrd\natevrs\ntsrnev\nsdttsa\nrasrtv\nnssdts\nntnada\nsvetve\ntesnvt\nvntsnd\nvrdear\ndvrsen\nenarar'), 'easter');
	});
});
