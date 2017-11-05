const getStyleSheets = require('./getStyleSheets')
const parseCssRule = require('./parseCssRule')

var styleSheetsIndex = null

function applyCssRule(ruleText) {
    try {
        const { selector, properties } = parseCssRule(ruleText)

        properties.forEach(item => {
            const { property, value } = item

            applyRule(selector, property, value)
        })
    }
    catch (err) {
        console.error(err)
    }
}

function applyRule(selector, property, value) {
    const styleSheets = getStyleSheets()
    const existingRuleIndex = findRuleBySelectorAndProperty(selector, property)
    const ruleText = makeRuleText(selector, property, value)

    if (existingRuleIndex >= 0) {
        styleSheets.deleteRule(existingRuleIndex)
        styleSheets.insertRule(ruleText, existingRuleIndex)
    }
    else {
        styleSheets.insertRule(ruleText, getNextAvailableIndex())
    }
}

module.exports = applyCssRule
