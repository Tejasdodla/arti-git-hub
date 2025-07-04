"use strict";
(self["webpackChunkforgejo"] = self["webpackChunkforgejo"] || []).push([["node_modules_monaco-editor_esm_vs_basic-languages_r_r_js"],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/r/r.js":
/*!******************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/r/r.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   conf: function() { return /* binding */ conf; },
/* harmony export */   language: function() { return /* binding */ language; }
/* harmony export */ });
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.52.2(404545bded1df6ffa41ea0af4e8ddb219018c6c1)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/


// src/basic-languages/r/r.ts
var conf = {
  comments: {
    lineComment: "#"
  },
  brackets: [
    ["{", "}"],
    ["[", "]"],
    ["(", ")"]
  ],
  autoClosingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: '"', close: '"' }
  ],
  surroundingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: '"', close: '"' }
  ]
};
var language = {
  defaultToken: "",
  tokenPostfix: ".r",
  roxygen: [
    "@alias",
    "@aliases",
    "@assignee",
    "@author",
    "@backref",
    "@callGraph",
    "@callGraphDepth",
    "@callGraphPrimitives",
    "@concept",
    "@describeIn",
    "@description",
    "@details",
    "@docType",
    "@encoding",
    "@evalNamespace",
    "@evalRd",
    "@example",
    "@examples",
    "@export",
    "@exportClass",
    "@exportMethod",
    "@exportPattern",
    "@family",
    "@field",
    "@formals",
    "@format",
    "@import",
    "@importClassesFrom",
    "@importFrom",
    "@importMethodsFrom",
    "@include",
    "@inherit",
    "@inheritDotParams",
    "@inheritParams",
    "@inheritSection",
    "@keywords",
    "@md",
    "@method",
    "@name",
    "@noMd",
    "@noRd",
    "@note",
    "@param",
    "@rawNamespace",
    "@rawRd",
    "@rdname",
    "@references",
    "@return",
    "@S3method",
    "@section",
    "@seealso",
    "@setClass",
    "@slot",
    "@source",
    "@template",
    "@templateVar",
    "@title",
    "@TODO",
    "@usage",
    "@useDynLib"
  ],
  constants: [
    "NULL",
    "FALSE",
    "TRUE",
    "NA",
    "Inf",
    "NaN",
    "NA_integer_",
    "NA_real_",
    "NA_complex_",
    "NA_character_",
    "T",
    "F",
    "LETTERS",
    "letters",
    "month.abb",
    "month.name",
    "pi",
    "R.version.string"
  ],
  keywords: [
    "break",
    "next",
    "return",
    "if",
    "else",
    "for",
    "in",
    "repeat",
    "while",
    "array",
    "category",
    "character",
    "complex",
    "double",
    "function",
    "integer",
    "list",
    "logical",
    "matrix",
    "numeric",
    "vector",
    "data.frame",
    "factor",
    "library",
    "require",
    "attach",
    "detach",
    "source"
  ],
  special: ["\\n", "\\r", "\\t", "\\b", "\\a", "\\f", "\\v", "\\'", '\\"', "\\\\"],
  brackets: [
    { open: "{", close: "}", token: "delimiter.curly" },
    { open: "[", close: "]", token: "delimiter.bracket" },
    { open: "(", close: ")", token: "delimiter.parenthesis" }
  ],
  tokenizer: {
    root: [
      { include: "@numbers" },
      { include: "@strings" },
      [/[{}\[\]()]/, "@brackets"],
      { include: "@operators" },
      [/#'$/, "comment.doc"],
      [/#'/, "comment.doc", "@roxygen"],
      [/(^#.*$)/, "comment"],
      [/\s+/, "white"],
      [/[,:;]/, "delimiter"],
      [/@[a-zA-Z]\w*/, "tag"],
      [
        /[a-zA-Z]\w*/,
        {
          cases: {
            "@keywords": "keyword",
            "@constants": "constant",
            "@default": "identifier"
          }
        }
      ]
    ],
    // Recognize Roxygen comments
    roxygen: [
      [
        /@\w+/,
        {
          cases: {
            "@roxygen": "tag",
            "@eos": { token: "comment.doc", next: "@pop" },
            "@default": "comment.doc"
          }
        }
      ],
      [
        /\s+/,
        {
          cases: {
            "@eos": { token: "comment.doc", next: "@pop" },
            "@default": "comment.doc"
          }
        }
      ],
      [/.*/, { token: "comment.doc", next: "@pop" }]
    ],
    // Recognize positives, negatives, decimals, imaginaries, and scientific notation
    numbers: [
      [/0[xX][0-9a-fA-F]+/, "number.hex"],
      [/-?(\d*\.)?\d+([eE][+\-]?\d+)?/, "number"]
    ],
    // Recognize operators
    operators: [
      [/<{1,2}-/, "operator"],
      [/->{1,2}/, "operator"],
      [/%[^%\s]+%/, "operator"],
      [/\*\*/, "operator"],
      [/%%/, "operator"],
      [/&&/, "operator"],
      [/\|\|/, "operator"],
      [/<</, "operator"],
      [/>>/, "operator"],
      [/[-+=&|!<>^~*/:$]/, "operator"]
    ],
    // Recognize strings, including those broken across lines
    strings: [
      [/'/, "string.escape", "@stringBody"],
      [/"/, "string.escape", "@dblStringBody"]
    ],
    stringBody: [
      [
        /\\./,
        {
          cases: {
            "@special": "string",
            "@default": "error-token"
          }
        }
      ],
      [/'/, "string.escape", "@popall"],
      [/./, "string"]
    ],
    dblStringBody: [
      [
        /\\./,
        {
          cases: {
            "@special": "string",
            "@default": "error-token"
          }
        }
      ],
      [/"/, "string.escape", "@popall"],
      [/./, "string"]
    ]
  }
};



/***/ })

}]);
//# sourceMappingURL=monaco-language-r.54e54b10.js.90dca1c7.map