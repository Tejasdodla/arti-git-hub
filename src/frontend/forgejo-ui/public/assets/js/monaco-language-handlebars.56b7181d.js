"use strict";
(self["webpackChunkforgejo"] = self["webpackChunkforgejo"] || []).push([["vendors-node_modules_monaco-editor_esm_vs_basic-languages_handlebars_handlebars_js"],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/handlebars/handlebars.js":
/*!************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/handlebars/handlebars.js ***!
  \************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   conf: function() { return /* binding */ conf; },
/* harmony export */   language: function() { return /* binding */ language; }
/* harmony export */ });
/* harmony import */ var _editor_editor_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../editor/editor.api.js */ "include-loader!./node_modules/monaco-editor/esm/vs/editor/editor.api.js");
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.52.2(404545bded1df6ffa41ea0af4e8ddb219018c6c1)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));

// src/fillers/monaco-editor-core.ts
var monaco_editor_core_exports = {};
__reExport(monaco_editor_core_exports, _editor_editor_api_js__WEBPACK_IMPORTED_MODULE_0__);


// src/basic-languages/handlebars/handlebars.ts
var EMPTY_ELEMENTS = [
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "keygen",
  "link",
  "menuitem",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
];
var conf = {
  wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]+)/g,
  comments: {
    blockComment: ["{{!--", "--}}"]
  },
  brackets: [
    ["<!--", "-->"],
    ["<", ">"],
    ["{{", "}}"],
    ["{", "}"],
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
    { open: "<", close: ">" },
    { open: '"', close: '"' },
    { open: "'", close: "'" }
  ],
  onEnterRules: [
    {
      beforeText: new RegExp(
        `<(?!(?:${EMPTY_ELEMENTS.join("|")}))(\\w[\\w\\d]*)([^/>]*(?!/)>)[^<]*$`,
        "i"
      ),
      afterText: /^<\/(\w[\w\d]*)\s*>$/i,
      action: {
        indentAction: monaco_editor_core_exports.languages.IndentAction.IndentOutdent
      }
    },
    {
      beforeText: new RegExp(
        `<(?!(?:${EMPTY_ELEMENTS.join("|")}))(\\w[\\w\\d]*)([^/>]*(?!/)>)[^<]*$`,
        "i"
      ),
      action: { indentAction: monaco_editor_core_exports.languages.IndentAction.Indent }
    }
  ]
};
var language = {
  defaultToken: "",
  tokenPostfix: "",
  // ignoreCase: true,
  // The main tokenizer for our languages
  tokenizer: {
    root: [
      [/\{\{!--/, "comment.block.start.handlebars", "@commentBlock"],
      [/\{\{!/, "comment.start.handlebars", "@comment"],
      [/\{\{/, { token: "@rematch", switchTo: "@handlebarsInSimpleState.root" }],
      [/<!DOCTYPE/, "metatag.html", "@doctype"],
      [/<!--/, "comment.html", "@commentHtml"],
      [/(<)(\w+)(\/>)/, ["delimiter.html", "tag.html", "delimiter.html"]],
      [/(<)(script)/, ["delimiter.html", { token: "tag.html", next: "@script" }]],
      [/(<)(style)/, ["delimiter.html", { token: "tag.html", next: "@style" }]],
      [/(<)([:\w]+)/, ["delimiter.html", { token: "tag.html", next: "@otherTag" }]],
      [/(<\/)(\w+)/, ["delimiter.html", { token: "tag.html", next: "@otherTag" }]],
      [/</, "delimiter.html"],
      [/\{/, "delimiter.html"],
      [/[^<{]+/]
      // text
    ],
    doctype: [
      [
        /\{\{/,
        {
          token: "@rematch",
          switchTo: "@handlebarsInSimpleState.comment"
        }
      ],
      [/[^>]+/, "metatag.content.html"],
      [/>/, "metatag.html", "@pop"]
    ],
    comment: [
      [/\}\}/, "comment.end.handlebars", "@pop"],
      [/./, "comment.content.handlebars"]
    ],
    commentBlock: [
      [/--\}\}/, "comment.block.end.handlebars", "@pop"],
      [/./, "comment.content.handlebars"]
    ],
    commentHtml: [
      [
        /\{\{/,
        {
          token: "@rematch",
          switchTo: "@handlebarsInSimpleState.comment"
        }
      ],
      [/-->/, "comment.html", "@pop"],
      [/[^-]+/, "comment.content.html"],
      [/./, "comment.content.html"]
    ],
    otherTag: [
      [
        /\{\{/,
        {
          token: "@rematch",
          switchTo: "@handlebarsInSimpleState.otherTag"
        }
      ],
      [/\/?>/, "delimiter.html", "@pop"],
      [/"([^"]*)"/, "attribute.value"],
      [/'([^']*)'/, "attribute.value"],
      [/[\w\-]+/, "attribute.name"],
      [/=/, "delimiter"],
      [/[ \t\r\n]+/]
      // whitespace
    ],
    // -- BEGIN <script> tags handling
    // After <script
    script: [
      [
        /\{\{/,
        {
          token: "@rematch",
          switchTo: "@handlebarsInSimpleState.script"
        }
      ],
      [/type/, "attribute.name", "@scriptAfterType"],
      [/"([^"]*)"/, "attribute.value"],
      [/'([^']*)'/, "attribute.value"],
      [/[\w\-]+/, "attribute.name"],
      [/=/, "delimiter"],
      [
        />/,
        {
          token: "delimiter.html",
          next: "@scriptEmbedded.text/javascript",
          nextEmbedded: "text/javascript"
        }
      ],
      [/[ \t\r\n]+/],
      // whitespace
      [
        /(<\/)(script\s*)(>)/,
        ["delimiter.html", "tag.html", { token: "delimiter.html", next: "@pop" }]
      ]
    ],
    // After <script ... type
    scriptAfterType: [
      [
        /\{\{/,
        {
          token: "@rematch",
          switchTo: "@handlebarsInSimpleState.scriptAfterType"
        }
      ],
      [/=/, "delimiter", "@scriptAfterTypeEquals"],
      [
        />/,
        {
          token: "delimiter.html",
          next: "@scriptEmbedded.text/javascript",
          nextEmbedded: "text/javascript"
        }
      ],
      // cover invalid e.g. <script type>
      [/[ \t\r\n]+/],
      // whitespace
      [/<\/script\s*>/, { token: "@rematch", next: "@pop" }]
    ],
    // After <script ... type =
    scriptAfterTypeEquals: [
      [
        /\{\{/,
        {
          token: "@rematch",
          switchTo: "@handlebarsInSimpleState.scriptAfterTypeEquals"
        }
      ],
      [
        /"([^"]*)"/,
        {
          token: "attribute.value",
          switchTo: "@scriptWithCustomType.$1"
        }
      ],
      [
        /'([^']*)'/,
        {
          token: "attribute.value",
          switchTo: "@scriptWithCustomType.$1"
        }
      ],
      [
        />/,
        {
          token: "delimiter.html",
          next: "@scriptEmbedded.text/javascript",
          nextEmbedded: "text/javascript"
        }
      ],
      // cover invalid e.g. <script type=>
      [/[ \t\r\n]+/],
      // whitespace
      [/<\/script\s*>/, { token: "@rematch", next: "@pop" }]
    ],
    // After <script ... type = $S2
    scriptWithCustomType: [
      [
        /\{\{/,
        {
          token: "@rematch",
          switchTo: "@handlebarsInSimpleState.scriptWithCustomType.$S2"
        }
      ],
      [
        />/,
        {
          token: "delimiter.html",
          next: "@scriptEmbedded.$S2",
          nextEmbedded: "$S2"
        }
      ],
      [/"([^"]*)"/, "attribute.value"],
      [/'([^']*)'/, "attribute.value"],
      [/[\w\-]+/, "attribute.name"],
      [/=/, "delimiter"],
      [/[ \t\r\n]+/],
      // whitespace
      [/<\/script\s*>/, { token: "@rematch", next: "@pop" }]
    ],
    scriptEmbedded: [
      [
        /\{\{/,
        {
          token: "@rematch",
          switchTo: "@handlebarsInEmbeddedState.scriptEmbedded.$S2",
          nextEmbedded: "@pop"
        }
      ],
      [/<\/script/, { token: "@rematch", next: "@pop", nextEmbedded: "@pop" }]
    ],
    // -- END <script> tags handling
    // -- BEGIN <style> tags handling
    // After <style
    style: [
      [
        /\{\{/,
        {
          token: "@rematch",
          switchTo: "@handlebarsInSimpleState.style"
        }
      ],
      [/type/, "attribute.name", "@styleAfterType"],
      [/"([^"]*)"/, "attribute.value"],
      [/'([^']*)'/, "attribute.value"],
      [/[\w\-]+/, "attribute.name"],
      [/=/, "delimiter"],
      [
        />/,
        {
          token: "delimiter.html",
          next: "@styleEmbedded.text/css",
          nextEmbedded: "text/css"
        }
      ],
      [/[ \t\r\n]+/],
      // whitespace
      [
        /(<\/)(style\s*)(>)/,
        ["delimiter.html", "tag.html", { token: "delimiter.html", next: "@pop" }]
      ]
    ],
    // After <style ... type
    styleAfterType: [
      [
        /\{\{/,
        {
          token: "@rematch",
          switchTo: "@handlebarsInSimpleState.styleAfterType"
        }
      ],
      [/=/, "delimiter", "@styleAfterTypeEquals"],
      [
        />/,
        {
          token: "delimiter.html",
          next: "@styleEmbedded.text/css",
          nextEmbedded: "text/css"
        }
      ],
      // cover invalid e.g. <style type>
      [/[ \t\r\n]+/],
      // whitespace
      [/<\/style\s*>/, { token: "@rematch", next: "@pop" }]
    ],
    // After <style ... type =
    styleAfterTypeEquals: [
      [
        /\{\{/,
        {
          token: "@rematch",
          switchTo: "@handlebarsInSimpleState.styleAfterTypeEquals"
        }
      ],
      [
        /"([^"]*)"/,
        {
          token: "attribute.value",
          switchTo: "@styleWithCustomType.$1"
        }
      ],
      [
        /'([^']*)'/,
        {
          token: "attribute.value",
          switchTo: "@styleWithCustomType.$1"
        }
      ],
      [
        />/,
        {
          token: "delimiter.html",
          next: "@styleEmbedded.text/css",
          nextEmbedded: "text/css"
        }
      ],
      // cover invalid e.g. <style type=>
      [/[ \t\r\n]+/],
      // whitespace
      [/<\/style\s*>/, { token: "@rematch", next: "@pop" }]
    ],
    // After <style ... type = $S2
    styleWithCustomType: [
      [
        /\{\{/,
        {
          token: "@rematch",
          switchTo: "@handlebarsInSimpleState.styleWithCustomType.$S2"
        }
      ],
      [
        />/,
        {
          token: "delimiter.html",
          next: "@styleEmbedded.$S2",
          nextEmbedded: "$S2"
        }
      ],
      [/"([^"]*)"/, "attribute.value"],
      [/'([^']*)'/, "attribute.value"],
      [/[\w\-]+/, "attribute.name"],
      [/=/, "delimiter"],
      [/[ \t\r\n]+/],
      // whitespace
      [/<\/style\s*>/, { token: "@rematch", next: "@pop" }]
    ],
    styleEmbedded: [
      [
        /\{\{/,
        {
          token: "@rematch",
          switchTo: "@handlebarsInEmbeddedState.styleEmbedded.$S2",
          nextEmbedded: "@pop"
        }
      ],
      [/<\/style/, { token: "@rematch", next: "@pop", nextEmbedded: "@pop" }]
    ],
    // -- END <style> tags handling
    handlebarsInSimpleState: [
      [/\{\{\{?/, "delimiter.handlebars"],
      [/\}\}\}?/, { token: "delimiter.handlebars", switchTo: "@$S2.$S3" }],
      { include: "handlebarsRoot" }
    ],
    handlebarsInEmbeddedState: [
      [/\{\{\{?/, "delimiter.handlebars"],
      [
        /\}\}\}?/,
        {
          token: "delimiter.handlebars",
          switchTo: "@$S2.$S3",
          nextEmbedded: "$S3"
        }
      ],
      { include: "handlebarsRoot" }
    ],
    handlebarsRoot: [
      [/"[^"]*"/, "string.handlebars"],
      [/[#/][^\s}]+/, "keyword.helper.handlebars"],
      [/else\b/, "keyword.helper.handlebars"],
      [/[\s]+/],
      [/[^}]/, "variable.parameter.handlebars"]
    ]
  }
};



/***/ })

}]);
//# sourceMappingURL=monaco-language-handlebars.56b7181d.js.3f374ab1.map