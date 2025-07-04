"use strict";
(self["webpackChunkforgejo"] = self["webpackChunkforgejo"] || []).push([["vendors-node_modules_monaco-editor_esm_vs_language_json_jsonMode_js"],{

/***/ "./node_modules/monaco-editor/esm/vs/language/json/jsonMode.js":
/*!*********************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/language/json/jsonMode.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CompletionAdapter: function() { return /* binding */ CompletionAdapter; },
/* harmony export */   DefinitionAdapter: function() { return /* binding */ DefinitionAdapter; },
/* harmony export */   DiagnosticsAdapter: function() { return /* binding */ DiagnosticsAdapter; },
/* harmony export */   DocumentColorAdapter: function() { return /* binding */ DocumentColorAdapter; },
/* harmony export */   DocumentFormattingEditProvider: function() { return /* binding */ DocumentFormattingEditProvider; },
/* harmony export */   DocumentHighlightAdapter: function() { return /* binding */ DocumentHighlightAdapter; },
/* harmony export */   DocumentLinkAdapter: function() { return /* binding */ DocumentLinkAdapter; },
/* harmony export */   DocumentRangeFormattingEditProvider: function() { return /* binding */ DocumentRangeFormattingEditProvider; },
/* harmony export */   DocumentSymbolAdapter: function() { return /* binding */ DocumentSymbolAdapter; },
/* harmony export */   FoldingRangeAdapter: function() { return /* binding */ FoldingRangeAdapter; },
/* harmony export */   HoverAdapter: function() { return /* binding */ HoverAdapter; },
/* harmony export */   ReferenceAdapter: function() { return /* binding */ ReferenceAdapter; },
/* harmony export */   RenameAdapter: function() { return /* binding */ RenameAdapter; },
/* harmony export */   SelectionRangeAdapter: function() { return /* binding */ SelectionRangeAdapter; },
/* harmony export */   WorkerManager: function() { return /* binding */ WorkerManager; },
/* harmony export */   fromPosition: function() { return /* binding */ fromPosition; },
/* harmony export */   fromRange: function() { return /* binding */ fromRange; },
/* harmony export */   getWorker: function() { return /* binding */ getWorker; },
/* harmony export */   setupMode: function() { return /* binding */ setupMode; },
/* harmony export */   toRange: function() { return /* binding */ toRange; },
/* harmony export */   toTextEdit: function() { return /* binding */ toTextEdit; }
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


// src/language/json/workerManager.ts
var STOP_WHEN_IDLE_FOR = 2 * 60 * 1e3;
var WorkerManager = class {
  constructor(defaults) {
    this._defaults = defaults;
    this._worker = null;
    this._client = null;
    this._idleCheckInterval = window.setInterval(() => this._checkIfIdle(), 30 * 1e3);
    this._lastUsedTime = 0;
    this._configChangeListener = this._defaults.onDidChange(() => this._stopWorker());
  }
  _stopWorker() {
    if (this._worker) {
      this._worker.dispose();
      this._worker = null;
    }
    this._client = null;
  }
  dispose() {
    clearInterval(this._idleCheckInterval);
    this._configChangeListener.dispose();
    this._stopWorker();
  }
  _checkIfIdle() {
    if (!this._worker) {
      return;
    }
    let timePassedSinceLastUsed = Date.now() - this._lastUsedTime;
    if (timePassedSinceLastUsed > STOP_WHEN_IDLE_FOR) {
      this._stopWorker();
    }
  }
  _getClient() {
    this._lastUsedTime = Date.now();
    if (!this._client) {
      this._worker = monaco_editor_core_exports.editor.createWebWorker({
        // module that exports the create() method and returns a `JSONWorker` instance
        moduleId: "vs/language/json/jsonWorker",
        label: this._defaults.languageId,
        // passed in to the create() method
        createData: {
          languageSettings: this._defaults.diagnosticsOptions,
          languageId: this._defaults.languageId,
          enableSchemaRequest: this._defaults.diagnosticsOptions.enableSchemaRequest
        }
      });
      this._client = this._worker.getProxy();
    }
    return this._client;
  }
  getLanguageServiceWorker(...resources) {
    let _client;
    return this._getClient().then((client) => {
      _client = client;
    }).then((_) => {
      if (this._worker) {
        return this._worker.withSyncedResources(resources);
      }
    }).then((_) => _client);
  }
};

// node_modules/vscode-languageserver-types/lib/esm/main.js
var DocumentUri;
(function(DocumentUri2) {
  function is(value) {
    return typeof value === "string";
  }
  DocumentUri2.is = is;
})(DocumentUri || (DocumentUri = {}));
var URI;
(function(URI2) {
  function is(value) {
    return typeof value === "string";
  }
  URI2.is = is;
})(URI || (URI = {}));
var integer;
(function(integer2) {
  integer2.MIN_VALUE = -2147483648;
  integer2.MAX_VALUE = 2147483647;
  function is(value) {
    return typeof value === "number" && integer2.MIN_VALUE <= value && value <= integer2.MAX_VALUE;
  }
  integer2.is = is;
})(integer || (integer = {}));
var uinteger;
(function(uinteger2) {
  uinteger2.MIN_VALUE = 0;
  uinteger2.MAX_VALUE = 2147483647;
  function is(value) {
    return typeof value === "number" && uinteger2.MIN_VALUE <= value && value <= uinteger2.MAX_VALUE;
  }
  uinteger2.is = is;
})(uinteger || (uinteger = {}));
var Position;
(function(Position3) {
  function create(line, character) {
    if (line === Number.MAX_VALUE) {
      line = uinteger.MAX_VALUE;
    }
    if (character === Number.MAX_VALUE) {
      character = uinteger.MAX_VALUE;
    }
    return { line, character };
  }
  Position3.create = create;
  function is(value) {
    let candidate = value;
    return Is.objectLiteral(candidate) && Is.uinteger(candidate.line) && Is.uinteger(candidate.character);
  }
  Position3.is = is;
})(Position || (Position = {}));
var Range;
(function(Range3) {
  function create(one, two, three, four) {
    if (Is.uinteger(one) && Is.uinteger(two) && Is.uinteger(three) && Is.uinteger(four)) {
      return { start: Position.create(one, two), end: Position.create(three, four) };
    } else if (Position.is(one) && Position.is(two)) {
      return { start: one, end: two };
    } else {
      throw new Error(`Range#create called with invalid arguments[${one}, ${two}, ${three}, ${four}]`);
    }
  }
  Range3.create = create;
  function is(value) {
    let candidate = value;
    return Is.objectLiteral(candidate) && Position.is(candidate.start) && Position.is(candidate.end);
  }
  Range3.is = is;
})(Range || (Range = {}));
var Location;
(function(Location2) {
  function create(uri, range) {
    return { uri, range };
  }
  Location2.create = create;
  function is(value) {
    let candidate = value;
    return Is.objectLiteral(candidate) && Range.is(candidate.range) && (Is.string(candidate.uri) || Is.undefined(candidate.uri));
  }
  Location2.is = is;
})(Location || (Location = {}));
var LocationLink;
(function(LocationLink2) {
  function create(targetUri, targetRange, targetSelectionRange, originSelectionRange) {
    return { targetUri, targetRange, targetSelectionRange, originSelectionRange };
  }
  LocationLink2.create = create;
  function is(value) {
    let candidate = value;
    return Is.objectLiteral(candidate) && Range.is(candidate.targetRange) && Is.string(candidate.targetUri) && Range.is(candidate.targetSelectionRange) && (Range.is(candidate.originSelectionRange) || Is.undefined(candidate.originSelectionRange));
  }
  LocationLink2.is = is;
})(LocationLink || (LocationLink = {}));
var Color;
(function(Color2) {
  function create(red, green, blue, alpha) {
    return {
      red,
      green,
      blue,
      alpha
    };
  }
  Color2.create = create;
  function is(value) {
    const candidate = value;
    return Is.objectLiteral(candidate) && Is.numberRange(candidate.red, 0, 1) && Is.numberRange(candidate.green, 0, 1) && Is.numberRange(candidate.blue, 0, 1) && Is.numberRange(candidate.alpha, 0, 1);
  }
  Color2.is = is;
})(Color || (Color = {}));
var ColorInformation;
(function(ColorInformation2) {
  function create(range, color) {
    return {
      range,
      color
    };
  }
  ColorInformation2.create = create;
  function is(value) {
    const candidate = value;
    return Is.objectLiteral(candidate) && Range.is(candidate.range) && Color.is(candidate.color);
  }
  ColorInformation2.is = is;
})(ColorInformation || (ColorInformation = {}));
var ColorPresentation;
(function(ColorPresentation2) {
  function create(label, textEdit, additionalTextEdits) {
    return {
      label,
      textEdit,
      additionalTextEdits
    };
  }
  ColorPresentation2.create = create;
  function is(value) {
    const candidate = value;
    return Is.objectLiteral(candidate) && Is.string(candidate.label) && (Is.undefined(candidate.textEdit) || TextEdit.is(candidate)) && (Is.undefined(candidate.additionalTextEdits) || Is.typedArray(candidate.additionalTextEdits, TextEdit.is));
  }
  ColorPresentation2.is = is;
})(ColorPresentation || (ColorPresentation = {}));
var FoldingRangeKind;
(function(FoldingRangeKind2) {
  FoldingRangeKind2.Comment = "comment";
  FoldingRangeKind2.Imports = "imports";
  FoldingRangeKind2.Region = "region";
})(FoldingRangeKind || (FoldingRangeKind = {}));
var FoldingRange;
(function(FoldingRange2) {
  function create(startLine, endLine, startCharacter, endCharacter, kind, collapsedText) {
    const result = {
      startLine,
      endLine
    };
    if (Is.defined(startCharacter)) {
      result.startCharacter = startCharacter;
    }
    if (Is.defined(endCharacter)) {
      result.endCharacter = endCharacter;
    }
    if (Is.defined(kind)) {
      result.kind = kind;
    }
    if (Is.defined(collapsedText)) {
      result.collapsedText = collapsedText;
    }
    return result;
  }
  FoldingRange2.create = create;
  function is(value) {
    const candidate = value;
    return Is.objectLiteral(candidate) && Is.uinteger(candidate.startLine) && Is.uinteger(candidate.startLine) && (Is.undefined(candidate.startCharacter) || Is.uinteger(candidate.startCharacter)) && (Is.undefined(candidate.endCharacter) || Is.uinteger(candidate.endCharacter)) && (Is.undefined(candidate.kind) || Is.string(candidate.kind));
  }
  FoldingRange2.is = is;
})(FoldingRange || (FoldingRange = {}));
var DiagnosticRelatedInformation;
(function(DiagnosticRelatedInformation2) {
  function create(location, message) {
    return {
      location,
      message
    };
  }
  DiagnosticRelatedInformation2.create = create;
  function is(value) {
    let candidate = value;
    return Is.defined(candidate) && Location.is(candidate.location) && Is.string(candidate.message);
  }
  DiagnosticRelatedInformation2.is = is;
})(DiagnosticRelatedInformation || (DiagnosticRelatedInformation = {}));
var DiagnosticSeverity;
(function(DiagnosticSeverity2) {
  DiagnosticSeverity2.Error = 1;
  DiagnosticSeverity2.Warning = 2;
  DiagnosticSeverity2.Information = 3;
  DiagnosticSeverity2.Hint = 4;
})(DiagnosticSeverity || (DiagnosticSeverity = {}));
var DiagnosticTag;
(function(DiagnosticTag2) {
  DiagnosticTag2.Unnecessary = 1;
  DiagnosticTag2.Deprecated = 2;
})(DiagnosticTag || (DiagnosticTag = {}));
var CodeDescription;
(function(CodeDescription2) {
  function is(value) {
    const candidate = value;
    return Is.objectLiteral(candidate) && Is.string(candidate.href);
  }
  CodeDescription2.is = is;
})(CodeDescription || (CodeDescription = {}));
var Diagnostic;
(function(Diagnostic2) {
  function create(range, message, severity, code, source, relatedInformation) {
    let result = { range, message };
    if (Is.defined(severity)) {
      result.severity = severity;
    }
    if (Is.defined(code)) {
      result.code = code;
    }
    if (Is.defined(source)) {
      result.source = source;
    }
    if (Is.defined(relatedInformation)) {
      result.relatedInformation = relatedInformation;
    }
    return result;
  }
  Diagnostic2.create = create;
  function is(value) {
    var _a;
    let candidate = value;
    return Is.defined(candidate) && Range.is(candidate.range) && Is.string(candidate.message) && (Is.number(candidate.severity) || Is.undefined(candidate.severity)) && (Is.integer(candidate.code) || Is.string(candidate.code) || Is.undefined(candidate.code)) && (Is.undefined(candidate.codeDescription) || Is.string((_a = candidate.codeDescription) === null || _a === void 0 ? void 0 : _a.href)) && (Is.string(candidate.source) || Is.undefined(candidate.source)) && (Is.undefined(candidate.relatedInformation) || Is.typedArray(candidate.relatedInformation, DiagnosticRelatedInformation.is));
  }
  Diagnostic2.is = is;
})(Diagnostic || (Diagnostic = {}));
var Command;
(function(Command2) {
  function create(title, command, ...args) {
    let result = { title, command };
    if (Is.defined(args) && args.length > 0) {
      result.arguments = args;
    }
    return result;
  }
  Command2.create = create;
  function is(value) {
    let candidate = value;
    return Is.defined(candidate) && Is.string(candidate.title) && Is.string(candidate.command);
  }
  Command2.is = is;
})(Command || (Command = {}));
var TextEdit;
(function(TextEdit2) {
  function replace(range, newText) {
    return { range, newText };
  }
  TextEdit2.replace = replace;
  function insert(position, newText) {
    return { range: { start: position, end: position }, newText };
  }
  TextEdit2.insert = insert;
  function del(range) {
    return { range, newText: "" };
  }
  TextEdit2.del = del;
  function is(value) {
    const candidate = value;
    return Is.objectLiteral(candidate) && Is.string(candidate.newText) && Range.is(candidate.range);
  }
  TextEdit2.is = is;
})(TextEdit || (TextEdit = {}));
var ChangeAnnotation;
(function(ChangeAnnotation2) {
  function create(label, needsConfirmation, description) {
    const result = { label };
    if (needsConfirmation !== void 0) {
      result.needsConfirmation = needsConfirmation;
    }
    if (description !== void 0) {
      result.description = description;
    }
    return result;
  }
  ChangeAnnotation2.create = create;
  function is(value) {
    const candidate = value;
    return Is.objectLiteral(candidate) && Is.string(candidate.label) && (Is.boolean(candidate.needsConfirmation) || candidate.needsConfirmation === void 0) && (Is.string(candidate.description) || candidate.description === void 0);
  }
  ChangeAnnotation2.is = is;
})(ChangeAnnotation || (ChangeAnnotation = {}));
var ChangeAnnotationIdentifier;
(function(ChangeAnnotationIdentifier2) {
  function is(value) {
    const candidate = value;
    return Is.string(candidate);
  }
  ChangeAnnotationIdentifier2.is = is;
})(ChangeAnnotationIdentifier || (ChangeAnnotationIdentifier = {}));
var AnnotatedTextEdit;
(function(AnnotatedTextEdit2) {
  function replace(range, newText, annotation) {
    return { range, newText, annotationId: annotation };
  }
  AnnotatedTextEdit2.replace = replace;
  function insert(position, newText, annotation) {
    return { range: { start: position, end: position }, newText, annotationId: annotation };
  }
  AnnotatedTextEdit2.insert = insert;
  function del(range, annotation) {
    return { range, newText: "", annotationId: annotation };
  }
  AnnotatedTextEdit2.del = del;
  function is(value) {
    const candidate = value;
    return TextEdit.is(candidate) && (ChangeAnnotation.is(candidate.annotationId) || ChangeAnnotationIdentifier.is(candidate.annotationId));
  }
  AnnotatedTextEdit2.is = is;
})(AnnotatedTextEdit || (AnnotatedTextEdit = {}));
var TextDocumentEdit;
(function(TextDocumentEdit2) {
  function create(textDocument, edits) {
    return { textDocument, edits };
  }
  TextDocumentEdit2.create = create;
  function is(value) {
    let candidate = value;
    return Is.defined(candidate) && OptionalVersionedTextDocumentIdentifier.is(candidate.textDocument) && Array.isArray(candidate.edits);
  }
  TextDocumentEdit2.is = is;
})(TextDocumentEdit || (TextDocumentEdit = {}));
var CreateFile;
(function(CreateFile2) {
  function create(uri, options, annotation) {
    let result = {
      kind: "create",
      uri
    };
    if (options !== void 0 && (options.overwrite !== void 0 || options.ignoreIfExists !== void 0)) {
      result.options = options;
    }
    if (annotation !== void 0) {
      result.annotationId = annotation;
    }
    return result;
  }
  CreateFile2.create = create;
  function is(value) {
    let candidate = value;
    return candidate && candidate.kind === "create" && Is.string(candidate.uri) && (candidate.options === void 0 || (candidate.options.overwrite === void 0 || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === void 0 || Is.boolean(candidate.options.ignoreIfExists))) && (candidate.annotationId === void 0 || ChangeAnnotationIdentifier.is(candidate.annotationId));
  }
  CreateFile2.is = is;
})(CreateFile || (CreateFile = {}));
var RenameFile;
(function(RenameFile2) {
  function create(oldUri, newUri, options, annotation) {
    let result = {
      kind: "rename",
      oldUri,
      newUri
    };
    if (options !== void 0 && (options.overwrite !== void 0 || options.ignoreIfExists !== void 0)) {
      result.options = options;
    }
    if (annotation !== void 0) {
      result.annotationId = annotation;
    }
    return result;
  }
  RenameFile2.create = create;
  function is(value) {
    let candidate = value;
    return candidate && candidate.kind === "rename" && Is.string(candidate.oldUri) && Is.string(candidate.newUri) && (candidate.options === void 0 || (candidate.options.overwrite === void 0 || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === void 0 || Is.boolean(candidate.options.ignoreIfExists))) && (candidate.annotationId === void 0 || ChangeAnnotationIdentifier.is(candidate.annotationId));
  }
  RenameFile2.is = is;
})(RenameFile || (RenameFile = {}));
var DeleteFile;
(function(DeleteFile2) {
  function create(uri, options, annotation) {
    let result = {
      kind: "delete",
      uri
    };
    if (options !== void 0 && (options.recursive !== void 0 || options.ignoreIfNotExists !== void 0)) {
      result.options = options;
    }
    if (annotation !== void 0) {
      result.annotationId = annotation;
    }
    return result;
  }
  DeleteFile2.create = create;
  function is(value) {
    let candidate = value;
    return candidate && candidate.kind === "delete" && Is.string(candidate.uri) && (candidate.options === void 0 || (candidate.options.recursive === void 0 || Is.boolean(candidate.options.recursive)) && (candidate.options.ignoreIfNotExists === void 0 || Is.boolean(candidate.options.ignoreIfNotExists))) && (candidate.annotationId === void 0 || ChangeAnnotationIdentifier.is(candidate.annotationId));
  }
  DeleteFile2.is = is;
})(DeleteFile || (DeleteFile = {}));
var WorkspaceEdit;
(function(WorkspaceEdit2) {
  function is(value) {
    let candidate = value;
    return candidate && (candidate.changes !== void 0 || candidate.documentChanges !== void 0) && (candidate.documentChanges === void 0 || candidate.documentChanges.every((change) => {
      if (Is.string(change.kind)) {
        return CreateFile.is(change) || RenameFile.is(change) || DeleteFile.is(change);
      } else {
        return TextDocumentEdit.is(change);
      }
    }));
  }
  WorkspaceEdit2.is = is;
})(WorkspaceEdit || (WorkspaceEdit = {}));
var TextDocumentIdentifier;
(function(TextDocumentIdentifier2) {
  function create(uri) {
    return { uri };
  }
  TextDocumentIdentifier2.create = create;
  function is(value) {
    let candidate = value;
    return Is.defined(candidate) && Is.string(candidate.uri);
  }
  TextDocumentIdentifier2.is = is;
})(TextDocumentIdentifier || (TextDocumentIdentifier = {}));
var VersionedTextDocumentIdentifier;
(function(VersionedTextDocumentIdentifier2) {
  function create(uri, version) {
    return { uri, version };
  }
  VersionedTextDocumentIdentifier2.create = create;
  function is(value) {
    let candidate = value;
    return Is.defined(candidate) && Is.string(candidate.uri) && Is.integer(candidate.version);
  }
  VersionedTextDocumentIdentifier2.is = is;
})(VersionedTextDocumentIdentifier || (VersionedTextDocumentIdentifier = {}));
var OptionalVersionedTextDocumentIdentifier;
(function(OptionalVersionedTextDocumentIdentifier2) {
  function create(uri, version) {
    return { uri, version };
  }
  OptionalVersionedTextDocumentIdentifier2.create = create;
  function is(value) {
    let candidate = value;
    return Is.defined(candidate) && Is.string(candidate.uri) && (candidate.version === null || Is.integer(candidate.version));
  }
  OptionalVersionedTextDocumentIdentifier2.is = is;
})(OptionalVersionedTextDocumentIdentifier || (OptionalVersionedTextDocumentIdentifier = {}));
var TextDocumentItem;
(function(TextDocumentItem2) {
  function create(uri, languageId, version, text) {
    return { uri, languageId, version, text };
  }
  TextDocumentItem2.create = create;
  function is(value) {
    let candidate = value;
    return Is.defined(candidate) && Is.string(candidate.uri) && Is.string(candidate.languageId) && Is.integer(candidate.version) && Is.string(candidate.text);
  }
  TextDocumentItem2.is = is;
})(TextDocumentItem || (TextDocumentItem = {}));
var MarkupKind;
(function(MarkupKind2) {
  MarkupKind2.PlainText = "plaintext";
  MarkupKind2.Markdown = "markdown";
  function is(value) {
    const candidate = value;
    return candidate === MarkupKind2.PlainText || candidate === MarkupKind2.Markdown;
  }
  MarkupKind2.is = is;
})(MarkupKind || (MarkupKind = {}));
var MarkupContent;
(function(MarkupContent2) {
  function is(value) {
    const candidate = value;
    return Is.objectLiteral(value) && MarkupKind.is(candidate.kind) && Is.string(candidate.value);
  }
  MarkupContent2.is = is;
})(MarkupContent || (MarkupContent = {}));
var CompletionItemKind;
(function(CompletionItemKind2) {
  CompletionItemKind2.Text = 1;
  CompletionItemKind2.Method = 2;
  CompletionItemKind2.Function = 3;
  CompletionItemKind2.Constructor = 4;
  CompletionItemKind2.Field = 5;
  CompletionItemKind2.Variable = 6;
  CompletionItemKind2.Class = 7;
  CompletionItemKind2.Interface = 8;
  CompletionItemKind2.Module = 9;
  CompletionItemKind2.Property = 10;
  CompletionItemKind2.Unit = 11;
  CompletionItemKind2.Value = 12;
  CompletionItemKind2.Enum = 13;
  CompletionItemKind2.Keyword = 14;
  CompletionItemKind2.Snippet = 15;
  CompletionItemKind2.Color = 16;
  CompletionItemKind2.File = 17;
  CompletionItemKind2.Reference = 18;
  CompletionItemKind2.Folder = 19;
  CompletionItemKind2.EnumMember = 20;
  CompletionItemKind2.Constant = 21;
  CompletionItemKind2.Struct = 22;
  CompletionItemKind2.Event = 23;
  CompletionItemKind2.Operator = 24;
  CompletionItemKind2.TypeParameter = 25;
})(CompletionItemKind || (CompletionItemKind = {}));
var InsertTextFormat;
(function(InsertTextFormat2) {
  InsertTextFormat2.PlainText = 1;
  InsertTextFormat2.Snippet = 2;
})(InsertTextFormat || (InsertTextFormat = {}));
var CompletionItemTag;
(function(CompletionItemTag2) {
  CompletionItemTag2.Deprecated = 1;
})(CompletionItemTag || (CompletionItemTag = {}));
var InsertReplaceEdit;
(function(InsertReplaceEdit2) {
  function create(newText, insert, replace) {
    return { newText, insert, replace };
  }
  InsertReplaceEdit2.create = create;
  function is(value) {
    const candidate = value;
    return candidate && Is.string(candidate.newText) && Range.is(candidate.insert) && Range.is(candidate.replace);
  }
  InsertReplaceEdit2.is = is;
})(InsertReplaceEdit || (InsertReplaceEdit = {}));
var InsertTextMode;
(function(InsertTextMode2) {
  InsertTextMode2.asIs = 1;
  InsertTextMode2.adjustIndentation = 2;
})(InsertTextMode || (InsertTextMode = {}));
var CompletionItemLabelDetails;
(function(CompletionItemLabelDetails2) {
  function is(value) {
    const candidate = value;
    return candidate && (Is.string(candidate.detail) || candidate.detail === void 0) && (Is.string(candidate.description) || candidate.description === void 0);
  }
  CompletionItemLabelDetails2.is = is;
})(CompletionItemLabelDetails || (CompletionItemLabelDetails = {}));
var CompletionItem;
(function(CompletionItem2) {
  function create(label) {
    return { label };
  }
  CompletionItem2.create = create;
})(CompletionItem || (CompletionItem = {}));
var CompletionList;
(function(CompletionList2) {
  function create(items, isIncomplete) {
    return { items: items ? items : [], isIncomplete: !!isIncomplete };
  }
  CompletionList2.create = create;
})(CompletionList || (CompletionList = {}));
var MarkedString;
(function(MarkedString2) {
  function fromPlainText(plainText) {
    return plainText.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&");
  }
  MarkedString2.fromPlainText = fromPlainText;
  function is(value) {
    const candidate = value;
    return Is.string(candidate) || Is.objectLiteral(candidate) && Is.string(candidate.language) && Is.string(candidate.value);
  }
  MarkedString2.is = is;
})(MarkedString || (MarkedString = {}));
var Hover;
(function(Hover2) {
  function is(value) {
    let candidate = value;
    return !!candidate && Is.objectLiteral(candidate) && (MarkupContent.is(candidate.contents) || MarkedString.is(candidate.contents) || Is.typedArray(candidate.contents, MarkedString.is)) && (value.range === void 0 || Range.is(value.range));
  }
  Hover2.is = is;
})(Hover || (Hover = {}));
var ParameterInformation;
(function(ParameterInformation2) {
  function create(label, documentation) {
    return documentation ? { label, documentation } : { label };
  }
  ParameterInformation2.create = create;
})(ParameterInformation || (ParameterInformation = {}));
var SignatureInformation;
(function(SignatureInformation2) {
  function create(label, documentation, ...parameters) {
    let result = { label };
    if (Is.defined(documentation)) {
      result.documentation = documentation;
    }
    if (Is.defined(parameters)) {
      result.parameters = parameters;
    } else {
      result.parameters = [];
    }
    return result;
  }
  SignatureInformation2.create = create;
})(SignatureInformation || (SignatureInformation = {}));
var DocumentHighlightKind;
(function(DocumentHighlightKind2) {
  DocumentHighlightKind2.Text = 1;
  DocumentHighlightKind2.Read = 2;
  DocumentHighlightKind2.Write = 3;
})(DocumentHighlightKind || (DocumentHighlightKind = {}));
var DocumentHighlight;
(function(DocumentHighlight2) {
  function create(range, kind) {
    let result = { range };
    if (Is.number(kind)) {
      result.kind = kind;
    }
    return result;
  }
  DocumentHighlight2.create = create;
})(DocumentHighlight || (DocumentHighlight = {}));
var SymbolKind;
(function(SymbolKind2) {
  SymbolKind2.File = 1;
  SymbolKind2.Module = 2;
  SymbolKind2.Namespace = 3;
  SymbolKind2.Package = 4;
  SymbolKind2.Class = 5;
  SymbolKind2.Method = 6;
  SymbolKind2.Property = 7;
  SymbolKind2.Field = 8;
  SymbolKind2.Constructor = 9;
  SymbolKind2.Enum = 10;
  SymbolKind2.Interface = 11;
  SymbolKind2.Function = 12;
  SymbolKind2.Variable = 13;
  SymbolKind2.Constant = 14;
  SymbolKind2.String = 15;
  SymbolKind2.Number = 16;
  SymbolKind2.Boolean = 17;
  SymbolKind2.Array = 18;
  SymbolKind2.Object = 19;
  SymbolKind2.Key = 20;
  SymbolKind2.Null = 21;
  SymbolKind2.EnumMember = 22;
  SymbolKind2.Struct = 23;
  SymbolKind2.Event = 24;
  SymbolKind2.Operator = 25;
  SymbolKind2.TypeParameter = 26;
})(SymbolKind || (SymbolKind = {}));
var SymbolTag;
(function(SymbolTag2) {
  SymbolTag2.Deprecated = 1;
})(SymbolTag || (SymbolTag = {}));
var SymbolInformation;
(function(SymbolInformation2) {
  function create(name, kind, range, uri, containerName) {
    let result = {
      name,
      kind,
      location: { uri, range }
    };
    if (containerName) {
      result.containerName = containerName;
    }
    return result;
  }
  SymbolInformation2.create = create;
})(SymbolInformation || (SymbolInformation = {}));
var WorkspaceSymbol;
(function(WorkspaceSymbol2) {
  function create(name, kind, uri, range) {
    return range !== void 0 ? { name, kind, location: { uri, range } } : { name, kind, location: { uri } };
  }
  WorkspaceSymbol2.create = create;
})(WorkspaceSymbol || (WorkspaceSymbol = {}));
var DocumentSymbol;
(function(DocumentSymbol2) {
  function create(name, detail, kind, range, selectionRange, children) {
    let result = {
      name,
      detail,
      kind,
      range,
      selectionRange
    };
    if (children !== void 0) {
      result.children = children;
    }
    return result;
  }
  DocumentSymbol2.create = create;
  function is(value) {
    let candidate = value;
    return candidate && Is.string(candidate.name) && Is.number(candidate.kind) && Range.is(candidate.range) && Range.is(candidate.selectionRange) && (candidate.detail === void 0 || Is.string(candidate.detail)) && (candidate.deprecated === void 0 || Is.boolean(candidate.deprecated)) && (candidate.children === void 0 || Array.isArray(candidate.children)) && (candidate.tags === void 0 || Array.isArray(candidate.tags));
  }
  DocumentSymbol2.is = is;
})(DocumentSymbol || (DocumentSymbol = {}));
var CodeActionKind;
(function(CodeActionKind2) {
  CodeActionKind2.Empty = "";
  CodeActionKind2.QuickFix = "quickfix";
  CodeActionKind2.Refactor = "refactor";
  CodeActionKind2.RefactorExtract = "refactor.extract";
  CodeActionKind2.RefactorInline = "refactor.inline";
  CodeActionKind2.RefactorRewrite = "refactor.rewrite";
  CodeActionKind2.Source = "source";
  CodeActionKind2.SourceOrganizeImports = "source.organizeImports";
  CodeActionKind2.SourceFixAll = "source.fixAll";
})(CodeActionKind || (CodeActionKind = {}));
var CodeActionTriggerKind;
(function(CodeActionTriggerKind2) {
  CodeActionTriggerKind2.Invoked = 1;
  CodeActionTriggerKind2.Automatic = 2;
})(CodeActionTriggerKind || (CodeActionTriggerKind = {}));
var CodeActionContext;
(function(CodeActionContext2) {
  function create(diagnostics, only, triggerKind) {
    let result = { diagnostics };
    if (only !== void 0 && only !== null) {
      result.only = only;
    }
    if (triggerKind !== void 0 && triggerKind !== null) {
      result.triggerKind = triggerKind;
    }
    return result;
  }
  CodeActionContext2.create = create;
  function is(value) {
    let candidate = value;
    return Is.defined(candidate) && Is.typedArray(candidate.diagnostics, Diagnostic.is) && (candidate.only === void 0 || Is.typedArray(candidate.only, Is.string)) && (candidate.triggerKind === void 0 || candidate.triggerKind === CodeActionTriggerKind.Invoked || candidate.triggerKind === CodeActionTriggerKind.Automatic);
  }
  CodeActionContext2.is = is;
})(CodeActionContext || (CodeActionContext = {}));
var CodeAction;
(function(CodeAction2) {
  function create(title, kindOrCommandOrEdit, kind) {
    let result = { title };
    let checkKind = true;
    if (typeof kindOrCommandOrEdit === "string") {
      checkKind = false;
      result.kind = kindOrCommandOrEdit;
    } else if (Command.is(kindOrCommandOrEdit)) {
      result.command = kindOrCommandOrEdit;
    } else {
      result.edit = kindOrCommandOrEdit;
    }
    if (checkKind && kind !== void 0) {
      result.kind = kind;
    }
    return result;
  }
  CodeAction2.create = create;
  function is(value) {
    let candidate = value;
    return candidate && Is.string(candidate.title) && (candidate.diagnostics === void 0 || Is.typedArray(candidate.diagnostics, Diagnostic.is)) && (candidate.kind === void 0 || Is.string(candidate.kind)) && (candidate.edit !== void 0 || candidate.command !== void 0) && (candidate.command === void 0 || Command.is(candidate.command)) && (candidate.isPreferred === void 0 || Is.boolean(candidate.isPreferred)) && (candidate.edit === void 0 || WorkspaceEdit.is(candidate.edit));
  }
  CodeAction2.is = is;
})(CodeAction || (CodeAction = {}));
var CodeLens;
(function(CodeLens2) {
  function create(range, data) {
    let result = { range };
    if (Is.defined(data)) {
      result.data = data;
    }
    return result;
  }
  CodeLens2.create = create;
  function is(value) {
    let candidate = value;
    return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.command) || Command.is(candidate.command));
  }
  CodeLens2.is = is;
})(CodeLens || (CodeLens = {}));
var FormattingOptions;
(function(FormattingOptions2) {
  function create(tabSize, insertSpaces) {
    return { tabSize, insertSpaces };
  }
  FormattingOptions2.create = create;
  function is(value) {
    let candidate = value;
    return Is.defined(candidate) && Is.uinteger(candidate.tabSize) && Is.boolean(candidate.insertSpaces);
  }
  FormattingOptions2.is = is;
})(FormattingOptions || (FormattingOptions = {}));
var DocumentLink;
(function(DocumentLink2) {
  function create(range, target, data) {
    return { range, target, data };
  }
  DocumentLink2.create = create;
  function is(value) {
    let candidate = value;
    return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.target) || Is.string(candidate.target));
  }
  DocumentLink2.is = is;
})(DocumentLink || (DocumentLink = {}));
var SelectionRange;
(function(SelectionRange2) {
  function create(range, parent) {
    return { range, parent };
  }
  SelectionRange2.create = create;
  function is(value) {
    let candidate = value;
    return Is.objectLiteral(candidate) && Range.is(candidate.range) && (candidate.parent === void 0 || SelectionRange2.is(candidate.parent));
  }
  SelectionRange2.is = is;
})(SelectionRange || (SelectionRange = {}));
var SemanticTokenTypes;
(function(SemanticTokenTypes2) {
  SemanticTokenTypes2["namespace"] = "namespace";
  SemanticTokenTypes2["type"] = "type";
  SemanticTokenTypes2["class"] = "class";
  SemanticTokenTypes2["enum"] = "enum";
  SemanticTokenTypes2["interface"] = "interface";
  SemanticTokenTypes2["struct"] = "struct";
  SemanticTokenTypes2["typeParameter"] = "typeParameter";
  SemanticTokenTypes2["parameter"] = "parameter";
  SemanticTokenTypes2["variable"] = "variable";
  SemanticTokenTypes2["property"] = "property";
  SemanticTokenTypes2["enumMember"] = "enumMember";
  SemanticTokenTypes2["event"] = "event";
  SemanticTokenTypes2["function"] = "function";
  SemanticTokenTypes2["method"] = "method";
  SemanticTokenTypes2["macro"] = "macro";
  SemanticTokenTypes2["keyword"] = "keyword";
  SemanticTokenTypes2["modifier"] = "modifier";
  SemanticTokenTypes2["comment"] = "comment";
  SemanticTokenTypes2["string"] = "string";
  SemanticTokenTypes2["number"] = "number";
  SemanticTokenTypes2["regexp"] = "regexp";
  SemanticTokenTypes2["operator"] = "operator";
  SemanticTokenTypes2["decorator"] = "decorator";
})(SemanticTokenTypes || (SemanticTokenTypes = {}));
var SemanticTokenModifiers;
(function(SemanticTokenModifiers2) {
  SemanticTokenModifiers2["declaration"] = "declaration";
  SemanticTokenModifiers2["definition"] = "definition";
  SemanticTokenModifiers2["readonly"] = "readonly";
  SemanticTokenModifiers2["static"] = "static";
  SemanticTokenModifiers2["deprecated"] = "deprecated";
  SemanticTokenModifiers2["abstract"] = "abstract";
  SemanticTokenModifiers2["async"] = "async";
  SemanticTokenModifiers2["modification"] = "modification";
  SemanticTokenModifiers2["documentation"] = "documentation";
  SemanticTokenModifiers2["defaultLibrary"] = "defaultLibrary";
})(SemanticTokenModifiers || (SemanticTokenModifiers = {}));
var SemanticTokens;
(function(SemanticTokens2) {
  function is(value) {
    const candidate = value;
    return Is.objectLiteral(candidate) && (candidate.resultId === void 0 || typeof candidate.resultId === "string") && Array.isArray(candidate.data) && (candidate.data.length === 0 || typeof candidate.data[0] === "number");
  }
  SemanticTokens2.is = is;
})(SemanticTokens || (SemanticTokens = {}));
var InlineValueText;
(function(InlineValueText2) {
  function create(range, text) {
    return { range, text };
  }
  InlineValueText2.create = create;
  function is(value) {
    const candidate = value;
    return candidate !== void 0 && candidate !== null && Range.is(candidate.range) && Is.string(candidate.text);
  }
  InlineValueText2.is = is;
})(InlineValueText || (InlineValueText = {}));
var InlineValueVariableLookup;
(function(InlineValueVariableLookup2) {
  function create(range, variableName, caseSensitiveLookup) {
    return { range, variableName, caseSensitiveLookup };
  }
  InlineValueVariableLookup2.create = create;
  function is(value) {
    const candidate = value;
    return candidate !== void 0 && candidate !== null && Range.is(candidate.range) && Is.boolean(candidate.caseSensitiveLookup) && (Is.string(candidate.variableName) || candidate.variableName === void 0);
  }
  InlineValueVariableLookup2.is = is;
})(InlineValueVariableLookup || (InlineValueVariableLookup = {}));
var InlineValueEvaluatableExpression;
(function(InlineValueEvaluatableExpression2) {
  function create(range, expression) {
    return { range, expression };
  }
  InlineValueEvaluatableExpression2.create = create;
  function is(value) {
    const candidate = value;
    return candidate !== void 0 && candidate !== null && Range.is(candidate.range) && (Is.string(candidate.expression) || candidate.expression === void 0);
  }
  InlineValueEvaluatableExpression2.is = is;
})(InlineValueEvaluatableExpression || (InlineValueEvaluatableExpression = {}));
var InlineValueContext;
(function(InlineValueContext2) {
  function create(frameId, stoppedLocation) {
    return { frameId, stoppedLocation };
  }
  InlineValueContext2.create = create;
  function is(value) {
    const candidate = value;
    return Is.defined(candidate) && Range.is(value.stoppedLocation);
  }
  InlineValueContext2.is = is;
})(InlineValueContext || (InlineValueContext = {}));
var InlayHintKind;
(function(InlayHintKind2) {
  InlayHintKind2.Type = 1;
  InlayHintKind2.Parameter = 2;
  function is(value) {
    return value === 1 || value === 2;
  }
  InlayHintKind2.is = is;
})(InlayHintKind || (InlayHintKind = {}));
var InlayHintLabelPart;
(function(InlayHintLabelPart2) {
  function create(value) {
    return { value };
  }
  InlayHintLabelPart2.create = create;
  function is(value) {
    const candidate = value;
    return Is.objectLiteral(candidate) && (candidate.tooltip === void 0 || Is.string(candidate.tooltip) || MarkupContent.is(candidate.tooltip)) && (candidate.location === void 0 || Location.is(candidate.location)) && (candidate.command === void 0 || Command.is(candidate.command));
  }
  InlayHintLabelPart2.is = is;
})(InlayHintLabelPart || (InlayHintLabelPart = {}));
var InlayHint;
(function(InlayHint2) {
  function create(position, label, kind) {
    const result = { position, label };
    if (kind !== void 0) {
      result.kind = kind;
    }
    return result;
  }
  InlayHint2.create = create;
  function is(value) {
    const candidate = value;
    return Is.objectLiteral(candidate) && Position.is(candidate.position) && (Is.string(candidate.label) || Is.typedArray(candidate.label, InlayHintLabelPart.is)) && (candidate.kind === void 0 || InlayHintKind.is(candidate.kind)) && candidate.textEdits === void 0 || Is.typedArray(candidate.textEdits, TextEdit.is) && (candidate.tooltip === void 0 || Is.string(candidate.tooltip) || MarkupContent.is(candidate.tooltip)) && (candidate.paddingLeft === void 0 || Is.boolean(candidate.paddingLeft)) && (candidate.paddingRight === void 0 || Is.boolean(candidate.paddingRight));
  }
  InlayHint2.is = is;
})(InlayHint || (InlayHint = {}));
var StringValue;
(function(StringValue2) {
  function createSnippet(value) {
    return { kind: "snippet", value };
  }
  StringValue2.createSnippet = createSnippet;
})(StringValue || (StringValue = {}));
var InlineCompletionItem;
(function(InlineCompletionItem2) {
  function create(insertText, filterText, range, command) {
    return { insertText, filterText, range, command };
  }
  InlineCompletionItem2.create = create;
})(InlineCompletionItem || (InlineCompletionItem = {}));
var InlineCompletionList;
(function(InlineCompletionList2) {
  function create(items) {
    return { items };
  }
  InlineCompletionList2.create = create;
})(InlineCompletionList || (InlineCompletionList = {}));
var InlineCompletionTriggerKind;
(function(InlineCompletionTriggerKind2) {
  InlineCompletionTriggerKind2.Invoked = 0;
  InlineCompletionTriggerKind2.Automatic = 1;
})(InlineCompletionTriggerKind || (InlineCompletionTriggerKind = {}));
var SelectedCompletionInfo;
(function(SelectedCompletionInfo2) {
  function create(range, text) {
    return { range, text };
  }
  SelectedCompletionInfo2.create = create;
})(SelectedCompletionInfo || (SelectedCompletionInfo = {}));
var InlineCompletionContext;
(function(InlineCompletionContext2) {
  function create(triggerKind, selectedCompletionInfo) {
    return { triggerKind, selectedCompletionInfo };
  }
  InlineCompletionContext2.create = create;
})(InlineCompletionContext || (InlineCompletionContext = {}));
var WorkspaceFolder;
(function(WorkspaceFolder2) {
  function is(value) {
    const candidate = value;
    return Is.objectLiteral(candidate) && URI.is(candidate.uri) && Is.string(candidate.name);
  }
  WorkspaceFolder2.is = is;
})(WorkspaceFolder || (WorkspaceFolder = {}));
var TextDocument;
(function(TextDocument2) {
  function create(uri, languageId, version, content) {
    return new FullTextDocument(uri, languageId, version, content);
  }
  TextDocument2.create = create;
  function is(value) {
    let candidate = value;
    return Is.defined(candidate) && Is.string(candidate.uri) && (Is.undefined(candidate.languageId) || Is.string(candidate.languageId)) && Is.uinteger(candidate.lineCount) && Is.func(candidate.getText) && Is.func(candidate.positionAt) && Is.func(candidate.offsetAt) ? true : false;
  }
  TextDocument2.is = is;
  function applyEdits(document, edits) {
    let text = document.getText();
    let sortedEdits = mergeSort(edits, (a, b) => {
      let diff = a.range.start.line - b.range.start.line;
      if (diff === 0) {
        return a.range.start.character - b.range.start.character;
      }
      return diff;
    });
    let lastModifiedOffset = text.length;
    for (let i = sortedEdits.length - 1; i >= 0; i--) {
      let e = sortedEdits[i];
      let startOffset = document.offsetAt(e.range.start);
      let endOffset = document.offsetAt(e.range.end);
      if (endOffset <= lastModifiedOffset) {
        text = text.substring(0, startOffset) + e.newText + text.substring(endOffset, text.length);
      } else {
        throw new Error("Overlapping edit");
      }
      lastModifiedOffset = startOffset;
    }
    return text;
  }
  TextDocument2.applyEdits = applyEdits;
  function mergeSort(data, compare) {
    if (data.length <= 1) {
      return data;
    }
    const p = data.length / 2 | 0;
    const left = data.slice(0, p);
    const right = data.slice(p);
    mergeSort(left, compare);
    mergeSort(right, compare);
    let leftIdx = 0;
    let rightIdx = 0;
    let i = 0;
    while (leftIdx < left.length && rightIdx < right.length) {
      let ret = compare(left[leftIdx], right[rightIdx]);
      if (ret <= 0) {
        data[i++] = left[leftIdx++];
      } else {
        data[i++] = right[rightIdx++];
      }
    }
    while (leftIdx < left.length) {
      data[i++] = left[leftIdx++];
    }
    while (rightIdx < right.length) {
      data[i++] = right[rightIdx++];
    }
    return data;
  }
})(TextDocument || (TextDocument = {}));
var FullTextDocument = class {
  constructor(uri, languageId, version, content) {
    this._uri = uri;
    this._languageId = languageId;
    this._version = version;
    this._content = content;
    this._lineOffsets = void 0;
  }
  get uri() {
    return this._uri;
  }
  get languageId() {
    return this._languageId;
  }
  get version() {
    return this._version;
  }
  getText(range) {
    if (range) {
      let start = this.offsetAt(range.start);
      let end = this.offsetAt(range.end);
      return this._content.substring(start, end);
    }
    return this._content;
  }
  update(event, version) {
    this._content = event.text;
    this._version = version;
    this._lineOffsets = void 0;
  }
  getLineOffsets() {
    if (this._lineOffsets === void 0) {
      let lineOffsets = [];
      let text = this._content;
      let isLineStart = true;
      for (let i = 0; i < text.length; i++) {
        if (isLineStart) {
          lineOffsets.push(i);
          isLineStart = false;
        }
        let ch = text.charAt(i);
        isLineStart = ch === "\r" || ch === "\n";
        if (ch === "\r" && i + 1 < text.length && text.charAt(i + 1) === "\n") {
          i++;
        }
      }
      if (isLineStart && text.length > 0) {
        lineOffsets.push(text.length);
      }
      this._lineOffsets = lineOffsets;
    }
    return this._lineOffsets;
  }
  positionAt(offset) {
    offset = Math.max(Math.min(offset, this._content.length), 0);
    let lineOffsets = this.getLineOffsets();
    let low = 0, high = lineOffsets.length;
    if (high === 0) {
      return Position.create(0, offset);
    }
    while (low < high) {
      let mid = Math.floor((low + high) / 2);
      if (lineOffsets[mid] > offset) {
        high = mid;
      } else {
        low = mid + 1;
      }
    }
    let line = low - 1;
    return Position.create(line, offset - lineOffsets[line]);
  }
  offsetAt(position) {
    let lineOffsets = this.getLineOffsets();
    if (position.line >= lineOffsets.length) {
      return this._content.length;
    } else if (position.line < 0) {
      return 0;
    }
    let lineOffset = lineOffsets[position.line];
    let nextLineOffset = position.line + 1 < lineOffsets.length ? lineOffsets[position.line + 1] : this._content.length;
    return Math.max(Math.min(lineOffset + position.character, nextLineOffset), lineOffset);
  }
  get lineCount() {
    return this.getLineOffsets().length;
  }
};
var Is;
(function(Is2) {
  const toString = Object.prototype.toString;
  function defined(value) {
    return typeof value !== "undefined";
  }
  Is2.defined = defined;
  function undefined2(value) {
    return typeof value === "undefined";
  }
  Is2.undefined = undefined2;
  function boolean(value) {
    return value === true || value === false;
  }
  Is2.boolean = boolean;
  function string(value) {
    return toString.call(value) === "[object String]";
  }
  Is2.string = string;
  function number(value) {
    return toString.call(value) === "[object Number]";
  }
  Is2.number = number;
  function numberRange(value, min, max) {
    return toString.call(value) === "[object Number]" && min <= value && value <= max;
  }
  Is2.numberRange = numberRange;
  function integer2(value) {
    return toString.call(value) === "[object Number]" && -2147483648 <= value && value <= 2147483647;
  }
  Is2.integer = integer2;
  function uinteger2(value) {
    return toString.call(value) === "[object Number]" && 0 <= value && value <= 2147483647;
  }
  Is2.uinteger = uinteger2;
  function func(value) {
    return toString.call(value) === "[object Function]";
  }
  Is2.func = func;
  function objectLiteral(value) {
    return value !== null && typeof value === "object";
  }
  Is2.objectLiteral = objectLiteral;
  function typedArray(value, check) {
    return Array.isArray(value) && value.every(check);
  }
  Is2.typedArray = typedArray;
})(Is || (Is = {}));

