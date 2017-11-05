(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["applyCssRule"] = factory();
	else
		root["applyCssRule"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const parseCssRule = __webpack_require__(2)
const applyRule = __webpack_require__(3)

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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const getStyleSheets = __webpack_require__(0)

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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const getStyleSheets = __webpack_require__(0)

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


/***/ })
/******/ ]);
});