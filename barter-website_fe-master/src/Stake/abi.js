export const barterAbi = [
  "function balanceOf(address user) view returns (uint256)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount)",
]

export const stakingBarterAbi = [
  "function mint(uint256 amount)",
  "function burn(uint256 amount)",
  "function balanceOf(address user) view returns (uint256)",
]
