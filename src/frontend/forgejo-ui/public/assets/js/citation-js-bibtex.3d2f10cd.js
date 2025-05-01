(self["webpackChunkforgejo"] = self["webpackChunkforgejo"] || []).push([["citation-js-bibtex"],{

/***/ "./node_modules/@citation-js/date/lib/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/@citation-js/date/lib/index.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "format", ({
  enumerable: true,
  get: function get() {
    return _output.default;
  }
}));
Object.defineProperty(exports, "parse", ({
  enumerable: true,
  get: function get() {
    return _input.default;
  }
}));

var _input = _interopRequireDefault(__webpack_require__(/*! ./input */ "./node_modules/@citation-js/date/lib/input.js"));

var _output = _interopRequireDefault(__webpack_require__(/*! ./output */ "./node_modules/@citation-js/date/lib/output.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./node_modules/@citation-js/date/lib/input.js":
/*!*****************************************************!*\
  !*** ./node_modules/@citation-js/date/lib/input.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

const monthMap = {
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  may: 5,
  jun: 6,
  jul: 7,
  aug: 8,
  sep: 9,
  oct: 10,
  nov: 11,
  dec: 12
};
const dateRangeDelimiters = / (?:to|[-/]) | ?(?:--|[–—]) ?/;
const dateRangePattern = /^(\d{4}-\d{2}-\d{2})\/(\d{4}-\d{2}-\d{2})$/;

function getMonth(monthName) {
  return monthMap[monthName.toLowerCase().slice(0, 3)];
}

function parseEpoch(date) {
  const epoch = new Date(date);

  if (typeof date === 'number' && !isNaN(epoch.valueOf())) {
    return [epoch.getFullYear(), epoch.getMonth() + 1, epoch.getDate()];
  } else {
    return null;
  }
}

const parseIso8601 = function parseIso8601(date) {
  const pattern = /^(\d{4}|[-+]\d{6,})-(\d{2})(?:-(\d{2}))?/;

  if (typeof date !== 'string' || !pattern.test(date)) {
    return null;
  }

  const _date$match = date.match(pattern),
        _date$match2 = _slicedToArray(_date$match, 4),
        year = _date$match2[1],
        month = _date$match2[2],
        day = _date$match2[3];

  if (!+month) {
    return [year];
  } else if (!+day) {
    return [year, month];
  } else {
    return [year, month, day];
  }
};

const parseRfc2822 = function parseRfc2822(date) {
  const pattern = /^(?:[a-z]{3},\s*)?(\d{1,2}) ([a-z]{3}) (\d{4,})/i;

  if (typeof date !== 'string' || !pattern.test(date)) {
    return null;
  }

  let _date$match3 = date.match(pattern),
      _date$match4 = _slicedToArray(_date$match3, 4),
      day = _date$match4[1],
      month = _date$match4[2],
      year = _date$match4[3];

  month = getMonth(month);

  if (!month) {
    return null;
  }

  return [year, month, day];
};

function parseAmericanDay(date) {
  const pattern = /^(\d{1,2})\/(\d{1,2})\/(\d{2}(?:\d{2})?)/;

  if (typeof date !== 'string' || !pattern.test(date)) {
    return null;
  }

  const _date$match5 = date.match(pattern),
        _date$match6 = _slicedToArray(_date$match5, 4),
        month = _date$match6[1],
        day = _date$match6[2],
        year = _date$match6[3];

  const check = new Date(year, month, day);

  if (check.getMonth() === parseInt(month)) {
    return [year, month, day];
  } else {
    return null;
  }
}

function parseDay(date) {
  const pattern = /^(\d{1,2})[ .\-/](\d{1,2}|[a-z]{3,10})[ .\-/](-?\d+)/i;
  const reversePattern = /^(-?\d+)[ .\-/](\d{1,2}|[a-z]{3,10})[ .\-/](\d{1,2})/i;
  let year;
  let month;
  let day;

  if (typeof date !== 'string') {
    return null;
  } else if (pattern.test(date)) {
    var _date$match7 = date.match(pattern);

    var _date$match8 = _slicedToArray(_date$match7, 4);

    day = _date$match8[1];
    month = _date$match8[2];
    year = _date$match8[3];
  } else if (reversePattern.test(date)) {
    var _date$match9 = date.match(reversePattern);

    var _date$match10 = _slicedToArray(_date$match9, 4);

    year = _date$match10[1];
    month = _date$match10[2];
    day = _date$match10[3];
  } else {
    return null;
  }

  if (getMonth(month)) {
    month = getMonth(month);
  } else if (isNaN(month)) {
    return null;
  }

  return [year, month, day];
}

function parseMonth(date) {
  const pattern = /^([a-z]{3,10}|-?\d+)[^\w-]+([a-z]{3,10}|-?\d+)$/i;

  if (typeof date === 'string' && pattern.test(date)) {
    const values = date.match(pattern).slice(1, 3);
    let month;

    if (getMonth(values[1])) {
      month = getMonth(values.pop());
    } else if (getMonth(values[0])) {
      month = getMonth(values.shift());
    } else if (values.some(isNaN) || values.every(value => +value < 0)) {
      return null;
    } else if (+values[0] < 0) {
      month = values.pop();
    } else if (+values[0] > +values[1] && +values[1] > 0) {
      month = values.pop();
    } else {
      month = values.shift();
    }

    const year = values.pop();
    return [year, month];
  } else {
    return null;
  }
}

function parseYear(date) {
  if (typeof date !== 'string') {
    return null;
  }

  const adBc = date.match(/^(\d+) ?(a\.?d\.?|b\.?c\.?)$/i);

  if (adBc) {
    const _adBc$slice = adBc.slice(1),
          _adBc$slice2 = _slicedToArray(_adBc$slice, 2),
          date = _adBc$slice2[0],
          suffix = _adBc$slice2[1];

    return [date * (suffix.toLowerCase()[0] === 'a' ? 1 : -1)];
  } else if (/^-?\d+$/.test(date)) {
    return [date];
  } else {
    return null;
  }
}

function parseDateParts(value) {
  const dateParts = parseEpoch(value) || parseIso8601(value) || parseRfc2822(value) || parseAmericanDay(value) || parseDay(value) || parseMonth(value) || parseYear(value);
  return dateParts && dateParts.map(string => parseInt(string));
}

function splitDateRange(range) {
  if (dateRangePattern.test(range)) {
    return range.match(dateRangePattern).slice(1, 3);
  } else {
    return range.split(dateRangeDelimiters);
  }
}

function parseDate(rangeStart, rangeEnd) {
  const range = [];
  const rangeStartAsRange = typeof rangeStart === 'string' && splitDateRange(rangeStart);

  if (rangeEnd) {
    range.push(rangeStart, rangeEnd);
  } else if (rangeStartAsRange && rangeStartAsRange.length === 2) {
    range.push(...rangeStartAsRange);
  } else {
    range.push(rangeStart);
  }

  const dateParts = range.map(parseDateParts);

  if (dateParts.filter(Boolean).length === range.length) {
    return {
      'date-parts': dateParts
    };
  } else {
    return {
      raw: rangeEnd ? range.join('/') : rangeStart
    };
  }
}

var _default = parseDate;
exports["default"] = _default;

/***/ }),

/***/ "./node_modules/@citation-js/date/lib/output.js":
/*!******************************************************!*\
  !*** ./node_modules/@citation-js/date/lib/output.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

function padStart(str, len, chr) {
  if (str.length >= len) {
    return str;
  }

  while (str.length < len) {
    str = chr + str;
  }

  return str.slice(-len);
}

const getDate = function getDate(date, delimiter = '-') {
  if (!date['date-parts']) {
    return date.raw;
  }

  const dateParts = date['date-parts'][0].map(part => part.toString());

  switch (dateParts.length) {
    case 3:
      dateParts[2] = padStart(dateParts[2], 2, '0');

    case 2:
      dateParts[1] = padStart(dateParts[1], 2, '0');

    case 1:
      dateParts[0] = padStart(dateParts[0], 4, '0');
      break;
  }

  return dateParts.join(delimiter);
};

var _default = getDate;
exports["default"] = _default;

/***/ }),

/***/ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/config.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@citation-js/plugin-bibtex/lib-mjs/config.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mapping_biblatexTypes_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mapping/biblatexTypes.json */ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/mapping/biblatexTypes.json");
/* harmony import */ var _mapping_bibtexTypes_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mapping/bibtexTypes.json */ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/mapping/bibtexTypes.json");
/* harmony import */ var _input_constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./input/constants.js */ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/input/constants.js");



/* harmony default export */ __webpack_exports__["default"] = ({
  constants: _input_constants_js__WEBPACK_IMPORTED_MODULE_2__,
  types: {
    biblatex: _mapping_biblatexTypes_json__WEBPACK_IMPORTED_MODULE_0__,
    bibtex: _mapping_bibtexTypes_json__WEBPACK_IMPORTED_MODULE_1__
  },
  parse: {
    biblatex: true,
    strict: false,
    sentenceCase: 'never'
  },
  format: {
    useIdAsLabel: false,
    checkLabel: true,
    asciiOnly: true
  },
  biber: {
    annotationMarker: '+an',
    namedAnnotationMarker: ':'
  }
});

/***/ }),

/***/ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/@citation-js/plugin-bibtex/lib-mjs/index.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _citation_js_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @citation-js/core */ "./node_modules/@citation-js/core/lib-mjs/index.js");
/* harmony import */ var _input_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./input/index.js */ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/input/index.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config.js */ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/config.js");
/* harmony import */ var _output_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./output/index.js */ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/output/index.js");




_citation_js_core__WEBPACK_IMPORTED_MODULE_0__.plugins.add(_input_index_js__WEBPACK_IMPORTED_MODULE_1__.ref, {
  input: _input_index_js__WEBPACK_IMPORTED_MODULE_1__.formats,
  output: _output_index_js__WEBPACK_IMPORTED_MODULE_3__["default"],
  config: _config_js__WEBPACK_IMPORTED_MODULE_2__["default"]
});

/***/ }),

/***/ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/input/bibtxt.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@citation-js/plugin-bibtex/lib-mjs/input/bibtxt.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parse: function() { return /* binding */ parseBibTxt; },
/* harmony export */   text: function() { return /* binding */ parseBibTxt; },
/* harmony export */   textEntry: function() { return /* binding */ parseBibTxtEntry; }
/* harmony export */ });
const bibTxtRegex = {
  splitEntries: /\n\s*(?=\[)/g,
  parseEntry: /^\[(.+?)\]\s*(?:\n([\s\S]+))?$/,
  splitPairs: /((?=.)\s)*\n\s*/g,
  splitPair: /:(.*)/
};
const parseBibTxtEntry = entry => {
  const [, label, pairs] = entry.match(bibTxtRegex.parseEntry) || [];
  if (!label || !pairs) {
    return {};
  } else {
    const out = {
      type: 'book',
      label,
      properties: {}
    };
    pairs.trim().split(bibTxtRegex.splitPairs).filter(v => v).forEach(pair => {
      let [key, value] = pair.split(bibTxtRegex.splitPair);
      if (value) {
        key = key.trim();
        value = value.trim();
        if (key === 'type') {
          out.type = value;
        } else {
          out.properties[key] = value;
        }
      }
    });
    return out;
  }
};
const parseBibTxt = src => src.trim().split(bibTxtRegex.splitEntries).map(parseBibTxtEntry);


/***/ }),

/***/ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/input/constants.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@citation-js/plugin-bibtex/lib-mjs/input/constants.js ***!
  \****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   argumentCommands: function() { return /* binding */ argumentCommands; },
/* harmony export */   commands: function() { return /* binding */ commands; },
/* harmony export */   defaultStrings: function() { return /* binding */ defaultStrings; },
/* harmony export */   diacritics: function() { return /* binding */ diacritics; },
/* harmony export */   fieldTypes: function() { return /* binding */ fieldTypes; },
/* harmony export */   formatting: function() { return /* binding */ formatting; },
/* harmony export */   formattingCommands: function() { return /* binding */ formattingCommands; },
/* harmony export */   formattingEnvs: function() { return /* binding */ formattingEnvs; },
/* harmony export */   ligaturePattern: function() { return /* binding */ ligaturePattern; },
/* harmony export */   ligatures: function() { return /* binding */ ligatures; },
/* harmony export */   mathCommands: function() { return /* binding */ mathCommands; },
/* harmony export */   mathScriptFormatting: function() { return /* binding */ mathScriptFormatting; },
/* harmony export */   mathScripts: function() { return /* binding */ mathScripts; },
/* harmony export */   required: function() { return /* binding */ required; },
/* harmony export */   sentenceCaseLanguages: function() { return /* binding */ sentenceCaseLanguages; }
/* harmony export */ });
/* harmony import */ var _required_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./required.json */ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/input/required.json");
/* harmony import */ var _fieldTypes_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fieldTypes.json */ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/input/fieldTypes.json");
/* harmony import */ var _unicode_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unicode.json */ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/input/unicode.json");



const required = _required_json__WEBPACK_IMPORTED_MODULE_0__;
const fieldTypes = _fieldTypes_json__WEBPACK_IMPORTED_MODULE_1__;
const diacritics = _unicode_json__WEBPACK_IMPORTED_MODULE_2__.diacritics;
const commands = _unicode_json__WEBPACK_IMPORTED_MODULE_2__.commands;
const mathCommands = _unicode_json__WEBPACK_IMPORTED_MODULE_2__.mathCommands;
const defaultStrings = {
  jan: '01',
  feb: '02',
  mar: '03',
  apr: '04',
  may: '05',
  jun: '06',
  jul: '07',
  aug: '08',
  sep: '09',
  oct: '10',
  nov: '11',
  dec: '12',
  acmcs: 'ACM Computing Surveys',
  acta: 'Acta Informatica',
  cacm: 'Communications of the ACM',
  ibmjrd: 'IBM Journal of Research and Development',
  ibmsj: 'IBM Systems Journal',
  ieeese: 'IEEE Transactions on Software Engineering',
  ieeetc: 'IEEE Transactions on Computers',
  ieeetcad: 'IEEE Transactions on Computer-Aided Design of Integrated Circuits',
  ipl: 'Information Processing Letters',
  jacm: 'Journal of the ACM',
  jcss: 'Journal of Computer and System Sciences',
  scp: 'Science of Computer Programming',
  sicomp: 'SIAM Journal on Computing',
  tocs: 'ACM Transactions on Computer Systems',
  tods: 'ACM Transactions on Database Systems',
  tog: 'ACM Transactions on Graphics',
  toms: 'ACM Transactions on Mathematical Software',
  toois: 'ACM Transactions on Office Information Systems',
  toplas: 'ACM Transactions on Programming Languages and Systems',
  tcs: 'Theoretical Computer Science'
};
const formattingEnvs = {
  it: 'italics',
  itshape: 'italics',
  sl: 'italics',
  slshape: 'italics',
  em: 'italics',
  bf: 'bold',
  bfseries: 'bold',
  sc: 'smallcaps',
  scshape: 'smallcaps',
  rm: undefined,
  sf: undefined,
  tt: undefined
};
const formattingCommands = {
  textit: 'italics',
  textsl: 'italics',
  emph: 'italics',
  mkbibitalic: 'italics',
  mkbibemph: 'italics',
  textbf: 'bold',
  strong: 'bold',
  mkbibbold: 'bold',
  textsc: 'smallcaps',
  textsuperscript: 'superscript',
  textsubscript: 'subscript',
  enquote: 'quotes',
  mkbibquote: 'quotes',
  textmd: undefined,
  textrm: undefined,
  textsf: undefined,
  texttt: undefined,
  textup: undefined
};
const formatting = {
  italics: ['<i>', '</i>'],
  bold: ['<b>', '</b>'],
  superscript: ['<sup>', '</sup>'],
  subscript: ['<sub>', '</sub>'],
  smallcaps: ['<span style="font-variant:small-caps;">', '</span>'],
  nocase: ['<span class="nocase">', '</span>'],
  quotes: ['\u201C', '\u201D']
};
const argumentCommands = {
  ElsevierGlyph(glyph) {
    return String.fromCharCode(parseInt(glyph, 16));
  },
  href(url, text) {
    return url;
  },
  url(url) {
    return url;
  }
};
const ligaturePattern = /---?|''|``|~/g;
const ligatures = {
  '--': '\u2013',
  '---': '\u2014',
  '``': '\u201C',
  "''": '\u201D',
  '~': '\u00A0'
};
const mathScriptFormatting = {
  '^': 'superscript',
  sp: 'superscript',
  _: 'subscript',
  sb: 'subscript',
  mathrm: undefined
};
const mathScripts = {
  '^': {
    '0': '\u2070',
    '1': '\u00B9',
    '2': '\u00B2',
    '3': '\u00B3',
    '4': '\u2074',
    '5': '\u2075',
    '6': '\u2076',
    '7': '\u2077',
    '8': '\u2078',
    '9': '\u2079',
    '+': '\u207A',
    '-': '\u207B',
    '=': '\u207C',
    '(': '\u207D',
    ')': '\u207E',
    'i': '\u2071',
    'n': '\u207F'
  },
  '_': {
    '0': '\u2080',
    '1': '\u2081',
    '2': '\u2082',
    '3': '\u2083',
    '4': '\u2084',
    '5': '\u2085',
    '6': '\u2086',
    '7': '\u2087',
    '8': '\u2088',
    '9': '\u2089',
    '+': '\u208A',
    '-': '\u208B',
    '=': '\u208C',
    '(': '\u208D',
    ')': '\u208E',
    'a': '\u2090',
    'e': '\u2091',
    'o': '\u2092',
    'x': '\u2093',
    '\u0259': '\u2094',
    'h': '\u2095',
    'k': '\u2096',
    'l': '\u2097',
    'm': '\u2098',
    'n': '\u2099',
    's': '\u209A',
    'p': '\u209B',
    't': '\u209C'
  }
};
const sentenceCaseLanguages = ['american', 'british', 'canadian', 'english', 'australian', 'newzealand', 'usenglish', 'ukenglish', 'en', 'eng', 'en-au', 'en-bz', 'en-ca', 'en-cb', 'en-gb', 'en-ie', 'en-jm', 'en-nz', 'en-ph', 'en-tt', 'en-us', 'en-za', 'en-zw', 'anglais'];

