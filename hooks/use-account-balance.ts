import { useEffect, useState } from "react"
import { useInkathon } from "@scio-labs/use-inkathon"

interface AccountBalance {
  free: string | undefined
  reserved: string | undefined
  frozen: string | undefined
}

export const useAccountBalance = (accountAddress: string | undefined) => {
  const [balance, setBalance] = useState<AccountBalance | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const { api } = useInkathon()

  useEffect(() => {
    let unsubscribe: () => void

    const subscribeBalance = async () => {
      setLoading(true)
      setError(null)

      if (!api) {
        setError("API not initialized")
        setLoading(false)
        return
      }

      if (!accountAddress) {
        setError("Account address not provided")
        setLoading(false)
        return
      }

      try {
        // Subscribe to the account balance changes
        unsubscribe = await api.query.system.account(
          accountAddress,
          ({ data: { free, reserved, frozen } }) => {
            console.log("balance", { free, reserved, frozen })
            setBalance({
              free: free?.toString(),
              reserved: reserved?.toString(),
              frozen: frozen?.toString(),
            })
            setLoading(false)
          }
        )
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError("An unknown error occurred")
        }
        setLoading(false)
      }
    }

    if (accountAddress) {
      subscribeBalance()
    }

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [accountAddress, api])

  return { balance, loading, error }
}

export const useUserAccountBalance = () => {
  const { activeAccount } = useInkathon()
  return useAccountBalance(activeAccount?.address || "")
}
