const fs = require('fs');
const input = fs.readFileSync('day-09-input.txt').toString();
console.log('Day 09, puzzle 1 solution: ' + decompress(input).length);
// console.log('Day 09, puzzle 2 solution: ' + decompressV2length(input));

function getNextMarker(compressed) {
	let i = 0;
	const compressedLength = compressed.length;
	for (; i < compressedLength; ++i) {
		if (compressed.charAt(i) === '(') {
			const substring = compressed.substring(i);
			const charCount = substring.substring(1, substring.indexOf('x'));

			if (parseInt(charCount) != NaN) {
				const repitionCountIndex = substring.indexOf(charCount) +
					charCount.length + 1;
				const repitionCount = substring.substring(repitionCountIndex,
					substring.indexOf(')'));
				if (parseInt(repitionCount) != NaN) {
					return '(' + charCount + 'x' + repitionCount + ')';
				}
			}
		}
	}
}

function getNextCompressedString(compressed) {
	const charCount = compressed.substring(compressed.indexOf('(') + 1,
		compressed.indexOf('x'));
	const repitionCount = compressed.substring(compressed.indexOf('x') + 1,
		compressed.indexOf(')'));

	const stringAfterMarker = compressed.substring(compressed.indexOf(')') + 1);

	let resultString = '';
	const stringToRepeat = stringAfterMarker.substring(0, charCount);

	let i = 0;
	for (; i < repitionCount; ++i) {
		resultString += stringToRepeat;
	}

	return resultString;
}

function decompress(compressed) {
	let decrompressed = '';

	let i = 0;
	const compressedLength = compressed.length;
	for (; i < compressedLength; ++i) {
		const nextMarker = getNextMarker(compressed.substring(i));
		if (nextMarker === undefined) {
			// No more markers, copy rest of string and return
			decrompressed += compressed.substring(i);
			return decrompressed;
		}
		const stepsToNextMarker = compressed.substring(i).indexOf(nextMarker);
		if (stepsToNextMarker > 0) {
			decrompressed += compressed.substring(i, i + stepsToNextMarker);
			i += stepsToNextMarker - 1;
		}
		if (stepsToNextMarker === 0) {
			decrompressed += getNextCompressedString(compressed.substring(i));
			i += nextMarker.length; // jump over marker
			const markerCharCount = parseInt(nextMarker.substring(
				nextMarker.indexOf('(') + 1, nextMarker.indexOf('x')));
			i += markerCharCount; // jump over compressed string
			i -= 1; // Hacky solution to every loop increasing by 1
		}
	}

	return decrompressed;
}

function decompressV2length(code) {
	const nextMarker = getNextMarker(code);
	const stepsToMarker = code.indexOf(nextMarker);

	if (stepsToMarker === 0) {
		const length = decompressV2length(getNextCompressedString(code));
		const markerCharCount = parseInt(nextMarker.substring(
			nextMarker.indexOf('(') + 1, nextMarker.indexOf('x')));

		return length + decompressV2length(code.substring(nextMarker.length +
			markerCharCount));
	}

	if (stepsToMarker > 0) {
		return stepsToMarker + decompressV2length(code.substring(stepsToMarker));
	}

	if (nextMarker === undefined) {
		return code.length;
	}
}


module.exports.decompress = decompress;
module.exports.decompressV2length = decompressV2length;