// src/language/common/lspLanguageFeatures.ts
var DiagnosticsAdapter = class {
  constructor(_languageId, _worker, configChangeEvent) {
    this._languageId = _languageId;
    this._worker = _worker;
    this._disposables = [];
    this._listener = /* @__PURE__ */ Object.create(null);
    const onModelAdd = (model) => {
      let modeId = model.getLanguageId();
      if (modeId !== this._languageId) {
        return;
      }
      let handle;
      this._listener[model.uri.toString()] = model.onDidChangeContent(() => {
        window.clearTimeout(handle);
        handle = window.setTimeout(() => this._doValidate(model.uri, modeId), 500);
      });
      this._doValidate(model.uri, modeId);
    };
    const onModelRemoved = (model) => {
      monaco_editor_core_exports.editor.setModelMarkers(model, this._languageId, []);
      let uriStr = model.uri.toString();
      let listener = this._listener[uriStr];
      if (listener) {
        listener.dispose();
        delete this._listener[uriStr];
      }
    };
    this._disposables.push(monaco_editor_core_exports.editor.onDidCreateModel(onModelAdd));
    this._disposables.push(monaco_editor_core_exports.editor.onWillDisposeModel(onModelRemoved));
    this._disposables.push(
      monaco_editor_core_exports.editor.onDidChangeModelLanguage((event) => {
        onModelRemoved(event.model);
        onModelAdd(event.model);
      })
    );
    this._disposables.push(
      configChangeEvent((_) => {
        monaco_editor_core_exports.editor.getModels().forEach((model) => {
          if (model.getLanguageId() === this._languageId) {
            onModelRemoved(model);
            onModelAdd(model);
          }
        });
      })
    );
    this._disposables.push({
      dispose: () => {
        monaco_editor_core_exports.editor.getModels().forEach(onModelRemoved);
        for (let key in this._listener) {
          this._listener[key].dispose();
        }
      }
    });
    monaco_editor_core_exports.editor.getModels().forEach(onModelAdd);
  }
  dispose() {
    this._disposables.forEach((d) => d && d.dispose());
    this._disposables.length = 0;
  }
  _doValidate(resource, languageId) {
    this._worker(resource).then((worker2) => {
      return worker2.doValidation(resource.toString());
    }).then((diagnostics) => {
      const markers = diagnostics.map((d) => toDiagnostics(resource, d));
      let model = monaco_editor_core_exports.editor.getModel(resource);
      if (model && model.getLanguageId() === languageId) {
        monaco_editor_core_exports.editor.setModelMarkers(model, languageId, markers);
      }
    }).then(void 0, (err) => {
      console.error(err);
    });
  }
};
function toSeverity(lsSeverity) {
  switch (lsSeverity) {
    case DiagnosticSeverity.Error:
      return monaco_editor_core_exports.MarkerSeverity.Error;
    case DiagnosticSeverity.Warning:
      return monaco_editor_core_exports.MarkerSeverity.Warning;
    case DiagnosticSeverity.Information:
      return monaco_editor_core_exports.MarkerSeverity.Info;
    case DiagnosticSeverity.Hint:
      return monaco_editor_core_exports.MarkerSeverity.Hint;
    default:
      return monaco_editor_core_exports.MarkerSeverity.Info;
  }
}
function toDiagnostics(resource, diag) {
  let code = typeof diag.code === "number" ? String(diag.code) : diag.code;
  return {
    severity: toSeverity(diag.severity),
    startLineNumber: diag.range.start.line + 1,
    startColumn: diag.range.start.character + 1,
    endLineNumber: diag.range.end.line + 1,
    endColumn: diag.range.end.character + 1,
    message: diag.message,
    code,
    source: diag.source
  };
}
var CompletionAdapter = class {
  constructor(_worker, _triggerCharacters) {
    this._worker = _worker;
    this._triggerCharacters = _triggerCharacters;
  }
  get triggerCharacters() {
    return this._triggerCharacters;
  }
  provideCompletionItems(model, position, context, token) {
    const resource = model.uri;
    return this._worker(resource).then((worker2) => {
      return worker2.doComplete(resource.toString(), fromPosition(position));
    }).then((info) => {
      if (!info) {
        return;
      }
      const wordInfo = model.getWordUntilPosition(position);
      const wordRange = new monaco_editor_core_exports.Range(
        position.lineNumber,
        wordInfo.startColumn,
        position.lineNumber,
        wordInfo.endColumn
      );
      const items = info.items.map((entry) => {
        const item = {
          label: entry.label,
          insertText: entry.insertText || entry.label,
          sortText: entry.sortText,
          filterText: entry.filterText,
          documentation: entry.documentation,
          detail: entry.detail,
          command: toCommand(entry.command),
          range: wordRange,
          kind: toCompletionItemKind(entry.kind)
        };
        if (entry.textEdit) {
          if (isInsertReplaceEdit(entry.textEdit)) {
            item.range = {
              insert: toRange(entry.textEdit.insert),
              replace: toRange(entry.textEdit.replace)
            };
          } else {
            item.range = toRange(entry.textEdit.range);
          }
          item.insertText = entry.textEdit.newText;
        }
        if (entry.additionalTextEdits) {
          item.additionalTextEdits = entry.additionalTextEdits.map(toTextEdit);
        }
        if (entry.insertTextFormat === InsertTextFormat.Snippet) {
          item.insertTextRules = monaco_editor_core_exports.languages.CompletionItemInsertTextRule.InsertAsSnippet;
        }
        return item;
      });
      return {
        isIncomplete: info.isIncomplete,
        suggestions: items
      };
    });
  }
};
function fromPosition(position) {
  if (!position) {
    return void 0;
  }
  return { character: position.column - 1, line: position.lineNumber - 1 };
}
function fromRange(range) {
  if (!range) {
    return void 0;
  }
  return {
    start: {
      line: range.startLineNumber - 1,
      character: range.startColumn - 1
    },
    end: { line: range.endLineNumber - 1, character: range.endColumn - 1 }
  };
}
function toRange(range) {
  if (!range) {
    return void 0;
  }
  return new monaco_editor_core_exports.Range(
    range.start.line + 1,
    range.start.character + 1,
    range.end.line + 1,
    range.end.character + 1
  );
}
function isInsertReplaceEdit(edit) {
  return typeof edit.insert !== "undefined" && typeof edit.replace !== "undefined";
}
function toCompletionItemKind(kind) {
  const mItemKind = monaco_editor_core_exports.languages.CompletionItemKind;
  switch (kind) {
    case CompletionItemKind.Text:
      return mItemKind.Text;
    case CompletionItemKind.Method:
      return mItemKind.Method;
    case CompletionItemKind.Function:
      return mItemKind.Function;
    case CompletionItemKind.Constructor:
      return mItemKind.Constructor;
    case CompletionItemKind.Field:
      return mItemKind.Field;
    case CompletionItemKind.Variable:
      return mItemKind.Variable;
    case CompletionItemKind.Class:
      return mItemKind.Class;
    case CompletionItemKind.Interface:
      return mItemKind.Interface;
    case CompletionItemKind.Module:
      return mItemKind.Module;
    case CompletionItemKind.Property:
      return mItemKind.Property;
    case CompletionItemKind.Unit:
      return mItemKind.Unit;
    case CompletionItemKind.Value:
      return mItemKind.Value;
    case CompletionItemKind.Enum:
      return mItemKind.Enum;
    case CompletionItemKind.Keyword:
      return mItemKind.Keyword;
    case CompletionItemKind.Snippet:
      return mItemKind.Snippet;
    case CompletionItemKind.Color:
      return mItemKind.Color;
    case CompletionItemKind.File:
      return mItemKind.File;
    case CompletionItemKind.Reference:
      return mItemKind.Reference;
  }
  return mItemKind.Property;
}
function toTextEdit(textEdit) {
  if (!textEdit) {
    return void 0;
  }
  return {
    range: toRange(textEdit.range),
    text: textEdit.newText
  };
}
function toCommand(c) {
  return c && c.command === "editor.action.triggerSuggest" ? { id: c.command, title: c.title, arguments: c.arguments } : void 0;
}
var HoverAdapter = class {
  constructor(_worker) {
    this._worker = _worker;
  }
  provideHover(model, position, token) {
    let resource = model.uri;
    return this._worker(resource).then((worker2) => {
      return worker2.doHover(resource.toString(), fromPosition(position));
    }).then((info) => {
      if (!info) {
        return;
      }
      return {
        range: toRange(info.range),
        contents: toMarkedStringArray(info.contents)
      };
    });
  }
};
function isMarkupContent(thing) {
  return thing && typeof thing === "object" && typeof thing.kind === "string";
}
function toMarkdownString(entry) {
  if (typeof entry === "string") {
    return {
      value: entry
    };
  }
  if (isMarkupContent(entry)) {
    if (entry.kind === "plaintext") {
      return {
        value: entry.value.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&")
      };
    }
    return {
      value: entry.value
    };
  }
  return { value: "```" + entry.language + "\n" + entry.value + "\n```\n" };
}
function toMarkedStringArray(contents) {
  if (!contents) {
    return void 0;
  }
  if (Array.isArray(contents)) {
    return contents.map(toMarkdownString);
  }
  return [toMarkdownString(contents)];
}
var DocumentHighlightAdapter = class {
  constructor(_worker) {
    this._worker = _worker;
  }
  provideDocumentHighlights(model, position, token) {
    const resource = model.uri;
    return this._worker(resource).then((worker2) => worker2.findDocumentHighlights(resource.toString(), fromPosition(position))).then((entries) => {
      if (!entries) {
        return;
      }
      return entries.map((entry) => {
        return {
          range: toRange(entry.range),
          kind: toDocumentHighlightKind(entry.kind)
        };
      });
    });
  }
};
function toDocumentHighlightKind(kind) {
  switch (kind) {
    case DocumentHighlightKind.Read:
      return monaco_editor_core_exports.languages.DocumentHighlightKind.Read;
    case DocumentHighlightKind.Write:
      return monaco_editor_core_exports.languages.DocumentHighlightKind.Write;
    case DocumentHighlightKind.Text:
      return monaco_editor_core_exports.languages.DocumentHighlightKind.Text;
  }
  return monaco_editor_core_exports.languages.DocumentHighlightKind.Text;
}
var DefinitionAdapter = class {
  constructor(_worker) {
    this._worker = _worker;
  }
  provideDefinition(model, position, token) {
    const resource = model.uri;
    return this._worker(resource).then((worker2) => {
      return worker2.findDefinition(resource.toString(), fromPosition(position));
    }).then((definition) => {
      if (!definition) {
        return;
      }
      return [toLocation(definition)];
    });
  }
};
function toLocation(location) {
  return {
    uri: monaco_editor_core_exports.Uri.parse(location.uri),
    range: toRange(location.range)
  };
}
var ReferenceAdapter = class {
  constructor(_worker) {
    this._worker = _worker;
  }
  provideReferences(model, position, context, token) {
    const resource = model.uri;
    return this._worker(resource).then((worker2) => {
      return worker2.findReferences(resource.toString(), fromPosition(position));
    }).then((entries) => {
      if (!entries) {
        return;
      }
      return entries.map(toLocation);
    });
  }
};
var RenameAdapter = class {
  constructor(_worker) {
    this._worker = _worker;
  }
  provideRenameEdits(model, position, newName, token) {
    const resource = model.uri;
    return this._worker(resource).then((worker2) => {
      return worker2.doRename(resource.toString(), fromPosition(position), newName);
    }).then((edit) => {
      return toWorkspaceEdit(edit);
    });
  }
};
function toWorkspaceEdit(edit) {
  if (!edit || !edit.changes) {
    return void 0;
  }
  let resourceEdits = [];
  for (let uri in edit.changes) {
    const _uri = monaco_editor_core_exports.Uri.parse(uri);
    for (let e of edit.changes[uri]) {
      resourceEdits.push({
        resource: _uri,
        versionId: void 0,
        textEdit: {
          range: toRange(e.range),
          text: e.newText
        }
      });
    }
  }
  return {
    edits: resourceEdits
  };
}
var DocumentSymbolAdapter = class {
  constructor(_worker) {
    this._worker = _worker;
  }
  provideDocumentSymbols(model, token) {
    const resource = model.uri;
    return this._worker(resource).then((worker2) => worker2.findDocumentSymbols(resource.toString())).then((items) => {
      if (!items) {
        return;
      }
      return items.map((item) => {
        if (isDocumentSymbol(item)) {
          return toDocumentSymbol(item);
        }
        return {
          name: item.name,
          detail: "",
          containerName: item.containerName,
          kind: toSymbolKind(item.kind),
          range: toRange(item.location.range),
          selectionRange: toRange(item.location.range),
          tags: []
        };
      });
    });
  }
};
function isDocumentSymbol(symbol) {
  return "children" in symbol;
}
function toDocumentSymbol(symbol) {
  return {
    name: symbol.name,
    detail: symbol.detail ?? "",
    kind: toSymbolKind(symbol.kind),
    range: toRange(symbol.range),
    selectionRange: toRange(symbol.selectionRange),
    tags: symbol.tags ?? [],
    children: (symbol.children ?? []).map((item) => toDocumentSymbol(item))
  };
}
function toSymbolKind(kind) {
  let mKind = monaco_editor_core_exports.languages.SymbolKind;
  switch (kind) {
    case SymbolKind.File:
      return mKind.File;
    case SymbolKind.Module:
      return mKind.Module;
    case SymbolKind.Namespace:
      return mKind.Namespace;
    case SymbolKind.Package:
      return mKind.Package;
    case SymbolKind.Class:
      return mKind.Class;
    case SymbolKind.Method:
      return mKind.Method;
    case SymbolKind.Property:
      return mKind.Property;
    case SymbolKind.Field:
      return mKind.Field;
    case SymbolKind.Constructor:
      return mKind.Constructor;
    case SymbolKind.Enum:
      return mKind.Enum;
    case SymbolKind.Interface:
      return mKind.Interface;
    case SymbolKind.Function:
      return mKind.Function;
    case SymbolKind.Variable:
      return mKind.Variable;
    case SymbolKind.Constant:
      return mKind.Constant;
    case SymbolKind.String:
      return mKind.String;
    case SymbolKind.Number:
      return mKind.Number;
    case SymbolKind.Boolean:
      return mKind.Boolean;
    case SymbolKind.Array:
      return mKind.Array;
  }
  return mKind.Function;
}
var DocumentLinkAdapter = class {
  constructor(_worker) {
    this._worker = _worker;
  }
  provideLinks(model, token) {
    const resource = model.uri;
    return this._worker(resource).then((worker2) => worker2.findDocumentLinks(resource.toString())).then((items) => {
      if (!items) {
        return;
      }
      return {
        links: items.map((item) => ({
          range: toRange(item.range),
          url: item.target
        }))
      };
    });
  }
};
var DocumentFormattingEditProvider = class {
  constructor(_worker) {
    this._worker = _worker;
  }
  provideDocumentFormattingEdits(model, options, token) {
    const resource = model.uri;
    return this._worker(resource).then((worker2) => {
      return worker2.format(resource.toString(), null, fromFormattingOptions(options)).then((edits) => {
        if (!edits || edits.length === 0) {
          return;
        }
        return edits.map(toTextEdit);
      });
    });
  }
};
var DocumentRangeFormattingEditProvider = class {
  constructor(_worker) {
    this._worker = _worker;
    this.canFormatMultipleRanges = false;
  }
  provideDocumentRangeFormattingEdits(model, range, options, token) {
    const resource = model.uri;
    return this._worker(resource).then((worker2) => {
      return worker2.format(resource.toString(), fromRange(range), fromFormattingOptions(options)).then((edits) => {
        if (!edits || edits.length === 0) {
          return;
        }
        return edits.map(toTextEdit);
      });
    });
  }
};
function fromFormattingOptions(options) {
  return {
    tabSize: options.tabSize,
    insertSpaces: options.insertSpaces
  };
}
var DocumentColorAdapter = class {
  constructor(_worker) {
    this._worker = _worker;
  }
  provideDocumentColors(model, token) {
    const resource = model.uri;
    return this._worker(resource).then((worker2) => worker2.findDocumentColors(resource.toString())).then((infos) => {
      if (!infos) {
        return;
      }
      return infos.map((item) => ({
        color: item.color,
        range: toRange(item.range)
      }));
    });
  }
  provideColorPresentations(model, info, token) {
    const resource = model.uri;
    return this._worker(resource).then(
      (worker2) => worker2.getColorPresentations(resource.toString(), info.color, fromRange(info.range))
    ).then((presentations) => {
      if (!presentations) {
        return;
      }
      return presentations.map((presentation) => {
        let item = {
          label: presentation.label
        };
        if (presentation.textEdit) {
          item.textEdit = toTextEdit(presentation.textEdit);
        }
        if (presentation.additionalTextEdits) {
          item.additionalTextEdits = presentation.additionalTextEdits.map(toTextEdit);
        }
        return item;
      });
    });
  }
};
var FoldingRangeAdapter = class {
  constructor(_worker) {
    this._worker = _worker;
  }
  provideFoldingRanges(model, context, token) {
    const resource = model.uri;
    return this._worker(resource).then((worker2) => worker2.getFoldingRanges(resource.toString(), context)).then((ranges) => {
      if (!ranges) {
        return;
      }
      return ranges.map((range) => {
        const result = {
          start: range.startLine + 1,
          end: range.endLine + 1
        };
        if (typeof range.kind !== "undefined") {
          result.kind = toFoldingRangeKind(range.kind);
        }
        return result;
      });
    });
  }
};
function toFoldingRangeKind(kind) {
  switch (kind) {
    case FoldingRangeKind.Comment:
      return monaco_editor_core_exports.languages.FoldingRangeKind.Comment;
    case FoldingRangeKind.Imports:
      return monaco_editor_core_exports.languages.FoldingRangeKind.Imports;
    case FoldingRangeKind.Region:
      return monaco_editor_core_exports.languages.FoldingRangeKind.Region;
  }
  return void 0;
}
var SelectionRangeAdapter = class {
  constructor(_worker) {
    this._worker = _worker;
  }
  provideSelectionRanges(model, positions, token) {
    const resource = model.uri;
    return this._worker(resource).then(
      (worker2) => worker2.getSelectionRanges(
        resource.toString(),
        positions.map(fromPosition)
      )
    ).then((selectionRanges) => {
      if (!selectionRanges) {
        return;
      }
      return selectionRanges.map((selectionRange) => {
        const result = [];
        while (selectionRange) {
          result.push({ range: toRange(selectionRange.range) });
          selectionRange = selectionRange.parent;
        }
        return result;
      });
    });
  }
};

