module.exports.turn = function(direction, instruction) {
	let leftOrRight = instruction.charAt(0);

	if (leftOrRight == 'L') {
		// x = y, y = -x
		[direction[0], direction[1]] = [direction[1], -direction[0]];
	} else {
		// x = -y, y = x
		[direction[0], direction[1]] = [-direction[1], direction[0]];
	}
};


module.exports.getManhattanDistance = function(position) {
	return Math.abs(position[0]) + Math.abs(position[1]);
};
