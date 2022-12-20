import * as ethers from "ethers";
import { Network, Alchemy } from "alchemy-sdk";
// import puppeteer from "puppeteer";
import dotenv from 'dotenv'
dotenv.config();

const address = "0xD2128b1C22Bb80a4dae69fe149cD6fE9Ba7eB4aa"
const url = process.env.MAINNET_URL;
const apiKey = process.env.API_KEY

const settings = {
  apiKey: apiKey,
  Network: Network.ETH_MAINNET
}

const alchemy = new Alchemy(settings);

async function main() {
  const ownersNfts = await alchemy.nft.getNftsForOwner(address);
  console.log(ownersNfts.ownedNfts[11])
}

main()
