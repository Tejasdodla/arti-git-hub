"use strict";
(self["webpackChunkforgejo"] = self["webpackChunkforgejo"] || []).push([["colorpicker"],{

/***/ "./node_modules/vanilla-colorful/hex-color-picker.js":
/*!***********************************************************!*\
  !*** ./node_modules/vanilla-colorful/hex-color-picker.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HexColorPicker: function() { return /* binding */ HexColorPicker; }
/* harmony export */ });
/* harmony import */ var _lib_entrypoints_hex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/entrypoints/hex.js */ "./node_modules/vanilla-colorful/lib/entrypoints/hex.js");

/**
 * A color picker custom element that uses HEX format.
 *
 * @element hex-color-picker
 *
 * @prop {string} color - Selected color in HEX format.
 * @attr {string} color - Selected color in HEX format.
 *
 * @fires color-changed - Event fired when color property changes.
 *
 * @csspart hue - A hue selector container.
 * @csspart saturation - A saturation selector container
 * @csspart hue-pointer - A hue pointer element.
 * @csspart saturation-pointer - A saturation pointer element.
 */
class HexColorPicker extends _lib_entrypoints_hex_js__WEBPACK_IMPORTED_MODULE_0__.HexBase {
}
customElements.define('hex-color-picker', HexColorPicker);
//# sourceMappingURL=hex-color-picker.js.map

/***/ }),

/***/ "./node_modules/vanilla-colorful/lib/components/color-picker.js":
/*!**********************************************************************!*\
  !*** ./node_modules/vanilla-colorful/lib/components/color-picker.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $css: function() { return /* binding */ $css; },
/* harmony export */   $sliders: function() { return /* binding */ $sliders; },
/* harmony export */   ColorPicker: function() { return /* binding */ ColorPicker; }
/* harmony export */ });
/* harmony import */ var _utils_compare_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/compare.js */ "./node_modules/vanilla-colorful/lib/utils/compare.js");
/* harmony import */ var _utils_dom_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/dom.js */ "./node_modules/vanilla-colorful/lib/utils/dom.js");
/* harmony import */ var _hue_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./hue.js */ "./node_modules/vanilla-colorful/lib/components/hue.js");
/* harmony import */ var _saturation_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./saturation.js */ "./node_modules/vanilla-colorful/lib/components/saturation.js");
/* harmony import */ var _styles_color_picker_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/color-picker.js */ "./node_modules/vanilla-colorful/lib/styles/color-picker.js");
/* harmony import */ var _styles_hue_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/hue.js */ "./node_modules/vanilla-colorful/lib/styles/hue.js");
/* harmony import */ var _styles_saturation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/saturation.js */ "./node_modules/vanilla-colorful/lib/styles/saturation.js");







const $isSame = Symbol('same');
const $color = Symbol('color');
const $hsva = Symbol('hsva');
const $update = Symbol('update');
const $parts = Symbol('parts');
const $css = Symbol('css');
const $sliders = Symbol('sliders');
class ColorPicker extends HTMLElement {
    static get observedAttributes() {
        return ['color'];
    }
    get [$css]() {
        return [_styles_color_picker_js__WEBPACK_IMPORTED_MODULE_0__["default"], _styles_hue_js__WEBPACK_IMPORTED_MODULE_1__["default"], _styles_saturation_js__WEBPACK_IMPORTED_MODULE_2__["default"]];
    }
    get [$sliders]() {
        return [_saturation_js__WEBPACK_IMPORTED_MODULE_3__.Saturation, _hue_js__WEBPACK_IMPORTED_MODULE_4__.Hue];
    }
    get color() {
        return this[$color];
    }
    set color(newColor) {
        if (!this[$isSame](newColor)) {
            const newHsva = this.colorModel.toHsva(newColor);
            this[$update](newHsva);
            this[$color] = newColor;
        }
    }
    constructor() {
        super();
        const template = (0,_utils_dom_js__WEBPACK_IMPORTED_MODULE_5__.tpl)(`<style>${this[$css].join('')}</style>`);
        const root = this.attachShadow({ mode: 'open' });
        root.appendChild(template.content.cloneNode(true));
        root.addEventListener('move', this);
        this[$parts] = this[$sliders].map((slider) => new slider(root));
    }
    connectedCallback() {
        // A user may set a property on an _instance_ of an element,
        // before its prototype has been connected to this class.
        // If so, we need to run it through the proper class setter.
        if (this.hasOwnProperty('color')) {
            const value = this.color;
            delete this['color'];
            this.color = value;
        }
        else if (!this.color) {
            this.color = this.colorModel.defaultColor;
        }
    }
    attributeChangedCallback(_attr, _oldVal, newVal) {
        const color = this.colorModel.fromAttr(newVal);
        if (!this[$isSame](color)) {
            this.color = color;
        }
    }
    handleEvent(event) {
        // Merge the current HSV color object with updated params.
        const oldHsva = this[$hsva];
        const newHsva = { ...oldHsva, ...event.detail };
        this[$update](newHsva);
        let newColor;
        if (!(0,_utils_compare_js__WEBPACK_IMPORTED_MODULE_6__.equalColorObjects)(newHsva, oldHsva) &&
            !this[$isSame]((newColor = this.colorModel.fromHsva(newHsva)))) {
            this[$color] = newColor;
            (0,_utils_dom_js__WEBPACK_IMPORTED_MODULE_5__.fire)(this, 'color-changed', { value: newColor });
        }
    }
    [$isSame](color) {
        return this.color && this.colorModel.equal(color, this.color);
    }
    [$update](hsva) {
        this[$hsva] = hsva;
        this[$parts].forEach((part) => part.update(hsva));
    }
}
//# sourceMappingURL=color-picker.js.map

