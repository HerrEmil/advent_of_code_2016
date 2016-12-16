// const fs = require('fs');
// const input = fs.readFileSync('day-10-input.txt').toString().trim();
// const outputs = getOutputs(input.split(/\r?\n/));
// console.log('Day 10, puzzle 2 solution: ' + outputs[0]*outputs[1]*outputs[2]);


function createBot(bots, rule) {
	const botNumber = parseInt(rule.substring(
		rule.indexOf('bot ') + 4,
		rule.indexOf(' gives')));
	const givesLowTo = rule.substring(
		rule.indexOf('low to ') + 7,
		rule.indexOf(' and'));
	const givesHighTo = rule.substring(
		rule.indexOf('high to ') + 8);

	bots[botNumber] = {
		givesLowTo: givesLowTo,
		givesHighTo: givesHighTo,
		values: [],
	};
}

function giveBotValue(bots, rule) {
	const value = parseInt(rule.substring(6, rule.indexOf(' goes')));
	const botNumber = parseInt(rule.substring(rule.indexOf('bot ') + 4));

	bots[botNumber].values.push(value);
}

function takeBotValues(outputBins, bots, i) {
	const lowValue = Math.min(...bots[i].values);
	const highValue = Math.max(...bots[i].values);
	const lowValueTarget = bots[i].givesLowTo.substring(
		bots[i].givesLowTo.lastIndexOf(' ') + 1);
	const highValueTarget = bots[i].givesHighTo.substring(
		bots[i].givesHighTo.lastIndexOf(' ') + 1);

	bots[i].values.length = 0;

	// if (lowValue === 17 && highValue === 61) {
	// 	console.log('Day 10, puzzle 1 solution: ' + i);
	// }

	if (bots[i].givesHighTo.startsWith('output')) {
		outputBins[highValueTarget] = highValue;
	} else if (bots[i].givesHighTo.startsWith('bot')) {
		bots[highValueTarget].values.push(highValue);
	}

	if (bots[i].givesLowTo.startsWith('output')) {
		outputBins[lowValueTarget] = lowValue;
	} else if (bots[i].givesLowTo.startsWith('bot')) {
		bots[lowValueTarget].values.push(lowValue);
	}
}

function hasTwoValues(bot, index, array) {
	return bot.values.length === 2;
}

function zoomAround(outputBins, bots) {
	let i = 0;
	const botsLength = bots.length;
	for (; i < botsLength; ++i) {
		if (hasTwoValues(bots[i])) {
			takeBotValues(outputBins, bots, i);
		}
	}

	if (bots.some(hasTwoValues)) {
		zoomAround(outputBins, bots);
	}
}

function getOutputs(rules) {
	let outputBins = [];
	let bots = [];

	for (rule of rules) {
		if (rule.startsWith('bot')) {
			createBot(bots, rule);
		}
	}

	for (rule of rules) {
		if (rule.startsWith('value')) {
			giveBotValue(bots, rule);
		}
	}

	zoomAround(outputBins, bots);

	return outputBins;
}

module.exports.getOutputs = getOutputs;
