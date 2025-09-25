// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.23;
pragma abicoder v2;

import {IERC20, IERC20Metadata} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Math} from "@openzeppelin/contracts/utils/math/Math.sol";

contract StakingBarter is Ownable, IERC20Metadata {
    using SafeERC20 for IERC20Metadata;

    struct State {
        uint256 pending;
        uint256 index;
        uint256 timestamp;
        uint256 slope;
    }

    State private lastState;

    /// @notice Our token we stake on
    IERC20Metadata public immutable stakeToken;

    /// @notice Minimal balance required to be eligible for rewards
    uint256 public immutable minBalance;

    /// @notice The amount of tokens that can be staked before the index stops increasing
    uint256 public immutable breakpoint;

    /// @notice Denominator used for determining per-second distribution amount
    /// If current TVL < breakpoint, then the distribution amount is (TVL / breakpoint) * pending / denominator
    /// Otherwise, the distribution amount is pending / denominator
    uint256 public immutable denominator;

    /// @notice Not scaled user balances
    mapping(address => uint256) private _balances;
    /// @notice Not scaled total supply
    uint256 private _totalSupply;

    string private _name;
    string private _symbol;
    uint8 private _decimals;

    constructor(
        address initialOwner,
        IERC20Metadata _stakeToken,
        uint256 _minBalance,
        uint256 _breakpoint,
        uint256 _denominator,
        string memory name_,
        string memory symbol_) Ownable(initialOwner)
    {
        stakeToken = _stakeToken;
        minBalance = _minBalance;
        breakpoint = _breakpoint;
        denominator = _denominator;
        _name = name_;
        _symbol = symbol_;
        _decimals = _stakeToken.decimals();

        lastState = State({pending: 0, index: 10 ** _decimals, timestamp: block.timestamp, slope: 0});
    }

    function name() external view override returns (string memory) {
        return _name;
    }

    function symbol() external view override returns (string memory) {
        return _symbol;
    }

    function decimals() external view override returns (uint8) {
        return _decimals;
    }

    function _getCurrentState() private view returns (State memory state) {
        state = lastState;

        if (state.timestamp == block.timestamp) {
            return state;
        }

        uint256 notScaledTotalSupply = _totalSupply;

        // no TVL -> no rewards -> no index changes
        if (notScaledTotalSupply == 0) {
            return state;
        }

        while (state.timestamp != block.timestamp) {
            uint256 until = Math.min(block.timestamp, state.timestamp + 1 weeks);
            uint256 tvl = notScaledTotalSupply * state.index / 10 ** _decimals;

            if (tvl < breakpoint) {
                state.slope = (tvl * state.pending) / (breakpoint * denominator);
            } else {
                state.slope = state.pending / denominator;
            }

            // We can't distribute more than pending, it might end in the middle of the week
            uint256 amountDistributed = Math.min(state.pending, state.slope * (until - state.timestamp));

            state.index += state.index * amountDistributed / tvl;
            state.timestamp = until;
            state.pending -= amountDistributed;
        }
    }

    function getIndex() public view returns (uint256) {
        return _getCurrentState().index;
    }

    function getPending() public view returns (uint256) {
        return _getCurrentState().pending;
    }

    function getSlope() public view returns (uint256) {
        return _getCurrentState().slope;
    }

    function _cacheState() internal returns (State memory state) {
        lastState = state = _getCurrentState();
    }

    function mint(uint256 amount) external {
        State memory currentState = _cacheState();

        require(balanceOf(_msgSender()) + amount >= minBalance, "Insufficient balance");

        uint256 balanceIncrease = amount * (10 ** _decimals) / currentState.index;
        _balances[_msgSender()] += balanceIncrease;
        _totalSupply += balanceIncrease;

        stakeToken.safeTransferFrom(_msgSender(), address(this), amount);

        emit Transfer(address(0), _msgSender(), amount);
    }

    function burn(uint256 amount) external {
        State memory currentState = _cacheState();

        uint256 balanceDecrease = amount * (10 ** _decimals) / currentState.index;
        amount = balanceDecrease * currentState.index / (10 ** _decimals);

        _balances[_msgSender()] -= balanceDecrease;
        _totalSupply -= balanceDecrease;

        stakeToken.safeTransfer(_msgSender(), amount);

        emit Transfer(_msgSender(), address(0), amount);
    }

    function addPending(uint256 amount) external onlyOwner {
        State memory state = _getCurrentState();
        state.pending += amount;

        lastState = state;

        stakeToken.safeTransferFrom(_msgSender(), address(this), amount);
    }

    function totalSupply() public view returns (uint256) {
        return _totalSupply * getIndex() / 10 ** _decimals;
    }

    function balanceOf(address account) public view returns (uint256) {
        return _balances[account] * getIndex() / 10 ** _decimals;
    }

    function transfer(address, uint256) external pure returns (bool) {
        revert("Not implemented");
    }

    function transferFrom(address, address, uint256) external pure returns (bool) {
        revert("Not implemented");
    }

    function approve(address, uint256) external pure returns (bool) {
        revert("Not implemented");
    }

    function allowance(address, address) external pure returns (uint256) {
        revert("Not implemented");
    }
}