/***/ }),

/***/ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/input/entries.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@citation-js/plugin-bibtex/lib-mjs/input/entries.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parse: function() { return /* binding */ parse; },
/* harmony export */   parseBibtex: function() { return /* binding */ parseBibtex; }
/* harmony export */ });
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config.js */ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/config.js");
/* harmony import */ var _mapping_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../mapping/index.js */ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/mapping/index.js");
/* harmony import */ var _value_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./value.js */ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/input/value.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants.js */ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/input/constants.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }




function validate(entries, requirements) {
  const problems = [];
  for (const {
    type,
    label,
    properties
  } of entries) {
    if (type in requirements) {
      const missing = [];
      for (const field of requirements[type]) {
        if (Array.isArray(field) && !field.some(field => field in properties)) {
          missing.push(field.join('/'));
        } else if (typeof field === 'string' && !(field in properties)) {
          missing.push(field);
        }
      }
      if (missing.length) {
        problems.push([label, `missing fields: ${missing.join(', ')}`]);
      }
    } else {
      problems.push([label, `invalid type: "${type}"`]);
    }
  }
  if (problems.length) {
    throw new RangeError(['Invalid entries:'].concat(problems.map(([label, problem]) => `  - ${label} has ${problem}`)).join('\n'));
  }
}
function parseEntryValues(entry) {
  const output = {};
  if ('language' in entry.properties) {
    output.language = (0,_value_js__WEBPACK_IMPORTED_MODULE_2__.parse)(entry.properties.language, 'language');
  }
  for (const property in entry.properties) {
    const value = entry.properties[property];
    if (value === '') {
      continue;
    }
    output[property] = (0,_value_js__WEBPACK_IMPORTED_MODULE_2__.parse)(value + '', property, output.language);
  }
  for (const property in entry.annotations) {
    for (const annotation in entry.annotations[property]) {
      output[property + '+an:' + annotation] = (0,_value_js__WEBPACK_IMPORTED_MODULE_2__.parseAnnotation)(entry.annotations[property][annotation]);
    }
  }
  return _objectSpread(_objectSpread({}, entry), {}, {
    properties: output
  });
}
function parse(entries) {
  if (_config_js__WEBPACK_IMPORTED_MODULE_0__["default"].parse.strict) {
    validate(entries, _constants_js__WEBPACK_IMPORTED_MODULE_3__.required.biblatex);
  }
  return (0,_mapping_index_js__WEBPACK_IMPORTED_MODULE_1__.parse)(entries.map(parseEntryValues));
}
function parseBibtex(entries) {
  if (_config_js__WEBPACK_IMPORTED_MODULE_0__["default"].parse.strict) {
    validate(entries, _constants_js__WEBPACK_IMPORTED_MODULE_3__.required.bibtex);
  }
  return (0,_mapping_index_js__WEBPACK_IMPORTED_MODULE_1__.parseBibtex)(entries.map(parseEntryValues));
}

/***/ }),

/***/ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/input/fieldTypes.json":
/*!*******************************************************************************!*\
  !*** ./node_modules/@citation-js/plugin-bibtex/lib-mjs/input/fieldTypes.json ***!
  \*******************************************************************************/
/***/ (function(module) {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"abstract":["field","literal"],"addendum":["field","literal"],"afterword":["list","name"],"annotation":["field","literal"],"annotator":["list","name"],"author":["list","name"],"authortype":["field","key"],"bookauthor":["list","name"],"bookpagination":["field","key"],"booksubtitle":["field","literal"],"booktitle":["field","title"],"booktitleaddon":["field","literal"],"chapter":["field","literal"],"commentator":["list","name"],"date":["field","date"],"doi":["field","verbatim"],"edition":["field","literal"],"editor":["list","name"],"editora":["list","name"],"editorb":["list","name"],"editorc":["list","name"],"editortype":["field","key"],"editoratype":["field","key"],"editorbtype":["field","key"],"editorctype":["field","key"],"eid":["field","literal"],"entrysubtype":["field","literal"],"eprint":["field","verbatim"],"eprintclass":["field","literal"],"eprinttype":["field","literal"],"eventdate":["field","date"],"eventtitle":["field","title"],"eventtitleaddon":["field","literal"],"file":["field","verbatim"],"foreword":["list","name"],"holder":["list","name"],"howpublished":["field","literal"],"indextitle":["field","literal"],"institution":["list","literal"],"introduction":["list","name"],"isan":["field","literal"],"isbn":["field","literal"],"ismn":["field","literal"],"isrn":["field","literal"],"issn":["field","literal"],"issue":["field","literal"],"issuesubtitle":["field","literal"],"issuetitle":["field","literal"],"iswc":["field","literal"],"journalsubtitle":["field","literal"],"journaltitle":["field","literal"],"label":["field","literal"],"language":["list","key"],"library":["field","literal"],"location":["list","literal"],"mainsubtitle":["field","literal"],"maintitle":["field","title"],"maintitleaddon":["field","literal"],"month":["field","literal"],"nameaddon":["field","literal"],"note":["field","literal"],"number":["field","literal"],"organization":["list","literal"],"origdate":["field","date"],"origlanguage":["list","key"],"origlocation":["list","literal"],"origpublisher":["list","literal"],"origtitle":["field","title"],"pages":["field","range"],"pagetotal":["field","literal"],"pagination":["field","key"],"part":["field","literal"],"publisher":["list","literal"],"pubstate":["field","key"],"reprinttitle":["field","literal"],"series":["field","title"],"shortauthor":["list","name"],"shorteditor":["list","name"],"shorthand":["field","literal"],"shorthandintro":["field","literal"],"shortjournal":["field","literal"],"shortseries":["field","literal"],"shorttitle":["field","title"],"subtitle":["field","literal"],"title":["field","title"],"titleaddon":["field","literal"],"translator":["list","name"],"type":["field","title"],"url":["field","uri"],"urldate":["field","date"],"venue":["field","literal"],"version":["field","literal"],"volume":["field","integer"],"volumes":["field","integer"],"year":["field","literal"],"crossref":["field","entry key"],"entryset":["separated","literal"],"execute":["field","code"],"gender":["field","gender"],"langid":["field","identifier"],"langidopts":["field","literal"],"ids":["separated","entry key"],"indexsorttitle":["field","literal"],"keywords":["separated","literal"],"options":["separated","options"],"presort":["field","string"],"related":["separated","literal"],"relatedoptions":["separated","literal"],"relatedtype":["field","identifier"],"relatedstring":["field","literal"],"sortkey":["field","literal"],"sortname":["list","name"],"sortshorthand":["field","literal"],"sorttitle":["field","literal"],"sortyear":["field","integer"],"xdata":["separated","entry key"],"xref":["field","entry key"],"namea":["list","name"],"nameb":["list","name"],"namec":["list","name"],"nameatype":["field","key"],"namebtype":["field","key"],"namectype":["field","key"],"lista":["list","literal"],"listb":["list","literal"],"listc":["list","literal"],"listd":["list","literal"],"liste":["list","literal"],"listf":["list","literal"],"usera":["field","literal"],"userb":["field","literal"],"userc":["field","literal"],"userd":["field","literal"],"usere":["field","literal"],"userf":["field","literal"],"verba":["field","literal"],"verbb":["field","literal"],"verbc":["field","literal"],"address":["list","literal"],"annote":["field","literal"],"archiveprefix":["field","literal"],"journal":["field","literal"],"key":["field","literal"],"pdf":["field","verbatim"],"primaryclass":["field","literal"],"school":["list","literal"],"numpages":["field","integer"],"pmid":["field","literal"],"pmcid":["field","literal"]}');

/***/ }),

/***/ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/input/file.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@citation-js/plugin-bibtex/lib-mjs/input/file.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bibtexGrammar: function() { return /* binding */ bibtexGrammar; },
/* harmony export */   parse: function() { return /* binding */ parse; }
/* harmony export */ });
/* harmony import */ var _citation_js_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @citation-js/core */ "./node_modules/@citation-js/core/lib-mjs/index.js");
/* harmony import */ var moo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moo */ "./node_modules/moo/moo.js");
/* harmony import */ var moo__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moo__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../config.js */ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/config.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants.js */ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/input/constants.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }




const identifier = /[a-zA-Z_][a-zA-Z0-9_:+-]*/;
const whitespace = {
  comment: /%.*/,
  whitespace: {
    match: /\s+/,
    lineBreaks: true
  }
};
const lexer = moo__WEBPACK_IMPORTED_MODULE_1___default().states({
  main: {
    junk: {
      match: /@[cC][oO][mM][mM][eE][nN][tT].+|[^@]+/,
      lineBreaks: true
    },
    at: {
      match: '@',
      push: 'entry'
    }
  },
  entry: _objectSpread(_objectSpread({}, whitespace), {}, {
    otherEntryType: {
      match: /[sS][tT][rR][iI][nN][gG]|[pP][rR][eE][aA][mM][bB][lL][eE]/,
      next: 'otherEntryContents'
    },
    dataEntryType: {
      match: identifier,
      next: 'dataEntryContents'
    }
  }),
  otherEntryContents: _objectSpread(_objectSpread({}, whitespace), {}, {
    lbrace: {
      match: /[{(]/,
      next: 'fields'
    }
  }),
  dataEntryContents: _objectSpread(_objectSpread({}, whitespace), {}, {
    lbrace: {
      match: /[{(]/,
      next: 'dataEntryContents'
    },
    label: /[^,\s]+/,
    comma: {
      match: ',',
      next: 'fields'
    }
  }),
  fields: _objectSpread(_objectSpread({}, whitespace), {}, {
    identifier,
    number: /-?\d+/,
    hash: '#',
    equals: '=',
    comma: ',',
    quote: {
      match: '"',
      push: 'quotedLiteral'
    },
    lbrace: {
      match: '{',
      push: 'bracedLiteral'
    },
    rbrace: {
      match: /[})]/,
      pop: true
    }
  }),
  quotedLiteral: {
    lbrace: {
      match: '{',
      push: 'bracedLiteral'
    },
    quote: {
      match: '"',
      pop: true
    },
    text: {
      match: /(?:\\[\\{]|[^{"])+/,
      lineBreaks: true
    }
  },
  bracedLiteral: {
    lbrace: {
      match: '{',
      push: 'bracedLiteral'
    },
    rbrace: {
      match: '}',
      pop: true
    },
    text: {
      match: /(?:\\[\\{}]|[^{}])+/,
      lineBreaks: true
    }
  }
});
const delimiters = {
  '(': ')',
  '{': '}'
};
const bibtexGrammar = new _citation_js_core__WEBPACK_IMPORTED_MODULE_0__.util.Grammar({
  Main() {
    const entries = [];
    while (true) {
      while (this.matchToken('junk')) {
        this.consumeToken('junk');
      }
      if (this.matchEndOfFile()) {
        break;
      }
      entries.push(this.consumeRule('Entry'));
    }
    return entries.filter(Boolean);
  },
  _() {
    let oldToken;
    while (oldToken !== this.token) {
      oldToken = this.token;
      this.consumeToken('whitespace', true);
      this.consumeToken('comment', true);
    }
  },
  Entry() {
    this.consumeToken('at');
    this.consumeRule('_');
    const type = (this.matchToken('otherEntryType') ? this.consumeToken('otherEntryType') : this.consumeToken('dataEntryType')).value.toLowerCase();
    this.consumeRule('_');
    const openBrace = this.consumeToken('lbrace').value;
    this.consumeRule('_');
    let result;
    if (type === 'string') {
      const [key, value] = this.consumeRule('Field');
      this.state.strings[key] = value;
    } else if (type === 'preamble') {
      this.consumeRule('Expression');
    } else {
      const label = this.consumeToken('label').value;
      this.consumeRule('_');
      this.consumeToken('comma');
      this.consumeRule('_');
      const entryBody = this.consumeRule('EntryBody');
      result = _objectSpread({
        type,
        label
      }, entryBody);
    }
    this.consumeRule('_');
    const closeBrace = this.consumeToken('rbrace').value;
    if (closeBrace !== delimiters[openBrace]) {
      _citation_js_core__WEBPACK_IMPORTED_MODULE_0__.logger.warn('[plugin-bibtex]', `entry started with "${openBrace}", but ends with "${closeBrace}"`);
    }
    return result;
  },
  EntryBody() {
    const output = {
      properties: {}
    };
    while (this.matchToken('identifier')) {
      const [field, value] = this.consumeRule('Field');
      let annotationField;
      let annotationName = 'default';
      if (field.endsWith(_config_js__WEBPACK_IMPORTED_MODULE_2__["default"].biber.annotationMarker)) {
        annotationField = field.slice(0, -_config_js__WEBPACK_IMPORTED_MODULE_2__["default"].biber.annotationMarker.length);
      } else if (field.includes(_config_js__WEBPACK_IMPORTED_MODULE_2__["default"].biber.annotationMarker + _config_js__WEBPACK_IMPORTED_MODULE_2__["default"].biber.namedAnnotationMarker)) {
        [annotationField, annotationName] = field.split(_config_js__WEBPACK_IMPORTED_MODULE_2__["default"].biber.annotationMarker + _config_js__WEBPACK_IMPORTED_MODULE_2__["default"].biber.namedAnnotationMarker);
      }
      if (annotationField) {
        if (!output.annotations) {
          output.annotations = {};
        }
        if (!output.annotations[annotationField]) {
          output.annotations[annotationField] = {};
        }
        output.annotations[annotationField][annotationName] = value;
      } else {
        output.properties[field] = value;
      }
      this.consumeRule('_');
      if (this.consumeToken('comma', true)) {
        this.consumeRule('_');
      } else {
        break;
      }
    }
    return output;
  },
  Field() {
    const field = this.consumeToken('identifier').value.toLowerCase();
    this.consumeRule('_');
    this.consumeToken('equals');
    this.consumeRule('_');
    const value = this.consumeRule('Expression');
    return [field, value];
  },
  Expression() {
    let output = this.consumeRule('ExpressionPart');
    this.consumeRule('_');
    while (this.matchToken('hash')) {
      this.consumeToken('hash');
      this.consumeRule('_');
      output += this.consumeRule('ExpressionPart').toString();
      this.consumeRule('_');
    }
    return output;
  },
  ExpressionPart() {
    if (this.matchToken('identifier')) {
      return this.state.strings[this.consumeToken('identifier').value.toLowerCase()] || '';
    } else if (this.matchToken('number')) {
      return parseInt(this.consumeToken('number'));
    } else if (this.matchToken('quote')) {
      return this.consumeRule('QuoteString');
    } else {
      return this.consumeRule('BracketString');
    }
  },
  QuoteString() {
    let output = '';
    this.consumeToken('quote');
    while (!this.matchToken('quote')) {
      output += this.consumeRule('Text');
    }
    this.consumeToken('quote');
    return output;
  },
  BracketString() {
    let output = '';
    this.consumeToken('lbrace');
    while (!this.matchToken('rbrace')) {
      output += this.consumeRule('Text');
    }
    this.consumeToken('rbrace');
    return output;
  },
  Text() {
    if (this.matchToken('lbrace')) {
      return `{${this.consumeRule('BracketString')}}`;
    } else {
      return this.consumeToken('text').value;
    }
  }
}, {
  strings: _constants_js__WEBPACK_IMPORTED_MODULE_3__.defaultStrings
});
function parse(text) {
  return bibtexGrammar.parse(lexer.reset(text));
}

/***/ }),

/***/ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/input/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/@citation-js/plugin-bibtex/lib-mjs/input/index.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formats: function() { return /* binding */ formats; },
/* harmony export */   ref: function() { return /* binding */ ref; }
/* harmony export */ });
/* harmony import */ var _file_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./file.js */ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/input/file.js");
/* harmony import */ var _bibtxt_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bibtxt.js */ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/input/bibtxt.js");
/* harmony import */ var _entries_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./entries.js */ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/input/entries.js");



const ref = '@bibtex';
const formats = {
  '@biblatex/text': {
    parse: _file_js__WEBPACK_IMPORTED_MODULE_0__.parse,
    parseType: {
      dataType: 'String',
      predicate: /@\s{0,5}[A-Za-z]{1,13}\s{0,5}\{\s{0,5}[^@{}"=,\\\s]{0,100}\s{0,5},[\s\S]*\}/
    }
  },
  '@biblatex/entry+object': {
    parse(input) {
      return (0,_entries_js__WEBPACK_IMPORTED_MODULE_2__.parse)([input]);
    },
    parseType: {
      dataType: 'SimpleObject',
      propertyConstraint: {
        props: ['type', 'label', 'properties']
      }
    }
  },
  '@biblatex/entries+list': {
    parse: _entries_js__WEBPACK_IMPORTED_MODULE_2__.parse,
    parseType: {
      elementConstraint: '@biblatex/entry+object'
    }
  },
  '@bibtex/text': {
    parse: _file_js__WEBPACK_IMPORTED_MODULE_0__.parse,
    outputs: '@bibtex/entries+list'
  },
  '@bibtex/entry+object': {
    parse(input) {
      return (0,_entries_js__WEBPACK_IMPORTED_MODULE_2__.parseBibtex)([input]);
    }
  },
  '@bibtex/entries+list': {
    parse: _entries_js__WEBPACK_IMPORTED_MODULE_2__.parseBibtex
  },
  '@bibtxt/text': {
    parse: _bibtxt_js__WEBPACK_IMPORTED_MODULE_1__.parse,
    parseType: {
      dataType: 'String',
      predicate: /^\s*(\[(?!\s*[{[]).*?\]\s*(\n\s*[^[]((?!:)\S)+\s*:\s*.+?\s*)*\s*)+$/
    }
  }
};

/***/ }),

/***/ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/input/name.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@citation-js/plugin-bibtex/lib-mjs/input/name.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatNameParts: function() { return /* binding */ formatNameParts; },
/* harmony export */   getStringCase: function() { return /* binding */ getStringCase; },
/* harmony export */   orderNameParts: function() { return /* binding */ orderNameParts; },
/* harmony export */   orderNamePieces: function() { return /* binding */ orderNamePieces; }
/* harmony export */ });
function getStringCase(string) {
  const a = string.toUpperCase();
  const b = string.toLowerCase();
  for (let i = 0; i < string.length; i++) {
    if (a[i] !== b[i]) {
      return a[i] === string[i];
    }
  }
  return null;
}
function formatNameParts(parts) {
  if (parts.length === 0) {
    return undefined;
  }
  let piece = '';
  while (parts.length > 1) {
    const {
      value,
      hyphenated
    } = parts.shift();
    piece += value + (hyphenated ? '-' : ' ');
  }
  const output = piece + parts[0].value;
  return output[0] && output;
}
function orderNameParts(parts, orderGiven = true) {
  const given = [];
  const undecided = [];
  if (orderGiven) {
    while (parts.length > 1 && parts[0].upperCase !== false) {
      given.push(...undecided);
      undecided.length = 0;
      while (parts.length > 1 && parts[0].upperCase !== false && !parts[0].hyphenated) {
        given.push(parts.shift());
      }
      while (parts.length > 0 && parts[0].upperCase !== false && parts[0].hyphenated) {
        undecided.push(parts.shift());
      }
    }
  }
  const prefix = [];
  const family = [];
  while (parts.length > 1) {
    prefix.push(...family);
    family.length = 0;
    while (parts.length > 1 && parts[0].upperCase === false) {
      prefix.push(parts.shift());
    }
    while (parts.length > 0 && parts[0].upperCase !== false) {
      family.push(parts.shift());
    }
  }
  if (undecided.length) {
    family.unshift(...undecided);
  }
  if (parts.length) {
    family.push(parts[0]);
  }
  return [formatNameParts(given), formatNameParts(prefix), formatNameParts(family)];
}
function orderNamePieces(pieces) {
  if (pieces[0][0].label) {
    const name = {};
    for (const [{
      value,
      label
    }] of pieces) {
      name[label] = value;
    }
    return name;
  }
  const name = {};
  const [given, prefix, family] = orderNameParts(pieces[0], pieces.length === 1);
  if (family) {
    name.family = family;
  }
  if (prefix) {
    name.prefix = prefix;
  }
  if (pieces.length === 3) {
    name.given = formatNameParts(pieces[2]);
    name.suffix = formatNameParts(pieces[1]);
  } else if (pieces.length === 2) {
    name.given = formatNameParts(pieces[1]);
  } else if (given) {
    name.given = given;
  }
  return name;
}

/***/ }),

/***/ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/input/required.json":
/*!*****************************************************************************!*\
  !*** ./node_modules/@citation-js/plugin-bibtex/lib-mjs/input/required.json ***!
  \*****************************************************************************/
/***/ (function(module) {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"biblatex":{"article":["author","title","journaltitle",["year","date"]],"book":["author","title",["year","date"]],"mvbook":["author","title",["year","date"]],"inbook":["author","title","booktitle",["year","date"]],"booklet":[["author","editor"],"title",["year","date"]],"collection":["editor","title",["year","date"]],"mvcollection":["editor","title",["year","date"]],"incollection":["author","title","booktitle",["year","date"]],"dataset":[["author","editor"],"title",["year","date"]],"online":[["author","editor"],"title",["year","date"],["doi","eprint","url"]],"patent":["author","title","number",["year","date"]],"periodical":["editor","title",["year","date"]],"proceedings":["title",["year","date"]],"mvproceedings":["title",["year","date"]],"inproceedings":["author","title","booktitle",["year","date"]],"report":["author","title","type","institution",["year","date"]],"thesis":["author","title","type","institution",["year","date"]],"unpublished":["author","title",["year","date"]],"conference":["author","title","booktitle",["year","date"]],"electronic":[["author","editor"],"title",["year","date"],["doi","eprint","url"]],"mastersthesis":["author","title","institution",["year","date"]],"phdthesis":["author","title","institution",["year","date"]],"techreport":["author","title","institution",["year","date"]],"www":[["author","editor"],"title",["year","date"],["doi","eprint","url"]]},"bibtex":{"article":["author","title","journal","year"],"book":[["author","editor"],"title","publisher","year"],"booklet":["title"],"inbook":[["author","editor"],"title",["chapter","pages"],"publisher","year"],"incollection":["author","title","booktitle","publisher","year"],"inproceedings":["author","title","booktitle","year"],"mastersthesis":["author","title","school","year"],"phdthesis":["author","title","school","year"],"proceedings":["title","year"],"techreport":["author","title","institution","year"],"unpublished":["author","title","note"]}}');

/***/ }),

