(self["webpackChunkforgejo"] = self["webpackChunkforgejo"] || []).push([["citation-js-core-citation-js-formats-citation-js-bibtex"],{

/***/ "./node_modules/@citation-js/core/lib-mjs/Cite/async.js":
/*!**************************************************************!*\
  !*** ./node_modules/@citation-js/core/lib-mjs/Cite/async.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function async(data, options, callback) {
  if (typeof options === 'function' && !callback) {
    callback = options;
    options = undefined;
  }
  const promise = new this().setAsync(data, options);
  if (typeof callback === 'function') {
    promise.then(callback);
    return undefined;
  } else {
    return promise;
  }
}
/* harmony default export */ __webpack_exports__["default"] = (async);

/***/ }),

/***/ "./node_modules/@citation-js/core/lib-mjs/Cite/get.js":
/*!************************************************************!*\
  !*** ./node_modules/@citation-js/core/lib-mjs/Cite/get.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   format: function() { return /* binding */ format; },
/* harmony export */   get: function() { return /* binding */ get; },
/* harmony export */   getIds: function() { return /* binding */ getIds; }
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "./node_modules/@citation-js/core/lib-mjs/Cite/validate.js");
/* harmony import */ var _plugins_output_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../plugins/output.js */ "./node_modules/@citation-js/core/lib-mjs/plugins/output.js");
/* harmony import */ var _plugins_input_csl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../plugins/input/csl.js */ "./node_modules/@citation-js/core/lib-mjs/plugins/input/csl.js");



function getIds() {
  return this.data.map(entry => entry.id);
}
function format(format, ...options) {
  return (0,_plugins_output_js__WEBPACK_IMPORTED_MODULE_1__.format)(format, (0,_plugins_input_csl_js__WEBPACK_IMPORTED_MODULE_2__.clean)(this.data), ...options);
}
function get(options = {}) {
  (0,_validate_js__WEBPACK_IMPORTED_MODULE_0__.validateOutputOptions)(options);
  const parsedOptions = Object.assign({}, this.defaultOptions, this._options.output, options);
  const {
    type,
    style
  } = parsedOptions;
  const [styleType, styleFormat] = style.split('-');
  const newStyle = styleType === 'citation' ? 'bibliography' : styleType === 'csl' ? 'data' : styleType;
  const newType = type === 'string' ? 'text' : type === 'json' ? 'object' : type;
  let formatOptions;
  switch (newStyle) {
    case 'bibliography':
      {
        const {
          lang,
          append,
          prepend
        } = parsedOptions;
        formatOptions = {
          template: styleFormat,
          lang,
          format: newType,
          append,
          prepend
        };
        break;
      }
    case 'data':
    case 'bibtex':
    case 'bibtxt':
    case 'ndjson':
    case 'ris':
      formatOptions = {
        type: newType
      };
      break;
    default:
      throw new Error(`Invalid style "${newStyle}"`);
  }
  const result = this.format(newStyle, Object.assign(formatOptions, options._newOptions));
  const {
    format
  } = parsedOptions;
  if (format === 'real' && newType === 'html' && typeof document !== 'undefined' && typeof document.createElement === 'function') {
    const tmp = document.createElement('div');
    tmp.innerHTML = result;
    return tmp.firstChild;
  } else if (format === 'string' && typeof result === 'object') {
    return JSON.stringify(result);
  } else {
    return result;
  }
}

/***/ }),

/***/ "./node_modules/@citation-js/core/lib-mjs/Cite/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/@citation-js/core/lib-mjs/Cite/index.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./log.js */ "./node_modules/@citation-js/core/lib-mjs/Cite/log.js");
/* harmony import */ var _options_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./options.js */ "./node_modules/@citation-js/core/lib-mjs/Cite/options.js");
/* harmony import */ var _set_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./set.js */ "./node_modules/@citation-js/core/lib-mjs/Cite/set.js");
/* harmony import */ var _sort_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sort.js */ "./node_modules/@citation-js/core/lib-mjs/Cite/sort.js");
/* harmony import */ var _get_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./get.js */ "./node_modules/@citation-js/core/lib-mjs/Cite/get.js");
/* harmony import */ var _static_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./static.js */ "./node_modules/@citation-js/core/lib-mjs/Cite/static.js");






function Cite(data, options = {}) {
  if (!(this instanceof Cite)) {
    return new Cite(data, options);
  }
  this._options = options;
  this.log = [];
  this.data = [];
  this.set(data, options);
  this.options(options);
  return this;
}
Object.assign(Cite.prototype, _log_js__WEBPACK_IMPORTED_MODULE_0__, _options_js__WEBPACK_IMPORTED_MODULE_1__, _set_js__WEBPACK_IMPORTED_MODULE_2__, _sort_js__WEBPACK_IMPORTED_MODULE_3__, _get_js__WEBPACK_IMPORTED_MODULE_4__);
Cite.prototype[Symbol.iterator] = function* () {
  yield* this.data;
};
Object.assign(Cite, _static_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony default export */ __webpack_exports__["default"] = (Cite);

/***/ }),

/***/ "./node_modules/@citation-js/core/lib-mjs/Cite/log.js":
/*!************************************************************!*\
  !*** ./node_modules/@citation-js/core/lib-mjs/Cite/log.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   currentVersion: function() { return /* binding */ currentVersion; },
/* harmony export */   retrieveLastVersion: function() { return /* binding */ retrieveLastVersion; },
/* harmony export */   retrieveVersion: function() { return /* binding */ retrieveVersion; },
/* harmony export */   save: function() { return /* binding */ save; },
/* harmony export */   undo: function() { return /* binding */ undo; }
/* harmony export */ });
function currentVersion() {
  return this.log.length;
}
function retrieveVersion(versnum = 1) {
  if (versnum <= 0 || versnum > this.currentVersion()) {
    return null;
  } else {
    const [data, options] = this.log[versnum - 1];
    const image = new this.constructor(JSON.parse(data), JSON.parse(options));
    image.log = this.log.slice(0, versnum);
    return image;
  }
}
function undo(number = 1) {
  return this.retrieveVersion(this.currentVersion() - number);
}
function retrieveLastVersion() {
  return this.retrieveVersion(this.currentVersion());
}
function save() {
  this.log.push([JSON.stringify(this.data), JSON.stringify(this._options)]);
  return this;
}


/***/ }),

/***/ "./node_modules/@citation-js/core/lib-mjs/Cite/options.js":
/*!****************************************************************!*\
  !*** ./node_modules/@citation-js/core/lib-mjs/Cite/options.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultOptions: function() { return /* binding */ defaultOptions; },
/* harmony export */   options: function() { return /* binding */ options; }
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "./node_modules/@citation-js/core/lib-mjs/Cite/validate.js");

const defaultOptions = {
  format: 'real',
  type: 'json',
  style: 'csl',
  lang: 'en-US'
};
function options(options, log) {
  (0,_validate_js__WEBPACK_IMPORTED_MODULE_0__.validateOutputOptions)(options);
  if (log) {
    this.save();
  }
  Object.assign(this._options, options);
  return this;
}


/***/ }),

/***/ "./node_modules/@citation-js/core/lib-mjs/Cite/set.js":
/*!************************************************************!*\
  !*** ./node_modules/@citation-js/core/lib-mjs/Cite/set.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   add: function() { return /* binding */ add; },
/* harmony export */   addAsync: function() { return /* binding */ addAsync; },
/* harmony export */   reset: function() { return /* binding */ reset; },
/* harmony export */   set: function() { return /* binding */ set; },
/* harmony export */   setAsync: function() { return /* binding */ setAsync; }
/* harmony export */ });
/* harmony import */ var _plugins_input_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../plugins/input/index.js */ "./node_modules/@citation-js/core/lib-mjs/plugins/input/index.js");
/* harmony import */ var _util_fetchId_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/fetchId.js */ "./node_modules/@citation-js/core/lib-mjs/util/fetchId.js");


function add(data, options = {}, log = false) {
  if (options === true || log === true) {
    this.save();
  }
  this.data.push(...(0,_plugins_input_index_js__WEBPACK_IMPORTED_MODULE_0__.chain)(data, options));
  this.data.filter(entry => !Object.prototype.hasOwnProperty.call(entry, 'id')).forEach(entry => {
    entry.id = (0,_util_fetchId_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this.getIds(), 'temp_id_');
  });
  return this;
}
async function addAsync(data, options = {}, log = false) {
  if (options === true || log === true) {
    this.save();
  }
  this.data.push(...(await (0,_plugins_input_index_js__WEBPACK_IMPORTED_MODULE_0__.chainAsync)(data, options)));
  this.data.filter(entry => !Object.prototype.hasOwnProperty.call(entry, 'id')).forEach(entry => {
    entry.id = (0,_util_fetchId_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this.getIds(), 'temp_id_');
  });
  return this;
}
function set(data, options = {}, log = false) {
  if (options === true || log === true) {
    this.save();
  }
  this.data = [];
  return typeof options !== 'boolean' ? this.add(data, options) : this.add(data);
}
async function setAsync(data, options = {}, log = false) {
  if (options === true || log === true) {
    this.save();
  }
  this.data = [];
  return typeof options !== 'boolean' ? this.addAsync(data, options) : this.addAsync(data);
}
function reset(log) {
  if (log) {
    this.save();
  }
  this.data = [];
  this._options = {};
  return this;
}


/***/ }),

/***/ "./node_modules/@citation-js/core/lib-mjs/Cite/sort.js":
/*!*************************************************************!*\
  !*** ./node_modules/@citation-js/core/lib-mjs/Cite/sort.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   sort: function() { return /* binding */ sort; }
/* harmony export */ });
/* harmony import */ var _plugin_common_output_label_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../plugin-common/output/label.js */ "./node_modules/@citation-js/core/lib-mjs/plugin-common/output/label.js");
/* harmony import */ var _citation_js_name__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @citation-js/name */ "./node_modules/@citation-js/name/lib/index.js");


function getComparisonValue(obj, prop, label = prop === 'label') {
  let value = label ? (0,_plugin_common_output_label_js__WEBPACK_IMPORTED_MODULE_0__.getLabel)(obj) : obj[prop];
  switch (prop) {
    case 'author':
    case 'editor':
      return value.map(name => name.literal || name.family || (0,_citation_js_name__WEBPACK_IMPORTED_MODULE_1__.format)(name));
    case 'accessed':
    case 'issued':
      return value['date-parts'][0];
    case 'page':
      return value.split('-').map(num => parseInt(num));
    case 'edition':
    case 'issue':
    case 'volume':
      value = parseInt(value);
      return !isNaN(value) ? value : -Infinity;
    default:
      return value || -Infinity;
  }
}
function compareProp(entryA, entryB, prop, flip = /^!/.test(prop)) {
  prop = prop.replace(/^!/, '');
  const a = getComparisonValue(entryA, prop);
  const b = getComparisonValue(entryB, prop);
  return (flip ? -1 : 1) * (a > b ? 1 : a < b ? -1 : 0);
}
function getSortCallback(...props) {
  return (a, b) => {
    const keys = props.slice();
    let output = 0;
    while (!output && keys.length) {
      output = compareProp(a, b, keys.shift());
    }
    return output;
  };
}
function sort(method = [], log) {
  if (log) {
    this.save();
  }
  this.data.sort(typeof method === 'function' ? method : getSortCallback(...method, 'label'));
  return this;
}


/***/ }),

/***/ "./node_modules/@citation-js/core/lib-mjs/Cite/static.js":
/*!***************************************************************!*\
  !*** ./node_modules/@citation-js/core/lib-mjs/Cite/static.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   async: function() { return /* reexport safe */ _async_js__WEBPACK_IMPORTED_MODULE_0__["default"]; },
/* harmony export */   validateOptions: function() { return /* reexport safe */ _validate_js__WEBPACK_IMPORTED_MODULE_1__.validateOptions; },
/* harmony export */   validateOutputOptions: function() { return /* reexport safe */ _validate_js__WEBPACK_IMPORTED_MODULE_1__.validateOutputOptions; }
/* harmony export */ });
/* harmony import */ var _async_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./async.js */ "./node_modules/@citation-js/core/lib-mjs/Cite/async.js");
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./validate.js */ "./node_modules/@citation-js/core/lib-mjs/Cite/validate.js");



/***/ }),

/***/ "./node_modules/@citation-js/core/lib-mjs/Cite/validate.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@citation-js/core/lib-mjs/Cite/validate.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   validateOptions: function() { return /* binding */ validateOptions; },
/* harmony export */   validateOutputOptions: function() { return /* binding */ validateOutputOptions; }
/* harmony export */ });
const formats = ['real', 'string'];
const types = ['json', 'html', 'string', 'rtf'];
const styles = ['csl', 'bibtex', 'bibtxt', 'citation-*', 'ris', 'ndjson'];
const wrapperTypes = ['string', 'function'];
function validateOutputOptions(options) {
  if (typeof options !== 'object') {
    throw new TypeError('Options not an object!');
  }
  const {
    format,
    type,
    style,
    lang,
    append,
    prepend
  } = options;
  if (format && !formats.includes(format)) {
    throw new TypeError(`Option format ("${format}") should be one of: ${formats}`);
  } else if (type && !types.includes(type)) {
    throw new TypeError(`Option type ("${type}") should be one of: ${types}`);
  } else if (style && !styles.includes(style) && !/^citation/.test(style)) {
    throw new TypeError(`Option style ("${style}") should be one of: ${styles}`);
  } else if (lang && typeof lang !== 'string') {
    throw new TypeError(`Option lang should be a string, but is a ${typeof lang}`);
  } else if (prepend && !wrapperTypes.includes(typeof prepend)) {
    throw new TypeError(`Option prepend should be a string or a function, but is a ${typeof prepend}`);
  } else if (append && !wrapperTypes.includes(typeof append)) {
    throw new TypeError(`Option append should be a string or a function, but is a ${typeof append}`);
  }
  if (/^citation/.test(style) && type === 'json') {
    throw new Error(`Combination type/style of json/citation-* is not valid: ${type}/${style}`);
  }
  return true;
}
function validateOptions(options) {
  if (typeof options !== 'object') {
    throw new TypeError('Options should be an object');
  }
  if (options.output) {
    validateOutputOptions(options.output);
  } else if (options.maxChainLength && typeof options.maxChainLength !== 'number') {
    throw new TypeError('Option maxChainLength should be a number');
  } else if (options.forceType && typeof options.forceType !== 'string') {
    throw new TypeError('Option forceType should be a string');
  } else if (options.generateGraph != null && typeof options.generateGraph !== 'boolean') {
    throw new TypeError('Option generateGraph should be a boolean');
  } else if (options.strict != null && typeof options.strict !== 'boolean') {
    throw new TypeError('Option strict should be a boolean');
  } else if (options.target != null && typeof options.target !== 'string') {
    throw new TypeError('Option target should be a boolean');
  }
  return true;
}

/***/ }),

/***/ "./node_modules/@citation-js/core/lib-mjs/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/@citation-js/core/lib-mjs/index.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Cite: function() { return /* reexport safe */ _Cite_index_js__WEBPACK_IMPORTED_MODULE_0__["default"]; },
/* harmony export */   logger: function() { return /* reexport safe */ _logger_js__WEBPACK_IMPORTED_MODULE_3__["default"]; },
/* harmony export */   plugins: function() { return /* reexport module object */ _plugins_index_js__WEBPACK_IMPORTED_MODULE_1__; },
/* harmony export */   util: function() { return /* reexport module object */ _util_index_js__WEBPACK_IMPORTED_MODULE_2__; },
/* harmony export */   version: function() { return /* binding */ version; }
/* harmony export */ });
/* harmony import */ var _Cite_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Cite/index.js */ "./node_modules/@citation-js/core/lib-mjs/Cite/index.js");
/* harmony import */ var _plugins_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./plugins/index.js */ "./node_modules/@citation-js/core/lib-mjs/plugins/index.js");
/* harmony import */ var _util_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util/index.js */ "./node_modules/@citation-js/core/lib-mjs/util/index.js");
/* harmony import */ var _logger_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./logger.js */ "./node_modules/@citation-js/core/lib-mjs/logger.js");
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../package.json */ "./node_modules/@citation-js/core/package.json");
/* harmony import */ var _plugin_common_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./plugin-common/index.js */ "./node_modules/@citation-js/core/lib-mjs/plugin-common/index.js");






const version = _package_json__WEBPACK_IMPORTED_MODULE_4__.version;


/***/ }),

/***/ "./node_modules/@citation-js/core/lib-mjs/logger.js":
/*!**********************************************************!*\
  !*** ./node_modules/@citation-js/core/lib-mjs/logger.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const logger = {
  _output(level, scope, msg) {
    this._log.push(scope, msg);
    if (this._levels.indexOf(level) < this._levels.indexOf(this.level)) {
      return;
    }
    this._console.log(scope, ...msg);
  },
  _console: null,
  _log: [],
  _levels: ['http', 'debug', 'unmapped', 'info', 'warn', 'error', 'silent'],
  level: 'silent'
};
for (const level of logger._levels) {
  logger[level] = (scope, ...msg) => logger._output(level, scope, msg);
}
if (typeof console.Console === 'function') {
  logger._console = new console.Console(process.stderr);
} else {
  logger._console = console;
}
/* harmony default export */ __webpack_exports__["default"] = (logger);

/***/ }),

/***/ "./node_modules/@citation-js/core/lib-mjs/plugin-common/index.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@citation-js/core/lib-mjs/plugin-common/index.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _plugins__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../plugins */ "./node_modules/@citation-js/core/lib-mjs/plugins/index.js");
/* harmony import */ var _input___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./input/ */ "./node_modules/@citation-js/core/lib-mjs/plugin-common/input/index.js");
/* harmony import */ var _output___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./output/ */ "./node_modules/@citation-js/core/lib-mjs/plugin-common/output/index.js");



_plugins__WEBPACK_IMPORTED_MODULE_0__.add(_input___WEBPACK_IMPORTED_MODULE_1__.ref, {
  input: _input___WEBPACK_IMPORTED_MODULE_1__.formats,
  output: _output___WEBPACK_IMPORTED_MODULE_2__["default"]
});

