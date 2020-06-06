// Interaction with Ethereum
var Web3 = require('web3');
var web3 = new Web3();

// connect to the local node
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8042'));

// The contract that we are going to interact with
var contractAddress = '0xAc52eE6EAF8b68D0697e6a324EDE0321BF2a8711';

// Load config data from SmartToken.json
var config = require('../build/contracts/SmartToken.json');

// Read ABI
var ABI = config.abi;

// contract object
var contract = web3.eth.contract(ABI).at(contractAddress);

//-------------------------- test demo -------------------------------
var test_node = "node_82";

//list value in all account
//list_all();
get_token(test_node);

//deposit_token(getAddress(test_node), 3);
withdraw_token(getAddress(test_node), 1);

// display initial state
//showStatus()

//get_token('lab1');
account_onValueChanged(getAddress(test_node));


//====================================== function for test ==================================
// wait for an event triggered on the Smart Contract
function account_onValueChanged(address) {
	var onValueChanged = contract.OnValueChanged({sender: address});

	onValueChanged.watch(function(error, result) {
		if (!error) {
			//showStatus()
			var token = contract.getTokens(address);
			console.log(token);

			//stop watching
			onValueChanged.stopWatching();
		}
	})
}

// display value of the token in coinbase account
function showStatus() {

	// retrieve  token value
	var token = contract.getTokens(web3.eth.coinbase);

	// display token value of eth.coinbase
	console.log(token);

}

// list all account's token data of eth.coinbase node
function list_all() {
	for (i = 0; i < web3.eth.accounts.length; i++) { 
		// get token value 
		var token = contract.getTokens(web3.eth.accounts[i]);
		// display the value of the token according to account
		console.log(token);
	}
}

function get_token(node_name) {
	var token = contract.getTokens(getAddress(node_name));

	//print token data
	console.log(token.s);
	console.log(token.e);
	console.log(token["c"][0]);
}

// launch depositToken transaction
function deposit_token(receiver, value) {
	var ret=contract.depositToken(receiver, value, {from: web3.eth.coinbase});
	// display transaction result
	console.log(ret);
}

// launch withdrawToken transaction
function withdraw_token(receiver, value) {
	var ret=contract.withdrawToken(receiver, value, {from: web3.eth.coinbase});
	// display transaction result
	console.log(ret);
}

//get address from json file
function getAddress(node_name){
	// Load config data from SmartToken.json
	var addrlist = require('./addr_list.json');
	return addrlist[node_name];
}

