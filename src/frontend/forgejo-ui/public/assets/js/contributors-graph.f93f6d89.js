(self["webpackChunkforgejo"] = self["webpackChunkforgejo"] || []).push([["contributors-graph"],{

/***/ "./node_modules/chart.js/dist/helpers.js":
/*!***********************************************!*\
  !*** ./node_modules/chart.js/dist/helpers.js ***!
  \***********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HALF_PI: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.H; },
/* harmony export */   INFINITY: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.b3; },
/* harmony export */   PI: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.P; },
/* harmony export */   PITAU: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.b2; },
/* harmony export */   QUARTER_PI: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.b5; },
/* harmony export */   RAD_PER_DEG: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.b4; },
/* harmony export */   TAU: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.T; },
/* harmony export */   TWO_THIRDS_PI: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.b6; },
/* harmony export */   _addGrace: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.R; },
/* harmony export */   _alignPixel: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.X; },
/* harmony export */   _alignStartEnd: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a2; },
/* harmony export */   _angleBetween: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.p; },
/* harmony export */   _angleDiff: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.b7; },
/* harmony export */   _arrayUnique: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__._; },
/* harmony export */   _attachContext: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a8; },
/* harmony export */   _bezierCurveTo: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.at; },
/* harmony export */   _bezierInterpolation: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aq; },
/* harmony export */   _boundSegment: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.ay; },
/* harmony export */   _boundSegments: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.ao; },
/* harmony export */   _capitalize: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a5; },
/* harmony export */   _computeSegments: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.an; },
/* harmony export */   _createResolver: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a9; },
/* harmony export */   _decimalPlaces: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aL; },
/* harmony export */   _deprecated: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aW; },
/* harmony export */   _descriptors: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aa; },
/* harmony export */   _elementsEqual: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.ai; },
/* harmony export */   _factorize: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.N; },
/* harmony export */   _filterBetween: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aP; },
/* harmony export */   _getParentNode: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.I; },
/* harmony export */   _getStartAndCountOfVisiblePoints: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.q; },
/* harmony export */   _int16Range: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.W; },
/* harmony export */   _isBetween: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.ak; },
/* harmony export */   _isClickEvent: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aj; },
/* harmony export */   _isDomSupported: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.M; },
/* harmony export */   _isPointInArea: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.C; },
/* harmony export */   _limitValue: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.S; },
/* harmony export */   _longestText: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aO; },
/* harmony export */   _lookup: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aQ; },
/* harmony export */   _lookupByKey: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.B; },
/* harmony export */   _measureText: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.V; },
/* harmony export */   _merger: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aU; },
/* harmony export */   _mergerIf: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aV; },
/* harmony export */   _normalizeAngle: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.az; },
/* harmony export */   _parseObjectDataRadialScale: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.y; },
/* harmony export */   _pointInLine: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.ar; },
/* harmony export */   _readValueToProps: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.al; },
/* harmony export */   _rlookupByKey: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.A; },
/* harmony export */   _scaleRangesChanged: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.w; },
/* harmony export */   _setMinAndMaxByKey: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aH; },
/* harmony export */   _splitKey: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aX; },
/* harmony export */   _steppedInterpolation: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.ap; },
/* harmony export */   _steppedLineTo: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.as; },
/* harmony export */   _textX: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aC; },
/* harmony export */   _toLeftRightCenter: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a1; },
/* harmony export */   _updateBezierControlPoints: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.am; },
/* harmony export */   addRoundedRectPath: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.av; },
/* harmony export */   almostEquals: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aK; },
/* harmony export */   almostWhole: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aJ; },
/* harmony export */   callback: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.Q; },
/* harmony export */   clearCanvas: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.af; },
/* harmony export */   clipArea: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.Y; },
/* harmony export */   clone: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aT; },
/* harmony export */   color: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.c; },
/* harmony export */   createContext: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.j; },
/* harmony export */   debounce: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.ad; },
/* harmony export */   defined: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.h; },
/* harmony export */   distanceBetweenPoints: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aF; },
/* harmony export */   drawPoint: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.au; },
/* harmony export */   drawPointLegend: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aE; },
/* harmony export */   each: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.F; },
/* harmony export */   easingEffects: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.e; },
/* harmony export */   finiteOrDefault: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.O; },
/* harmony export */   fontString: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.b0; },
/* harmony export */   formatNumber: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.o; },
/* harmony export */   getAngleFromPoint: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.D; },
/* harmony export */   getDatasetClipArea: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.ah; },
/* harmony export */   getHoverColor: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aS; },
/* harmony export */   getMaximumSize: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.G; },
/* harmony export */   getRelativePosition: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.z; },
/* harmony export */   getRtlAdapter: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aA; },
/* harmony export */   getStyle: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a$; },
/* harmony export */   isArray: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.b; },
/* harmony export */   isFinite: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.g; },
/* harmony export */   isFunction: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a7; },
/* harmony export */   isNullOrUndef: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.k; },
/* harmony export */   isNumber: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.x; },
/* harmony export */   isObject: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.i; },
/* harmony export */   isPatternOrGradient: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aR; },
/* harmony export */   listenArrayEvents: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.l; },
/* harmony export */   log10: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aN; },
/* harmony export */   merge: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a4; },
/* harmony export */   mergeIf: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.ab; },
/* harmony export */   niceNum: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aI; },
/* harmony export */   noop: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aG; },
/* harmony export */   overrideTextDirection: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aB; },
/* harmony export */   readUsedSize: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.J; },
/* harmony export */   renderText: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.Z; },
/* harmony export */   requestAnimFrame: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.r; },
/* harmony export */   resolve: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a; },
/* harmony export */   resolveObjectKey: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.f; },
/* harmony export */   restoreTextDirection: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aD; },
/* harmony export */   retinaScale: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.ae; },
/* harmony export */   setsEqual: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.ag; },
/* harmony export */   sign: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.s; },
/* harmony export */   splineCurve: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aZ; },
/* harmony export */   splineCurveMonotone: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a_; },
/* harmony export */   supportsEventListenerOptions: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.K; },
/* harmony export */   throttled: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.L; },
/* harmony export */   toDegrees: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.U; },
/* harmony export */   toDimension: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.n; },
/* harmony export */   toFont: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.a0; },
/* harmony export */   toFontString: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aY; },
/* harmony export */   toLineHeight: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.b1; },
/* harmony export */   toPadding: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.E; },
/* harmony export */   toPercentage: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.m; },
/* harmony export */   toRadians: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.t; },
/* harmony export */   toTRBL: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.aw; },
/* harmony export */   toTRBLCorners: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.ax; },
/* harmony export */   uid: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.ac; },
/* harmony export */   unclipArea: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.$; },
/* harmony export */   unlistenArrayEvents: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.u; },
/* harmony export */   valueOrDefault: function() { return /* reexport safe */ _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__.v; }
/* harmony export */ });
/* harmony import */ var _chunks_helpers_dataset_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chunks/helpers.dataset.js */ "./node_modules/chart.js/dist/chunks/helpers.dataset.js");
/*!
 * Chart.js v4.4.9
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */


//# sourceMappingURL=helpers.js.map


/***/ }),

/***/ "./node_modules/chart.js/helpers/helpers.js":
/*!**************************************************!*\
  !*** ./node_modules/chart.js/helpers/helpers.js ***!
  \**************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HALF_PI: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.HALF_PI; },
/* harmony export */   INFINITY: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.INFINITY; },
/* harmony export */   PI: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.PI; },
/* harmony export */   PITAU: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.PITAU; },
/* harmony export */   QUARTER_PI: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.QUARTER_PI; },
/* harmony export */   RAD_PER_DEG: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.RAD_PER_DEG; },
/* harmony export */   TAU: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.TAU; },
/* harmony export */   TWO_THIRDS_PI: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.TWO_THIRDS_PI; },
/* harmony export */   _addGrace: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__._addGrace; },
/* harmony export */   _alignPixel: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__._alignPixel; },
/* harmony export */   _alignStartEnd: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__._alignStartEnd; },
/* harmony export */   _angleBetween: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__._angleBetween; },
/* harmony export */   _angleDiff: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__._angleDiff; },
/* harmony export */   _arrayUnique: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__._arrayUnique; },
/* harmony export */   _attachContext: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__._attachContext; },
/* harmony export */   _bezierCurveTo: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__._bezierCurveTo; },
/* harmony export */   _bezierInterpolation: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__._bezierInterpolation; },
/* harmony export */   _boundSegment: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__._boundSegment; },
/* harmony export */   _boundSegments: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__._boundSegments; },
/* harmony export */   _capitalize: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__._capitalize; },
/* harmony export */   _computeSegments: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__._computeSegments; },
/* harmony export */   _createResolver: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__._createResolver; },
/* harmony export */   _decimalPlaces: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__._decimalPlaces; },
/* harmony export */   _deprecated: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__._deprecated; },
/* harmony export */   _descriptors: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__._descriptors; },
/* harmony export */   _elementsEqual: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__._elementsEqual; },
/* harmony export */   _factorize: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__._factorize; },
/* harmony export */   _filterBetween: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__._filterBetween; },
/* harmony export */   _getParentNode: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__._getParentNode; },
/* harmony export */   _getStartAndCountOfVisiblePoints: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__._getStartAndCountOfVisiblePoints; },
/* harmony export */   _int16Range: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__._int16Range; },
/* harmony export */   _isBetween: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__._isBetween; },
/* harmony export */   _isClickEvent: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__._isClickEvent; },
/* harmony export */   _isDomSupported: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__._isDomSupported; },
/* harmony export */   _isPointInArea: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__._isPointInArea; },
/* harmony export */   _limitValue: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__._limitValue; },
/* harmony export */   _longestText: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__._longestText; },
/* harmony export */   _lookup: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__._lookup; },
/* harmony export */   _lookupByKey: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__._lookupByKey; },
/* harmony export */   _measureText: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__._measureText; },
/* harmony export */   _merger: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__._merger; },
/* harmony export */   _mergerIf: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__._mergerIf; },
/* harmony export */   _normalizeAngle: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__._normalizeAngle; },
/* harmony export */   _parseObjectDataRadialScale: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__._parseObjectDataRadialScale; },
/* harmony export */   _pointInLine: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__._pointInLine; },
/* harmony export */   _readValueToProps: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__._readValueToProps; },
/* harmony export */   _rlookupByKey: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__._rlookupByKey; },
/* harmony export */   _scaleRangesChanged: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__._scaleRangesChanged; },
/* harmony export */   _setMinAndMaxByKey: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__._setMinAndMaxByKey; },
/* harmony export */   _splitKey: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__._splitKey; },
/* harmony export */   _steppedInterpolation: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__._steppedInterpolation; },
/* harmony export */   _steppedLineTo: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__._steppedLineTo; },
/* harmony export */   _textX: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__._textX; },
/* harmony export */   _toLeftRightCenter: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__._toLeftRightCenter; },
/* harmony export */   _updateBezierControlPoints: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__._updateBezierControlPoints; },
/* harmony export */   addRoundedRectPath: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.addRoundedRectPath; },
/* harmony export */   almostEquals: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.almostEquals; },
/* harmony export */   almostWhole: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.almostWhole; },
/* harmony export */   callback: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.callback; },
/* harmony export */   clearCanvas: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.clearCanvas; },
/* harmony export */   clipArea: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.clipArea; },
/* harmony export */   clone: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.clone; },
/* harmony export */   color: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.color; },
/* harmony export */   createContext: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.createContext; },
/* harmony export */   debounce: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.debounce; },
/* harmony export */   defined: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.defined; },
/* harmony export */   distanceBetweenPoints: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.distanceBetweenPoints; },
/* harmony export */   drawPoint: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.drawPoint; },
/* harmony export */   drawPointLegend: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.drawPointLegend; },
/* harmony export */   each: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.each; },
/* harmony export */   easingEffects: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.easingEffects; },
/* harmony export */   finiteOrDefault: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.finiteOrDefault; },
/* harmony export */   fontString: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.fontString; },
/* harmony export */   formatNumber: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.formatNumber; },
/* harmony export */   getAngleFromPoint: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.getAngleFromPoint; },
/* harmony export */   getDatasetClipArea: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.getDatasetClipArea; },
/* harmony export */   getHoverColor: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.getHoverColor; },
/* harmony export */   getMaximumSize: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.getMaximumSize; },
/* harmony export */   getRelativePosition: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.getRelativePosition; },
/* harmony export */   getRtlAdapter: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.getRtlAdapter; },
/* harmony export */   getStyle: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.getStyle; },
/* harmony export */   isArray: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.isArray; },
/* harmony export */   isFinite: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.isFinite; },
/* harmony export */   isFunction: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.isFunction; },
/* harmony export */   isNullOrUndef: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.isNullOrUndef; },
/* harmony export */   isNumber: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.isNumber; },
/* harmony export */   isObject: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.isObject; },
/* harmony export */   isPatternOrGradient: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.isPatternOrGradient; },
/* harmony export */   listenArrayEvents: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.listenArrayEvents; },
/* harmony export */   log10: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.log10; },
/* harmony export */   merge: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.merge; },
/* harmony export */   mergeIf: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.mergeIf; },
/* harmony export */   niceNum: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.niceNum; },
/* harmony export */   noop: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.noop; },
/* harmony export */   overrideTextDirection: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.overrideTextDirection; },
/* harmony export */   readUsedSize: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.readUsedSize; },
/* harmony export */   renderText: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.renderText; },
/* harmony export */   requestAnimFrame: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.requestAnimFrame; },
/* harmony export */   resolve: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.resolve; },
/* harmony export */   resolveObjectKey: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.resolveObjectKey; },
/* harmony export */   restoreTextDirection: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.restoreTextDirection; },
/* harmony export */   retinaScale: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.retinaScale; },
/* harmony export */   setsEqual: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.setsEqual; },
/* harmony export */   sign: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.sign; },
/* harmony export */   splineCurve: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.splineCurve; },
/* harmony export */   splineCurveMonotone: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.splineCurveMonotone; },
/* harmony export */   supportsEventListenerOptions: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.supportsEventListenerOptions; },
/* harmony export */   throttled: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.throttled; },
/* harmony export */   toDegrees: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.toDegrees; },
/* harmony export */   toDimension: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.toDimension; },
/* harmony export */   toFont: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.toFont; },
/* harmony export */   toFontString: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.toFontString; },
/* harmony export */   toLineHeight: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.toLineHeight; },
/* harmony export */   toPadding: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.toPadding; },
/* harmony export */   toPercentage: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.toPercentage; },
/* harmony export */   toRadians: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.toRadians; },
/* harmony export */   toTRBL: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.toTRBL; },
/* harmony export */   toTRBLCorners: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.toTRBLCorners; },
/* harmony export */   uid: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.uid; },
/* harmony export */   unclipArea: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.unclipArea; },
/* harmony export */   unlistenArrayEvents: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.unlistenArrayEvents; },
/* harmony export */   valueOrDefault: function() { return /* reexport safe */ _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__.valueOrDefault; }
/* harmony export */ });
/* harmony import */ var _dist_helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dist/helpers.js */ "./node_modules/chart.js/dist/helpers.js");



/***/ }),

/***/ "./node_modules/chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm.js ***!
  \**********************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! chart.js */ "./node_modules/chart.js/dist/chart.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs_plugin_customParseFormat_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dayjs/plugin/customParseFormat.js */ "./node_modules/dayjs/plugin/customParseFormat.js");
/* harmony import */ var dayjs_plugin_advancedFormat_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dayjs/plugin/advancedFormat.js */ "./node_modules/dayjs/plugin/advancedFormat.js");
/* harmony import */ var dayjs_plugin_quarterOfYear_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dayjs/plugin/quarterOfYear.js */ "./node_modules/dayjs/plugin/quarterOfYear.js");
/* harmony import */ var dayjs_plugin_localizedFormat_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! dayjs/plugin/localizedFormat.js */ "./node_modules/dayjs/plugin/localizedFormat.js");
/* harmony import */ var dayjs_plugin_isoWeek_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! dayjs/plugin/isoWeek.js */ "./node_modules/dayjs/plugin/isoWeek.js");








dayjs__WEBPACK_IMPORTED_MODULE_0__.extend(dayjs_plugin_advancedFormat_js__WEBPACK_IMPORTED_MODULE_2__);
dayjs__WEBPACK_IMPORTED_MODULE_0__.extend(dayjs_plugin_quarterOfYear_js__WEBPACK_IMPORTED_MODULE_3__);
dayjs__WEBPACK_IMPORTED_MODULE_0__.extend(dayjs_plugin_localizedFormat_js__WEBPACK_IMPORTED_MODULE_4__);
dayjs__WEBPACK_IMPORTED_MODULE_0__.extend(dayjs_plugin_customParseFormat_js__WEBPACK_IMPORTED_MODULE_1__);
dayjs__WEBPACK_IMPORTED_MODULE_0__.extend(dayjs_plugin_isoWeek_js__WEBPACK_IMPORTED_MODULE_5__);
var FORMATS = {
  datetime: 'MMM D, YYYY, h:mm:ss a',
  millisecond: 'h:mm:ss.SSS a',
  second: 'h:mm:ss a',
  minute: 'h:mm a',
  hour: 'hA',
  day: 'MMM D',
  week: 'll',
  month: 'MMM YYYY',
  quarter: '[Q]Q - YYYY',
  year: 'YYYY'
};
chart_js__WEBPACK_IMPORTED_MODULE_6__._adapters._date.override({
  //_id: 'dayjs', //DEBUG,
  formats: function formats() {
    return FORMATS;
  },
  parse: function parse(value, format) {
    var valueType = typeof value;
    if (value === null || valueType === 'undefined') {
      return null;
    }
    if (valueType === 'string' && typeof format === 'string') {
      return dayjs__WEBPACK_IMPORTED_MODULE_0__(value, format).isValid() ? dayjs__WEBPACK_IMPORTED_MODULE_0__(value, format).valueOf() : null;
    } else if (!(value instanceof dayjs__WEBPACK_IMPORTED_MODULE_0__)) {
      return dayjs__WEBPACK_IMPORTED_MODULE_0__(value).isValid() ? dayjs__WEBPACK_IMPORTED_MODULE_0__(value).valueOf() : null;
    }
    return null;
  },
  format: function format(time, _format) {
    return dayjs__WEBPACK_IMPORTED_MODULE_0__(time).format(_format);
  },
  add: function add(time, amount, unit) {
    return dayjs__WEBPACK_IMPORTED_MODULE_0__(time).add(amount, unit).valueOf();
  },
  diff: function diff(max, min, unit) {
    return dayjs__WEBPACK_IMPORTED_MODULE_0__(max).diff(dayjs__WEBPACK_IMPORTED_MODULE_0__(min), unit);
  },
  startOf: function startOf(time, unit, weekday) {
    if (unit === 'isoWeek') {
      // Ensure that weekday has a valid format
      //const formattedWeekday
      var validatedWeekday = typeof weekday === 'number' && weekday > 0 && weekday < 7 ? weekday : 1;
      return dayjs__WEBPACK_IMPORTED_MODULE_0__(time).isoWeekday(validatedWeekday).startOf('day').valueOf();
    }
    return dayjs__WEBPACK_IMPORTED_MODULE_0__(time).startOf(unit).valueOf();
  },
  endOf: function endOf(time, unit) {
    return dayjs__WEBPACK_IMPORTED_MODULE_0__(time).endOf(unit).valueOf();
  }
});
//# sourceMappingURL=chartjs-adapter-dayjs-4.esm.js.map