/***/ }),

/***/ "./node_modules/@citation-js/core/lib-mjs/plugin-common/input/empty.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@citation-js/core/lib-mjs/plugin-common/input/empty.js ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parse: function() { return /* binding */ parse; }
/* harmony export */ });
function parse() {
  return [];
}

/***/ }),

/***/ "./node_modules/@citation-js/core/lib-mjs/plugin-common/input/html.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@citation-js/core/lib-mjs/plugin-common/input/html.js ***!
  \****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parse: function() { return /* binding */ parse; }
/* harmony export */ });
function parse(input) {
  return input.value || input.textContent;
}

/***/ }),

/***/ "./node_modules/@citation-js/core/lib-mjs/plugin-common/input/index.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@citation-js/core/lib-mjs/plugin-common/input/index.js ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formats: function() { return /* binding */ formats; },
/* harmony export */   parsers: function() { return /* binding */ parsers; },
/* harmony export */   ref: function() { return /* binding */ ref; }
/* harmony export */ });
/* harmony import */ var _empty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./empty.js */ "./node_modules/@citation-js/core/lib-mjs/plugin-common/input/empty.js");
/* harmony import */ var _json_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./json.js */ "./node_modules/@citation-js/core/lib-mjs/plugin-common/input/json.js");
/* harmony import */ var _jquery_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./jquery.js */ "./node_modules/@citation-js/core/lib-mjs/plugin-common/input/jquery.js");
/* harmony import */ var _html_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./html.js */ "./node_modules/@citation-js/core/lib-mjs/plugin-common/input/html.js");




const ref = '@else';
const parsers = {
  empty: _empty_js__WEBPACK_IMPORTED_MODULE_0__,
  json: _json_js__WEBPACK_IMPORTED_MODULE_1__,
  jquery: _jquery_js__WEBPACK_IMPORTED_MODULE_2__,
  html: _html_js__WEBPACK_IMPORTED_MODULE_3__
};
const formats = {
  '@empty/text': {
    parse: _empty_js__WEBPACK_IMPORTED_MODULE_0__.parse,
    parseType: {
      dataType: 'String',
      predicate: input => input === ''
    }
  },
  '@empty/whitespace+text': {
    parse: _empty_js__WEBPACK_IMPORTED_MODULE_0__.parse,
    parseType: {
      dataType: 'String',
      predicate: /^\s+$/
    }
  },
  '@empty': {
    parse: _empty_js__WEBPACK_IMPORTED_MODULE_0__.parse,
    parseType: {
      dataType: 'Primitive',
      predicate: input => input == null
    }
  },
  '@else/json': {
    parse: _json_js__WEBPACK_IMPORTED_MODULE_1__.parse,
    parseType: {
      dataType: 'String',
      predicate: /^\s*(\{[\S\s]*\}|\[[\S\s]*\])\s*$/
    }
  },
  '@else/url': {
    parseType: {
      dataType: 'String',
      predicate: /^https?:\/\/(([\w-]+\.)*[\w-]+)(:\d+)?(\/[^?/]*)*(\?[^#]*)?(#.*)?$/i
    }
  },
  '@else/jquery': {
    parse: _jquery_js__WEBPACK_IMPORTED_MODULE_2__.parse,
    parseType: {
      dataType: 'ComplexObject',
      predicate(input) {
        return typeof jQuery !== 'undefined' && input instanceof jQuery;
      }
    }
  },
  '@else/html': {
    parse: _html_js__WEBPACK_IMPORTED_MODULE_3__.parse,
    parseType: {
      dataType: 'ComplexObject',
      predicate(input) {
        return typeof HTMLElement !== 'undefined' && input instanceof HTMLElement;
      }
    }
  }
};

/***/ }),

/***/ "./node_modules/@citation-js/core/lib-mjs/plugin-common/input/jquery.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@citation-js/core/lib-mjs/plugin-common/input/jquery.js ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parse: function() { return /* binding */ parse; }
/* harmony export */ });
function parse(input) {
  return input.val() || input.text() || input.html();
}

/***/ }),

/***/ "./node_modules/@citation-js/core/lib-mjs/plugin-common/input/json.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@citation-js/core/lib-mjs/plugin-common/input/json.js ***!
  \****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ parseJSON; },
/* harmony export */   parse: function() { return /* binding */ parseJSON; }
/* harmony export */ });
/* harmony import */ var _logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../logger.js */ "./node_modules/@citation-js/core/lib-mjs/logger.js");

const substituters = [[/((?:\[|:|,)\s*)'((?:\\'|[^'])*?[^\\])?'(?=\s*(?:\]|}|,))/g, '$1"$2"'], [/((?:(?:"|]|}|\/[gmiuys]|\.|(?:\d|\.|-)*\d)\s*,|{)\s*)(?:"([^":\n]+?)"|'([^":\n]+?)'|([^":\n]+?))(\s*):/g, '$1"$2$3$4"$5:']];
function parseJSON(str) {
  if (typeof str !== 'string') {
    return JSON.parse(str);
  }
  try {
    return JSON.parse(str);
  } catch (e) {
    _logger_js__WEBPACK_IMPORTED_MODULE_0__["default"].debug('[plugin-common]', 'Invalid JSON, switching to experimental parser');
    substituters.forEach(([regex, subst]) => {
      str = str.replace(regex, subst);
    });
    return JSON.parse(str);
  }
}


/***/ }),

/***/ "./node_modules/@citation-js/core/lib-mjs/plugin-common/output/index.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@citation-js/core/lib-mjs/plugin-common/output/index.js ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _json_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./json.js */ "./node_modules/@citation-js/core/lib-mjs/plugin-common/output/json.js");
/* harmony import */ var _label_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./label.js */ "./node_modules/@citation-js/core/lib-mjs/plugin-common/output/label.js");


/* harmony default export */ __webpack_exports__["default"] = (Object.assign({}, _json_js__WEBPACK_IMPORTED_MODULE_0__["default"], _label_js__WEBPACK_IMPORTED_MODULE_1__["default"]));

/***/ }),

/***/ "./node_modules/@citation-js/core/lib-mjs/plugin-common/output/json.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@citation-js/core/lib-mjs/plugin-common/output/json.js ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getJsonWrapper: function() { return /* binding */ getJsonWrapper; }
/* harmony export */ });
/* harmony import */ var _plugins_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../plugins/index.js */ "./node_modules/@citation-js/core/lib-mjs/plugins/index.js");
/* harmony import */ var _util_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/index.js */ "./node_modules/@citation-js/core/lib-mjs/util/index.js");
/* harmony import */ var _logger_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../logger.js */ "./node_modules/@citation-js/core/lib-mjs/logger.js");



function appendCommas(string, index, array) {
  return string + (index < array.length - 1 ? ',' : '');
}
function getJsonObject(src, dict) {
  const isArray = Array.isArray(src);
  let entries;
  if (isArray) {
    entries = src.map(entry => getJsonValue(entry, dict));
  } else {
    entries = Object.keys(src).filter(prop => JSON.stringify(src[prop])).map(prop => `"${prop}": ${getJsonValue(src[prop], dict)}`);
  }
  entries = entries.map(appendCommas).map(entry => dict.listItem.join(entry));
  entries = dict.list.join(entries.join(''));
  return isArray ? `[${entries}]` : `{${entries}}`;
}
function getJsonValue(src, dict) {
  if (typeof src === 'object' && src !== null) {
    if (src.length === 0) {
      return '[]';
    } else if (Object.keys(src).length === 0) {
      return '{}';
    } else {
      return getJsonObject(src, dict);
    }
  } else {
    return JSON.stringify(src);
  }
}
function getJson(src, dict) {
  let entries = src.map(entry => getJsonObject(entry, dict));
  entries = entries.map(appendCommas).map(entry => dict.entry.join(entry));
  entries = entries.join('');
  return dict.bibliographyContainer.join(`[${entries}]`);
}
function getJsonWrapper(src) {
  return getJson(src, _plugins_index_js__WEBPACK_IMPORTED_MODULE_0__.dict.get('html'));
}
/* harmony default export */ __webpack_exports__["default"] = ({
  data(data, {
    type,
    format = type || 'text',
    version = '1.0.2'
  } = {}) {
    if (version < '1.0.2') {
      data = _util_index_js__WEBPACK_IMPORTED_MODULE_1__.downgradeCsl(data);
    }
    if (format === 'object') {
      return _util_index_js__WEBPACK_IMPORTED_MODULE_1__.deepCopy(data);
    } else if (format === 'text') {
      return JSON.stringify(data, null, 2);
    } else {
      _logger_js__WEBPACK_IMPORTED_MODULE_2__["default"].warn('[core]', 'This feature (JSON output with special formatting) is unstable. See https://github.com/larsgw/citation.js/issues/144');
      return getJson(data, _plugins_index_js__WEBPACK_IMPORTED_MODULE_0__.dict.get(format));
    }
  },
  ndjson(data, {
    version = '1.0.2'
  } = {}) {
    if (version < '1.0.2') {
      data = _util_index_js__WEBPACK_IMPORTED_MODULE_1__.downgradeCsl(data);
    }
    return data.map(entry => JSON.stringify(entry)).join('\n');
  }
});

/***/ }),

/***/ "./node_modules/@citation-js/core/lib-mjs/plugin-common/output/label.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@citation-js/core/lib-mjs/plugin-common/output/label.js ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getLabel: function() { return /* binding */ getLabel; }
/* harmony export */ });
function getLabel(entry) {
  if ('citation-label' in entry) {
    return entry['citation-label'];
  }
  let res = '';
  if (entry.author) {
    res += entry.author[0].family || entry.author[0].literal;
  }
  if (entry.issued && entry.issued['date-parts'] && entry.issued['date-parts'][0]) {
    res += entry.issued['date-parts'][0][0];
  }
  if (entry['year-suffix']) {
    res += entry['year-suffix'];
  } else if (entry.title) {
    res += entry.title.replace(/<\/?.*?>/g, '').match(/^(?:(?:the|a|an)\s+)?(\S+)/i)[1];
  }
  return res;
}

/* harmony default export */ __webpack_exports__["default"] = ({
  label(data) {
    return data.reduce((object, entry) => {
      object[entry.id] = getLabel(entry);
      return object;
    }, {});
  }
});

/***/ }),

/***/ "./node_modules/@citation-js/core/lib-mjs/plugins/config.js":
/*!******************************************************************!*\
  !*** ./node_modules/@citation-js/core/lib-mjs/plugins/config.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   add: function() { return /* binding */ add; },
/* harmony export */   get: function() { return /* binding */ get; },
/* harmony export */   has: function() { return /* binding */ has; },
/* harmony export */   list: function() { return /* binding */ list; },
/* harmony export */   remove: function() { return /* binding */ remove; }
/* harmony export */ });
const configs = {};
function add(ref, config) {
  configs[ref] = config;
}
function get(ref) {
  return configs[ref];
}
function has(ref) {
  return Object.prototype.hasOwnProperty.call(configs, ref);
}
function remove(ref) {
  delete configs[ref];
}
function list() {
  return Object.keys(configs);
}

/***/ }),

/***/ "./node_modules/@citation-js/core/lib-mjs/plugins/dict.js":
/*!****************************************************************!*\
  !*** ./node_modules/@citation-js/core/lib-mjs/plugins/dict.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   add: function() { return /* binding */ add; },
/* harmony export */   get: function() { return /* binding */ get; },
/* harmony export */   has: function() { return /* binding */ has; },
/* harmony export */   htmlDict: function() { return /* binding */ htmlDict; },
/* harmony export */   list: function() { return /* binding */ list; },
/* harmony export */   register: function() { return /* binding */ register; },
/* harmony export */   remove: function() { return /* binding */ remove; },
/* harmony export */   textDict: function() { return /* binding */ textDict; }
/* harmony export */ });
/* harmony import */ var _util_register_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/register.js */ "./node_modules/@citation-js/core/lib-mjs/util/register.js");

function validate(name, dict) {
  if (typeof name !== 'string') {
    throw new TypeError(`Invalid dict name, expected string, got ${typeof name}`);
  } else if (typeof dict !== 'object') {
    throw new TypeError(`Invalid dict, expected object, got ${typeof dict}`);
  }
  for (const entryName in dict) {
    const entry = dict[entryName];
    if (!Array.isArray(entry) || entry.some(part => typeof part !== 'string')) {
      throw new TypeError(`Invalid dict entry "${entryName}", expected array of strings`);
    }
  }
}
const register = new _util_register_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  html: {
    bibliographyContainer: ['<div class="csl-bib-body">', '</div>'],
    entry: ['<div class="csl-entry">', '</div>'],
    list: ['<ul style="list-style-type:none">', '</ul>'],
    listItem: ['<li>', '</li>']
  },
  text: {
    bibliographyContainer: ['', '\n'],
    entry: ['', '\n'],
    list: ['\n', ''],
    listItem: ['\t', '\n']
  }
});
function add(name, dict) {
  validate(name, dict);
  register.set(name, dict);
}
function remove(name) {
  register.remove(name);
}
function has(name) {
  return register.has(name);
}
function list() {
  return register.list();
}
function get(name) {
  if (!register.has(name)) {
    throw new Error(`Dict "${name}" unavailable`);
  }
  return register.get(name);
}
const htmlDict = {
  wr_start: '<div class="csl-bib-body">',
  wr_end: '</div>',
  en_start: '<div class="csl-entry">',
  en_end: '</div>',
  ul_start: '<ul style="list-style-type:none">',
  ul_end: '</ul>',
  li_start: '<li>',
  li_end: '</li>'
};
const textDict = {
  wr_start: '',
  wr_end: '\n',
  en_start: '',
  en_end: '\n',
  ul_start: '\n',
  ul_end: '',
  li_start: '\t',
  li_end: '\n'
};

/***/ }),

/***/ "./node_modules/@citation-js/core/lib-mjs/plugins/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@citation-js/core/lib-mjs/plugins/index.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   add: function() { return /* binding */ add; },
/* harmony export */   config: function() { return /* reexport module object */ _config_js__WEBPACK_IMPORTED_MODULE_3__; },
/* harmony export */   dict: function() { return /* reexport module object */ _dict_js__WEBPACK_IMPORTED_MODULE_2__; },
/* harmony export */   has: function() { return /* binding */ has; },
/* harmony export */   input: function() { return /* reexport module object */ _input_index_js__WEBPACK_IMPORTED_MODULE_0__; },
/* harmony export */   list: function() { return /* binding */ list; },
/* harmony export */   output: function() { return /* reexport module object */ _output_js__WEBPACK_IMPORTED_MODULE_1__; },
/* harmony export */   remove: function() { return /* binding */ remove; }
/* harmony export */ });
/* harmony import */ var _input_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./input/index.js */ "./node_modules/@citation-js/core/lib-mjs/plugins/input/index.js");
/* harmony import */ var _output_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./output.js */ "./node_modules/@citation-js/core/lib-mjs/plugins/output.js");
/* harmony import */ var _dict_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dict.js */ "./node_modules/@citation-js/core/lib-mjs/plugins/dict.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config.js */ "./node_modules/@citation-js/core/lib-mjs/plugins/config.js");




const registers = {
  input: _input_index_js__WEBPACK_IMPORTED_MODULE_0__,
  output: _output_js__WEBPACK_IMPORTED_MODULE_1__,
  dict: _dict_js__WEBPACK_IMPORTED_MODULE_2__,
  config: _config_js__WEBPACK_IMPORTED_MODULE_3__
};
const indices = {};
function add(ref, plugins = {}) {
  const mainIndex = indices[ref] = {};
  for (const type in plugins) {
    if (type === 'config') {
      mainIndex.config = {
        [ref]: plugins.config
      };
      registers.config.add(ref, plugins.config);
      continue;
    }
    const typeIndex = mainIndex[type] = {};
    const typePlugins = plugins[type];
    for (const name in typePlugins) {
      const typePlugin = typePlugins[name];
      typeIndex[name] = true;
      registers[type].add(name, typePlugin);
    }
  }
}
function remove(ref) {
  const mainIndex = indices[ref];
  for (const type in mainIndex) {
    const typeIndex = mainIndex[type];
    for (const name in typeIndex) {
      registers[type].remove(name);
    }
  }
  delete indices[ref];
}
function has(ref) {
  return ref in indices;
}
function list() {
  return Object.keys(indices);
}


/***/ }),

/***/ "./node_modules/@citation-js/core/lib-mjs/plugins/input/chain.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@citation-js/core/lib-mjs/plugins/input/chain.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   chain: function() { return /* binding */ chain; },
/* harmony export */   chainAsync: function() { return /* binding */ chainAsync; },
/* harmony export */   chainLink: function() { return /* binding */ chainLink; },
/* harmony export */   chainLinkAsync: function() { return /* binding */ chainLinkAsync; }
/* harmony export */ });
/* harmony import */ var _util_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/index.js */ "./node_modules/@citation-js/core/lib-mjs/util/index.js");
/* harmony import */ var _logger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../logger.js */ "./node_modules/@citation-js/core/lib-mjs/logger.js");
/* harmony import */ var _register_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./register.js */ "./node_modules/@citation-js/core/lib-mjs/plugins/input/register.js");
/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./type.js */ "./node_modules/@citation-js/core/lib-mjs/plugins/input/type.js");
/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./data.js */ "./node_modules/@citation-js/core/lib-mjs/plugins/input/data.js");
/* harmony import */ var _graph_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./graph.js */ "./node_modules/@citation-js/core/lib-mjs/plugins/input/graph.js");






