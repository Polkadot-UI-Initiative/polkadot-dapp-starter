"use client"

import Image from "next/image"
import { Chain, useChains } from "@/providers/chains-provider"
import { Select } from "@radix-ui/react-select"
import { SubstrateChain, useInkathon } from "@scio-labs/use-inkathon"

import { cn, unknownChainLogo } from "@/lib/utils"

import { Label } from "./ui/label"
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

export default function ChainSwitch({
  withName = true,
}: {
  withName?: boolean
}) {
  const { activeChain, switchActiveChain, isConnecting } = useInkathon()
  const { chains } = useChains()

  const switchChain = (chainName: string) => {
    const chain: Chain | undefined = chains.find((c) => c.name === chainName)

    if (!chain) {
      console.error("chain not found", chainName)
      return
    }

    //type used by useInkathon
    const substrateChain: SubstrateChain = {
      network: chain.name,
      name: chain.name,
      rpcUrls: chain.rpcs.map((rpc) => rpc.url) as [string],
      ss58Prefix: 0,
      testnet: chain.isTestnet,
    }

    console.log("substrateChain", substrateChain)

    switchActiveChain?.(substrateChain)
  }

  return (
    <div className="grid gap-2">
      <Label htmlFor="chain-switch" className="text-muted-foreground">
        Select Chain
      </Label>
      <Select
        onValueChange={(chainName) => switchChain(chainName)}
        value={activeChain?.name}
        disabled={isConnecting}
      >
        <SelectTrigger id="chain-switch" className="max-w-[180px]">
          <SelectValue placeholder="Select Chain" />
        </SelectTrigger>
        <SelectContent className="max-w-[180px]">
          {(chains || []).map((chain) => (
            <SelectItem
              key={chain.id}
              value={chain.name || "Polkadot Asset Hub"}
            >
              <div className="flex flex-row items-center gap-2">
                <Image
                  src={chain.logo}
                  alt={chain.name}
                  width={30}
                  height={30}
                  className={cn({
                    "invert dark:invert-0": chain.logo === unknownChainLogo,
                  })}
                />
                {withName && chain.name}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
