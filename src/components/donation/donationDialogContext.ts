import { createContext, useContext } from 'react'

export type DonationDialogContextValue = {
  openDonationDialog: (trigger?: HTMLElement) => void
}

export const DonationDialogContext =
  createContext<DonationDialogContextValue | null>(null)

export function useDonationDialog(): DonationDialogContextValue {
  const context = useContext(DonationDialogContext)

  if (!context) {
    throw new Error(
      'useDonationDialog must be used inside DonationDialogProvider',
    )
  }

  return context
}
