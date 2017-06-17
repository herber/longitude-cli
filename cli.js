#!/usr/bin/env node

'use strict';

const meow = require('meow');
const isIp = require('is-ip');
const longitude = require('longitude');

const cli = meow(`
	Usage
	  $ longitude [ip]

	Examples
	  $ longitude
	  Get geoip of this device

	  $ longitude 8.8.8.8
	  Get geoip of any ip

`);

if (cli.input[0] !== undefined) {
	if (!isIp(cli.input[0])) {
		console.log('No valid IP-Address specified');
		process.exit(1);
	}
}

longitude(cli.input[0]).then(data => {
	for (let key in data) {
		if (data[key] !== '') {
			let k = key.replace(/_|-/g, " ");
			console.log(k + ': ' + (data[key] || ''));
		}
	}
});
