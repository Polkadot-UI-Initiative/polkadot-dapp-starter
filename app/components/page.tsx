import ChainInfoCard from "@/components/cards/chain-info-card"
import UserBalanceCard from "@/components/cards/user-balance-card"
import ChainSwitch from "@/components/chain-switch"

export default function ComponentsPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Components
        </h1>
        <p className="max-w-[700px] text-lg">
          Polkadot dApp starter provides multiple components that you can use or
          alter to fit your needs.
        </p>
      </div>
      <ChainSwitch />
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <ChainInfoCard />
        <UserBalanceCard />
        <UserBalanceCard />
        <UserBalanceCard />
      </div>
    </section>
  )
}
