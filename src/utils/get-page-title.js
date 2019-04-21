import defaultSettings from '@/settings'

const title = defaultSettings.title || 'XUpdate Management'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
