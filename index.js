const parseCssRule = require('./parseCssRule')
const applyRule = require('./applyRule')

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

module.exports = applyCssRule