function prepareParseGraph(graph) {
  return graph.reduce((array, next) => {
    const last = array[array.length - 1];
    if (last && last.type === next.type) {
      last.count = last.count + 1 || 2;
    } else {
      array.push(next);
    }
    return array;
  }, []).map(element => (element.count > 1 ? element.count + 'x ' : '') + element.type).join(' -> ');
}
class ChainParser {
  constructor(input, options = {}) {
    this.options = Object.assign({
      generateGraph: true,
      forceType: (0,_type_js__WEBPACK_IMPORTED_MODULE_3__.type)(input),
      maxChainLength: 10,
      strict: true,
      target: '@csl/list+object'
    }, options);
    this.type = this.options.forceType;
    this.data = typeof input === 'object' ? (0,_util_index_js__WEBPACK_IMPORTED_MODULE_0__.deepCopy)(input) : input;
    this.graph = [{
      type: this.type,
      data: input
    }];
    this.iteration = 0;
  }
  iterate() {
    if (this.iteration !== 0) {
      const typeInfo = (0,_register_js__WEBPACK_IMPORTED_MODULE_2__.get)(this.type);
      if (typeInfo && typeInfo.outputs) {
        this.type = typeInfo.outputs;
      } else {
        this.type = (0,_type_js__WEBPACK_IMPORTED_MODULE_3__.type)(this.data);
      }
      this.graph.push({
        type: this.type
      });
    }
    if (this.error || this.type === this.options.target) {
      return false;
    } else if (this.iteration >= this.options.maxChainLength) {
      this.error = new RangeError(`Max. number of parsing iterations reached (${prepareParseGraph(this.graph)})`);
      return false;
    } else {
      this.iteration++;
      return true;
    }
  }
  end() {
    if (this.error) {
      _logger_js__WEBPACK_IMPORTED_MODULE_1__["default"].error('[core]', this.error.message);
      if (this.options.strict !== false) {
        throw this.error;
      } else {
        return [];
      }
    } else if (this.options.target === '@csl/list+object') {
      return (0,_util_index_js__WEBPACK_IMPORTED_MODULE_0__.upgradeCsl)(this.data).map(this.options.generateGraph ? entry => (0,_graph_js__WEBPACK_IMPORTED_MODULE_5__.applyGraph)(entry, this.graph) : _graph_js__WEBPACK_IMPORTED_MODULE_5__.removeGraph);
    } else {
      return this.data;
    }
  }
}
const chain = (...args) => {
  const chain = new ChainParser(...args);
  while (chain.iterate()) {
    try {
      chain.data = (0,_data_js__WEBPACK_IMPORTED_MODULE_4__.data)(chain.data, chain.type);
    } catch (e) {
      chain.error = e;
    }
  }
  return chain.end();
};
const chainLink = input => {
  const type = (0,_type_js__WEBPACK_IMPORTED_MODULE_3__.type)(input);
  const output = type.match(/array|object/) ? (0,_util_index_js__WEBPACK_IMPORTED_MODULE_0__.deepCopy)(input) : input;
  return (0,_data_js__WEBPACK_IMPORTED_MODULE_4__.data)(output, type);
};
const chainAsync = async (...args) => {
  const chain = new ChainParser(...args);
  while (chain.iterate()) {
    chain.data = await (0,_data_js__WEBPACK_IMPORTED_MODULE_4__.dataAsync)(chain.data, chain.type).catch(e => {
      chain.error = e;
    });
  }
  return chain.end();
};
const chainLinkAsync = async input => {
  const type = (0,_type_js__WEBPACK_IMPORTED_MODULE_3__.type)(input);
  const output = type.match(/array|object/) ? (0,_util_index_js__WEBPACK_IMPORTED_MODULE_0__.deepCopy)(input) : input;
  return (0,_data_js__WEBPACK_IMPORTED_MODULE_4__.dataAsync)(output, type);
};

/***/ }),

/***/ "./node_modules/@citation-js/core/lib-mjs/plugins/input/csl.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@citation-js/core/lib-mjs/plugins/input/csl.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clean: function() { return /* binding */ parseCsl; }
/* harmony export */ });
/* harmony import */ var _citation_js_name__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @citation-js/name */ "./node_modules/@citation-js/name/lib/index.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

const NAME = 1;
const NAME_LIST = 2;
const DATE = 3;
const TYPE = 4;
const entryTypes = {
  article: true,
  'article-journal': true,
  'article-magazine': true,
  'article-newspaper': true,
  bill: true,
  book: true,
  broadcast: true,
  chapter: true,
  classic: true,
  collection: true,
  dataset: true,
  document: true,
  entry: true,
  'entry-dictionary': true,
  'entry-encyclopedia': true,
  event: true,
  figure: true,
  graphic: true,
  hearing: true,
  interview: true,
  legal_case: true,
  legislation: true,
  manuscript: true,
  map: true,
  motion_picture: true,
  musical_score: true,
  pamphlet: true,
  'paper-conference': true,
  patent: true,
  performance: true,
  periodical: true,
  personal_communication: true,
  post: true,
  'post-weblog': true,
  regulation: true,
  report: true,
  review: true,
  'review-book': true,
  software: true,
  song: true,
  speech: true,
  standard: true,
  thesis: true,
  treaty: true,
  webpage: true,
  'journal-article': 'article-journal',
  'book-chapter': 'chapter',
  'posted-content': 'manuscript',
  'proceedings-article': 'paper-conference',
  dissertation: 'thesis'
};
const fieldTypes = {
  author: NAME_LIST,
  chair: NAME_LIST,
  'collection-editor': NAME_LIST,
  compiler: NAME_LIST,
  composer: NAME_LIST,
  'container-author': NAME_LIST,
  contributor: NAME_LIST,
  curator: NAME_LIST,
  director: NAME_LIST,
  editor: NAME_LIST,
  'editorial-director': NAME_LIST,
  'executive-producer': NAME_LIST,
  guest: NAME_LIST,
  host: NAME_LIST,
  interviewer: NAME_LIST,
  illustrator: NAME_LIST,
  narrator: NAME_LIST,
  organizer: NAME_LIST,
  'original-author': NAME_LIST,
  performer: NAME_LIST,
  producer: NAME_LIST,
  'reviewed-author': NAME_LIST,
  recipient: NAME_LIST,
  'script-writer': NAME_LIST,
  'series-creator': NAME_LIST,
  translator: NAME_LIST,
  accessed: DATE,
  'available-date': DATE,
  container: DATE,
  'event-date': DATE,
  issued: DATE,
  'original-date': DATE,
  submitted: DATE,
  type: TYPE,
  categories: 'object',
  custom: 'object',
  id: ['string', 'number'],
  language: 'string',
  journalAbbreviation: 'string',
  shortTitle: 'string',
  abstract: 'string',
  annote: 'string',
  archive: 'string',
  archive_collection: 'string',
  archive_location: 'string',
  'archive-place': 'string',
  authority: 'string',
  'call-number': 'string',
  'chapter-number': 'string',
  'citation-number': 'string',
  'citation-key': 'string',
  'citation-label': 'string',
  'collection-number': 'string',
  'collection-title': 'string',
  'container-title': 'string',
  'container-title-short': 'string',
  dimensions: 'string',
  division: 'string',
  DOI: 'string',
  edition: ['string', 'number'],
  event: 'string',
  'event-title': 'string',
  'event-place': 'string',
  'first-reference-note-number': 'string',
  genre: 'string',
  ISBN: 'string',
  ISSN: 'string',
  issue: ['string', 'number'],
  jurisdiction: 'string',
  keyword: 'string',
  locator: 'string',
  medium: 'string',
  note: 'string',
  number: ['string', 'number'],
  'number-of-pages': 'string',
  'number-of-volumes': ['string', 'number'],
  'original-publisher': 'string',
  'original-publisher-place': 'string',
  'original-title': 'string',
  page: 'string',
  'page-first': 'string',
  'part-number': ['string', 'number'],
  'part-title': 'string',
  PMCID: 'string',
  PMID: 'string',
  printing: 'string',
  publisher: 'string',
  'publisher-place': 'string',
  references: 'string',
  'reviewed-title': 'string',
  'reviewed-genre': 'string',
  scale: 'string',
  section: 'string',
  source: 'string',
  status: 'string',
  supplement: ['string', 'number'],
  title: 'string',
  'title-short': 'string',
  URL: 'string',
  version: 'string',
  volume: ['string', 'number'],
  'volume-title': 'string',
  'volume-title-short': 'string',
  'year-suffix': 'string'
};
function correctName(name, bestGuessConversions) {
  if (typeof name === 'object' && name !== null && (name.literal || name.given || name.family)) {
    if (name.ORCID || name.orcid || name._ORCID) {
      name = _objectSpread({
        _orcid: name.ORCID || name.orcid || name._ORCID
      }, name);
      delete name.ORCID;
      delete name.orcid;
      delete name._ORCID;
    }
    return name;
  } else if (!bestGuessConversions) {
    return undefined;
  } else if (typeof name === 'string') {
    return (0,_citation_js_name__WEBPACK_IMPORTED_MODULE_0__.parse)(name);
  }
}
function correctNameList(nameList, bestGuessConversions) {
  if (nameList instanceof Array) {
    const names = nameList.map(name => correctName(name, bestGuessConversions)).filter(Boolean);
    return names.length ? names : undefined;
  }
}
function correctDateParts(dateParts, bestGuessConversions) {
  if (dateParts.every(part => typeof part === 'number')) {
    return dateParts;
  } else if (!bestGuessConversions || dateParts.some(part => isNaN(parseInt(part)))) {
    return undefined;
  } else {
    return dateParts.map(part => parseInt(part));
  }
}
function correctDate(date, bestGuessConversions) {
  const dp = 'date-parts';
  if (typeof date !== 'object' || date === null) {
    return undefined;
  } else if (date[dp] instanceof Array && date[dp].every(part => part instanceof Array)) {
    const range = date[dp].map(dateParts => correctDateParts(dateParts, bestGuessConversions)).filter(Boolean);
    return range.length ? _objectSpread(_objectSpread({}, date), {}, {
      'date-parts': range
    }) : undefined;
  } else if (date instanceof Array && date.every(part => part[dp] instanceof Array)) {
    const range = date.map(dateParts => correctDateParts(dateParts[dp], bestGuessConversions)).filter(Boolean);
    return range.length ? {
      'date-parts': range
    } : undefined;
  } else if (date[dp] instanceof Array) {
    const dateParts = correctDateParts(date[dp], bestGuessConversions);
    return dateParts && {
      'date-parts': [dateParts]
    };
  } else if ('literal' in date || 'raw' in date) {
    return date;
  }
}
function correctType(type, bestGuessConversions) {
  type = correctField('language', type, bestGuessConversions);
  if (entryTypes[type] === true) {
    return type;
  }
  if (bestGuessConversions) {
    if (type in entryTypes) {
      return entryTypes[type];
    } else if (type.toLowerCase() !== type) {
      return correctType(type.toLowerCase(), bestGuessConversions);
    }
  }
  return undefined;
}
function correctField(fieldName, value, bestGuessConversions) {
  const fieldType = [].concat(fieldTypes[fieldName]);
  switch (fieldTypes[fieldName]) {
    case NAME:
      return correctName(value, bestGuessConversions);
    case NAME_LIST:
      return correctNameList(value, bestGuessConversions);
    case DATE:
      return correctDate(value, bestGuessConversions);
    case TYPE:
      return correctType(value, bestGuessConversions);
  }
  if (bestGuessConversions) {
    if (typeof value === 'string' && fieldType.includes('number') && !fieldType.includes('string') && !isNaN(+value)) {
      return parseFloat(value);
    } else if (typeof value === 'number' && fieldType.includes('string') && !fieldType.includes('number')) {
      return value.toString();
    } else if (Array.isArray(value) && value.length) {
      return correctField(fieldName, value[0], bestGuessConversions);
    }
  }
  if (fieldType.includes(typeof value)) {
    return value;
  }
}
function parseCsl(data, bestGuessConversions = true) {
  return data.map(function (entry) {
    const clean = {};
    for (const field in entry) {
      const correction = correctField(field, entry[field], bestGuessConversions);
      if (correction !== undefined) {
        clean[field] = correction;
      }
    }
    return clean;
  });
}


/***/ }),

/***/ "./node_modules/@citation-js/core/lib-mjs/plugins/input/data.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@citation-js/core/lib-mjs/plugins/input/data.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addDataParser: function() { return /* binding */ addDataParser; },
/* harmony export */   data: function() { return /* binding */ data; },
/* harmony export */   dataAsync: function() { return /* binding */ dataAsync; },
/* harmony export */   hasDataParser: function() { return /* binding */ hasDataParser; },
/* harmony export */   listDataParser: function() { return /* binding */ listDataParser; },
/* harmony export */   removeDataParser: function() { return /* binding */ removeDataParser; }
/* harmony export */ });
/* harmony import */ var _chain_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chain.js */ "./node_modules/@citation-js/core/lib-mjs/plugins/input/chain.js");

const parsers = {};
const asyncParsers = {};
const nativeParsers = {
  '@csl/object': input => [input],
  '@csl/list+object': input => input,
  '@else/list+object': input => input.map(_chain_js__WEBPACK_IMPORTED_MODULE_0__.chain).flat(),
  '@invalid': () => {
    throw new Error('This format is not supported or recognized');
  }
};
const nativeAsyncParsers = {
  '@else/list+object': async input => (await Promise.all(input.map(_chain_js__WEBPACK_IMPORTED_MODULE_0__.chainAsync))).flat()
};
function data(input, type) {
  if (typeof parsers[type] === 'function') {
    return parsers[type](input);
  } else if (typeof nativeParsers[type] === 'function') {
    return nativeParsers[type](input);
  } else {
    throw new TypeError(`No synchronous parser found for ${type}`);
  }
}
async function dataAsync(input, type) {
  if (typeof asyncParsers[type] === 'function') {
    return asyncParsers[type](input);
  } else if (typeof nativeAsyncParsers[type] === 'function') {
    return nativeAsyncParsers[type](input);
  } else if (hasDataParser(type, false)) {
    return data(input, type);
  } else {
    throw new TypeError(`No parser found for ${type}`);
  }
}
function addDataParser(format, {
  parser,
  async
}) {
  if (async) {
    asyncParsers[format] = parser;
  } else {
    parsers[format] = parser;
  }
}
function hasDataParser(type, async) {
  return async ? asyncParsers[type] || nativeAsyncParsers[type] : parsers[type] || nativeParsers[type];
}
function removeDataParser(type, async) {
  delete (async ? asyncParsers : parsers)[type];
}
function listDataParser(async) {
  return Object.keys(async ? asyncParsers : parsers);
}

/***/ }),

/***/ "./node_modules/@citation-js/core/lib-mjs/plugins/input/dataType.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@citation-js/core/lib-mjs/plugins/input/dataType.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dataTypeOf: function() { return /* binding */ dataTypeOf; },
/* harmony export */   typeOf: function() { return /* binding */ typeOf; }
/* harmony export */ });
function typeOf(thing) {
  switch (thing) {
    case undefined:
      return 'Undefined';
    case null:
      return 'Null';
    default:
      return thing.constructor.name;
  }
}
function dataTypeOf(thing) {
  switch (typeof thing) {
    case 'string':
      return 'String';
    case 'object':
      if (Array.isArray(thing)) {
        return 'Array';
      } else if (typeOf(thing) === 'Object') {
        return 'SimpleObject';
      } else if (typeOf(thing) !== 'Null') {
        return 'ComplexObject';
      }
    default:
      return 'Primitive';
  }
}

/***/ }),

/***/ "./node_modules/@citation-js/core/lib-mjs/plugins/input/graph.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@citation-js/core/lib-mjs/plugins/input/graph.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applyGraph: function() { return /* binding */ applyGraph; },
/* harmony export */   removeGraph: function() { return /* binding */ removeGraph; }
/* harmony export */ });
function applyGraph(entry, graph) {
  if (entry._graph) {
    const index = graph.findIndex(({
      type
    }) => type === '@else/list+object');
    if (index !== -1) {
      graph.splice(index + 1, 0, ...entry._graph.slice(0, -1));
    }
  }
  entry._graph = graph;
  return entry;
}
function removeGraph(entry) {
  delete entry._graph;
  return entry;
}

/***/ }),

/***/ "./node_modules/@citation-js/core/lib-mjs/plugins/input/index.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@citation-js/core/lib-mjs/plugins/input/index.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   add: function() { return /* reexport safe */ _register__WEBPACK_IMPORTED_MODULE_4__.add; },
/* harmony export */   addDataParser: function() { return /* reexport safe */ _data__WEBPACK_IMPORTED_MODULE_7__.addDataParser; },
/* harmony export */   addTypeParser: function() { return /* reexport safe */ _type__WEBPACK_IMPORTED_MODULE_6__.addTypeParser; },
/* harmony export */   chain: function() { return /* reexport safe */ _chain__WEBPACK_IMPORTED_MODULE_5__.chain; },
/* harmony export */   chainAsync: function() { return /* reexport safe */ _chain__WEBPACK_IMPORTED_MODULE_5__.chainAsync; },
/* harmony export */   chainLink: function() { return /* reexport safe */ _chain__WEBPACK_IMPORTED_MODULE_5__.chainLink; },
/* harmony export */   chainLinkAsync: function() { return /* reexport safe */ _chain__WEBPACK_IMPORTED_MODULE_5__.chainLinkAsync; },
/* harmony export */   data: function() { return /* reexport safe */ _data__WEBPACK_IMPORTED_MODULE_7__.data; },
/* harmony export */   dataAsync: function() { return /* reexport safe */ _data__WEBPACK_IMPORTED_MODULE_7__.dataAsync; },
/* harmony export */   get: function() { return /* reexport safe */ _register__WEBPACK_IMPORTED_MODULE_4__.get; },
/* harmony export */   has: function() { return /* reexport safe */ _register__WEBPACK_IMPORTED_MODULE_4__.has; },
/* harmony export */   hasDataParser: function() { return /* reexport safe */ _data__WEBPACK_IMPORTED_MODULE_7__.hasDataParser; },
/* harmony export */   hasTypeParser: function() { return /* reexport safe */ _type__WEBPACK_IMPORTED_MODULE_6__.hasTypeParser; },
/* harmony export */   list: function() { return /* reexport safe */ _register__WEBPACK_IMPORTED_MODULE_4__.list; },
/* harmony export */   listDataParser: function() { return /* reexport safe */ _data__WEBPACK_IMPORTED_MODULE_7__.listDataParser; },
/* harmony export */   listTypeParser: function() { return /* reexport safe */ _type__WEBPACK_IMPORTED_MODULE_6__.listTypeParser; },
/* harmony export */   remove: function() { return /* reexport safe */ _register__WEBPACK_IMPORTED_MODULE_4__.remove; },
/* harmony export */   removeDataParser: function() { return /* reexport safe */ _data__WEBPACK_IMPORTED_MODULE_7__.removeDataParser; },
/* harmony export */   removeTypeParser: function() { return /* reexport safe */ _type__WEBPACK_IMPORTED_MODULE_6__.removeTypeParser; },
/* harmony export */   treeTypeParser: function() { return /* reexport safe */ _type__WEBPACK_IMPORTED_MODULE_6__.treeTypeParser; },
/* harmony export */   type: function() { return /* reexport safe */ _type__WEBPACK_IMPORTED_MODULE_6__.type; },
/* harmony export */   typeMatcher: function() { return /* reexport safe */ _type__WEBPACK_IMPORTED_MODULE_6__.typeMatcher; },
/* harmony export */   util: function() { return /* binding */ util; }
/* harmony export */ });
/* harmony import */ var _dataType_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dataType.js */ "./node_modules/@citation-js/core/lib-mjs/plugins/input/dataType.js");
/* harmony import */ var _graph_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graph.js */ "./node_modules/@citation-js/core/lib-mjs/plugins/input/graph.js");
/* harmony import */ var _parser_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parser.js */ "./node_modules/@citation-js/core/lib-mjs/plugins/input/parser.js");
/* harmony import */ var _csl_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./csl.js */ "./node_modules/@citation-js/core/lib-mjs/plugins/input/csl.js");
/* harmony import */ var _register__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./register */ "./node_modules/@citation-js/core/lib-mjs/plugins/input/register.js");
/* harmony import */ var _chain__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./chain */ "./node_modules/@citation-js/core/lib-mjs/plugins/input/chain.js");
/* harmony import */ var _type__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./type */ "./node_modules/@citation-js/core/lib-mjs/plugins/input/type.js");
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./data */ "./node_modules/@citation-js/core/lib-mjs/plugins/input/data.js");




