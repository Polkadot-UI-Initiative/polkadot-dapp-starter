import { useChains } from "@/providers/chains-provider"
import { useInkathon } from "@scio-labs/use-inkathon"

/**
 * Extracts the active chain info from the chains provider for the active chain the user is connected
 * to via the api provider in use-inkathon
 * @returns the active chain info
 */
export const useActiveChainInfo = () => {
  const { chains } = useChains()
  const { activeChain } = useInkathon()
  const chain = chains.find((c) => {
    const chainRpcs = c.rpcs.map((rpc) => rpc.url)
    return activeChain?.rpcUrls.some((rpcUrl) => chainRpcs.includes(rpcUrl))
  })

  return chain
}
