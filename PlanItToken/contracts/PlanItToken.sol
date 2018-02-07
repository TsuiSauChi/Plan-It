pragma solidity ^0.4.13;

import '../node_modules/zeppelin-solidity/contracts/token/ERC20/StandardToken.sol';

contract PlanItToken is StandardToken {
    string public name = "PlanItToken";
    string public symbol = "PIT";
    uint8 public decimals = 2;
    uint public INITIAL_SUPPLY = 12000;

    function PlanItToken() public {
        totalSupply_ = INITIAL_SUPPLY;
        balances[msg.sender] = INITIAL_SUPPLY;
    }
}