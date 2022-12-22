const ethers = require('ethers');
// import app from "./server.js"
const { Network, Alchemy } = require('alchemy-sdk');
const dotenv = require('dotenv');
dotenv.config();


const address = "0xD2128b1C22Bb80a4dae69fe149cD6fE9Ba7eB4aa"
const url = process.env.MAINNET_URL;
const apiKey = process.env.API_KEY

const settings = {
  apiKey: apiKey,
  Network: Network.ETH_MAINNET
}

const alchemy = new Alchemy(settings);

module.exports = async function getNfts() {


  return await alchemy.nft.getNftsForOwner(address);

}