// node_modules/jsonc-parser/lib/esm/impl/scanner.js
function createScanner(text, ignoreTrivia = false) {
  const len = text.length;
  let pos = 0, value = "", tokenOffset = 0, token = 16, lineNumber = 0, lineStartOffset = 0, tokenLineStartOffset = 0, prevTokenLineStartOffset = 0, scanError = 0;
  function scanHexDigits(count, exact) {
    let digits = 0;
    let value2 = 0;
    while (digits < count || !exact) {
      let ch = text.charCodeAt(pos);
      if (ch >= 48 && ch <= 57) {
        value2 = value2 * 16 + ch - 48;
      } else if (ch >= 65 && ch <= 70) {
        value2 = value2 * 16 + ch - 65 + 10;
      } else if (ch >= 97 && ch <= 102) {
        value2 = value2 * 16 + ch - 97 + 10;
      } else {
        break;
      }
      pos++;
      digits++;
    }
    if (digits < count) {
      value2 = -1;
    }
    return value2;
  }
  function setPosition(newPosition) {
    pos = newPosition;
    value = "";
    tokenOffset = 0;
    token = 16;
    scanError = 0;
  }
  function scanNumber() {
    let start = pos;
    if (text.charCodeAt(pos) === 48) {
      pos++;
    } else {
      pos++;
      while (pos < text.length && isDigit(text.charCodeAt(pos))) {
        pos++;
      }
    }
    if (pos < text.length && text.charCodeAt(pos) === 46) {
      pos++;
      if (pos < text.length && isDigit(text.charCodeAt(pos))) {
        pos++;
        while (pos < text.length && isDigit(text.charCodeAt(pos))) {
          pos++;
        }
      } else {
        scanError = 3;
        return text.substring(start, pos);
      }
    }
    let end = pos;
    if (pos < text.length && (text.charCodeAt(pos) === 69 || text.charCodeAt(pos) === 101)) {
      pos++;
      if (pos < text.length && text.charCodeAt(pos) === 43 || text.charCodeAt(pos) === 45) {
        pos++;
      }
      if (pos < text.length && isDigit(text.charCodeAt(pos))) {
        pos++;
        while (pos < text.length && isDigit(text.charCodeAt(pos))) {
          pos++;
        }
        end = pos;
      } else {
        scanError = 3;
      }
    }
    return text.substring(start, end);
  }
  function scanString() {
    let result = "", start = pos;
    while (true) {
      if (pos >= len) {
        result += text.substring(start, pos);
        scanError = 2;
        break;
      }
      const ch = text.charCodeAt(pos);
      if (ch === 34) {
        result += text.substring(start, pos);
        pos++;
        break;
      }
      if (ch === 92) {
        result += text.substring(start, pos);
        pos++;
        if (pos >= len) {
          scanError = 2;
          break;
        }
        const ch2 = text.charCodeAt(pos++);
        switch (ch2) {
          case 34:
            result += '"';
            break;
          case 92:
            result += "\\";
            break;
          case 47:
            result += "/";
            break;
          case 98:
            result += "\b";
            break;
          case 102:
            result += "\f";
            break;
          case 110:
            result += "\n";
            break;
          case 114:
            result += "\r";
            break;
          case 116:
            result += "	";
            break;
          case 117:
            const ch3 = scanHexDigits(4, true);
            if (ch3 >= 0) {
              result += String.fromCharCode(ch3);
            } else {
              scanError = 4;
            }
            break;
          default:
            scanError = 5;
        }
        start = pos;
        continue;
      }
      if (ch >= 0 && ch <= 31) {
        if (isLineBreak(ch)) {
          result += text.substring(start, pos);
          scanError = 2;
          break;
        } else {
          scanError = 6;
        }
      }
      pos++;
    }
    return result;
  }
  function scanNext() {
    value = "";
    scanError = 0;
    tokenOffset = pos;
    lineStartOffset = lineNumber;
    prevTokenLineStartOffset = tokenLineStartOffset;
    if (pos >= len) {
      tokenOffset = len;
      return token = 17;
    }
    let code = text.charCodeAt(pos);
    if (isWhiteSpace(code)) {
      do {
        pos++;
        value += String.fromCharCode(code);
        code = text.charCodeAt(pos);
      } while (isWhiteSpace(code));
      return token = 15;
    }
    if (isLineBreak(code)) {
      pos++;
      value += String.fromCharCode(code);
      if (code === 13 && text.charCodeAt(pos) === 10) {
        pos++;
        value += "\n";
      }
      lineNumber++;
      tokenLineStartOffset = pos;
      return token = 14;
    }
    switch (code) {
      case 123:
        pos++;
        return token = 1;
      case 125:
        pos++;
        return token = 2;
      case 91:
        pos++;
        return token = 3;
      case 93:
        pos++;
        return token = 4;
      case 58:
        pos++;
        return token = 6;
      case 44:
        pos++;
        return token = 5;
      case 34:
        pos++;
        value = scanString();
        return token = 10;
      case 47:
        const start = pos - 1;
        if (text.charCodeAt(pos + 1) === 47) {
          pos += 2;
          while (pos < len) {
            if (isLineBreak(text.charCodeAt(pos))) {
              break;
            }
            pos++;
          }
          value = text.substring(start, pos);
          return token = 12;
        }
        if (text.charCodeAt(pos + 1) === 42) {
          pos += 2;
          const safeLength = len - 1;
          let commentClosed = false;
          while (pos < safeLength) {
            const ch = text.charCodeAt(pos);
            if (ch === 42 && text.charCodeAt(pos + 1) === 47) {
              pos += 2;
              commentClosed = true;
              break;
            }
            pos++;
            if (isLineBreak(ch)) {
              if (ch === 13 && text.charCodeAt(pos) === 10) {
                pos++;
              }
              lineNumber++;
              tokenLineStartOffset = pos;
            }
          }
          if (!commentClosed) {
            pos++;
            scanError = 1;
          }
          value = text.substring(start, pos);
          return token = 13;
        }
        value += String.fromCharCode(code);
        pos++;
        return token = 16;
      case 45:
        value += String.fromCharCode(code);
        pos++;
        if (pos === len || !isDigit(text.charCodeAt(pos))) {
          return token = 16;
        }
      case 48:
      case 49:
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
        value += scanNumber();
        return token = 11;
      default:
        while (pos < len && isUnknownContentCharacter(code)) {
          pos++;
          code = text.charCodeAt(pos);
        }
        if (tokenOffset !== pos) {
          value = text.substring(tokenOffset, pos);
          switch (value) {
            case "true":
              return token = 8;
            case "false":
              return token = 9;
            case "null":
              return token = 7;
          }
          return token = 16;
        }
        value += String.fromCharCode(code);
        pos++;
        return token = 16;
    }
  }
  function isUnknownContentCharacter(code) {
    if (isWhiteSpace(code) || isLineBreak(code)) {
      return false;
    }
    switch (code) {
      case 125:
      case 93:
      case 123:
      case 91:
      case 34:
      case 58:
      case 44:
      case 47:
        return false;
    }
    return true;
  }
  function scanNextNonTrivia() {
    let result;
    do {
      result = scanNext();
    } while (result >= 12 && result <= 15);
    return result;
  }
  return {
    setPosition,
    getPosition: () => pos,
    scan: ignoreTrivia ? scanNextNonTrivia : scanNext,
    getToken: () => token,
    getTokenValue: () => value,
    getTokenOffset: () => tokenOffset,
    getTokenLength: () => pos - tokenOffset,
    getTokenStartLine: () => lineStartOffset,
    getTokenStartCharacter: () => tokenOffset - prevTokenLineStartOffset,
    getTokenError: () => scanError
  };
}
function isWhiteSpace(ch) {
  return ch === 32 || ch === 9;
}
function isLineBreak(ch) {
  return ch === 10 || ch === 13;
}
function isDigit(ch) {
  return ch >= 48 && ch <= 57;
}
var CharacterCodes;
(function(CharacterCodes2) {
  CharacterCodes2[CharacterCodes2["lineFeed"] = 10] = "lineFeed";
  CharacterCodes2[CharacterCodes2["carriageReturn"] = 13] = "carriageReturn";
  CharacterCodes2[CharacterCodes2["space"] = 32] = "space";
  CharacterCodes2[CharacterCodes2["_0"] = 48] = "_0";
  CharacterCodes2[CharacterCodes2["_1"] = 49] = "_1";
  CharacterCodes2[CharacterCodes2["_2"] = 50] = "_2";
  CharacterCodes2[CharacterCodes2["_3"] = 51] = "_3";
  CharacterCodes2[CharacterCodes2["_4"] = 52] = "_4";
  CharacterCodes2[CharacterCodes2["_5"] = 53] = "_5";
  CharacterCodes2[CharacterCodes2["_6"] = 54] = "_6";
  CharacterCodes2[CharacterCodes2["_7"] = 55] = "_7";
  CharacterCodes2[CharacterCodes2["_8"] = 56] = "_8";
  CharacterCodes2[CharacterCodes2["_9"] = 57] = "_9";
  CharacterCodes2[CharacterCodes2["a"] = 97] = "a";
  CharacterCodes2[CharacterCodes2["b"] = 98] = "b";
  CharacterCodes2[CharacterCodes2["c"] = 99] = "c";
  CharacterCodes2[CharacterCodes2["d"] = 100] = "d";
  CharacterCodes2[CharacterCodes2["e"] = 101] = "e";
  CharacterCodes2[CharacterCodes2["f"] = 102] = "f";
  CharacterCodes2[CharacterCodes2["g"] = 103] = "g";
  CharacterCodes2[CharacterCodes2["h"] = 104] = "h";
  CharacterCodes2[CharacterCodes2["i"] = 105] = "i";
  CharacterCodes2[CharacterCodes2["j"] = 106] = "j";
  CharacterCodes2[CharacterCodes2["k"] = 107] = "k";
  CharacterCodes2[CharacterCodes2["l"] = 108] = "l";
  CharacterCodes2[CharacterCodes2["m"] = 109] = "m";
  CharacterCodes2[CharacterCodes2["n"] = 110] = "n";
  CharacterCodes2[CharacterCodes2["o"] = 111] = "o";
  CharacterCodes2[CharacterCodes2["p"] = 112] = "p";
  CharacterCodes2[CharacterCodes2["q"] = 113] = "q";
  CharacterCodes2[CharacterCodes2["r"] = 114] = "r";
  CharacterCodes2[CharacterCodes2["s"] = 115] = "s";
  CharacterCodes2[CharacterCodes2["t"] = 116] = "t";
  CharacterCodes2[CharacterCodes2["u"] = 117] = "u";
  CharacterCodes2[CharacterCodes2["v"] = 118] = "v";
  CharacterCodes2[CharacterCodes2["w"] = 119] = "w";
  CharacterCodes2[CharacterCodes2["x"] = 120] = "x";
  CharacterCodes2[CharacterCodes2["y"] = 121] = "y";
  CharacterCodes2[CharacterCodes2["z"] = 122] = "z";
  CharacterCodes2[CharacterCodes2["A"] = 65] = "A";
  CharacterCodes2[CharacterCodes2["B"] = 66] = "B";
  CharacterCodes2[CharacterCodes2["C"] = 67] = "C";
  CharacterCodes2[CharacterCodes2["D"] = 68] = "D";
  CharacterCodes2[CharacterCodes2["E"] = 69] = "E";
  CharacterCodes2[CharacterCodes2["F"] = 70] = "F";
  CharacterCodes2[CharacterCodes2["G"] = 71] = "G";
  CharacterCodes2[CharacterCodes2["H"] = 72] = "H";
  CharacterCodes2[CharacterCodes2["I"] = 73] = "I";
  CharacterCodes2[CharacterCodes2["J"] = 74] = "J";
  CharacterCodes2[CharacterCodes2["K"] = 75] = "K";
  CharacterCodes2[CharacterCodes2["L"] = 76] = "L";
  CharacterCodes2[CharacterCodes2["M"] = 77] = "M";
  CharacterCodes2[CharacterCodes2["N"] = 78] = "N";
  CharacterCodes2[CharacterCodes2["O"] = 79] = "O";
  CharacterCodes2[CharacterCodes2["P"] = 80] = "P";
  CharacterCodes2[CharacterCodes2["Q"] = 81] = "Q";
  CharacterCodes2[CharacterCodes2["R"] = 82] = "R";
  CharacterCodes2[CharacterCodes2["S"] = 83] = "S";
  CharacterCodes2[CharacterCodes2["T"] = 84] = "T";
  CharacterCodes2[CharacterCodes2["U"] = 85] = "U";
  CharacterCodes2[CharacterCodes2["V"] = 86] = "V";
  CharacterCodes2[CharacterCodes2["W"] = 87] = "W";
  CharacterCodes2[CharacterCodes2["X"] = 88] = "X";
  CharacterCodes2[CharacterCodes2["Y"] = 89] = "Y";
  CharacterCodes2[CharacterCodes2["Z"] = 90] = "Z";
  CharacterCodes2[CharacterCodes2["asterisk"] = 42] = "asterisk";
  CharacterCodes2[CharacterCodes2["backslash"] = 92] = "backslash";
  CharacterCodes2[CharacterCodes2["closeBrace"] = 125] = "closeBrace";
  CharacterCodes2[CharacterCodes2["closeBracket"] = 93] = "closeBracket";
  CharacterCodes2[CharacterCodes2["colon"] = 58] = "colon";
  CharacterCodes2[CharacterCodes2["comma"] = 44] = "comma";
  CharacterCodes2[CharacterCodes2["dot"] = 46] = "dot";
  CharacterCodes2[CharacterCodes2["doubleQuote"] = 34] = "doubleQuote";
  CharacterCodes2[CharacterCodes2["minus"] = 45] = "minus";
  CharacterCodes2[CharacterCodes2["openBrace"] = 123] = "openBrace";
  CharacterCodes2[CharacterCodes2["openBracket"] = 91] = "openBracket";
  CharacterCodes2[CharacterCodes2["plus"] = 43] = "plus";
  CharacterCodes2[CharacterCodes2["slash"] = 47] = "slash";
  CharacterCodes2[CharacterCodes2["formFeed"] = 12] = "formFeed";
  CharacterCodes2[CharacterCodes2["tab"] = 9] = "tab";
})(CharacterCodes || (CharacterCodes = {}));