const util = Object.assign({}, _dataType_js__WEBPACK_IMPORTED_MODULE_0__, _graph_js__WEBPACK_IMPORTED_MODULE_1__, _parser_js__WEBPACK_IMPORTED_MODULE_2__, _csl_js__WEBPACK_IMPORTED_MODULE_3__);





/***/ }),

/***/ "./node_modules/@citation-js/core/lib-mjs/plugins/input/parser.js":
/*!************************************************************************!*\
  !*** ./node_modules/@citation-js/core/lib-mjs/plugins/input/parser.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DataParser: function() { return /* binding */ DataParser; },
/* harmony export */   FormatParser: function() { return /* binding */ FormatParser; },
/* harmony export */   TypeParser: function() { return /* binding */ TypeParser; }
/* harmony export */ });
/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./type.js */ "./node_modules/@citation-js/core/lib-mjs/plugins/input/type.js");
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

class TypeParser {
  constructor(data) {
    _defineProperty(this, "validDataTypes", ['String', 'Array', 'SimpleObject', 'ComplexObject', 'Primitive']);
    this.data = data;
  }
  validateDataType() {
    const dataType = this.data.dataType;
    if (dataType && !this.validDataTypes.includes(dataType)) {
      throw new RangeError(`dataType was ${dataType}; expected one of ${this.validDataTypes}`);
    }
  }
  validateParseType() {
    const predicate = this.data.predicate;
    if (predicate && !(predicate instanceof RegExp || typeof predicate === 'function')) {
      throw new TypeError(`predicate was ${typeof predicate}; expected RegExp or function`);
    }
  }
  validateTokenList() {
    const tokenList = this.data.tokenList;
    if (tokenList && typeof tokenList !== 'object') {
      throw new TypeError(`tokenList was ${typeof tokenList}; expected object or RegExp`);
    }
  }
  validatePropertyConstraint() {
    const propertyConstraint = this.data.propertyConstraint;
    if (propertyConstraint && typeof propertyConstraint !== 'object') {
      throw new TypeError(`propertyConstraint was ${typeof propertyConstraint}; expected array or object`);
    }
  }
  validateElementConstraint() {
    const elementConstraint = this.data.elementConstraint;
    if (elementConstraint && typeof elementConstraint !== 'string') {
      throw new TypeError(`elementConstraint was ${typeof elementConstraint}; expected string`);
    }
  }
  validateExtends() {
    const extend = this.data.extends;
    if (extend && typeof extend !== 'string') {
      throw new TypeError(`extends was ${typeof extend}; expected string`);
    }
  }
  validate() {
    if (this.data === null || typeof this.data !== 'object') {
      throw new TypeError(`typeParser was ${typeof this.data}; expected object`);
    }
    this.validateDataType();
    this.validateParseType();
    this.validateTokenList();
    this.validatePropertyConstraint();
    this.validateElementConstraint();
    this.validateExtends();
  }
  parseTokenList() {
    let tokenList = this.data.tokenList;
    if (!tokenList) {
      return [];
    } else if (tokenList instanceof RegExp) {
      tokenList = {
        token: tokenList
      };
    }
    const {
      token,
      split = /\s+/,
      trim = true,
      every = true
    } = tokenList;
    const trimInput = input => trim ? input.trim() : input;
    const testTokens = every ? 'every' : 'some';
    const predicate = input => trimInput(input).split(split)[testTokens](part => token.test(part));
    return [predicate];
  }
  parsePropertyConstraint() {
    const constraints = [].concat(this.data.propertyConstraint || []);
    return constraints.map(({
      props,
      match,
      value
    }) => {
      props = [].concat(props);
      switch (match) {
        case 'any':
        case 'some':
          return input => props.some(prop => prop in input && (!value || value(input[prop])));
        case 'none':
          return input => !props.some(prop => prop in input && (!value || value(input[prop])));
        case 'every':
        default:
          return input => props.every(prop => prop in input && (!value || value(input[prop])));
      }
    });
  }
  parseElementConstraint() {
    const constraint = this.data.elementConstraint;
    return !constraint ? [] : [input => input.every(entry => (0,_type_js__WEBPACK_IMPORTED_MODULE_0__.type)(entry) === constraint)];
  }
  parsePredicate() {
    if (this.data.predicate instanceof RegExp) {
      return [this.data.predicate.test.bind(this.data.predicate)];
    } else if (this.data.predicate) {
      return [this.data.predicate];
    } else {
      return [];
    }
  }
  getCombinedPredicate() {
    const predicates = [...this.parsePredicate(), ...this.parseTokenList(), ...this.parsePropertyConstraint(), ...this.parseElementConstraint()];
    if (predicates.length === 0) {
      return () => true;
    } else if (predicates.length === 1) {
      return predicates[0];
    } else {
      return input => predicates.every(predicate => predicate(input));
    }
  }
  getDataType() {
    if (this.data.dataType) {
      return this.data.dataType;
    } else if (this.data.predicate instanceof RegExp) {
      return 'String';
    } else if (this.data.tokenList) {
      return 'String';
    } else if (this.data.elementConstraint) {
      return 'Array';
    } else {
      return 'Primitive';
    }
  }
  get dataType() {
    return this.getDataType();
  }
  get predicate() {
    return this.getCombinedPredicate();
  }
  get extends() {
    return this.data.extends;
  }
}
class DataParser {
  constructor(parser, {
    async
  } = {}) {
    this.parser = parser;
    this.async = async;
  }
  validate() {
    const parser = this.parser;
    if (typeof parser !== 'function') {
      throw new TypeError(`parser was ${typeof parser}; expected function`);
    }
  }
}
class FormatParser {
  constructor(format, parsers = {}) {
    this.format = format;
    if (parsers.parseType) {
      this.typeParser = new TypeParser(parsers.parseType);
    }
    if (parsers.parse) {
      this.dataParser = new DataParser(parsers.parse, {
        async: false
      });
    }
    if (parsers.parseAsync) {
      this.asyncDataParser = new DataParser(parsers.parseAsync, {
        async: true
      });
    }
  }
  validateFormat() {
    const format = this.format;
    if (!_type_js__WEBPACK_IMPORTED_MODULE_0__.typeMatcher.test(format)) {
      throw new TypeError(`format name was "${format}"; didn't match expected pattern`);
    }
  }
  validate() {
    this.validateFormat();
    if (this.typeParser) {
      this.typeParser.validate();
    }
    if (this.dataParser) {
      this.dataParser.validate();
    }
    if (this.asyncDataParser) {
      this.asyncDataParser.validate();
    }
  }
}


/***/ }),

/***/ "./node_modules/@citation-js/core/lib-mjs/plugins/input/register.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@citation-js/core/lib-mjs/plugins/input/register.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   add: function() { return /* binding */ add; },
/* harmony export */   get: function() { return /* binding */ get; },
/* harmony export */   has: function() { return /* binding */ has; },
/* harmony export */   list: function() { return /* binding */ list; },
/* harmony export */   remove: function() { return /* binding */ remove; }
/* harmony export */ });
/* harmony import */ var _parser_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parser.js */ "./node_modules/@citation-js/core/lib-mjs/plugins/input/parser.js");
/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./type.js */ "./node_modules/@citation-js/core/lib-mjs/plugins/input/type.js");
/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data.js */ "./node_modules/@citation-js/core/lib-mjs/plugins/input/data.js");



const formats = {};
function add(format, parsers) {
  const formatParser = new _parser_js__WEBPACK_IMPORTED_MODULE_0__.FormatParser(format, parsers);
  formatParser.validate();
  const index = formats[format] || (formats[format] = {});
  if (formatParser.typeParser) {
    (0,_type_js__WEBPACK_IMPORTED_MODULE_1__.addTypeParser)(format, formatParser.typeParser);
    index.type = true;
  }
  if (formatParser.dataParser) {
    (0,_data_js__WEBPACK_IMPORTED_MODULE_2__.addDataParser)(format, formatParser.dataParser);
    index.data = true;
  }
  if (formatParser.asyncDataParser) {
    (0,_data_js__WEBPACK_IMPORTED_MODULE_2__.addDataParser)(format, formatParser.asyncDataParser);
    index.asyncData = true;
  }
  if (parsers.outputs) {
    index.outputs = parsers.outputs;
  }
}
function get(format) {
  return formats[format];
}
function remove(format) {
  const index = formats[format];
  if (!index) {
    return;
  }
  if (index.type) {
    (0,_type_js__WEBPACK_IMPORTED_MODULE_1__.removeTypeParser)(format);
  }
  if (index.data) {
    (0,_data_js__WEBPACK_IMPORTED_MODULE_2__.removeDataParser)(format);
  }
  if (index.asyncData) {
    (0,_data_js__WEBPACK_IMPORTED_MODULE_2__.removeDataParser)(format, true);
  }
  delete formats[format];
}
function has(format) {
  return format in formats;
}
function list() {
  return Object.keys(formats);
}

/***/ }),

/***/ "./node_modules/@citation-js/core/lib-mjs/plugins/input/type.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@citation-js/core/lib-mjs/plugins/input/type.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addTypeParser: function() { return /* binding */ addTypeParser; },
/* harmony export */   hasTypeParser: function() { return /* binding */ hasTypeParser; },
/* harmony export */   listTypeParser: function() { return /* binding */ listTypeParser; },
/* harmony export */   removeTypeParser: function() { return /* binding */ removeTypeParser; },
/* harmony export */   treeTypeParser: function() { return /* binding */ treeTypeParser; },
/* harmony export */   type: function() { return /* binding */ type; },
/* harmony export */   typeMatcher: function() { return /* binding */ typeMatcher; }
/* harmony export */ });
/* harmony import */ var _logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../logger.js */ "./node_modules/@citation-js/core/lib-mjs/logger.js");
/* harmony import */ var _dataType_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataType.js */ "./node_modules/@citation-js/core/lib-mjs/plugins/input/dataType.js");


const types = {};
const dataTypes = {};
const unregExts = {};
function parseNativeTypes(input, dataType) {
  switch (dataType) {
    case 'Array':
      if (input.length === 0 || input.every(entry => type(entry) === '@csl/object')) {
        return '@csl/list+object';
      } else {
        return '@else/list+object';
      }
    case 'SimpleObject':
    case 'ComplexObject':
      return '@csl/object';
    default:
      return '@invalid';
  }
}
function matchType(typeList = [], data) {
  for (const type of typeList) {
    if (types[type].predicate(data)) {
      return matchType(types[type].extensions, data) || type;
    }
  }
}
function type(input) {
  const dataType = (0,_dataType_js__WEBPACK_IMPORTED_MODULE_1__.dataTypeOf)(input);
  if (dataType === 'Array' && input.length === 0) {
    return parseNativeTypes(input, dataType);
  }
  const match = matchType(dataTypes[dataType], input);
  return match || parseNativeTypes(input, dataType);
}
function addTypeParser(format, {
  dataType,
  predicate,
  extends: extend
}) {
  let extensions = [];
  if (format in unregExts) {
    extensions = unregExts[format];
    delete unregExts[format];
    _logger_js__WEBPACK_IMPORTED_MODULE_0__["default"].debug('[core]', `Subclasses "${extensions}" finally registered to parent type "${format}"`);
  }
  const object = {
    predicate,
    extensions
  };
  types[format] = object;
  if (extend) {
    const parentTypeParser = types[extend];
    if (parentTypeParser) {
      parentTypeParser.extensions.push(format);
    } else {
      if (!unregExts[extend]) {
        unregExts[extend] = [];
      }
      unregExts[extend].push(format);
      _logger_js__WEBPACK_IMPORTED_MODULE_0__["default"].debug('[core]', `Subclass "${format}" is waiting on parent type "${extend}"`);
    }
  } else {
    const typeList = dataTypes[dataType] || (dataTypes[dataType] = []);
    typeList.push(format);
  }
}
function hasTypeParser(type) {
  return Object.prototype.hasOwnProperty.call(types, type);
}
function removeTypeParser(type) {
  delete types[type];
  const typeLists = [...Object.keys(dataTypes).map(key => dataTypes[key]), ...Object.keys(types).map(type => types[type].extensions).filter(list => list.length > 0)];
  typeLists.forEach(typeList => {
    const index = typeList.indexOf(type);
    if (index > -1) {
      typeList.splice(index, 1);
    }
  });
}
function listTypeParser() {
  return Object.keys(types);
}
function treeTypeParser() {
  const attachNode = name => ({
    name,
    children: types[name].extensions.map(attachNode)
  });
  return {
    name: 'Type tree',
    children: Object.keys(dataTypes).map(name => ({
      name,
      children: dataTypes[name].map(attachNode)
    }))
  };
}
const typeMatcher = /^(?:@(.+?))(?:\/(?:(.+?)\+)?(?:(.+)))?$/;

/***/ }),

/***/ "./node_modules/@citation-js/core/lib-mjs/plugins/output.js":
/*!******************************************************************!*\
  !*** ./node_modules/@citation-js/core/lib-mjs/plugins/output.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   add: function() { return /* binding */ add; },
/* harmony export */   format: function() { return /* binding */ format; },
/* harmony export */   has: function() { return /* binding */ has; },
/* harmony export */   list: function() { return /* binding */ list; },
/* harmony export */   register: function() { return /* binding */ register; },
/* harmony export */   remove: function() { return /* binding */ remove; }
/* harmony export */ });
/* harmony import */ var _util_register_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/register.js */ "./node_modules/@citation-js/core/lib-mjs/util/register.js");

function validate(name, formatter) {
  if (typeof name !== 'string') {
    throw new TypeError(`Invalid output format name, expected string, got ${typeof name}`);
  } else if (typeof formatter !== 'function') {
    throw new TypeError(`Invalid formatter, expected function, got ${typeof formatter}`);
  }
}
const register = new _util_register_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
function add(name, formatter) {
  validate(name, formatter);
  register.set(name, formatter);
}
function remove(name) {
  register.remove(name);
}
function has(name) {
  return register.has(name);
}
function list() {
  return register.list();
}
function format(name, data, ...options) {
  if (!register.has(name)) {
    throw new Error(`Output format "${name}" unavailable`);
  }
  return register.get(name)(data, ...options);
}

/***/ }),

/***/ "./node_modules/@citation-js/core/lib-mjs/util/csl.js":
/*!************************************************************!*\
  !*** ./node_modules/@citation-js/core/lib-mjs/util/csl.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   downgradeCsl: function() { return /* binding */ downgradeCsl; },
/* harmony export */   upgradeCsl: function() { return /* binding */ upgradeCsl; }
/* harmony export */ });
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function upgradeCsl(item) {
  if (Array.isArray(item)) {
    return item.map(upgradeCsl);
  }
  item = _objectSpread({}, item);
  if ('event' in item) {
    item['event-title'] = item.event;
    delete item.event;
  }
  if (item.type === 'book' && 'version' in item) {
    item.type = 'software';
  }
  return item;
}
function downgradeCsl(item) {
  if (Array.isArray(item)) {
    return item.map(downgradeCsl);
  }
  item = _objectSpread({}, item);
  if ('event-title' in item) {
    item.event = item['event-title'];
    delete item['event-title'];
  }
  if (item.type === 'software') {
    item.type = 'book';
  }
  return item;
}

/***/ }),

/***/ "./node_modules/@citation-js/core/lib-mjs/util/deepCopy.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@citation-js/core/lib-mjs/util/deepCopy.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deepCopy: function() { return /* binding */ deepCopy; }
/* harmony export */ });
function deepCopy(value, seen = new Set()) {
  if (typeof value !== 'object' || value === null || value.constructor !== Object && value.constructor !== Array) {
    return value;
  }
  if (seen.has(value)) {
    throw new TypeError('Recursively copying circular structure');
  }
  seen.add(value);
  let copy;
  if (value.constructor === Array) {
    copy = value.map(value => deepCopy(value, seen));
  } else {
    const object = {};
    for (const key in value) {
      object[key] = deepCopy(value[key], seen);
    }
    copy = object;
  }
  seen.delete(value);
  return copy;
}
/* harmony default export */ __webpack_exports__["default"] = (deepCopy);

