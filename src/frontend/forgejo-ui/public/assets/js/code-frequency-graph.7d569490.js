(self["webpackChunkforgejo"] = self["webpackChunkforgejo"] || []).push([["code-frequency-graph"],{

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

/***/ "./node_modules/esbuild-loader/dist/index.cjs??clonedRuleSet-1.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./web_src/js/components/RepoCodeFrequency.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/esbuild-loader/dist/index.cjs??clonedRuleSet-1.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./web_src/js/components/RepoCodeFrequency.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _svg_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../svg.js */ "./web_src/js/svg.js");
/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! chart.js */ "./node_modules/chart.js/dist/chart.js");
/* harmony import */ var _modules_fetch_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/fetch.js */ "./web_src/js/modules/fetch.js");
/* harmony import */ var vue_chartjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vue-chartjs */ "./node_modules/vue-chartjs/dist/index.js");
/* harmony import */ var _utils_time_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/time.js */ "./web_src/js/utils/time.js");
/* harmony import */ var _utils_color_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/color.js */ "./web_src/js/utils/color.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils.js */ "./web_src/js/utils.js");
/* harmony import */ var chartjs_adapter_dayjs_4_dist_chartjs_adapter_dayjs_4_esm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm */ "./node_modules/chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm.js");








const { pageData } = window.config;
chart_js__WEBPACK_IMPORTED_MODULE_6__.Chart.defaults.color = _utils_color_js__WEBPACK_IMPORTED_MODULE_3__.chartJsColors.text;
chart_js__WEBPACK_IMPORTED_MODULE_6__.Chart.defaults.borderColor = _utils_color_js__WEBPACK_IMPORTED_MODULE_3__.chartJsColors.border;
chart_js__WEBPACK_IMPORTED_MODULE_6__.Chart.register(
  chart_js__WEBPACK_IMPORTED_MODULE_6__.TimeScale,
  chart_js__WEBPACK_IMPORTED_MODULE_6__.LinearScale,
  chart_js__WEBPACK_IMPORTED_MODULE_6__.Legend,
  chart_js__WEBPACK_IMPORTED_MODULE_6__.PointElement,
  chart_js__WEBPACK_IMPORTED_MODULE_6__.LineElement,
  chart_js__WEBPACK_IMPORTED_MODULE_6__.Filler
);
/* harmony default export */ __webpack_exports__["default"] = ({
  components: { ChartLine: vue_chartjs__WEBPACK_IMPORTED_MODULE_7__.Line, SvgIcon: _svg_js__WEBPACK_IMPORTED_MODULE_0__.SvgIcon },
  props: {
    locale: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    isLoading: false,
    errorText: "",
    repoLink: pageData.repoLink || [],
    data: []
  }),
  mounted() {
    this.fetchGraphData();
  },
  methods: {
    async fetchGraphData() {
      this.isLoading = true;
      try {
        let response;
        do {
          response = await (0,_modules_fetch_js__WEBPACK_IMPORTED_MODULE_1__.GET)(`${this.repoLink}/activity/code-frequency/data`);
          if (response.status === 202) {
            await (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.sleep)(1e3);
          }
        } while (response.status === 202);
        if (response.ok) {
          this.data = await response.json();
          const weekValues = Object.values(this.data);
          const start = weekValues[0].week;
          const end = (0,_utils_time_js__WEBPACK_IMPORTED_MODULE_2__.firstStartDateAfterDate)(/* @__PURE__ */ new Date());
          const startDays = (0,_utils_time_js__WEBPACK_IMPORTED_MODULE_2__.startDaysBetween)(start, end);
          this.data = (0,_utils_time_js__WEBPACK_IMPORTED_MODULE_2__.fillEmptyStartDaysWithZeroes)(startDays, this.data);
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
    toGraphData(data) {
      return {
        datasets: [
          {
            data: data.map((i) => ({ x: i.week, y: i.additions })),
            pointRadius: 0,
            pointHitRadius: 0,
            fill: true,
            label: "Additions",
            backgroundColor: _utils_color_js__WEBPACK_IMPORTED_MODULE_3__.chartJsColors["additions"],
            borderWidth: 0,
            tension: 0.3
          },
          {
            data: data.map((i) => ({ x: i.week, y: -i.deletions })),
            pointRadius: 0,
            pointHitRadius: 0,
            fill: true,
            label: "Deletions",
            backgroundColor: _utils_color_js__WEBPACK_IMPORTED_MODULE_3__.chartJsColors["deletions"],
            borderWidth: 0,
            tension: 0.3
          }
        ]
      };
    },
    getOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        animation: true,
        plugins: {
          legend: {
            display: true
          }
        },
        scales: {
          x: {
            type: "time",
            grid: {
              display: false
            },
            time: {
              minUnit: "month"
            },
            ticks: {
              maxRotation: 0,
              maxTicksLimit: 12
            }
          },
          y: {
            ticks: {
              maxTicksLimit: 6
            }
          }
        }
      };
    }
  }
});


