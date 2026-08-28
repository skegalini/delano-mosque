export type DonationConfiguration = {
  provider: 'givebutter'
  status: 'pending-setup' | 'active'
  recipient: 'mosque'
  campaignUrl: string | null
  embedId: string | null
}
