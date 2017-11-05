const parseCssRule = require('./parseCssRule')

describe('Test rule parser to throw errors', () => {
  test('Rule has no `{` character.', () => {
    expect(() => {
      parseCssRule('body color: red; }')
    }).toThrow(/`{`/)
  })

  test('Rule has no `}` character.', () => {
    expect(() => {
      parseCssRule('body { color: red; ')
    }).toThrow(/`}`/)
  })

  test('Rule has no selector.', () => {
    expect(() => {
      parseCssRule('{ color: red; }')
    }).toThrow(/selector/)
  })

  test('Rule has no `:` character.', () => {
    expect(() => {
      parseCssRule('body { color red; }')
    }).toThrow(/`:`/)
  })

  test('Rule has extra `:` character.', () => {
    expect(() => {
      parseCssRule('body { color : blue : red; }')
    }).toThrow(/extra/)
  })
})