/***/ }),

/***/ "./node_modules/vanilla-colorful/lib/components/hue.js":
/*!*************************************************************!*\
  !*** ./node_modules/vanilla-colorful/lib/components/hue.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Hue: function() { return /* binding */ Hue; }
/* harmony export */ });
/* harmony import */ var _slider_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider.js */ "./node_modules/vanilla-colorful/lib/components/slider.js");
/* harmony import */ var _utils_convert_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/convert.js */ "./node_modules/vanilla-colorful/lib/utils/convert.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/vanilla-colorful/lib/utils/math.js");



class Hue extends _slider_js__WEBPACK_IMPORTED_MODULE_0__.Slider {
    constructor(root) {
        super(root, 'hue', 'aria-label="Hue" aria-valuemin="0" aria-valuemax="360"', false);
    }
    update({ h }) {
        this.h = h;
        this.style([
            {
                left: `${(h / 360) * 100}%`,
                color: (0,_utils_convert_js__WEBPACK_IMPORTED_MODULE_1__.hsvaToHslString)({ h, s: 100, v: 100, a: 1 })
            }
        ]);
        this.el.setAttribute('aria-valuenow', `${(0,_utils_math_js__WEBPACK_IMPORTED_MODULE_2__.round)(h)}`);
    }
    getMove(offset, key) {
        // Hue measured in degrees of the color circle ranging from 0 to 360
        return { h: key ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_2__.clamp)(this.h + offset.x * 360, 0, 360) : 360 * offset.x };
    }
}
//# sourceMappingURL=hue.js.map

/***/ }),

/***/ "./node_modules/vanilla-colorful/lib/components/saturation.js":
/*!********************************************************************!*\
  !*** ./node_modules/vanilla-colorful/lib/components/saturation.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Saturation: function() { return /* binding */ Saturation; }
/* harmony export */ });
/* harmony import */ var _slider_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider.js */ "./node_modules/vanilla-colorful/lib/components/slider.js");
/* harmony import */ var _utils_convert_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/convert.js */ "./node_modules/vanilla-colorful/lib/utils/convert.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/vanilla-colorful/lib/utils/math.js");



class Saturation extends _slider_js__WEBPACK_IMPORTED_MODULE_0__.Slider {
    constructor(root) {
        super(root, 'saturation', 'aria-label="Color"', true);
    }
    update(hsva) {
        this.hsva = hsva;
        this.style([
            {
                top: `${100 - hsva.v}%`,
                left: `${hsva.s}%`,
                color: (0,_utils_convert_js__WEBPACK_IMPORTED_MODULE_1__.hsvaToHslString)(hsva)
            },
            {
                'background-color': (0,_utils_convert_js__WEBPACK_IMPORTED_MODULE_1__.hsvaToHslString)({ h: hsva.h, s: 100, v: 100, a: 1 })
            }
        ]);
        this.el.setAttribute('aria-valuetext', `Saturation ${(0,_utils_math_js__WEBPACK_IMPORTED_MODULE_2__.round)(hsva.s)}%, Brightness ${(0,_utils_math_js__WEBPACK_IMPORTED_MODULE_2__.round)(hsva.v)}%`);
    }
    getMove(offset, key) {
        // Saturation and brightness always fit into [0, 100] range
        return {
            s: key ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_2__.clamp)(this.hsva.s + offset.x * 100, 0, 100) : offset.x * 100,
            v: key ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_2__.clamp)(this.hsva.v - offset.y * 100, 0, 100) : Math.round(100 - offset.y * 100)
        };
    }
}
//# sourceMappingURL=saturation.js.map

