"use client"

import { Tooltip, TooltipProvider } from "@radix-ui/react-tooltip"
import { UseInkathonProvider } from "@scio-labs/use-inkathon"

import { polkadotRelay } from "@/config/chains"
import { supportedWallets } from "@/config/supportedWallets"
import { ThemeProvider } from "@/components/theme-provider"

import ChainsProvider from "./chains-provider"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <ChainsProvider>
          <UseInkathonProvider
            appName="Polkadot dApp starter"
            defaultChain={polkadotRelay}
            supportedWallets={supportedWallets}
            connectOnInit={true}
          >
            {children}
          </UseInkathonProvider>
        </ChainsProvider>
      </TooltipProvider>
    </ThemeProvider>
  )
}