/***/ }),

/***/ "./node_modules/chartjs-plugin-zoom/dist/chartjs-plugin-zoom.esm.js":
/*!**************************************************************************!*\
  !*** ./node_modules/chartjs-plugin-zoom/dist/chartjs-plugin-zoom.esm.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ plugin; },
/* harmony export */   pan: function() { return /* binding */ pan; },
/* harmony export */   resetZoom: function() { return /* binding */ resetZoom; },
/* harmony export */   zoom: function() { return /* binding */ zoom; },
/* harmony export */   zoomRect: function() { return /* binding */ zoomRect; },
/* harmony export */   zoomScale: function() { return /* binding */ zoomScale; }
/* harmony export */ });
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! chart.js/helpers */ "./node_modules/chart.js/helpers/helpers.js");
/*!
* chartjs-plugin-zoom v2.2.0
* https://www.chartjs.org/chartjs-plugin-zoom/2.2.0/
 * (c) 2016-2024 chartjs-plugin-zoom Contributors
 * Released under the MIT License
 */



const getModifierKey = opts => opts && opts.enabled && opts.modifierKey;
const keyPressed = (key, event) => key && event[key + 'Key'];
const keyNotPressed = (key, event) => key && !event[key + 'Key'];
function directionEnabled(mode, dir, chart) {
  if (mode === undefined) {
    return true;
  } else if (typeof mode === 'string') {
    return mode.indexOf(dir) !== -1;
  } else if (typeof mode === 'function') {
    return mode({chart}).indexOf(dir) !== -1;
  }
  return false;
}
function directionsEnabled(mode, chart) {
  if (typeof mode === 'function') {
    mode = mode({chart});
  }
  if (typeof mode === 'string') {
    return {x: mode.indexOf('x') !== -1, y: mode.indexOf('y') !== -1};
  }
  return {x: false, y: false};
}
function debounce(fn, delay) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(fn, delay);
    return delay;
  };
}
function getScaleUnderPoint({x, y}, chart) {
  const scales = chart.scales;
  const scaleIds = Object.keys(scales);
  for (let i = 0; i < scaleIds.length; i++) {
    const scale = scales[scaleIds[i]];
    if (y >= scale.top && y <= scale.bottom && x >= scale.left && x <= scale.right) {
      return scale;
    }
  }
  return null;
}
function getEnabledScalesByPoint(options, point, chart) {
  const {mode = 'xy', scaleMode, overScaleMode} = options || {};
  const scale = getScaleUnderPoint(point, chart);
  const enabled = directionsEnabled(mode, chart);
  const scaleEnabled = directionsEnabled(scaleMode, chart);
  if (overScaleMode) {
    const overScaleEnabled = directionsEnabled(overScaleMode, chart);
    for (const axis of ['x', 'y']) {
      if (overScaleEnabled[axis]) {
        scaleEnabled[axis] = enabled[axis];
        enabled[axis] = false;
      }
    }
  }
  if (scale && scaleEnabled[scale.axis]) {
    return [scale];
  }
  const enabledScales = [];
  (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.each)(chart.scales, function(scaleItem) {
    if (enabled[scaleItem.axis]) {
      enabledScales.push(scaleItem);
    }
  });
  return enabledScales;
}

const chartStates = new WeakMap();
function getState(chart) {
  let state = chartStates.get(chart);
  if (!state) {
    state = {
      originalScaleLimits: {},
      updatedScaleLimits: {},
      handlers: {},
      panDelta: {},
      dragging: false,
      panning: false
    };
    chartStates.set(chart, state);
  }
  return state;
}
function removeState(chart) {
  chartStates.delete(chart);
}

function zoomDelta(val, min, range, newRange) {
  const minPercent = Math.max(0, Math.min(1, (val - min) / range || 0));
  const maxPercent = 1 - minPercent;
  return {
    min: newRange * minPercent,
    max: newRange * maxPercent
  };
}
function getValueAtPoint(scale, point) {
  const pixel = scale.isHorizontal() ? point.x : point.y;
  return scale.getValueForPixel(pixel);
}
function linearZoomDelta(scale, zoom, center) {
  const range = scale.max - scale.min;
  const newRange = range * (zoom - 1);
  const centerValue = getValueAtPoint(scale, center);
  return zoomDelta(centerValue, scale.min, range, newRange);
}
function logarithmicZoomRange(scale, zoom, center) {
  const centerValue = getValueAtPoint(scale, center);
  if (centerValue === undefined) {
    return {min: scale.min, max: scale.max};
  }
  const logMin = Math.log10(scale.min);
  const logMax = Math.log10(scale.max);
  const logCenter = Math.log10(centerValue);
  const logRange = logMax - logMin;
  const newLogRange = logRange * (zoom - 1);
  const delta = zoomDelta(logCenter, logMin, logRange, newLogRange);
  return {
    min: Math.pow(10, logMin + delta.min),
    max: Math.pow(10, logMax - delta.max),
  };
}
function getScaleLimits(scale, limits) {
  return limits && (limits[scale.id] || limits[scale.axis]) || {};
}
function getLimit(state, scale, scaleLimits, prop, fallback) {
  let limit = scaleLimits[prop];
  if (limit === 'original') {
    const original = state.originalScaleLimits[scale.id][prop];
    limit = (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.valueOrDefault)(original.options, original.scale);
  }
  return (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.valueOrDefault)(limit, fallback);
}
function linearRange(scale, pixel0, pixel1) {
  const v0 = scale.getValueForPixel(pixel0);
  const v1 = scale.getValueForPixel(pixel1);
  return {
    min: Math.min(v0, v1),
    max: Math.max(v0, v1)
  };
}
function fixRange(range, {min, max, minLimit, maxLimit}, originalLimits) {
  const offset = (range - max + min) / 2;
  min -= offset;
  max += offset;
  const origMin = originalLimits.min.options ?? originalLimits.min.scale;
  const origMax = originalLimits.max.options ?? originalLimits.max.scale;
  const epsilon = range / 1e6;
  if ((0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.almostEquals)(min, origMin, epsilon)) {
    min = origMin;
  }
  if ((0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.almostEquals)(max, origMax, epsilon)) {
    max = origMax;
  }
  if (min < minLimit) {
    min = minLimit;
    max = Math.min(minLimit + range, maxLimit);
  } else if (max > maxLimit) {
    max = maxLimit;
    min = Math.max(maxLimit - range, minLimit);
  }
  return {min, max};
}
function updateRange(scale, {min, max}, limits, zoom = false) {
  const state = getState(scale.chart);
  const {options: scaleOpts} = scale;
  const scaleLimits = getScaleLimits(scale, limits);
  const {minRange = 0} = scaleLimits;
  const minLimit = getLimit(state, scale, scaleLimits, 'min', -Infinity);
  const maxLimit = getLimit(state, scale, scaleLimits, 'max', Infinity);
  if (zoom === 'pan' && (min < minLimit || max > maxLimit)) {
    return true;
  }
  const scaleRange = scale.max - scale.min;
  const range = zoom ? Math.max(max - min, minRange) : scaleRange;
  if (zoom && range === minRange && scaleRange <= minRange) {
    return true;
  }
  const newRange = fixRange(range, {min, max, minLimit, maxLimit}, state.originalScaleLimits[scale.id]);
  scaleOpts.min = newRange.min;
  scaleOpts.max = newRange.max;
  state.updatedScaleLimits[scale.id] = newRange;
  return scale.parse(newRange.min) !== scale.min || scale.parse(newRange.max) !== scale.max;
}
function zoomNumericalScale(scale, zoom, center, limits) {
  const delta = linearZoomDelta(scale, zoom, center);
  const newRange = {min: scale.min + delta.min, max: scale.max - delta.max};
  return updateRange(scale, newRange, limits, true);
}
function zoomLogarithmicScale(scale, zoom, center, limits) {
  const newRange = logarithmicZoomRange(scale, zoom, center);
  return updateRange(scale, newRange, limits, true);
}
function zoomRectNumericalScale(scale, from, to, limits) {
  updateRange(scale, linearRange(scale, from, to), limits, true);
}
const integerChange = (v) => v === 0 || isNaN(v) ? 0 : v < 0 ? Math.min(Math.round(v), -1) : Math.max(Math.round(v), 1);
function existCategoryFromMaxZoom(scale) {
  const labels = scale.getLabels();
  const maxIndex = labels.length - 1;
  if (scale.min > 0) {
    scale.min -= 1;
  }
  if (scale.max < maxIndex) {
    scale.max += 1;
  }
}
function zoomCategoryScale(scale, zoom, center, limits) {
  const delta = linearZoomDelta(scale, zoom, center);
  if (scale.min === scale.max && zoom < 1) {
    existCategoryFromMaxZoom(scale);
  }
  const newRange = {min: scale.min + integerChange(delta.min), max: scale.max - integerChange(delta.max)};
  return updateRange(scale, newRange, limits, true);
}
function scaleLength(scale) {
  return scale.isHorizontal() ? scale.width : scale.height;
}
function panCategoryScale(scale, delta, limits) {
  const labels = scale.getLabels();
  const lastLabelIndex = labels.length - 1;
  let {min, max} = scale;
  const range = Math.max(max - min, 1);
  const stepDelta = Math.round(scaleLength(scale) / Math.max(range, 10));
  const stepSize = Math.round(Math.abs(delta / stepDelta));
  let applied;
  if (delta < -stepDelta) {
    max = Math.min(max + stepSize, lastLabelIndex);
    min = range === 1 ? max : max - range;
    applied = max === lastLabelIndex;
  } else if (delta > stepDelta) {
    min = Math.max(0, min - stepSize);
    max = range === 1 ? min : min + range;
    applied = min === 0;
  }
  return updateRange(scale, {min, max}, limits) || applied;
}
const OFFSETS = {
  second: 500,
  minute: 30 * 1000,
  hour: 30 * 60 * 1000,
  day: 12 * 60 * 60 * 1000,
  week: 3.5 * 24 * 60 * 60 * 1000,
  month: 15 * 24 * 60 * 60 * 1000,
  quarter: 60 * 24 * 60 * 60 * 1000,
  year: 182 * 24 * 60 * 60 * 1000
};
function panNumericalScale(scale, delta, limits, pan = false) {
  const {min: prevStart, max: prevEnd, options} = scale;
  const round = options.time && options.time.round;
  const offset = OFFSETS[round] || 0;
  const newMin = scale.getValueForPixel(scale.getPixelForValue(prevStart + offset) - delta);
  const newMax = scale.getValueForPixel(scale.getPixelForValue(prevEnd + offset) - delta);
  if (isNaN(newMin) || isNaN(newMax)) {
    return true;
  }
  return updateRange(scale, {min: newMin, max: newMax}, limits, pan ? 'pan' : false);
}
function panNonLinearScale(scale, delta, limits) {
  return panNumericalScale(scale, delta, limits, true);
}
const zoomFunctions = {
  category: zoomCategoryScale,
  default: zoomNumericalScale,
  logarithmic: zoomLogarithmicScale,
};
const zoomRectFunctions = {
  default: zoomRectNumericalScale,
};
const panFunctions = {
  category: panCategoryScale,
  default: panNumericalScale,
  logarithmic: panNonLinearScale,
  timeseries: panNonLinearScale,
};

function shouldUpdateScaleLimits(scale, originalScaleLimits, updatedScaleLimits) {
  const {id, options: {min, max}} = scale;
  if (!originalScaleLimits[id] || !updatedScaleLimits[id]) {
    return true;
  }
  const previous = updatedScaleLimits[id];
  return previous.min !== min || previous.max !== max;
}
function removeMissingScales(limits, scales) {
  (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.each)(limits, (opt, key) => {
    if (!scales[key]) {
      delete limits[key];
    }
  });
}
function storeOriginalScaleLimits(chart, state) {
  const {scales} = chart;
  const {originalScaleLimits, updatedScaleLimits} = state;
  (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.each)(scales, function(scale) {
    if (shouldUpdateScaleLimits(scale, originalScaleLimits, updatedScaleLimits)) {
      originalScaleLimits[scale.id] = {
        min: {scale: scale.min, options: scale.options.min},
        max: {scale: scale.max, options: scale.options.max},
      };
    }
  });
  removeMissingScales(originalScaleLimits, scales);
  removeMissingScales(updatedScaleLimits, scales);
  return originalScaleLimits;
}
function doZoom(scale, amount, center, limits) {
  const fn = zoomFunctions[scale.type] || zoomFunctions.default;
  (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.callback)(fn, [scale, amount, center, limits]);
}
function doZoomRect(scale, from, to, limits) {
  const fn = zoomRectFunctions[scale.type] || zoomRectFunctions.default;
  (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.callback)(fn, [scale, from, to, limits]);
}
function getCenter(chart) {
  const ca = chart.chartArea;
  return {
    x: (ca.left + ca.right) / 2,
    y: (ca.top + ca.bottom) / 2,
  };
}
function zoom(chart, amount, transition = 'none', trigger = 'api') {
  const {x = 1, y = 1, focalPoint = getCenter(chart)} = typeof amount === 'number' ? {x: amount, y: amount} : amount;
  const state = getState(chart);
  const {options: {limits, zoom: zoomOptions}} = state;
  storeOriginalScaleLimits(chart, state);
  const xEnabled = x !== 1;
  const yEnabled = y !== 1;
  const enabledScales = getEnabledScalesByPoint(zoomOptions, focalPoint, chart);
  (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.each)(enabledScales || chart.scales, function(scale) {
    if (scale.isHorizontal() && xEnabled) {
      doZoom(scale, x, focalPoint, limits);
    } else if (!scale.isHorizontal() && yEnabled) {
      doZoom(scale, y, focalPoint, limits);
    }
  });
  chart.update(transition);
  (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.callback)(zoomOptions.onZoom, [{chart, trigger}]);
}
function zoomRect(chart, p0, p1, transition = 'none', trigger = 'api') {
  const state = getState(chart);
  const {options: {limits, zoom: zoomOptions}} = state;
  const {mode = 'xy'} = zoomOptions;
  storeOriginalScaleLimits(chart, state);
  const xEnabled = directionEnabled(mode, 'x', chart);
  const yEnabled = directionEnabled(mode, 'y', chart);
  (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.each)(chart.scales, function(scale) {
    if (scale.isHorizontal() && xEnabled) {
      doZoomRect(scale, p0.x, p1.x, limits);
    } else if (!scale.isHorizontal() && yEnabled) {
      doZoomRect(scale, p0.y, p1.y, limits);
    }
  });
  chart.update(transition);
  (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.callback)(zoomOptions.onZoom, [{chart, trigger}]);
}
function zoomScale(chart, scaleId, range, transition = 'none', trigger = 'api') {
  const state = getState(chart);
  storeOriginalScaleLimits(chart, state);
  const scale = chart.scales[scaleId];
  updateRange(scale, range, undefined, true);
  chart.update(transition);
  (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.callback)(state.options.zoom?.onZoom, [{chart, trigger}]);
}
function resetZoom(chart, transition = 'default') {
  const state = getState(chart);
  const originalScaleLimits = storeOriginalScaleLimits(chart, state);
  (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.each)(chart.scales, function(scale) {
    const scaleOptions = scale.options;
    if (originalScaleLimits[scale.id]) {
      scaleOptions.min = originalScaleLimits[scale.id].min.options;
      scaleOptions.max = originalScaleLimits[scale.id].max.options;
    } else {
      delete scaleOptions.min;
      delete scaleOptions.max;
    }
    delete state.updatedScaleLimits[scale.id];
  });
  chart.update(transition);
  (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.callback)(state.options.zoom.onZoomComplete, [{chart}]);
}
function getOriginalRange(state, scaleId) {
  const original = state.originalScaleLimits[scaleId];
  if (!original) {
    return;
  }
  const {min, max} = original;
  return (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.valueOrDefault)(max.options, max.scale) - (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.valueOrDefault)(min.options, min.scale);
}
function getZoomLevel(chart) {
  const state = getState(chart);
  let min = 1;
  let max = 1;
  (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.each)(chart.scales, function(scale) {
    const origRange = getOriginalRange(state, scale.id);
    if (origRange) {
      const level = Math.round(origRange / (scale.max - scale.min) * 100) / 100;
      min = Math.min(min, level);
      max = Math.max(max, level);
    }
  });
  return min < 1 ? min : max;
}
function panScale(scale, delta, limits, state) {
  const {panDelta} = state;
  const storedDelta = panDelta[scale.id] || 0;
  if ((0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.sign)(storedDelta) === (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.sign)(delta)) {
    delta += storedDelta;
  }
  const fn = panFunctions[scale.type] || panFunctions.default;
  if ((0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.callback)(fn, [scale, delta, limits])) {
    panDelta[scale.id] = 0;
  } else {
    panDelta[scale.id] = delta;
  }
}
function pan(chart, delta, enabledScales, transition = 'none') {
  const {x = 0, y = 0} = typeof delta === 'number' ? {x: delta, y: delta} : delta;
  const state = getState(chart);
  const {options: {pan: panOptions, limits}} = state;
  const {onPan} = panOptions || {};
  storeOriginalScaleLimits(chart, state);
  const xEnabled = x !== 0;
  const yEnabled = y !== 0;
  (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.each)(enabledScales || chart.scales, function(scale) {
    if (scale.isHorizontal() && xEnabled) {
      panScale(scale, x, limits, state);
    } else if (!scale.isHorizontal() && yEnabled) {
      panScale(scale, y, limits, state);
    }
  });
  chart.update(transition);
  (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.callback)(onPan, [{chart}]);
}
function getInitialScaleBounds(chart) {
  const state = getState(chart);
  storeOriginalScaleLimits(chart, state);
  const scaleBounds = {};
  for (const scaleId of Object.keys(chart.scales)) {
    const {min, max} = state.originalScaleLimits[scaleId] || {min: {}, max: {}};
    scaleBounds[scaleId] = {min: min.scale, max: max.scale};
  }
  return scaleBounds;
}
function getZoomedScaleBounds(chart) {
  const state = getState(chart);
  const scaleBounds = {};
  for (const scaleId of Object.keys(chart.scales)) {
    scaleBounds[scaleId] = state.updatedScaleLimits[scaleId];
  }
  return scaleBounds;
}
function isZoomedOrPanned(chart) {
  const scaleBounds = getInitialScaleBounds(chart);
  for (const scaleId of Object.keys(chart.scales)) {
    const {min: originalMin, max: originalMax} = scaleBounds[scaleId];
    if (originalMin !== undefined && chart.scales[scaleId].min !== originalMin) {
      return true;
    }
    if (originalMax !== undefined && chart.scales[scaleId].max !== originalMax) {
      return true;
    }
  }
  return false;
}
function isZoomingOrPanning(chart) {
  const state = getState(chart);
  return state.panning || state.dragging;
}

