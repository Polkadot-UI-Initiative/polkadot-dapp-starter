"use client"

import Image from "next/image"

import { cn, unknownChainLogo } from "@/lib/utils"
import { useActiveChainInfo } from "@/hooks/use-active-chain-info"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

export default function ChainInfoCard() {
  const chain = useActiveChainInfo()

  return (
    <Card className={`border-[${chain?.themeColor}]`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Active Chain</CardTitle>
        {chain?.nativeToken?.data.logo && (
          <Image
            src={chain?.logo}
            alt={`${chain?.name} logo`}
            width={30}
            height={30}
            className={cn({
              "invert dark:invert-0": chain.logo === unknownChainLogo,
            })}
          />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-xl font-bold">{chain?.name}</div>
        <div className="flex flex-col text-sm">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground ">Native Token:</span>{" "}
            {chain?.nativeToken?.data?.symbol}{" "}
            {chain?.nativeToken?.data.logo && (
              <Image
                src={chain?.nativeToken?.data.logo}
                alt={`${chain?.name} logo`}
                width={20}
                height={20}
                className="inline"
              />
            )}
          </div>
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground">Decimals:</span>{" "}
            {chain?.nativeToken?.data?.decimals}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