/***/ }),

/***/ "./node_modules/vanilla-colorful/lib/components/slider.js":
/*!****************************************************************!*\
  !*** ./node_modules/vanilla-colorful/lib/components/slider.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Slider: function() { return /* binding */ Slider; }
/* harmony export */ });
/* harmony import */ var _utils_dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/dom.js */ "./node_modules/vanilla-colorful/lib/utils/dom.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/vanilla-colorful/lib/utils/math.js");


let hasTouched = false;
// Check if an event was triggered by touch
const isTouch = (e) => 'touches' in e;
// Prevent mobile browsers from handling mouse events (conflicting with touch ones).
// If we detected a touch interaction before, we prefer reacting to touch events only.
const isValid = (event) => {
    if (hasTouched && !isTouch(event))
        return false;
    if (!hasTouched)
        hasTouched = isTouch(event);
    return true;
};
const pointerMove = (target, event) => {
    const pointer = isTouch(event) ? event.touches[0] : event;
    const rect = target.el.getBoundingClientRect();
    (0,_utils_dom_js__WEBPACK_IMPORTED_MODULE_0__.fire)(target.el, 'move', target.getMove({
        x: (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_1__.clamp)((pointer.pageX - (rect.left + window.pageXOffset)) / rect.width),
        y: (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_1__.clamp)((pointer.pageY - (rect.top + window.pageYOffset)) / rect.height)
    }));
};
const keyMove = (target, event) => {
    // We use `keyCode` instead of `key` to reduce the size of the library.
    const keyCode = event.keyCode;
    // Ignore all keys except arrow ones, Page Up, Page Down, Home and End.
    if (keyCode > 40 || (target.xy && keyCode < 37) || keyCode < 33)
        return;
    // Do not scroll page by keys when color picker element has focus.
    event.preventDefault();
    // Send relative offset to the parent component.
    (0,_utils_dom_js__WEBPACK_IMPORTED_MODULE_0__.fire)(target.el, 'move', target.getMove({
        x: keyCode === 39 // Arrow Right
            ? 0.01
            : keyCode === 37 // Arrow Left
                ? -0.01
                : keyCode === 34 // Page Down
                    ? 0.05
                    : keyCode === 33 // Page Up
                        ? -0.05
                        : keyCode === 35 // End
                            ? 1
                            : keyCode === 36 // Home
                                ? -1
                                : 0,
        y: keyCode === 40 // Arrow down
            ? 0.01
            : keyCode === 38 // Arrow Up
                ? -0.01
                : 0
    }, true));
};
class Slider {
    constructor(root, part, aria, xy) {
        const template = (0,_utils_dom_js__WEBPACK_IMPORTED_MODULE_0__.tpl)(`<div role="slider" tabindex="0" part="${part}" ${aria}><div part="${part}-pointer"></div></div>`);
        root.appendChild(template.content.cloneNode(true));
        const el = root.querySelector(`[part=${part}]`);
        el.addEventListener('mousedown', this);
        el.addEventListener('touchstart', this);
        el.addEventListener('keydown', this);
        this.el = el;
        this.xy = xy;
        this.nodes = [el.firstChild, el];
    }
    set dragging(state) {
        const toggleEvent = state ? document.addEventListener : document.removeEventListener;
        toggleEvent(hasTouched ? 'touchmove' : 'mousemove', this);
        toggleEvent(hasTouched ? 'touchend' : 'mouseup', this);
    }
    handleEvent(event) {
        switch (event.type) {
            case 'mousedown':
            case 'touchstart':
                event.preventDefault();
                // event.button is 0 in mousedown for left button activation
                if (!isValid(event) || (!hasTouched && event.button != 0))
                    return;
                this.el.focus();
                pointerMove(this, event);
                this.dragging = true;
                break;
            case 'mousemove':
            case 'touchmove':
                event.preventDefault();
                pointerMove(this, event);
                break;
            case 'mouseup':
            case 'touchend':
                this.dragging = false;
                break;
            case 'keydown':
                keyMove(this, event);
                break;
        }
    }
    style(styles) {
        styles.forEach((style, i) => {
            for (const p in style) {
                this.nodes[i].style.setProperty(p, style[p]);
            }
        });
    }
}
//# sourceMappingURL=slider.js.map

