var styleSheetsIndex = null

export function applyCssRule(ruleText) {
    const { selector, properties } = parseCssRule(ruleText)

    properties.forEach(item => {
        const { property, value } = item

        applyRule(selector, property, value)
    })
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

function parseCssRule(ruleText) {
    const firstCurlyBracket = ruleText.indexOf('{')
    const lastCurlyBracket = ruleText.indexOf('}')
    const selector = ruleText.substr(0, firstCurlyBracket).trim()
    const propertiesText = ruleText.substr(firstCurlyBracket + 1, lastCurlyBracket - firstCurlyBracket - 1)
    const properties = propertiesText.split(';').map(proptertyText => {
        const pair = proptertyText.split(':')
        const property = pair[0].trim()
        const value = pair[1].trim()

        return {property, value}
    })

    return {selector, properties}
}

function findRuleBySelectorAndProperty(selector, property) {
    const selctorWithProperty = makeRuleTextStart(selector, property)
    const { cssRules } = getStyleSheets()

    for(var i = 0; i < cssRules.length; i++) {
        let rule = cssRules[i]

        if (rule.cssText.indexOf(selctorWithProperty) >= 0) {
            return i;
        }
    }

    return -1;
}

function getNextAvailableIndex() {
    const styleSheets = getStyleSheets()

    return styleSheets.cssRules.length
}

function getStyleSheets() {
    if (styleSheetsIndex !== null) {
        return document.styleSheets[styleSheetsIndex]
    }

    const style = document.createElement('style')

    document.head.appendChild(style)

    styleSheetsIndex = document.styleSheets.length - 1

    return document.styleSheets[styleSheetsIndex]
}

function makeRuleText(selector, property, value) {
    return `${makeRuleTextStart(selector, property)} ${value}; }`
}

function makeRuleTextStart(selector, property) {
    return `${selector} { ${property}:`
}
