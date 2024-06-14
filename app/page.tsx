import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Reducing the complexity of <br className="hidden sm:inline" />
          building Polkadot dApps
        </h1>
        <p className="max-w-[700px] text-lg">
          Polkadot dApp starter is a modern, opinionated starter kit for
          building Polkadot dApps. It includes all the tools you need to start
          building your dApp, including a modern frontend framework, and a UI
          component library.
        </p>
        <ul className="list-disc ml-4">
          <li className="list-item">next.js 14</li>
          <li className="list-item">useInkathon</li>
          <li className="list-item">shadcn</li>
          <li className="list-item">Tailwind CSS</li>
          <li className="list-item">TypeScript</li>
          <li className="list-item">Prettier</li>
          <li className="list-item">@polkadot/react-identicon</li>
        </ul>
      </div>
      <div className="flex gap-4">
        <Link
          href={siteConfig.links.docs}
          target="_blank"
          rel="noreferrer"
          className={buttonVariants()}
        >
          Documentation
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href={siteConfig.links.github}
          className={buttonVariants({ variant: "outline" })}
        >
          GitHub
        </Link>
      </div>
    </section>
  )
}
