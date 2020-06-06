pragma solidity ^0.4.18;

contract SmartToken {
	mapping(address => uint) tokens;
	
	event OnValueChanged(address indexed sender, uint value);
	
	function depositToken(address receiver, uint value) returns (bool success) {
		tokens[receiver] += value;
		OnValueChanged(receiver, tokens[receiver]);
		return true;
	}
	function withdrawToken(address receiver, uint value) returns (bool success) {
		if ((tokens[receiver] - value) < 0) {
			tokens[receiver] = 0;
		} else {
			tokens[receiver] -= value;
		}
		OnValueChanged(receiver, tokens[receiver]);
		return true;
	}
	function getTokens(address receiver) constant returns (uint value) {
		return tokens[receiver];
	}
}