/***/ }),

/***/ "./node_modules/esbuild-loader/dist/index.cjs??clonedRuleSet-1.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./web_src/js/components/RepoCodeFrequency.vue?vue&type=template&id=6ae6f1d4&scoped=true":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/esbuild-loader/dist/index.cjs??clonedRuleSet-1.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./web_src/js/components/RepoCodeFrequency.vue?vue&type=template&id=6ae6f1d4&scoped=true ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: function() { return /* binding */ render; }
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm-bundler.js");

const _hoisted_1 = { class: "ui header tw-flex tw-items-center tw-justify-between" };
const _hoisted_2 = { class: "tw-flex ui segment main-graph" };
const _hoisted_3 = {
  key: 0,
  class: "gt-tc tw-m-auto"
};
const _hoisted_4 = { key: 0 };
const _hoisted_5 = {
  key: 1,
  class: "text red"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_SvgIcon = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("SvgIcon");
  const _component_ChartLine = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("ChartLine");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", null, [
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(
      "div",
      _hoisted_1,
      (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.isLoading ? $props.locale.loadingTitle : _ctx.errorText ? $props.locale.loadingTitleFailed : `Code frequency over the history of ${_ctx.repoLink.slice(1)}`),
      1
      /* TEXT */
    ),
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [
      _ctx.isLoading || _ctx.errorText !== "" ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_3, [
        _ctx.isLoading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_4, [
          (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_SvgIcon, {
            name: "octicon-sync",
            class: "tw-mr-2 job-status-rotate"
          }),
          (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(
            " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.locale.loadingInfo),
            1
            /* TEXT */
          )
        ])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_5, [
          (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_SvgIcon, { name: "octicon-x-circle-fill" }),
          (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(
            " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.errorText),
            1
            /* TEXT */
          )
        ]))
      ])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true),
      _ctx.data.length !== 0 ? (0,vue__WEBPACK_IMPORTED_MODULE_0__.withMemo)(_ctx.data, () => ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_ChartLine, {
        key: 1,
        data: $options.toGraphData(_ctx.data),
        options: $options.getOptions()
      }, null, 8, ["data", "options"])), _cache, 0) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)
    ])
  ]);
}


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-2.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-2.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./web_src/js/components/RepoCodeFrequency.vue?vue&type=style&index=0&id=6ae6f1d4&scoped=true&lang=css":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-2.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-2.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./web_src/js/components/RepoCodeFrequency.vue?vue&type=style&index=0&id=6ae6f1d4&scoped=true&lang=css ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./web_src/js/components/RepoCodeFrequency.vue":
/*!*****************************************************!*\
  !*** ./web_src/js/components/RepoCodeFrequency.vue ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RepoCodeFrequency_vue_vue_type_template_id_6ae6f1d4_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RepoCodeFrequency.vue?vue&type=template&id=6ae6f1d4&scoped=true */ "./web_src/js/components/RepoCodeFrequency.vue?vue&type=template&id=6ae6f1d4&scoped=true");
