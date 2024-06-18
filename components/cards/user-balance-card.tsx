"use client"

import Identicon from "@polkadot/react-identicon"
import { BN, bnToBn, formatBalance } from "@polkadot/util"
import { useInkathon } from "@scio-labs/use-inkathon"
import { DollarSign } from "lucide-react"

import { humananReadableBalance } from "@/lib/utils"
import { useAccountBalance } from "@/hooks/use-account-balance"

import { useActiveChainInfo } from "../../hooks/use-active-chain-info"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"

export default function UserBalanceCard() {
  const { activeAccount } = useInkathon()
  const activeChainInfo = useActiveChainInfo()

  const {
    balance: userBalance,
    loading,
    error,
  } = useAccountBalance(activeAccount?.address)

  const decimals = activeChainInfo?.nativeToken?.data?.decimals
  const symbol = activeChainInfo?.nativeToken?.data?.symbol

  const { free, reserved, frozen } = userBalance || {
    free: new BN(0),
    reserved: new BN(0),
    frozen: new BN(0),
  }

  const totalBalance = humananReadableBalance(
    bnToBn(free).add(bnToBn(reserved)).add(bnToBn(frozen)),
    decimals,
    symbol
  )
  const freeBalance = humananReadableBalance(free, decimals, symbol)
  const reservedBalance = humananReadableBalance(reserved, decimals, symbol)
  const frozenBalance = humananReadableBalance(frozen, decimals, symbol)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">User Balance</CardTitle>
        <Identicon
          value={activeAccount?.address}
          size={28}
          theme="polkadot"
          className="hover:cursor-pointer"
        />
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">{totalBalance}</span>
          <Tooltip>
            <TooltipTrigger>
              <span className="ml-2 text-xs">total</span>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">
                The total balance the user account holds, including free,
                reserved, and locked tokens.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">{freeBalance}</span>
          <Tooltip>
            <TooltipTrigger>
              <span className="ml-2 text-xs">free</span>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">
                The transferrable balance the user account holds
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">{reservedBalance}</span>
          <Tooltip>
            <TooltipTrigger>
              <span className="ml-2 text-xs">reserved</span>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">
                Non-transferrable tokens that are reserved by a specific action,
                such as setting an on-chain identity, or creating an NFT
                collection.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">{frozenBalance}</span>
          <Tooltip>
            <TooltipTrigger>
              <span className="ml-2 text-xs">locked</span>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">
                Tokens that are locked, and cannot be transferred to another
                account. One token can be locked by multiple things at the same
                time, such as governance and staking.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </CardContent>
    </Card>
  )
}
