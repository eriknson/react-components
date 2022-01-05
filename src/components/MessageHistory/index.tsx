import { useMemo, useState } from 'react'
import { useQuery } from '@apollo/client'
import PropTypes from 'prop-types'
import Box from '../Box'
import { MESSAGES_CONFIRMED, MessagesConfirmedVars } from './queries'
import { MessageConfirmed } from './types'
import MessageConfirmedRow from './MessageConfirmedRow'
import { MessageRowColumnTitles } from './MessageRowColumnTitles'
import { ADDRESS_PROPTYPE } from '../../customPropTypes'
import ButtonV2 from '../Button/V2'

type MessageHistoryTableProps = {
  address: string
  offset?: number
  // allows custom navigation
  addressHref: (address: string) => string
  cidHref: (cid: string) => string
}

const DEFAULT_LIMIT = 10

export default function MessageHistoryTable(props: MessageHistoryTableProps) {
  const [offset, setOffset] = useState(props.offset)
  const { loading, error, data, fetchMore } = useQuery<
    { messagesConfirmed: MessageConfirmed[] },
    MessagesConfirmedVars
  >(MESSAGES_CONFIRMED, {
    variables: {
      address: props.address,
      limit: DEFAULT_LIMIT,
      offset: props.offset
    }
  })

  const lastPage = useMemo(
    () => data?.messagesConfirmed?.length < DEFAULT_LIMIT,
    [data?.messagesConfirmed?.length]
  )

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :( {error.message}</p>

  return (
    <Box>
      {/* ? CSS GRID ? */}
      <MessageRowColumnTitles />
      {/* Pending transaction rows could go here if we like this setup */}
      {data?.messagesConfirmed?.map(tx => {
        return (
          <MessageConfirmedRow
            addressHref={props.addressHref}
            cidHref={props.cidHref}
            inspectingAddress={props.address}
            key={tx.cid}
            {...tx}
          />
        )
      })}
      {!lastPage && (
        <ButtonV2
          onClick={() => {
            fetchMore({
              variables: {
                offset: offset + DEFAULT_LIMIT
              }
            })

            setOffset(offset + DEFAULT_LIMIT)
          }}
        >
          Fetch more
        </ButtonV2>
      )}
    </Box>
  )
}

MessageHistoryTable.propTypes = {
  addressHref: PropTypes.func,
  cidHref: PropTypes.func,
  offset: PropTypes.number,
  address: ADDRESS_PROPTYPE
}

MessageHistoryTable.defaultProps = {
  offset: 0,
  // TODO
  addressHref: (address: string) => `/#/history/${address}`,
  cidHref: (cid: string) => `/#/detail/${cid}`
}
