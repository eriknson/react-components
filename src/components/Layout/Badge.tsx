import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

const BadgeEl = styled.div`
  display: inline-flex;
  align-items: center;
  gap: var(--space-m);
  padding: 0 1em;
  height: 2em;
  line-height: 2em;
  border-radius: 1em;
  text-align: center;
  white-space: nowrap;

  ${props => {
    switch (props.color) {
      case 'purple':
      case 'green':
        // Use "medium" foreground color
        return css`
          color: var(--${props.color}-medium);
          background-color: var(--${props.color}-light);
        `
      case 'yellow':
      case 'red':
      case 'blue':
      case 'gray':
        // Use "dark" foreground color
        return css`
          color: var(--${props.color}-dark);
          background-color: var(--${props.color}-light);
        `
    }
  }}
`

export const Badge = ({ text, color, uppercase, icon }: BadgeProps) => (
  <BadgeEl color={color}>
    {icon}
    <span>{uppercase ? text.toUpperCase() : text}</span>
  </BadgeEl>
)

type BadgeProps = {
  text: string
  color?: 'purple' | 'green' | 'yellow' | 'red' | 'blue' | 'gray'
  uppercase?: boolean
  icon?: JSX.Element
}

Badge.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['purple', 'green', 'yellow', 'red', 'blue', 'gray']),
  uppercase: PropTypes.bool,
  icon: PropTypes.node
}

Badge.defaultProps = {
  color: 'gray',
  uppercase: true
}
