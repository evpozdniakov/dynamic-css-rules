const getStyleSheets = require('./getStyleSheets')

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

module.exports = applyRule
