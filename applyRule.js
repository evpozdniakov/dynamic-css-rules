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

function getNextAvailableIndex() {
    const styleSheets = getStyleSheets()

    return styleSheets.cssRules.length
}

function findRuleBySelectorAndProperty(selector, property) {
    const selectorWithProperty = makeRuleTextStart(selector, property)
    const { cssRules } = getStyleSheets()

    for(var i = 0; i < cssRules.length; i++) {
        let rule = cssRules[i]

        if (rule.cssText.indexOf(selectorWithProperty) >= 0) {
            return i;
        }
    }

    return -1;
}

function makeRuleText(selector, property, value) {
    return `${makeRuleTextStart(selector, property)} ${value}; }`
}

function makeRuleTextStart(selector, property) {
    return `${selector} { ${property}:`
}

module.exports = applyRule