// node_modules/jsonc-parser/lib/esm/impl/string-intern.js
var cachedSpaces = new Array(20).fill(0).map((_, index) => {
  return " ".repeat(index);
});
var maxCachedValues = 200;
var cachedBreakLinesWithSpaces = {
  " ": {
    "\n": new Array(maxCachedValues).fill(0).map((_, index) => {
      return "\n" + " ".repeat(index);
    }),
    "\r": new Array(maxCachedValues).fill(0).map((_, index) => {
      return "\r" + " ".repeat(index);
    }),
    "\r\n": new Array(maxCachedValues).fill(0).map((_, index) => {
      return "\r\n" + " ".repeat(index);
    })
  },
  "	": {
    "\n": new Array(maxCachedValues).fill(0).map((_, index) => {
      return "\n" + "	".repeat(index);
    }),
    "\r": new Array(maxCachedValues).fill(0).map((_, index) => {
      return "\r" + "	".repeat(index);
    }),
    "\r\n": new Array(maxCachedValues).fill(0).map((_, index) => {
      return "\r\n" + "	".repeat(index);
    })
  }
};

// node_modules/jsonc-parser/lib/esm/impl/parser.js
var ParseOptions;
(function(ParseOptions2) {
  ParseOptions2.DEFAULT = {
    allowTrailingComma: false
  };
})(ParseOptions || (ParseOptions = {}));

