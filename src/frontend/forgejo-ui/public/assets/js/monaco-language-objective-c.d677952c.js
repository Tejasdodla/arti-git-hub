"use strict";
(self["webpackChunkforgejo"] = self["webpackChunkforgejo"] || []).push([["node_modules_monaco-editor_esm_vs_basic-languages_objective-c_objective-c_js"],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/objective-c/objective-c.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/objective-c/objective-c.js ***!
  \**************************************************************************************/
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


// src/basic-languages/objective-c/objective-c.ts
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
    { open: "'", close: "'" }
  ],
  surroundingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: '"', close: '"' },
    { open: "'", close: "'" }
  ]
};
var language = {
  defaultToken: "",
  tokenPostfix: ".objective-c",
  keywords: [
    "#import",
    "#include",
    "#define",
    "#else",
    "#endif",
    "#if",
    "#ifdef",
    "#ifndef",
    "#ident",
    "#undef",
    "@class",
    "@defs",
    "@dynamic",
    "@encode",
    "@end",
    "@implementation",
    "@interface",
    "@package",
    "@private",
    "@protected",
    "@property",
    "@protocol",
    "@public",
    "@selector",
    "@synthesize",
    "__declspec",
    "assign",
    "auto",
    "BOOL",
    "break",
    "bycopy",
    "byref",
    "case",
    "char",
    "Class",
    "const",
    "copy",
    "continue",
    "default",
    "do",
    "double",
    "else",
    "enum",
    "extern",
    "FALSE",
    "false",
    "float",
    "for",
    "goto",
    "if",
    "in",
    "int",
    "id",
    "inout",
    "IMP",
    "long",
    "nil",
    "nonatomic",
    "NULL",
    "oneway",
    "out",
    "private",
    "public",
    "protected",
    "readwrite",
    "readonly",
    "register",
    "return",
    "SEL",
    "self",
    "short",
    "signed",
    "sizeof",
    "static",
    "struct",
    "super",
    "switch",
    "typedef",
    "TRUE",
    "true",
    "union",
    "unsigned",
    "volatile",
    "void",
    "while"
  ],
  decpart: /\d(_?\d)*/,
  decimal: /0|@decpart/,
  tokenizer: {
    root: [
      { include: "@comments" },
      { include: "@whitespace" },
      { include: "@numbers" },
      { include: "@strings" },
      [/[,:;]/, "delimiter"],
      [/[{}\[\]()<>]/, "@brackets"],
      [
        /[a-zA-Z@#]\w*/,
        {
          cases: {
            "@keywords": "keyword",
            "@default": "identifier"
          }
        }
      ],
      [/[<>=\\+\\-\\*\\/\\^\\|\\~,]|and\\b|or\\b|not\\b]/, "operator"]
    ],
    whitespace: [[/\s+/, "white"]],
    comments: [
      ["\\/\\*", "comment", "@comment"],
      ["\\/\\/+.*", "comment"]
    ],
    comment: [
      ["\\*\\/", "comment", "@pop"],
      [".", "comment"]
    ],
    numbers: [
      [/0[xX][0-9a-fA-F]*(_?[0-9a-fA-F])*/, "number.hex"],
      [
        /@decimal((\.@decpart)?([eE][\-+]?@decpart)?)[fF]*/,
        {
          cases: {
            "(\\d)*": "number",
            $0: "number.float"
          }
        }
      ]
    ],
    // Recognize strings, including those broken across lines with \ (but not without)
    strings: [
      [/'$/, "string.escape", "@popall"],
      [/'/, "string.escape", "@stringBody"],
      [/"$/, "string.escape", "@popall"],
      [/"/, "string.escape", "@dblStringBody"]
    ],
    stringBody: [
      [/[^\\']+$/, "string", "@popall"],
      [/[^\\']+/, "string"],
      [/\\./, "string"],
      [/'/, "string.escape", "@popall"],
      [/\\$/, "string"]
    ],
    dblStringBody: [
      [/[^\\"]+$/, "string", "@popall"],
      [/[^\\"]+/, "string"],
      [/\\./, "string"],
      [/"/, "string.escape", "@popall"],
      [/\\$/, "string"]
    ]
  }
};



/***/ })

}]);
//# sourceMappingURL=monaco-language-objective-c.d677952c.js.e51d3f08.map