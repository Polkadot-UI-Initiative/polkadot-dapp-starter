import { BN } from "@polkadot/util"
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

export function parseBN(bnValue: BN | string, decimals: number): number {
  // Convert the BN value to a string
  const bnStr = bnValue.toString()

  // Determine where to place the decimal point
  let decimalPointIndex = bnStr.length - decimals

  // Initialize formatted value
  let formattedValue

  // Handle cases where the BN value is smaller than the expected decimal places
  if (decimalPointIndex <= 0) {
    formattedValue = "0." + "0".repeat(Math.abs(decimalPointIndex)) + bnStr
  } else {
    // Insert the decimal point
    formattedValue =
      bnStr.substring(0, decimalPointIndex) +
      "." +
      bnStr.substring(decimalPointIndex)
  }

  // Return the result, parsed as a float and fixed to 2 decimal places
  return parseFloat(formattedValue)
}