/***/ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/input/unicode.json":
/*!****************************************************************************!*\
  !*** ./node_modules/@citation-js/plugin-bibtex/lib-mjs/input/unicode.json ***!
  \****************************************************************************/
/***/ (function(module) {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"diacritics":{"`":"̀","\'":"́","^":"̂","~":"̃","=":"̄","u":"̆",".":"̇","\\"":"̈","r":"̊","H":"̋","v":"̌","b":"̲","d":"̣","c":"̧","k":"̨","t":"͡","textcommabelow":"̦"},"commands":{"textquotesingle":"\'","textasciigrave":"`","textquotedbl":"\\"","textdollar":"$","textless":"<","textgreater":">","textbackslash":"\\\\","textasciicircum":"^","textunderscore":"_","textbraceleft":"{","textbar":"|","textbraceright":"}","textasciitilde":"~","textexclamdown":"¡","textcent":"¢","textsterling":"£","textcurrency":"¤","textyen":"¥","textbrokenbar":"¦","textsection":"§","textasciidieresis":"¨","textcopyright":"©","textordfeminine":"ª","guillemetleft":"«","guillemotleft":"«","textlnot":"¬","textregistered":"®","textasciimacron":"¯","textdegree":"°","textpm":"±","texttwosuperior":"²","textthreesuperior":"³","textasciiacute":"´","textmu":"µ","textparagraph":"¶","textperiodcentered":"·","textonesuperior":"¹","textordmasculine":"º","guillemetright":"»","guillemotright":"»","textonequarter":"¼","textonehalf":"½","textthreequarters":"¾","textquestiondown":"¿","AE":"Æ","DH":"Ð","texttimes":"×","O":"Ø","TH":"Þ","ss":"ß","ae":"æ","dh":"ð","textdiv":"÷","o":"ø","th":"þ","DJ":"Đ","dj":"đ","i":"ı","IJ":"Ĳ","ij":"ĳ","L":"Ł","l":"ł","NG":"Ŋ","ng":"ŋ","OE":"Œ","oe":"œ","textflorin":"ƒ","j":"ȷ","textasciicaron":"ˇ","textasciibreve":"˘","textacutedbl":"˝","textgravedbl":"˵","texttildelow":"˷","textbaht":"฿","SS":"ẞ","textcompwordmark":"‌","textendash":"–","textemdash":"—","textbardbl":"‖","textquoteleft":"‘","textquoteright":"’","quotesinglbase":"‚","textquotedblleft":"“","textquotedblright":"”","quotedblbase":"„","textdagger":"†","textdaggerdbl":"‡","textbullet":"•","textellipsis":"…","textperthousand":"‰","textpertenthousand":"‱","guilsinglleft":"‹","guilsinglright":"›","textreferencemark":"※","textinterrobang":"‽","textfractionsolidus":"⁄","textlquill":"⁅","textrquill":"⁆","textdiscount":"⁒","textcolonmonetary":"₡","textlira":"₤","textnaira":"₦","textwon":"₩","textdong":"₫","texteuro":"€","textpeso":"₱","textcelsius":"℃","textnumero":"№","textcircledP":"℗","textrecipe":"℞","textservicemark":"℠","texttrademark":"™","textohm":"Ω","textmho":"℧","textestimated":"℮","textleftarrow":"←","textuparrow":"↑","textrightarrow":"→","textdownarrow":"↓","textminus":"−","Hwithstroke":"Ħ","hwithstroke":"ħ","textasteriskcentered":"∗","textsurd":"√","textlangle":"〈","textrangle":"〉","textblank":"␢","textvisiblespace":"␣","textopenbullet":"◦","textbigcircle":"◯","textmusicalnote":"♪","textmarried":"⚭","textdivorced":"⚮","textinterrobangdown":"⸘","textcommabelow":null,"copyright":"©"},"mathCommands":{"Gamma":"Γ","Delta":"Δ","Theta":"Θ","Lambda":"Λ","Xi":"Ξ","Pi":"Π","Sigma":"Σ","Phi":"Φ","Psi":"Ψ","Omega":"Ω","alpha":"α","beta":"β","gamma":"γ","delta":"δ","varepsilon":"ε","zeta":"ζ","eta":"η","theta":"θ","iota":"ι","kappa":"κ","lambda":"λ","mu":"μ","nu":"ν","xi":"ξ","pi":"π","rho":"ρ","varsigma":"ς","sigma":"σ","tau":"τ","upsilon":"υ","varphi":"φ","chi":"χ","psi":"ψ","omega":"ω","vartheta":"ϑ","Upsilon":"ϒ","phi":"ϕ","varpi":"ϖ","varrho":"ϱ","epsilon":"ϵ"}}');

/***/ }),

/***/ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/input/value.js":
/*!************************************************************************!*\
  !*** ./node_modules/@citation-js/plugin-bibtex/lib-mjs/input/value.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parse: function() { return /* binding */ parse; },
/* harmony export */   parseAnnotation: function() { return /* binding */ parseAnnotation; },
/* harmony export */   valueGrammar: function() { return /* binding */ valueGrammar; }
/* harmony export */ });
/* harmony import */ var _citation_js_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @citation-js/core */ "./node_modules/@citation-js/core/lib-mjs/index.js");
/* harmony import */ var moo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moo */ "./node_modules/moo/moo.js");
/* harmony import */ var moo__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moo__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../config.js */ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/config.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants.js */ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/input/constants.js");
/* harmony import */ var _name_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./name.js */ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/input/name.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }





