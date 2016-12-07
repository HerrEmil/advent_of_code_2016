let md5 = require('md5');

// console.log('Day 05, part 1 solution: ' + getDoor1Password('reyedfim'));
// console.log('Day 05, part 2 solution: ' + getDoor2Password('reyedfim'));

function getDoor1Password(input) {
	let startTime = Date.now();
	let i = 0;
	let password = '';
	let done = false;

	while ((Date.now() - startTime) < 60000 && !done) {
		let hash = md5(input + i);

		if (hash.substring(0, 5) == '00000') {
			password += hash.charAt(5);
			if (password.length > 7) {
				done = true;
			}
		}

		i += 1;
	}

	return password;
}

function getDoor2Password(input) {
	let startTime = Date.now();
	let i = 0;
	let pass = ['_', '_', '_', '_', '_', '_', '_', '_'];
	let done = false;
	let hash = '';

	while ((Date.now() - startTime) < 600000 && !done) {
		hash = md5(input + i);

		if (hash.substring(0, 5) == '00000') {
			let pos = hash.charAt(5);
			let char = hash.charAt(6);
			if (pos < 8 && pass[pos] == '_') {
				pass[pos] = char;
			}
			// console.log(pass);
			if (pass.every((x) => x != '_')) {
				done = true;
			}
		}

		i += 1;
	}

	return pass.join('');
}

module.exports.getDoor1Password = getDoor1Password;
module.exports.getDoor2Password = getDoor2Password;
