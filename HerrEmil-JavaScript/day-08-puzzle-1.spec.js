let assert = require('assert');
let puzzle = require('./day-08');

const input =
	'rect 3x2\n' +
	'rotate column x=1 by 1\n' +
	'rotate row y=0 by 4\n' +
	'rotate column x=1 by 1';

const expectedOutput = [
	['.', '#', '.', '.', '#', '.', '#'],
	['#', '.', '#', '.', '.', '.', '.'],
	['.', '#', '.', '.', '.', '.', '.'],
];

describe('Day 08, Puzzle 1', function() {
	it('should display expected screen', function() {
		assert.deepEqual(puzzle.solve(7, 3, input), expectedOutput);
	});
});
