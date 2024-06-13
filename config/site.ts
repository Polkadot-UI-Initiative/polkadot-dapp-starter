import { title } from "process"

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Polkadot dApp Starter",
  description:
    "Kickstart your next polkadot multichain dApp with this starter template.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Colors",
      href: "/colors",
    },
  ],
  links: {
    twitter: "https://x.com/PolkaDx",
    github: "https://github.com/Polkadot-UI-Initiative/polkadot-dapp-starter",
    docs: "https://ui.shadcn.com",
  },
}
