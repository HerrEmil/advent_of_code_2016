// let fs = require('fs');
// let input = fs.readFileSync('day-09-input.txt').toString();
// console.log('Day 09, puzzle 1 solution: ' + decompress(input).length);
// console.log('Day 09, puzzle 2 solution: ' + decompressV2length(input));

function getNextMarker(compressed) {
	for (let i = 0; i < compressed.length; i += 1) {
		if (compressed.charAt(i) == '(') {
			let substring = compressed.substring(i);
			let charCountIndex = 1;
			let charCount = substring.substring(
				charCountIndex, substring.indexOf('x'));

			if (parseInt(charCount) != NaN) {
				let repitionCountIndex = substring.indexOf(charCount) +
					charCount.length + 1;
				let repitionCount = substring.substring(repitionCountIndex,
					substring.indexOf(')'));
				if (parseInt(repitionCount) != NaN) {
					return '(' + charCount + 'x' + repitionCount + ')';
				}
			}
		}
	}
}

function getNextCompressedString(compressed) {
	let charCount = compressed.substring(compressed.indexOf('(') + 1,
		compressed.indexOf('x'));
	let repitionCount = compressed.substring(compressed.indexOf('x') + 1,
		compressed.indexOf(')'));

	let stringAfterMarker = compressed.substring(compressed.indexOf(')') + 1);

	let resultString = '';

	for (let i = 0; i < repitionCount; i += 1) {
		resultString += stringAfterMarker.substring(0, charCount);
	}

	return resultString;
}

function decompress(compressed) {
	let decrompressed = '';

	for (let i = 0; i < compressed.length; i += 1) {
		let nextMarker = getNextMarker(compressed.substring(i));
		if (nextMarker == undefined) {
			// No more markers, copy rest of string and return
			decrompressed += compressed.substring(i);
			return decrompressed;
		}
		let stepsToNextMarker = compressed.substring(i).indexOf(nextMarker);
		if (stepsToNextMarker > 0) {
			decrompressed += compressed.substring(i, i + stepsToNextMarker);
			i += stepsToNextMarker - 1;
		}
		if (stepsToNextMarker == 0) {
			decrompressed += getNextCompressedString(compressed.substring(i));
			i += nextMarker.length; // jump over marker
			let markerCharCount = parseInt(nextMarker.substring(
				nextMarker.indexOf('(') + 1, nextMarker.indexOf('x')));
			i += markerCharCount; // jump over compressed string
			i -= 1; // Hacky solution to every loop increasing by 1
		}
	}

	return decrompressed;
}

function decompressV2length(remainingCode) {
	let decrompressedLength = 0;

	while (true) {
		// console.log('remainingCode: ' + remainingCode);
		let nextMarker = getNextMarker(remainingCode);
		if (nextMarker == undefined) {
			decrompressedLength += remainingCode.length;
			return decrompressedLength;
		}
		let stepsToNextMarker = remainingCode.indexOf(nextMarker);
		if (stepsToNextMarker > 0) {
			decrompressedLength += stepsToNextMarker;
			// remove stepsToNextMarker characters from start of remainingCode
			remainingCode = remainingCode.substring(stepsToNextMarker);
		}
		if (stepsToNextMarker == 0) {
			decrompressedLength += decompressV2length(
				getNextCompressedString(remainingCode));
			let markerCharCount = parseInt(nextMarker.substring(
				nextMarker.indexOf('(') + 1, nextMarker.indexOf('x')));
			// remove marker from start of remaining Code
			remainingCode = remainingCode.substring(
				nextMarker.length + markerCharCount);
		}
	}
}


module.exports.decompress = decompress;
module.exports.decompressV2length = decompressV2length;
