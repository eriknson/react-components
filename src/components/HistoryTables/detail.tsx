import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { H2 } from '../Typography'
import Box from '../Box'
import ButtonV2 from '../Button/V2'
import { Badge } from './generic'
import { IconSpeedUp, IconCancel, IconCheck } from '../Icons'

/**
 * Head
 * Top row of the detail page, displaying
 * the title and Speed up / Cancel buttons
 */
export const Head = ({ title, speedUp, cancel }: HeadProps) => (
  <Box
    display='flex'
    alignItems='center'
    justifyContent='space-between'
    gridGap='1em'
    my='1em'
  >
    <H2 color='core.primary' fontSize='1.5rem' margin='0'>
      {title}
    </H2>
    <Box display='flex' gridGap='1rem'>
      {speedUp && (
        <ButtonV2 fontSize='1.5rem'>
          <IconSpeedUp width='1.75rem' />
          Speed up
        </ButtonV2>
      )}
      {cancel && (
        <ButtonV2 fontSize='1.5rem'>
          <IconCancel width='1.25rem' />
          Cancel
        </ButtonV2>
      )}
    </Box>
  </Box>
)

type HeadProps = {
  title: string
  speedUp?: () => void
  cancel?: () => void
}

Head.propTypes = {
  title: PropTypes.string.isRequired,
  speedUp: PropTypes.func,
  cancel: PropTypes.func
}

/**
 * Line
 * Content row of the detail page
 */
export const Line = ({ label, depth, children }: LineProps) => (
  <Box
    display='flex'
    alignItems='center'
    gridGap='1em'
    lineHeight='2em'
    my='1em'
    pl={`${depth * 5}%`}
    css={`
      a {
        color: ${props => props.theme.colors.core.primary};
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
      .gray {
        color: ${props => props.theme.colors.gray.medium};
      }
    `}
  >
    <Box minWidth='200px' flex='0 1 25%'>
      {label}
    </Box>
    <Box flex='1 1' display='flex' alignItems='center' gridGap='0.75em'>
      {children}
    </Box>
  </Box>
)

type LineProps = {
  label?: string
  depth?: number
  children?: React.ReactNode
}

Line.propTypes = {
  label: PropTypes.string,
  depth: PropTypes.number,
  children: PropTypes.node
}

Line.defaultProps = {
  label: '',
  depth: 0,
  children: <></>
}

/**
 * Parameters
 * Parameter rows of the detail page
 */
export const Parameters = ({ params, depth }: ParametersProps) => (
  <>
    {Object.entries(params).map(([key, value]) => {
      switch (key.toLowerCase()) {
        case 'params':
          return value ? (
            <>
              <Line key={`${depth}-${key}-1`} label='Parameters'></Line>
              <Parameters
                key={`${depth}-${key}-2`}
                params={value}
                depth={depth + 1}
              />
            </>
          ) : (
            <Line key={`${depth}-${key}`} label='Parameters'>
              &mdash;
            </Line>
          )
        case 'method':
          return (
            <Line key={`${depth}-${key}`} label={key} depth={depth}>
              <Badge color='purple'>{value}</Badge>
            </Line>
          )
        default:
          return (
            <Line key={`${depth}-${key}`} label={key} depth={depth}>
              {value}
            </Line>
          )
      }
    })}
  </>
)

type ParametersProps = {
  params: object
  depth: number
}

Parameters.propTypes = {
  params: PropTypes.object.isRequired,
  depth: PropTypes.number.isRequired
}

/**
 * Status
 * Badge displaying the current status of the message
 */
export const Status = ({ exitCode }: StatusProps) => {
  const success = useMemo(() => exitCode === 0, [exitCode])
  return (
    <Badge color={success ? 'green' : 'red'}>
      {success && <IconCheck width='1.1875rem' />}
      {success ? 'SUCCESS' : 'ERROR'}
    </Badge>
  )
}

type StatusProps = {
  exitCode: number
}

Status.propTypes = {
  exitCode: PropTypes.number.isRequired
}

/**
 * Confirmations
 * Badge displaying the current confirmations of the message
 */
export const Confirmations = ({ count, total }: ConfirmationsProps) => {
  const confirmed = useMemo(() => count >= total, [count, total])
  return (
    <Badge color={confirmed ? 'green' : 'yellow'}>
      {confirmed && <IconCheck width='1.1875rem' />}
      {Math.min(count, total)} / {total} Confirmations
    </Badge>
  )
}

type ConfirmationsProps = {
  count: number
  total: number
}

Confirmations.propTypes = {
  count: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
}