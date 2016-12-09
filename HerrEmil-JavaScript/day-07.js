// let fs = require('fs');
// let input = fs.readFileSync('day-07-input.txt').toString().split(/\r?\n/);
// let count = 0;
// for (address of input) {
// 	if (supportsTLS(address)) {
// 		count += 1;
// 	}
// }
// console.log('Day 07, puzzle 1 solution: ' + count);
// count = 0;
// for (address of input) {
// 	if (supportsSSL(address)) {
// 		count += 1;
// 	}
// }
// console.log('Day 07, puzzle 2 solution: ' + count);

function getSupernetSequences(address) {
	let sequences = [];
	let sequence = '';
	let supernet = true;

	for (char of address) {
		if (supernet) {
			if (char == '[') {
				supernet = false;
				sequences.push(sequence);
				sequence = '';
			} else {
				sequence += char;
			}
		} else if (char == ']') {
			supernet = true;
		}
	}
	sequences.push(sequence);
	return sequences;
}

function getHypernetSequences(address) {
	let sequences = [];
	let sequence = '';
	let hypernet = false;

	for (char of address) {
		if (hypernet) {
			if (char == ']') {
				hypernet = false;
				sequences.push(sequence);
				sequence = '';
			} else {
				sequence += char;
			}
		} else if (char == '[') {
			hypernet = true;
		}
	}

	return sequences;
}

function containsABBA(sequence) {
	for (let i = 0; i < sequence.length; i += 1) {
		if (sequence.charAt(i) == sequence.charAt(i + 3) &&
			sequence.charAt(i) != sequence.charAt(i + 1) &&
			sequence.charAt(i + 1) == sequence.charAt(i + 2)) {
			return true;
		}
	}
	return false;
}

function supportsTLS(address) {
	let supernetSequences = getSupernetSequences(address);
	let hypernetSequences = getHypernetSequences(address);

	for (sequence of hypernetSequences) {
		if (containsABBA(sequence)) {
			return false;
		}
	}

	for (sequence of supernetSequences) {
		if (containsABBA(sequence)) {
			return true;
		}
	}

	return false;
}

function supportsSSL(address) {
	let supernetSequences = getSupernetSequences(address);
	let hypernetSequences = getHypernetSequences(address);

	let ABAs = [];

	for (sequence of supernetSequences) {
		for (let i = 0; i < sequence.length; i += 1) {
			if (sequence.charAt(i) == sequence.charAt(i + 2) &&
				sequence.charAt(i) != sequence.charAt(i + 1)) {
				ABAs.push(sequence.substring(i, i + 3));
			}
		}
	}

	for (sequence of hypernetSequences) {
		for (ABA of ABAs) {
			for (let i = 0; i < sequence.length; i += 1) {
				if (sequence.charAt(i) == ABA.charAt(1) &&
					sequence.charAt(i + 1) == ABA.charAt(0) &&
					sequence.charAt(i + 2) == ABA.charAt(1)) {
					return true;
				}
			}
		}
	}

	return false;
}

module.exports.supportsTLS = supportsTLS;
module.exports.supportsSSL = supportsSSL;
