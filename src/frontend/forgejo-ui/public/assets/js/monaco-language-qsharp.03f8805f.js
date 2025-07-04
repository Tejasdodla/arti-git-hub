"use strict";
(self["webpackChunkforgejo"] = self["webpackChunkforgejo"] || []).push([["node_modules_monaco-editor_esm_vs_basic-languages_qsharp_qsharp_js"],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/qsharp/qsharp.js":
/*!****************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/qsharp/qsharp.js ***!
  \****************************************************************************/
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


// src/basic-languages/qsharp/qsharp.ts
var conf = {
  comments: {
    lineComment: "//"
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
    { open: '"', close: '"', notIn: ["string", "comment"] }
  ],
  surroundingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: '"', close: '"' }
  ]
};
var language = {
  // Set defaultToken to invalid to see what you do not tokenize yet
  keywords: [
    "namespace",
    "open",
    "import",
    "export",
    "as",
    "operation",
    "function",
    "body",
    "adjoint",
    "newtype",
    "struct",
    "controlled",
    "if",
    "elif",
    "else",
    "repeat",
    "until",
    "fixup",
    "for",
    "in",
    "while",
    "return",
    "fail",
    "within",
    "apply",
    "Adjoint",
    "Controlled",
    "Adj",
    "Ctl",
    "is",
    "self",
    "auto",
    "distribute",
    "invert",
    "intrinsic",
    "let",
    "set",
    "w/",
    "new",
    "not",
    "and",
    "or",
    "use",
    "borrow",
    "using",
    "borrowing",
    "mutable",
    "internal"
  ],
  typeKeywords: [
    "Unit",
    "Int",
    "BigInt",
    "Double",
    "Bool",
    "String",
    "Qubit",
    "Result",
    "Pauli",
    "Range"
  ],
  invalidKeywords: [
    "abstract",
    "base",
    "bool",
    "break",
    "byte",
    "case",
    "catch",
    "char",
    "checked",
    "class",
    "const",
    "continue",
    "decimal",
    "default",
    "delegate",
    "do",
    "double",
    "enum",
    "event",
    "explicit",
    "extern",
    "finally",
    "fixed",
    "float",
    "foreach",
    "goto",
    "implicit",
    "int",
    "interface",
    "lock",
    "long",
    "null",
    "object",
    "operator",
    "out",
    "override",
    "params",
    "private",
    "protected",
    "public",
    "readonly",
    "ref",
    "sbyte",
    "sealed",
    "short",
    "sizeof",
    "stackalloc",
    "static",
    "string",
    "switch",
    "this",
    "throw",
    "try",
    "typeof",
    "unit",
    "ulong",
    "unchecked",
    "unsafe",
    "ushort",
    "virtual",
    "void",
    "volatile"
  ],
  constants: ["true", "false", "PauliI", "PauliX", "PauliY", "PauliZ", "One", "Zero"],
  builtin: [
    "X",
    "Y",
    "Z",
    "H",
    "HY",
    "S",
    "T",
    "SWAP",
    "CNOT",
    "CCNOT",
    "MultiX",
    "R",
    "RFrac",
    "Rx",
    "Ry",
    "Rz",
    "R1",
    "R1Frac",
    "Exp",
    "ExpFrac",
    "Measure",
    "M",
    "MultiM",
    "Message",
    "Length",
    "Assert",
    "AssertProb",
    "AssertEqual"
  ],
  operators: [
    "and=",
    "<-",
    "->",
    "*",
    "*=",
    "@",
    "!",
    "^",
    "^=",
    ":",
    "::",
    ".",
    "..",
    "==",
    "...",
    "=",
    "=>",
    ">",
    ">=",
    "<",
    "<=",
    "-",
    "-=",
    "!=",
    "or=",
    "%",
    "%=",
    "|",
    "+",
    "+=",
    "?",
    "/",
    "/=",
    "&&&",
    "&&&=",
    "^^^",
    "^^^=",
    ">>>",
    ">>>=",
    "<<<",
    "<<<=",
    "|||",
    "|||=",
    "~~~",
    "_",
    "w/",
    "w/="
  ],
  namespaceFollows: ["namespace", "open"],
  importsFollows: ["import"],
  symbols: /[=><!~?:&|+\-*\/\^%@._]+/,
  escapes: /\\[\s\S]/,
  // The main tokenizer for our languages
  tokenizer: {
    root: [
      // identifiers and keywords
      [
        /[a-zA-Z_$][\w$]*/,
        {
          cases: {
            "@namespaceFollows": {
              token: "keyword.$0",
              next: "@namespace"
            },
            "@importsFollows": {
              token: "keyword.$0",
              next: "@imports"
            },
            "@typeKeywords": "type",
            "@keywords": "keyword",
            "@constants": "constant",
            "@builtin": "keyword",
            "@invalidKeywords": "invalid",
            "@default": "identifier"
          }
        }
      ],
      // whitespace
      { include: "@whitespace" },
      // delimiters and operators
      [/[{}()\[\]]/, "@brackets"],
      [/@symbols/, { cases: { "@operators": "operator", "@default": "" } }],
      // numbers
      [/\d*\.\d+([eE][\-+]?\d+)?/, "number.float"],
      [/\d+/, "number"],
      // delimiter: after number because of .\d floats
      [/[;,.]/, "delimiter"],
      // strings
      //[/"([^"\\]|\\.)*$/, 'string.invalid' ],  // non-terminated string
      [/"/, { token: "string.quote", bracket: "@open", next: "@string" }]
    ],
    string: [
      [/[^\\"]+/, "string"],
      [/@escapes/, "string.escape"],
      [/"/, { token: "string.quote", bracket: "@close", next: "@pop" }]
    ],
    namespace: [
      { include: "@whitespace" },
      [/[A-Za-z]\w*/, "namespace"],
      [/[\.]/, "delimiter"],
      ["", "", "@pop"]
    ],
    imports: [
      { include: "@whitespace" },
      [/[A-Za-z]\w*(?=\.)/, "namespace"],
      [/[A-Za-z]\w*/, "identifier"],
      [/\*/, "wildcard"],
      [/[\.,]/, "delimiter"],
      ["", "", "@pop"]
    ],
    whitespace: [
      [/[ \t\r\n]+/, "white"],
      [/(\/\/).*/, "comment"]
    ]
  }
};



/***/ })

}]);
//# sourceMappingURL=monaco-language-qsharp.03f8805f.js.b42227ed.map