const clamp = (x, from, to) => Math.min(to, Math.max(from, x));
function removeHandler(chart, type) {
  const {handlers} = getState(chart);
  const handler = handlers[type];
  if (handler && handler.target) {
    handler.target.removeEventListener(type, handler);
    delete handlers[type];
  }
}
function addHandler(chart, target, type, handler) {
  const {handlers, options} = getState(chart);
  const oldHandler = handlers[type];
  if (oldHandler && oldHandler.target === target) {
    return;
  }
  removeHandler(chart, type);
  handlers[type] = (event) => handler(chart, event, options);
  handlers[type].target = target;
  const passive = type === 'wheel' ? false : undefined;
  target.addEventListener(type, handlers[type], {passive});
}
function mouseMove(chart, event) {
  const state = getState(chart);
  if (state.dragStart) {
    state.dragging = true;
    state.dragEnd = event;
    chart.update('none');
  }
}
function keyDown(chart, event) {
  const state = getState(chart);
  if (!state.dragStart || event.key !== 'Escape') {
    return;
  }
  removeHandler(chart, 'keydown');
  state.dragging = false;
  state.dragStart = state.dragEnd = null;
  chart.update('none');
}
function getPointPosition(event, chart) {
  if (event.target !== chart.canvas) {
    const canvasArea = chart.canvas.getBoundingClientRect();
    return {
      x: event.clientX - canvasArea.left,
      y: event.clientY - canvasArea.top,
    };
  }
  return (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.getRelativePosition)(event, chart);
}
function zoomStart(chart, event, zoomOptions) {
  const {onZoomStart, onZoomRejected} = zoomOptions;
  if (onZoomStart) {
    const point = getPointPosition(event, chart);
    if ((0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.callback)(onZoomStart, [{chart, event, point}]) === false) {
      (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.callback)(onZoomRejected, [{chart, event}]);
      return false;
    }
  }
}
function mouseDown(chart, event) {
  if (chart.legend) {
    const point = (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.getRelativePosition)(event, chart);
    if ((0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__._isPointInArea)(point, chart.legend)) {
      return;
    }
  }
  const state = getState(chart);
  const {pan: panOptions, zoom: zoomOptions = {}} = state.options;
  if (
    event.button !== 0 ||
    keyPressed(getModifierKey(panOptions), event) ||
    keyNotPressed(getModifierKey(zoomOptions.drag), event)
  ) {
    return (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.callback)(zoomOptions.onZoomRejected, [{chart, event}]);
  }
  if (zoomStart(chart, event, zoomOptions) === false) {
    return;
  }
  state.dragStart = event;
  addHandler(chart, chart.canvas.ownerDocument, 'mousemove', mouseMove);
  addHandler(chart, window.document, 'keydown', keyDown);
}
function applyAspectRatio({begin, end}, aspectRatio) {
  let width = end.x - begin.x;
  let height = end.y - begin.y;
  const ratio = Math.abs(width / height);
  if (ratio > aspectRatio) {
    width = Math.sign(width) * Math.abs(height * aspectRatio);
  } else if (ratio < aspectRatio) {
    height = Math.sign(height) * Math.abs(width / aspectRatio);
  }
  end.x = begin.x + width;
  end.y = begin.y + height;
}
function applyMinMaxProps(rect, chartArea, points, {min, max, prop}) {
  rect[min] = clamp(Math.min(points.begin[prop], points.end[prop]), chartArea[min], chartArea[max]);
  rect[max] = clamp(Math.max(points.begin[prop], points.end[prop]), chartArea[min], chartArea[max]);
}
function getRelativePoints(chart, pointEvents, maintainAspectRatio) {
  const points = {
    begin: getPointPosition(pointEvents.dragStart, chart),
    end: getPointPosition(pointEvents.dragEnd, chart),
  };
  if (maintainAspectRatio) {
    const aspectRatio = chart.chartArea.width / chart.chartArea.height;
    applyAspectRatio(points, aspectRatio);
  }
  return points;
}
function computeDragRect(chart, mode, pointEvents, maintainAspectRatio) {
  const xEnabled = directionEnabled(mode, 'x', chart);
  const yEnabled = directionEnabled(mode, 'y', chart);
  const {top, left, right, bottom, width: chartWidth, height: chartHeight} = chart.chartArea;
  const rect = {top, left, right, bottom};
  const points = getRelativePoints(chart, pointEvents, maintainAspectRatio && xEnabled && yEnabled);
  if (xEnabled) {
    applyMinMaxProps(rect, chart.chartArea, points, {min: 'left', max: 'right', prop: 'x'});
  }
  if (yEnabled) {
    applyMinMaxProps(rect, chart.chartArea, points, {min: 'top', max: 'bottom', prop: 'y'});
  }
  const width = rect.right - rect.left;
  const height = rect.bottom - rect.top;
  return {
    ...rect,
    width,
    height,
    zoomX: xEnabled && width ? 1 + ((chartWidth - width) / chartWidth) : 1,
    zoomY: yEnabled && height ? 1 + ((chartHeight - height) / chartHeight) : 1
  };
}
function mouseUp(chart, event) {
  const state = getState(chart);
  if (!state.dragStart) {
    return;
  }
  removeHandler(chart, 'mousemove');
  const {mode, onZoomComplete, drag: {threshold = 0, maintainAspectRatio}} = state.options.zoom;
  const rect = computeDragRect(chart, mode, {dragStart: state.dragStart, dragEnd: event}, maintainAspectRatio);
  const distanceX = directionEnabled(mode, 'x', chart) ? rect.width : 0;
  const distanceY = directionEnabled(mode, 'y', chart) ? rect.height : 0;
  const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
  state.dragStart = state.dragEnd = null;
  if (distance <= threshold) {
    state.dragging = false;
    chart.update('none');
    return;
  }
  zoomRect(chart, {x: rect.left, y: rect.top}, {x: rect.right, y: rect.bottom}, 'zoom', 'drag');
  state.dragging = false;
  state.filterNextClick = true;
  (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.callback)(onZoomComplete, [{chart}]);
}
function wheelPreconditions(chart, event, zoomOptions) {
  if (keyNotPressed(getModifierKey(zoomOptions.wheel), event)) {
    (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.callback)(zoomOptions.onZoomRejected, [{chart, event}]);
    return;
  }
  if (zoomStart(chart, event, zoomOptions) === false) {
    return;
  }
  if (event.cancelable) {
    event.preventDefault();
  }
  if (event.deltaY === undefined) {
    return;
  }
  return true;
}
function wheel(chart, event) {
  const {handlers: {onZoomComplete}, options: {zoom: zoomOptions}} = getState(chart);
  if (!wheelPreconditions(chart, event, zoomOptions)) {
    return;
  }
  const rect = event.target.getBoundingClientRect();
  const speed = zoomOptions.wheel.speed;
  const percentage = event.deltaY >= 0 ? 2 - 1 / (1 - speed) : 1 + speed;
  const amount = {
    x: percentage,
    y: percentage,
    focalPoint: {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    }
  };
  zoom(chart, amount, 'zoom', 'wheel');
  (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.callback)(onZoomComplete, [{chart}]);
}
function addDebouncedHandler(chart, name, handler, delay) {
  if (handler) {
    getState(chart).handlers[name] = debounce(() => (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.callback)(handler, [{chart}]), delay);
  }
}
function addListeners(chart, options) {
  const canvas = chart.canvas;
  const {wheel: wheelOptions, drag: dragOptions, onZoomComplete} = options.zoom;
  if (wheelOptions.enabled) {
    addHandler(chart, canvas, 'wheel', wheel);
    addDebouncedHandler(chart, 'onZoomComplete', onZoomComplete, 250);
  } else {
    removeHandler(chart, 'wheel');
  }
  if (dragOptions.enabled) {
    addHandler(chart, canvas, 'mousedown', mouseDown);
    addHandler(chart, canvas.ownerDocument, 'mouseup', mouseUp);
  } else {
    removeHandler(chart, 'mousedown');
    removeHandler(chart, 'mousemove');
    removeHandler(chart, 'mouseup');
    removeHandler(chart, 'keydown');
  }
}
function removeListeners(chart) {
  removeHandler(chart, 'mousedown');
  removeHandler(chart, 'mousemove');
  removeHandler(chart, 'mouseup');
  removeHandler(chart, 'wheel');
  removeHandler(chart, 'click');
  removeHandler(chart, 'keydown');
}

function createEnabler(chart, state) {
  return function(recognizer, event) {
    const {pan: panOptions, zoom: zoomOptions = {}} = state.options;
    if (!panOptions || !panOptions.enabled) {
      return false;
    }
    const srcEvent = event && event.srcEvent;
    if (!srcEvent) {
      return true;
    }
    if (!state.panning && event.pointerType === 'mouse' && (
      keyNotPressed(getModifierKey(panOptions), srcEvent) || keyPressed(getModifierKey(zoomOptions.drag), srcEvent))
    ) {
      (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.callback)(panOptions.onPanRejected, [{chart, event}]);
      return false;
    }
    return true;
  };
}
function pinchAxes(p0, p1) {
  const pinchX = Math.abs(p0.clientX - p1.clientX);
  const pinchY = Math.abs(p0.clientY - p1.clientY);
  const p = pinchX / pinchY;
  let x, y;
  if (p > 0.3 && p < 1.7) {
    x = y = true;
  } else if (pinchX > pinchY) {
    x = true;
  } else {
    y = true;
  }
  return {x, y};
}
function handlePinch(chart, state, e) {
  if (state.scale) {
    const {center, pointers} = e;
    const zoomPercent = 1 / state.scale * e.scale;
    const rect = e.target.getBoundingClientRect();
    const pinch = pinchAxes(pointers[0], pointers[1]);
    const mode = state.options.zoom.mode;
    const amount = {
      x: pinch.x && directionEnabled(mode, 'x', chart) ? zoomPercent : 1,
      y: pinch.y && directionEnabled(mode, 'y', chart) ? zoomPercent : 1,
      focalPoint: {
        x: center.x - rect.left,
        y: center.y - rect.top
      }
    };
    zoom(chart, amount, 'zoom', 'pinch');
    state.scale = e.scale;
  }
}
function startPinch(chart, state, event) {
  if (state.options.zoom.pinch.enabled) {
    const point = (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.getRelativePosition)(event, chart);
    if ((0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.callback)(state.options.zoom.onZoomStart, [{chart, event, point}]) === false) {
      state.scale = null;
      (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.callback)(state.options.zoom.onZoomRejected, [{chart, event}]);
    } else {
      state.scale = 1;
    }
  }
}
function endPinch(chart, state, e) {
  if (state.scale) {
    handlePinch(chart, state, e);
    state.scale = null;
    (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.callback)(state.options.zoom.onZoomComplete, [{chart}]);
  }
}
function handlePan(chart, state, e) {
  const delta = state.delta;
  if (delta) {
    state.panning = true;
    pan(chart, {x: e.deltaX - delta.x, y: e.deltaY - delta.y}, state.panScales);
    state.delta = {x: e.deltaX, y: e.deltaY};
  }
}
function startPan(chart, state, event) {
  const {enabled, onPanStart, onPanRejected} = state.options.pan;
  if (!enabled) {
    return;
  }
  const rect = event.target.getBoundingClientRect();
  const point = {
    x: event.center.x - rect.left,
    y: event.center.y - rect.top
  };
  if ((0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.callback)(onPanStart, [{chart, event, point}]) === false) {
    return (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.callback)(onPanRejected, [{chart, event}]);
  }
  state.panScales = getEnabledScalesByPoint(state.options.pan, point, chart);
  state.delta = {x: 0, y: 0};
  handlePan(chart, state, event);
}
function endPan(chart, state) {
  state.delta = null;
  if (state.panning) {
    state.panning = false;
    state.filterNextClick = true;
    (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.callback)(state.options.pan.onPanComplete, [{chart}]);
  }
}
const hammers = new WeakMap();
function startHammer(chart, options) {
  const state = getState(chart);
  const canvas = chart.canvas;
  const {pan: panOptions, zoom: zoomOptions} = options;
  const mc = new (hammerjs__WEBPACK_IMPORTED_MODULE_0___default().Manager)(canvas);
  if (zoomOptions && zoomOptions.pinch.enabled) {
    mc.add(new (hammerjs__WEBPACK_IMPORTED_MODULE_0___default().Pinch)());
    mc.on('pinchstart', (e) => startPinch(chart, state, e));
    mc.on('pinch', (e) => handlePinch(chart, state, e));
    mc.on('pinchend', (e) => endPinch(chart, state, e));
  }
  if (panOptions && panOptions.enabled) {
    mc.add(new (hammerjs__WEBPACK_IMPORTED_MODULE_0___default().Pan)({
      threshold: panOptions.threshold,
      enable: createEnabler(chart, state)
    }));
    mc.on('panstart', (e) => startPan(chart, state, e));
    mc.on('panmove', (e) => handlePan(chart, state, e));
    mc.on('panend', () => endPan(chart, state));
  }
  hammers.set(chart, mc);
}
function stopHammer(chart) {
  const mc = hammers.get(chart);
  if (mc) {
    mc.remove('pinchstart');
    mc.remove('pinch');
    mc.remove('pinchend');
    mc.remove('panstart');
    mc.remove('pan');
    mc.remove('panend');
    mc.destroy();
    hammers.delete(chart);
  }
}
function hammerOptionsChanged(oldOptions, newOptions) {
  const {pan: oldPan, zoom: oldZoom} = oldOptions;
  const {pan: newPan, zoom: newZoom} = newOptions;
  if (oldZoom?.zoom?.pinch?.enabled !== newZoom?.zoom?.pinch?.enabled) {
    return true;
  }
  if (oldPan?.enabled !== newPan?.enabled) {
    return true;
  }
  if (oldPan?.threshold !== newPan?.threshold) {
    return true;
  }
  return false;
}

var version = "2.2.0";

function draw(chart, caller, options) {
  const dragOptions = options.zoom.drag;
  const {dragStart, dragEnd} = getState(chart);
  if (dragOptions.drawTime !== caller || !dragEnd) {
    return;
  }
  const {left, top, width, height} = computeDragRect(chart, options.zoom.mode, {dragStart, dragEnd}, dragOptions.maintainAspectRatio);
  const ctx = chart.ctx;
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = dragOptions.backgroundColor || 'rgba(225,225,225,0.3)';
  ctx.fillRect(left, top, width, height);
  if (dragOptions.borderWidth > 0) {
    ctx.lineWidth = dragOptions.borderWidth;
    ctx.strokeStyle = dragOptions.borderColor || 'rgba(225,225,225)';
    ctx.strokeRect(left, top, width, height);
  }
  ctx.restore();
}
var plugin = {
  id: 'zoom',
  version,
  defaults: {
    pan: {
      enabled: false,
      mode: 'xy',
      threshold: 10,
      modifierKey: null,
    },
    zoom: {
      wheel: {
        enabled: false,
        speed: 0.1,
        modifierKey: null
      },
      drag: {
        enabled: false,
        drawTime: 'beforeDatasetsDraw',
        modifierKey: null
      },
      pinch: {
        enabled: false
      },
      mode: 'xy',
    }
  },
  start: function(chart, _args, options) {
    const state = getState(chart);
    state.options = options;
    if (Object.prototype.hasOwnProperty.call(options.zoom, 'enabled')) {
      console.warn('The option `zoom.enabled` is no longer supported. Please use `zoom.wheel.enabled`, `zoom.drag.enabled`, or `zoom.pinch.enabled`.');
    }
    if (Object.prototype.hasOwnProperty.call(options.zoom, 'overScaleMode')
      || Object.prototype.hasOwnProperty.call(options.pan, 'overScaleMode')) {
      console.warn('The option `overScaleMode` is deprecated. Please use `scaleMode` instead (and update `mode` as desired).');
    }
    if ((hammerjs__WEBPACK_IMPORTED_MODULE_0___default())) {
      startHammer(chart, options);
    }
    chart.pan = (delta, panScales, transition) => pan(chart, delta, panScales, transition);
    chart.zoom = (args, transition) => zoom(chart, args, transition);
    chart.zoomRect = (p0, p1, transition) => zoomRect(chart, p0, p1, transition);
    chart.zoomScale = (id, range, transition) => zoomScale(chart, id, range, transition);
    chart.resetZoom = (transition) => resetZoom(chart, transition);
    chart.getZoomLevel = () => getZoomLevel(chart);
    chart.getInitialScaleBounds = () => getInitialScaleBounds(chart);
    chart.getZoomedScaleBounds = () => getZoomedScaleBounds(chart);
    chart.isZoomedOrPanned = () => isZoomedOrPanned(chart);
    chart.isZoomingOrPanning = () => isZoomingOrPanning(chart);
  },
  beforeEvent(chart, {event}) {
    if (isZoomingOrPanning(chart)) {
      return false;
    }
    if (event.type === 'click' || event.type === 'mouseup') {
      const state = getState(chart);
      if (state.filterNextClick) {
        state.filterNextClick = false;
        return false;
      }
    }
  },
  beforeUpdate: function(chart, args, options) {
    const state = getState(chart);
    const previousOptions = state.options;
    state.options = options;
    if (hammerOptionsChanged(previousOptions, options)) {
      stopHammer(chart);
      startHammer(chart, options);
    }
    addListeners(chart, options);
  },
  beforeDatasetsDraw(chart, _args, options) {
    draw(chart, 'beforeDatasetsDraw', options);
  },
  afterDatasetsDraw(chart, _args, options) {
    draw(chart, 'afterDatasetsDraw', options);
  },
  beforeDraw(chart, _args, options) {
    draw(chart, 'beforeDraw', options);
  },
  afterDraw(chart, _args, options) {
    draw(chart, 'afterDraw', options);
  },
  stop: function(chart) {
    removeListeners(chart);
    if ((hammerjs__WEBPACK_IMPORTED_MODULE_0___default())) {
      stopHammer(chart);
    }
    removeState(chart);
  },
  panFunctions,
  zoomFunctions,
  zoomRectFunctions,
};




