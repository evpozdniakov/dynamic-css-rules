const getStyleSheets = require('./getStyleSheets')

function parseCssRule(ruleText) {
    const firstCurlyBracket = ruleText.indexOf('{')

    if (firstCurlyBracket < 0) {
        throw new Error('CSS rule has no `{` character: ', new String(ruleText))
    }

    const lastCurlyBracket = ruleText.indexOf('}')

    if (lastCurlyBracket < 0) {
        throw new Error('CSS rule has no `}` character: ', new String(ruleText))
    }

    const selector = ruleText.substr(0, firstCurlyBracket).trim()

    if (!selector) {
        throw new Error('CSS rule has no selector: ', new String(ruleText))
    }

    const propertiesText = ruleText.substr(firstCurlyBracket + 1, lastCurlyBracket - firstCurlyBracket - 1)

    const properties = propertiesText.split(';').reduce((res, proptertyText) => {
        if (proptertyText.trim() === '') {
            return res
        }

        if (proptertyText.indexOf(':') < 0) {
            throw new Error('CSS rule has no `:` character', proptertyText)
        }

        const pair = proptertyText.split(':')

        if (pair.length > 2) {
            throw new Error('CSS rule has extra `:` character', proptertyText)
        }

        const property = pair[0].trim()
        const value = pair[1].trim()

        return res.concat({property, value})
    }, [])

    return {selector, properties}
}

module.exports = parseCssRule
