import { ButtonInput } from './Button'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'

export default {
  title: 'InputV2/Button',
  component: ButtonInput,
  decorators: [
    Story => (
      <div style={{ maxWidth: '35em', margin: '0 auto' }}>
        <ThemeProvider theme={theme}>{Story()}</ThemeProvider>
      </div>
    )
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = args => <ButtonInput {...args} />

export const Base = Template.bind({})
Base.args = {
  label: 'Do something',
  value: 'Click here'
}

export const Large = Template.bind({})
Large.args = {
  large: true,
  label: 'Do something',
  value: 'Click here'
}

export const White = Template.bind({})
White.args = {
  white: true,
  label: 'Do something',
  value: 'Click here'
}

export const Gray = Template.bind({})
Gray.args = {
  gray: true,
  label: 'Do something',
  value: 'Click here'
}

export const Red = Template.bind({})
Red.args = {
  red: true,
  label: 'Do something',
  value: 'Click here'
}

export const Green = Template.bind({})
Green.args = {
  green: true,
  label: 'Do something',
  value: 'Click here'
}

export const NoLabel = Template.bind({})
NoLabel.args = {
  value: 'Click here'
}

export const WithInfo = Template.bind({})
WithInfo.args = {
  label: 'Do something',
  info: 'Now is your chance',
  value: 'Click here'
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
  label: 'You cannot click here',
  value: 'Nope'
}

export const Vertical = Template.bind({})
Vertical.args = {
  vertical: true,
  label: 'Do something',
  value: 'Click here'
}

export const VerticalCentered = Template.bind({})
VerticalCentered.args = {
  vertical: true,
  centered: true,
  label: 'Do something',
  value: 'Click here'
}
