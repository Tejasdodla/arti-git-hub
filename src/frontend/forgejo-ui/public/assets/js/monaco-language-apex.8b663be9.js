"use strict";
(self["webpackChunkforgejo"] = self["webpackChunkforgejo"] || []).push([["node_modules_monaco-editor_esm_vs_basic-languages_apex_apex_js"],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/apex/apex.js":
/*!************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/apex/apex.js ***!
  \************************************************************************/
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


// src/basic-languages/apex/apex.ts
var conf = {
  // the default separators except `@$`
  wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
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
    { open: "'", close: "'" },
    { open: "<", close: ">" }
  ],
  folding: {
    markers: {
      start: new RegExp("^\\s*//\\s*(?:(?:#?region\\b)|(?:<editor-fold\\b))"),
      end: new RegExp("^\\s*//\\s*(?:(?:#?endregion\\b)|(?:</editor-fold>))")
    }
  }
};
var keywords = [
  "abstract",
  "activate",
  "and",
  "any",
  "array",
  "as",
  "asc",
  "assert",
  "autonomous",
  "begin",
  "bigdecimal",
  "blob",
  "boolean",
  "break",
  "bulk",
  "by",
  "case",
  "cast",
  "catch",
  "char",
  "class",
  "collect",
  "commit",
  "const",
  "continue",
  "convertcurrency",
  "decimal",
  "default",
  "delete",
  "desc",
  "do",
  "double",
  "else",
  "end",
  "enum",
  "exception",
  "exit",
  "export",
  "extends",
  "false",
  "final",
  "finally",
  "float",
  "for",
  "from",
  "future",
  "get",
  "global",
  "goto",
  "group",
  "having",
  "hint",
  "if",
  "implements",
  "import",
  "in",
  "inner",
  "insert",
  "instanceof",
  "int",
  "interface",
  "into",
  "join",
  "last_90_days",
  "last_month",
  "last_n_days",
  "last_week",
  "like",
  "limit",
  "list",
  "long",
  "loop",
  "map",
  "merge",
  "native",
  "new",
  "next_90_days",
  "next_month",
  "next_n_days",
  "next_week",
  "not",
  "null",
  "nulls",
  "number",
  "object",
  "of",
  "on",
  "or",
  "outer",
  "override",
  "package",
  "parallel",
  "pragma",
  "private",
  "protected",
  "public",
  "retrieve",
  "return",
  "returning",
  "rollback",
  "savepoint",
  "search",
  "select",
  "set",
  "short",
  "sort",
  "stat",
  "static",
  "strictfp",
  "super",
  "switch",
  "synchronized",
  "system",
  "testmethod",
  "then",
  "this",
  "this_month",
  "this_week",
  "throw",
  "throws",
  "today",
  "tolabel",
  "tomorrow",
  "transaction",
  "transient",
  "trigger",
  "true",
  "try",
  "type",
  "undelete",
  "update",
  "upsert",
  "using",
  "virtual",
  "void",
  "volatile",
  "webservice",
  "when",
  "where",
  "while",
  "yesterday"
];
var uppercaseFirstLetter = (lowercase) => lowercase.charAt(0).toUpperCase() + lowercase.substr(1);
var keywordsWithCaseVariations = [];
keywords.forEach((lowercase) => {
  keywordsWithCaseVariations.push(lowercase);
  keywordsWithCaseVariations.push(lowercase.toUpperCase());
  keywordsWithCaseVariations.push(uppercaseFirstLetter(lowercase));
});
var language = {
  defaultToken: "",
  tokenPostfix: ".apex",
  keywords: keywordsWithCaseVariations,
  operators: [
    "=",
    ">",
    "<",
    "!",
    "~",
    "?",
    ":",
    "==",
    "<=",
    ">=",
    "!=",
    "&&",
    "||",
    "++",
    "--",
    "+",
    "-",
    "*",
    "/",
    "&",
    "|",
    "^",
    "%",
    "<<",
    ">>",
    ">>>",
    "+=",
    "-=",
    "*=",
    "/=",
    "&=",
    "|=",
    "^=",
    "%=",
    "<<=",
    ">>=",
    ">>>="
  ],
  // we include these common regular expressions
  symbols: /[=><!~?:&|+\-*\/\^%]+/,
  escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
  digits: /\d+(_+\d+)*/,
  octaldigits: /[0-7]+(_+[0-7]+)*/,
  binarydigits: /[0-1]+(_+[0-1]+)*/,
  hexdigits: /[[0-9a-fA-F]+(_+[0-9a-fA-F]+)*/,
  // The main tokenizer for our languages
  tokenizer: {
    root: [
      // identifiers and keywords
      [
        /[a-z_$][\w$]*/,
        {
          cases: {
            "@keywords": { token: "keyword.$0" },
            "@default": "identifier"
          }
        }
      ],
      // assume that identifiers starting with an uppercase letter are types
      [
        /[A-Z][\w\$]*/,
        {
          cases: {
            "@keywords": { token: "keyword.$0" },
            "@default": "type.identifier"
          }
        }
      ],
      // whitespace
      { include: "@whitespace" },
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
      // @ annotations.
      [/@\s*[a-zA-Z_\$][\w\$]*/, "annotation"],
      // numbers
      [/(@digits)[eE]([\-+]?(@digits))?[fFdD]?/, "number.float"],
      [/(@digits)\.(@digits)([eE][\-+]?(@digits))?[fFdD]?/, "number.float"],
      [/(@digits)[fFdD]/, "number.float"],
      [/(@digits)[lL]?/, "number"],
      // delimiter: after number because of .\d floats
      [/[;,.]/, "delimiter"],
      // strings
      [/"([^"\\]|\\.)*$/, "string.invalid"],
      // non-teminated string
      [/'([^'\\]|\\.)*$/, "string.invalid"],
      // non-teminated string
      [/"/, "string", '@string."'],
      [/'/, "string", "@string.'"],
      // characters
      [/'[^\\']'/, "string"],
      [/(')(@escapes)(')/, ["string", "string.escape", "string"]],
      [/'/, "string.invalid"]
    ],
    whitespace: [
      [/[ \t\r\n]+/, ""],
      [/\/\*\*(?!\/)/, "comment.doc", "@apexdoc"],
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
    apexdoc: [
      [/[^\/*]+/, "comment.doc"],
      [/\*\//, "comment.doc", "@pop"],
      [/[\/*]/, "comment.doc"]
    ],
    string: [
      [/[^\\"']+/, "string"],
      [/@escapes/, "string.escape"],
      [/\\./, "string.escape.invalid"],
      [
        /["']/,
        {
          cases: {
            "$#==$S2": { token: "string", next: "@pop" },
            "@default": "string"
          }
        }
      ]
    ]
  }
};



/***/ })

}]);
//# sourceMappingURL=monaco-language-apex.8b663be9.js.9848c237.map