/***/ }),

/***/ "./node_modules/vanilla-colorful/lib/entrypoints/hex.js":
/*!**************************************************************!*\
  !*** ./node_modules/vanilla-colorful/lib/entrypoints/hex.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HexBase: function() { return /* binding */ HexBase; }
/* harmony export */ });
/* harmony import */ var _components_color_picker_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/color-picker.js */ "./node_modules/vanilla-colorful/lib/components/color-picker.js");
/* harmony import */ var _utils_convert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/convert.js */ "./node_modules/vanilla-colorful/lib/utils/convert.js");
/* harmony import */ var _utils_compare_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/compare.js */ "./node_modules/vanilla-colorful/lib/utils/compare.js");



const colorModel = {
    defaultColor: '#000',
    toHsva: _utils_convert_js__WEBPACK_IMPORTED_MODULE_0__.hexToHsva,
    fromHsva: ({ h, s, v }) => (0,_utils_convert_js__WEBPACK_IMPORTED_MODULE_0__.hsvaToHex)({ h, s, v, a: 1 }),
    equal: _utils_compare_js__WEBPACK_IMPORTED_MODULE_1__.equalHex,
    fromAttr: (color) => color
};
class HexBase extends _components_color_picker_js__WEBPACK_IMPORTED_MODULE_2__.ColorPicker {
    get colorModel() {
        return colorModel;
    }
}
//# sourceMappingURL=hex.js.map

/***/ }),

/***/ "./node_modules/vanilla-colorful/lib/styles/color-picker.js":
/*!******************************************************************!*\
  !*** ./node_modules/vanilla-colorful/lib/styles/color-picker.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (`:host{display:flex;flex-direction:column;position:relative;width:200px;height:200px;user-select:none;-webkit-user-select:none;cursor:default}:host([hidden]){display:none!important}[role=slider]{position:relative;touch-action:none;user-select:none;-webkit-user-select:none;outline:0}[role=slider]:last-child{border-radius:0 0 8px 8px}[part$=pointer]{position:absolute;z-index:1;box-sizing:border-box;width:28px;height:28px;display:flex;place-content:center center;transform:translate(-50%,-50%);background-color:#fff;border:2px solid #fff;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,.2)}[part$=pointer]::after{content:"";width:100%;height:100%;border-radius:inherit;background-color:currentColor}[role=slider]:focus [part$=pointer]{transform:translate(-50%,-50%) scale(1.1)}`);
//# sourceMappingURL=color-picker.js.map

/***/ }),

/***/ "./node_modules/vanilla-colorful/lib/styles/hue.js":
/*!*********************************************************!*\
  !*** ./node_modules/vanilla-colorful/lib/styles/hue.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (`[part=hue]{flex:0 0 24px;background:linear-gradient(to right,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%)}[part=hue-pointer]{top:50%;z-index:2}`);
//# sourceMappingURL=hue.js.map

/***/ }),

/***/ "./node_modules/vanilla-colorful/lib/styles/saturation.js":
/*!****************************************************************!*\
  !*** ./node_modules/vanilla-colorful/lib/styles/saturation.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (`[part=saturation]{flex-grow:1;border-color:transparent;border-bottom:12px solid #000;border-radius:8px 8px 0 0;background-image:linear-gradient(to top,#000,transparent),linear-gradient(to right,#fff,rgba(255,255,255,0));box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}[part=saturation-pointer]{z-index:3}`);
//# sourceMappingURL=saturation.js.map

/***/ }),

/***/ "./node_modules/vanilla-colorful/lib/utils/compare.js":
/*!************************************************************!*\
  !*** ./node_modules/vanilla-colorful/lib/utils/compare.js ***!
  \************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   equalColorObjects: function() { return /* binding */ equalColorObjects; },