const text = {
  commandBegin: {
    match: '\\begin',
    push: 'environment'
  },
  command: {
    match: /\\(?:[a-zA-Z]+|.) */,
    value: s => s.slice(1).trim()
  },
  lbrace: {
    match: '{',
    push: 'bracedLiteral'
  },
  mathShift: {
    match: '$',
    push: 'mathLiteral'
  },
  whitespace: {
    match: /[\s]+|~/,
    lineBreaks: true,
    value(token) {
      return token === '~' ? '\xa0' : ' ';
    }
  }
};
const lexer = moo__WEBPACK_IMPORTED_MODULE_1___default().states({
  stringLiteral: _objectSpread(_objectSpread({}, text), {}, {
    text: /[^{$}\s~\\]+/
  }),
  namesLiteral: _objectSpread(_objectSpread({
    and: /\s+[aA][nN][dD]\s+/,
    comma: ',',
    hyphen: '-',
    equals: '='
  }, text), {}, {
    text: /[^{$}\s~\\,=-]+/
  }),
  listLiteral: _objectSpread(_objectSpread({
    and: /\s+and\s+/
  }, text), {}, {
    text: /[^{$}\s~\\]+/
  }),
  separatedLiteral: _objectSpread(_objectSpread({
    comma: ','
  }, text), {}, {
    text: /[^{$}\s~\\,]+/
  }),
  annotation: _objectSpread(_objectSpread({}, text), {}, {
    colon: ':',
    equals: '=',
    comma: ',',
    semicolon: ';',
    quote: '"',
    itemCount: /\d+/,
    text: /[^{$}\s~\\":;,=]+/
  }),
  bracedLiteral: _objectSpread(_objectSpread({}, text), {}, {
    rbrace: {
      match: '}',
      pop: true
    },
    text: /[^{$}\s~\\]+/
  }),
  mathLiteral: _objectSpread(_objectSpread({}, text), {}, {
    mathShift: {
      match: '$',
      pop: true
    },
    script: /[\^_]/,
    text: /[^{$}\s~\\^_]+/
  }),
  environment: _objectSpread(_objectSpread({
    commandEnd: {
      match: '\\end',
      pop: true
    }
  }, text), {}, {
    text: /[^{$}\s~\\]+/
  })
});
function flattenConsString(string) {
  string[0];
  return string;
}
function applyFormatting(text, format) {
  if (format in _constants_js__WEBPACK_IMPORTED_MODULE_3__.formatting) {
    return text && _constants_js__WEBPACK_IMPORTED_MODULE_3__.formatting[format].join(text);
  } else {
    return text;
  }
}
const valueGrammar = new _citation_js_core__WEBPACK_IMPORTED_MODULE_0__.util.Grammar({
  String() {
    let output = '';
    while (!this.matchEndOfFile()) {
      output += this.consumeRule('Text');
    }
    return flattenConsString(output);
  },
  StringNames() {
    const list = [];
    while (true) {
      this.consumeToken('whitespace', true);
      list.push(this.consumeRule('Name'));
      this.consumeToken('whitespace', true);
      if (this.matchEndOfFile()) {
        return list;
      } else {
        this.consumeToken('and');
      }
    }
  },
  Name() {
    const pieces = [];
    while (true) {
      pieces.push(this.consumeRule('NamePiece'));
      if (this.matchEndOfFile() || this.matchToken('and')) {
        return (0,_name_js__WEBPACK_IMPORTED_MODULE_4__.orderNamePieces)(pieces);
      } else {
        this.consumeToken('comma');
        this.consumeToken('whitespace', true);
      }
    }
  },
  NamePiece() {
    const parts = [];
    while (true) {
      const part = this.consumeRule('NameToken');
      if (part.label) {
        part.label = (0,_name_js__WEBPACK_IMPORTED_MODULE_4__.formatNameParts)([...parts, {
          value: part.label
        }]);
        return [part];
      }
      parts.push(part);
      if (this.matchEndOfFile() || this.matchToken('and') || this.matchToken('comma')) {
        return parts;
      } else {
        while (this.matchToken('hyphen') || this.matchToken('whitespace')) {
          this.consumeToken();
        }
      }
    }
  },
  NameToken() {
    let upperCase = null;
    let value = '';
    while (true) {
      if (upperCase === null && this.matchToken('text')) {
        const text = this.consumeToken().value;
        value += text;
        upperCase = (0,_name_js__WEBPACK_IMPORTED_MODULE_4__.getStringCase)(text);
      } else if (this.matchEndOfFile() || this.matchToken('and') || this.matchToken('comma') || this.matchToken('whitespace')) {
        return {
          value,
          upperCase
        };
      } else if (this.matchToken('hyphen')) {
        return {
          value,
          upperCase,
          hyphenated: true
        };
      } else if (this.matchToken('equals')) {
        this.consumeToken('equals');
        const text = this.consumeRule('NamePiece');
        if (text[0].label) {
          value += '=' + text[0].label;
        }
        return {
          value: (0,_name_js__WEBPACK_IMPORTED_MODULE_4__.formatNameParts)(text),
          label: value
        };
      } else {
        value += this.consumeRule('Text');
      }
    }
  },
  StringList() {
    const list = [];
    while (!this.matchEndOfFile()) {
      let output = '';
      while (!this.matchEndOfFile() && !this.matchToken('and')) {
        output += this.consumeRule('Text');
      }
      list.push(flattenConsString(output));
      this.consumeToken('and', true);
    }
    return list.length === 1 ? list[0] : list;
  },
  StringSeparated() {
    const list = [];
    while (!this.matchEndOfFile()) {
      let output = '';
      while (!this.matchEndOfFile() && !this.matchToken('comma')) {
        output += this.consumeRule('Text');
      }
      list.push(output.trim());
      this.consumeToken('comma', true);
      this.consumeToken('whitespace', true);
    }
    return list;
  },
  StringVerbatim() {
    let output = '';
    while (!this.matchEndOfFile()) {
      output += this.consumeToken().text;
    }
    return flattenConsString(output);
  },
  StringUri() {
    const uri = this.consumeRule('StringVerbatim');
    try {
      if (decodeURI(uri) === uri) {
        return encodeURI(uri);
      } else {
        return uri;
      }
    } catch (e) {
      return encodeURI(uri);
    }
  },
  StringTitleCase() {
    this.state.sentenceCase = true;
    let output = '';
    while (!this.matchEndOfFile()) {
      output += this.consumeRule('Text');
    }
    return flattenConsString(output);
  },
  Annotations() {
    const annotations = {};
    while (true) {
      const {
        scope,
        item,
        part,
        value
      } = this.consumeRule('Annotation');
      if (scope === 'part') {
        if (!annotations.part) {
          annotations.part = [];
        }
        if (!annotations.part[item]) {
          annotations.part[item] = {};
        }
        annotations.part[item][part] = value;
      } else if (scope === 'item') {
        if (!annotations.item) {
          annotations.item = [];
        }
        annotations.item[item] = value;
      } else {
        annotations.field = value;
      }
      if (this.matchEndOfFile()) {
        break;
      } else {
        this.consumeToken('semicolon');
        this.consumeRule('_');
      }
    }
    return annotations;
  },
  Annotation() {
    const annotation = {};
    if (this.matchToken('itemCount')) {
      annotation.item = parseInt(this.consumeToken('itemCount')) - 1;
      if (this.matchToken('colon')) {
        this.consumeToken('colon');
        annotation.part = this.consumeToken('text');
        annotation.scope = 'part';
      } else {
        annotation.scope = 'item';
      }
    } else {
      annotation.scope = 'field';
    }
    this.consumeToken('equals');
    this.consumeRule('_');
    if (this.matchToken('quote')) {
      this.consumeToken('quote');
      let literal = '';
      while (!this.matchToken('quote')) {
        if (this.matchToken('itemCount') || this.matchToken('colon') || this.matchToken('comma') || this.matchToken('semicolon') || this.matchToken('equals')) {
          literal += this.token.value;
          this.token = this.lexer.next();
        } else {
          literal += this.consumeRule('Text');
        }
      }
      this.consumeToken('quote');
      annotation.value = flattenConsString(literal);
      this.consumeRule('_');
    } else {
      annotation.value = [];
      let output = '';
      while (true) {
        output += this.consumeRule('Text');
        if (this.matchToken('comma')) {
          this.consumeToken('comma');
          this.consumeRule('_');
          annotation.value.push(flattenConsString(output));
          output = '';
        } else if (this.matchEndOfFile() || this.matchToken('semicolon')) {
          annotation.value.push(flattenConsString(output));
          break;
        }
      }
    }
    return annotation;
  },
  BracketString() {
    var _this$state;
    let output = '';
    this.consumeToken('lbrace');
    const sentenceCase = this.state.sentenceCase;
    this.state.sentenceCase = sentenceCase && this.matchToken('command');
    (_this$state = this.state).partlyLowercase && (_this$state.partlyLowercase = this.state.sentenceCase);
    while (!this.matchToken('rbrace')) {
      output += this.consumeRule('Text');
    }
    const topLevel = sentenceCase && !this.state.sentenceCase;
    const protectCase = topLevel && this.state.partlyLowercase;
    this.state.sentenceCase = sentenceCase;
    this.consumeToken('rbrace');
    return protectCase ? applyFormatting(output, 'nocase') : output;
  },
  MathString() {
    let output = '';
    this.consumeToken('mathShift');
    while (!this.matchToken('mathShift')) {
      if (this.matchToken('script')) {
        const script = this.consumeToken('script').value;
        const text = this.consumeRule('Text').split('');
        if (text.every(char => char in _constants_js__WEBPACK_IMPORTED_MODULE_3__.mathScripts[script])) {
          output += text.map(char => _constants_js__WEBPACK_IMPORTED_MODULE_3__.mathScripts[script][char]).join('');
        } else {
          const formatName = _constants_js__WEBPACK_IMPORTED_MODULE_3__.mathScriptFormatting[script];
          output += _constants_js__WEBPACK_IMPORTED_MODULE_3__.formatting[formatName].join(text.join(''));
        }
        continue;
      }
      if (this.matchToken('command')) {
        const command = this.token.value;
        if (command in _constants_js__WEBPACK_IMPORTED_MODULE_3__.mathScriptFormatting) {
          this.consumeToken('command');
          const text = this.consumeRule('BracketString');
          output += applyFormatting(text, _constants_js__WEBPACK_IMPORTED_MODULE_3__.mathScriptFormatting[command]);
          continue;
        }
      }
      output += this.consumeRule('Text');
    }
    this.consumeToken('mathShift');
    return output;
  },
  Text() {
    if (this.matchToken('lbrace')) {
      return this.consumeRule('BracketString');
    } else if (this.matchToken('mathShift')) {
      return this.consumeRule('MathString');
    } else if (this.matchToken('whitespace')) {
      return this.consumeToken('whitespace').value;
    } else if (this.matchToken('commandBegin')) {
      return this.consumeRule('EnclosedEnv');
    } else if (this.matchToken('command')) {
      return this.consumeRule('Command');
    }
    const text = this.consumeToken('text').value.replace(_constants_js__WEBPACK_IMPORTED_MODULE_3__.ligaturePattern, ligature => _constants_js__WEBPACK_IMPORTED_MODULE_3__.ligatures[ligature]);
    const afterPunctuation = this.state.afterPunctuation;
    this.state.afterPunctuation = /[?!.:]$/.test(text);
    if (!this.state.sentenceCase) {
      var _this$state2;
      (_this$state2 = this.state).partlyLowercase || (_this$state2.partlyLowercase = text === text.toLowerCase() && text !== text.toUpperCase());
      return text;
    }
    const [first, ...otherCharacters] = text;
    const rest = otherCharacters.join('');
    const restLowerCase = rest.toLowerCase();
    if (rest !== restLowerCase) {
      return text;
    }
    if (!afterPunctuation) {
      return text.toLowerCase();
    }
    return first + restLowerCase;
  },
  Command() {
    const commandToken = this.consumeToken('command');
    const command = commandToken.value;
    if (command in _constants_js__WEBPACK_IMPORTED_MODULE_3__.formattingEnvs) {
      const text = this.consumeRule('Env');
      const format = _constants_js__WEBPACK_IMPORTED_MODULE_3__.formattingEnvs[command];
      return applyFormatting(text, format);
    } else if (command in _constants_js__WEBPACK_IMPORTED_MODULE_3__.formattingCommands) {
      const text = this.consumeRule('BracketString');
      const format = _constants_js__WEBPACK_IMPORTED_MODULE_3__.formattingCommands[command];
      return applyFormatting(text, format);
    } else if (command in _constants_js__WEBPACK_IMPORTED_MODULE_3__.commands) {
      return _constants_js__WEBPACK_IMPORTED_MODULE_3__.commands[command];
    } else if (command in _constants_js__WEBPACK_IMPORTED_MODULE_3__.mathCommands) {
      return _constants_js__WEBPACK_IMPORTED_MODULE_3__.mathCommands[command];
    } else if (command in _constants_js__WEBPACK_IMPORTED_MODULE_3__.diacritics && !this.matchEndOfFile()) {
      const text = this.consumeRule('Text');
      const diacritic = text[0] + _constants_js__WEBPACK_IMPORTED_MODULE_3__.diacritics[command];
      return diacritic.normalize('NFC') + text.slice(1);
    } else if (command in _constants_js__WEBPACK_IMPORTED_MODULE_3__.argumentCommands) {
      const func = _constants_js__WEBPACK_IMPORTED_MODULE_3__.argumentCommands[command];
      const args = [];
      let arity = func.length;
      while (arity-- > 0) {
        this.consumeToken('whitespace', true);
        args.push(this.consumeRule('BracketString'));
      }
      return func(...args);
    } else if (/^[&%$#_{}]$/.test(command)) {
      return commandToken.text.slice(1);
    } else {
      return commandToken.text;
    }
  },
  Env() {
    let output = '';
    while (!this.matchEndOfFile() && !this.matchToken('rbrace')) {
      output += this.consumeRule('Text');
    }
    return output;
  },
  EnclosedEnv() {
    this.consumeToken('commandBegin');
    const beginEnv = this.consumeRule('BracketString');
    let output = '';
    while (!this.matchToken('commandEnd')) {
      output += this.consumeRule('Text');
    }
    const end = this.consumeToken('commandEnd');
    const endEnv = this.consumeRule('BracketString');
    if (beginEnv !== endEnv) {
      throw new SyntaxError(this.lexer.formatError(end, `environment started with "${beginEnv}", ended with "${endEnv}"`));
    }
    return applyFormatting(output, _constants_js__WEBPACK_IMPORTED_MODULE_3__.formattingEnvs[beginEnv]);
  },
  _() {
    while (this.matchToken('whitespace')) {
      this.consumeToken('whitespace');
    }
  }
}, {
  sentenceCase: false,
  partlyLowercase: false,
  afterPunctuation: true
});
function singleLanguageIsEnglish(language) {
  return _constants_js__WEBPACK_IMPORTED_MODULE_3__.sentenceCaseLanguages.includes(language.toLowerCase());
}
function isEnglish(languages) {
  if (Array.isArray(languages)) {
    return languages.every(singleLanguageIsEnglish);
  }
  return singleLanguageIsEnglish(languages);
}
function getMainRule(fieldType, languages) {
  if (fieldType[1] === 'name') {
    return fieldType[0] === 'list' ? 'StringNames' : 'Name';
  }
  if (fieldType[1] === 'title') {
    const option = _config_js__WEBPACK_IMPORTED_MODULE_2__["default"].parse.sentenceCase;
    if (option === 'always' || option === 'english' && isEnglish(languages)) {
      return 'StringTitleCase';
    } else {
      return 'String';
    }
  }
  switch (fieldType[0] === 'field' ? fieldType[1] : fieldType[0]) {
    case 'list':
      return 'StringList';
    case 'separated':
      return 'StringSeparated';
    case 'verbatim':
      return 'StringVerbatim';
    case 'uri':
      return 'StringUri';
    case 'title':
    case 'literal':
    default:
      return 'String';
  }
}
function getLexerState(fieldType) {
  if (fieldType[1] === 'name') {
    return 'namesLiteral';
  }
  switch (fieldType[0]) {
    case 'list':
      return 'listLiteral';
    case 'separated':
      return 'separatedLiteral';
    case 'field':
    default:
      return 'stringLiteral';
  }
}
function parse(text, field, languages = []) {
  const fieldType = _constants_js__WEBPACK_IMPORTED_MODULE_3__.fieldTypes[field] || [];
  return valueGrammar.parse(lexer.reset(text, {
    state: getLexerState(fieldType),
    line: 0,
    col: 0
  }), getMainRule(fieldType, languages));
}
function parseAnnotation(text) {
  return valueGrammar.parse(lexer.reset(text, {
    state: 'annotation',
    line: 0,
    col: 0
  }), 'Annotations');
}

/***/ }),

/***/ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/mapping/biblatex.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@citation-js/plugin-bibtex/lib-mjs/mapping/biblatex.js ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _citation_js_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @citation-js/core */ "./node_modules/@citation-js/core/lib-mjs/index.js");
/* harmony import */ var _citation_js_date__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @citation-js/date */ "./node_modules/@citation-js/date/lib/index.js");
/* harmony import */ var _biblatexTypes_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./biblatexTypes.json */ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/mapping/biblatexTypes.json");
/* harmony import */ var _shared_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shared.js */ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/mapping/shared.js");