/***/ }),

/***/ "./node_modules/@citation-js/core/lib-mjs/util/fetchFile.js":
/*!******************************************************************!*\
  !*** ./node_modules/@citation-js/core/lib-mjs/util/fetchFile.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchFile: function() { return /* binding */ fetchFile; },
/* harmony export */   fetchFileAsync: function() { return /* binding */ fetchFileAsync; },
/* harmony export */   setUserAgent: function() { return /* binding */ setUserAgent; }
/* harmony export */ });
/* harmony import */ var sync_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sync-fetch */ "./node_modules/sync-fetch/browser.js");
/* harmony import */ var sync_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sync_fetch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fetch_ponyfill__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fetch-ponyfill */ "./node_modules/fetch-ponyfill/build/fetch-browser.js");
/* harmony import */ var fetch_ponyfill__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fetch_ponyfill__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _logger_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../logger.js */ "./node_modules/@citation-js/core/lib-mjs/logger.js");
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../package.json */ "./node_modules/@citation-js/core/package.json");




const isBrowser = typeof location !== 'undefined' && typeof navigator !== 'undefined';
const {
  fetch: asyncFetch,
  Headers: asyncHeaders
} = typeof fetch === 'function' && isBrowser ? {
  fetch,
  Headers
} : fetch_ponyfill__WEBPACK_IMPORTED_MODULE_1___default()();
let userAgent = `Citation.js/${_package_json__WEBPACK_IMPORTED_MODULE_3__.version}`;
if (typeof process !== 'undefined' && process && process.release && process.release.name === 'node' && process.version) {
  userAgent += ` Node.js/${process.version}`;
}
function normaliseHeaders(headers) {
  const result = {};
  const entries = headers instanceof asyncHeaders || headers instanceof (sync_fetch__WEBPACK_IMPORTED_MODULE_0___default().Headers) ? Array.from(headers) : Object.entries(headers);
  for (const [name, header] of entries) {
    result[name.toLowerCase()] = header.toString();
  }
  return result;
}
function parseOpts(opts = {}) {
  const reqOpts = {
    headers: {
      accept: '*/*'
    },
    method: 'GET',
    checkContentType: opts.checkContentType
  };
  if (userAgent && !isBrowser) {
    reqOpts.headers['user-agent'] = userAgent;
  }
  if (opts.body) {
    reqOpts.method = 'POST';
    const isJson = typeof opts.body !== 'string';
    reqOpts.body = isJson ? JSON.stringify(opts.body) : opts.body;
    reqOpts.headers['content-type'] = isJson ? 'application/json' : 'text/plain';
  }
  if (opts.headers) {
    Object.assign(reqOpts.headers, normaliseHeaders(opts.headers));
  }
  return reqOpts;
}
function sameType(request, response) {
  if (!request.accept || request.accept === '*/*' || !response['content-type']) {
    return true;
  }
  const [a, b] = response['content-type'].split(';')[0].trim().split('/');
  return request.accept.split(',').map(type => type.split(';')[0].trim().split('/')).some(([c, d]) => (c === a || c === '*') && (d === b || d === '*'));
}
function checkResponse(response, opts) {
  const {
    status,
    headers
  } = response;
  let error;
  if (status >= 400) {
    error = new Error(`Server responded with status code ${status}`);
  } else if (opts.checkContentType === true && !sameType(opts.headers, normaliseHeaders(headers))) {
    error = new Error(`Server responded with content-type ${headers.get('content-type')}`);
  }
  if (error) {
    error.status = status;
    error.headers = headers;
    error.body = response.body;
    throw error;
  }
  return response;
}
function fetchFile(url, opts) {
  const reqOpts = parseOpts(opts);
  _logger_js__WEBPACK_IMPORTED_MODULE_2__["default"].http('[core]', reqOpts.method, url, reqOpts);
  const response = checkResponse(sync_fetch__WEBPACK_IMPORTED_MODULE_0___default()(url, reqOpts), reqOpts);
  return response.text();
}
async function fetchFileAsync(url, opts) {
  const reqOpts = parseOpts(opts);
  _logger_js__WEBPACK_IMPORTED_MODULE_2__["default"].http('[core]', reqOpts.method, url, reqOpts);
  return asyncFetch(url, reqOpts).then(response => checkResponse(response, reqOpts)).then(response => response.text());
}
function setUserAgent(newUserAgent) {
  userAgent = newUserAgent;
}
/* harmony default export */ __webpack_exports__["default"] = (fetchFile);

/***/ }),

/***/ "./node_modules/@citation-js/core/lib-mjs/util/fetchId.js":
/*!****************************************************************!*\
  !*** ./node_modules/@citation-js/core/lib-mjs/util/fetchId.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function fetchId(list, prefix) {
  let id;
  while (id === undefined || list.includes(id)) {
    id = `${prefix}${Math.random().toString().slice(2)}`;
  }
  return id;
}
/* harmony default export */ __webpack_exports__["default"] = (fetchId);

/***/ }),

/***/ "./node_modules/@citation-js/core/lib-mjs/util/grammar.js":
/*!****************************************************************!*\
  !*** ./node_modules/@citation-js/core/lib-mjs/util/grammar.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Grammar: function() { return /* binding */ Grammar; }
/* harmony export */ });
/* harmony import */ var _deepCopy_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./deepCopy.js */ "./node_modules/@citation-js/core/lib-mjs/util/deepCopy.js");

class Grammar {
  constructor(rules, state) {
    this.rules = rules;
    this.defaultState = state;
    this.mainRule = Object.keys(rules)[0];
    this.log = [];
  }
  parse(iterator, mainRule) {
    this.lexer = iterator;
    this.token = this.lexer.next();
    this.state = (0,_deepCopy_js__WEBPACK_IMPORTED_MODULE_0__.deepCopy)(this.defaultState);
    this.log = [];
    return this.consumeRule(mainRule || this.mainRule);
  }
  matchEndOfFile() {
    return !this.token;
  }
  matchToken(type) {
    return this.token && type === this.token.type;
  }
  consumeToken(type, optional) {
    const token = this.token;
    if (!type || token && token.type === type) {
      this.token = this.lexer.next();
      return token;
    } else if (optional) {
      return undefined;
    } else {
      const got = token ? `"${token.type}"` : 'EOF';
      const error = new SyntaxError(this.lexer.formatError(token, `expected "${type}", got ${got}`));
      error.message += ` (${this.log.join('->')})`;
      throw error;
    }
  }
  consumeRule(rule) {
    this.log.push(rule);
    const result = this.rules[rule].call(this);
    this.log.pop();
    return result;
  }
}


/***/ }),

/***/ "./node_modules/@citation-js/core/lib-mjs/util/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/@citation-js/core/lib-mjs/util/index.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Grammar: function() { return /* reexport safe */ _grammar_js__WEBPACK_IMPORTED_MODULE_6__.Grammar; },
/* harmony export */   Register: function() { return /* reexport safe */ _register_js__WEBPACK_IMPORTED_MODULE_5__["default"]; },
/* harmony export */   TokenStack: function() { return /* reexport safe */ _stack_js__WEBPACK_IMPORTED_MODULE_4__["default"]; },
/* harmony export */   Translator: function() { return /* reexport safe */ _translator_js__WEBPACK_IMPORTED_MODULE_7__.Translator; },
/* harmony export */   deepCopy: function() { return /* reexport safe */ _deepCopy_js__WEBPACK_IMPORTED_MODULE_1__["default"]; },
/* harmony export */   downgradeCsl: function() { return /* reexport safe */ _csl_js__WEBPACK_IMPORTED_MODULE_0__.downgradeCsl; },
/* harmony export */   fetchFile: function() { return /* reexport safe */ _fetchFile_js__WEBPACK_IMPORTED_MODULE_2__.fetchFile; },
/* harmony export */   fetchFileAsync: function() { return /* reexport safe */ _fetchFile_js__WEBPACK_IMPORTED_MODULE_2__.fetchFileAsync; },
/* harmony export */   fetchId: function() { return /* reexport safe */ _fetchId_js__WEBPACK_IMPORTED_MODULE_3__["default"]; },
/* harmony export */   setUserAgent: function() { return /* reexport safe */ _fetchFile_js__WEBPACK_IMPORTED_MODULE_2__.setUserAgent; },
/* harmony export */   upgradeCsl: function() { return /* reexport safe */ _csl_js__WEBPACK_IMPORTED_MODULE_0__.upgradeCsl; }
/* harmony export */ });
/* harmony import */ var _csl_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./csl.js */ "./node_modules/@citation-js/core/lib-mjs/util/csl.js");
/* harmony import */ var _deepCopy_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./deepCopy.js */ "./node_modules/@citation-js/core/lib-mjs/util/deepCopy.js");
/* harmony import */ var _fetchFile_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fetchFile.js */ "./node_modules/@citation-js/core/lib-mjs/util/fetchFile.js");
/* harmony import */ var _fetchId_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fetchId.js */ "./node_modules/@citation-js/core/lib-mjs/util/fetchId.js");
/* harmony import */ var _stack_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./stack.js */ "./node_modules/@citation-js/core/lib-mjs/util/stack.js");
/* harmony import */ var _register_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./register.js */ "./node_modules/@citation-js/core/lib-mjs/util/register.js");
/* harmony import */ var _grammar_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./grammar.js */ "./node_modules/@citation-js/core/lib-mjs/util/grammar.js");
/* harmony import */ var _translator_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./translator.js */ "./node_modules/@citation-js/core/lib-mjs/util/translator.js");










/***/ }),

/***/ "./node_modules/@citation-js/core/lib-mjs/util/register.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@citation-js/core/lib-mjs/util/register.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Register {
  constructor(data = {}) {
    this.data = data;
  }
  set(key, value) {
    this.data[key] = value;
    return this;
  }
  add(...args) {
    return this.set(...args);
  }
  delete(key) {
    delete this.data[key];
    return this;
  }
  remove(...args) {
    return this.delete(...args);
  }
  get(key) {
    return this.data[key];
  }
  has(key) {
    return Object.prototype.hasOwnProperty.call(this.data, key);
  }
  list() {
    return Object.keys(this.data);
  }
}
/* harmony default export */ __webpack_exports__["default"] = (Register);

/***/ }),

/***/ "./node_modules/@citation-js/core/lib-mjs/util/stack.js":
/*!**************************************************************!*\
  !*** ./node_modules/@citation-js/core/lib-mjs/util/stack.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class TokenStack {
  constructor(array) {
    this.stack = array;
    this.index = 0;
    this.current = this.stack[this.index];
  }
  static getPatternText(pattern) {
    return `"${pattern instanceof RegExp ? pattern.source : pattern}"`;
  }
  static getMatchCallback(pattern) {
    if (Array.isArray(pattern)) {
      const matches = pattern.map(TokenStack.getMatchCallback);
      return token => matches.some(matchCallback => matchCallback(token));
    } else if (pattern instanceof Function) {
      return pattern;
    } else if (pattern instanceof RegExp) {
      return token => pattern.test(token);
    } else {
      return token => pattern === token;
    }
  }
  tokensLeft() {
    return this.stack.length - this.index;
  }
  matches(pattern) {
    return TokenStack.getMatchCallback(pattern)(this.current, this.index, this.stack);
  }
  matchesSequence(sequence) {
    const part = this.stack.slice(this.index, this.index + sequence.length).join('');
    return typeof sequence === 'string' ? part === sequence : sequence.every((pattern, index) => TokenStack.getMatchCallback(pattern)(part[index]));
  }
  consumeToken(pattern = /^[\s\S]$/, {
    inverse = false,
    spaced = true
  } = {}) {
    if (spaced) {
      this.consumeWhitespace();
    }
    const token = this.current;
    const match = TokenStack.getMatchCallback(pattern)(token, this.index, this.stack);
    if (match) {
      this.current = this.stack[++this.index];
    } else {
      throw new SyntaxError(`Unexpected token at index ${this.index}: Expected ${TokenStack.getPatternText(pattern)}, got "${token}"`);
    }
    if (spaced) {
      this.consumeWhitespace();
    }
    return token;
  }
  consumeWhitespace(pattern = /^\s$/, {
    optional = true
  } = {}) {
    return this.consume(pattern, {
      min: +!optional
    });
  }
  consumeN(length) {
    if (this.tokensLeft() < length) {
      throw new SyntaxError('Not enough tokens left');
    }
    const start = this.index;
    while (length--) {
      this.current = this.stack[++this.index];
    }
    return this.stack.slice(start, this.index).join('');
  }
  consumeSequence(sequence) {
    if (this.matchesSequence(sequence)) {
      return this.consumeN(sequence.length);
    } else {
      throw new SyntaxError(`Expected "${sequence}", got "${this.consumeN(sequence.length)}"`);
    }
  }
  consume(pattern = /^[\s\S]$/, {
    min = 0,
    max = Infinity,
    inverse = false,
    tokenMap,
    tokenFilter
  } = {}) {
    const start = this.index;
    const match = TokenStack.getMatchCallback(pattern);
    while (match(this.current, this.index, this.stack) !== inverse) {
      this.current = this.stack[++this.index];
    }
    let consumed = this.stack.slice(start, this.index);
    if (consumed.length < min) {
      throw new SyntaxError(`Not enough ${TokenStack.getPatternText(pattern)}`);
    } else if (consumed.length > max) {
      throw new SyntaxError(`Too many ${TokenStack.getPatternText(pattern)}`);
    }
    if (tokenMap) {
      consumed = consumed.map(tokenMap);
    }
    if (tokenFilter) {
      consumed = consumed.filter(tokenFilter);
    }
    return consumed.join('');
  }
}
/* harmony default export */ __webpack_exports__["default"] = (TokenStack);

/***/ }),

/***/ "./node_modules/@citation-js/core/lib-mjs/util/translator.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@citation-js/core/lib-mjs/util/translator.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Translator: function() { return /* binding */ Translator; }
/* harmony export */ });
function createConditionEval(condition) {
  return function conditionEval(input) {
    if (typeof condition === 'boolean') {
      return condition;
    }
    return Object.keys(condition).every(prop => {
      const value = condition[prop];
      if (value === true) {
        return prop in input;
      } else if (value === false) {
        return !(prop in input);
      } else if (typeof value === 'function') {
        return value(input[prop]);
      } else if (Array.isArray(value)) {
        return value.includes(input[prop]);
      } else {
        return input[prop] === value;
      }
    });
  };
}
function parsePropStatement(prop, toSource) {
  let inputProp;
  let outputProp;
  let convert;
  let condition;
  if (typeof prop === 'string') {
    inputProp = outputProp = prop;
  } else if (prop) {
    inputProp = toSource ? prop.target : prop.source;
    outputProp = toSource ? prop.source : prop.target;
    if (prop.convert) {
      convert = toSource ? prop.convert.toSource : prop.convert.toTarget;
    }
    if (prop.when) {
      condition = toSource ? prop.when.target : prop.when.source;
      if (condition != null) {
        condition = createConditionEval(condition);
      }
    }
  } else {
    return null;
  }
  inputProp = [].concat(inputProp).filter(Boolean);
  outputProp = [].concat(outputProp).filter(Boolean);
  return {
    inputProp,
    outputProp,
    convert,
    condition
  };
}
function createConverter(props, toSource) {
  toSource = toSource === Translator.CONVERT_TO_SOURCE;
  props = props.map(prop => parsePropStatement(prop, toSource)).filter(Boolean);
  return function converter(input) {
    const output = {};
    for (const {
      inputProp,
      outputProp,
      convert,
      condition
    } of props) {
      if (outputProp.length === 0) {
        continue;
      } else if (condition && !condition(input)) {
        continue;
      } else if (inputProp.length !== 0 && inputProp.every(prop => !(prop in input))) {
        continue;
      }
      let outputData = inputProp.map(prop => input[prop]);
      if (convert) {
        try {
          const converted = convert.apply(input, outputData);
          outputData = outputProp.length === 1 ? [converted] : converted;
        } catch (cause) {
          throw new Error(`Failed to convert ${inputProp} to ${outputProp}`, {
            cause
          });
        }
      }
      outputProp.forEach((prop, index) => {
        const value = outputData[index];
        if (value !== undefined) {
          output[prop] = value;
        }
      });
    }
    return output;
  };
}
class Translator {
  constructor(props) {
    this.convertToSource = createConverter(props, Translator.CONVERT_TO_SOURCE);
    this.convertToTarget = createConverter(props, Translator.CONVERT_TO_TARGET);
  }
}
Translator.CONVERT_TO_SOURCE = Symbol('convert to source');
Translator.CONVERT_TO_TARGET = Symbol('convert to target');


/***/ }),

/***/ "./node_modules/@citation-js/core/package.json":
/*!*****************************************************!*\
  !*** ./node_modules/@citation-js/core/package.json ***!
  \*****************************************************/
/***/ (function(module) {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"name":"@citation-js/core","version":"0.7.14","description":"Convert different bibliographic metadata sources","keywords":["citation-js","citation","bibliography"],"author":"Lars Willighagen <lars.willighagen@gmail.com>","license":"MIT","main":"lib/index.js","module":"lib-mjs/index.js","directories":{"lib":"src","test":"__tests__"},"homepage":"https://citation.js.org/","repository":{"type":"git","url":"https://github.com/citation-js/citation-js.git","directory":"packages/core"},"bugs":{"url":"https://github.com/citation-js/citation-js/issues"},"engines":{"node":">=16.0.0"},"files":["lib","lib-mjs"],"scripts":{"test":"mocha -c -R dot test/*.spec.js"},"dependencies":{"@citation-js/date":"^0.5.0","@citation-js/name":"^0.4.2","fetch-ponyfill":"^7.1.0","sync-fetch":"^0.4.1"},"gitHead":"1e5f61227c10efc8387ef55816a8d8cf224471f5"}');

/***/ }),

/***/ "./node_modules/@citation-js/name/lib/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/@citation-js/name/lib/index.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "parse", ({
  enumerable: true,
  get: function get() {
    return _input.default;
  }
}));
Object.defineProperty(exports, "format", ({
  enumerable: true,
  get: function get() {
    return _output.default;
  }
}));

