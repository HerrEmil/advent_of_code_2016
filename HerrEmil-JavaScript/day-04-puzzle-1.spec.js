let assert = require('assert');
let puzzle = require('./day-04');

describe('Day 04, Puzzle 1', function() {
	it('should recognize "aaaaa-bbb-z-y-x-123[abxyz]" as a valid room',
		function() {
			assert.equal(puzzle.isValid('aaaaa-bbb-z-y-x-123[abxyz]'), true);
		});

	it('should recognize "a-b-c-d-e-f-g-h-987[abcde]" as a valid room',
		function() {
			assert.equal(puzzle.isValid('a-b-c-d-e-f-g-h-987[abcde]'), true);
		});

	it('should recognize "not-a-real-room-404[oarel]" as a valid room',
		function() {
			assert.equal(puzzle.isValid('not-a-real-room-404[oarel]'), true);
		});

	it('should recognize "totally-real-room-200[decoy]" as an invalid room',
		function() {
			assert.equal(puzzle.isValid('totally-real-room-200[decoy]'), false);
		});

	it('should recognize "bxaxipgn-vgpst-qphzti-rdcipxcbtci-635[ipctx]" as valid',
		function() {
			assert.equal(
				puzzle.isValid('bxaxipgn-vgpst-qphzti-rdcipxcbtci-635[ipctx]'), true);
		});

	it('should sum up sector IDs of valid rooms in the example list to 1514',
		function() {
			assert.equal(puzzle.sumValidRooms([
				'aaaaa-bbb-z-y-x-123[abxyz]',
				'a-b-c-d-e-f-g-h-987[abcde]',
				'not-a-real-room-404[oarel]',
				'totally-real-room-200[decoy]',
			]), 1514);
		});
});