const nonSpec = [{
  source: 'note',
  target: 'accessed',
  when: {
    source: false,
    target: {
      note: false,
      addendum: false
    }
  },
  convert: {
    toSource(accessed) {
      return `[Online; accessed ${(0,_citation_js_date__WEBPACK_IMPORTED_MODULE_1__.format)(accessed)}]`;
    }
  }
}, {
  source: 'numpages',
  target: 'number-of-pages',
  when: {
    source: {
      pagetotal: false
    },
    target: false
  }
}, {
  source: 'pmid',
  target: 'PMID',
  when: {
    source: {
      eprinttype(type) {
        return type !== 'pmid';
      },
      archiveprefix(type) {
        return type !== 'pmid';
      }
    },
    target: false
  }
}, {
  source: 'pmcid',
  target: 'PMCID',
  when: {
    target: false
  }
}, {
  source: 's2id',
  target: 'custom',
  convert: {
    toTarget(S2ID) {
      return {
        S2ID
      };
    },
    toSource({
      S2ID
    }) {
      return S2ID;
    }
  }
}];
const aliases = [{
  source: 'annote',
  target: 'annote',
  when: {
    source: {
      annotation: false
    },
    target: false
  }
}, {
  source: 'address',
  target: 'publisher-place',
  convert: _shared_js__WEBPACK_IMPORTED_MODULE_3__.Converters.PICK,
  when: {
    source: {
      location: false
    },
    target: false
  }
}, {
  source: ['eprint', 'archiveprefix'],
  target: 'PMID',
  convert: _shared_js__WEBPACK_IMPORTED_MODULE_3__.Converters.EPRINT,
  when: {
    source: {
      eprinttype: false
    },
    target: false
  }
}, {
  source: 'journal',
  target: 'container-title',
  when: {
    source: {
      maintitle: false,
      booktitle: false,
      journaltitle: false
    },
    target: false
  }
}, {
  source: 'school',
  target: 'publisher',
  convert: _shared_js__WEBPACK_IMPORTED_MODULE_3__.Converters.PICK,
  when: {
    source: {
      institution: false,
      organization: false,
      publisher: false
    },
    target: false
  }
}];
/* harmony default export */ __webpack_exports__["default"] = (new _citation_js_core__WEBPACK_IMPORTED_MODULE_0__.util.Translator([...aliases, ...nonSpec, {
  source: 'abstract',
  target: 'abstract'
}, {
  source: 'urldate',
  target: 'accessed',
  convert: _shared_js__WEBPACK_IMPORTED_MODULE_3__.Converters.DATE
}, {
  source: 'annotation',
  target: 'annote'
}, {
  source: ['author', 'author+an:orcid'],
  target: 'author',
  convert: _shared_js__WEBPACK_IMPORTED_MODULE_3__.Converters.NAMES_ORCID
}, {
  source: 'library',
  target: 'call-number'
}, {
  source: 'chapter',
  target: 'chapter-number'
}, {
  source: 'bookauthor',
  target: 'container-author',
  convert: _shared_js__WEBPACK_IMPORTED_MODULE_3__.Converters.NAMES
}, {
  source: ['maintitle', 'mainsubtitle', 'maintitleaddon'],
  target: 'container-title',
  when: {
    source: true,
    target: {
      'number-of-volumes': true
    }
  },
  convert: _shared_js__WEBPACK_IMPORTED_MODULE_3__.Converters.TITLE
}, {
  source: ['booktitle', 'booksubtitle', 'booktitleaddon'],
  target: 'container-title',
  when: {
    source: {
      maintitle: false
    },
    target: {
      'number-of-volumes': false,
      type(type) {
        return !type || !type.startsWith('article');
      }
    }
  },
  convert: _shared_js__WEBPACK_IMPORTED_MODULE_3__.Converters.TITLE
}, {
  source: ['journaltitle', 'journalsubtitle', 'journaltitleaddon'],
  target: 'container-title',
  when: {
    source: {
      [_shared_js__WEBPACK_IMPORTED_MODULE_3__.TYPE]: 'article'
    },
    target: {
      type: ['article', 'article-newspaper', 'article-journal', 'article-magazine']
    }
  },
  convert: _shared_js__WEBPACK_IMPORTED_MODULE_3__.Converters.TITLE
}, {
  source: 'shortjournal',
  target: 'container-title-short',
  when: {
    source: {
      [_shared_js__WEBPACK_IMPORTED_MODULE_3__.TYPE]: 'article'
    },
    target: {
      type: ['article', 'article-newspaper', 'article-journal', 'article-magazine']
    }
  }
}, {
  source: 'shortjournal',
  target: 'journalAbbreviation',
  when: {
    source: false,
    target: {
      'container-title-short': false
    }
  }
}, {
  source: 'number',
  target: 'collection-number',
  when: {
    source: {
      [_shared_js__WEBPACK_IMPORTED_MODULE_3__.TYPE]: ['book', 'mvbook', 'inbook', 'bookinbook', 'suppbook', 'collection', 'mvcollection', 'incollection', 'suppcollection', 'manual', 'suppperiodical', 'proceedings', 'mvproceedings', 'refererence']
    },
    target: {
      type: ['bill', 'book', 'broadcast', 'chapter', 'dataset', 'entry', 'entry-dictionary', 'entry-encyclopedia', 'figure', 'graphic', 'interview', 'legislation', 'legal_case', 'manuscript', 'map', 'motion_picture', 'musical_score', 'pamphlet', 'post', 'post-weblog', 'personal_communication', 'review', 'review-book', 'song', 'speech', 'thesis', 'treaty', 'webpage']
    }
  }
}, {
  source: 'series',
  target: 'collection-title'
}, {
  source: 'shortseries',
  target: 'collection-title-short'
}, {
  source: 'doi',
  target: 'DOI'
}, {
  source: 'edition',
  target: 'edition'
}, {
  source: 'editor',
  target: 'editor',
  convert: _shared_js__WEBPACK_IMPORTED_MODULE_3__.Converters.NAMES
}, {
  source: [_shared_js__WEBPACK_IMPORTED_MODULE_3__.TYPE, 'entrysubtype', 'type'],
  target: ['type', 'genre'],
  convert: {
    toTarget(type, subtype, typeKey) {
      if (!typeKey) {
        if (type === 'mastersthesis') {
          typeKey = 'mathesis';
        }
        if (type === 'phdthesis') {
          typeKey = 'phdthesis';
        }
        if (type === 'techreport') {
          typeKey = 'techreport';
        }
      }
      return [_biblatexTypes_json__WEBPACK_IMPORTED_MODULE_2__.source[type] || 'document', typeKey || subtype];
    },
    toSource(type, genre) {
      const sourceType = _biblatexTypes_json__WEBPACK_IMPORTED_MODULE_2__.target[type] || 'misc';
      return genre in _shared_js__WEBPACK_IMPORTED_MODULE_3__.TYPE_KEYS ? [sourceType, undefined, genre] : [sourceType, genre];
    }
  }
}, {
  source: _shared_js__WEBPACK_IMPORTED_MODULE_3__.TYPE,
  when: {
    target: {
      type: false
    }
  },
  convert: {
    toSource() {
      return 'misc';
    }
  }
}, {
  source: 'eventdate',
  target: 'event-date',
  convert: _shared_js__WEBPACK_IMPORTED_MODULE_3__.Converters.DATE
}, {
  source: 'venue',
  target: 'event-place'
}, {
  source: ['eventtitle', 'eventtitleaddon'],
  target: 'event-title',
  convert: _shared_js__WEBPACK_IMPORTED_MODULE_3__.Converters.EVENT_TITLE
}, {
  source: ['eventtitle', 'eventtitleaddon'],
  target: 'event',
  convert: _shared_js__WEBPACK_IMPORTED_MODULE_3__.Converters.EVENT_TITLE,
  when: {
    source: false,
    target: {
      'event-title': false
    }
  }
}, {
  source: _shared_js__WEBPACK_IMPORTED_MODULE_3__.LABEL,
  target: ['id', 'citation-key', 'author', 'issued', 'year-suffix', 'title'],
  convert: _shared_js__WEBPACK_IMPORTED_MODULE_3__.Converters.LABEL
}, {
  source: 'isbn',
  target: 'ISBN'
}, {
  source: 'issn',
  target: 'ISSN'
}, {
  source: 'issue',
  target: 'issue',
  when: {
    source: {
      number: false,
      [_shared_js__WEBPACK_IMPORTED_MODULE_3__.TYPE]: ['article', 'periodical']
    },
    target: {
      issue(issue) {
        return typeof issue === 'string' && !issue.match(/\d+/);
      },
      type: ['article', 'article-journal', 'article-newspaper', 'article-magazine', 'periodical']
    }
  }
}, {
  source: 'number',
  target: 'issue',
  when: {
    source: {
      [_shared_js__WEBPACK_IMPORTED_MODULE_3__.TYPE]: ['article', 'periodical', 'inproceedings']
    },
    target: {
      issue(issue) {
        return issue && (typeof issue === 'number' || issue.match(/\d+/));
      },
      type: ['article', 'article-journal', 'article-newspaper', 'article-magazine', 'paper-conference', 'periodical']
    }
  }
}, {
  source: 'date',
  target: 'issued',
  convert: _shared_js__WEBPACK_IMPORTED_MODULE_3__.Converters.DATE
}, {
  source: ['year', 'month', 'day'],
  target: 'issued',
  convert: _shared_js__WEBPACK_IMPORTED_MODULE_3__.Converters.YEAR_MONTH,
  when: {
    source: {
      date: false
    },
    target: false
  }
}, {
  source: 'location',
  target: 'jurisdiction',
  when: {
    source: {
      type: 'patent'
    },
    target: {
      type: 'patent'
    }
  }
}, {
  source: 'keywords',
  target: 'keyword',
  convert: _shared_js__WEBPACK_IMPORTED_MODULE_3__.Converters.KEYWORDS
}, {
  source: 'language',
  target: 'language',
  convert: _shared_js__WEBPACK_IMPORTED_MODULE_3__.Converters.PICK
}, {
  source: 'langid',
  target: 'language',
  when: {
    source: {
      language: false
    },
    target: false
  }
}, {
  source: 'note',
  target: 'note'
}, {
  source: 'addendum',
  target: 'note',
  when: {
    source: {
      note: false
    },
    target: false
  }
}, {
  source: 'eid',
  target: 'number',
  when: {
    target: {
      type: ['article-journal']
    }
  }
}, {
  source: ['isan', 'ismn', 'isrn', 'iswc'],
  target: 'number',
  convert: _shared_js__WEBPACK_IMPORTED_MODULE_3__.Converters.STANDARD_NUMBERS,
  when: {
    source: {
      [_shared_js__WEBPACK_IMPORTED_MODULE_3__.TYPE](type) {
        return type !== 'patent';
      }
    },
    target: {
      type(type) {
        return type !== 'patent';
      }
    }
  }
}, {
  source: 'number',
  target: 'number',
  when: {
    source: {
      [_shared_js__WEBPACK_IMPORTED_MODULE_3__.TYPE]: ['patent', 'report', 'techreport', 'legislation']
    },
    target: {
      type: ['patent', 'report', 'legislation']
    }
  }
}, {
  source: 'origdate',
  target: 'original-date',
  convert: _shared_js__WEBPACK_IMPORTED_MODULE_3__.Converters.DATE
}, {
  source: 'origlocation',
  target: 'original-publisher-place',
  convert: _shared_js__WEBPACK_IMPORTED_MODULE_3__.Converters.PICK
}, {
  source: 'origpublisher',
  target: 'original-publisher',
  convert: _shared_js__WEBPACK_IMPORTED_MODULE_3__.Converters.PICK
}, {
  source: 'origtitle',
  target: 'original-title'
}, {
  source: 'pages',
  target: 'page',
  when: {
    source: {
      bookpagination: [undefined, 'page']
    }
  },
  convert: _shared_js__WEBPACK_IMPORTED_MODULE_3__.Converters.PAGES
}, {
  source: 'pagetotal',
  target: 'number-of-pages'
}, {
  source: 'part',
  target: 'part-number'
}, {
  source: ['eprint', 'eprinttype'],
  target: 'PMID',
  convert: _shared_js__WEBPACK_IMPORTED_MODULE_3__.Converters.EPRINT
}, {
  source: 'location',
  target: 'publisher-place',
  convert: _shared_js__WEBPACK_IMPORTED_MODULE_3__.Converters.PICK
}, {
  source: 'publisher',
  target: 'publisher',
  convert: _shared_js__WEBPACK_IMPORTED_MODULE_3__.Converters.PICK,
  when: {
    source: true,
    target: {
      type: ['article', 'article-journal', 'article-magazine', 'article-newspaper', 'bill', 'book', 'broadcast', 'chapter', 'classic', 'collection', 'dataset', 'document', 'entry', 'entry-dictionary', 'entry-encyclopedia', 'event', 'figure', 'graphic', 'hearing', 'interview', 'legal_case', 'legislation', 'manuscript', 'map', 'motion_picture', 'musical_score', 'pamphlet', 'paper-conference', 'patent', 'performance', 'periodical', 'personal_communication', 'post', 'post-weblog', 'regulation', 'review', 'review-book', 'software', 'song', 'speech', 'standard', 'treaty']
    }
  }
}, {
  source: 'organization',
  target: 'publisher',
  convert: _shared_js__WEBPACK_IMPORTED_MODULE_3__.Converters.PICK,
  when: {
    source: {
      publisher: false
    },
    target: {
      type: 'webpage'
    }
  }
}, {
  source: 'institution',
  target: 'publisher',
  convert: _shared_js__WEBPACK_IMPORTED_MODULE_3__.Converters.PICK,
  when: {
    source: {
      publisher: false,
      organization: false
    },
    target: {
      type: ['report', 'thesis']
    }
  }
}, {
  source: 'howpublished',
  target: 'publisher',
  convert: _shared_js__WEBPACK_IMPORTED_MODULE_3__.Converters.PICK,
  when: {
    source: {
      howpublished(howPublished) {
        return howPublished && !howPublished.startsWith('http');
      },
      publisher: false,
      organization: false,
      institution: false
    },
    target: {
      type: 'manuscript'
    }
  }
}, {
  source: ['pages', 'bookpagination'],
  target: 'section',
  when: {
    source: {
      bookpagination: 'section'
    },
    target: {
      page: false
    }
  },
  convert: {
    toTarget(section) {
      return section;
    },
    toSource(section) {
      return [section, 'section'];
    }
  }
}, {
  source: 'pubstate',
  target: 'status',
  convert: _shared_js__WEBPACK_IMPORTED_MODULE_3__.Converters.STATUS
}, {
  source: 'shorttitle',
  target: 'title-short'
}, {
  source: 'shorttitle',
  target: 'shortTitle',
  when: {
    source: false,
    target: {
      'title-short': false
    }
  }
}, {
  source: ['title', 'subtitle', 'titleaddon'],
  target: 'title',
  convert: _shared_js__WEBPACK_IMPORTED_MODULE_3__.Converters.TITLE
}, {
  source: 'translator',
  target: 'translator',
  convert: _shared_js__WEBPACK_IMPORTED_MODULE_3__.Converters.NAMES
}, {
  source: 'url',
  target: 'URL'
}, {
  source: 'howpublished',
  target: 'URL',
  convert: _shared_js__WEBPACK_IMPORTED_MODULE_3__.Converters.HOW_PUBLISHED,
  when: {
    source: {
      url: false
    },
    target: false
  }
}, {
  source: 'version',
  target: 'version'
}, {
  source: 'volume',
  target: 'volume'
}, {
  source: 'volumes',
  target: 'number-of-volumes'
}, {
  source: ['issuetitle', 'issuesubtitle', 'issuetitleaddon'],
  target: 'volume-title',
  convert: _shared_js__WEBPACK_IMPORTED_MODULE_3__.Converters.TITLE
}]));

/***/ }),

/***/ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/mapping/biblatexTypes.json":
/*!************************************************************************************!*\
  !*** ./node_modules/@citation-js/plugin-bibtex/lib-mjs/mapping/biblatexTypes.json ***!
  \************************************************************************************/
/***/ (function(module) {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"source":{"article":"article-journal","book":"book","mvbook":"book","inbook":"chapter","bookinbook":"book","booklet":"book","collection":"book","mvcollection":"book","incollection":"chapter","dataset":"dataset","manual":"report","misc":"document","online":"webpage","patent":"patent","periodical":"periodical","proceedings":"book","mvproceedings":"book","inproceedings":"paper-conference","reference":"book","mvreference":"book","inreference":"entry","report":"report","software":"software","thesis":"thesis","unpublished":"manuscript","artwork":"graphic","audio":"song","image":"figure","jurisdiction":"legal_case","legislation":"legislation","legal":"treaty","letter":"personal_communication","movie":"motion_picture","music":"musical_score","performance":"performance","review":"review","standard":"standard","video":"motion_picture","conference":"paper-conference","electronic":"webpage","mastersthesis":"thesis","phdthesis":"thesis","techreport":"report","www":"webpage"},"target":{"article":"article","article-journal":"article","article-magazine":"article","article-newspaper":"article","bill":"legislation","book":"book","broadcast":"audio","chapter":"inbook","classic":"unpublished","collection":"misc","dataset":"dataset","document":"misc","entry":"inreference","entry-dictionary":"inreference","entry-encyclopedia":"inreference","event":"misc","figure":"artwork","graphic":"artwork","hearing":"legal","interview":"audio","legal_case":"jurisdiction","legislation":"legislation","manuscript":"unpublished","motion_picture":"movie","musical_score":"music","paper-conference":"inproceedings","patent":"patent","performance":"performance","periodical":"periodical","personal_communication":"letter","post":"online","post-weblog":"online","regulation":"legal","report":"report","review":"review","review-book":"review","software":"software","song":"music","speech":"audio","standard":"standard","thesis":"thesis","treaty":"legal","webpage":"online"}}');

/***/ }),

/***/ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/mapping/bibtex.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@citation-js/plugin-bibtex/lib-mjs/mapping/bibtex.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _citation_js_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @citation-js/core */ "./node_modules/@citation-js/core/lib-mjs/index.js");
/* harmony import */ var _citation_js_date__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @citation-js/date */ "./node_modules/@citation-js/date/lib/index.js");
/* harmony import */ var _bibtexTypes_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bibtexTypes.json */ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/mapping/bibtexTypes.json");
/* harmony import */ var _shared_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shared.js */ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/mapping/shared.js");