var _input = _interopRequireDefault(__webpack_require__(/*! ./input */ "./node_modules/@citation-js/name/lib/input.js"));

var _output = _interopRequireDefault(__webpack_require__(/*! ./output */ "./node_modules/@citation-js/name/lib/output.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./node_modules/@citation-js/name/lib/input.js":
/*!*****************************************************!*\
  !*** ./node_modules/@citation-js/name/lib/input.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = exports.parse = exports.types = exports.scope = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

const punctutationMatcher = string => string.replace(/$|( )|(?!^)(?=[A-Z])/g, '\\.?$1');

const getListMatcher = list => `(?:${list.join('|')})\\b`;

const getSplittingRegex = (matcher, flags) => new RegExp(`(?:^| )(${matcher}$)`, flags);

const titles = ['mr', 'mrs', 'ms', 'miss', 'dr', 'herr', 'monsieur', 'hr', 'frau', 'a v m', 'admiraal', 'admiral', 'air cdre', 'air commodore', 'air marshal', 'air vice marshal', 'alderman', 'alhaji', 'ambassador', 'baron', 'barones', 'brig', 'brig gen', 'brig general', 'brigadier', 'brigadier general', 'brother', 'canon', 'capt', 'captain', 'cardinal', 'cdr', 'chief', 'cik', 'cmdr', 'coach', 'col', 'col dr', 'colonel', 'commandant', 'commander', 'commissioner', 'commodore', 'comte', 'comtessa', 'congressman', 'conseiller', 'consul', 'conte', 'contessa', 'corporal', 'councillor', 'count', 'countess', 'crown prince', 'crown princess', 'dame', 'datin', 'dato', 'datuk', 'datuk seri', 'deacon', 'deaconess', 'dean', 'dhr', 'dipl ing', 'doctor', 'dott', 'dott sa', 'dr', 'dr ing', 'dra', 'drs', 'embajador', 'embajadora', 'en', 'encik', 'eng', 'eur ing', 'exma sra', 'exmo sr', 'f o', 'father', 'first lieutient', 'first officer', 'flt lieut', 'flying officer', 'fr', 'frau', 'fraulein', 'fru', 'gen', 'generaal', 'general', 'governor', 'graaf', 'gravin', 'group captain', 'grp capt', 'h e dr', 'h h', 'h m', 'h r h', 'hajah', 'haji', 'hajim', 'her highness', 'her majesty', 'herr', 'high chief', 'his highness', 'his holiness', 'his majesty', 'hon', 'hr', 'hra', 'ing', 'ir', 'jonkheer', 'judge', 'justice', 'khun ying', 'kolonel', 'lady', 'lcda', 'lic', 'lieut', 'lieut cdr', 'lieut col', 'lieut gen', 'lord', 'm', 'm l', 'm r', 'madame', 'mademoiselle', 'maj gen', 'major', 'master', 'mevrouw', 'miss', 'mlle', 'mme', 'monsieur', 'monsignor', 'mr', 'mrs', 'ms', 'mstr', 'nti', 'pastor', 'president', 'prince', 'princess', 'princesse', 'prinses', 'prof', 'prof dr', 'prof sir', 'professor', 'puan', 'puan sri', 'rabbi', 'rear admiral', 'rev', 'rev canon', 'rev dr', 'rev mother', 'reverend', 'rva', 'senator', 'sergeant', 'sheikh', 'sheikha', 'sig', 'sig na', 'sig ra', 'sir', 'sister', 'sqn ldr', 'sr', 'sr d', 'sra', 'srta', 'sultan', 'tan sri', 'tan sri dato', 'tengku', 'teuku', 'than puying', 'the hon dr', 'the hon justice', 'the hon miss', 'the hon mr', 'the hon mrs', 'the hon ms', 'the hon sir', 'the very rev', 'toh puan', 'tun', 'vice admiral', 'viscount', 'viscountess', 'wg cdr'];
const suffixes = ['I', 'II', 'III', 'IV', 'V', 'Senior', 'Junior', 'Jr', 'Sr', 'PhD', 'Ph\\.D', 'APR', 'RPh', 'PE', 'MD', 'MA', 'DMD', 'CME', 'BVM', 'CFRE', 'CLU', 'CPA', 'CSC', 'CSJ', 'DC', 'DD', 'DDS', 'DO', 'DVM', 'EdD', 'Esq', 'JD', 'LLD', 'OD', 'OSB', 'PC', 'Ret', 'RGS', 'RN', 'RNC', 'SHCJ', 'SJ', 'SNJM', 'SSMO', 'USA', 'USAF', 'USAFR', 'USAR', 'USCG', 'USMC', 'USMCR', 'USN', 'USNR'];
const particles = ['Vere', 'Von', 'Van', 'De', 'Del', 'Della', 'Di', 'Da', 'Pietro', 'Vanden', 'Du', 'St.', 'St', 'La', 'Lo', 'Ter', 'O', 'O\'', 'Mac', 'Fitz'];
const titleMatcher = getListMatcher(titles.map(punctutationMatcher));
const suffixMatcher = getListMatcher(suffixes.map(punctutationMatcher));
const particleMatcher = getListMatcher(particles);
const titleSplitter = new RegExp(`^((?:${titleMatcher} )*)(.*)$`, 'i');
const suffixSplitter = getSplittingRegex(`(?:${suffixMatcher}, )*(?:${suffixMatcher})`, 'i');
const particleSplitter = getSplittingRegex(`${/(?:[A-Z\xC0-\xD6\xD8-\xDE\u0100\u0102\u0104\u0106\u0108\u010A\u010C\u010E\u0110\u0112\u0114\u0116\u0118\u011A\u011C\u011E\u0120\u0122\u0124\u0126\u0128\u012A\u012C\u012E\u0130\u0132\u0134\u0136\u0139\u013B\u013D\u013F\u0141\u0143\u0145\u0147\u014A\u014C\u014E\u0150\u0152\u0154\u0156\u0158\u015A\u015C\u015E\u0160\u0162\u0164\u0166\u0168\u016A\u016C\u016E\u0170\u0172\u0174\u0176\u0178\u0179\u017B\u017D\u0181\u0182\u0184\u0186\u0187\u0189-\u018B\u018E-\u0191\u0193\u0194\u0196-\u0198\u019C\u019D\u019F\u01A0\u01A2\u01A4\u01A6\u01A7\u01A9\u01AC\u01AE\u01AF\u01B1-\u01B3\u01B5\u01B7\u01B8\u01BC\u01C4\u01C7\u01CA\u01CD\u01CF\u01D1\u01D3\u01D5\u01D7\u01D9\u01DB\u01DE\u01E0\u01E2\u01E4\u01E6\u01E8\u01EA\u01EC\u01EE\u01F1\u01F4\u01F6-\u01F8\u01FA\u01FC\u01FE\u0200\u0202\u0204\u0206\u0208\u020A\u020C\u020E\u0210\u0212\u0214\u0216\u0218\u021A\u021C\u021E\u0220\u0222\u0224\u0226\u0228\u022A\u022C\u022E\u0230\u0232\u023A\u023B\u023D\u023E\u0241\u0243-\u0246\u0248\u024A\u024C\u024E\u0370\u0372\u0376\u037F\u0386\u0388-\u038A\u038C\u038E\u038F\u0391-\u03A1\u03A3-\u03AB\u03CF\u03D2-\u03D4\u03D8\u03DA\u03DC\u03DE\u03E0\u03E2\u03E4\u03E6\u03E8\u03EA\u03EC\u03EE\u03F4\u03F7\u03F9\u03FA\u03FD-\u042F\u0460\u0462\u0464\u0466\u0468\u046A\u046C\u046E\u0470\u0472\u0474\u0476\u0478\u047A\u047C\u047E\u0480\u048A\u048C\u048E\u0490\u0492\u0494\u0496\u0498\u049A\u049C\u049E\u04A0\u04A2\u04A4\u04A6\u04A8\u04AA\u04AC\u04AE\u04B0\u04B2\u04B4\u04B6\u04B8\u04BA\u04BC\u04BE\u04C0\u04C1\u04C3\u04C5\u04C7\u04C9\u04CB\u04CD\u04D0\u04D2\u04D4\u04D6\u04D8\u04DA\u04DC\u04DE\u04E0\u04E2\u04E4\u04E6\u04E8\u04EA\u04EC\u04EE\u04F0\u04F2\u04F4\u04F6\u04F8\u04FA\u04FC\u04FE\u0500\u0502\u0504\u0506\u0508\u050A\u050C\u050E\u0510\u0512\u0514\u0516\u0518\u051A\u051C\u051E\u0520\u0522\u0524\u0526\u0528\u052A\u052C\u052E\u0531-\u0556\u10A0-\u10C5\u10C7\u10CD\u13A0-\u13F5\u1C90-\u1CBA\u1CBD-\u1CBF\u1E00\u1E02\u1E04\u1E06\u1E08\u1E0A\u1E0C\u1E0E\u1E10\u1E12\u1E14\u1E16\u1E18\u1E1A\u1E1C\u1E1E\u1E20\u1E22\u1E24\u1E26\u1E28\u1E2A\u1E2C\u1E2E\u1E30\u1E32\u1E34\u1E36\u1E38\u1E3A\u1E3C\u1E3E\u1E40\u1E42\u1E44\u1E46\u1E48\u1E4A\u1E4C\u1E4E\u1E50\u1E52\u1E54\u1E56\u1E58\u1E5A\u1E5C\u1E5E\u1E60\u1E62\u1E64\u1E66\u1E68\u1E6A\u1E6C\u1E6E\u1E70\u1E72\u1E74\u1E76\u1E78\u1E7A\u1E7C\u1E7E\u1E80\u1E82\u1E84\u1E86\u1E88\u1E8A\u1E8C\u1E8E\u1E90\u1E92\u1E94\u1E9E\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EB8\u1EBA\u1EBC\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1EC8\u1ECA\u1ECC\u1ECE\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EDA\u1EDC\u1EDE\u1EE0\u1EE2\u1EE4\u1EE6\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u1EF2\u1EF4\u1EF6\u1EF8\u1EFA\u1EFC\u1EFE\u1F08-\u1F0F\u1F18-\u1F1D\u1F28-\u1F2F\u1F38-\u1F3F\u1F48-\u1F4D\u1F59\u1F5B\u1F5D\u1F5F\u1F68-\u1F6F\u1FB8-\u1FBB\u1FC8-\u1FCB\u1FD8-\u1FDB\u1FE8-\u1FEC\u1FF8-\u1FFB\u2102\u2107\u210B-\u210D\u2110-\u2112\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u2130-\u2133\u213E\u213F\u2145\u2160-\u216F\u2183\u24B6-\u24CF\u2C00-\u2C2E\u2C60\u2C62-\u2C64\u2C67\u2C69\u2C6B\u2C6D-\u2C70\u2C72\u2C75\u2C7E-\u2C80\u2C82\u2C84\u2C86\u2C88\u2C8A\u2C8C\u2C8E\u2C90\u2C92\u2C94\u2C96\u2C98\u2C9A\u2C9C\u2C9E\u2CA0\u2CA2\u2CA4\u2CA6\u2CA8\u2CAA\u2CAC\u2CAE\u2CB0\u2CB2\u2CB4\u2CB6\u2CB8\u2CBA\u2CBC\u2CBE\u2CC0\u2CC2\u2CC4\u2CC6\u2CC8\u2CCA\u2CCC\u2CCE\u2CD0\u2CD2\u2CD4\u2CD6\u2CD8\u2CDA\u2CDC\u2CDE\u2CE0\u2CE2\u2CEB\u2CED\u2CF2\uA640\uA642\uA644\uA646\uA648\uA64A\uA64C\uA64E\uA650\uA652\uA654\uA656\uA658\uA65A\uA65C\uA65E\uA660\uA662\uA664\uA666\uA668\uA66A\uA66C\uA680\uA682\uA684\uA686\uA688\uA68A\uA68C\uA68E\uA690\uA692\uA694\uA696\uA698\uA69A\uA722\uA724\uA726\uA728\uA72A\uA72C\uA72E\uA732\uA734\uA736\uA738\uA73A\uA73C\uA73E\uA740\uA742\uA744\uA746\uA748\uA74A\uA74C\uA74E\uA750\uA752\uA754\uA756\uA758\uA75A\uA75C\uA75E\uA760\uA762\uA764\uA766\uA768\uA76A\uA76C\uA76E\uA779\uA77B\uA77D\uA77E\uA780\uA782\uA784\uA786\uA78B\uA78D\uA790\uA792\uA796\uA798\uA79A\uA79C\uA79E\uA7A0\uA7A2\uA7A4\uA7A6\uA7A8\uA7AA-\uA7AE\uA7B0-\uA7B4\uA7B6\uA7B8\uFF21-\uFF3A]|\uD801[\uDC00-\uDC27\uDCB0-\uDCD3]|\uD803[\uDC80-\uDCB2]|\uD806[\uDCA0-\uDCBF]|\uD81B[\uDE40-\uDE5F]|\uD835[\uDC00-\uDC19\uDC34-\uDC4D\uDC68-\uDC81\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB5\uDCD0-\uDCE9\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD38\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD6C-\uDD85\uDDA0-\uDDB9\uDDD4-\uDDED\uDE08-\uDE21\uDE3C-\uDE55\uDE70-\uDE89\uDEA8-\uDEC0\uDEE2-\uDEFA\uDF1C-\uDF34\uDF56-\uDF6E\uDF90-\uDFA8\uDFCA]|\uD83A[\uDD00-\uDD21]|\uD83C[\uDD30-\uDD49\uDD50-\uDD69\uDD70-\uDD89])/.source}.*`);
const endSplitter = getSplittingRegex(`(?:${/(?:[a-z\xAA\xB5\xBA\xDF-\xF6\xF8-\xFF\u0101\u0103\u0105\u0107\u0109\u010B\u010D\u010F\u0111\u0113\u0115\u0117\u0119\u011B\u011D\u011F\u0121\u0123\u0125\u0127\u0129\u012B\u012D\u012F\u0131\u0133\u0135\u0137\u0138\u013A\u013C\u013E\u0140\u0142\u0144\u0146\u0148\u0149\u014B\u014D\u014F\u0151\u0153\u0155\u0157\u0159\u015B\u015D\u015F\u0161\u0163\u0165\u0167\u0169\u016B\u016D\u016F\u0171\u0173\u0175\u0177\u017A\u017C\u017E-\u0180\u0183\u0185\u0188\u018C\u018D\u0192\u0195\u0199-\u019B\u019E\u01A1\u01A3\u01A5\u01A8\u01AA\u01AB\u01AD\u01B0\u01B4\u01B6\u01B9\u01BA\u01BD-\u01BF\u01C6\u01C9\u01CC\u01CE\u01D0\u01D2\u01D4\u01D6\u01D8\u01DA\u01DC\u01DD\u01DF\u01E1\u01E3\u01E5\u01E7\u01E9\u01EB\u01ED\u01EF\u01F0\u01F3\u01F5\u01F9\u01FB\u01FD\u01FF\u0201\u0203\u0205\u0207\u0209\u020B\u020D\u020F\u0211\u0213\u0215\u0217\u0219\u021B\u021D\u021F\u0221\u0223\u0225\u0227\u0229\u022B\u022D\u022F\u0231\u0233-\u0239\u023C\u023F\u0240\u0242\u0247\u0249\u024B\u024D\u024F-\u0293\u0295-\u02B8\u02C0\u02C1\u02E0-\u02E4\u0345\u0371\u0373\u0377\u037A-\u037D\u0390\u03AC-\u03CE\u03D0\u03D1\u03D5-\u03D7\u03D9\u03DB\u03DD\u03DF\u03E1\u03E3\u03E5\u03E7\u03E9\u03EB\u03ED\u03EF-\u03F3\u03F5\u03F8\u03FB\u03FC\u0430-\u045F\u0461\u0463\u0465\u0467\u0469\u046B\u046D\u046F\u0471\u0473\u0475\u0477\u0479\u047B\u047D\u047F\u0481\u048B\u048D\u048F\u0491\u0493\u0495\u0497\u0499\u049B\u049D\u049F\u04A1\u04A3\u04A5\u04A7\u04A9\u04AB\u04AD\u04AF\u04B1\u04B3\u04B5\u04B7\u04B9\u04BB\u04BD\u04BF\u04C2\u04C4\u04C6\u04C8\u04CA\u04CC\u04CE\u04CF\u04D1\u04D3\u04D5\u04D7\u04D9\u04DB\u04DD\u04DF\u04E1\u04E3\u04E5\u04E7\u04E9\u04EB\u04ED\u04EF\u04F1\u04F3\u04F5\u04F7\u04F9\u04FB\u04FD\u04FF\u0501\u0503\u0505\u0507\u0509\u050B\u050D\u050F\u0511\u0513\u0515\u0517\u0519\u051B\u051D\u051F\u0521\u0523\u0525\u0527\u0529\u052B\u052D\u052F\u0560-\u0588\u10D0-\u10FA\u10FD-\u10FF\u13F8-\u13FD\u1C80-\u1C88\u1D00-\u1DBF\u1E01\u1E03\u1E05\u1E07\u1E09\u1E0B\u1E0D\u1E0F\u1E11\u1E13\u1E15\u1E17\u1E19\u1E1B\u1E1D\u1E1F\u1E21\u1E23\u1E25\u1E27\u1E29\u1E2B\u1E2D\u1E2F\u1E31\u1E33\u1E35\u1E37\u1E39\u1E3B\u1E3D\u1E3F\u1E41\u1E43\u1E45\u1E47\u1E49\u1E4B\u1E4D\u1E4F\u1E51\u1E53\u1E55\u1E57\u1E59\u1E5B\u1E5D\u1E5F\u1E61\u1E63\u1E65\u1E67\u1E69\u1E6B\u1E6D\u1E6F\u1E71\u1E73\u1E75\u1E77\u1E79\u1E7B\u1E7D\u1E7F\u1E81\u1E83\u1E85\u1E87\u1E89\u1E8B\u1E8D\u1E8F\u1E91\u1E93\u1E95-\u1E9D\u1E9F\u1EA1\u1EA3\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u1EAF\u1EB1\u1EB3\u1EB5\u1EB7\u1EB9\u1EBB\u1EBD\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u1EC9\u1ECB\u1ECD\u1ECF\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u1EE5\u1EE7\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u1EF3\u1EF5\u1EF7\u1EF9\u1EFB\u1EFD\u1EFF-\u1F07\u1F10-\u1F15\u1F20-\u1F27\u1F30-\u1F37\u1F40-\u1F45\u1F50-\u1F57\u1F60-\u1F67\u1F70-\u1F7D\u1F80-\u1F87\u1F90-\u1F97\u1FA0-\u1FA7\u1FB0-\u1FB4\u1FB6\u1FB7\u1FBE\u1FC2-\u1FC4\u1FC6\u1FC7\u1FD0-\u1FD3\u1FD6\u1FD7\u1FE0-\u1FE7\u1FF2-\u1FF4\u1FF6\u1FF7\u2071\u207F\u2090-\u209C\u210A\u210E\u210F\u2113\u212F\u2134\u2139\u213C\u213D\u2146-\u2149\u214E\u2170-\u217F\u2184\u24D0-\u24E9\u2C30-\u2C5E\u2C61\u2C65\u2C66\u2C68\u2C6A\u2C6C\u2C71\u2C73\u2C74\u2C76-\u2C7D\u2C81\u2C83\u2C85\u2C87\u2C89\u2C8B\u2C8D\u2C8F\u2C91\u2C93\u2C95\u2C97\u2C99\u2C9B\u2C9D\u2C9F\u2CA1\u2CA3\u2CA5\u2CA7\u2CA9\u2CAB\u2CAD\u2CAF\u2CB1\u2CB3\u2CB5\u2CB7\u2CB9\u2CBB\u2CBD\u2CBF\u2CC1\u2CC3\u2CC5\u2CC7\u2CC9\u2CCB\u2CCD\u2CCF\u2CD1\u2CD3\u2CD5\u2CD7\u2CD9\u2CDB\u2CDD\u2CDF\u2CE1\u2CE3\u2CE4\u2CEC\u2CEE\u2CF3\u2D00-\u2D25\u2D27\u2D2D\uA641\uA643\uA645\uA647\uA649\uA64B\uA64D\uA64F\uA651\uA653\uA655\uA657\uA659\uA65B\uA65D\uA65F\uA661\uA663\uA665\uA667\uA669\uA66B\uA66D\uA681\uA683\uA685\uA687\uA689\uA68B\uA68D\uA68F\uA691\uA693\uA695\uA697\uA699\uA69B-\uA69D\uA723\uA725\uA727\uA729\uA72B\uA72D\uA72F-\uA731\uA733\uA735\uA737\uA739\uA73B\uA73D\uA73F\uA741\uA743\uA745\uA747\uA749\uA74B\uA74D\uA74F\uA751\uA753\uA755\uA757\uA759\uA75B\uA75D\uA75F\uA761\uA763\uA765\uA767\uA769\uA76B\uA76D\uA76F-\uA778\uA77A\uA77C\uA77F\uA781\uA783\uA785\uA787\uA78C\uA78E\uA791\uA793-\uA795\uA797\uA799\uA79B\uA79D\uA79F\uA7A1\uA7A3\uA7A5\uA7A7\uA7A9\uA7AF\uA7B5\uA7B7\uA7B9\uA7F8-\uA7FA\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABBF\uFB00-\uFB06\uFB13-\uFB17\uFF41-\uFF5A]|\uD801[\uDC28-\uDC4F\uDCD8-\uDCFB]|\uD803[\uDCC0-\uDCF2]|\uD806[\uDCC0-\uDCDF]|\uD81B[\uDE60-\uDE7F]|\uD835[\uDC1A-\uDC33\uDC4E-\uDC54\uDC56-\uDC67\uDC82-\uDC9B\uDCB6-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDCEA-\uDD03\uDD1E-\uDD37\uDD52-\uDD6B\uDD86-\uDD9F\uDDBA-\uDDD3\uDDEE-\uDE07\uDE22-\uDE3B\uDE56-\uDE6F\uDE8A-\uDEA5\uDEC2-\uDEDA\uDEDC-\uDEE1\uDEFC-\uDF14\uDF16-\uDF1B\uDF36-\uDF4E\uDF50-\uDF55\uDF70-\uDF88\uDF8A-\uDF8F\uDFAA-\uDFC2\uDFC4-\uDFC9\uDFCB]|\uD83A[\uDD22-\uDD43])/.source}.*|${particleMatcher}.*|\\S*)`);

const parseName = function parseName(name = '') {
  if (typeof name !== 'string') {
    name = name + '';
  }

  let start = '';
  let mid = '';
  let end = '';

  if (/[^.], /.test(name)) {
    const parts = name.split(', ');
    end = parts.shift();
    const suffixMatch = RegExp(suffixMatcher).exec(parts.join(', '));
    start = parts.splice(suffixMatch && suffixMatch.index !== 0 ? 0 : -1, 1)[0];
    mid = parts.join(', ');
  } else {
    const parts = name.split(suffixSplitter, 2);
    const main = parts.shift().split(endSplitter, 2);
    start = main[0];
    end = main[1];
    mid = parts.pop();
  }

  const _start$match = start.match(titleSplitter),
        _start$match2 = _slicedToArray(_start$match, 3),
        droppingParticle = _start$match2[1],
        given = _start$match2[2];

  const suffix = mid;

  const _end$split$reverse = end.split(particleSplitter, 2).reverse(),
        _end$split$reverse2 = _slicedToArray(_end$split$reverse, 2),
        family = _end$split$reverse2[0],
        nonDroppingParticle = _end$split$reverse2[1];

  if (!given && family) {
    return family.includes(' ') ? {
      literal: family
    } : {
      family
    };
  } else if (family) {
    const nameObject = {
      'dropping-particle': droppingParticle,
      given,
      suffix,
      'non-dropping-particle': nonDroppingParticle,
      family
    };
    Object.keys(nameObject).forEach(key => {
      if (!nameObject[key]) {
        delete nameObject[key];
      }
    });
    return nameObject;
  } else {
    return {
      literal: name
    };
  }
};

exports["default"] = exports.parse = parseName;
const scope = '@name';
exports.scope = scope;
const types = '@name';
exports.types = types;

/***/ }),