/***/ }),

/***/ "./node_modules/dayjs/plugin/advancedFormat.js":
/*!*****************************************************!*\
  !*** ./node_modules/dayjs/plugin/advancedFormat.js ***!
  \*****************************************************/
/***/ (function(module) {

!function(e,t){ true?module.exports=t():0}(this,(function(){"use strict";return function(e,t){var r=t.prototype,n=r.format;r.format=function(e){var t=this,r=this.$locale();if(!this.isValid())return n.bind(this)(e);var s=this.$utils(),a=(e||"YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g,(function(e){switch(e){case"Q":return Math.ceil((t.$M+1)/3);case"Do":return r.ordinal(t.$D);case"gggg":return t.weekYear();case"GGGG":return t.isoWeekYear();case"wo":return r.ordinal(t.week(),"W");case"w":case"ww":return s.s(t.week(),"w"===e?1:2,"0");case"W":case"WW":return s.s(t.isoWeek(),"W"===e?1:2,"0");case"k":case"kk":return s.s(String(0===t.$H?24:t.$H),"k"===e?1:2,"0");case"X":return Math.floor(t.$d.getTime()/1e3);case"x":return t.$d.getTime();case"z":return"["+t.offsetName()+"]";case"zzz":return"["+t.offsetName("long")+"]";default:return e}}));return n.bind(this)(a)}}}));

/***/ }),

/***/ "./node_modules/dayjs/plugin/customParseFormat.js":
/*!********************************************************!*\
  !*** ./node_modules/dayjs/plugin/customParseFormat.js ***!
  \********************************************************/
/***/ (function(module) {

!function(e,t){ true?module.exports=t():0}(this,(function(){"use strict";var e={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},t=/(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,n=/\d\d/,r=/\d\d?/,i=/\d*[^-_:/,()\s\d]+/,o={},s=function(e){return(e=+e)+(e>68?1900:2e3)};var a=function(e){return function(t){this[e]=+t}},f=[/[+-]\d\d:?(\d\d)?|Z/,function(e){(this.zone||(this.zone={})).offset=function(e){if(!e)return 0;if("Z"===e)return 0;var t=e.match(/([+-]|\d\d)/g),n=60*t[1]+(+t[2]||0);return 0===n?0:"+"===t[0]?-n:n}(e)}],h=function(e){var t=o[e];return t&&(t.indexOf?t:t.s.concat(t.f))},u=function(e,t){var n,r=o.meridiem;if(r){for(var i=1;i<=24;i+=1)if(e.indexOf(r(i,0,t))>-1){n=i>12;break}}else n=e===(t?"pm":"PM");return n},d={A:[i,function(e){this.afternoon=u(e,!1)}],a:[i,function(e){this.afternoon=u(e,!0)}],S:[/\d/,function(e){this.milliseconds=100*+e}],SS:[n,function(e){this.milliseconds=10*+e}],SSS:[/\d{3}/,function(e){this.milliseconds=+e}],s:[r,a("seconds")],ss:[r,a("seconds")],m:[r,a("minutes")],mm:[r,a("minutes")],H:[r,a("hours")],h:[r,a("hours")],HH:[r,a("hours")],hh:[r,a("hours")],D:[r,a("day")],DD:[n,a("day")],Do:[i,function(e){var t=o.ordinal,n=e.match(/\d+/);if(this.day=n[0],t)for(var r=1;r<=31;r+=1)t(r).replace(/\[|\]/g,"")===e&&(this.day=r)}],M:[r,a("month")],MM:[n,a("month")],MMM:[i,function(e){var t=h("months"),n=(h("monthsShort")||t.map((function(e){return e.slice(0,3)}))).indexOf(e)+1;if(n<1)throw new Error;this.month=n%12||n}],MMMM:[i,function(e){var t=h("months").indexOf(e)+1;if(t<1)throw new Error;this.month=t%12||t}],Y:[/[+-]?\d+/,a("year")],YY:[n,function(e){this.year=s(e)}],YYYY:[/\d{4}/,a("year")],Z:f,ZZ:f};function c(n){var r,i;r=n,i=o&&o.formats;for(var s=(n=r.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,(function(t,n,r){var o=r&&r.toUpperCase();return n||i[r]||e[r]||i[o].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,(function(e,t,n){return t||n.slice(1)}))}))).match(t),a=s.length,f=0;f<a;f+=1){var h=s[f],u=d[h],c=u&&u[0],l=u&&u[1];s[f]=l?{regex:c,parser:l}:h.replace(/^\[|\]$/g,"")}return function(e){for(var t={},n=0,r=0;n<a;n+=1){var i=s[n];if("string"==typeof i)r+=i.length;else{var o=i.regex,f=i.parser,h=e.slice(r),u=o.exec(h)[0];f.call(t,u),e=e.replace(u,"")}}return function(e){var t=e.afternoon;if(void 0!==t){var n=e.hours;t?n<12&&(e.hours+=12):12===n&&(e.hours=0),delete e.afternoon}}(t),t}}return function(e,t,n){n.p.customParseFormat=!0,e&&e.parseTwoDigitYear&&(s=e.parseTwoDigitYear);var r=t.prototype,i=r.parse;r.parse=function(e){var t=e.date,r=e.utc,s=e.args;this.$u=r;var a=s[1];if("string"==typeof a){var f=!0===s[2],h=!0===s[3],u=f||h,d=s[2];h&&(d=s[2]),o=this.$locale(),!f&&d&&(o=n.Ls[d]),this.$d=function(e,t,n){try{if(["x","X"].indexOf(t)>-1)return new Date(("X"===t?1e3:1)*e);var r=c(t)(e),i=r.year,o=r.month,s=r.day,a=r.hours,f=r.minutes,h=r.seconds,u=r.milliseconds,d=r.zone,l=new Date,m=s||(i||o?1:l.getDate()),M=i||l.getFullYear(),Y=0;i&&!o||(Y=o>0?o-1:l.getMonth());var p=a||0,v=f||0,D=h||0,g=u||0;return d?new Date(Date.UTC(M,Y,m,p,v,D,g+60*d.offset*1e3)):n?new Date(Date.UTC(M,Y,m,p,v,D,g)):new Date(M,Y,m,p,v,D,g)}catch(e){return new Date("")}}(t,a,r),this.init(),d&&!0!==d&&(this.$L=this.locale(d).$L),u&&t!=this.format(a)&&(this.$d=new Date("")),o={}}else if(a instanceof Array)for(var l=a.length,m=1;m<=l;m+=1){s[1]=a[m-1];var M=n.apply(this,s);if(M.isValid()){this.$d=M.$d,this.$L=M.$L,this.init();break}m===l&&(this.$d=new Date(""))}else i.call(this,e)}}}));

/***/ }),

/***/ "./node_modules/dayjs/plugin/isoWeek.js":
/*!**********************************************!*\
  !*** ./node_modules/dayjs/plugin/isoWeek.js ***!
  \**********************************************/
/***/ (function(module) {

!function(e,t){ true?module.exports=t():0}(this,(function(){"use strict";var e="day";return function(t,i,s){var a=function(t){return t.add(4-t.isoWeekday(),e)},d=i.prototype;d.isoWeekYear=function(){return a(this).year()},d.isoWeek=function(t){if(!this.$utils().u(t))return this.add(7*(t-this.isoWeek()),e);var i,d,n,o,r=a(this),u=(i=this.isoWeekYear(),d=this.$u,n=(d?s.utc:s)().year(i).startOf("year"),o=4-n.isoWeekday(),n.isoWeekday()>4&&(o+=7),n.add(o,e));return r.diff(u,"week")+1},d.isoWeekday=function(e){return this.$utils().u(e)?this.day()||7:this.day(this.day()%7?e:e-7)};var n=d.startOf;d.startOf=function(e,t){var i=this.$utils(),s=!!i.u(t)||t;return"isoweek"===i.p(e)?s?this.date(this.date()-(this.isoWeekday()-1)).startOf("day"):this.date(this.date()-1-(this.isoWeekday()-1)+7).endOf("day"):n.bind(this)(e,t)}}}));

/***/ }),

/***/ "./node_modules/dayjs/plugin/localizedFormat.js":
/*!******************************************************!*\
  !*** ./node_modules/dayjs/plugin/localizedFormat.js ***!
  \******************************************************/
/***/ (function(module) {

!function(e,t){ true?module.exports=t():0}(this,(function(){"use strict";var e={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"};return function(t,o,n){var r=o.prototype,i=r.format;n.en.formats=e,r.format=function(t){void 0===t&&(t="YYYY-MM-DDTHH:mm:ssZ");var o=this.$locale().formats,n=function(t,o){return t.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,(function(t,n,r){var i=r&&r.toUpperCase();return n||o[r]||e[r]||o[i].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,(function(e,t,o){return t||o.slice(1)}))}))}(t,void 0===o?{}:o);return i.call(this,n)}}}));

/***/ }),

/***/ "./node_modules/dayjs/plugin/quarterOfYear.js":
/*!****************************************************!*\
  !*** ./node_modules/dayjs/plugin/quarterOfYear.js ***!
  \****************************************************/
/***/ (function(module) {

!function(t,n){ true?module.exports=n():0}(this,(function(){"use strict";var t="month",n="quarter";return function(e,i){var r=i.prototype;r.quarter=function(t){return this.$utils().u(t)?Math.ceil((this.month()+1)/3):this.month(this.month()%3+3*(t-1))};var s=r.add;r.add=function(e,i){return e=Number(e),this.$utils().p(i)===n?this.add(3*e,t):s.bind(this)(e,i)};var u=r.startOf;r.startOf=function(e,i){var r=this.$utils(),s=!!r.u(i)||i;if(r.p(e)===n){var o=this.quarter()-1;return s?this.month(3*o).startOf(t).startOf("day"):this.month(3*o+2).endOf(t).endOf("day")}return u.bind(this)(e,i)}}}));

/***/ }),

/***/ "./node_modules/esbuild-loader/dist/index.cjs??clonedRuleSet-1.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./web_src/js/components/RepoContributors.vue?vue&type=script&lang=js":
/*!*****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/esbuild-loader/dist/index.cjs??clonedRuleSet-1.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./web_src/js/components/RepoContributors.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _svg_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../svg.js */ "./web_src/js/svg.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! chart.js */ "./node_modules/chart.js/dist/chart.js");
/* harmony import */ var _modules_fetch_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/fetch.js */ "./web_src/js/modules/fetch.js");
/* harmony import */ var chartjs_plugin_zoom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! chartjs-plugin-zoom */ "./node_modules/chartjs-plugin-zoom/dist/chartjs-plugin-zoom.esm.js");
/* harmony import */ var vue_chartjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! vue-chartjs */ "./node_modules/vue-chartjs/dist/index.js");
/* harmony import */ var _utils_time_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/time.js */ "./web_src/js/utils/time.js");
/* harmony import */ var _utils_color_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/color.js */ "./web_src/js/utils/color.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils.js */ "./web_src/js/utils.js");
/* harmony import */ var chartjs_adapter_dayjs_4_dist_chartjs_adapter_dayjs_4_esm__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm */ "./node_modules/chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _utils_url_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils/url.js */ "./web_src/js/utils/url.js");












const customEventListener = {
  id: "customEventListener",
  afterEvent: (chart, args, opts) => {
    if (args.event.type === "dblclick" && opts.chartType === "main" && !args.replay) {
      chart.resetZoom();
      opts.instance.updateOtherCharts(args.event, true);
    }
  }
};
chart_js__WEBPACK_IMPORTED_MODULE_10__.Chart.defaults.color = _utils_color_js__WEBPACK_IMPORTED_MODULE_5__.chartJsColors.text;
chart_js__WEBPACK_IMPORTED_MODULE_10__.Chart.defaults.borderColor = _utils_color_js__WEBPACK_IMPORTED_MODULE_5__.chartJsColors.border;
chart_js__WEBPACK_IMPORTED_MODULE_10__.Chart.register(
  chart_js__WEBPACK_IMPORTED_MODULE_10__.TimeScale,
  chart_js__WEBPACK_IMPORTED_MODULE_10__.LinearScale,
  chart_js__WEBPACK_IMPORTED_MODULE_10__.BarElement,
  chart_js__WEBPACK_IMPORTED_MODULE_10__.Title,
  chart_js__WEBPACK_IMPORTED_MODULE_10__.PointElement,
  chart_js__WEBPACK_IMPORTED_MODULE_10__.LineElement,
  chart_js__WEBPACK_IMPORTED_MODULE_10__.Filler,
  chartjs_plugin_zoom__WEBPACK_IMPORTED_MODULE_3__["default"],
  customEventListener
);
/* harmony default export */ __webpack_exports__["default"] = ({
  components: { ChartLine: vue_chartjs__WEBPACK_IMPORTED_MODULE_11__.Line, SvgIcon: _svg_js__WEBPACK_IMPORTED_MODULE_0__.SvgIcon },
  props: {
    locale: {
      type: Object,
      required: true
    },
    repoLink: {
      type: String,
      required: true
    },
    repoDefaultBranchName: {
      type: String,
      required: true
    }
  },
  data: () => ({
    isLoading: false,
    errorText: "",
    totalStats: {},
    sortedContributors: {},
    type: "commits",
    contributorsStats: [],
    xAxisStart: null,
    xAxisEnd: null,
    xAxisMin: null,
    xAxisMax: null
  }),
  mounted() {
    this.fetchGraphData();
    jquery__WEBPACK_IMPORTED_MODULE_8___default()("#repo-contributors").dropdown({
      onChange: (val) => {
        this.xAxisMin = this.xAxisStart;
        this.xAxisMax = this.xAxisEnd;
        this.type = val;
        this.sortContributors();
      }
    });
  },
  methods: {
    sortContributors() {
      const contributors = this.filterContributorWeeksByDateRange();
      const criteria = `total_${this.type}`;
      this.sortedContributors = Object.values(contributors).filter((contributor) => contributor[criteria] !== 0).sort((a, b) => a[criteria] > b[criteria] ? -1 : a[criteria] === b[criteria] ? 0 : 1).slice(0, 100);
    },
    getContributorSearchQuery(contributorEmail) {
      const min = dayjs__WEBPACK_IMPORTED_MODULE_1___default()(this.xAxisMin).format("YYYY-MM-DD");
      const max = dayjs__WEBPACK_IMPORTED_MODULE_1___default()(this.xAxisMax).format("YYYY-MM-DD");
      const params = new URLSearchParams({
        "q": `after:${min}, before:${max}, author:${contributorEmail}`
      });
      return `${this.repoLink}/commits/branch/${(0,_utils_url_js__WEBPACK_IMPORTED_MODULE_9__.pathEscapeSegments)(this.repoDefaultBranchName)}/search?${params.toString()}`;
    },
    async fetchGraphData() {
      this.isLoading = true;
      try {
        let response;
        do {
          response = await (0,_modules_fetch_js__WEBPACK_IMPORTED_MODULE_2__.GET)(`${this.repoLink}/activity/contributors/data`);
          if (response.status === 202) {
            await (0,_utils_js__WEBPACK_IMPORTED_MODULE_6__.sleep)(1e3);
          }
        } while (response.status === 202);
        if (response.ok) {
          const data = await response.json();
          const { total, ...rest } = data;
          total.weeks = Object.fromEntries(Object.entries(total.weeks).sort());
          const weekValues = Object.values(total.weeks);
          this.xAxisStart = weekValues[0].week;
          this.xAxisEnd = (0,_utils_time_js__WEBPACK_IMPORTED_MODULE_4__.firstStartDateAfterDate)(/* @__PURE__ */ new Date());
          const startDays = (0,_utils_time_js__WEBPACK_IMPORTED_MODULE_4__.startDaysBetween)(this.xAxisStart, this.xAxisEnd);
          total.weeks = (0,_utils_time_js__WEBPACK_IMPORTED_MODULE_4__.fillEmptyStartDaysWithZeroes)(startDays, total.weeks);
          this.xAxisMin = this.xAxisStart;
          this.xAxisMax = this.xAxisEnd;
          this.contributorsStats = {};
          for (const [email, user] of Object.entries(rest)) {
            user.weeks = (0,_utils_time_js__WEBPACK_IMPORTED_MODULE_4__.fillEmptyStartDaysWithZeroes)(startDays, user.weeks);
            this.contributorsStats[email] = user;
          }
          this.sortContributors();
          this.totalStats = total;
          this.errorText = "";
        } else {
          this.errorText = response.statusText;
        }
      } catch (err) {
        this.errorText = err.message;
      } finally {
        this.isLoading = false;
      }
    },
    filterContributorWeeksByDateRange() {
      const filteredData = {};
      const data = this.contributorsStats;
      for (const key of Object.keys(data)) {
        const user = data[key];
        user.total_commits = 0;
        user.total_additions = 0;
        user.total_deletions = 0;
        user.max_contribution_type = 0;
        const filteredWeeks = user.weeks.filter((week) => {
          const oneWeek = 7 * 24 * 60 * 60 * 1e3;
          if (week.week >= this.xAxisMin - oneWeek && week.week <= this.xAxisMax + oneWeek) {
            user.total_commits += week.commits;
            user.total_additions += week.additions;
            user.total_deletions += week.deletions;
            if (week[this.type] > user.max_contribution_type) {
              user.max_contribution_type = week[this.type];
            }
            return true;
          }
          return false;
        });
        user.max_contribution_type += 1;
        filteredData[key] = { ...user, weeks: filteredWeeks, email: key };
      }
      return filteredData;
    },
    maxMainGraph() {
      const maxValue = Math.max(
        ...this.totalStats.weeks.map((o) => o[this.type])
      );
      const [coefficient, exp] = maxValue.toExponential().split("e").map(Number);
      if (coefficient % 1 === 0) return maxValue;
      return (1 - coefficient % 1) * 10 ** exp + maxValue;
    },
    maxContributorGraph() {
      const maxValue = Math.max(
        ...this.sortedContributors.map((c) => c.max_contribution_type)
      );
      const [coefficient, exp] = maxValue.toExponential().split("e").map(Number);
      if (coefficient % 1 === 0) return maxValue;
      return (1 - coefficient % 1) * 10 ** exp + maxValue;
    },
    toGraphData(data) {
      return {
        datasets: [
          {
            data: data.map((i) => ({ x: i.week, y: i[this.type] })),
            pointRadius: 0,
            pointHitRadius: 0,
            fill: "start",
            backgroundColor: _utils_color_js__WEBPACK_IMPORTED_MODULE_5__.chartJsColors[this.type],
            borderWidth: 0,
            tension: 0.3
          }
        ]
      };
    },
    updateOtherCharts(event, reset) {
      const minVal = event.chart.options.scales.x.min;
      const maxVal = event.chart.options.scales.x.max;
      if (reset) {
        this.xAxisMin = this.xAxisStart;
        this.xAxisMax = this.xAxisEnd;
        this.sortContributors();
      } else if (minVal) {
        this.xAxisMin = minVal;
        this.xAxisMax = maxVal;
        this.sortContributors();
      }
    },
    getOptions(type) {
      return {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        events: ["mousemove", "mouseout", "click", "touchstart", "touchmove", "dblclick"],
        plugins: {
          title: {
            display: type === "main",
            text: "drag: zoom, shift+drag: pan, double click: reset zoom",
            position: "top",
            align: "center"
          },
          customEventListener: {
            chartType: type,
            instance: this
          },
          zoom: {
            pan: {
              enabled: true,
              modifierKey: "shift",
              mode: "x",
              threshold: 20,
              onPanComplete: this.updateOtherCharts
            },
            limits: {
              x: {
                // Check https://www.chartjs.org/chartjs-plugin-zoom/latest/guide/options.html#scale-limits
                // to know what each option means
                min: "original",
                max: "original",
                // number of milliseconds in 2 weeks. Minimum x range will be 2 weeks when you zoom on the graph
                minRange: 2 * 7 * 24 * 60 * 60 * 1e3
              }
            },
            zoom: {
              drag: {
                enabled: type === "main"
              },
              pinch: {
                enabled: type === "main"
              },
              mode: "x",
              onZoomComplete: this.updateOtherCharts
            }
          }
        },
        scales: {
          x: {
            min: this.xAxisMin,
            max: this.xAxisMax,
            type: "time",
            grid: {
              display: false
            },
            time: {
              minUnit: "month"
            },
            ticks: {
              maxRotation: 0,
              maxTicksLimit: type === "main" ? 12 : 6
            }
          },
          y: {
            min: 0,
            max: type === "main" ? this.maxMainGraph() : this.maxContributorGraph(),
            ticks: {
              maxTicksLimit: type === "main" ? 6 : 4
            }
          }
        }
      };
    }
  }
});


/***/ }),

/***/ "./node_modules/esbuild-loader/dist/index.cjs??clonedRuleSet-1.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./web_src/js/components/RepoContributors.vue?vue&type=template&id=691b21a1&scoped=true":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/esbuild-loader/dist/index.cjs??clonedRuleSet-1.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./web_src/js/components/RepoContributors.vue?vue&type=template&id=691b21a1&scoped=true ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: function() { return /* binding */ render; }
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm-bundler.js");

const _hoisted_1 = { class: "ui header tw-flex tw-items-center tw-justify-between" };
const _hoisted_2 = ["datetime"];
const _hoisted_3 = ["datetime"];
const _hoisted_4 = {
  class: "ui dropdown jump",
  id: "repo-contributors"
};
const _hoisted_5 = { class: "ui basic compact button" };
const _hoisted_6 = { class: "not-mobile" };
const _hoisted_7 = { class: "menu" };
const _hoisted_8 = { class: "tw-flex ui segment main-graph" };
const _hoisted_9 = {
  key: 0,
  class: "gt-tc tw-m-auto"
};
const _hoisted_10 = { key: 0 };
const _hoisted_11 = {
  key: 1,
  class: "text red"
};
const _hoisted_12 = { class: "contributor-grid" };
const _hoisted_13 = { class: "ui top attached header tw-flex tw-flex-1" };
const _hoisted_14 = { class: "ui right" };
const _hoisted_15 = ["href"];
const _hoisted_16 = ["src"];
const _hoisted_17 = { class: "tw-ml-2" };
const _hoisted_18 = ["href"];
const _hoisted_19 = {
  key: 1,
  class: "contributor-name"
};
const _hoisted_20 = { class: "tw-text-12 tw-flex tw-gap-1" };
const _hoisted_21 = { key: 0 };
const _hoisted_22 = ["href"];
const _hoisted_23 = {
  key: 1,
  class: "text green"
};
const _hoisted_24 = {
  key: 2,
  class: "text red"
};
const _hoisted_25 = { class: "ui attached segment" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_svg_icon = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("svg-icon");
  const _component_SvgIcon = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("SvgIcon");
  const _component_ChartLine = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("ChartLine");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", null, [
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [
      (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [
        _ctx.xAxisMin > 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("relative-time", {
          key: 0,
          format: "datetime",
          year: "numeric",
          month: "short",
          day: "numeric",
          weekday: "",
          datetime: new Date(_ctx.xAxisMin)
        }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(new Date(_ctx.xAxisMin)), 9, _hoisted_2)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true),
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(
          " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.isLoading ? $props.locale.loadingTitle : _ctx.errorText ? $props.locale.loadingTitleFailed : "-") + " ",
          1
          /* TEXT */
        ),
        _ctx.xAxisMax > 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("relative-time", {
          key: 1,
          format: "datetime",
          year: "numeric",
          month: "short",
          day: "numeric",
          weekday: "",
          datetime: new Date(_ctx.xAxisMax)
        }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(new Date(_ctx.xAxisMax)), 9, _hoisted_3)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)
      ]),
      (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Contribution type "),
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [
          (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [
            (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(
              "span",
              _hoisted_6,
              (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.locale.filterLabel),
              1
              /* TEXT */
            ),
            _cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)()),
            (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(
              "strong",
              null,
              (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.locale.contributionType[_ctx.type]),
              1
              /* TEXT */
            ),
            (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_svg_icon, {
              name: "octicon-triangle-down",
              size: 14
            })
          ]),
          (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [
            (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(
              "div",
              {
                class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["item", { "selected": _ctx.type === "commits" }]),
                "data-value": "commits"
              },
              (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.locale.contributionType.commits),
              3
              /* TEXT, CLASS */
            ),
            (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(
              "div",
              {
                class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["item", { "selected": _ctx.type === "additions" }]),
                "data-value": "additions"
              },
              (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.locale.contributionType.additions),
              3
              /* TEXT, CLASS */
            ),
            (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(
              "div",
              {
                class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["item", { "selected": _ctx.type === "deletions" }]),
                "data-value": "deletions"
              },
              (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.locale.contributionType.deletions),
              3
              /* TEXT, CLASS */
            )
          ])
        ])
      ])
    ]),
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [
      _ctx.isLoading || _ctx.errorText !== "" ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_9, [
        _ctx.isLoading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_10, [
          (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_SvgIcon, {
            name: "octicon-sync",
            class: "tw-mr-2 job-status-rotate"
          }),
          (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(
            " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.locale.loadingInfo),
            1
            /* TEXT */
          )
        ])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_11, [
          (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_SvgIcon, { name: "octicon-x-circle-fill" }),
          (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(
            " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.errorText),
            1
            /* TEXT */
          )
        ]))
      ])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true),
      Object.keys(_ctx.totalStats).length !== 0 ? (0,vue__WEBPACK_IMPORTED_MODULE_0__.withMemo)([_ctx.totalStats.weeks, _ctx.type], () => ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_ChartLine, {
        key: 1,
        data: $options.toGraphData(_ctx.totalStats.weeks),
        options: $options.getOptions("main")
      }, null, 8, ["data", "options"])), _cache, 0) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)
    ]),
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [
      ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(
        vue__WEBPACK_IMPORTED_MODULE_0__.Fragment,
        null,
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.sortedContributors, (contributor, index, ___, _cached) => {
          const _memo = [_ctx.sortedContributors, _ctx.type];
          if (_cached && _cached.key === index && (0,vue__WEBPACK_IMPORTED_MODULE_0__.isMemoSame)(_cached, _memo)) return _cached;
          const _item = ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", { key: index }, [
            (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [
              (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(
                "b",
                _hoisted_14,
                "#" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(index + 1),
                1
                /* TEXT */
              ),
              (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
                href: contributor.home_link
              }, [
                (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
                  class: "ui avatar tw-align-middle",
                  height: "40",
                  width: "40",
                  src: contributor.avatar_link,
                  alt: ""
                }, null, 8, _hoisted_16)
              ], 8, _hoisted_15),
              (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [
                contributor.home_link !== "" ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("a", {
                  key: 0,
                  href: contributor.home_link
                }, [
                  (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(
                    "h4",
                    null,
                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(contributor.name),
                    1
                    /* TEXT */
                  )
                ], 8, _hoisted_18)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(
                  "h4",
                  _hoisted_19,
                  (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(contributor.name),
                  1
                  /* TEXT */
                )),
                (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_20, [
                  contributor.total_commits ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("strong", _hoisted_21, [
                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
                      class: "silenced",
                      href: $options.getContributorSearchQuery(contributor.email)
                    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(contributor.total_commits.toLocaleString()) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.locale.contributionType.commits), 9, _hoisted_22)
                  ])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true),
                  contributor.total_additions ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(
                    "strong",
                    _hoisted_23,
                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(contributor.total_additions.toLocaleString()) + "++ ",
                    1
                    /* TEXT */
                  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true),
                  contributor.total_deletions ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(
                    "strong",
                    _hoisted_24,
                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(contributor.total_deletions.toLocaleString()) + "--",
                    1
                    /* TEXT */
                  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)
                ])
              ])
            ]),
            (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [
              (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [
                (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_ChartLine, {
                  data: $options.toGraphData(contributor.weeks),
                  options: $options.getOptions("contributor")
                }, null, 8, ["data", "options"])
              ])
            ])
          ]));
          _item.memo = _memo;
          return _item;
        }, _cache, 1),
        128
        /* KEYED_FRAGMENT */
      ))
    ])
  ]);
}


