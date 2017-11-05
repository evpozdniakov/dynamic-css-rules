var styleSheetsIndex = null

function getStyleSheets() {
    if (styleSheetsIndex !== null) {
        return document.styleSheets[styleSheetsIndex]
    }

    const style = document.createElement('style')

    document.head.appendChild(style)

    styleSheetsIndex = document.styleSheets.length - 1

    return document.styleSheets[styleSheetsIndex]
}

module.exports = getStyleSheets
