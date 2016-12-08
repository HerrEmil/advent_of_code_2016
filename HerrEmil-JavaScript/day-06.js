// let fs = require('fs');
// let input = fs.readFileSync('day-06-input.txt').toString();
// console.log('Day 06, puzzle 1 solution: ' + mostCommon(input));
// console.log('Day 06, puzzle 2 solution: ' + leastCommon(input));


function transposeArray(array) {
	let newArray = [];
	for (let i = 0; i < array[0].length; i++) {
		newArray.push([]);
	};

	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < array[0].length; j++) {
			newArray[j].push(array[i][j]);
		};
	};

	return (newArray);
}

function sortByFrequency(array) {
	let frequency = {};

	array.forEach(function(value) {
		frequency[value] = 0;
	});

	let uniques = array.filter(function(value) {
		return ++frequency[value] == 1;
	});

	return uniques.sort(function(a, b) {
		return frequency[b] - frequency[a];
	});
}

function mostCommon(input) {
	let encrypted = input.split(/\r?\n/);
	let transposed = transposeArray(encrypted);
	let decrypted = [];
	let sorted = [];

	for (let i = 0; i < transposed.length; i += 1) {
		sorted[i] = sortByFrequency(transposed[i]);
		decrypted[i] = sorted[i][0];
	}

	return decrypted.join('');
}

function leastCommon(input) {
	let encrypted = input.split(/\r?\n/);
	let transposed = transposeArray(encrypted);
	let decrypted = [];
	let sorted = [];

	for (let i = 0; i < transposed.length; i += 1) {
		sorted[i] = sortByFrequency(transposed[i]);
		decrypted[i] = sorted[i][sorted[i].length - 1];
	}

	return decrypted.join('');
}

module.exports.mostCommon = mostCommon;
module.exports.leastCommon = leastCommon;
