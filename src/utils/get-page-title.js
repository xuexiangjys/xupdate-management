import defaultSettings from '@/settings'

const title = defaultSettings.title || '版本更新管理'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
