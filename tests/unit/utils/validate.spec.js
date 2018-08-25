import { isvalidUsername, validateURL, validateLowerCase, validateUpperCase, validatAlphabets } from '@/utils/validate.js'

describe('Utils:validate', () => {
  it('isvalidUsername', () => {
    expect(isvalidUsername('admin')).toBe(true)
    expect(isvalidUsername('editor')).toBe(true)
    expect(isvalidUsername('xxxx')).toBe(false)
  })

  it('validateURL', () => {
    expect(validateURL('https://github.com/PanJiaChen/vue-element-admin')).toBe(true)
    expect(validateURL('http://github.com/PanJiaChen/vue-element-admin')).toBe(true)
    expect(validateURL('github.com/PanJiaChen/vue-element-admin')).toBe(false)
  })

  it('validateLowerCase', () => {
    expect(validateLowerCase('abc')).toBe(true)
    expect(validateLowerCase('Abc')).toBe(false)
    expect(validateLowerCase('123abc')).toBe(false)
  })

  it('validateUpperCase', () => {
    expect(validateUpperCase('ABC')).toBe(true)
    expect(validateUpperCase('Abc')).toBe(false)
    expect(validateUpperCase('123ABC')).toBe(false)
  })

  it(' validatAlphabets', () => {
    expect(validatAlphabets('ABC')).toBe(true)
    expect(validatAlphabets('Abc')).toBe(true)
    expect(validatAlphabets('123aBC')).toBe(false)
  })
})
