"use strict";
(self["webpackChunkforgejo"] = self["webpackChunkforgejo"] || []).push([["node_modules_monaco-editor_esm_vs_basic-languages_powershell_powershell_js"],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/powershell/powershell.js":
/*!************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/powershell/powershell.js ***!
  \************************************************************************************/
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


// src/basic-languages/powershell/powershell.ts
var conf = {
  // the default separators except `$-`
  wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\@\#%\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
  comments: {
    lineComment: "#",
    blockComment: ["<#", "#>"]
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
    { open: '"', close: '"', notIn: ["string"] },
    { open: "'", close: "'", notIn: ["string", "comment"] }
  ],
  surroundingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: '"', close: '"' },
    { open: "'", close: "'" }
  ],
  folding: {
    markers: {
      start: new RegExp("^\\s*#region\\b"),
      end: new RegExp("^\\s*#endregion\\b")
    }
  }
};
var language = {
  defaultToken: "",
  ignoreCase: true,
  tokenPostfix: ".ps1",
  brackets: [
    { token: "delimiter.curly", open: "{", close: "}" },
    { token: "delimiter.square", open: "[", close: "]" },
    { token: "delimiter.parenthesis", open: "(", close: ")" }
  ],
  keywords: [
    "begin",
    "break",
    "catch",
    "class",
    "continue",
    "data",
    "define",
    "do",
    "dynamicparam",
    "else",
    "elseif",
    "end",
    "exit",
    "filter",
    "finally",
    "for",
    "foreach",
    "from",
    "function",
    "if",
    "in",
    "param",
    "process",
    "return",
    "switch",
    "throw",
    "trap",
    "try",
    "until",
    "using",
    "var",
    "while",
    "workflow",
    "parallel",
    "sequence",
    "inlinescript",
    "configuration"
  ],
  helpKeywords: /SYNOPSIS|DESCRIPTION|PARAMETER|EXAMPLE|INPUTS|OUTPUTS|NOTES|LINK|COMPONENT|ROLE|FUNCTIONALITY|FORWARDHELPTARGETNAME|FORWARDHELPCATEGORY|REMOTEHELPRUNSPACE|EXTERNALHELP/,
  // we include these common regular expressions
  symbols: /[=><!~?&%|+\-*\/\^;\.,]+/,
  escapes: /`(?:[abfnrtv\\"'$]|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
  // The main tokenizer for our languages
  tokenizer: {
    root: [
      // commands and keywords
      [
        /[a-zA-Z_][\w-]*/,
        {
          cases: {
            "@keywords": { token: "keyword.$0" },
            "@default": ""
          }
        }
      ],
      // whitespace
      [/[ \t\r\n]+/, ""],
      // labels
      [/^:\w*/, "metatag"],
      // variables
      [
        /\$(\{((global|local|private|script|using):)?[\w]+\}|((global|local|private|script|using):)?[\w]+)/,
        "variable"
      ],
      // Comments
      [/<#/, "comment", "@comment"],
      [/#.*$/, "comment"],
      // delimiters
      [/[{}()\[\]]/, "@brackets"],
      [/@symbols/, "delimiter"],
      // numbers
      [/\d*\.\d+([eE][\-+]?\d+)?/, "number.float"],
      [/0[xX][0-9a-fA-F_]*[0-9a-fA-F]/, "number.hex"],
      [/\d+?/, "number"],
      // delimiter: after number because of .\d floats
      [/[;,.]/, "delimiter"],
      // strings:
      [/\@"/, "string", '@herestring."'],
      [/\@'/, "string", "@herestring.'"],
      [
        /"/,
        {
          cases: {
            "@eos": "string",
            "@default": { token: "string", next: '@string."' }
          }
        }
      ],
      [
        /'/,
        {
          cases: {
            "@eos": "string",
            "@default": { token: "string", next: "@string.'" }
          }
        }
      ]
    ],
    string: [
      [
        /[^"'\$`]+/,
        {
          cases: {
            "@eos": { token: "string", next: "@popall" },
            "@default": "string"
          }
        }
      ],
      [
        /@escapes/,
        {
          cases: {
            "@eos": { token: "string.escape", next: "@popall" },
            "@default": "string.escape"
          }
        }
      ],
      [
        /`./,
        {
          cases: {
            "@eos": {
              token: "string.escape.invalid",
              next: "@popall"
            },
            "@default": "string.escape.invalid"
          }
        }
      ],
      [
        /\$[\w]+$/,
        {
          cases: {
            '$S2=="': { token: "variable", next: "@popall" },
            "@default": { token: "string", next: "@popall" }
          }
        }
      ],
      [
        /\$[\w]+/,
        {
          cases: {
            '$S2=="': "variable",
            "@default": "string"
          }
        }
      ],
      [
        /["']/,
        {
          cases: {
            "$#==$S2": { token: "string", next: "@pop" },
            "@default": {
              cases: {
                "@eos": { token: "string", next: "@popall" },
                "@default": "string"
              }
            }
          }
        }
      ]
    ],
    herestring: [
      [
        /^\s*(["'])@/,
        {
          cases: {
            "$1==$S2": { token: "string", next: "@pop" },
            "@default": "string"
          }
        }
      ],
      [/[^\$`]+/, "string"],
      [/@escapes/, "string.escape"],
      [/`./, "string.escape.invalid"],
      [
        /\$[\w]+/,
        {
          cases: {
            '$S2=="': "variable",
            "@default": "string"
          }
        }
      ]
    ],
    comment: [
      [/[^#\.]+/, "comment"],
      [/#>/, "comment", "@pop"],
      [/(\.)(@helpKeywords)(?!\w)/, { token: "comment.keyword.$2" }],
      [/[\.#]/, "comment"]
    ]
  }
};



/***/ })

}]);
//# sourceMappingURL=monaco-language-powershell.c2254888.js.907d5437.map