// node_modules/jsonc-parser/lib/esm/main.js
var createScanner2 = createScanner;
var ScanError;
(function(ScanError2) {
  ScanError2[ScanError2["None"] = 0] = "None";
  ScanError2[ScanError2["UnexpectedEndOfComment"] = 1] = "UnexpectedEndOfComment";
  ScanError2[ScanError2["UnexpectedEndOfString"] = 2] = "UnexpectedEndOfString";
  ScanError2[ScanError2["UnexpectedEndOfNumber"] = 3] = "UnexpectedEndOfNumber";
  ScanError2[ScanError2["InvalidUnicode"] = 4] = "InvalidUnicode";
  ScanError2[ScanError2["InvalidEscapeCharacter"] = 5] = "InvalidEscapeCharacter";
  ScanError2[ScanError2["InvalidCharacter"] = 6] = "InvalidCharacter";
})(ScanError || (ScanError = {}));
var SyntaxKind;
(function(SyntaxKind2) {
  SyntaxKind2[SyntaxKind2["OpenBraceToken"] = 1] = "OpenBraceToken";
  SyntaxKind2[SyntaxKind2["CloseBraceToken"] = 2] = "CloseBraceToken";
  SyntaxKind2[SyntaxKind2["OpenBracketToken"] = 3] = "OpenBracketToken";
  SyntaxKind2[SyntaxKind2["CloseBracketToken"] = 4] = "CloseBracketToken";
  SyntaxKind2[SyntaxKind2["CommaToken"] = 5] = "CommaToken";
  SyntaxKind2[SyntaxKind2["ColonToken"] = 6] = "ColonToken";
  SyntaxKind2[SyntaxKind2["NullKeyword"] = 7] = "NullKeyword";
  SyntaxKind2[SyntaxKind2["TrueKeyword"] = 8] = "TrueKeyword";
  SyntaxKind2[SyntaxKind2["FalseKeyword"] = 9] = "FalseKeyword";
  SyntaxKind2[SyntaxKind2["StringLiteral"] = 10] = "StringLiteral";
  SyntaxKind2[SyntaxKind2["NumericLiteral"] = 11] = "NumericLiteral";
  SyntaxKind2[SyntaxKind2["LineCommentTrivia"] = 12] = "LineCommentTrivia";
  SyntaxKind2[SyntaxKind2["BlockCommentTrivia"] = 13] = "BlockCommentTrivia";
  SyntaxKind2[SyntaxKind2["LineBreakTrivia"] = 14] = "LineBreakTrivia";
  SyntaxKind2[SyntaxKind2["Trivia"] = 15] = "Trivia";
  SyntaxKind2[SyntaxKind2["Unknown"] = 16] = "Unknown";
  SyntaxKind2[SyntaxKind2["EOF"] = 17] = "EOF";
})(SyntaxKind || (SyntaxKind = {}));
var ParseErrorCode;
(function(ParseErrorCode2) {
  ParseErrorCode2[ParseErrorCode2["InvalidSymbol"] = 1] = "InvalidSymbol";
  ParseErrorCode2[ParseErrorCode2["InvalidNumberFormat"] = 2] = "InvalidNumberFormat";
  ParseErrorCode2[ParseErrorCode2["PropertyNameExpected"] = 3] = "PropertyNameExpected";
  ParseErrorCode2[ParseErrorCode2["ValueExpected"] = 4] = "ValueExpected";
  ParseErrorCode2[ParseErrorCode2["ColonExpected"] = 5] = "ColonExpected";
  ParseErrorCode2[ParseErrorCode2["CommaExpected"] = 6] = "CommaExpected";
  ParseErrorCode2[ParseErrorCode2["CloseBraceExpected"] = 7] = "CloseBraceExpected";
  ParseErrorCode2[ParseErrorCode2["CloseBracketExpected"] = 8] = "CloseBracketExpected";
  ParseErrorCode2[ParseErrorCode2["EndOfFileExpected"] = 9] = "EndOfFileExpected";
  ParseErrorCode2[ParseErrorCode2["InvalidCommentToken"] = 10] = "InvalidCommentToken";
  ParseErrorCode2[ParseErrorCode2["UnexpectedEndOfComment"] = 11] = "UnexpectedEndOfComment";
  ParseErrorCode2[ParseErrorCode2["UnexpectedEndOfString"] = 12] = "UnexpectedEndOfString";
  ParseErrorCode2[ParseErrorCode2["UnexpectedEndOfNumber"] = 13] = "UnexpectedEndOfNumber";
  ParseErrorCode2[ParseErrorCode2["InvalidUnicode"] = 14] = "InvalidUnicode";
  ParseErrorCode2[ParseErrorCode2["InvalidEscapeCharacter"] = 15] = "InvalidEscapeCharacter";
  ParseErrorCode2[ParseErrorCode2["InvalidCharacter"] = 16] = "InvalidCharacter";
})(ParseErrorCode || (ParseErrorCode = {}));

