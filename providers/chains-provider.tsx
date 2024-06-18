"use client"

import { createContext, useContext, useState } from "react"
import { gql, request } from "graphql-request"

export const graphqlChainsUrl =
  "https://squid.subsquid.io/chaindata/v/v4/graphql"

export type Chain = {
  id: string
  name: string
  paraId: number | null
  relay: {
    id: string
  } | null
  rpcs: Array<{ url: string }>
  nativeToken: {
    id: string
    data: {
      logo: string
      symbol: string
      decimals: number
    }
  }
  tokens: Array<{
    id: string
    data: { logo: string; symbol: string; decimals: number }
  }>
  logo: string
  isTestnet: boolean
  themeColor: string
}

// Define the context shape
interface ChainsContextType {
  chains: Chain[]
}

const chainsQuery = gql`
  query Chains($relayId: String) {
    chains(where: { relay: { id_eq: $relayId, isHealthy_eq: true } }) {
      id
      name
      paraId
      nativeToken {
        id
        data
      }
      relay {
        id
      }
      rpcs {
        url
      }
      tokens {
        id
        data
      }
      logo
      isTestnet
      themeColor
    }
  }
`

const chainQuery = gql`
  query Chains($id: String!) {
    chains(where: { id_eq: $id }) {
      id
      name
      rpcs {
        url
      }
      logo
    }
  }
`

export const getChains = async (
  network: "polkadot" | "kusama"
): Promise<Array<Chain>> => {
  const response: any = await request(graphqlChainsUrl, chainsQuery, {})

  const chains = response.chains

  let relayChain = (
    (await request(graphqlChainsUrl, chainQuery, { id: network })) as any
  ).chains[0]
  // On the backend the relay chains are registered with paraId zero.
  relayChain.paraId = 0
  relayChain.relay = { id: network }
  chains.push(relayChain)

  chains.sort((a: Chain, b: Chain) => a.name.localeCompare(b.name))

  return chains
}

// Create the context with a default value
const ChainsContext = createContext<ChainsContextType | undefined>(undefined)

export default function ChainsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [chains, setChains] = useState<Chain[]>([])

  // Fetch chains on mount
  useState(() => {
    getChains("polkadot").then(setChains)
  })

  return (
    <ChainsContext.Provider value={{ chains }}>
      {children}
    </ChainsContext.Provider>
  )
}

export const useChains = () => {
  const context = useContext(ChainsContext)
  if (context === undefined) {
    throw new Error("useChains must be used within a ChainsProvider")
  }
  return context
}
