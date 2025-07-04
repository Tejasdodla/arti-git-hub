"use strict";
(self["webpackChunkforgejo"] = self["webpackChunkforgejo"] || []).push([["node_modules_monaco-editor_esm_vs_basic-languages_typespec_typespec_js"],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/typespec/typespec.js":
/*!********************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/typespec/typespec.js ***!
  \********************************************************************************/
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


// src/basic-languages/typespec/typespec.ts
var bounded = (text) => `\\b${text}\\b`;
var notBefore = (regex) => `(?!${regex})`;
var identifierStart = "[_a-zA-Z]";
var identifierContinue = "[_a-zA-Z0-9]";
var identifier = bounded(`${identifierStart}${identifierContinue}*`);
var directive = bounded(`[_a-zA-Z-0-9]+`);
var keywords = [
  "import",
  "model",
  "scalar",
  "namespace",
  "op",
  "interface",
  "union",
  "using",
  "is",
  "extends",
  "enum",
  "alias",
  "return",
  "void",
  "if",
  "else",
  "projection",
  "dec",
  "extern",
  "fn"
];
var namedLiterals = ["true", "false", "null", "unknown", "never"];
var nonCommentWs = `[ \\t\\r\\n]`;
var numericLiteral = `[0-9]+`;
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
    { open: '"', close: '"' },
    { open: "/**", close: " */", notIn: ["string"] }
  ],
  surroundingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: '"', close: '"' }
  ],
  indentationRules: {
    decreaseIndentPattern: new RegExp("^((?!.*?/\\*).*\\*/)?\\s*[\\}\\]].*$"),
    increaseIndentPattern: new RegExp(
      "^((?!//).)*(\\{([^}\"'`/]*|(\\t|[ ])*//.*)|\\([^)\"'`/]*|\\[[^\\]\"'`/]*)$"
    ),
    // e.g.  * ...| or */| or *-----*/|
    unIndentedLinePattern: new RegExp(
      "^(\\t|[ ])*[ ]\\*[^/]*\\*/\\s*$|^(\\t|[ ])*[ ]\\*/\\s*$|^(\\t|[ ])*[ ]\\*([ ]([^\\*]|\\*(?!/))*)?$"
    )
  }
};
var language = {
  defaultToken: "",
  tokenPostfix: ".tsp",
  brackets: [
    { open: "{", close: "}", token: "delimiter.curly" },
    { open: "[", close: "]", token: "delimiter.square" },
    { open: "(", close: ")", token: "delimiter.parenthesis" }
  ],
  symbols: /[=:;<>]+/,
  keywords,
  namedLiterals,
  escapes: `\\\\(u{[0-9A-Fa-f]+}|n|r|t|\\\\|"|\\\${)`,
  tokenizer: {
    root: [{ include: "@expression" }, { include: "@whitespace" }],
    stringVerbatim: [
      { regex: `(|"|"")[^"]`, action: { token: "string" } },
      { regex: `"""${notBefore(`"`)}`, action: { token: "string", next: "@pop" } }
    ],
    stringLiteral: [
      { regex: `\\\${`, action: { token: "delimiter.bracket", next: "@bracketCounting" } },
      { regex: `[^\\\\"$]+`, action: { token: "string" } },
      { regex: "@escapes", action: { token: "string.escape" } },
      { regex: `\\\\.`, action: { token: "string.escape.invalid" } },
      { regex: `"`, action: { token: "string", next: "@pop" } }
    ],
    bracketCounting: [
      { regex: `{`, action: { token: "delimiter.bracket", next: "@bracketCounting" } },
      { regex: `}`, action: { token: "delimiter.bracket", next: "@pop" } },
      { include: "@expression" }
    ],
    comment: [
      { regex: `[^\\*]+`, action: { token: "comment" } },
      { regex: `\\*\\/`, action: { token: "comment", next: "@pop" } },
      { regex: `[\\/*]`, action: { token: "comment" } }
    ],
    whitespace: [
      { regex: nonCommentWs },
      { regex: `\\/\\*`, action: { token: "comment", next: "@comment" } },
      { regex: `\\/\\/.*$`, action: { token: "comment" } }
    ],
    expression: [
      { regex: `"""`, action: { token: "string", next: "@stringVerbatim" } },
      { regex: `"${notBefore(`""`)}`, action: { token: "string", next: "@stringLiteral" } },
      { regex: numericLiteral, action: { token: "number" } },
      {
        regex: identifier,
        action: {
          cases: {
            "@keywords": { token: "keyword" },
            "@namedLiterals": { token: "keyword" },
            "@default": { token: "identifier" }
          }
        }
      },
      { regex: `@${identifier}`, action: { token: "tag" } },
      { regex: `#${directive}`, action: { token: "directive" } }
    ]
  }
};



/***/ })

}]);
//# sourceMappingURL=monaco-language-typespec.50195094.js.7e2102d4.map