"use client"

import { UseInkathonProvider } from "@scio-labs/use-inkathon"

import { polkadotRelay } from "@/config/chains"
import { supportedWallets } from "@/config/supportedWallets"
import { ThemeProvider } from "@/components/theme-provider"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <UseInkathonProvider
        appName="Polkadot dApp starter"
        defaultChain={polkadotRelay}
        supportedWallets={supportedWallets}
      >
        {children}
      </UseInkathonProvider>
    </ThemeProvider>
  )
}
