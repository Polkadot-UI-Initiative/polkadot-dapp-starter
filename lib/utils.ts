import { BN, formatBalance } from "@polkadot/util"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const trimAddress = (
  address: string | undefined,
  amount: number = 5
) => {
  if (!address) {
    return ""
  }
  return `${address.slice(0, amount)}...${address.slice(-amount)}`
}

export const humananReadableBalance = (
  balance: BN | string | undefined,
  decimals: number | undefined = 12,
  withUnit: string | boolean | undefined = true
): string => {
  return formatBalance(balance, {
    decimals,
    forceUnit: "-",
    withSi: true,
    withAll: false,
    withUnit,
  })
}

export const unknownChainLogo =
  "https://raw.githubusercontent.com/TalismanSociety/chaindata/v3/assets/chains/unknown.svg"
