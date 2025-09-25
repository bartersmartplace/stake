// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.23;
pragma abicoder v2;

contract Barter {
    uint256 internal _totalSupply;
    string internal _name;
    string internal _symbol;

    mapping(address => uint256) internal _balances;
    mapping(address => mapping(address => uint256)) internal _allowances;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    error InsufficientBalance();
    error InsufficientAllowance();
    error ZeroAddressSpender();

    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }

    function transfer(address to, uint256 value) public {
        if (_balances[msg.sender] < value) {
            revert InsufficientBalance();
        }

        unchecked {
            _balances[msg.sender] -= value;
            _balances[to] += value;
        }

        emit Transfer(msg.sender, to, value);
    }

    function transferFrom(address from, address to, uint256 value) public {
        uint256 senderAllowance = _allowances[from][msg.sender];

        if (senderAllowance < value) {
            revert InsufficientAllowance();
        }

        if (_balances[from] < value) {
            revert InsufficientBalance();
        }

        if (senderAllowance != type(uint256).max) {
            unchecked {
                _allowances[from][msg.sender] -= value;
            }
        }

        unchecked {
            _balances[from] -= value;
            _balances[to] += value;
        }

        emit Transfer(from, to, value);
    }

    function approve(address spender, uint256 value) public {
        if (spender == address(0)) {
            revert ZeroAddressSpender();
        }

        _allowances[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
    }

    // anyone is permitted to mint to anyone
    function mint(address to, uint256 value) public {
        _totalSupply += value;

        unchecked {
            _balances[to] += value;
        }

        emit Transfer(address(0), to, value);
    }

    function name() public view returns (string memory) {
        return _name;
    }

    function symbol() public view returns (string memory) {
        return _symbol;
    }

    function decimals() public pure returns (uint8) {
        return 8;
    }

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address owner) public view returns (uint256) {
        return _balances[owner];
    }

    function allowance(address owner, address spender) public view returns (uint256) {
        return _allowances[owner][spender];
    }
}
