var autobahn = require('autobahn');

var wampConnection = null;
var wampUser = 'web';
var wampPassword = wampUser;

function onChallenge(wampSession, method, extra) {
	if (method == 'wampcra') {
		return autobahn.auth_cra.sign(wampPassword, extra.challenge);
	}
};

function connectionOpen(session, details) {
	console.log("connected");
	wampSession.subscribe('found_block_updates', onBlockUpdate);
	wampSession.call('f_all_miner_updates', ['0a7a6fade943f7b6b9e96b4d1516bfcc733b5158af18d1b43aeec7e45a238c02']).then(initialSessionUpdatesReceived);
}

function onBlockUpdate(block) {
	//Handle found blocks here.
	console.log("block", block);
}

function initialSessionUpdatesReceived(updates) {
	//Handle the first update of miner information here.
	wampSession.subscribe('miner_updates_0a7a6fade943f7b6b9e96b4d1516bfcc733b5158af18d1b43aeec7e45a238c02', onMinerUpdate);
}

function onMinerUpdate(update) {
	//Handle live miner updates here.
	console.log(update);
}

wampConnection = new autobahn.Connection({
	url: 'wss://live.prohashing.com:443/ws',
	realm: 'mining',
	authmethods: ['wampcra'],
	authid: wampUser,
	onchallenge: onChallenge
});

console.log("try to connect");
wampConnection.onopen = connectionOpen;
wampConnection.open();