/***/ }),

/***/ "./node_modules/hammerjs/hammer.js":
/*!*****************************************!*\
  !*** ./node_modules/hammerjs/hammer.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
(function(window, document, exportName, undefined) {
  'use strict';

var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
var TEST_ELEMENT = document.createElement('div');

var TYPE_FUNCTION = 'function';

var round = Math.round;
var abs = Math.abs;
var now = Date.now;

/**
 * set a timeout with a given scope
 * @param {Function} fn
 * @param {Number} timeout
 * @param {Object} context
 * @returns {number}
 */
function setTimeoutContext(fn, timeout, context) {
    return setTimeout(bindFn(fn, context), timeout);
}

/**
 * if the argument is an array, we want to execute the fn on each entry
 * if it aint an array we don't want to do a thing.
 * this is used by all the methods that accept a single and array argument.
 * @param {*|Array} arg
 * @param {String} fn
 * @param {Object} [context]
 * @returns {Boolean}
 */
function invokeArrayArg(arg, fn, context) {
    if (Array.isArray(arg)) {
        each(arg, context[fn], context);
        return true;
    }
    return false;
}

/**
 * walk objects and arrays
 * @param {Object} obj
 * @param {Function} iterator
 * @param {Object} context
 */
function each(obj, iterator, context) {
    var i;

    if (!obj) {
        return;
    }

    if (obj.forEach) {
        obj.forEach(iterator, context);
    } else if (obj.length !== undefined) {
        i = 0;
        while (i < obj.length) {
            iterator.call(context, obj[i], i, obj);
            i++;
        }
    } else {
        for (i in obj) {
            obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
        }
    }
}

/**
 * wrap a method with a deprecation warning and stack trace
 * @param {Function} method
 * @param {String} name
 * @param {String} message
 * @returns {Function} A new function wrapping the supplied method.
 */
function deprecate(method, name, message) {
    var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
    return function() {
        var e = new Error('get-stack-trace');
        var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '')
            .replace(/^\s+at\s+/gm, '')
            .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';

        var log = window.console && (window.console.warn || window.console.log);
        if (log) {
            log.call(window.console, deprecationMessage, stack);
        }
        return method.apply(this, arguments);
    };
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} target
 * @param {...Object} objects_to_assign
 * @returns {Object} target
 */
var assign;
if (typeof Object.assign !== 'function') {
    assign = function assign(target) {
        if (target === undefined || target === null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }

        var output = Object(target);
        for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source !== undefined && source !== null) {
                for (var nextKey in source) {
                    if (source.hasOwnProperty(nextKey)) {
                        output[nextKey] = source[nextKey];
                    }
                }
            }
        }
        return output;
    };
} else {
    assign = Object.assign;
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} dest
 * @param {Object} src
 * @param {Boolean} [merge=false]
 * @returns {Object} dest
 */
var extend = deprecate(function extend(dest, src, merge) {
    var keys = Object.keys(src);
    var i = 0;
    while (i < keys.length) {
        if (!merge || (merge && dest[keys[i]] === undefined)) {
            dest[keys[i]] = src[keys[i]];
        }
        i++;
    }
    return dest;
}, 'extend', 'Use `assign`.');

/**
 * merge the values from src in the dest.
 * means that properties that exist in dest will not be overwritten by src
 * @param {Object} dest
 * @param {Object} src
 * @returns {Object} dest
 */
var merge = deprecate(function merge(dest, src) {
    return extend(dest, src, true);
}, 'merge', 'Use `assign`.');

/**
 * simple class inheritance
 * @param {Function} child
 * @param {Function} base
 * @param {Object} [properties]
 */
function inherit(child, base, properties) {
    var baseP = base.prototype,
        childP;

    childP = child.prototype = Object.create(baseP);
    childP.constructor = child;
    childP._super = baseP;

    if (properties) {
        assign(childP, properties);
    }
}

/**
 * simple function bind
 * @param {Function} fn
 * @param {Object} context
 * @returns {Function}
 */
function bindFn(fn, context) {
    return function boundFn() {
        return fn.apply(context, arguments);
    };
}

/**
 * let a boolean value also be a function that must return a boolean
 * this first item in args will be used as the context
 * @param {Boolean|Function} val
 * @param {Array} [args]
 * @returns {Boolean}
 */
function boolOrFn(val, args) {
    if (typeof val == TYPE_FUNCTION) {
        return val.apply(args ? args[0] || undefined : undefined, args);
    }
    return val;
}

/**
 * use the val2 when val1 is undefined
 * @param {*} val1
 * @param {*} val2
 * @returns {*}
 */
function ifUndefined(val1, val2) {
    return (val1 === undefined) ? val2 : val1;
}

/**
 * addEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function addEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.addEventListener(type, handler, false);
    });
}

/**
 * removeEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function removeEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.removeEventListener(type, handler, false);
    });
}

/**
 * find if a node is in the given parent
 * @method hasParent
 * @param {HTMLElement} node
 * @param {HTMLElement} parent
 * @return {Boolean} found
 */
