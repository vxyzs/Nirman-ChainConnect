require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  accounts: ["c5296d302d3a5af2277118476cb6c1c74105f55d12f13892572ad1c14ce79419"],
  networks:{
    amoy:{
      chainId:80002,
      apiKey:"7S34E61CTQ7VTD9FNPHFR186T1BW2JHA7R",
      url:"https://polygon-amoy-bor-rpc.publicnode.com"
    },
    sepolia:{
      chainId:11155111,
      apiKey:"JYQ4489BFXGBT98QBSCTZWS1WYU3NU7ZH2",
      url:"https://rpc.sepolia.org"
    }
  }
};