/* harmony default export */ __webpack_exports__["default"] = (new _citation_js_core__WEBPACK_IMPORTED_MODULE_0__.util.Translator([{
  source: 'note',
  target: 'accessed',
  when: {
    source: false,
    target: {
      note: false
    }
  },
  convert: {
    toSource(accessed) {
      return `[Online; accessed ${(0,_citation_js_date__WEBPACK_IMPORTED_MODULE_1__.format)(accessed)}]`;
    }
  }
}, {
  source: 'annote',
  target: 'annote'
}, {
  source: 'address',
  target: 'publisher-place',
  convert: _shared_js__WEBPACK_IMPORTED_MODULE_3__.Converters.PICK
}, {
  source: 'author',
  target: 'author',
  convert: _shared_js__WEBPACK_IMPORTED_MODULE_3__.Converters.NAMES
}, {
  source: 'chapter',
  target: 'chapter-number'
}, {
  source: 'number',
  target: 'collection-number',
  when: {
    source: {
      [_shared_js__WEBPACK_IMPORTED_MODULE_3__.TYPE]: ['book', 'mvbook', 'inbook', 'collection', 'mvcollection', 'incollection', 'suppcollection', 'manual', 'suppperiodical', 'proceedings', 'mvproceedings', 'refererence']
    },
    target: {
      type: ['bill', 'book', 'broadcast', 'chapter', 'dataset', 'entry', 'entry-dictionary', 'entry-encyclopedia', 'figure', 'graphic', 'interview', 'legislation', 'legal_case', 'manuscript', 'map', 'motion_picture', 'musical_score', 'pamphlet', 'post', 'post-weblog', 'personal_communication', 'review', 'review-book', 'song', 'speech', 'thesis', 'treaty', 'webpage']
    }
  }
}, {
  source: 'series',
  target: 'collection-title'
}, {
  source: 'booktitle',
  target: 'container-title',
  when: {
    target: {
      type: ['chapter', 'paper-conference']
    }
  }
}, {
  source: 'journal',
  target: 'container-title',
  when: {
    source: {
      [_shared_js__WEBPACK_IMPORTED_MODULE_3__.TYPE]: 'article'
    },
    target: {
      type: ['article', 'article-newspaper', 'article-journal', 'article-magazine']
    }
  }
}, {
  source: 'doi',
  target: 'DOI'
}, {
  source: 'edition',
  target: 'edition'
}, {
  source: 'editor',
  target: 'editor',
  convert: _shared_js__WEBPACK_IMPORTED_MODULE_3__.Converters.NAMES
}, {
  source: _shared_js__WEBPACK_IMPORTED_MODULE_3__.LABEL,
  target: ['id', 'citation-key', 'author', 'issued', 'year-suffix', 'title'],
  convert: _shared_js__WEBPACK_IMPORTED_MODULE_3__.Converters.LABEL
}, {
  source: 'isbn',
  target: 'ISBN'
}, {
  source: 'issn',
  target: 'ISSN'
}, {
  source: 'number',
  target: 'issue',
  when: {
    source: {
      [_shared_js__WEBPACK_IMPORTED_MODULE_3__.TYPE]: ['article', 'periodical', 'inproceedings']
    },
    target: {
      issue(issue) {
        return typeof issue === 'number' || typeof issue === 'string' && issue.match(/\d+/);
      },
      type: ['article', 'article-journal', 'article-newspaper', 'article-magazine', 'paper-conference', 'periodical']
    }
  }
}, {
  source: ['year', 'month', 'day'],
  target: 'issued',
  convert: _shared_js__WEBPACK_IMPORTED_MODULE_3__.Converters.YEAR_MONTH
}, {
  source: 'note',
  target: 'note'
}, {
  source: 'number',
  target: 'number',
  when: {
    source: {
      [_shared_js__WEBPACK_IMPORTED_MODULE_3__.TYPE]: ['patent', 'report', 'techreport']
    },
    target: {
      type: ['patent', 'report']
    }
  }
}, {
  source: 'eid',
  target: 'number',
  when: {
    source: {
      number: false
    },
    target: {
      type: ['article-journal']
    }
  }
}, {
  source: 'pages',
  target: 'page',
  convert: _shared_js__WEBPACK_IMPORTED_MODULE_3__.Converters.PAGES
}, {
  source: 'publisher',
  target: 'publisher',
  convert: _shared_js__WEBPACK_IMPORTED_MODULE_3__.Converters.PICK,
  when: {
    target: {
      type: ['article', 'article-journal', 'article-magazine', 'article-newspaper', 'bill', 'book', 'broadcast', 'chapter', 'classic', 'collection', 'dataset', 'document', 'entry', 'entry-dictionary', 'entry-encyclopedia', 'event', 'figure', 'graphic', 'hearing', 'interview', 'legal_case', 'legislation', 'map', 'motion_picture', 'musical_score', 'pamphlet', 'patent', 'performance', 'periodical', 'personal_communication', 'post', 'post-weblog', 'regulation', 'review', 'review-book', 'software', 'song', 'speech', 'standard', 'treaty', 'webpage']
    }
  }
}, {
  source: 'organization',
  target: 'publisher',
  convert: _shared_js__WEBPACK_IMPORTED_MODULE_3__.Converters.PICK,
  when: {
    source: {
      publisher: false
    },
    target: {
      type: 'paper-conference'
    }
  }
}, {
  source: 'institution',
  target: 'publisher',
  convert: _shared_js__WEBPACK_IMPORTED_MODULE_3__.Converters.PICK,
  when: {
    source: {
      publisher: false,
      organization: false
    },
    target: {
      type: 'report'
    }
  }
}, {
  source: 'school',
  target: 'publisher',
  convert: _shared_js__WEBPACK_IMPORTED_MODULE_3__.Converters.PICK,
  when: {
    source: {
      institution: false,
      organization: false,
      publisher: false
    },
    target: {
      type: 'thesis'
    }
  }
}, {
  source: 'howpublished',
  target: 'publisher',
  convert: _shared_js__WEBPACK_IMPORTED_MODULE_3__.Converters.PICK,
  when: {
    source: {
      howpublished(howPublished) {
        return howPublished && !howPublished.startsWith('http');
      },
      publisher: false,
      organization: false,
      institution: false,
      school: false
    },
    target: {
      type: 'manuscript'
    }
  }
}, {
  source: 'title',
  target: 'title'
}, {
  source: [_shared_js__WEBPACK_IMPORTED_MODULE_3__.TYPE, 'type'],
  target: ['type', 'genre'],
  convert: {
    toTarget(sourceType, subType) {
      const type = _bibtexTypes_json__WEBPACK_IMPORTED_MODULE_2__.source[sourceType] || 'document';
      if (subType) {
        return [type, subType];
      } else if (sourceType === 'mastersthesis') {
        return [type, 'Master\'s thesis'];
      } else if (sourceType === 'phdthesis') {
        return [type, 'PhD thesis'];
      } else {
        return [type];
      }
    },
    toSource(targetType, genre) {
      const type = _bibtexTypes_json__WEBPACK_IMPORTED_MODULE_2__.target[targetType] || 'misc';
      if (/^(master'?s|diploma) thesis$/i.test(genre)) {
        return ['mastersthesis'];
      } else if (/^(phd|doctoral) thesis$/i.test(genre)) {
        return ['phdthesis'];
      } else {
        return [type, genre];
      }
    }
  }
}, {
  source: _shared_js__WEBPACK_IMPORTED_MODULE_3__.TYPE,
  when: {
    target: {
      type: false
    }
  },
  convert: {
    toSource() {
      return 'misc';
    }
  }
}, {
  source: 'url',
  target: 'URL'
}, {
  source: 'howpublished',
  target: 'URL',
  convert: _shared_js__WEBPACK_IMPORTED_MODULE_3__.Converters.HOW_PUBLISHED,
  when: {
    target: {
      publisher: false
    }
  }
}, {
  source: 'volume',
  target: 'volume'
}]));

/***/ }),

/***/ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/mapping/bibtexTypes.json":
/*!**********************************************************************************!*\
  !*** ./node_modules/@citation-js/plugin-bibtex/lib-mjs/mapping/bibtexTypes.json ***!
  \**********************************************************************************/
/***/ (function(module) {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"source":{"article":"article-journal","book":"book","booklet":"book","conference":"paper-conference","inbook":"chapter","incollection":"chapter","inproceedings":"paper-conference","manual":"report","mastersthesis":"thesis","misc":"document","phdthesis":"thesis","proceedings":"book","techreport":"report","unpublished":"manuscript"},"target":{"article":"article","article-journal":"article","article-magazine":"article","article-newspaper":"article","book":"book","chapter":"inbook","manuscript":"unpublished","paper-conference":"inproceedings","report":"techreport","review":"article","review-book":"article"}}');

/***/ }),

/***/ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/mapping/crossref.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@citation-js/plugin-bibtex/lib-mjs/mapping/crossref.js ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   crossref: function() { return /* binding */ crossref; }
/* harmony export */ });
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const BOOK = new Set(['book', 'inbook', 'bookinbook', 'suppbook']);
const BOOK_PART = new Set(['inbook', 'bookinbook', 'suppbook']);
const COLLECTION = new Set(['collection', 'reference', 'incollection', 'inreference', 'suppcollection']);
const COLLECTION_PART = new Set(['incollection', 'inreference', 'suppcollection']);
const PROCEEDINGS = new Set(['proceedings', 'inproceedings']);
const PROCEEDINGS_PART = new Set(['inproceedings']);
const PERIODICAL_PART = new Set(['article', 'suppperiodical']);
const TITLE_MAP = {
  mvbook: ['main', BOOK],
  mvcollection: ['main', COLLECTION],
  mvreference: ['main', COLLECTION],
  mvproceedings: ['main', PROCEEDINGS],
  book: ['book', BOOK_PART],
  collection: ['book', COLLECTION_PART],
  reference: ['book', COLLECTION_PART],
  proceedings: ['book', PROCEEDINGS_PART],
  periodical: ['journal', PERIODICAL_PART]
};
function crossref(target, entry, registry) {
  if (entry.crossref in registry) {
    const parent = registry[entry.crossref];
    if (parent.properties === entry) {
      return entry;
    }
    const data = _objectSpread({}, crossref(parent.type, parent.properties, registry));
    delete data.ids;
    delete data.crossref;
    delete data.xref;
    delete data.entryset;
    delete data.entrysubtype;
    delete data.execute;
    delete data.label;
    delete data.options;
    delete data.presort;
    delete data.related;
    delete data.relatedoptions;
    delete data.relatedstring;
    delete data.relatedtype;
    delete data.shortand;
    delete data.shortandintro;
    delete data.sortkey;
    if ((parent.type === 'mvbook' || parent.type === 'book') && BOOK_PART.has(target)) {
      data.bookauthor = data.author;
    }
    if (parent.type in TITLE_MAP) {
      const [prefix, targets] = TITLE_MAP[parent.type];
      if (targets.has(target)) {
        data[prefix + 'title'] = data.title;
        data[prefix + 'subtitle'] = data.subtitle;
        if (prefix !== 'journal') {
          data[prefix + 'titleaddon'] = data.titleaddon;
        }
        delete data.title;
        delete data.subtitle;
        delete data.titleaddon;
        delete data.shorttitle;
        delete data.sorttitle;
        delete data.indextitle;
        delete data.indexsorttitle;
      }
    }
    return Object.assign(data, entry);
  }
  return entry;
}

/***/ }),

/***/ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/mapping/index.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@citation-js/plugin-bibtex/lib-mjs/mapping/index.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   format: function() { return /* binding */ format; },
/* harmony export */   formatBibtex: function() { return /* binding */ formatBibtex; },
/* harmony export */   parse: function() { return /* binding */ parse; },
/* harmony export */   parseBibtex: function() { return /* binding */ parseBibtex; }
/* harmony export */ });
/* harmony import */ var _shared_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shared.js */ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/mapping/shared.js");
/* harmony import */ var _biblatex_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./biblatex.js */ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/mapping/biblatex.js");
/* harmony import */ var _bibtex_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bibtex.js */ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/mapping/bibtex.js");
/* harmony import */ var _crossref_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./crossref.js */ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/mapping/crossref.js");
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }




function _parse(input, spec) {
  const registry = {};
  for (const entry of input) {
    registry[entry.label] = entry;
  }
  return input.map(({
    type,
    label,
    properties
  }) => spec.convertToTarget(_objectSpread({
    [_shared_js__WEBPACK_IMPORTED_MODULE_0__.TYPE]: type,
    [_shared_js__WEBPACK_IMPORTED_MODULE_0__.LABEL]: label
  }, (0,_crossref_js__WEBPACK_IMPORTED_MODULE_3__.crossref)(type, properties, registry))));
}
function _format(input, spec) {
  return input.map(entry => {
    const _spec$convertToSource = spec.convertToSource(entry),
      {
        [_shared_js__WEBPACK_IMPORTED_MODULE_0__.TYPE]: type,
        [_shared_js__WEBPACK_IMPORTED_MODULE_0__.LABEL]: label
      } = _spec$convertToSource,
      properties = _objectWithoutProperties(_spec$convertToSource, [_shared_js__WEBPACK_IMPORTED_MODULE_0__.TYPE, _shared_js__WEBPACK_IMPORTED_MODULE_0__.LABEL].map(_toPropertyKey));
    return {
      type,
      label,
      properties
    };
  });
}
function parseBibtex(input) {
  return _parse(input, _bibtex_js__WEBPACK_IMPORTED_MODULE_2__["default"]);
}
function formatBibtex(input) {
  return _format(input, _bibtex_js__WEBPACK_IMPORTED_MODULE_2__["default"]);
}
function parse(input) {
  return _parse(input, _biblatex_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
}
function format(input) {
  return _format(input, _biblatex_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
}

/***/ }),

/***/ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/mapping/shared.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@citation-js/plugin-bibtex/lib-mjs/mapping/shared.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Converters: function() { return /* binding */ Converters; },
/* harmony export */   LABEL: function() { return /* binding */ LABEL; },
/* harmony export */   MONTHS: function() { return /* binding */ MONTHS; },
/* harmony export */   STANDARD_NUMBERS_PATTERN: function() { return /* binding */ STANDARD_NUMBERS_PATTERN; },
/* harmony export */   TYPE: function() { return /* binding */ TYPE; },
/* harmony export */   TYPE_KEYS: function() { return /* binding */ TYPE_KEYS; },
/* harmony export */   formatLabel: function() { return /* binding */ formatLabel; },
/* harmony export */   parseDate: function() { return /* binding */ parseDate; },
/* harmony export */   parseMonth: function() { return /* binding */ parseMonth; }
/* harmony export */ });
/* harmony import */ var _citation_js_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @citation-js/core */ "./node_modules/@citation-js/core/lib-mjs/index.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config.js */ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/config.js");


