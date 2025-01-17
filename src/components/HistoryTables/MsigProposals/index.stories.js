import ProposalHistory from './index'

export default {
  title: 'ProposalHistory/Table',
  component: ProposalHistory
}

const Template = args => <ProposalHistory {...args} />

export const Base = Template.bind({})
Base.args = {
  msigAddress: 't2i43oi6rnf2s6rp544rcegfbcdp5l62cayz2btmy',
  walletAddress: {
    robust: 't2i43oi6rnf2s6rp544rcegfbcdp5l62cayz2btmy',
    id: 't029519'
  },
  idHref: id => `/#/detail/${id}`,
  approve: console.log,
  cancel: console.log
}