/***/ "./node_modules/@citation-js/name/lib/output.js":
/*!******************************************************!*\
  !*** ./node_modules/@citation-js/name/lib/output.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
const startParts = ['dropping-particle', 'given'];
const suffixParts = ['suffix'];
const endParts = ['non-dropping-particle', 'family'];

const getName = function getName(name, reversed = false) {
  const get = parts => parts.map(entry => name[entry] || '').filter(Boolean).join(' ');

  if (name.literal) {
    return name.literal;
  } else if (reversed) {
    const suffixPart = get(suffixParts) ? `, ${get(suffixParts)}` : '';
    const startPart = get(startParts) ? `, ${get(startParts)}` : '';
    return get(endParts) + suffixPart + startPart;
  } else {
    return `${get([...startParts, ...suffixParts, ...endParts])}`;
  }
};

var _default = getName;
exports["default"] = _default;

/***/ }),

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/buffer/index.js":
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js")
var ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js")
var customInspectSymbol =
  (typeof Symbol === 'function' && typeof Symbol['for'] === 'function') // eslint-disable-line dot-notation
    ? Symbol['for']('nodejs.util.inspect.custom') // eslint-disable-line dot-notation
    : null

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    var proto = { foo: function () { return 42 } }
    Object.setPrototypeOf(proto, Uint8Array.prototype)
    Object.setPrototypeOf(arr, proto)
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  Object.setPrototypeOf(buf, Buffer.prototype)
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayView(value)
  }

  if (value == null) {
    throw new TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof SharedArrayBuffer !== 'undefined' &&
      (isInstance(value, SharedArrayBuffer) ||
      (value && isInstance(value.buffer, SharedArrayBuffer)))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  var valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  var b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(
      value[Symbol.toPrimitive]('string'), encodingOrOffset, length
    )
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype)
Object.setPrototypeOf(Buffer, Uint8Array)

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpreted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayView (arrayView) {
  if (isInstance(arrayView, Uint8Array)) {
    var copy = new Uint8Array(arrayView)
    return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength)
  }
  return fromArrayLike(arrayView)
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(buf, Buffer.prototype)

  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      if (pos + buf.length > buffer.length) {
        Buffer.from(buf).copy(buffer, pos)
      } else {
        Uint8Array.prototype.set.call(
          buffer,
          buf,
          pos
        )
      }
    } else if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    } else {
      buf.copy(buffer, pos)
    }
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  var len = string.length
  var mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coercion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}
if (customInspectSymbol) {
  Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  var strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
      case 'latin1':
      case 'binary':
        return asciiWrite(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF)
      ? 4
      : (firstByte > 0xDF)
          ? 3
          : (firstByte > 0xBF)
              ? 2
              : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += hexSliceLookupTable[buf[i]]
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  // If bytes.length is odd, the last 8 bits must be ignored (same as node.js)
  for (var i = 0; i < bytes.length - 1; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(newBuf, Buffer.prototype)

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUintLE =
Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUintBE =
Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUint8 =
Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUint16LE =
Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUint16BE =
Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUint32LE =
Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUint32BE =
Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUintLE =
Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUintBE =
Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUint8 =
Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUint16LE =
Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUint16BE =
Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUint32LE =
Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUint32BE =
Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  } else if (typeof val === 'boolean') {
    val = Number(val)
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    var len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

// Create lookup table for `toString('hex')`
// See: https://github.com/feross/buffer/issues/219
var hexSliceLookupTable = (function () {
  var alphabet = '0123456789abcdef'
  var table = new Array(256)
  for (var i = 0; i < 16; ++i) {
    var i16 = i * 16
    for (var j = 0; j < 16; ++j) {
      table[i16 + j] = alphabet[i] + alphabet[j]
    }
  }
  return table
})()


/***/ }),

