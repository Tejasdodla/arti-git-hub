"use strict";
(self["webpackChunkforgejo"] = self["webpackChunkforgejo"] || []).push([["node_modules_monaco-editor_esm_vs_basic-languages_go_go_js"],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/go/go.js":
/*!********************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/go/go.js ***!
  \********************************************************************/
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


// src/basic-languages/go/go.ts
var conf = {
  comments: {
    lineComment: "//",
    blockComment: ["/*", "*/"]
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
    { open: "`", close: "`", notIn: ["string"] },
    { open: '"', close: '"', notIn: ["string"] },
    { open: "'", close: "'", notIn: ["string", "comment"] }
  ],
  surroundingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: "`", close: "`" },
    { open: '"', close: '"' },
    { open: "'", close: "'" }
  ]
};
var language = {
  defaultToken: "",
  tokenPostfix: ".go",
  keywords: [
    "break",
    "case",
    "chan",
    "const",
    "continue",
    "default",
    "defer",
    "else",
    "fallthrough",
    "for",
    "func",
    "go",
    "goto",
    "if",
    "import",
    "interface",
    "map",
    "package",
    "range",
    "return",
    "select",
    "struct",
    "switch",
    "type",
    "var",
    "bool",
    "true",
    "false",
    "uint8",
    "uint16",
    "uint32",
    "uint64",
    "int8",
    "int16",
    "int32",
    "int64",
    "float32",
    "float64",
    "complex64",
    "complex128",
    "byte",
    "rune",
    "uint",
    "int",
    "uintptr",
    "string",
    "nil"
  ],
  operators: [
    "+",
    "-",
    "*",
    "/",
    "%",
    "&",
    "|",
    "^",
    "<<",
    ">>",
    "&^",
    "+=",
    "-=",
    "*=",
    "/=",
    "%=",
    "&=",
    "|=",
    "^=",
    "<<=",
    ">>=",
    "&^=",
    "&&",
    "||",
    "<-",
    "++",
    "--",
    "==",
    "<",
    ">",
    "=",
    "!",
    "!=",
    "<=",
    ">=",
    ":=",
    "...",
    "(",
    ")",
    "",
    "]",
    "{",
    "}",
    ",",
    ";",
    ".",
    ":"
  ],
  // we include these common regular expressions
  symbols: /[=><!~?:&|+\-*\/\^%]+/,
  escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
  // The main tokenizer for our languages
  tokenizer: {
    root: [
      // identifiers and keywords
      [
        /[a-zA-Z_]\w*/,
        {
          cases: {
            "@keywords": { token: "keyword.$0" },
            "@default": "identifier"
          }
        }
      ],
      // whitespace
      { include: "@whitespace" },
      // [[ attributes ]].
      [/\[\[.*\]\]/, "annotation"],
      // Preprocessor directive
      [/^\s*#\w+/, "keyword"],
      // delimiters and operators
      [/[{}()\[\]]/, "@brackets"],
      [/[<>](?!@symbols)/, "@brackets"],
      [
        /@symbols/,
        {
          cases: {
            "@operators": "delimiter",
            "@default": ""
          }
        }
      ],
      // numbers
      [/\d*\d+[eE]([\-+]?\d+)?/, "number.float"],
      [/\d*\.\d+([eE][\-+]?\d+)?/, "number.float"],
      [/0[xX][0-9a-fA-F']*[0-9a-fA-F]/, "number.hex"],
      [/0[0-7']*[0-7]/, "number.octal"],
      [/0[bB][0-1']*[0-1]/, "number.binary"],
      [/\d[\d']*/, "number"],
      [/\d/, "number"],
      // delimiter: after number because of .\d floats
      [/[;,.]/, "delimiter"],
      // strings
      [/"([^"\\]|\\.)*$/, "string.invalid"],
      // non-teminated string
      [/"/, "string", "@string"],
      [/`/, "string", "@rawstring"],
      // characters
      [/'[^\\']'/, "string"],
      [/(')(@escapes)(')/, ["string", "string.escape", "string"]],
      [/'/, "string.invalid"]
    ],
    whitespace: [
      [/[ \t\r\n]+/, ""],
      [/\/\*\*(?!\/)/, "comment.doc", "@doccomment"],
      [/\/\*/, "comment", "@comment"],
      [/\/\/.*$/, "comment"]
    ],
    comment: [
      [/[^\/*]+/, "comment"],
      // [/\/\*/, 'comment', '@push' ],    // nested comment not allowed :-(
      // [/\/\*/,    'comment.invalid' ],    // this breaks block comments in the shape of /* //*/
      [/\*\//, "comment", "@pop"],
      [/[\/*]/, "comment"]
    ],
    //Identical copy of comment above, except for the addition of .doc
    doccomment: [
      [/[^\/*]+/, "comment.doc"],
      // [/\/\*/, 'comment.doc', '@push' ],    // nested comment not allowed :-(
      [/\/\*/, "comment.doc.invalid"],
      [/\*\//, "comment.doc", "@pop"],
      [/[\/*]/, "comment.doc"]
    ],
    string: [
      [/[^\\"]+/, "string"],
      [/@escapes/, "string.escape"],
      [/\\./, "string.escape.invalid"],
      [/"/, "string", "@pop"]
    ],
    rawstring: [
      [/[^\`]/, "string"],
      [/`/, "string", "@pop"]
    ]
  }
};



/***/ })

}]);
//# sourceMappingURL=monaco-language-go.32f0add9.js.3b5607f6.map