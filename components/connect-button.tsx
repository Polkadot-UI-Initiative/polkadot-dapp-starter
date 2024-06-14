"use client"

import { FC, useEffect, useState } from "react"
import Link from "next/link"
import { InjectedAccount } from "@polkadot/extension-inject/types"
import Identicon from "@polkadot/react-identicon"
import { encodeAddress } from "@polkadot/util-crypto"
import {
  SubstrateWalletPlatform,
  allSubstrateWallets,
  isWalletInstalled,
  useInkathon,
} from "@scio-labs/use-inkathon"
import ConnectWallet from "@w3f/polkadot-icons/keyline/ConnectWallet"
import UseCases from "@w3f/polkadot-icons/keyline/UseCases"
import ls from "localstorage-slim"
import { ArrowUpRight, CheckCircle, ChevronDown } from "lucide-react"

import { cn, trimAddress } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button, buttonVariants } from "./ui/button"

export interface ConnectButtonProps {
  size?: "default" | "sm" | "lg" | "icon" | null | undefined
}

export const ConnectButton: FC<ConnectButtonProps> = ({ size }) => {
  const {
    activeChain,
    connect,
    disconnect,
    isConnecting,
    activeAccount,
    accounts,
    activeExtension,
    setActiveAccount,
  } = useInkathon()

  // Sort installed wallets first
  const [browserWallets] = useState([
    ...allSubstrateWallets.filter(
      (w) =>
        w.platforms.includes(SubstrateWalletPlatform.Browser) &&
        isWalletInstalled(w)
    ),
    ...allSubstrateWallets.filter(
      (w) =>
        w.platforms.includes(SubstrateWalletPlatform.Browser) &&
        !isWalletInstalled(w)
    ),
  ])

  if (!activeAccount) {
    return (
      <DropdownMenu
        onOpenChange={(open: boolean) => {
          open && ls.set("userWantsConnection", true)
        }}
      >
        <DropdownMenuTrigger isLoading={isConnecting} disabled={isConnecting}>
          <Button
            className="bg-polkadot-primary text-white hover:bg-polkadot-primary-600"
            // asChild
            // isLoading={isConnecting}
          >
            <>
              <ConnectWallet
                width={18}
                height={18}
                className="mr-2 inline-block bg-bottom stroke-current"
              />
              Connect
            </>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          avoidCollisions={false}
          className="min-w-56"
        >
          <DropdownMenuLabel>Connect Extension</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {!activeAccount &&
            browserWallets.map((w) =>
              isWalletInstalled(w) ? (
                <DropdownMenuItem
                  key={w.id}
                  className="cursor-pointer hover:border-white hover:bg-transparent data-[hover=true]:border-white"
                  onClick={() => {
                    connect?.(undefined, w)
                  }}
                >
                  {w.name}
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  key={w.id}
                  className="opacity-50 hover:border-white hover:bg-transparent data-[hover=true]:border-white"
                >
                  <Link href={w.urls.website}>
                    <div className="align-center flex justify-start gap-2">
                      <p>{w.name}</p>
                      <ArrowUpRight />
                    </div>
                    <p>Not installed</p>
                  </Link>
                </DropdownMenuItem>
              )
            )}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants(),
          "bg-polkadot-primary text-white hover:bg-polkadot-primary-600"
        )}
        // isLoading={isConnecting}
        // isDisabled={isConnecting}
        disabled={isConnecting}
      >
        <Button
          className="bg-polkadot-primary text-white hover:bg-polkadot-primary-600"
          //isLoading={isConnecting}
          asChild
        >
          <>
            <span className="mr-2 hidden truncate text-sm sm:flex">
              {activeAccount?.name || trimAddress(activeAccount?.address)}
            </span>
            <Identicon
              value={activeAccount?.address}
              size={28}
              theme="polkadot"
              className="hover:cursor-pointer"
            />
          </>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        avoidCollisions={false}
        className="min-w-56"
      >
        <DropdownMenuLabel>Accounts</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-[300px] overflow-auto">
          {(accounts || []).map((account) => (
            <DropdownMenuItem
              key={account.address}
              onClick={() => {
                setActiveAccount?.(account)
              }}
              aria-label={account.address}
              className={cn("border-2 border-transparent", {
                " border-primary-500":
                  activeAccount?.address === account.address,
              })}
            >
              <div className="flex flex-row items-center">
                <Identicon
                  value={account.address}
                  size={30}
                  theme="polkadot"
                  className="mr-2 hover:cursor-pointer"
                />
                <div className="flex flex-col">
                  <span className="text truncate font-bold">
                    {account?.name ||
                      trimAddress(
                        encodeAddress(account.address, activeChain?.ss58Prefix)
                      )}
                  </span>
                  {account.name && (
                    <span className="text-xs">
                      {trimAddress(
                        encodeAddress(account.address, activeChain?.ss58Prefix)
                      )}
                    </span>
                  )}
                </div>
              </div>
            </DropdownMenuItem>
          ))}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          key={"logout"}
          aria-label={"logout"}
          onClick={() => {
            disconnect?.()
            setActiveAccount?.(undefined)
            ls.set("userWantsConnection", false)
          }}
          className=""
        >
          <UseCases
            width={20}
            height={20}
            stroke="currentColor"
            className="ml-1 mr-3"
          />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export interface AccountNameProps {
  account: InjectedAccount
}

export const AccountName: FC<AccountNameProps> = ({ account, ...rest }) => {
  return <div>{account.name}</div>
}
