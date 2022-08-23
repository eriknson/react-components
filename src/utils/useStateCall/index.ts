import { useEffect, useState } from 'react'
import { QueryHookOptions, useApolloClient } from '@apollo/client'
import type { InvocResult } from '@glif/filecoin-wallet-provider'
import LotusRPCEngine from '@glif/filecoin-rpc-client'
import { LotusMessage } from '@glif/filecoin-message'

const lCli = new LotusRPCEngine({
  apiAddress:
    process.env.NEXT_PUBLIC_LOTUS_NODE_JSONRPC ||
    'https://api.calibration.node.glif.io'
})

/////// implemented until https://github.com/glifio/graph/issues/33
export const useStateCallQuery = (
  baseOptions: QueryHookOptions<
    InvocResult,
    {
      message: LotusMessage
      cid: string
    }
  >
): { data: InvocResult; error: Error; loading: boolean } => {
  const [invokeResult, setInvokeResult] = useState<InvocResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error>(undefined)
  const [fetchedFor, setFetchedFor] = useState<string>('')
  const apolloClient = useApolloClient()

  useEffect(() => {
    const fetchStateCall = async () => {
      try {
        const _invokeResult = await lCli.request<InvocResult>(
          'StateCall',
          baseOptions.variables.message,
          null
        )

        setInvokeResult({ ..._invokeResult })
      } catch (err) {
        setError(
          new Error('Failed to fetch', err?.message || JSON.stringify(err))
        )
      } finally {
        setLoading(false)
      }
    }

    const firstLoad = !invokeResult && loading && !error
    const newLoad = fetchedFor !== baseOptions?.variables?.cid && !error

    if (!baseOptions.skip && (firstLoad || newLoad)) {
      setLoading(true)
      setFetchedFor(baseOptions?.variables?.cid)
      fetchStateCall()
    }
  }, [
    baseOptions?.variables?.message,
    baseOptions?.variables?.cid,
    baseOptions.skip,
    invokeResult,
    loading,
    error,
    fetchedFor,
    setFetchedFor,
    apolloClient
  ])

  return { data: invokeResult, error, loading }
}
