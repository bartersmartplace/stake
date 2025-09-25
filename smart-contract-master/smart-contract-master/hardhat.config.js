require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.23",
  networks: {
    polygon: {
      url: "https://polygon.blockpi.network/v1/rpc/public",
      accounts: ["0000000000000000000000000000000000000000000000000000000000000000"],
    },
    sepolia: {
      url: "https://ethereum-sepolia.blockpi.network/v1/rpc/public",
      accounts: ["0000000000000000000000000000000000000000000000000000000000000000"],
    },
  },
  etherscan: {
    apiKey: {
      polygon: "0000000000000000000000000000000000",
      sepolia: "0000000000000000000000000000000000",
    },
    customChains: [
      {
        network: "polygon",
        chainId: 137,
        urls: {
          apiURL: "https://api.polygonscan.com/api",
          browserURL: "https://polygonscan.com/",
        },
      },
      {
        network: "sepolia",
        chainId: 1,
        urls: {
          apiURL: "https://api-sepolia.etherscan.io/api",
          browserURL: "https://sepolia.etherscan.io/",
        },
      },
    ]
  },
  sourcify: {
    enabled: false,
  }
};
