import { validLoginName, isExternal } from '@/utils/validate.js'

describe('Utils:validate', () => {
  it('validLoginName', () => {
    expect(validLoginName('admin')).toBe(true)
    expect(validLoginName('editor')).toBe(true)
    expect(validLoginName('xxxx')).toBe(false)
  })
  it('isExternal', () => {
    expect(isExternal('https://github.com/PanJiaChen/vue-element-admin')).toBe(true)
    expect(isExternal('http://github.com/PanJiaChen/vue-element-admin')).toBe(true)
    expect(isExternal('github.com/PanJiaChen/vue-element-admin')).toBe(false)
    expect(isExternal('/dashboard')).toBe(false)
    expect(isExternal('./dashboard')).toBe(false)
    expect(isExternal('dashboard')).toBe(false)
  })
})