/***/ "./node_modules/fetch-ponyfill/build/fetch-browser.js":
/*!************************************************************!*\
  !*** ./node_modules/fetch-ponyfill/build/fetch-browser.js ***!
  \************************************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;(function (global) {
  'use strict';

  function fetchPonyfill(options) {
    var Promise = options && options.Promise || global.Promise;
    var XMLHttpRequest = options && options.XMLHttpRequest || global.XMLHttpRequest;

    return (function () {
      var globalThis = Object.create(global, {
        fetch: {
          value: undefined,
          writable: true
        }
      });

      (function (global, factory) {
         true ? factory(exports) :
        0;
      }(this, (function (exports) { 'use strict';

        var global =
          (typeof globalThis !== 'undefined' && globalThis) ||
          (typeof self !== 'undefined' && self) ||
          (typeof global !== 'undefined' && global);

        var support = {
          searchParams: 'URLSearchParams' in global,
          iterable: 'Symbol' in global && 'iterator' in Symbol,
          blob:
            'FileReader' in global &&
            'Blob' in global &&
            (function() {
              try {
                new Blob();
                return true
              } catch (e) {
                return false
              }
            })(),
          formData: 'FormData' in global,
          arrayBuffer: 'ArrayBuffer' in global
        };

        function isDataView(obj) {
          return obj && DataView.prototype.isPrototypeOf(obj)
        }

        if (support.arrayBuffer) {
          var viewClasses = [
            '[object Int8Array]',
            '[object Uint8Array]',
            '[object Uint8ClampedArray]',
            '[object Int16Array]',
            '[object Uint16Array]',
            '[object Int32Array]',
            '[object Uint32Array]',
            '[object Float32Array]',
            '[object Float64Array]'
          ];

          var isArrayBufferView =
            ArrayBuffer.isView ||
            function(obj) {
              return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
            };
        }

        function normalizeName(name) {
          if (typeof name !== 'string') {
            name = String(name);
          }
          if (/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(name) || name === '') {
            throw new TypeError('Invalid character in header field name')
          }
          return name.toLowerCase()
        }

        function normalizeValue(value) {
          if (typeof value !== 'string') {
            value = String(value);
          }
          return value
        }

        // Build a destructive iterator for the value list
        function iteratorFor(items) {
          var iterator = {
            next: function() {
              var value = items.shift();
              return {done: value === undefined, value: value}
            }
          };

          if (support.iterable) {
            iterator[Symbol.iterator] = function() {
              return iterator
            };
          }

          return iterator
        }

        function Headers(headers) {
          this.map = {};

          if (headers instanceof Headers) {
            headers.forEach(function(value, name) {
              this.append(name, value);
            }, this);
          } else if (Array.isArray(headers)) {
            headers.forEach(function(header) {
              this.append(header[0], header[1]);
            }, this);
          } else if (headers) {
            Object.getOwnPropertyNames(headers).forEach(function(name) {
              this.append(name, headers[name]);
            }, this);
          }
        }

        Headers.prototype.append = function(name, value) {
          name = normalizeName(name);
          value = normalizeValue(value);
          var oldValue = this.map[name];
          this.map[name] = oldValue ? oldValue + ', ' + value : value;
        };

        Headers.prototype['delete'] = function(name) {
          delete this.map[normalizeName(name)];
        };

        Headers.prototype.get = function(name) {
          name = normalizeName(name);
          return this.has(name) ? this.map[name] : null
        };

        Headers.prototype.has = function(name) {
          return this.map.hasOwnProperty(normalizeName(name))
        };

        Headers.prototype.set = function(name, value) {
          this.map[normalizeName(name)] = normalizeValue(value);
        };

        Headers.prototype.forEach = function(callback, thisArg) {
          for (var name in this.map) {
            if (this.map.hasOwnProperty(name)) {
              callback.call(thisArg, this.map[name], name, this);
            }
          }
        };

        Headers.prototype.keys = function() {
          var items = [];
          this.forEach(function(value, name) {
            items.push(name);
          });
          return iteratorFor(items)
        };

        Headers.prototype.values = function() {
          var items = [];
          this.forEach(function(value) {
            items.push(value);
          });
          return iteratorFor(items)
        };

        Headers.prototype.entries = function() {
          var items = [];
          this.forEach(function(value, name) {
            items.push([name, value]);
          });
          return iteratorFor(items)
        };

        if (support.iterable) {
          Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
        }

        function consumed(body) {
          if (body.bodyUsed) {
            return Promise.reject(new TypeError('Already read'))
          }
          body.bodyUsed = true;
        }

        function fileReaderReady(reader) {
          return new Promise(function(resolve, reject) {
            reader.onload = function() {
              resolve(reader.result);
            };
            reader.onerror = function() {
              reject(reader.error);
            };
          })
        }

        function readBlobAsArrayBuffer(blob) {
          var reader = new FileReader();
          var promise = fileReaderReady(reader);
          reader.readAsArrayBuffer(blob);
          return promise
        }

        function readBlobAsText(blob) {
          var reader = new FileReader();
          var promise = fileReaderReady(reader);
          reader.readAsText(blob);
          return promise
        }

        function readArrayBufferAsText(buf) {
          var view = new Uint8Array(buf);
          var chars = new Array(view.length);

          for (var i = 0; i < view.length; i++) {
            chars[i] = String.fromCharCode(view[i]);
          }
          return chars.join('')
        }

        function bufferClone(buf) {
          if (buf.slice) {
            return buf.slice(0)
          } else {
            var view = new Uint8Array(buf.byteLength);
            view.set(new Uint8Array(buf));
            return view.buffer
          }
        }

        function Body() {
          this.bodyUsed = false;

          this._initBody = function(body) {
            /*
              fetch-mock wraps the Response object in an ES6 Proxy to
              provide useful test harness features such as flush. However, on
              ES5 browsers without fetch or Proxy support pollyfills must be used;
              the proxy-pollyfill is unable to proxy an attribute unless it exists
              on the object before the Proxy is created. This change ensures
              Response.bodyUsed exists on the instance, while maintaining the
              semantic of setting Request.bodyUsed in the constructor before
              _initBody is called.
            */
            this.bodyUsed = this.bodyUsed;
            this._bodyInit = body;
            if (!body) {
              this._bodyText = '';
            } else if (typeof body === 'string') {
              this._bodyText = body;
            } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
              this._bodyBlob = body;
            } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
              this._bodyFormData = body;
            } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
              this._bodyText = body.toString();
            } else if (support.arrayBuffer && support.blob && isDataView(body)) {
              this._bodyArrayBuffer = bufferClone(body.buffer);
              // IE 10-11 can't handle a DataView body.
              this._bodyInit = new Blob([this._bodyArrayBuffer]);
            } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
              this._bodyArrayBuffer = bufferClone(body);
            } else {
              this._bodyText = body = Object.prototype.toString.call(body);
            }

            if (!this.headers.get('content-type')) {
              if (typeof body === 'string') {
                this.headers.set('content-type', 'text/plain;charset=UTF-8');
              } else if (this._bodyBlob && this._bodyBlob.type) {
                this.headers.set('content-type', this._bodyBlob.type);
              } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
              }
            }
          };

          if (support.blob) {
            this.blob = function() {
              var rejected = consumed(this);
              if (rejected) {
                return rejected
              }

              if (this._bodyBlob) {
                return Promise.resolve(this._bodyBlob)
              } else if (this._bodyArrayBuffer) {
                return Promise.resolve(new Blob([this._bodyArrayBuffer]))
              } else if (this._bodyFormData) {
                throw new Error('could not read FormData body as blob')
              } else {
                return Promise.resolve(new Blob([this._bodyText]))
              }
            };

            this.arrayBuffer = function() {
              if (this._bodyArrayBuffer) {
                var isConsumed = consumed(this);
                if (isConsumed) {
                  return isConsumed
                }
                if (ArrayBuffer.isView(this._bodyArrayBuffer)) {
                  return Promise.resolve(
                    this._bodyArrayBuffer.buffer.slice(
                      this._bodyArrayBuffer.byteOffset,
                      this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
                    )
                  )
                } else {
                  return Promise.resolve(this._bodyArrayBuffer)
                }
              } else {
                return this.blob().then(readBlobAsArrayBuffer)
              }
            };
          }

          this.text = function() {
            var rejected = consumed(this);
            if (rejected) {
              return rejected
            }

            if (this._bodyBlob) {
              return readBlobAsText(this._bodyBlob)
            } else if (this._bodyArrayBuffer) {
              return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
            } else if (this._bodyFormData) {
              throw new Error('could not read FormData body as text')
            } else {
              return Promise.resolve(this._bodyText)
            }
          };

          if (support.formData) {
            this.formData = function() {
              return this.text().then(decode)
            };
          }

          this.json = function() {
            return this.text().then(JSON.parse)
          };

          return this
        }

        // HTTP methods whose capitalization should be normalized
        var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

        function normalizeMethod(method) {
          var upcased = method.toUpperCase();
          return methods.indexOf(upcased) > -1 ? upcased : method
        }

        function Request(input, options) {
          if (!(this instanceof Request)) {
            throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.')
          }

          options = options || {};
          var body = options.body;

          if (input instanceof Request) {
            if (input.bodyUsed) {
              throw new TypeError('Already read')
            }
            this.url = input.url;
            this.credentials = input.credentials;
            if (!options.headers) {
              this.headers = new Headers(input.headers);
            }
            this.method = input.method;
            this.mode = input.mode;
            this.signal = input.signal;
            if (!body && input._bodyInit != null) {
              body = input._bodyInit;
              input.bodyUsed = true;
            }
          } else {
            this.url = String(input);
          }

          this.credentials = options.credentials || this.credentials || 'same-origin';
          if (options.headers || !this.headers) {
            this.headers = new Headers(options.headers);
          }
          this.method = normalizeMethod(options.method || this.method || 'GET');
          this.mode = options.mode || this.mode || null;
          this.signal = options.signal || this.signal;
          this.referrer = null;

          if ((this.method === 'GET' || this.method === 'HEAD') && body) {
            throw new TypeError('Body not allowed for GET or HEAD requests')
          }
          this._initBody(body);

          if (this.method === 'GET' || this.method === 'HEAD') {
            if (options.cache === 'no-store' || options.cache === 'no-cache') {
              // Search for a '_' parameter in the query string
              var reParamSearch = /([?&])_=[^&]*/;
              if (reParamSearch.test(this.url)) {
                // If it already exists then set the value with the current time
                this.url = this.url.replace(reParamSearch, '$1_=' + new Date().getTime());
              } else {
                // Otherwise add a new '_' parameter to the end with the current time
                var reQueryString = /\?/;
                this.url += (reQueryString.test(this.url) ? '&' : '?') + '_=' + new Date().getTime();
              }
            }
          }
        }

        Request.prototype.clone = function() {
          return new Request(this, {body: this._bodyInit})
        };

        function decode(body) {
          var form = new FormData();
          body
            .trim()
            .split('&')
            .forEach(function(bytes) {
              if (bytes) {
                var split = bytes.split('=');
                var name = split.shift().replace(/\+/g, ' ');
                var value = split.join('=').replace(/\+/g, ' ');
                form.append(decodeURIComponent(name), decodeURIComponent(value));
              }
            });
          return form
        }

        function parseHeaders(rawHeaders) {
          var headers = new Headers();
          // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
          // https://tools.ietf.org/html/rfc7230#section-3.2
          var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
          // Avoiding split via regex to work around a common IE11 bug with the core-js 3.6.0 regex polyfill
          // https://github.com/github/fetch/issues/748
          // https://github.com/zloirock/core-js/issues/751
          preProcessedHeaders
            .split('\r')
            .map(function(header) {
              return header.indexOf('\n') === 0 ? header.substr(1, header.length) : header
            })
            .forEach(function(line) {
              var parts = line.split(':');
              var key = parts.shift().trim();
              if (key) {
                var value = parts.join(':').trim();
                headers.append(key, value);
              }
            });
          return headers
        }

        Body.call(Request.prototype);

        function Response(bodyInit, options) {
          if (!(this instanceof Response)) {
            throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.')
          }
          if (!options) {
            options = {};
          }

          this.type = 'default';
          this.status = options.status === undefined ? 200 : options.status;
          this.ok = this.status >= 200 && this.status < 300;
          this.statusText = 'statusText' in options ? options.statusText : '';
          this.headers = new Headers(options.headers);
          this.url = options.url || '';
          this._initBody(bodyInit);
        }

        Body.call(Response.prototype);

        Response.prototype.clone = function() {
          return new Response(this._bodyInit, {
            status: this.status,
            statusText: this.statusText,
            headers: new Headers(this.headers),
            url: this.url
          })
        };

        Response.error = function() {
          var response = new Response(null, {status: 0, statusText: ''});
          response.type = 'error';
          return response
        };

        var redirectStatuses = [301, 302, 303, 307, 308];

        Response.redirect = function(url, status) {
          if (redirectStatuses.indexOf(status) === -1) {
            throw new RangeError('Invalid status code')
          }

          return new Response(null, {status: status, headers: {location: url}})
        };

        exports.DOMException = global.DOMException;
        try {
          new exports.DOMException();
        } catch (err) {
          exports.DOMException = function(message, name) {
            this.message = message;
            this.name = name;
            var error = Error(message);
            this.stack = error.stack;
          };
          exports.DOMException.prototype = Object.create(Error.prototype);
          exports.DOMException.prototype.constructor = exports.DOMException;
        }

        function fetch(input, init) {
          return new Promise(function(resolve, reject) {
            var request = new Request(input, init);

            if (request.signal && request.signal.aborted) {
              return reject(new exports.DOMException('Aborted', 'AbortError'))
            }

            var xhr = new XMLHttpRequest();

            function abortXhr() {
              xhr.abort();
            }

            xhr.onload = function() {
              var options = {
                status: xhr.status,
                statusText: xhr.statusText,
                headers: parseHeaders(xhr.getAllResponseHeaders() || '')
              };
              options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
              var body = 'response' in xhr ? xhr.response : xhr.responseText;
              setTimeout(function() {
                resolve(new Response(body, options));
              }, 0);
            };

            xhr.onerror = function() {
              setTimeout(function() {
                reject(new TypeError('Network request failed'));
              }, 0);
            };

            xhr.ontimeout = function() {
              setTimeout(function() {
                reject(new TypeError('Network request failed'));
              }, 0);
            };

            xhr.onabort = function() {
              setTimeout(function() {
                reject(new exports.DOMException('Aborted', 'AbortError'));
              }, 0);
            };

            function fixUrl(url) {
              try {
                return url === '' && global.location.href ? global.location.href : url
              } catch (e) {
                return url
              }
            }

            xhr.open(request.method, fixUrl(request.url), true);

            if (request.credentials === 'include') {
              xhr.withCredentials = true;
            } else if (request.credentials === 'omit') {
              xhr.withCredentials = false;
            }

            if ('responseType' in xhr) {
              if (support.blob) {
                xhr.responseType = 'blob';
              } else if (
                support.arrayBuffer &&
                request.headers.get('Content-Type') &&
                request.headers.get('Content-Type').indexOf('application/octet-stream') !== -1
              ) {
                xhr.responseType = 'arraybuffer';
              }
            }

            if (init && typeof init.headers === 'object' && !(init.headers instanceof Headers)) {
              Object.getOwnPropertyNames(init.headers).forEach(function(name) {
                xhr.setRequestHeader(name, normalizeValue(init.headers[name]));
              });
            } else {
              request.headers.forEach(function(value, name) {
                xhr.setRequestHeader(name, value);
              });
            }

            if (request.signal) {
              request.signal.addEventListener('abort', abortXhr);

              xhr.onreadystatechange = function() {
                // DONE (success or failure)
                if (xhr.readyState === 4) {
                  request.signal.removeEventListener('abort', abortXhr);
                }
              };
            }

            xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
          })
        }

        fetch.polyfill = true;

        if (!global.fetch) {
          global.fetch = fetch;
          global.Headers = Headers;
          global.Request = Request;
          global.Response = Response;
        }

        exports.Headers = Headers;
        exports.Request = Request;
        exports.Response = Response;
        exports.fetch = fetch;

        Object.defineProperty(exports, '__esModule', { value: true });

      })));


      return {
        fetch: globalThis.fetch,
        Headers: globalThis.Headers,
        Request: globalThis.Request,
        Response: globalThis.Response,
        DOMException: globalThis.DOMException
      };
    }());
  }

  if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return fetchPonyfill;
    }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : typeof __webpack_require__.g !== 'undefined' ? __webpack_require__.g : this));



/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports) {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/sync-fetch/browser.js":
/*!********************************************!*\
  !*** ./node_modules/sync-fetch/browser.js ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-env browser */

const { Buffer } = __webpack_require__(/*! buffer/ */ "./node_modules/buffer/index.js")

function syncFetch (...args) {
  const request = new syncFetch.Request(...args)

  const xhr = new XMLHttpRequest()
  xhr.withCredentials = request.credentials === 'include'
  xhr.timeout = request[INTERNALS].timeout

  // Request
  xhr.open(request.method, request.url, false)

  let useBinaryEncoding = false
  try {
    // Only allowed in Worker scope, not available in older browsers
    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType#Synchronous_XHR_restrictions
    xhr.responseType = 'arraybuffer'
  } catch (e) {
    // Not in Worker scope; instead, attempt this alternative method
    // https://web.archive.org/web/20071103070418/http://mgran.blogspot.com/2006/08/downloading-binary-streams-with.html
    xhr.overrideMimeType('text/plain; charset=x-user-defined')
    useBinaryEncoding = true
  }

  for (const header of request.headers) {
    xhr.setRequestHeader(...header)
  }

  xhr.send(request.body || null)

  // Response
  let headers = xhr.getAllResponseHeaders()
  headers = headers && headers.split('\r\n').filter(Boolean).map(header => header.split(': ', 2))

  let body = xhr.response
  if (useBinaryEncoding) {
    const buffer = Buffer.alloc(body.length)
    for (let i = 0; i < body.length; i++) {
      buffer[i] = body.charCodeAt(i) & 0xff
    }
    body = buffer
  }

  const response = new syncFetch.Response(body, {
    headers,
    status: xhr.status,
    statusText: xhr.statusText
  })

  response[INTERNALS].url = xhr.responseURL
  response[INTERNALS].redirected = xhr.responseURL !== request.url

  return response
}

const INTERNALS = Symbol('SyncFetch Internals')
const REQ_UNSUPPORTED = ['mode', 'cache', 'redirect', 'referrer', 'integrity']
const HTTP_STATUS = {
  100: 'Continue',
  101: 'Switching Protocols',
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'Non-Authoritative Information',
  204: 'No Content',
  205: 'Reset Content',
  206: 'Partial Content',
  300: 'Multiple Choices',
  301: 'Moved Permanently',
  302: 'Found',
  303: 'See Other',
  304: 'Not Modified',
  305: 'Use Proxy',
  307: 'Temporary Redirect',
  400: 'Bad Request',
  401: 'Unauthorized',
  402: 'Payment Required',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  407: 'Proxy Authentication Required',
  408: 'Request Timeout',
  409: 'Conflict',
  410: 'Gone',
  411: 'Length Required',
  412: 'Precondition Failed',
  413: 'Payload Too Large',
  414: 'URI Too Long',
  415: 'Unsupported Media Type',
  416: 'Range Not Satisfiable',
  417: 'Expectation Failed',
  426: 'Upgrade Required',
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
  505: 'HTTP Version Not Supported'
}

class SyncRequest {
  constructor (resource, init = {}) {
    for (const option of REQ_UNSUPPORTED) {
      if (option in init) {
        throw new TypeError(`option ${option} not supported`)
      }
    }

    if (init.credentials === 'same-origin') {
      throw new TypeError('option credentials with value \'same-origin\' not supported')
    }

    this[INTERNALS] = {
      method: init.method || 'GET',
      headers: new syncFetch.Headers(init.headers),
      body: init.body ? Buffer.from(init.body) : null,
      credentials: init.credentials || 'omit',

      // Non-spec
      timeout: init.timeout || 0
    }

    if (typeof resource === 'string') {
      this[INTERNALS].url = resource
    } else if (resource instanceof SyncRequest) {
      this[INTERNALS].url = resource.url
      if (!init.method) {
        this[INTERNALS].method = resource.method
      }
      if (!init.headers) {
        this[INTERNALS].headers = resource.headers
      }
      if (!init.body) {
        this[INTERNALS].body = resource[INTERNALS].body
      }
      if (!init.credentials) {
        this[INTERNALS].credentials = resource.credentials
      }
    } else {
      throw new TypeError('Request input should be a URL string or a Request object')
    }
  }

  get cache () {
    return 'default'
  }

  get credentials () {
    return this[INTERNALS].credentials
  }

  get destination () {
    return ''
  }

  get headers () {
    return this[INTERNALS].headers
  }

  get integrity () {
    return ''
  }

  get method () {
    return this[INTERNALS].method
  }

  get mode () {
    return 'cors'
  }

  get priority () {
    return 'auto'
  }

  get redirect () {
    return 'follow'
  }

  get referrer () {
    return 'about:client'
  }

  get referrerPolicy () {
    return ''
  }

  get url () {
    return this[INTERNALS].url
  }

  clone () {
    checkBody(this)
    return new SyncRequest(this.url, this[INTERNALS])
  }
}

class SyncResponse {
  constructor (body, init = {}) {
    this[INTERNALS] = {
      body: body ? Buffer.from(body) : null,
      bodyUsed: false,

      headers: new syncFetch.Headers(init.headers),
      status: init.status,
      statusText: init.statusText
    }
  }

  get headers () {
    return this[INTERNALS].headers
  }

  get ok () {
    const status = this[INTERNALS].status
    return status >= 200 && status < 300
  }

  get redirected () {
    return this[INTERNALS].redirected
  }

  get status () {
    return this[INTERNALS].status
  }

  get statusText () {
    return this[INTERNALS].statusText
  }

  get url () {
    return this[INTERNALS].url
  }

  clone () {
    return this.redirect(this[INTERNALS].url, this[INTERNALS].status)
  }

  redirect (url, status) {
    checkBody(this)

    const response = new SyncResponse(this[INTERNALS].body, {
      headers: this[INTERNALS].headers,
      status: status || this[INTERNALS].status,
      statusText: HTTP_STATUS[status] || this[INTERNALS].statusText
    })

    response[INTERNALS].url = url || this[INTERNALS].url
    response[INTERNALS].redirected = this[INTERNALS].redirected

    return response
  }
}

class Body {
  constructor (body) {
    this[INTERNALS] = {
      body: Buffer.from(body),
      bodyUsed: false
    }
  }

  get bodyUsed () {
    return this[INTERNALS].bodyUsed
  }

  static mixin (prototype) {
    for (const name of Object.getOwnPropertyNames(Body.prototype)) {
      if (name === 'constructor') { continue }
      const desc = Object.getOwnPropertyDescriptor(Body.prototype, name)
      Object.defineProperty(prototype, name, { ...desc, enumerable: true })
    }
  }

  arrayBuffer () {
    const buffer = consumeBody(this)
    return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength)
  }

  blob () {
    const type = this.headers && this.headers.get('content-type')
    return new Blob([consumeBody(this)], type && { type })
  }

  text () {
    return consumeBody(this).toString()
  }

  json () {
    try {
      return JSON.parse(consumeBody(this).toString())
    } catch (err) {
      throw new TypeError(`invalid json response body at ${this.url} reason: ${err.message}`, 'invalid-json')
    }
  }

  buffer () {
    return consumeBody(this).clone()
  }
}

function checkBody (body) {
  if (body.bodyUsed) {
    throw new TypeError(`body used already for: ${body.url}`)
  }
}

function consumeBody (body) {
  checkBody(body)
  body[INTERNALS].bodyUsed = true
  return body[INTERNALS].body || Buffer.alloc(0)
}

Body.mixin(SyncRequest.prototype)
Body.mixin(SyncResponse.prototype)

class Headers {
  constructor (headers) {
    if (headers instanceof syncFetch.Headers) {
      this[INTERNALS] = { ...headers[INTERNALS] }
    } else {
      this[INTERNALS] = {}

      if (Array.isArray(headers)) {
        for (const [name, value] of headers) {
          this.append(name, value)
        }
      } else if (typeof headers === 'object') {
        for (const name in headers) {
          this.set(name, headers[name])
        }
      }
    }
  }

  // modification
  append (name, value) {
    name = name.toLowerCase()
    if (!this[INTERNALS][name]) {
      this[INTERNALS][name] = []
    }
    this[INTERNALS][name].push(value)
  }

  delete (name) {
    delete this[INTERNALS][name.toLowerCase()]
  }

  set (name, value) {
    this[INTERNALS][name.toLowerCase()] = [value]
  }

  // access
  entries () {
    const pairs = []
    for (const name in this[INTERNALS]) {
      for (const value of this[INTERNALS][name]) {
        pairs.push([name, value])
      }
    }
    return pairs
  }

  get (name) {
    name = name.toLowerCase()
    return name in this[INTERNALS] ? this[INTERNALS][name].join(', ') : null
  }

  keys () {
    return Object.keys(this[INTERNALS])
  }

  has (name) {
    return name.toLowerCase() in this[INTERNALS]
  }

  values () {
    const values = []
    for (const name in this[INTERNALS]) {
      for (const value of this[INTERNALS][name]) {
        values.push(value)
      }
    }
    return values
  }

  * [Symbol.iterator] () {
    for (const name in this[INTERNALS]) {
      for (const value of this[INTERNALS][name]) {
        yield [name, value]
      }
    }
  }
}

syncFetch.Headers = Headers
syncFetch.Request = SyncRequest
syncFetch.Response = SyncResponse
module.exports = syncFetch


/***/ })

}]);
//# sourceMappingURL=citation-js-core-citation-js-formats-citation-js-bibtex.f2536806.js.85c6ce78.map