const stopWords = new Set(['the', 'a', 'an']);
const unsafeChars = /(?:<\/?.*?>|[\u0020-\u002F\u003A-\u0040\u005B-\u005E\u0060\u007B-\u007F])+/g;
const unicode = /[^\u0020-\u007F]+/g;
function isLabelSafe(text) {
  return !_config_js__WEBPACK_IMPORTED_MODULE_1__["default"].format.checkLabel || !text.match(unsafeChars);
}
function formatLabelFromId(id) {
  if (id === null) {
    return 'null';
  } else if (id === undefined) {
    return 'undefined';
  } else if (_config_js__WEBPACK_IMPORTED_MODULE_1__["default"].format.checkLabel) {
    return id.toString().replace(unsafeChars, '');
  } else {
    return id.toString();
  }
}
function firstWord(text) {
  if (!text) {
    return '';
  } else {
    return text.normalize('NFKD').replace(unicode, '').split(unsafeChars).find(word => word.length && !stopWords.has(word.toLowerCase()));
  }
}
const name = new _citation_js_core__WEBPACK_IMPORTED_MODULE_0__.util.Translator([{
  source: 'given',
  target: 'given'
}, {
  source: 'family',
  target: 'family'
}, {
  source: 'suffix',
  target: 'suffix'
}, {
  source: 'prefix',
  target: 'non-dropping-particle'
}, {
  source: 'family',
  target: 'literal',
  when: {
    source: false,
    target: {
      family: false,
      given: false
    }
  }
}]);
const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const TYPE = 'BibTeX type';
const LABEL = 'BibTeX label';
const MONTHS = {
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  may: 5,
  jun: 6,
  jul: 7,
  aug: 8,
  sep: 9,
  oct: 10,
  nov: 11,
  dec: 12,
  january: 1,
  february: 2,
  march: 3,
  april: 4,
  may: 5,
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12
};
const TYPE_KEYS = {
  bathesis: 'Bachelor\'s thesis',
  mathesis: 'Master\'s thesis',
  phdthesis: 'PhD thesis',
  candthesis: 'Candidate thesis',
  techreport: 'technical report',
  resreport: 'research report',
  software: 'computer software',
  datacd: 'data cd',
  audiocd: 'audio cd',
  patent: 'patent',
  patentde: 'German patent',
  patenteu: 'European patent',
  patentfr: 'French patent',
  patentuk: 'British patent',
  patentus: 'U.S. patent',
  patreq: 'patent request',
  patreqde: 'German patent request',
  patreqeu: 'European patent request',
  patreqfr: 'French patent request',
  patrequk: 'British patent request',
  patrequs: 'U.S. patent request'
};
const STANDARD_NUMBERS_PATTERN = /(^(?:ISAN )?(?:[0-9a-f]{4}-){4}[0-9a-z](?:-(?:[0-9a-f]{4}-){2}[0-9a-z])?$)|(^(?:979-?0-?|M-?)(?:\d{9}|(?=[\d-]{11}$)\d+-\d+-\d)$)|(^ISRN .{1,36}$)|(^(?:ISWC )?T-?\d{9}-?\d$)/i;
function parseDate(date) {
  const parts = date.split('T')[0].replace(/[?~%]$/, '').split('-');
  const year = +parts[0].replace(/^Y(?=-?\d{4}\d+)/, '').replace(/X/g, '0');
  const month = +parts[1];
  const day = +parts[2];
  if (!month || month > 20) {
    return [year];
  } else if (!day) {
    return [year, month];
  } else {
    return [year, month, day];
  }
}
function parseMonth(value) {
  if (value == null) {
    return [];
  }
  if (+value) {
    return [parseInt(value, 10)];
  }
  value = value.trim().toLowerCase();
  if (value in MONTHS) {
    return [MONTHS[value]];
  }
  const parts = value.split(/\s+/);
  let month;
  let day;
  if (parts[0] in MONTHS) {
    month = MONTHS[parts[0]];
    day = parseInt(parts[1]);
  } else if (parts[1] in MONTHS) {
    month = MONTHS[parts[1]];
    day = parseInt(parts[0]);
  }
  return day ? [month, day] : month ? [month] : [];
}
function formatLabel(author, issued, suffix, title) {
  let label = '';
  if (author && author[0]) {
    label += firstWord(author[0].family || author[0].literal);
  }
  if (issued && issued['date-parts'] && issued['date-parts'][0]) {
    label += issued['date-parts'][0][0];
  }
  if (suffix) {
    label += suffix;
  } else if (title) {
    label += firstWord(title);
  }
  return label;
}
const Converters = {
  PICK: {
    toTarget(...args) {
      return args.find(Boolean);
    },
    toSource(value) {
      return [value];
    }
  },
  DATE: {
    toTarget(date) {
      const parts = date.split('/').map(part => part && part !== '..' ? parseDate(part) : undefined);
      return isNaN(parts[0][0]) ? {
        literal: date
      } : {
        'date-parts': parts
      };
    },
    toSource(date) {
      if ('date-parts' in date) {
        return date['date-parts'].map(datePart => datePart.map(datePart => datePart.toString().padStart(2, '0')).join('-')).join('/');
      }
    }
  },
  YEAR_MONTH: {
    toTarget(year, month, day) {
      if (isNaN(+year)) {
        return {
          literal: year
        };
      } else if (!isNaN(+day) && !isNaN(+month)) {
        return {
          'date-parts': [[+year, +month, +day]]
        };
      } else {
        return {
          'date-parts': [[+year, ...parseMonth(month)]]
        };
      }
    },
    toSource(date) {
      if ('date-parts' in date) {
        const [year, month, day] = date['date-parts'][0];
        return [year.toString(), month ? day ? `${months[month - 1]} ${day}` : month : undefined];
      } else {
        return [];
      }
    }
  },
  EPRINT: {
    toTarget(id, type) {
      if (type === 'pubmed') {
        return id;
      }
    },
    toSource(id) {
      return [id, 'pubmed'];
    }
  },
  EVENT_TITLE: {
    toTarget(title, addon) {
      if (addon) {
        title += ' (' + addon + ')';
      }
      return title;
    },
    toSource(title) {
      return title.match(/^(.+)(?: \((.+)\))?$/).slice(1, 3);
    }
  },
  HOW_PUBLISHED: {
    toTarget(howPublished) {
      if (howPublished.startsWith('http')) {
        return howPublished;
      }
    }
  },
  KEYWORDS: {
    toTarget(list) {
      return list.join(',');
    },
    toSource(list) {
      return list.split(',');
    }
  },
  LABEL: {
    toTarget(label) {
      return [label, label];
    },
    toSource(id, label, author, issued, suffix, title) {
      if (label && isLabelSafe(label)) {
        return label;
      } else if (_config_js__WEBPACK_IMPORTED_MODULE_1__["default"].format.useIdAsLabel) {
        return formatLabelFromId(id);
      } else {
        return formatLabel(author, issued, suffix, title) || formatLabelFromId(id);
      }
    }
  },
  NAMES: {
    toTarget(list) {
      return list.map(name.convertToTarget);
    },
    toSource(list) {
      return list.map(name.convertToSource);
    }
  },
  NAMES_ORCID: {
    toTarget(list, orcid) {
      return list.map((inputName, i) => {
        var _orcid$item;
        const outputName = name.convertToTarget(inputName);
        if (typeof (orcid === null || orcid === void 0 || (_orcid$item = orcid.item) === null || _orcid$item === void 0 ? void 0 : _orcid$item[i]) === 'string') {
          outputName._orcid = orcid.item[i];
        }
        return outputName;
      });
    },
    toSource(list) {
      const names = [];
      const orcid = [];
      for (let i = 0; i < list.length; i++) {
        names.push(name.convertToSource(list[i]));
        if (list[i]._orcid) {
          orcid[i] = list[i]._orcid;
        }
      }
      return [names, orcid.length ? {
        item: orcid
      } : undefined];
    }
  },
  PAGES: {
    toTarget(pages) {
      return pages.replace(/[–—]/, '-');
    },
    toSource(pages) {
      return pages.replace('-', '--');
    }
  },
  STANDARD_NUMBERS: {
    toTarget(...args) {
      return args.find(Boolean);
    },
    toSource(number) {
      const match = number.toString().match(STANDARD_NUMBERS_PATTERN);
      return match ? match.slice(1, 5) : [];
    }
  },
  STATUS: {
    toSource(state) {
      if (/^(inpreparation|submitted|forthcoming|inpress|prepublished)$/i.test(state)) {
        return state;
      }
    }
  },
  TITLE: {
    toTarget(title, subtitle, addon) {
      if (subtitle) {
        title += ': ' + subtitle;
      }
      return title;
    },
    toSource(title) {
      return [title];
    }
  }
};

/***/ }),

/***/ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/output/bibtex.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@citation-js/plugin-bibtex/lib-mjs/output/bibtex.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   format: function() { return /* binding */ format; }
/* harmony export */ });
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config.js */ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/config.js");

function formatField(field, value, dict) {
  return dict.listItem.join(`${field} = {${value}},`);
}
function formatEntry(entry, dict) {
  const fields = [];
  for (const field in entry.properties) {
    fields.push(formatField(field, entry.properties[field], dict));
    if (entry.annotations && entry.annotations[field]) {
      for (const annotation in entry.annotations[field]) {
        let annotationField = field + _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].biber.annotationMarker;
        if (annotation !== 'default') {
          annotationField += _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].biber.namedAnnotationMarker + annotation;
        }
        fields.push(formatField(annotationField, entry.annotations[field][annotation], dict));
      }
    }
  }
  return dict.entry.join(`@${entry.type}{${entry.label},${dict.list.join(fields.join(''))}}`);
}
function format(src, dict) {
  const entries = src.map(entry => formatEntry(entry, dict)).join('');
  return dict.bibliographyContainer.join(entries);
}

/***/ }),

/***/ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/output/bibtxt.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@citation-js/plugin-bibtex/lib-mjs/output/bibtxt.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   format: function() { return /* binding */ format; }
/* harmony export */ });
function formatEntry({
  type,
  label,
  properties
}, dict) {
  const fields = Object.entries(properties).concat([['type', type]]).map(([field, value]) => dict.listItem.join(`${field}: ${value}`));
  return dict.entry.join(`[${label}]${dict.list.join(fields.join(''))}`);
}
function format(src, dict) {
  const entries = src.map(entry => formatEntry(entry, dict)).join('\n');
  return dict.bibliographyContainer.join(entries);
}

/***/ }),

/***/ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/output/entries.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@citation-js/plugin-bibtex/lib-mjs/output/entries.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   format: function() { return /* binding */ format; },
/* harmony export */   formatBibtex: function() { return /* binding */ formatBibtex; }
/* harmony export */ });
/* harmony import */ var _mapping_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../mapping/index.js */ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/mapping/index.js");
/* harmony import */ var _value_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./value.js */ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/output/value.js");


function formatEntryValues({
  type,
  label,
  properties
}) {
  const output = {
    type,
    label,
    properties: {}
  };
  for (const property in properties) {
    const value = properties[property];
    const [field, annotation] = property.split('+an:');
    if (annotation) {
      if (!output.annotations) {
        output.annotations = {};
      }
      if (!output.annotations[field]) {
        output.annotations[field] = {};
      }
      output.annotations[field][annotation] = (0,_value_js__WEBPACK_IMPORTED_MODULE_1__.formatAnnotation)(value);
    } else {
      output.properties[property] = (0,_value_js__WEBPACK_IMPORTED_MODULE_1__.format)(property, value);
    }
  }
  return output;
}
function format(entries) {
  return (0,_mapping_index_js__WEBPACK_IMPORTED_MODULE_0__.format)(entries).map(formatEntryValues);
}
function formatBibtex(entries) {
  return (0,_mapping_index_js__WEBPACK_IMPORTED_MODULE_0__.formatBibtex)(entries).map(formatEntryValues);
}

/***/ }),

/***/ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/output/index.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@citation-js/plugin-bibtex/lib-mjs/output/index.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _citation_js_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @citation-js/core */ "./node_modules/@citation-js/core/lib-mjs/index.js");
/* harmony import */ var _entries_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entries.js */ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/output/entries.js");
/* harmony import */ var _bibtex_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bibtex.js */ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/output/bibtex.js");
/* harmony import */ var _bibtxt_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bibtxt.js */ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/output/bibtxt.js");




const factory = function (mapper, formatter) {
  return function (data, opts = {}) {
    const {
      type,
      format = type || 'text'
    } = opts;
    data = mapper(data);
    if (format === 'object') {
      return data;
    } else if (_citation_js_core__WEBPACK_IMPORTED_MODULE_0__.plugins.dict.has(format)) {
      return formatter(data, _citation_js_core__WEBPACK_IMPORTED_MODULE_0__.plugins.dict.get(format), opts);
    } else {
      throw new RangeError(`Output dictionary "${format}" not available`);
    }
  };
};
/* harmony default export */ __webpack_exports__["default"] = ({
  bibtex: factory(_entries_js__WEBPACK_IMPORTED_MODULE_1__.formatBibtex, _bibtex_js__WEBPACK_IMPORTED_MODULE_2__.format),
  biblatex: factory(_entries_js__WEBPACK_IMPORTED_MODULE_1__.format, _bibtex_js__WEBPACK_IMPORTED_MODULE_2__.format),
  bibtxt: factory(_entries_js__WEBPACK_IMPORTED_MODULE_1__.formatBibtex, _bibtxt_js__WEBPACK_IMPORTED_MODULE_3__.format)
});

/***/ }),

/***/ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/output/value.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@citation-js/plugin-bibtex/lib-mjs/output/value.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   format: function() { return /* binding */ format; },
/* harmony export */   formatAnnotation: function() { return /* binding */ formatAnnotation; }
/* harmony export */ });
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config.js */ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/config.js");
/* harmony import */ var _input_constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../input/constants.js */ "./node_modules/@citation-js/plugin-bibtex/lib-mjs/input/constants.js");