/* harmony export */   equalColorString: function() { return /* binding */ equalColorString; },
/* harmony export */   equalHex: function() { return /* binding */ equalHex; }
/* harmony export */ });
/* harmony import */ var _convert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./convert.js */ "./node_modules/vanilla-colorful/lib/utils/convert.js");

const equalColorObjects = (first, second) => {
    if (first === second)
        return true;
    for (const prop in first) {
        // The following allows for a type-safe calling of this function (first & second have to be HSL, HSV, or RGB)
        // with type-unsafe iterating over object keys. TS does not allow this without an index (`[key: string]: number`)
        // on an object to define how iteration is normally done. To ensure extra keys are not allowed on our types,
        // we must cast our object to unknown (as RGB demands `r` be a key, while `Record<string, x>` does not care if
        // there is or not), and then as a type TS can iterate over.
        if (first[prop] !==
            second[prop])
            return false;
    }
    return true;
};
const equalColorString = (first, second) => {
    return first.replace(/\s/g, '') === second.replace(/\s/g, '');
};
const equalHex = (first, second) => {
    if (first.toLowerCase() === second.toLowerCase())
        return true;
    // To compare colors like `#FFF` and `ffffff` we convert them into RGB objects
    return equalColorObjects((0,_convert_js__WEBPACK_IMPORTED_MODULE_0__.hexToRgba)(first), (0,_convert_js__WEBPACK_IMPORTED_MODULE_0__.hexToRgba)(second));
};
//# sourceMappingURL=compare.js.map

/***/ }),

/***/ "./node_modules/vanilla-colorful/lib/utils/convert.js":
/*!************************************************************!*\
  !*** ./node_modules/vanilla-colorful/lib/utils/convert.js ***!
  \************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hexToHsva: function() { return /* binding */ hexToHsva; },
/* harmony export */   hexToRgba: function() { return /* binding */ hexToRgba; },
/* harmony export */   hslStringToHsva: function() { return /* binding */ hslStringToHsva; },
/* harmony export */   hslaStringToHsva: function() { return /* binding */ hslaStringToHsva; },
/* harmony export */   hslaToHsl: function() { return /* binding */ hslaToHsl; },
/* harmony export */   hslaToHsva: function() { return /* binding */ hslaToHsva; },
/* harmony export */   hsvStringToHsva: function() { return /* binding */ hsvStringToHsva; },
/* harmony export */   hsvaStringToHsva: function() { return /* binding */ hsvaStringToHsva; },
/* harmony export */   hsvaToHex: function() { return /* binding */ hsvaToHex; },
/* harmony export */   hsvaToHslString: function() { return /* binding */ hsvaToHslString; },
/* harmony export */   hsvaToHsla: function() { return /* binding */ hsvaToHsla; },
/* harmony export */   hsvaToHslaString: function() { return /* binding */ hsvaToHslaString; },
/* harmony export */   hsvaToHsv: function() { return /* binding */ hsvaToHsv; },
/* harmony export */   hsvaToHsvString: function() { return /* binding */ hsvaToHsvString; },
/* harmony export */   hsvaToHsvaString: function() { return /* binding */ hsvaToHsvaString; },
/* harmony export */   hsvaToRgbString: function() { return /* binding */ hsvaToRgbString; },
/* harmony export */   hsvaToRgba: function() { return /* binding */ hsvaToRgba; },
/* harmony export */   hsvaToRgbaString: function() { return /* binding */ hsvaToRgbaString; },
/* harmony export */   parseHue: function() { return /* binding */ parseHue; },
/* harmony export */   rgbStringToHsva: function() { return /* binding */ rgbStringToHsva; },
/* harmony export */   rgbaStringToHsva: function() { return /* binding */ rgbaStringToHsva; },
/* harmony export */   rgbaToHex: function() { return /* binding */ rgbaToHex; },
/* harmony export */   rgbaToHsva: function() { return /* binding */ rgbaToHsva; },
/* harmony export */   rgbaToRgb: function() { return /* binding */ rgbaToRgb; },
/* harmony export */   roundHsva: function() { return /* binding */ roundHsva; }
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/vanilla-colorful/lib/utils/math.js");

/**
 * Valid CSS <angle> units.
 * https://developer.mozilla.org/en-US/docs/Web/CSS/angle
 */
