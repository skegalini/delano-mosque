import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { donationConfiguration } from '../../data/donation'
import { DonationDialogContext } from './donationDialogContext'

export function DonationDialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const returnFocusRef = useRef<HTMLElement | null>(null)

  const openDonationDialog = useCallback((trigger?: HTMLElement) => {
    returnFocusRef.current =
      trigger ??
      (document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null)
    setIsOpen(true)
  }, [])

  const closeDonationDialog = useCallback(() => setIsOpen(false), [])

  return (
    <DonationDialogContext.Provider value={{ openDonationDialog }}>
      {children}
      <DonationDialog
        isOpen={isOpen}
        onClose={closeDonationDialog}
        returnFocusRef={returnFocusRef}
      />
    </DonationDialogContext.Provider>
  )
}

function DonationDialog({
  isOpen,
  onClose,
  returnFocusRef,
}: {
  isOpen: boolean
  onClose: () => void
  returnFocusRef: React.RefObject<HTMLElement | null>
}) {
  const { t } = useTranslation()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const dialog = dialogRef.current
    if (!dialog) return

    const previousOverflow = document.body.style.overflow
    const returnFocusTarget = returnFocusRef.current
    document.body.style.overflow = 'hidden'

    if (!dialog.open) {
      if (typeof dialog.showModal === 'function') {
        dialog.showModal()
      } else {
        dialog.setAttribute('open', '')
      }
    }

    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow

      if (dialog.open) {
        if (typeof dialog.close === 'function') {
          dialog.close()
        } else {
          dialog.removeAttribute('open')
        }
      }

      returnFocusTarget?.focus()
    }
  }, [isOpen, returnFocusRef])

  return (
    <dialog
      aria-labelledby="donation-dialog-title"
      aria-modal="true"
      className="donation-dialog"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      ref={dialogRef}
    >
      <div className="donation-dialog__shell">
        <button
          aria-label={t('donationDialog.close')}
          className="donation-dialog__close"
          onClick={onClose}
          ref={closeButtonRef}
          type="button"
        >
          <span aria-hidden="true" className="donation-dialog__close-icon">
            ×
          </span>
          <span className="donation-dialog__close-label">
            {t('donationDialog.close')}
          </span>
        </button>

        <header className="donation-dialog__brand">
          <img
            alt=""
            aria-hidden="true"
            className="donation-dialog__logo"
            height="1254"
            src="/assets/brand/abu-bakr-logo-dark-clean.png"
            width="1254"
          />
          <h2
            className="donation-dialog__title font-heading"
            id="donation-dialog-title"
          >
            {t('donationDialog.heading')}
          </h2>
          <p className="donation-dialog__location">
            {t('donationDialog.location')}
          </p>

          <span aria-hidden="true" className="donation-dialog__divider" />

          <p className="donation-dialog__verse font-editorial">
            {t('donationDialog.verse')}
          </p>
          <p className="donation-dialog__reference">
            {t('donationDialog.reference')}
          </p>
          <p className="donation-dialog__supporting-copy">
            {t('donationDialog.supportingCopy')}
          </p>
        </header>

        <div className="donation-dialog__form">
          <givebutter-widget id={donationConfiguration.embedId ?? undefined} />
        </div>
      </div>
    </dialog>
  )
}