function hasParent(node, parent) {
    while (node) {
        if (node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

/**
 * small indexOf wrapper
 * @param {String} str
 * @param {String} find
 * @returns {Boolean} found
 */
function inStr(str, find) {
    return str.indexOf(find) > -1;
}

/**
 * split string on whitespace
 * @param {String} str
 * @returns {Array} words
 */
function splitStr(str) {
    return str.trim().split(/\s+/g);
}

/**
 * find if a array contains the object using indexOf or a simple polyFill
 * @param {Array} src
 * @param {String} find
 * @param {String} [findByKey]
 * @return {Boolean|Number} false when not found, or the index
 */
function inArray(src, find, findByKey) {
    if (src.indexOf && !findByKey) {
        return src.indexOf(find);
    } else {
        var i = 0;
        while (i < src.length) {
            if ((findByKey && src[i][findByKey] == find) || (!findByKey && src[i] === find)) {
                return i;
            }
            i++;
        }
        return -1;
    }
}

/**
 * convert array-like objects to real arrays
 * @param {Object} obj
 * @returns {Array}
 */
function toArray(obj) {
    return Array.prototype.slice.call(obj, 0);
}

/**
 * unique array with objects based on a key (like 'id') or just by the array's value
 * @param {Array} src [{id:1},{id:2},{id:1}]
 * @param {String} [key]
 * @param {Boolean} [sort=False]
 * @returns {Array} [{id:1},{id:2}]
 */
function uniqueArray(src, key, sort) {
    var results = [];
    var values = [];
    var i = 0;

    while (i < src.length) {
        var val = key ? src[i][key] : src[i];
        if (inArray(values, val) < 0) {
            results.push(src[i]);
        }
        values[i] = val;
        i++;
    }

    if (sort) {
        if (!key) {
            results = results.sort();
        } else {
            results = results.sort(function sortUniqueArray(a, b) {
                return a[key] > b[key];
            });
        }
    }

    return results;
}

/**
 * get the prefixed property
 * @param {Object} obj
 * @param {String} property
 * @returns {String|Undefined} prefixed
 */
function prefixed(obj, property) {
    var prefix, prop;
    var camelProp = property[0].toUpperCase() + property.slice(1);

    var i = 0;
    while (i < VENDOR_PREFIXES.length) {
        prefix = VENDOR_PREFIXES[i];
        prop = (prefix) ? prefix + camelProp : property;

        if (prop in obj) {
            return prop;
        }
        i++;
    }
    return undefined;
}

/**
 * get a unique id
 * @returns {number} uniqueId
 */
var _uniqueId = 1;
function uniqueId() {
    return _uniqueId++;
}

/**
 * get the window object of an element
 * @param {HTMLElement} element
 * @returns {DocumentView|Window}
 */
function getWindowForElement(element) {
    var doc = element.ownerDocument || element;
    return (doc.defaultView || doc.parentWindow || window);
}

var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

var SUPPORT_TOUCH = ('ontouchstart' in window);
var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);

var INPUT_TYPE_TOUCH = 'touch';
var INPUT_TYPE_PEN = 'pen';
var INPUT_TYPE_MOUSE = 'mouse';
var INPUT_TYPE_KINECT = 'kinect';

var COMPUTE_INTERVAL = 25;

var INPUT_START = 1;
var INPUT_MOVE = 2;
var INPUT_END = 4;
var INPUT_CANCEL = 8;

var DIRECTION_NONE = 1;
var DIRECTION_LEFT = 2;
var DIRECTION_RIGHT = 4;
var DIRECTION_UP = 8;
var DIRECTION_DOWN = 16;

var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;

var PROPS_XY = ['x', 'y'];
var PROPS_CLIENT_XY = ['clientX', 'clientY'];

/**
 * create new input type manager
 * @param {Manager} manager
 * @param {Function} callback
 * @returns {Input}
 * @constructor
 */
function Input(manager, callback) {
    var self = this;
    this.manager = manager;
    this.callback = callback;
    this.element = manager.element;
    this.target = manager.options.inputTarget;

    // smaller wrapper around the handler, for the scope and the enabled state of the manager,
    // so when disabled the input events are completely bypassed.
    this.domHandler = function(ev) {
        if (boolOrFn(manager.options.enable, [manager])) {
            self.handler(ev);
        }
    };

    this.init();

}

Input.prototype = {
    /**
     * should handle the inputEvent data and trigger the callback
     * @virtual
     */
    handler: function() { },

    /**
     * bind the events
     */
    init: function() {
        this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    },

    /**
     * unbind the events
     */
    destroy: function() {
        this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    }
};

/**
 * create new input type manager
 * called by the Manager constructor
 * @param {Hammer} manager
 * @returns {Input}
 */
function createInputInstance(manager) {
    var Type;
    var inputClass = manager.options.inputClass;

    if (inputClass) {
        Type = inputClass;
    } else if (SUPPORT_POINTER_EVENTS) {
        Type = PointerEventInput;
    } else if (SUPPORT_ONLY_TOUCH) {
        Type = TouchInput;
    } else if (!SUPPORT_TOUCH) {
        Type = MouseInput;
    } else {
        Type = TouchMouseInput;
    }
    return new (Type)(manager, inputHandler);
}

/**
 * handle input events
 * @param {Manager} manager
 * @param {String} eventType
 * @param {Object} input
 */
function inputHandler(manager, eventType, input) {
    var pointersLen = input.pointers.length;
    var changedPointersLen = input.changedPointers.length;
    var isFirst = (eventType & INPUT_START && (pointersLen - changedPointersLen === 0));
    var isFinal = (eventType & (INPUT_END | INPUT_CANCEL) && (pointersLen - changedPointersLen === 0));

    input.isFirst = !!isFirst;
    input.isFinal = !!isFinal;

    if (isFirst) {
        manager.session = {};
    }

    // source event is the normalized value of the domEvents
    // like 'touchstart, mouseup, pointerdown'
    input.eventType = eventType;

    // compute scale, rotation etc
    computeInputData(manager, input);

    // emit secret event
    manager.emit('hammer.input', input);

    manager.recognize(input);
    manager.session.prevInput = input;
}

/**
 * extend the data with some usable properties like scale, rotate, velocity etc
 * @param {Object} manager
 * @param {Object} input
 */
function computeInputData(manager, input) {
    var session = manager.session;
    var pointers = input.pointers;
    var pointersLength = pointers.length;

    // store the first input to calculate the distance and direction
    if (!session.firstInput) {
        session.firstInput = simpleCloneInputData(input);
    }

    // to compute scale and rotation we need to store the multiple touches
    if (pointersLength > 1 && !session.firstMultiple) {
        session.firstMultiple = simpleCloneInputData(input);
    } else if (pointersLength === 1) {
        session.firstMultiple = false;
    }

    var firstInput = session.firstInput;
    var firstMultiple = session.firstMultiple;
    var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;

    var center = input.center = getCenter(pointers);
    input.timeStamp = now();
    input.deltaTime = input.timeStamp - firstInput.timeStamp;

    input.angle = getAngle(offsetCenter, center);
    input.distance = getDistance(offsetCenter, center);

    computeDeltaXY(session, input);
    input.offsetDirection = getDirection(input.deltaX, input.deltaY);

    var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
    input.overallVelocityX = overallVelocity.x;
    input.overallVelocityY = overallVelocity.y;
    input.overallVelocity = (abs(overallVelocity.x) > abs(overallVelocity.y)) ? overallVelocity.x : overallVelocity.y;

    input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
    input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;

    input.maxPointers = !session.prevInput ? input.pointers.length : ((input.pointers.length >
        session.prevInput.maxPointers) ? input.pointers.length : session.prevInput.maxPointers);

    computeIntervalInputData(session, input);

    // find the correct target
    var target = manager.element;
    if (hasParent(input.srcEvent.target, target)) {
        target = input.srcEvent.target;
    }
    input.target = target;
}

function computeDeltaXY(session, input) {
    var center = input.center;
    var offset = session.offsetDelta || {};
    var prevDelta = session.prevDelta || {};
    var prevInput = session.prevInput || {};

    if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
        prevDelta = session.prevDelta = {
            x: prevInput.deltaX || 0,
            y: prevInput.deltaY || 0
        };

        offset = session.offsetDelta = {
            x: center.x,
            y: center.y
        };
    }

    input.deltaX = prevDelta.x + (center.x - offset.x);
    input.deltaY = prevDelta.y + (center.y - offset.y);
}

/**
 * velocity is calculated every x ms
 * @param {Object} session
 * @param {Object} input
 */
function computeIntervalInputData(session, input) {
    var last = session.lastInterval || input,
        deltaTime = input.timeStamp - last.timeStamp,
        velocity, velocityX, velocityY, direction;

    if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
        var deltaX = input.deltaX - last.deltaX;
        var deltaY = input.deltaY - last.deltaY;

        var v = getVelocity(deltaTime, deltaX, deltaY);
        velocityX = v.x;
        velocityY = v.y;
        velocity = (abs(v.x) > abs(v.y)) ? v.x : v.y;
        direction = getDirection(deltaX, deltaY);

        session.lastInterval = input;
    } else {
        // use latest velocity info if it doesn't overtake a minimum period
        velocity = last.velocity;
        velocityX = last.velocityX;
        velocityY = last.velocityY;
        direction = last.direction;
    }

    input.velocity = velocity;
    input.velocityX = velocityX;
    input.velocityY = velocityY;
    input.direction = direction;
}

/**
 * create a simple clone from the input used for storage of firstInput and firstMultiple
 * @param {Object} input
 * @returns {Object} clonedInputData
 */
function simpleCloneInputData(input) {
    // make a simple copy of the pointers because we will get a reference if we don't
    // we only need clientXY for the calculations
    var pointers = [];
    var i = 0;
    while (i < input.pointers.length) {
        pointers[i] = {
            clientX: round(input.pointers[i].clientX),
            clientY: round(input.pointers[i].clientY)
        };
        i++;
    }

    return {
        timeStamp: now(),
        pointers: pointers,
        center: getCenter(pointers),
        deltaX: input.deltaX,
        deltaY: input.deltaY
    };
}

/**
 * get the center of all the pointers
 * @param {Array} pointers
 * @return {Object} center contains `x` and `y` properties
 */
function getCenter(pointers) {
    var pointersLength = pointers.length;

    // no need to loop when only one touch
    if (pointersLength === 1) {
        return {
            x: round(pointers[0].clientX),
            y: round(pointers[0].clientY)
        };
    }

    var x = 0, y = 0, i = 0;
    while (i < pointersLength) {
        x += pointers[i].clientX;
        y += pointers[i].clientY;
        i++;
    }

    return {
        x: round(x / pointersLength),
        y: round(y / pointersLength)
    };
}

/**
 * calculate the velocity between two points. unit is in px per ms.
 * @param {Number} deltaTime
 * @param {Number} x
 * @param {Number} y
 * @return {Object} velocity `x` and `y`
 */
function getVelocity(deltaTime, x, y) {
    return {
        x: x / deltaTime || 0,
        y: y / deltaTime || 0
    };
}

/**
 * get the direction between two points
 * @param {Number} x
 * @param {Number} y
 * @return {Number} direction
 */
function getDirection(x, y) {
    if (x === y) {
        return DIRECTION_NONE;
    }

    if (abs(x) >= abs(y)) {
        return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
    }
    return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
}

/**
 * calculate the absolute distance between two points
 * @param {Object} p1 {x, y}
 * @param {Object} p2 {x, y}
 * @param {Array} [props] containing x and y keys
 * @return {Number} distance
 */
function getDistance(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];

    return Math.sqrt((x * x) + (y * y));
}

/**
 * calculate the angle between two coordinates
 * @param {Object} p1
 * @param {Object} p2
 * @param {Array} [props] containing x and y keys
 * @return {Number} angle
 */
function getAngle(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];
    return Math.atan2(y, x) * 180 / Math.PI;
}

/**
 * calculate the rotation degrees between two pointersets
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} rotation
 */
function getRotation(start, end) {
    return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
}

/**
 * calculate the scale factor between two pointersets
 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} scale
 */
function getScale(start, end) {
    return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
}

var MOUSE_INPUT_MAP = {
    mousedown: INPUT_START,
    mousemove: INPUT_MOVE,
    mouseup: INPUT_END
};

var MOUSE_ELEMENT_EVENTS = 'mousedown';
var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';

/**
 * Mouse events input
 * @constructor
 * @extends Input
 */
function MouseInput() {
    this.evEl = MOUSE_ELEMENT_EVENTS;
    this.evWin = MOUSE_WINDOW_EVENTS;

    this.pressed = false; // mousedown state

    Input.apply(this, arguments);
}

inherit(MouseInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function MEhandler(ev) {
        var eventType = MOUSE_INPUT_MAP[ev.type];

        // on start we want to have the left mouse button down
        if (eventType & INPUT_START && ev.button === 0) {
            this.pressed = true;
        }

        if (eventType & INPUT_MOVE && ev.which !== 1) {
            eventType = INPUT_END;
        }

        // mouse must be down
        if (!this.pressed) {
            return;
        }

        if (eventType & INPUT_END) {
            this.pressed = false;
        }

        this.callback(this.manager, eventType, {
            pointers: [ev],
            changedPointers: [ev],
            pointerType: INPUT_TYPE_MOUSE,
            srcEvent: ev
        });
    }
});

var POINTER_INPUT_MAP = {
    pointerdown: INPUT_START,
    pointermove: INPUT_MOVE,
    pointerup: INPUT_END,
    pointercancel: INPUT_CANCEL,
    pointerout: INPUT_CANCEL
};

// in IE10 the pointer types is defined as an enum
var IE10_POINTER_TYPE_ENUM = {
    2: INPUT_TYPE_TOUCH,
    3: INPUT_TYPE_PEN,
    4: INPUT_TYPE_MOUSE,
    5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
};

var POINTER_ELEMENT_EVENTS = 'pointerdown';
var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';

// IE10 has prefixed support, and case-sensitive
if (window.MSPointerEvent && !window.PointerEvent) {
    POINTER_ELEMENT_EVENTS = 'MSPointerDown';
    POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
}

/**
 * Pointer events input
 * @constructor
 * @extends Input
 */
function PointerEventInput() {
    this.evEl = POINTER_ELEMENT_EVENTS;
    this.evWin = POINTER_WINDOW_EVENTS;

    Input.apply(this, arguments);

    this.store = (this.manager.session.pointerEvents = []);
}

inherit(PointerEventInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function PEhandler(ev) {
        var store = this.store;
        var removePointer = false;

        var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
        var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
        var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;

        var isTouch = (pointerType == INPUT_TYPE_TOUCH);

        // get index of the event in the store
        var storeIndex = inArray(store, ev.pointerId, 'pointerId');

        // start and mouse must be down
        if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
            if (storeIndex < 0) {
                store.push(ev);
                storeIndex = store.length - 1;
            }
        } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
            removePointer = true;
        }

        // it not found, so the pointer hasn't been down (so it's probably a hover)
        if (storeIndex < 0) {
            return;
        }

        // update the event in the store
        store[storeIndex] = ev;

        this.callback(this.manager, eventType, {
            pointers: store,
            changedPointers: [ev],
            pointerType: pointerType,
            srcEvent: ev
        });

        if (removePointer) {
            // remove from the store
            store.splice(storeIndex, 1);
        }
    }
});

var SINGLE_TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
};

var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Touch events input
 * @constructor
 * @extends Input
 */
function SingleTouchInput() {
    this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
    this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
    this.started = false;

    Input.apply(this, arguments);
}

inherit(SingleTouchInput, Input, {
    handler: function TEhandler(ev) {
        var type = SINGLE_TOUCH_INPUT_MAP[ev.type];

        // should we handle the touch events?
        if (type === INPUT_START) {
            this.started = true;
        }

        if (!this.started) {
            return;
        }

        var touches = normalizeSingleTouches.call(this, ev, type);

        // when done, reset the started state
        if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
            this.started = false;
        }

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function normalizeSingleTouches(ev, type) {
    var all = toArray(ev.touches);
    var changed = toArray(ev.changedTouches);

    if (type & (INPUT_END | INPUT_CANCEL)) {
        all = uniqueArray(all.concat(changed), 'identifier', true);
    }

    return [all, changed];
}

var TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
};

var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Multi-user touch events input
 * @constructor
 * @extends Input
 */
function TouchInput() {
    this.evTarget = TOUCH_TARGET_EVENTS;
    this.targetIds = {};

    Input.apply(this, arguments);
}

inherit(TouchInput, Input, {
    handler: function MTEhandler(ev) {
        var type = TOUCH_INPUT_MAP[ev.type];
        var touches = getTouches.call(this, ev, type);
        if (!touches) {
            return;
        }

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function getTouches(ev, type) {
    var allTouches = toArray(ev.touches);
    var targetIds = this.targetIds;

    // when there is only one touch, the process can be simplified
    if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
        targetIds[allTouches[0].identifier] = true;
        return [allTouches, allTouches];
    }

    var i,
        targetTouches,
        changedTouches = toArray(ev.changedTouches),
        changedTargetTouches = [],
        target = this.target;

    // get target touches from touches
    targetTouches = allTouches.filter(function(touch) {
        return hasParent(touch.target, target);
    });

    // collect touches
    if (type === INPUT_START) {
        i = 0;
        while (i < targetTouches.length) {
            targetIds[targetTouches[i].identifier] = true;
            i++;
        }
    }

    // filter changed touches to only contain touches that exist in the collected target ids
    i = 0;
    while (i < changedTouches.length) {
        if (targetIds[changedTouches[i].identifier]) {
            changedTargetTouches.push(changedTouches[i]);
        }

        // cleanup removed touches
        if (type & (INPUT_END | INPUT_CANCEL)) {
            delete targetIds[changedTouches[i].identifier];
        }
        i++;
    }

    if (!changedTargetTouches.length) {
        return;
    }

    return [
        // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
        uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true),
        changedTargetTouches
    ];
}

/**
 * Combined touch and mouse input
 *
 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
 * This because touch devices also emit mouse events while doing a touch.
 *
 * @constructor
 * @extends Input
 */

var DEDUP_TIMEOUT = 2500;
var DEDUP_DISTANCE = 25;

function TouchMouseInput() {
    Input.apply(this, arguments);

    var handler = bindFn(this.handler, this);
    this.touch = new TouchInput(this.manager, handler);
    this.mouse = new MouseInput(this.manager, handler);

    this.primaryTouch = null;
    this.lastTouches = [];
}

inherit(TouchMouseInput, Input, {
    /**
     * handle mouse and touch events
     * @param {Hammer} manager
     * @param {String} inputEvent
     * @param {Object} inputData
     */
    handler: function TMEhandler(manager, inputEvent, inputData) {
        var isTouch = (inputData.pointerType == INPUT_TYPE_TOUCH),
            isMouse = (inputData.pointerType == INPUT_TYPE_MOUSE);

        if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
            return;
        }

        // when we're in a touch event, record touches to  de-dupe synthetic mouse event
        if (isTouch) {
            recordTouches.call(this, inputEvent, inputData);
        } else if (isMouse && isSyntheticEvent.call(this, inputData)) {
            return;
        }

        this.callback(manager, inputEvent, inputData);
    },

    /**
     * remove the event listeners
     */
    destroy: function destroy() {
        this.touch.destroy();
        this.mouse.destroy();
    }
});

function recordTouches(eventType, eventData) {
    if (eventType & INPUT_START) {
        this.primaryTouch = eventData.changedPointers[0].identifier;
        setLastTouch.call(this, eventData);
    } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
        setLastTouch.call(this, eventData);
    }
}