const angleUnits = {
    grad: 360 / 400,
    turn: 360,
    rad: 360 / (Math.PI * 2)
};
const hexToHsva = (hex) => rgbaToHsva(hexToRgba(hex));
const hexToRgba = (hex) => {
    if (hex[0] === '#')
        hex = hex.substring(1);
    if (hex.length < 6) {
        return {
            r: parseInt(hex[0] + hex[0], 16),
            g: parseInt(hex[1] + hex[1], 16),
            b: parseInt(hex[2] + hex[2], 16),
            a: hex.length === 4 ? (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(parseInt(hex[3] + hex[3], 16) / 255, 2) : 1
        };
    }
    return {
        r: parseInt(hex.substring(0, 2), 16),
        g: parseInt(hex.substring(2, 4), 16),
        b: parseInt(hex.substring(4, 6), 16),
        a: hex.length === 8 ? (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(parseInt(hex.substring(6, 8), 16) / 255, 2) : 1
    };
};
const parseHue = (value, unit = 'deg') => {
    return Number(value) * (angleUnits[unit] || 1);
};
const hslaStringToHsva = (hslString) => {
    const matcher = /hsla?\(?\s*(-?\d*\.?\d+)(deg|rad|grad|turn)?[,\s]+(-?\d*\.?\d+)%?[,\s]+(-?\d*\.?\d+)%?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i;
    const match = matcher.exec(hslString);
    if (!match)
        return { h: 0, s: 0, v: 0, a: 1 };
    return hslaToHsva({
        h: parseHue(match[1], match[2]),
        s: Number(match[3]),
        l: Number(match[4]),
        a: match[5] === undefined ? 1 : Number(match[5]) / (match[6] ? 100 : 1)
    });
};
const hslStringToHsva = hslaStringToHsva;
const hslaToHsva = ({ h, s, l, a }) => {
    s *= (l < 50 ? l : 100 - l) / 100;
    return {
        h: h,
        s: s > 0 ? ((2 * s) / (l + s)) * 100 : 0,
        v: l + s,
        a
    };
};
const hsvaToHex = (hsva) => rgbaToHex(hsvaToRgba(hsva));
const hsvaToHsla = ({ h, s, v, a }) => {
    const hh = ((200 - s) * v) / 100;
    return {
        h: (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(h),
        s: (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(hh > 0 && hh < 200 ? ((s * v) / 100 / (hh <= 100 ? hh : 200 - hh)) * 100 : 0),
        l: (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(hh / 2),
        a: (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(a, 2)
    };
};
const hsvaToHsvString = (hsva) => {
    const { h, s, v } = roundHsva(hsva);
    return `hsv(${h}, ${s}%, ${v}%)`;
};
const hsvaToHsvaString = (hsva) => {
    const { h, s, v, a } = roundHsva(hsva);
    return `hsva(${h}, ${s}%, ${v}%, ${a})`;
};
const hsvaToHslString = (hsva) => {
    const { h, s, l } = hsvaToHsla(hsva);
    return `hsl(${h}, ${s}%, ${l}%)`;
};
const hsvaToHslaString = (hsva) => {
    const { h, s, l, a } = hsvaToHsla(hsva);
    return `hsla(${h}, ${s}%, ${l}%, ${a})`;
};
const hsvaToRgba = ({ h, s, v, a }) => {
    h = (h / 360) * 6;
    s = s / 100;
    v = v / 100;
    const hh = Math.floor(h), b = v * (1 - s), c = v * (1 - (h - hh) * s), d = v * (1 - (1 - h + hh) * s), module = hh % 6;
    return {
        r: (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.round)([v, c, b, b, d, v][module] * 255),
        g: (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.round)([d, v, v, c, b, b][module] * 255),
        b: (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.round)([b, b, d, v, v, c][module] * 255),
        a: (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(a, 2)
    };
};
const hsvaToRgbString = (hsva) => {
    const { r, g, b } = hsvaToRgba(hsva);
    return `rgb(${r}, ${g}, ${b})`;
};
const hsvaToRgbaString = (hsva) => {
    const { r, g, b, a } = hsvaToRgba(hsva);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
};
const hsvaStringToHsva = (hsvString) => {
    const matcher = /hsva?\(?\s*(-?\d*\.?\d+)(deg|rad|grad|turn)?[,\s]+(-?\d*\.?\d+)%?[,\s]+(-?\d*\.?\d+)%?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i;
    const match = matcher.exec(hsvString);
    if (!match)
        return { h: 0, s: 0, v: 0, a: 1 };
    return roundHsva({
        h: parseHue(match[1], match[2]),
        s: Number(match[3]),
        v: Number(match[4]),
        a: match[5] === undefined ? 1 : Number(match[5]) / (match[6] ? 100 : 1)
    });
};
const hsvStringToHsva = hsvaStringToHsva;
const rgbaStringToHsva = (rgbaString) => {
    const matcher = /rgba?\(?\s*(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i;
    const match = matcher.exec(rgbaString);
    if (!match)
        return { h: 0, s: 0, v: 0, a: 1 };
    return rgbaToHsva({
        r: Number(match[1]) / (match[2] ? 100 / 255 : 1),
        g: Number(match[3]) / (match[4] ? 100 / 255 : 1),
        b: Number(match[5]) / (match[6] ? 100 / 255 : 1),
        a: match[7] === undefined ? 1 : Number(match[7]) / (match[8] ? 100 : 1)
    });
};
const rgbStringToHsva = rgbaStringToHsva;
const format = (number) => {
    const hex = number.toString(16);
    return hex.length < 2 ? '0' + hex : hex;
};
const rgbaToHex = ({ r, g, b, a }) => {
    const alphaHex = a < 1 ? format((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(a * 255)) : '';
    return '#' + format(r) + format(g) + format(b) + alphaHex;
};
const rgbaToHsva = ({ r, g, b, a }) => {
    const max = Math.max(r, g, b);
    const delta = max - Math.min(r, g, b);
    // prettier-ignore
    const hh = delta
        ? max === r
            ? (g - b) / delta
            : max === g
                ? 2 + (b - r) / delta
                : 4 + (r - g) / delta
        : 0;
    return {
        h: (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(60 * (hh < 0 ? hh + 6 : hh)),
        s: (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(max ? (delta / max) * 100 : 0),
        v: (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.round)((max / 255) * 100),
        a
    };
};
const roundHsva = (hsva) => ({
    h: (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(hsva.h),
    s: (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(hsva.s),
    v: (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(hsva.v),
    a: (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(hsva.a, 2)
});
const rgbaToRgb = ({ r, g, b }) => ({ r, g, b });
const hslaToHsl = ({ h, s, l }) => ({ h, s, l });
const hsvaToHsv = (hsva) => {
    const { h, s, v } = roundHsva(hsva);
    return { h, s, v };
};
//# sourceMappingURL=convert.js.map

/***/ }),

/***/ "./node_modules/vanilla-colorful/lib/utils/dom.js":
/*!********************************************************!*\
  !*** ./node_modules/vanilla-colorful/lib/utils/dom.js ***!
  \********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fire: function() { return /* binding */ fire; },
/* harmony export */   tpl: function() { return /* binding */ tpl; }
/* harmony export */ });
const cache = {};
const tpl = (html) => {
    let template = cache[html];
    if (!template) {
        template = document.createElement('template');
        template.innerHTML = html;
        cache[html] = template;
    }
    return template;
};
const fire = (target, type, detail) => {
    target.dispatchEvent(new CustomEvent(type, {
        bubbles: true,
        detail
    }));
};
//# sourceMappingURL=dom.js.map

/***/ }),

/***/ "./node_modules/vanilla-colorful/lib/utils/math.js":
/*!*********************************************************!*\
  !*** ./node_modules/vanilla-colorful/lib/utils/math.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clamp: function() { return /* binding */ clamp; },
/* harmony export */   round: function() { return /* binding */ round; }
/* harmony export */ });
// Clamps a value between an upper and lower bound.
// We use ternary operators because it makes the minified code
// 2 times shorter then `Math.min(Math.max(a,b),c)`
const clamp = (number, min = 0, max = 1) => {
    return number > max ? max : number < min ? min : number;
};
const round = (number, digits = 0, base = Math.pow(10, digits)) => {
    return Math.round(base * number) / base;
};
//# sourceMappingURL=math.js.map

/***/ }),

/***/ "./web_src/css/features/colorpicker.css":
/*!**********************************************!*\
  !*** ./web_src/css/features/colorpicker.css ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

}]);
//# sourceMappingURL=colorpicker.d28ccf68.js.8dbab859.map