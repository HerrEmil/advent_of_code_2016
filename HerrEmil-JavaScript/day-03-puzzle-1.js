let fs = require('fs');

// Part 1
let triangles = fs
	.readFileSync('day-03-triangles.txt')
	.toString()
	.split(/\r?\n/);

let validTriangleCount = 0;
for (triangle of triangles) {
	if (checkTriangleValidity(triangle) === true) {
		validTriangleCount += 1;
	}
}

// console.log('Part 1 answer: ' + validTriangleCount);


// Part 2
let values = fs.readFileSync('day-03-triangles.txt').toString().match(/\S+/g);

let columnTriangles = [];
for (let i = 0; i < values.length; i += 9) {
	for (let j = 0; j < 3; j += 1) {
		columnTriangle = [values[i + j], values[i + j + 3], values[i + j + 6]];
		columnTriangles.push(columnTriangle.join(' '));
	}
}

let validColumnTriangleCount = 0;
for (triangle of columnTriangles) {
	if (checkTriangleValidity(triangle) === true) {
		validColumnTriangleCount += 1;
	}
}

// console.log('Part 2 answer: ' + validColumnTriangleCount);


function arrayParseInt(triangle) {
	numberTriangle = [];
	for (let i = 0; i < triangle.length; i += 1) {
		numberTriangle.push(parseInt(triangle[i]));
	}
	return numberTriangle;
}

function checkTriangleValidity(input) {
	let sides = input.match(/\S+/g);
	sides = arrayParseInt(sides);
	sides.sort((a, b) => a - b);

	return sides[0] + sides[1] > sides[2];
}

module.exports.solve = checkTriangleValidity;
