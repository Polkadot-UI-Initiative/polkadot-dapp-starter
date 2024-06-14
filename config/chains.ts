import { SubstrateChain, SubstrateExplorer } from "@scio-labs/use-inkathon"

export const polkadotRelay: SubstrateChain = {
  network: "Polkadot",
  name: "Polkadot Relay Chain",
  rpcUrls: ["wss://rpc.polkadot.io"],
  ss58Prefix: 0,
  testnet: false,
  explorerUrls: { [SubstrateExplorer.Subscan]: "https://polkadot.subscan.io" },
}

export const kusamaRelay: SubstrateChain = {
  network: "Kusama",
  name: "Kusama Relay Chain",
  rpcUrls: ["wss://kusama-rpc.polkadot.io"],
  ss58Prefix: 2,
  testnet: false,
  explorerUrls: { [SubstrateExplorer.Subscan]: "https://kusama.subscan.io" },
}

export const rocoRelay: SubstrateChain = {
  network: "Rococo",
  name: "Rococo Relay Chain",
  rpcUrls: ["wss://rococo-rpc.polkadot.io"],
  ss58Prefix: 2,
  testnet: false,
}