function setLastTouch(eventData) {
    var touch = eventData.changedPointers[0];

    if (touch.identifier === this.primaryTouch) {
        var lastTouch = {x: touch.clientX, y: touch.clientY};
        this.lastTouches.push(lastTouch);
        var lts = this.lastTouches;
        var removeLastTouch = function() {
            var i = lts.indexOf(lastTouch);
            if (i > -1) {
                lts.splice(i, 1);
            }
        };
        setTimeout(removeLastTouch, DEDUP_TIMEOUT);
    }
}

function isSyntheticEvent(eventData) {
    var x = eventData.srcEvent.clientX, y = eventData.srcEvent.clientY;
    for (var i = 0; i < this.lastTouches.length; i++) {
        var t = this.lastTouches[i];
        var dx = Math.abs(x - t.x), dy = Math.abs(y - t.y);
        if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
            return true;
        }
    }
    return false;
}

var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;

// magical touchAction value
var TOUCH_ACTION_COMPUTE = 'compute';
var TOUCH_ACTION_AUTO = 'auto';
var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
var TOUCH_ACTION_NONE = 'none';
var TOUCH_ACTION_PAN_X = 'pan-x';
var TOUCH_ACTION_PAN_Y = 'pan-y';
var TOUCH_ACTION_MAP = getTouchActionProps();

/**
 * Touch Action
 * sets the touchAction property or uses the js alternative
 * @param {Manager} manager
 * @param {String} value
 * @constructor
 */
function TouchAction(manager, value) {
    this.manager = manager;
    this.set(value);
}

TouchAction.prototype = {
    /**
     * set the touchAction value on the element or enable the polyfill
     * @param {String} value
     */
    set: function(value) {
        // find out the touch-action by the event handlers
        if (value == TOUCH_ACTION_COMPUTE) {
            value = this.compute();
        }

        if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
            this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
        }
        this.actions = value.toLowerCase().trim();
    },

    /**
     * just re-set the touchAction value
     */
    update: function() {
        this.set(this.manager.options.touchAction);
    },

    /**
     * compute the value for the touchAction property based on the recognizer's settings
     * @returns {String} value
     */
    compute: function() {
        var actions = [];
        each(this.manager.recognizers, function(recognizer) {
            if (boolOrFn(recognizer.options.enable, [recognizer])) {
                actions = actions.concat(recognizer.getTouchAction());
            }
        });
        return cleanTouchActions(actions.join(' '));
    },

    /**
     * this method is called on each input cycle and provides the preventing of the browser behavior
     * @param {Object} input
     */
    preventDefaults: function(input) {
        var srcEvent = input.srcEvent;
        var direction = input.offsetDirection;

        // if the touch action did prevented once this session
        if (this.manager.session.prevented) {
            srcEvent.preventDefault();
            return;
        }

        var actions = this.actions;
        var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

        if (hasNone) {
            //do not prevent defaults if this is a tap gesture

            var isTapPointer = input.pointers.length === 1;
            var isTapMovement = input.distance < 2;
            var isTapTouchTime = input.deltaTime < 250;

            if (isTapPointer && isTapMovement && isTapTouchTime) {
                return;
            }
        }

        if (hasPanX && hasPanY) {
            // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
            return;
        }

        if (hasNone ||
            (hasPanY && direction & DIRECTION_HORIZONTAL) ||
            (hasPanX && direction & DIRECTION_VERTICAL)) {
            return this.preventSrc(srcEvent);
        }
    },

    /**
     * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
     * @param {Object} srcEvent
     */
    preventSrc: function(srcEvent) {
        this.manager.session.prevented = true;
        srcEvent.preventDefault();
    }
};

/**
 * when the touchActions are collected they are not a valid value, so we need to clean things up. *
 * @param {String} actions
 * @returns {*}
 */
function cleanTouchActions(actions) {
    // none
    if (inStr(actions, TOUCH_ACTION_NONE)) {
        return TOUCH_ACTION_NONE;
    }

    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);

    // if both pan-x and pan-y are set (different recognizers
    // for different directions, e.g. horizontal pan but vertical swipe?)
    // we need none (as otherwise with pan-x pan-y combined none of these
    // recognizers will work, since the browser would handle all panning
    if (hasPanX && hasPanY) {
        return TOUCH_ACTION_NONE;
    }

    // pan-x OR pan-y
    if (hasPanX || hasPanY) {
        return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
    }

    // manipulation
    if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
        return TOUCH_ACTION_MANIPULATION;
    }

    return TOUCH_ACTION_AUTO;
}

function getTouchActionProps() {
    if (!NATIVE_TOUCH_ACTION) {
        return false;
    }
    var touchMap = {};
    var cssSupports = window.CSS && window.CSS.supports;
    ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function(val) {

        // If css.supports is not supported but there is native touch-action assume it supports
        // all values. This is the case for IE 10 and 11.
        touchMap[val] = cssSupports ? window.CSS.supports('touch-action', val) : true;
    });
    return touchMap;
}

/**
 * Recognizer flow explained; *
 * All recognizers have the initial state of POSSIBLE when a input session starts.
 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
 * Example session for mouse-input: mousedown -> mousemove -> mouseup
 *
 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
 * which determines with state it should be.
 *
 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
 * POSSIBLE to give it another change on the next cycle.
 *
 *               Possible
 *                  |
 *            +-----+---------------+
 *            |                     |
 *      +-----+-----+               |
 *      |           |               |
 *   Failed      Cancelled          |
 *                          +-------+------+
 *                          |              |
 *                      Recognized       Began
 *                                         |
 *                                      Changed
 *                                         |
 *                                  Ended/Recognized
 */
var STATE_POSSIBLE = 1;
var STATE_BEGAN = 2;
var STATE_CHANGED = 4;
var STATE_ENDED = 8;
var STATE_RECOGNIZED = STATE_ENDED;
var STATE_CANCELLED = 16;
var STATE_FAILED = 32;

/**
 * Recognizer
 * Every recognizer needs to extend from this class.
 * @constructor
 * @param {Object} options
 */
function Recognizer(options) {
    this.options = assign({}, this.defaults, options || {});

    this.id = uniqueId();

    this.manager = null;

    // default is enable true
    this.options.enable = ifUndefined(this.options.enable, true);

    this.state = STATE_POSSIBLE;

    this.simultaneous = {};
    this.requireFail = [];
}

Recognizer.prototype = {
    /**
     * @virtual
     * @type {Object}
     */
    defaults: {},

    /**
     * set options
     * @param {Object} options
     * @return {Recognizer}
     */
    set: function(options) {
        assign(this.options, options);

        // also update the touchAction, in case something changed about the directions/enabled state
        this.manager && this.manager.touchAction.update();
        return this;
    },

    /**
     * recognize simultaneous with an other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    recognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
            return this;
        }

        var simultaneous = this.simultaneous;
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (!simultaneous[otherRecognizer.id]) {
            simultaneous[otherRecognizer.id] = otherRecognizer;
            otherRecognizer.recognizeWith(this);
        }
        return this;
    },

    /**
     * drop the simultaneous link. it doesnt remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRecognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        delete this.simultaneous[otherRecognizer.id];
        return this;
    },

    /**
     * recognizer can only run when an other is failing
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    requireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
            return this;
        }

        var requireFail = this.requireFail;
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (inArray(requireFail, otherRecognizer) === -1) {
            requireFail.push(otherRecognizer);
            otherRecognizer.requireFailure(this);
        }
        return this;
    },

    /**
     * drop the requireFailure link. it does not remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRequireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        var index = inArray(this.requireFail, otherRecognizer);
        if (index > -1) {
            this.requireFail.splice(index, 1);
        }
        return this;
    },

    /**
     * has require failures boolean
     * @returns {boolean}
     */
    hasRequireFailures: function() {
        return this.requireFail.length > 0;
    },

    /**
     * if the recognizer can recognize simultaneous with an other recognizer
     * @param {Recognizer} otherRecognizer
     * @returns {Boolean}
     */
    canRecognizeWith: function(otherRecognizer) {
        return !!this.simultaneous[otherRecognizer.id];
    },

    /**
     * You should use `tryEmit` instead of `emit` directly to check
     * that all the needed recognizers has failed before emitting.
     * @param {Object} input
     */
    emit: function(input) {
        var self = this;
        var state = this.state;

        function emit(event) {
            self.manager.emit(event, input);
        }

        // 'panstart' and 'panmove'
        if (state < STATE_ENDED) {
            emit(self.options.event + stateStr(state));
        }

        emit(self.options.event); // simple 'eventName' events

        if (input.additionalEvent) { // additional event(panleft, panright, pinchin, pinchout...)
            emit(input.additionalEvent);
        }

        // panend and pancancel
        if (state >= STATE_ENDED) {
            emit(self.options.event + stateStr(state));
        }
    },

    /**
     * Check that all the require failure recognizers has failed,
     * if true, it emits a gesture event,
     * otherwise, setup the state to FAILED.
     * @param {Object} input
     */
    tryEmit: function(input) {
        if (this.canEmit()) {
            return this.emit(input);
        }
        // it's failing anyway
        this.state = STATE_FAILED;
    },

    /**
     * can we emit?
     * @returns {boolean}
     */
    canEmit: function() {
        var i = 0;
        while (i < this.requireFail.length) {
            if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
                return false;
            }
            i++;
        }
        return true;
    },

    /**
     * update the recognizer
     * @param {Object} inputData
     */
    recognize: function(inputData) {
        // make a new copy of the inputData
        // so we can change the inputData without messing up the other recognizers
        var inputDataClone = assign({}, inputData);

        // is is enabled and allow recognizing?
        if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
            this.reset();
            this.state = STATE_FAILED;
            return;
        }

        // reset when we've reached the end
        if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
            this.state = STATE_POSSIBLE;
        }

        this.state = this.process(inputDataClone);

        // the recognizer has recognized a gesture
        // so trigger an event
        if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
            this.tryEmit(inputDataClone);
        }
    },

    /**
     * return the state of the recognizer
     * the actual recognizing happens in this method
     * @virtual
     * @param {Object} inputData
     * @returns {Const} STATE
     */
    process: function(inputData) { }, // jshint ignore:line

    /**
     * return the preferred touch-action
     * @virtual
     * @returns {Array}
     */
    getTouchAction: function() { },

    /**
     * called when the gesture isn't allowed to recognize
     * like when another is being recognized or it is disabled
     * @virtual
     */
    reset: function() { }
};

/**
 * get a usable string, used as event postfix
 * @param {Const} state
 * @returns {String} state
 */
function stateStr(state) {
    if (state & STATE_CANCELLED) {
        return 'cancel';
    } else if (state & STATE_ENDED) {
        return 'end';
    } else if (state & STATE_CHANGED) {
        return 'move';
    } else if (state & STATE_BEGAN) {
        return 'start';
    }
    return '';
}

/**
 * direction cons to string
 * @param {Const} direction
 * @returns {String}
 */
function directionStr(direction) {
    if (direction == DIRECTION_DOWN) {
        return 'down';
    } else if (direction == DIRECTION_UP) {
        return 'up';
    } else if (direction == DIRECTION_LEFT) {
        return 'left';
    } else if (direction == DIRECTION_RIGHT) {
        return 'right';
    }
    return '';
}

/**
 * get a recognizer by name if it is bound to a manager
 * @param {Recognizer|String} otherRecognizer
 * @param {Recognizer} recognizer
 * @returns {Recognizer}
 */
function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
    var manager = recognizer.manager;
    if (manager) {
        return manager.get(otherRecognizer);
    }
    return otherRecognizer;
}

/**
 * This recognizer is just used as a base for the simple attribute recognizers.
 * @constructor
 * @extends Recognizer
 */
function AttrRecognizer() {
    Recognizer.apply(this, arguments);
}

inherit(AttrRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof AttrRecognizer
     */
    defaults: {
        /**
         * @type {Number}
         * @default 1
         */
        pointers: 1
    },

    /**
     * Used to check if it the recognizer receives valid input, like input.distance > 10.
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {Boolean} recognized
     */
    attrTest: function(input) {
        var optionPointers = this.options.pointers;
        return optionPointers === 0 || input.pointers.length === optionPointers;
    },

    /**
     * Process the input and return the state for the recognizer
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {*} State
     */
    process: function(input) {
        var state = this.state;
        var eventType = input.eventType;

        var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
        var isValid = this.attrTest(input);

        // on cancel input and we've recognized before, return STATE_CANCELLED
        if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
            return state | STATE_CANCELLED;
        } else if (isRecognized || isValid) {
            if (eventType & INPUT_END) {
                return state | STATE_ENDED;
            } else if (!(state & STATE_BEGAN)) {
                return STATE_BEGAN;
            }
            return state | STATE_CHANGED;
        }
        return STATE_FAILED;
    }
});

/**
 * Pan
 * Recognized when the pointer is down and moved in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function PanRecognizer() {
    AttrRecognizer.apply(this, arguments);

    this.pX = null;
    this.pY = null;
}

inherit(PanRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PanRecognizer
     */
    defaults: {
        event: 'pan',
        threshold: 10,
        pointers: 1,
        direction: DIRECTION_ALL
    },

    getTouchAction: function() {
        var direction = this.options.direction;
        var actions = [];
        if (direction & DIRECTION_HORIZONTAL) {
            actions.push(TOUCH_ACTION_PAN_Y);
        }
        if (direction & DIRECTION_VERTICAL) {
            actions.push(TOUCH_ACTION_PAN_X);
        }
        return actions;
    },

    directionTest: function(input) {
        var options = this.options;
        var hasMoved = true;
        var distance = input.distance;
        var direction = input.direction;
        var x = input.deltaX;
        var y = input.deltaY;

        // lock to axis?
        if (!(direction & options.direction)) {
            if (options.direction & DIRECTION_HORIZONTAL) {
                direction = (x === 0) ? DIRECTION_NONE : (x < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
                hasMoved = x != this.pX;
                distance = Math.abs(input.deltaX);
            } else {
                direction = (y === 0) ? DIRECTION_NONE : (y < 0) ? DIRECTION_UP : DIRECTION_DOWN;
                hasMoved = y != this.pY;
                distance = Math.abs(input.deltaY);
            }
        }
        input.direction = direction;
        return hasMoved && distance > options.threshold && direction & options.direction;
    },

    attrTest: function(input) {
        return AttrRecognizer.prototype.attrTest.call(this, input) &&
            (this.state & STATE_BEGAN || (!(this.state & STATE_BEGAN) && this.directionTest(input)));
    },

    emit: function(input) {

        this.pX = input.deltaX;
        this.pY = input.deltaY;

        var direction = directionStr(input.direction);

        if (direction) {
            input.additionalEvent = this.options.event + direction;
        }
        this._super.emit.call(this, input);
    }
});

/**
 * Pinch
 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
 * @constructor
 * @extends AttrRecognizer
 */
function PinchRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(PinchRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
        event: 'pinch',
        threshold: 0,
        pointers: 2
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
    },

    emit: function(input) {
        if (input.scale !== 1) {
            var inOut = input.scale < 1 ? 'in' : 'out';
            input.additionalEvent = this.options.event + inOut;
        }
        this._super.emit.call(this, input);
    }
});

/**
 * Press
 * Recognized when the pointer is down for x ms without any movement.
 * @constructor
 * @extends Recognizer
 */
function PressRecognizer() {
    Recognizer.apply(this, arguments);

    this._timer = null;
    this._input = null;
}

inherit(PressRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PressRecognizer
     */
    defaults: {
        event: 'press',
        pointers: 1,
        time: 251, // minimal time of the pointer to be pressed
        threshold: 9 // a minimal movement is ok, but keep it low
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_AUTO];
    },

    process: function(input) {
        var options = this.options;
        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTime = input.deltaTime > options.time;

        this._input = input;

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (!validMovement || !validPointers || (input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime)) {
            this.reset();
        } else if (input.eventType & INPUT_START) {
            this.reset();
            this._timer = setTimeoutContext(function() {
                this.state = STATE_RECOGNIZED;
                this.tryEmit();
            }, options.time, this);
        } else if (input.eventType & INPUT_END) {
            return STATE_RECOGNIZED;
        }
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function(input) {
        if (this.state !== STATE_RECOGNIZED) {
            return;
        }

        if (input && (input.eventType & INPUT_END)) {
            this.manager.emit(this.options.event + 'up', input);
        } else {
            this._input.timeStamp = now();
            this.manager.emit(this.options.event, this._input);
        }
    }
});

/**
 * Rotate
 * Recognized when two or more pointer are moving in a circular motion.
 * @constructor
 * @extends AttrRecognizer
 */
function RotateRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(RotateRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof RotateRecognizer
     */
    defaults: {
        event: 'rotate',
        threshold: 0,
        pointers: 2
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
    }
});

/**
 * Swipe
 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function SwipeRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(SwipeRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof SwipeRecognizer
     */
    defaults: {
        event: 'swipe',
        threshold: 10,
        velocity: 0.3,
        direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
        pointers: 1
    },

    getTouchAction: function() {
        return PanRecognizer.prototype.getTouchAction.call(this);
    },

    attrTest: function(input) {
        var direction = this.options.direction;
        var velocity;

        if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
            velocity = input.overallVelocity;
        } else if (direction & DIRECTION_HORIZONTAL) {
            velocity = input.overallVelocityX;
        } else if (direction & DIRECTION_VERTICAL) {
            velocity = input.overallVelocityY;
        }

        return this._super.attrTest.call(this, input) &&
            direction & input.offsetDirection &&
            input.distance > this.options.threshold &&
            input.maxPointers == this.options.pointers &&
            abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
    },

    emit: function(input) {
        var direction = directionStr(input.offsetDirection);
        if (direction) {
            this.manager.emit(this.options.event + direction, input);
        }

        this.manager.emit(this.options.event, input);
    }
});

/**
 * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
 * a single tap.
 *
 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
 * multi-taps being recognized.
 * @constructor
 * @extends Recognizer
 */
function TapRecognizer() {
    Recognizer.apply(this, arguments);

    // previous time and center,
    // used for tap counting
    this.pTime = false;
    this.pCenter = false;

    this._timer = null;
    this._input = null;
    this.count = 0;
}