// src/language/json/tokenization.ts
function createTokenizationSupport(supportComments) {
  return {
    getInitialState: () => new JSONState(null, null, false, null),
    tokenize: (line, state) => tokenize(supportComments, line, state)
  };
}
var TOKEN_DELIM_OBJECT = "delimiter.bracket.json";
var TOKEN_DELIM_ARRAY = "delimiter.array.json";
var TOKEN_DELIM_COLON = "delimiter.colon.json";
var TOKEN_DELIM_COMMA = "delimiter.comma.json";
var TOKEN_VALUE_BOOLEAN = "keyword.json";
var TOKEN_VALUE_NULL = "keyword.json";
var TOKEN_VALUE_STRING = "string.value.json";
var TOKEN_VALUE_NUMBER = "number.json";
var TOKEN_PROPERTY_NAME = "string.key.json";
var TOKEN_COMMENT_BLOCK = "comment.block.json";
var TOKEN_COMMENT_LINE = "comment.line.json";
var ParentsStack = class _ParentsStack {
  constructor(parent, type) {
    this.parent = parent;
    this.type = type;
  }
  static pop(parents) {
    if (parents) {
      return parents.parent;
    }
    return null;
  }
  static push(parents, type) {
    return new _ParentsStack(parents, type);
  }
  static equals(a, b) {
    if (!a && !b) {
      return true;
    }
    if (!a || !b) {
      return false;
    }
    while (a && b) {
      if (a === b) {
        return true;
      }
      if (a.type !== b.type) {
        return false;
      }
      a = a.parent;
      b = b.parent;
    }
    return true;
  }
};
var JSONState = class _JSONState {
  constructor(state, scanError, lastWasColon, parents) {
    this._state = state;
    this.scanError = scanError;
    this.lastWasColon = lastWasColon;
    this.parents = parents;
  }
  clone() {
    return new _JSONState(this._state, this.scanError, this.lastWasColon, this.parents);
  }
  equals(other) {
    if (other === this) {
      return true;
    }
    if (!other || !(other instanceof _JSONState)) {
      return false;
    }
    return this.scanError === other.scanError && this.lastWasColon === other.lastWasColon && ParentsStack.equals(this.parents, other.parents);
  }
  getStateData() {
    return this._state;
  }
  setStateData(state) {
    this._state = state;
  }
};
function tokenize(comments, line, state, offsetDelta = 0) {
  let numberOfInsertedCharacters = 0;
  let adjustOffset = false;
  switch (state.scanError) {
    case 2 /* UnexpectedEndOfString */:
      line = '"' + line;
      numberOfInsertedCharacters = 1;
      break;
    case 1 /* UnexpectedEndOfComment */:
      line = "/*" + line;
      numberOfInsertedCharacters = 2;
      break;
  }
  const scanner = createScanner2(line);
  let lastWasColon = state.lastWasColon;
  let parents = state.parents;
  const ret = {
    tokens: [],
    endState: state.clone()
  };
  while (true) {
    let offset = offsetDelta + scanner.getPosition();
    let type = "";
    const kind = scanner.scan();
    if (kind === 17 /* EOF */) {
      break;
    }
    if (offset === offsetDelta + scanner.getPosition()) {
      throw new Error(
        "Scanner did not advance, next 3 characters are: " + line.substr(scanner.getPosition(), 3)
      );
    }
    if (adjustOffset) {
      offset -= numberOfInsertedCharacters;
    }
    adjustOffset = numberOfInsertedCharacters > 0;
    switch (kind) {
      case 1 /* OpenBraceToken */:
        parents = ParentsStack.push(parents, 0 /* Object */);
        type = TOKEN_DELIM_OBJECT;
        lastWasColon = false;
        break;
      case 2 /* CloseBraceToken */:
        parents = ParentsStack.pop(parents);
        type = TOKEN_DELIM_OBJECT;
        lastWasColon = false;
        break;
      case 3 /* OpenBracketToken */:
        parents = ParentsStack.push(parents, 1 /* Array */);
        type = TOKEN_DELIM_ARRAY;
        lastWasColon = false;
        break;
      case 4 /* CloseBracketToken */:
        parents = ParentsStack.pop(parents);
        type = TOKEN_DELIM_ARRAY;
        lastWasColon = false;
        break;
      case 6 /* ColonToken */:
        type = TOKEN_DELIM_COLON;
        lastWasColon = true;
        break;
      case 5 /* CommaToken */:
        type = TOKEN_DELIM_COMMA;
        lastWasColon = false;
        break;
      case 8 /* TrueKeyword */:
      case 9 /* FalseKeyword */:
        type = TOKEN_VALUE_BOOLEAN;
        lastWasColon = false;
        break;
      case 7 /* NullKeyword */:
        type = TOKEN_VALUE_NULL;
        lastWasColon = false;
        break;
      case 10 /* StringLiteral */:
        const currentParent = parents ? parents.type : 0 /* Object */;
        const inArray = currentParent === 1 /* Array */;
        type = lastWasColon || inArray ? TOKEN_VALUE_STRING : TOKEN_PROPERTY_NAME;
        lastWasColon = false;
        break;
      case 11 /* NumericLiteral */:
        type = TOKEN_VALUE_NUMBER;
        lastWasColon = false;
        break;
    }
    if (comments) {
      switch (kind) {
        case 12 /* LineCommentTrivia */:
          type = TOKEN_COMMENT_LINE;
          break;
        case 13 /* BlockCommentTrivia */:
          type = TOKEN_COMMENT_BLOCK;
          break;
      }
    }
    ret.endState = new JSONState(
      state.getStateData(),
      scanner.getTokenError(),
      lastWasColon,
      parents
    );
    ret.tokens.push({
      startIndex: offset,
      scopes: type
    });
  }
  return ret;
}

