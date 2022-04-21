import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { Label } from './Label'

const ToggleLabel = styled(Label)`
  .toggle-wrapper {
    position: relative;
    padding: 0.5em 0;
  }

  input {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    opacity: 0;
  }

  .toggle {
    display: inline-block;
    position: relative;
    width: 2.25em;
    height: 1.5em;
    border-radius: 0.75em;
    border: 2px solid var(--blue-medium);
    background-color: var(--blue-medium);

    ${props =>
      props.disabled &&
      css`
        border-color: var(--gray-light) !important;
        background-color: var(--gray-light) !important;
      `}

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: calc(1.5em - 4px);
      height: calc(1.5em - 4px);
      border-radius: 50%;
      background-color: var(--white);
    }
  }

  input:checked ~ .toggle {
    border-color: var(--blue-dark);
    background-color: var(--blue-dark);
  }

  input:checked ~ .toggle::after {
    left: auto;
    right: 0;
  }
`

export const Toggle = ({
  label,
  info,
  autofocus,
  disabled,
  checked,
  onChange
}: ToggleProps) => (
  <ToggleLabel disabled={disabled}>
    <div>
      {label && <span>{label}</span>}
      {info && <span className='info'>{info}</span>}
    </div>
    <span className='toggle-wrapper'>
      <input
        type='checkbox'
        autoFocus={autofocus}
        disabled={disabled}
        checked={checked}
        onChange={e => onChange(e.target.checked)}
      />
      <span className='toggle'></span>
    </span>
  </ToggleLabel>
)

interface ToggleProps {
  label?: string
  info?: string
  autofocus?: boolean
  disabled?: boolean
  checked?: boolean
  onChange?: (checked: boolean) => void
}

Toggle.propTypes = {
  label: PropTypes.string,
  info: PropTypes.string,
  autofocus: PropTypes.bool,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func
}

Toggle.defaultProps = {
  label: '',
  info: '',
  autofocus: false,
  disabled: false,
  checked: false,
  onChange: () => {}
}