inherit(TapRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
        event: 'tap',
        pointers: 1,
        taps: 1,
        interval: 300, // max time between the multi-tap taps
        time: 250, // max time of the pointer to be down (like finger on the screen)
        threshold: 9, // a minimal movement is ok, but keep it low
        posThreshold: 10 // a multi-tap can be a bit off the initial position
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_MANIPULATION];
    },

    process: function(input) {
        var options = this.options;

        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTouchTime = input.deltaTime < options.time;

        this.reset();

        if ((input.eventType & INPUT_START) && (this.count === 0)) {
            return this.failTimeout();
        }

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (validMovement && validTouchTime && validPointers) {
            if (input.eventType != INPUT_END) {
                return this.failTimeout();
            }

            var validInterval = this.pTime ? (input.timeStamp - this.pTime < options.interval) : true;
            var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;

            this.pTime = input.timeStamp;
            this.pCenter = input.center;

            if (!validMultiTap || !validInterval) {
                this.count = 1;
            } else {
                this.count += 1;
            }

            this._input = input;

            // if tap count matches we have recognized it,
            // else it has began recognizing...
            var tapCount = this.count % options.taps;
            if (tapCount === 0) {
                // no failing requirements, immediately trigger the tap event
                // or wait as long as the multitap interval to trigger
                if (!this.hasRequireFailures()) {
                    return STATE_RECOGNIZED;
                } else {
                    this._timer = setTimeoutContext(function() {
                        this.state = STATE_RECOGNIZED;
                        this.tryEmit();
                    }, options.interval, this);
                    return STATE_BEGAN;
                }
            }
        }
        return STATE_FAILED;
    },

    failTimeout: function() {
        this._timer = setTimeoutContext(function() {
            this.state = STATE_FAILED;
        }, this.options.interval, this);
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function() {
        if (this.state == STATE_RECOGNIZED) {
            this._input.tapCount = this.count;
            this.manager.emit(this.options.event, this._input);
        }
    }
});

/**
 * Simple way to create a manager with a default set of recognizers.
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Hammer(element, options) {
    options = options || {};
    options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
    return new Manager(element, options);
}

/**
 * @const {string}
 */
Hammer.VERSION = '2.0.7';

/**
 * default settings
 * @namespace
 */
Hammer.defaults = {
    /**
     * set if DOM events are being triggered.
     * But this is slower and unused by simple implementations, so disabled by default.
     * @type {Boolean}
     * @default false
     */
    domEvents: false,

    /**
     * The value for the touchAction property/fallback.
     * When set to `compute` it will magically set the correct value based on the added recognizers.
     * @type {String}
     * @default compute
     */
    touchAction: TOUCH_ACTION_COMPUTE,

    /**
     * @type {Boolean}
     * @default true
     */
    enable: true,

    /**
     * EXPERIMENTAL FEATURE -- can be removed/changed
     * Change the parent input target element.
     * If Null, then it is being set the to main element.
     * @type {Null|EventTarget}
     * @default null
     */
    inputTarget: null,

    /**
     * force an input class
     * @type {Null|Function}
     * @default null
     */
    inputClass: null,

    /**
     * Default recognizer setup when calling `Hammer()`
     * When creating a new Manager these will be skipped.
     * @type {Array}
     */
    preset: [
        // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
        [RotateRecognizer, {enable: false}],
        [PinchRecognizer, {enable: false}, ['rotate']],
        [SwipeRecognizer, {direction: DIRECTION_HORIZONTAL}],
        [PanRecognizer, {direction: DIRECTION_HORIZONTAL}, ['swipe']],
        [TapRecognizer],
        [TapRecognizer, {event: 'doubletap', taps: 2}, ['tap']],
        [PressRecognizer]
    ],

    /**
     * Some CSS properties can be used to improve the working of Hammer.
     * Add them to this method and they will be set when creating a new Manager.
     * @namespace
     */
    cssProps: {
        /**
         * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userSelect: 'none',

        /**
         * Disable the Windows Phone grippers when pressing an element.
         * @type {String}
         * @default 'none'
         */
        touchSelect: 'none',

        /**
         * Disables the default callout shown when you touch and hold a touch target.
         * On iOS, when you touch and hold a touch target such as a link, Safari displays
         * a callout containing information about the link. This property allows you to disable that callout.
         * @type {String}
         * @default 'none'
         */
        touchCallout: 'none',

        /**
         * Specifies whether zooming is enabled. Used by IE10>
         * @type {String}
         * @default 'none'
         */
        contentZooming: 'none',

        /**
         * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userDrag: 'none',

        /**
         * Overrides the highlight color shown when the user taps a link or a JavaScript
         * clickable element in iOS. This property obeys the alpha value, if specified.
         * @type {String}
         * @default 'rgba(0,0,0,0)'
         */
        tapHighlightColor: 'rgba(0,0,0,0)'
    }
};

var STOP = 1;
var FORCED_STOP = 2;

/**
 * Manager
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Manager(element, options) {
    this.options = assign({}, Hammer.defaults, options || {});

    this.options.inputTarget = this.options.inputTarget || element;

    this.handlers = {};
    this.session = {};
    this.recognizers = [];
    this.oldCssProps = {};

    this.element = element;
    this.input = createInputInstance(this);
    this.touchAction = new TouchAction(this, this.options.touchAction);

    toggleCssProps(this, true);

    each(this.options.recognizers, function(item) {
        var recognizer = this.add(new (item[0])(item[1]));
        item[2] && recognizer.recognizeWith(item[2]);
        item[3] && recognizer.requireFailure(item[3]);
    }, this);
}

Manager.prototype = {
    /**
     * set options
     * @param {Object} options
     * @returns {Manager}
     */
    set: function(options) {
        assign(this.options, options);

        // Options that need a little more setup
        if (options.touchAction) {
            this.touchAction.update();
        }
        if (options.inputTarget) {
            // Clean up existing event listeners and reinitialize
            this.input.destroy();
            this.input.target = options.inputTarget;
            this.input.init();
        }
        return this;
    },

    /**
     * stop recognizing for this session.
     * This session will be discarded, when a new [input]start event is fired.
     * When forced, the recognizer cycle is stopped immediately.
     * @param {Boolean} [force]
     */
    stop: function(force) {
        this.session.stopped = force ? FORCED_STOP : STOP;
    },

    /**
     * run the recognizers!
     * called by the inputHandler function on every movement of the pointers (touches)
     * it walks through all the recognizers and tries to detect the gesture that is being made
     * @param {Object} inputData
     */
    recognize: function(inputData) {
        var session = this.session;
        if (session.stopped) {
            return;
        }

        // run the touch-action polyfill
        this.touchAction.preventDefaults(inputData);

        var recognizer;
        var recognizers = this.recognizers;

        // this holds the recognizer that is being recognized.
        // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
        // if no recognizer is detecting a thing, it is set to `null`
        var curRecognizer = session.curRecognizer;

        // reset when the last recognizer is recognized
        // or when we're in a new session
        if (!curRecognizer || (curRecognizer && curRecognizer.state & STATE_RECOGNIZED)) {
            curRecognizer = session.curRecognizer = null;
        }

        var i = 0;
        while (i < recognizers.length) {
            recognizer = recognizers[i];

            // find out if we are allowed try to recognize the input for this one.
            // 1.   allow if the session is NOT forced stopped (see the .stop() method)
            // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
            //      that is being recognized.
            // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
            //      this can be setup with the `recognizeWith()` method on the recognizer.
            if (session.stopped !== FORCED_STOP && ( // 1
                    !curRecognizer || recognizer == curRecognizer || // 2
                    recognizer.canRecognizeWith(curRecognizer))) { // 3
                recognizer.recognize(inputData);
            } else {
                recognizer.reset();
            }

            // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
            // current active recognizer. but only if we don't already have an active recognizer
            if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
                curRecognizer = session.curRecognizer = recognizer;
            }
            i++;
        }
    },

    /**
     * get a recognizer by its event name.
     * @param {Recognizer|String} recognizer
     * @returns {Recognizer|Null}
     */
    get: function(recognizer) {
        if (recognizer instanceof Recognizer) {
            return recognizer;
        }

        var recognizers = this.recognizers;
        for (var i = 0; i < recognizers.length; i++) {
            if (recognizers[i].options.event == recognizer) {
                return recognizers[i];
            }
        }
        return null;
    },

    /**
     * add a recognizer to the manager
     * existing recognizers with the same event name will be removed
     * @param {Recognizer} recognizer
     * @returns {Recognizer|Manager}
     */
    add: function(recognizer) {
        if (invokeArrayArg(recognizer, 'add', this)) {
            return this;
        }

        // remove existing
        var existing = this.get(recognizer.options.event);
        if (existing) {
            this.remove(existing);
        }

        this.recognizers.push(recognizer);
        recognizer.manager = this;

        this.touchAction.update();
        return recognizer;
    },

    /**
     * remove a recognizer by name or instance
     * @param {Recognizer|String} recognizer
     * @returns {Manager}
     */
    remove: function(recognizer) {
        if (invokeArrayArg(recognizer, 'remove', this)) {
            return this;
        }

        recognizer = this.get(recognizer);

        // let's make sure this recognizer exists
        if (recognizer) {
            var recognizers = this.recognizers;
            var index = inArray(recognizers, recognizer);

            if (index !== -1) {
                recognizers.splice(index, 1);
                this.touchAction.update();
            }
        }

        return this;
    },

    /**
     * bind event
     * @param {String} events
     * @param {Function} handler
     * @returns {EventEmitter} this
     */
    on: function(events, handler) {
        if (events === undefined) {
            return;
        }
        if (handler === undefined) {
            return;
        }

        var handlers = this.handlers;
        each(splitStr(events), function(event) {
            handlers[event] = handlers[event] || [];
            handlers[event].push(handler);
        });
        return this;
    },

    /**
     * unbind event, leave emit blank to remove all handlers
     * @param {String} events
     * @param {Function} [handler]
     * @returns {EventEmitter} this
     */
    off: function(events, handler) {
        if (events === undefined) {
            return;
        }

        var handlers = this.handlers;
        each(splitStr(events), function(event) {
            if (!handler) {
                delete handlers[event];
            } else {
                handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
            }
        });
        return this;
    },

    /**
     * emit event to the listeners
     * @param {String} event
     * @param {Object} data
     */
    emit: function(event, data) {
        // we also want to trigger dom events
        if (this.options.domEvents) {
            triggerDomEvent(event, data);
        }

        // no handlers, so skip it all
        var handlers = this.handlers[event] && this.handlers[event].slice();
        if (!handlers || !handlers.length) {
            return;
        }

        data.type = event;
        data.preventDefault = function() {
            data.srcEvent.preventDefault();
        };

        var i = 0;
        while (i < handlers.length) {
            handlers[i](data);
            i++;
        }
    },

    /**
     * destroy the manager and unbinds all events
     * it doesn't unbind dom events, that is the user own responsibility
     */
    destroy: function() {
        this.element && toggleCssProps(this, false);

        this.handlers = {};
        this.session = {};
        this.input.destroy();
        this.element = null;
    }
};

/**
 * add/remove the css properties as defined in manager.options.cssProps
 * @param {Manager} manager
 * @param {Boolean} add
 */
function toggleCssProps(manager, add) {
    var element = manager.element;
    if (!element.style) {
        return;
    }
    var prop;
    each(manager.options.cssProps, function(value, name) {
        prop = prefixed(element.style, name);
        if (add) {
            manager.oldCssProps[prop] = element.style[prop];
            element.style[prop] = value;
        } else {
            element.style[prop] = manager.oldCssProps[prop] || '';
        }
    });
    if (!add) {
        manager.oldCssProps = {};
    }
}

/**
 * trigger dom event
 * @param {String} event
 * @param {Object} data
 */
function triggerDomEvent(event, data) {
    var gestureEvent = document.createEvent('Event');
    gestureEvent.initEvent(event, true, true);
    gestureEvent.gesture = data;
    data.target.dispatchEvent(gestureEvent);
}

assign(Hammer, {
    INPUT_START: INPUT_START,
    INPUT_MOVE: INPUT_MOVE,
    INPUT_END: INPUT_END,
    INPUT_CANCEL: INPUT_CANCEL,

    STATE_POSSIBLE: STATE_POSSIBLE,
    STATE_BEGAN: STATE_BEGAN,
    STATE_CHANGED: STATE_CHANGED,
    STATE_ENDED: STATE_ENDED,
    STATE_RECOGNIZED: STATE_RECOGNIZED,
    STATE_CANCELLED: STATE_CANCELLED,
    STATE_FAILED: STATE_FAILED,

    DIRECTION_NONE: DIRECTION_NONE,
    DIRECTION_LEFT: DIRECTION_LEFT,
    DIRECTION_RIGHT: DIRECTION_RIGHT,
    DIRECTION_UP: DIRECTION_UP,
    DIRECTION_DOWN: DIRECTION_DOWN,
    DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
    DIRECTION_VERTICAL: DIRECTION_VERTICAL,
    DIRECTION_ALL: DIRECTION_ALL,

    Manager: Manager,
    Input: Input,
    TouchAction: TouchAction,

    TouchInput: TouchInput,
    MouseInput: MouseInput,
    PointerEventInput: PointerEventInput,
    TouchMouseInput: TouchMouseInput,
    SingleTouchInput: SingleTouchInput,

    Recognizer: Recognizer,
    AttrRecognizer: AttrRecognizer,
    Tap: TapRecognizer,
    Pan: PanRecognizer,
    Swipe: SwipeRecognizer,
    Pinch: PinchRecognizer,
    Rotate: RotateRecognizer,
    Press: PressRecognizer,

    on: addEventListeners,
    off: removeEventListeners,
    each: each,
    merge: merge,
    extend: extend,
    assign: assign,
    inherit: inherit,
    bindFn: bindFn,
    prefixed: prefixed
});

// this prevents errors when Hammer is loaded in the presence of an AMD
//  style loader but by script tag, not by the loader.
var freeGlobal = (typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : {})); // jshint ignore:line
freeGlobal.Hammer = Hammer;

if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
        return Hammer;
    }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {}

})(window, document, 'Hammer');


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-2.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-2.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./web_src/js/components/RepoContributors.vue?vue&type=style&index=0&id=691b21a1&scoped=true&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-2.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-2.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./web_src/js/components/RepoContributors.vue?vue&type=style&index=0&id=691b21a1&scoped=true&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./web_src/js/components/RepoContributors.vue":
/*!****************************************************!*\
  !*** ./web_src/js/components/RepoContributors.vue ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RepoContributors_vue_vue_type_template_id_691b21a1_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RepoContributors.vue?vue&type=template&id=691b21a1&scoped=true */ "./web_src/js/components/RepoContributors.vue?vue&type=template&id=691b21a1&scoped=true");
/* harmony import */ var _RepoContributors_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RepoContributors.vue?vue&type=script&lang=js */ "./web_src/js/components/RepoContributors.vue?vue&type=script&lang=js");
/* harmony import */ var _RepoContributors_vue_vue_type_style_index_0_id_691b21a1_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RepoContributors.vue?vue&type=style&index=0&id=691b21a1&scoped=true&lang=css */ "./web_src/js/components/RepoContributors.vue?vue&type=style&index=0&id=691b21a1&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_RepoContributors_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_RepoContributors_vue_vue_type_template_id_691b21a1_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-691b21a1"],['__file',"web_src/js/components/RepoContributors.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ __webpack_exports__["default"] = (__exports__);

/***/ }),

/***/ "./web_src/js/components/RepoContributors.vue?vue&type=script&lang=js":
/*!****************************************************************************!*\
  !*** ./web_src/js/components/RepoContributors.vue?vue&type=script&lang=js ***!
  \****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* reexport safe */ _node_modules_esbuild_loader_dist_index_cjs_clonedRuleSet_1_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_RepoContributors_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]; }
/* harmony export */ });
/* harmony import */ var _node_modules_esbuild_loader_dist_index_cjs_clonedRuleSet_1_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_RepoContributors_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/esbuild-loader/dist/index.cjs??clonedRuleSet-1.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0]!./RepoContributors.vue?vue&type=script&lang=js */ "./node_modules/esbuild-loader/dist/index.cjs??clonedRuleSet-1.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./web_src/js/components/RepoContributors.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./web_src/js/components/RepoContributors.vue?vue&type=style&index=0&id=691b21a1&scoped=true&lang=css":
/*!************************************************************************************************************!*\
  !*** ./web_src/js/components/RepoContributors.vue?vue&type=style&index=0&id=691b21a1&scoped=true&lang=css ***!
  \************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_2_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_2_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_RepoContributors_vue_vue_type_style_index_0_id_691b21a1_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-2.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-2.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0]!./RepoContributors.vue?vue&type=style&index=0&id=691b21a1&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-2.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-2.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./web_src/js/components/RepoContributors.vue?vue&type=style&index=0&id=691b21a1&scoped=true&lang=css");


/***/ }),

/***/ "./web_src/js/components/RepoContributors.vue?vue&type=template&id=691b21a1&scoped=true":
/*!**********************************************************************************************!*\
  !*** ./web_src/js/components/RepoContributors.vue?vue&type=template&id=691b21a1&scoped=true ***!
  \**********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: function() { return /* reexport safe */ _node_modules_esbuild_loader_dist_index_cjs_clonedRuleSet_1_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_RepoContributors_vue_vue_type_template_id_691b21a1_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render; }
/* harmony export */ });
/* harmony import */ var _node_modules_esbuild_loader_dist_index_cjs_clonedRuleSet_1_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_RepoContributors_vue_vue_type_template_id_691b21a1_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/esbuild-loader/dist/index.cjs??clonedRuleSet-1.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0]!./RepoContributors.vue?vue&type=template&id=691b21a1&scoped=true */ "./node_modules/esbuild-loader/dist/index.cjs??clonedRuleSet-1.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./web_src/js/components/RepoContributors.vue?vue&type=template&id=691b21a1&scoped=true");


/***/ })

}]);
//# sourceMappingURL=contributors-graph.f93f6d89.js.cb69df64.map