// src/language/json/jsonMode.ts
var worker;
function getWorker() {
  return new Promise((resolve, reject) => {
    if (!worker) {
      return reject("JSON not registered!");
    }
    resolve(worker);
  });
}
var JSONDiagnosticsAdapter = class extends DiagnosticsAdapter {
  constructor(languageId, worker2, defaults) {
    super(languageId, worker2, defaults.onDidChange);
    this._disposables.push(
      monaco_editor_core_exports.editor.onWillDisposeModel((model) => {
        this._resetSchema(model.uri);
      })
    );
    this._disposables.push(
      monaco_editor_core_exports.editor.onDidChangeModelLanguage((event) => {
        this._resetSchema(event.model.uri);
      })
    );
  }
  _resetSchema(resource) {
    this._worker().then((worker2) => {
      worker2.resetSchema(resource.toString());
    });
  }
};
function setupMode(defaults) {
  const disposables = [];
  const providers = [];
  const client = new WorkerManager(defaults);
  disposables.push(client);
  worker = (...uris) => {
    return client.getLanguageServiceWorker(...uris);
  };
  function registerProviders() {
    const { languageId, modeConfiguration: modeConfiguration2 } = defaults;
    disposeAll(providers);
    if (modeConfiguration2.documentFormattingEdits) {
      providers.push(
        monaco_editor_core_exports.languages.registerDocumentFormattingEditProvider(
          languageId,
          new DocumentFormattingEditProvider(worker)
        )
      );
    }
    if (modeConfiguration2.documentRangeFormattingEdits) {
      providers.push(
        monaco_editor_core_exports.languages.registerDocumentRangeFormattingEditProvider(
          languageId,
          new DocumentRangeFormattingEditProvider(worker)
        )
      );
    }
    if (modeConfiguration2.completionItems) {
      providers.push(
        monaco_editor_core_exports.languages.registerCompletionItemProvider(
          languageId,
          new CompletionAdapter(worker, [" ", ":", '"'])
        )
      );
    }
    if (modeConfiguration2.hovers) {
      providers.push(
        monaco_editor_core_exports.languages.registerHoverProvider(languageId, new HoverAdapter(worker))
      );
    }
    if (modeConfiguration2.documentSymbols) {
      providers.push(
        monaco_editor_core_exports.languages.registerDocumentSymbolProvider(
          languageId,
          new DocumentSymbolAdapter(worker)
        )
      );
    }
    if (modeConfiguration2.tokens) {
      providers.push(monaco_editor_core_exports.languages.setTokensProvider(languageId, createTokenizationSupport(true)));
    }
    if (modeConfiguration2.colors) {
      providers.push(
        monaco_editor_core_exports.languages.registerColorProvider(
          languageId,
          new DocumentColorAdapter(worker)
        )
      );
    }
    if (modeConfiguration2.foldingRanges) {
      providers.push(
        monaco_editor_core_exports.languages.registerFoldingRangeProvider(
          languageId,
          new FoldingRangeAdapter(worker)
        )
      );
    }
    if (modeConfiguration2.diagnostics) {
      providers.push(new JSONDiagnosticsAdapter(languageId, worker, defaults));
    }
    if (modeConfiguration2.selectionRanges) {
      providers.push(
        monaco_editor_core_exports.languages.registerSelectionRangeProvider(
          languageId,
          new SelectionRangeAdapter(worker)
        )
      );
    }
  }
  registerProviders();
  disposables.push(monaco_editor_core_exports.languages.setLanguageConfiguration(defaults.languageId, richEditConfiguration));
  let modeConfiguration = defaults.modeConfiguration;
  defaults.onDidChange((newDefaults) => {
    if (newDefaults.modeConfiguration !== modeConfiguration) {
      modeConfiguration = newDefaults.modeConfiguration;
      registerProviders();
    }
  });
  disposables.push(asDisposable(providers));
  return asDisposable(disposables);
}
function asDisposable(disposables) {
  return { dispose: () => disposeAll(disposables) };
}
function disposeAll(disposables) {
  while (disposables.length) {
    disposables.pop().dispose();
  }
}
var richEditConfiguration = {
  wordPattern: /(-?\d*\.\d\w*)|([^\[\{\]\}\:\"\,\s]+)/g,
  comments: {
    lineComment: "//",
    blockComment: ["/*", "*/"]
  },
  brackets: [
    ["{", "}"],
    ["[", "]"]
  ],
  autoClosingPairs: [
    { open: "{", close: "}", notIn: ["string"] },
    { open: "[", close: "]", notIn: ["string"] },
    { open: '"', close: '"', notIn: ["string"] }
  ]
};



/***/ })

}]);
//# sourceMappingURL=monaco-language-jsonmode.bb05ffac.js.92291fda.map