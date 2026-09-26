import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import { mosqueData } from '../../data/mosque'

const productionOrigin = `https://${mosqueData.identity.canonicalDomain}`

const indexablePublicPaths = ['/', '/visit', '/programs', '/about'] as const

type IndexablePublicPath = (typeof indexablePublicPaths)[number]
type SeoPageKey = 'home' | 'visit' | 'programs' | 'about'

const seoPageKeys: Record<IndexablePublicPath, SeoPageKey> = {
  '/': 'home',
  '/visit': 'visit',
  '/programs': 'programs',
  '/about': 'about',
}

const socialImageUrl = `${productionOrigin}/assets/brand/abu-bakr-al-siddiq-official.JPG`
const logoUrl = `${productionOrigin}/assets/brand/abu-bakr-logo-dark-clean.png`

const ogLocales: Record<string, string> = {
  ar: 'ar_AR',
  en: 'en_US',
  es: 'es_US',
}

function isIndexablePublicPath(
  pathname: string,
): pathname is IndexablePublicPath {
  return indexablePublicPaths.includes(pathname as IndexablePublicPath)
}

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`,
  )

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.append(element)
  }

  element.content = content
}

function removeMeta(attribute: 'name' | 'property', key: string) {
  document.head
    .querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
    ?.remove()
}

function setCanonical(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  )

  if (!element) {
    element = document.createElement('link')
    element.rel = 'canonical'
    document.head.append(element)
  }

  element.href = href
}

function setStructuredData() {
  let element = document.head.querySelector<HTMLScriptElement>(
    '#mosque-structured-data',
  )

  if (!element) {
    element = document.createElement('script')
    element.id = 'mosque-structured-data'
    element.type = 'application/ld+json'
    document.head.append(element)
  }

  element.text = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': ['Mosque', 'ReligiousOrganization'],
    '@id': `${productionOrigin}/#mosque`,
    name: mosqueData.identity.canonicalName.en,
    alternateName: mosqueData.identity.canonicalName.ar,
    url: `${productionOrigin}/`,
    logo: logoUrl,
    email: mosqueData.publicContact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1130 Kensington St',
      addressLocality: 'Delano',
      addressRegion: 'CA',
      postalCode: '93215',
      addressCountry: 'US',
    },
  })
}

const removableSocialMetadata = [
  ['property', 'og:title'],
  ['property', 'og:description'],
  ['property', 'og:url'],
  ['property', 'og:type'],
  ['property', 'og:site_name'],
  ['property', 'og:locale'],
  ['property', 'og:image'],
  ['property', 'og:image:secure_url'],
  ['property', 'og:image:type'],
  ['property', 'og:image:width'],
  ['property', 'og:image:height'],
  ['property', 'og:image:alt'],
  ['name', 'twitter:card'],
  ['name', 'twitter:title'],
  ['name', 'twitter:description'],
  ['name', 'twitter:image'],
  ['name', 'twitter:image:alt'],
] as const

export function SiteMetadata() {
  const location = useLocation()
  const { i18n, t } = useTranslation()

  useEffect(() => {
    const pathname =
      location.pathname === '/' ? '/' : location.pathname.replace(/\/+$/, '')
    const language = i18n.resolvedLanguage ?? 'en'

    if (!isIndexablePublicPath(pathname)) {
      const metadataKey = pathname === '/display' ? 'internal' : 'notFound'

      document.title = t(`seo.${metadataKey}.title`)
      setMeta('name', 'description', t(`seo.${metadataKey}.description`))
      setMeta('name', 'robots', 'noindex, nofollow')
      document.head.querySelector('link[rel="canonical"]')?.remove()
      document.head.querySelector('#mosque-structured-data')?.remove()

      for (const [attribute, key] of removableSocialMetadata) {
        removeMeta(attribute, key)
      }

      return
    }

    const pageKey = seoPageKeys[pathname]
    const title = t(`seo.${pageKey}.title`)
    const description = t(`seo.${pageKey}.description`)
    const canonicalUrl = `${productionOrigin}${pathname === '/' ? '/' : pathname}`
    const siteName = t('siteName')

    document.title = title
    setMeta('name', 'description', description)
    setMeta('name', 'robots', 'index, follow')
    setCanonical(canonicalUrl)

    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', canonicalUrl)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:site_name', siteName)
    setMeta('property', 'og:locale', ogLocales[language] ?? ogLocales.en)
    setMeta('property', 'og:image', socialImageUrl)
    setMeta('property', 'og:image:secure_url', socialImageUrl)
    setMeta('property', 'og:image:type', 'image/jpeg')
    setMeta('property', 'og:image:width', '1254')
    setMeta('property', 'og:image:height', '1254')
    setMeta('property', 'og:image:alt', t('seo.socialImageAlt'))

    setMeta('name', 'twitter:card', 'summary')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', socialImageUrl)
    setMeta('name', 'twitter:image:alt', t('seo.socialImageAlt'))

    setStructuredData()
  }, [i18n.resolvedLanguage, location.pathname, t])

  return null
}