const unicode = {};
for (const command in _input_constants_js__WEBPACK_IMPORTED_MODULE_1__.commands) {
  unicode[_input_constants_js__WEBPACK_IMPORTED_MODULE_1__.commands[command]] = command;
}
for (const diacritic in _input_constants_js__WEBPACK_IMPORTED_MODULE_1__.diacritics) {
  unicode[_input_constants_js__WEBPACK_IMPORTED_MODULE_1__.diacritics[diacritic]] = diacritic;
}
for (const ligature in _input_constants_js__WEBPACK_IMPORTED_MODULE_1__.ligatures) {
  unicode[_input_constants_js__WEBPACK_IMPORTED_MODULE_1__.ligatures[ligature]] = ligature;
}
const mathUnicode = {};
for (const command in _input_constants_js__WEBPACK_IMPORTED_MODULE_1__.mathCommands) {
  mathUnicode[_input_constants_js__WEBPACK_IMPORTED_MODULE_1__.mathCommands[command]] = command;
}
const UNSAFE_UNICODE = /[^a-zA-Z0-9\s!"'()*+,\-./:;=?@[\]\u0300-\u0308\u030a-\u030c\u0332\u0323\u0327\u0328\u0361\u0326]/g;
const DIACRITIC_PATTERN = /.[\u0300-\u0308\u030a-\u030c\u0332\u0323\u0327\u0328\u0361\u0326]+/g;
const LONE_DIACRITIC_PATTERN = /[\u0300-\u0308\u030a-\u030c\u0332\u0323\u0327\u0328\u0361\u0326]/g;
const listDelimiters = {
  separated: ',',
  list: ' and '
};
const richTextMappings = {
  i: '\\textit{',
  b: '\\textbf{',
  sc: '\\textsc{',
  sup: '\\textsuperscript{',
  sub: '\\textsubscript{',
  'span style="font-variant:small-caps;"': '\\textsc{',
  'span class="nocase"': '{'
};
function escapeCharacter(char) {
  if (char in unicode) {
    return unicode[char] in _input_constants_js__WEBPACK_IMPORTED_MODULE_1__.ligatures ? unicode[char] : `\\${unicode[char]}{}`;
  } else if (char in mathUnicode) {
    return `$\\${mathUnicode[char]}$`;
  } else if (/^[&%$#_{}]$/.test(char)) {
    return `\\${char}`;
  } else {
    return '';
  }
}
function escapeValue(value) {
  if (!_config_js__WEBPACK_IMPORTED_MODULE_0__["default"].format.asciiOnly) {
    return value;
  }
  return value.normalize('NFKD').replace(UNSAFE_UNICODE, char => escapeCharacter(char)).replace(DIACRITIC_PATTERN, match => Array.from(match).reduce((subject, diacritic) => `{\\${unicode[diacritic]} ${subject}}`)).replace(LONE_DIACRITIC_PATTERN, '');
}
function formatRichText(value) {
  const closingTags = [];
  let tokens = value.split(/<(\/?(?:i|b|sc|sup|sub|span)|span .*?)>/g);
  tokens = tokens.map((token, index) => {
    if (index % 2 === 0) {
      return escapeValue(token);
    } else if (token in richTextMappings) {
      closingTags.push('/' + token.split(' ')[0]);
      return richTextMappings[token];
    } else if (token === closingTags[closingTags.length - 1]) {
      closingTags.pop();
      return '}';
    } else {
      return '';
    }
  });
  return tokens.join('');
}
function formatName(name) {
  if (name.family && !name.prefix && !name.given & !name.suffix) {
    return name.family.includes(listDelimiters.list) ? name.family : `{${name.family}}`;
  }
  const parts = [''];
  if (name.prefix && name.family) {
    parts[0] += name.prefix + ' ';
  }
  if (name.family) {
    parts[0] += name.family;
  }
  if (name.suffix) {
    parts.push(name.suffix);
    parts.push(name.given || '');
  } else {
    parts.push(name.given);
  }
  return escapeValue(parts.join(', ').trim());
}
function formatTitle(title) {
  return formatRichText(title).split(/(:\s*)/).map((part, i) => i % 2 ? part : part.replace(/([^\\])\b([a-z]*[A-Z].*?)\b/g, '$1{$2}')).join('');
}
function formatSingleValue(value, valueType) {
  switch (valueType) {
    case 'title':
      return formatTitle(value);
    case 'literal':
      return formatRichText(value.toString());
    case 'name':
      return formatName(value);
    case 'verbatim':
    case 'uri':
      return value.toString();
    default:
      return escapeValue(value.toString());
  }
}
function formatList(values, valueType, listType) {
  const delimiter = listDelimiters[listType];
  return values.map(value => {
    const formatted = formatSingleValue(value, valueType);
    return formatted.includes(delimiter) ? `{${formatted}}` : formatted;
  }).join(delimiter);
}
function formatAnnotationValue(values) {
  if (Array.isArray(values)) {
    return values.map(value => escapeValue(value).replace(/([;,"])/g, '{$1}')).join(', ');
  } else {
    return '"' + escapeValue(values).replace(/(["])/g, '{$1}') + '"';
  }
}
function format(field, value) {
  if (!(field in _input_constants_js__WEBPACK_IMPORTED_MODULE_1__.fieldTypes)) {
    return formatSingleValue(value, 'verbatim');
  }
  const [listType, valueType] = _input_constants_js__WEBPACK_IMPORTED_MODULE_1__.fieldTypes[field];
  if (listType in listDelimiters) {
    return formatList(value, valueType, listType);
  } else {
    return formatSingleValue(value, valueType);
  }
}
function formatAnnotation(value) {
  const annotations = [];
  if (value.field) {
    annotations.push('=' + formatAnnotationValue(value.field));
  }
  if (value.item) {
    for (const [itemCount, itemValue] of Object.entries(value.item)) {
      if (!itemValue) {
        continue;
      }
      const i = parseInt(itemCount) + 1;
      annotations.push(i + '=' + formatAnnotationValue(itemValue));
    }
  }
  if (value.part) {
    for (const [itemCount, itemValue] of Object.entries(value.part)) {
      if (!itemValue) {
        continue;
      }
      const i = parseInt(itemCount) + 1;
      for (const part in itemValue) {
        if (!itemValue[part]) {
          continue;
        }
        annotations.push(i + ':' + part + '=' + formatAnnotationValue(itemValue[part]));
      }
    }
  }
  return annotations.join('; ');
}

/***/ }),

/***/ "./node_modules/moo/moo.js":
/*!*********************************!*\
  !*** ./node_modules/moo/moo.js ***!
  \*********************************/
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) /* global define */
  } else {}
}(this, function() {
  'use strict';

  var hasOwnProperty = Object.prototype.hasOwnProperty
  var toString = Object.prototype.toString
  var hasSticky = typeof new RegExp().sticky === 'boolean'

  /***************************************************************************/

  function isRegExp(o) { return o && toString.call(o) === '[object RegExp]' }
  function isObject(o) { return o && typeof o === 'object' && !isRegExp(o) && !Array.isArray(o) }

  function reEscape(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
  }
  function reGroups(s) {
    var re = new RegExp('|' + s)
    return re.exec('').length - 1
  }
  function reCapture(s) {
    return '(' + s + ')'
  }
  function reUnion(regexps) {
    if (!regexps.length) return '(?!)'
    var source =  regexps.map(function(s) {
      return "(?:" + s + ")"
    }).join('|')
    return "(?:" + source + ")"
  }

  function regexpOrLiteral(obj) {
    if (typeof obj === 'string') {
      return '(?:' + reEscape(obj) + ')'

    } else if (isRegExp(obj)) {
      // TODO: consider /u support
      if (obj.ignoreCase) throw new Error('RegExp /i flag not allowed')
      if (obj.global) throw new Error('RegExp /g flag is implied')
      if (obj.sticky) throw new Error('RegExp /y flag is implied')
      if (obj.multiline) throw new Error('RegExp /m flag is implied')
      return obj.source

    } else {
      throw new Error('Not a pattern: ' + obj)
    }
  }

  function pad(s, length) {
    if (s.length > length) {
      return s
    }
    return Array(length - s.length + 1).join(" ") + s
  }

  function lastNLines(string, numLines) {
    var position = string.length
    var lineBreaks = 0;
    while (true) {
      var idx = string.lastIndexOf("\n", position - 1)
      if (idx === -1) {
        break;
      } else {
        lineBreaks++
      }
      position = idx
      if (lineBreaks === numLines) {
        break;
      }
      if (position === 0) {
        break;
      }
    }
    var startPosition = 
      lineBreaks < numLines ?
      0 : 
      position + 1
    return string.substring(startPosition).split("\n")
  }

  function objectToRules(object) {
    var keys = Object.getOwnPropertyNames(object)
    var result = []
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]
      var thing = object[key]
      var rules = [].concat(thing)
      if (key === 'include') {
        for (var j = 0; j < rules.length; j++) {
          result.push({include: rules[j]})
        }
        continue
      }
      var match = []
      rules.forEach(function(rule) {
        if (isObject(rule)) {
          if (match.length) result.push(ruleOptions(key, match))
          result.push(ruleOptions(key, rule))
          match = []
        } else {
          match.push(rule)
        }
      })
      if (match.length) result.push(ruleOptions(key, match))
    }
    return result
  }

  function arrayToRules(array) {
    var result = []
    for (var i = 0; i < array.length; i++) {
      var obj = array[i]
      if (obj.include) {
        var include = [].concat(obj.include)
        for (var j = 0; j < include.length; j++) {
          result.push({include: include[j]})
        }
        continue
      }
      if (!obj.type) {
        throw new Error('Rule has no type: ' + JSON.stringify(obj))
      }
      result.push(ruleOptions(obj.type, obj))
    }
    return result
  }

  function ruleOptions(type, obj) {
    if (!isObject(obj)) {
      obj = { match: obj }
    }
    if (obj.include) {
      throw new Error('Matching rules cannot also include states')
    }

    // nb. error and fallback imply lineBreaks
    var options = {
      defaultType: type,
      lineBreaks: !!obj.error || !!obj.fallback,
      pop: false,
      next: null,
      push: null,
      error: false,
      fallback: false,
      value: null,
      type: null,
      shouldThrow: false,
    }

    // Avoid Object.assign(), so we support IE9+
    for (var key in obj) {
      if (hasOwnProperty.call(obj, key)) {
        options[key] = obj[key]
      }
    }

    // type transform cannot be a string
    if (typeof options.type === 'string' && type !== options.type) {
      throw new Error("Type transform cannot be a string (type '" + options.type + "' for token '" + type + "')")
    }

    // convert to array
    var match = options.match
    options.match = Array.isArray(match) ? match : match ? [match] : []
    options.match.sort(function(a, b) {
      return isRegExp(a) && isRegExp(b) ? 0
           : isRegExp(b) ? -1 : isRegExp(a) ? +1 : b.length - a.length
    })
    return options
  }

  function toRules(spec) {
    return Array.isArray(spec) ? arrayToRules(spec) : objectToRules(spec)
  }

  var defaultErrorRule = ruleOptions('error', {lineBreaks: true, shouldThrow: true})
  function compileRules(rules, hasStates) {
    var errorRule = null
    var fast = Object.create(null)
    var fastAllowed = true
    var unicodeFlag = null
    var groups = []
    var parts = []

    // If there is a fallback rule, then disable fast matching
    for (var i = 0; i < rules.length; i++) {
      if (rules[i].fallback) {
        fastAllowed = false
      }
    }

    for (var i = 0; i < rules.length; i++) {
      var options = rules[i]

      if (options.include) {
        // all valid inclusions are removed by states() preprocessor
        throw new Error('Inheritance is not allowed in stateless lexers')
      }

      if (options.error || options.fallback) {
        // errorRule can only be set once
        if (errorRule) {
          if (!options.fallback === !errorRule.fallback) {
            throw new Error("Multiple " + (options.fallback ? "fallback" : "error") + " rules not allowed (for token '" + options.defaultType + "')")
          } else {
            throw new Error("fallback and error are mutually exclusive (for token '" + options.defaultType + "')")
          }
        }
        errorRule = options
      }

      var match = options.match.slice()
      if (fastAllowed) {
        while (match.length && typeof match[0] === 'string' && match[0].length === 1) {
          var word = match.shift()
          fast[word.charCodeAt(0)] = options
        }
      }

      // Warn about inappropriate state-switching options
      if (options.pop || options.push || options.next) {
        if (!hasStates) {
          throw new Error("State-switching options are not allowed in stateless lexers (for token '" + options.defaultType + "')")
        }
        if (options.fallback) {
          throw new Error("State-switching options are not allowed on fallback tokens (for token '" + options.defaultType + "')")
        }
      }

      // Only rules with a .match are included in the RegExp
      if (match.length === 0) {
        continue
      }
      fastAllowed = false

      groups.push(options)

      // Check unicode flag is used everywhere or nowhere
      for (var j = 0; j < match.length; j++) {
        var obj = match[j]
        if (!isRegExp(obj)) {
          continue
        }

        if (unicodeFlag === null) {
          unicodeFlag = obj.unicode
        } else if (unicodeFlag !== obj.unicode && options.fallback === false) {
          throw new Error('If one rule is /u then all must be')
        }
      }

      // convert to RegExp
      var pat = reUnion(match.map(regexpOrLiteral))

      // validate
      var regexp = new RegExp(pat)
      if (regexp.test("")) {
        throw new Error("RegExp matches empty string: " + regexp)
      }
      var groupCount = reGroups(pat)
      if (groupCount > 0) {
        throw new Error("RegExp has capture groups: " + regexp + "\nUse (?: … ) instead")
      }

      // try and detect rules matching newlines
      if (!options.lineBreaks && regexp.test('\n')) {
        throw new Error('Rule should declare lineBreaks: ' + regexp)
      }

      // store regex
      parts.push(reCapture(pat))
    }


    // If there's no fallback rule, use the sticky flag so we only look for
    // matches at the current index.
    //
    // If we don't support the sticky flag, then fake it using an irrefutable
    // match (i.e. an empty pattern).
    var fallbackRule = errorRule && errorRule.fallback
    var flags = hasSticky && !fallbackRule ? 'ym' : 'gm'
    var suffix = hasSticky || fallbackRule ? '' : '|'

    if (unicodeFlag === true) flags += "u"
    var combined = new RegExp(reUnion(parts) + suffix, flags)
    return {regexp: combined, groups: groups, fast: fast, error: errorRule || defaultErrorRule}
  }

  function compile(rules) {
    var result = compileRules(toRules(rules))
    return new Lexer({start: result}, 'start')
  }

  function checkStateGroup(g, name, map) {
    var state = g && (g.push || g.next)
    if (state && !map[state]) {
      throw new Error("Missing state '" + state + "' (in token '" + g.defaultType + "' of state '" + name + "')")
    }
    if (g && g.pop && +g.pop !== 1) {
      throw new Error("pop must be 1 (in token '" + g.defaultType + "' of state '" + name + "')")
    }
  }
  function compileStates(states, start) {
    var all = states.$all ? toRules(states.$all) : []
    delete states.$all

    var keys = Object.getOwnPropertyNames(states)
    if (!start) start = keys[0]

    var ruleMap = Object.create(null)
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]
      ruleMap[key] = toRules(states[key]).concat(all)
    }
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]
      var rules = ruleMap[key]
      var included = Object.create(null)
      for (var j = 0; j < rules.length; j++) {
        var rule = rules[j]
        if (!rule.include) continue
        var splice = [j, 1]
        if (rule.include !== key && !included[rule.include]) {
          included[rule.include] = true
          var newRules = ruleMap[rule.include]
          if (!newRules) {
            throw new Error("Cannot include nonexistent state '" + rule.include + "' (in state '" + key + "')")
          }
          for (var k = 0; k < newRules.length; k++) {
            var newRule = newRules[k]
            if (rules.indexOf(newRule) !== -1) continue
            splice.push(newRule)
          }
        }
        rules.splice.apply(rules, splice)
        j--
      }
    }

    var map = Object.create(null)
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]
      map[key] = compileRules(ruleMap[key], true)
    }

    for (var i = 0; i < keys.length; i++) {
      var name = keys[i]
      var state = map[name]
      var groups = state.groups
      for (var j = 0; j < groups.length; j++) {
        checkStateGroup(groups[j], name, map)
      }
      var fastKeys = Object.getOwnPropertyNames(state.fast)
      for (var j = 0; j < fastKeys.length; j++) {
        checkStateGroup(state.fast[fastKeys[j]], name, map)
      }
    }

    return new Lexer(map, start)
  }

  function keywordTransform(map) {

    // Use a JavaScript Map to map keywords to their corresponding token type
    // unless Map is unsupported, then fall back to using an Object:
    var isMap = typeof Map !== 'undefined'
    var reverseMap = isMap ? new Map : Object.create(null)

    var types = Object.getOwnPropertyNames(map)
    for (var i = 0; i < types.length; i++) {
      var tokenType = types[i]
      var item = map[tokenType]
      var keywordList = Array.isArray(item) ? item : [item]
      keywordList.forEach(function(keyword) {
        if (typeof keyword !== 'string') {
          throw new Error("keyword must be string (in keyword '" + tokenType + "')")
        }
        if (isMap) {
          reverseMap.set(keyword, tokenType)
        } else {
          reverseMap[keyword] = tokenType
        }
      })
    }
    return function(k) {
      return isMap ? reverseMap.get(k) : reverseMap[k]
    }
  }

  /***************************************************************************/

  var Lexer = function(states, state) {
    this.startState = state
    this.states = states
    this.buffer = ''
    this.stack = []
    this.reset()
  }

  Lexer.prototype.reset = function(data, info) {
    this.buffer = data || ''
    this.index = 0
    this.line = info ? info.line : 1
    this.col = info ? info.col : 1
    this.queuedToken = info ? info.queuedToken : null
    this.queuedText = info ? info.queuedText: "";
    this.queuedThrow = info ? info.queuedThrow : null
    this.setState(info ? info.state : this.startState)
    this.stack = info && info.stack ? info.stack.slice() : []
    return this
  }

  Lexer.prototype.save = function() {
    return {
      line: this.line,
      col: this.col,
      state: this.state,
      stack: this.stack.slice(),
      queuedToken: this.queuedToken,
      queuedText: this.queuedText,
      queuedThrow: this.queuedThrow,
    }
  }

  Lexer.prototype.setState = function(state) {
    if (!state || this.state === state) return
    this.state = state
    var info = this.states[state]
    this.groups = info.groups
    this.error = info.error
    this.re = info.regexp
    this.fast = info.fast
  }

  Lexer.prototype.popState = function() {
    this.setState(this.stack.pop())
  }

  Lexer.prototype.pushState = function(state) {
    this.stack.push(this.state)
    this.setState(state)
  }

  var eat = hasSticky ? function(re, buffer) { // assume re is /y
    return re.exec(buffer)
  } : function(re, buffer) { // assume re is /g
    var match = re.exec(buffer)
    // will always match, since we used the |(?:) trick
    if (match[0].length === 0) {
      return null
    }
    return match
  }

  Lexer.prototype._getGroup = function(match) {
    var groupCount = this.groups.length
    for (var i = 0; i < groupCount; i++) {
      if (match[i + 1] !== undefined) {
        return this.groups[i]
      }
    }
    throw new Error('Cannot find token type for matched text')
  }

  function tokenToString() {
    return this.value
  }

  Lexer.prototype.next = function() {
    var index = this.index

    // If a fallback token matched, we don't need to re-run the RegExp
    if (this.queuedGroup) {
      var token = this._token(this.queuedGroup, this.queuedText, index)
      this.queuedGroup = null
      this.queuedText = ""
      return token
    }

    var buffer = this.buffer
    if (index === buffer.length) {
      return // EOF
    }

    // Fast matching for single characters
    var group = this.fast[buffer.charCodeAt(index)]
    if (group) {
      return this._token(group, buffer.charAt(index), index)
    }

    // Execute RegExp
    var re = this.re
    re.lastIndex = index
    var match = eat(re, buffer)

    // Error tokens match the remaining buffer
    var error = this.error
    if (match == null) {
      return this._token(error, buffer.slice(index, buffer.length), index)
    }

    var group = this._getGroup(match)
    var text = match[0]

    if (error.fallback && match.index !== index) {
      this.queuedGroup = group
      this.queuedText = text

      // Fallback tokens contain the unmatched portion of the buffer
      return this._token(error, buffer.slice(index, match.index), index)
    }

    return this._token(group, text, index)
  }

  Lexer.prototype._token = function(group, text, offset) {
    // count line breaks
    var lineBreaks = 0
    if (group.lineBreaks) {
      var matchNL = /\n/g
      var nl = 1
      if (text === '\n') {
        lineBreaks = 1
      } else {
        while (matchNL.exec(text)) { lineBreaks++; nl = matchNL.lastIndex }
      }
    }

    var token = {
      type: (typeof group.type === 'function' && group.type(text)) || group.defaultType,
      value: typeof group.value === 'function' ? group.value(text) : text,
      text: text,
      toString: tokenToString,
      offset: offset,
      lineBreaks: lineBreaks,
      line: this.line,
      col: this.col,
    }
    // nb. adding more props to token object will make V8 sad!

    var size = text.length
    this.index += size
    this.line += lineBreaks
    if (lineBreaks !== 0) {
      this.col = size - nl + 1
    } else {
      this.col += size
    }

    // throw, if no rule with {error: true}
    if (group.shouldThrow) {
      var err = new Error(this.formatError(token, "invalid syntax"))
      throw err;
    }

    if (group.pop) this.popState()
    else if (group.push) this.pushState(group.push)
    else if (group.next) this.setState(group.next)

    return token
  }

  if (typeof Symbol !== 'undefined' && Symbol.iterator) {
    var LexerIterator = function(lexer) {
      this.lexer = lexer
    }

    LexerIterator.prototype.next = function() {
      var token = this.lexer.next()
      return {value: token, done: !token}
    }

    LexerIterator.prototype[Symbol.iterator] = function() {
      return this
    }

    Lexer.prototype[Symbol.iterator] = function() {
      return new LexerIterator(this)
    }
  }

  Lexer.prototype.formatError = function(token, message) {
    if (token == null) {
      // An undefined token indicates EOF
      var text = this.buffer.slice(this.index)
      var token = {
        text: text,
        offset: this.index,
        lineBreaks: text.indexOf('\n') === -1 ? 0 : 1,
        line: this.line,
        col: this.col,
      }
    }
    
    var numLinesAround = 2
    var firstDisplayedLine = Math.max(token.line - numLinesAround, 1)
    var lastDisplayedLine = token.line + numLinesAround
    var lastLineDigits = String(lastDisplayedLine).length
    var displayedLines = lastNLines(
        this.buffer, 
        (this.line - token.line) + numLinesAround + 1
      )
      .slice(0, 5)
    var errorLines = []
    errorLines.push(message + " at line " + token.line + " col " + token.col + ":")
    errorLines.push("")
    for (var i = 0; i < displayedLines.length; i++) {
      var line = displayedLines[i]
      var lineNo = firstDisplayedLine + i
      errorLines.push(pad(String(lineNo), lastLineDigits) + "  " + line);
      if (lineNo === token.line) {
        errorLines.push(pad("", lastLineDigits + token.col + 1) + "^")
      }
    }
    return errorLines.join("\n")
  }

  Lexer.prototype.clone = function() {
    return new Lexer(this.states, this.state)
  }

  Lexer.prototype.has = function(tokenType) {
    return true
  }


  return {
    compile: compile,
    states: compileStates,
    error: Object.freeze({error: true}),
    fallback: Object.freeze({fallback: true}),
    keywords: keywordTransform,
  }

}));


/***/ })

}]);
//# sourceMappingURL=citation-js-bibtex.3d2f10cd.js.079dafcd.map