/* harmony import */ var _RepoCodeFrequency_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RepoCodeFrequency.vue?vue&type=script&lang=js */ "./web_src/js/components/RepoCodeFrequency.vue?vue&type=script&lang=js");
/* harmony import */ var _RepoCodeFrequency_vue_vue_type_style_index_0_id_6ae6f1d4_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RepoCodeFrequency.vue?vue&type=style&index=0&id=6ae6f1d4&scoped=true&lang=css */ "./web_src/js/components/RepoCodeFrequency.vue?vue&type=style&index=0&id=6ae6f1d4&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_RepoCodeFrequency_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_RepoCodeFrequency_vue_vue_type_template_id_6ae6f1d4_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-6ae6f1d4"],['__file',"web_src/js/components/RepoCodeFrequency.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ __webpack_exports__["default"] = (__exports__);

/***/ }),

/***/ "./web_src/js/components/RepoCodeFrequency.vue?vue&type=script&lang=js":
/*!*****************************************************************************!*\
  !*** ./web_src/js/components/RepoCodeFrequency.vue?vue&type=script&lang=js ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* reexport safe */ _node_modules_esbuild_loader_dist_index_cjs_clonedRuleSet_1_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_RepoCodeFrequency_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]; }
/* harmony export */ });
/* harmony import */ var _node_modules_esbuild_loader_dist_index_cjs_clonedRuleSet_1_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_RepoCodeFrequency_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/esbuild-loader/dist/index.cjs??clonedRuleSet-1.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0]!./RepoCodeFrequency.vue?vue&type=script&lang=js */ "./node_modules/esbuild-loader/dist/index.cjs??clonedRuleSet-1.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./web_src/js/components/RepoCodeFrequency.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./web_src/js/components/RepoCodeFrequency.vue?vue&type=style&index=0&id=6ae6f1d4&scoped=true&lang=css":
/*!*************************************************************************************************************!*\
  !*** ./web_src/js/components/RepoCodeFrequency.vue?vue&type=style&index=0&id=6ae6f1d4&scoped=true&lang=css ***!
  \*************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_2_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_2_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_RepoCodeFrequency_vue_vue_type_style_index_0_id_6ae6f1d4_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-2.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-2.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0]!./RepoCodeFrequency.vue?vue&type=style&index=0&id=6ae6f1d4&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-2.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-2.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./web_src/js/components/RepoCodeFrequency.vue?vue&type=style&index=0&id=6ae6f1d4&scoped=true&lang=css");


/***/ }),

/***/ "./web_src/js/components/RepoCodeFrequency.vue?vue&type=template&id=6ae6f1d4&scoped=true":
/*!***********************************************************************************************!*\
  !*** ./web_src/js/components/RepoCodeFrequency.vue?vue&type=template&id=6ae6f1d4&scoped=true ***!
  \***********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: function() { return /* reexport safe */ _node_modules_esbuild_loader_dist_index_cjs_clonedRuleSet_1_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_RepoCodeFrequency_vue_vue_type_template_id_6ae6f1d4_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render; }
/* harmony export */ });
/* harmony import */ var _node_modules_esbuild_loader_dist_index_cjs_clonedRuleSet_1_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_RepoCodeFrequency_vue_vue_type_template_id_6ae6f1d4_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/esbuild-loader/dist/index.cjs??clonedRuleSet-1.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0]!./RepoCodeFrequency.vue?vue&type=template&id=6ae6f1d4&scoped=true */ "./node_modules/esbuild-loader/dist/index.cjs??clonedRuleSet-1.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./web_src/js/components/RepoCodeFrequency.vue?vue&type=template&id=6ae6f1d4&scoped=true");


/***/ })

}]);
//# sourceMappingURL=code-frequency-graph.7d569490.js.72486837.map