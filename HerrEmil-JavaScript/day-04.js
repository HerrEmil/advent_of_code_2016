// Part 1
// let fs = require('fs');
// let roomList = fs.readFileSync('day-04-input.txt').toString().split(/\r?\n/);
// console.log('Sum of valid rooms: ' + sumValidRooms(roomList));

// Part 2
// for (let i = 0; i < roomList.length; i += 1) {
// 	if (decypher(roomList[i]) == 'northpole object storage') {
// 		console.log('northpole object storage section ID: ' +
// 			getsectorID(roomList[i]));
// 	}
// }

function getCode(room) {
	return room.substring(0, room.length - 11);
}

function getsectorID(room) {
	return parseInt(room.match(/\d+/));
}

function getChecksum(room) {
	return room.substring(room.length - 6, room.length - 1);
}

function sortByValueThenAlpha(a, b) {
	let value1 = a[1];
	let value2 = b[1];

	let alpha1 = a[0];
	let alpha2 = b[0];

	if (value1 < value2) return 1;
	if (value1 > value2) return -1;
	if (alpha1 < alpha2) return -1;
	if (alpha1 > alpha2) return 1;
	return 0;
}

function isValid(room) {
	let code = getCode(room).replace(/-/g, '').split('').sort();

	let values = [];
	let counts = [];
	let prev;
	for (let i = 0; i < code.length; i += 1) {
		if (code[i] !== prev) {
			values.push(code[i]);
			counts.push(1);
		} else {
			counts[counts.length - 1]++;
		}
		prev = code[i];
	}

	let valuesAndCounts = [];
	for (let i = 0; i < values.length; i += 1) {
		valuesAndCounts[i] = [values[i], counts[i]];
	}
	let sortedValuesAndCounts = valuesAndCounts.sort(sortByValueThenAlpha);

	let checksum = '';
	for (let i = 0; i < 5; i += 1) {
		checksum += sortedValuesAndCounts[i][0];
	}

	return checksum == getChecksum(room);
}

function sumValidRooms(rooms) {
	let sectorIDSum = 0;

	for (room of rooms) {
		if (isValid(room)) {
			sectorIDSum += getsectorID(room);
		}
	}

	return sectorIDSum;
}

function shift(char, steps) {
	return String.fromCharCode(((char.charCodeAt(0) - 97 + steps) % 26) + 97);
}

function decypher(encrypted) {
	let decrypted = '';
	let steps = getsectorID(encrypted);

	for (let i = 0; i < encrypted.length; i += 1) {
		if (encrypted.charAt(i) == '-') {
			decrypted += ' ';
		} else if (encrypted.charAt(i).match(/\d/)) {
			decrypted = decrypted.slice(0, -1);
			break;
		} else {
			decrypted += shift(encrypted.charAt(i), steps);
		}
	}
	return decrypted;
}

module.exports.isValid = isValid;
module.exports.sumValidRooms = sumValidRooms;
module.exports.shift = shift;
module.exports.decypher = decypher;
