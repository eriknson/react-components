import React from 'react'
import { render, act, screen } from '@testing-library/react'
import ThemeProvider from '../../../ThemeProvider'
import theme from '../../../theme'
import MessageHistory from '.'
import {
  WALLET_ADDRESS,
  WALLET_ADDRESS_2,
  WALLET_ID,
  WALLET_ID_2
} from '../../../../test-utils/constants'
import { MessageConfirmedRow } from '../../types'
import { TestEnvironment } from '../../../../test-utils/TestEnvironment'

jest
  .spyOn(require('../../../../utils/useAge'), 'useAge')
  .mockImplementation(() => ({
    age: '2022-08-02 09:50:30',
    loading: false,
    error: null
  }))

jest
  .spyOn(require('../hooks/useMethodName'), 'useMethodName')
  .mockImplementation(() => ({ methodName: 'send' }))

describe('Message history', () => {
  test('it renders no message history correctly with historical data missing warning', async () => {
    jest
      .spyOn(require('../hooks/useAllMessages'), 'useAllMessages')
      .mockImplementation(() => {
        return {
          error: undefined,
          loading: false,
          fetchMore: () => {},
          fetchingMore: false,
          pendingMsgs: [],
          messages: [],
          lastPage: true
        }
      })

    let container

    act(() => {
      const res = render(
        <TestEnvironment withApollo>
          <ThemeProvider theme={theme}>
            <MessageHistory
              offset={0}
              address={WALLET_ADDRESS}
              cidHref={cid => `/message/?cid=${cid}`}
              warnMissingData
            />
          </ThemeProvider>
        </TestEnvironment>
      )
      container = res.container
    })

    expect(screen.getByText(/No records found/))
    expect(screen.getByText(/Syncing data from Mainnet/))
    expect(container).toMatchSnapshot()
  })

  test('it renders messages', async () => {
    const makeMessages = (count: number): MessageConfirmedRow[] => {
      const messages = [] as MessageConfirmedRow[]
      for (let i = 0; i < count; i++) {
        messages.push({
          cid: `bafy2bzaced3ub5g4v35tj7n74zsog3dmcum4tk${i}qmchbhjx7q747jghal3l4g`,
          from: {
            id: WALLET_ID,
            robust: WALLET_ADDRESS
          },
          to: {
            id: WALLET_ID_2,
            robust: WALLET_ADDRESS_2
          },
          height: 1020,
          value: '1000',
          method: '0'
        })
      }
      return messages
    }
    jest
      .spyOn(require('../hooks/useAllMessages'), 'useAllMessages')
      .mockImplementation(() => {
        return {
          error: undefined,
          loading: false,
          fetchMore: () => {},
          fetchingMore: false,
          pendingMsgs: [],
          messages: makeMessages(5),
          lastPage: true
        }
      })

    let container

    act(() => {
      const res = render(
        <TestEnvironment withApollo>
          <ThemeProvider theme={theme}>
            <MessageHistory
              offset={0}
              address={WALLET_ADDRESS}
              cidHref={cid => `/message/?cid=${cid}`}
              warnMissingData
            />
          </ThemeProvider>
        </TestEnvironment>
      )
      container = res.container
    })

    expect(screen.getByText(/Transaction History/))
    expect(screen.getByText(/Syncing data from Mainnet/))
    expect(container).toMatchSnapshot()
  })
})
