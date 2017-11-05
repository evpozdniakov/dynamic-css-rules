const applyCssRule = require('./index')
jest.mock('./applyRule')
const applyRule = require('./applyRule')    

describe('Test changing style', () => {
  afterEach(() => {
    applyRule.mockReset()
  })

  test('Simplest rule.', () => {
    applyCssRule('body {color: red}')

    const { calls } = applyRule.mock

    expect.assertions(4)
    expect(calls.length).toEqual(1)
    expect(calls[0][0]).toEqual('body')
    expect(calls[0][1]).toEqual('color')
    expect(calls[0][2]).toEqual('red')
  })

  test('Multiline rule with 2 properties', () => {
    applyCssRule(`
      table, div.table {
        color: red;
        background: white;
      }
    `)

    const { calls } = applyRule.mock

    expect.assertions(7)
    expect(calls.length).toEqual(2)
    expect(calls[0][0]).toEqual('table, div.table')
    expect(calls[0][1]).toEqual('color')
    expect(calls[0][2]).toEqual('red')
    expect(calls[1][0]).toEqual('table, div.table')
    expect(calls[1][1]).toEqual('background')
    expect(calls[1][2]).toEqual('white')
  })
})
