import MessageHistory from './index'

export default {
  title: 'MessageHistory/Table',
  component: MessageHistory
}

const Template = args => (
  <MessageHistory cidHref={cid => `/#/detail/${cid}`} {...args} />
)

export const Base = Template.bind({})
Base.args = {
  warnMissingData: true,
  address: 't13koa6kz5otquokcgwusvtsxcdymuq7lqe4twb4i'
}
