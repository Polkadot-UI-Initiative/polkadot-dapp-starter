import Link from "next/link.js"
import Color from "color"

import { cn } from "@/lib/utils"

// tell tailwind to pick up the colors from the tailwind.config.js file

// text-polkadot-primary-100 text-polkadot-primary-200 text-polkadot-primary-300 text-polkadot-primary-400 text-polkadot-primary-500 text-polkadot-primary-600 text-polkadot-primary-700 text-polkadot-primary-800 text-polkadot-primary-900
// bg-polkadot-primary-100 bg-polkadot-primary-200 bg-polkadot-primary-300 bg-polkadot-primary-400 bg-polkadot-primary-500 bg-polkadot-primary-600 bg-polkadot-primary-700 bg-polkadot-primary-800 bg-polkadot-primary-900

// text-polkadot-secondary-100 text-polkadot-secondary-200 text-polkadot-secondary-300 text-polkadot-secondary-400 text-polkadot-secondary-500 text-polkadot-secondary-600 text-polkadot-secondary-700 text-polkadot-secondary-800 text-polkadot-secondary-900
// bg-polkadot-secondary-100 bg-polkadot-secondary-200 bg-polkadot-secondary-300 bg-polkadot-secondary-400 bg-polkadot-secondary-500 bg-polkadot-secondary-600 bg-polkadot-secondary-700 bg-polkadot-secondary-800 bg-polkadot-secondary-900

// text-polkadot-tertiary-100 text-polkadot-tertiary-200 text-polkadot-tertiary-300 text-polkadot-tertiary-400 text-polkadot-tertiary-500 text-polkadot-tertiary-600 text-polkadot-tertiary-700 text-polkadot-tertiary-800 text-polkadot-tertiary-900
// bg-polkadot-tertiary-100 bg-polkadot-tertiary-200 bg-polkadot-tertiary-300 bg-polkadot-tertiary-400 bg-polkadot-tertiary-500 bg-polkadot-tertiary-600 bg-polkadot-tertiary-700 bg-polkadot-tertiary-800 bg-polkadot-tertiary-900

// text-polkadot-quaternary-100 text-polkadot-quaternary-200 text-polkadot-quaternary-300 text-polkadot-quaternary-400 text-polkadot-quaternary-500 text-polkadot-quaternary-600 text-polkadot-quaternary-700 text-polkadot-quaternary-800 text-polkadot-quaternary-900
// bg-polkadot-quaternary-100 bg-polkadot-quaternary-200 bg-polkadot-quaternary-300 bg-polkadot-quaternary-400 bg-polkadot-quaternary-500 bg-polkadot-quaternary-600 bg-polkadot-quaternary-700 bg-polkadot-quaternary-800 bg-polkadot-quaternary-900

// text-polkadot-quinary-100 text-polkadot-quinary-200 text-polkadot-quinary-300 text-polkadot-quinary-400 text-polkadot-quinary-500 text-polkadot-quinary-600 text-polkadot-quinary-700 text-polkadot-quinary-800 text-polkadot-quinary-900
// bg-polkadot-quinary-100 bg-polkadot-quinary-200 bg-polkadot-quinary-300 bg-polkadot-quinary-400 bg-polkadot-quinary-500 bg-polkadot-quinary-600 bg-polkadot-quinary-700 bg-polkadot-quinary-800 bg-polkadot-quinary-900

import tailwindConfig from "../../tailwind.config.js"

const tailwindConfigTyped: any = tailwindConfig

export default function PageColors() {
  const colors = [
    "polkadot-primary",
    "polkadot-secondary",
    "polkadot-tertiary",
    "polkadot-quaternary",
    "polkadot-quinary",
  ]
  const shades = Array.from({ length: 9 }, (_, i) => (i + 1) * 100)

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Colors
        </h1>
        <p>
          You can use the following colors for your dApp as defined in{" "}
          <code>tailwind.config.js</code> and published on the{" "}
          <Link
            href="https://polkadot.network/ecosystem/brand-hub/"
            target="_blank"
            className="text-polkadot-primary-500 underline"
          >
            Polkadot Brand Hub
          </Link>
          .
        </p>
        <p className="font-bold">Example:</p>
        <code className="text-xs bg-slate-200 dark:bg-slate-800 rounded-sm p-1 ">
          {`<div className="bg-polkadot-primary-400">`}
        </code>
        or
        <code className="text-xs bg-slate-200 dark:bg-slate-800 rounded-sm p-1 mb-4">{`<p className="text-polkadot-secondary">`}</code>
        <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-x-2 gap-y-8 sm:grid-cols-1">
          <div className="2xl:contents">
            {colors.map((color) => (
              <div className="mb-8">
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-200 2xl:col-end-1 2xl:pt-2.5">
                  {color}
                </div>
                <div className="mt-3 grid grid-cols-1 gap-x-2 gap-y-3 sm:mt-2 sm:grid-cols-9 2xl:mt-0">
                  {/* <!-- Polkadot-Primary --> */}
                  {shades.map((shade) => {
                    const textColor = `text-${color}-${shade}`
                    const bgColor = `bg-${color}-${shade}`

                    return (
                      <div className="relative flex">
                        <div className="flex w-full cursor-pointer items-center gap-x-3 sm:block sm:space-y-1.5">
                          <div
                            className={`text-xs text-gray-800 size-10 rounded ring-1 ring-black/10 dark:ring-inset dark:ring-white/10 sm:w-full ${bgColor} flex items-center justify-center`}
                          >
                            {shade === 500 && "default"}
                          </div>
                          <div className="px-0.5">
                            <div className="w-6 text-xs font-medium text-slate-900 dark:text-white 2xl:w-full">
                              {shade}
                            </div>
                            <div
                              className={cn(
                                `${textColor} font-mono text-xs lowercase sm:text-[0.625rem] md:text-xs lg:text-[0.625rem] 2xl:text-xs`
                              )}
                            >
                              {Color(
                                tailwindConfigTyped.theme?.extend?.colors?.[
                                  color
                                ][shade]
                              ).hex()}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
