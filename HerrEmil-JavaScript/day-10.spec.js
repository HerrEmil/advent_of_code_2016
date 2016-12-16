let assert = require('assert');
let puzzle = require('./day-10');

const instructions = [
	'value 5 goes to bot 2',
	'bot 2 gives low to bot 1 and high to bot 0',
	'value 3 goes to bot 1',
	'bot 1 gives low to output 1 and high to bot 0',
	'bot 0 gives low to output 2 and high to output 0',
	'value 2 goes to bot 2',
];

const expectedOutputBins = [5, 2, 3];

describe('Day 10, Puzzle 1', function() {
	it('should get expected values in output bins after example instructions',
		function() {
			assert.deepEqual(puzzle.getOutputs(instructions), expectedOutputBins);
		});
});
