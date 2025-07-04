"use strict";
(self["webpackChunkforgejo"] = self["webpackChunkforgejo"] || []).push([["asciinema-player"],{

/***/ "./node_modules/asciinema-player/dist/bundle/asciinema-player.css":
/*!************************************************************************!*\
  !*** ./node_modules/asciinema-player/dist/bundle/asciinema-player.css ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/asciinema-player/dist/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/asciinema-player/dist/index.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   create: function() { return /* binding */ create; }
/* harmony export */ });
const sharedConfig = {};
function setHydrateContext(context) {
  sharedConfig.context = context;
}

const equalFn = (a, b) => a === b;
const $PROXY = Symbol("solid-proxy");
const $TRACK = Symbol("solid-track");
const signalOptions = {
  equals: equalFn
};
let runEffects = runQueue;
const STALE = 1;
const PENDING = 2;
const UNOWNED = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
var Owner = null;
let Transition = null;
let Listener = null;
let Updates = null;
let Effects = null;
let ExecCount = 0;
function createRoot(fn, detachedOwner) {
  const listener = Listener,
    owner = Owner,
    unowned = fn.length === 0,
    root = unowned ? UNOWNED : {
      owned: null,
      cleanups: null,
      context: null,
      owner: detachedOwner === undefined ? owner : detachedOwner
    },
    updateFn = unowned ? fn : () => fn(() => untrack(() => cleanNode(root)));
  Owner = root;
  Listener = null;
  try {
    return runUpdates(updateFn, true);
  } finally {
    Listener = listener;
    Owner = owner;
  }
}
function createSignal(value, options) {
  options = options ? Object.assign({}, signalOptions, options) : signalOptions;
  const s = {
    value,
    observers: null,
    observerSlots: null,
    comparator: options.equals || undefined
  };
  const setter = value => {
    if (typeof value === "function") {
      value = value(s.value);
    }
    return writeSignal(s, value);
  };
  return [readSignal.bind(s), setter];
}
function createRenderEffect(fn, value, options) {
  const c = createComputation(fn, value, false, STALE);
  updateComputation(c);
}
function createEffect(fn, value, options) {
  runEffects = runUserEffects;
  const c = createComputation(fn, value, false, STALE);
  c.user = true;
  Effects ? Effects.push(c) : updateComputation(c);
}
function createMemo(fn, value, options) {
  options = options ? Object.assign({}, signalOptions, options) : signalOptions;
  const c = createComputation(fn, value, true, 0);
  c.observers = null;
  c.observerSlots = null;
  c.comparator = options.equals || undefined;
  updateComputation(c);
  return readSignal.bind(c);
}
function batch(fn) {
  return runUpdates(fn, false);
}
function untrack(fn) {
  if (Listener === null) return fn();
  const listener = Listener;
  Listener = null;
  try {
    return fn();
  } finally {
    Listener = listener;
  }
}
function onMount(fn) {
  createEffect(() => untrack(fn));
}
function onCleanup(fn) {
  if (Owner === null) ;else if (Owner.cleanups === null) Owner.cleanups = [fn];else Owner.cleanups.push(fn);
  return fn;
}
function getListener() {
  return Listener;
}
function children(fn) {
  const children = createMemo(fn);
  const memo = createMemo(() => resolveChildren(children()));
  memo.toArray = () => {
    const c = memo();
    return Array.isArray(c) ? c : c != null ? [c] : [];
  };
  return memo;
}
function readSignal() {
  const runningTransition = Transition ;
  if (this.sources && (this.state || runningTransition )) {
    if (this.state === STALE || runningTransition ) updateComputation(this);else {
      const updates = Updates;
      Updates = null;
      runUpdates(() => lookUpstream(this), false);
      Updates = updates;
    }
  }
  if (Listener) {
    const sSlot = this.observers ? this.observers.length : 0;
    if (!Listener.sources) {
      Listener.sources = [this];
      Listener.sourceSlots = [sSlot];
    } else {
      Listener.sources.push(this);
      Listener.sourceSlots.push(sSlot);
    }
    if (!this.observers) {
      this.observers = [Listener];
      this.observerSlots = [Listener.sources.length - 1];
    } else {
      this.observers.push(Listener);
      this.observerSlots.push(Listener.sources.length - 1);
    }
  }
  return this.value;
}
function writeSignal(node, value, isComp) {
  let current = node.value;
  if (!node.comparator || !node.comparator(current, value)) {
    node.value = value;
    if (node.observers && node.observers.length) {
      runUpdates(() => {
        for (let i = 0; i < node.observers.length; i += 1) {
          const o = node.observers[i];
          const TransitionRunning = Transition && Transition.running;
          if (TransitionRunning && Transition.disposed.has(o)) ;
          if (TransitionRunning && !o.tState || !TransitionRunning && !o.state) {
            if (o.pure) Updates.push(o);else Effects.push(o);
            if (o.observers) markDownstream(o);
          }
          if (TransitionRunning) ;else o.state = STALE;
        }
        if (Updates.length > 10e5) {
          Updates = [];
          if (false) {}
          throw new Error();
        }
      }, false);
    }
  }
  return value;
}
function updateComputation(node) {
  if (!node.fn) return;
  cleanNode(node);
  const owner = Owner,
    listener = Listener,
    time = ExecCount;
  Listener = Owner = node;
  runComputation(node, node.value, time);
  Listener = listener;
  Owner = owner;
}
function runComputation(node, value, time) {
  let nextValue;
  try {
    nextValue = node.fn(value);
  } catch (err) {
    if (node.pure) {
      {
        node.state = STALE;
        node.owned && node.owned.forEach(cleanNode);
        node.owned = null;
      }
    }
    handleError(err);
  }
  if (!node.updatedAt || node.updatedAt <= time) {
    if (node.updatedAt != null && "observers" in node) {
      writeSignal(node, nextValue);
    } else node.value = nextValue;
    node.updatedAt = time;
  }
}
function createComputation(fn, init, pure, state = STALE, options) {
  const c = {
    fn,
    state: state,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: init,
    owner: Owner,
    context: null,
    pure
  };
  if (Owner === null) ;else if (Owner !== UNOWNED) {
    {
      if (!Owner.owned) Owner.owned = [c];else Owner.owned.push(c);
    }
  }
  return c;
}
function runTop(node) {
  const runningTransition = Transition ;
  if (node.state === 0 || runningTransition ) return;
  if (node.state === PENDING || runningTransition ) return lookUpstream(node);
  if (node.suspense && untrack(node.suspense.inFallback)) return node.suspense.effects.push(node);
  const ancestors = [node];
  while ((node = node.owner) && (!node.updatedAt || node.updatedAt < ExecCount)) {
    if (node.state || runningTransition ) ancestors.push(node);
  }
  for (let i = ancestors.length - 1; i >= 0; i--) {
    node = ancestors[i];
    if (node.state === STALE || runningTransition ) {
      updateComputation(node);
    } else if (node.state === PENDING || runningTransition ) {
      const updates = Updates;
      Updates = null;
      runUpdates(() => lookUpstream(node, ancestors[0]), false);
      Updates = updates;
    }
  }
}
function runUpdates(fn, init) {
  if (Updates) return fn();
  let wait = false;
  if (!init) Updates = [];
  if (Effects) wait = true;else Effects = [];
  ExecCount++;
  try {
    const res = fn();
    completeUpdates(wait);
    return res;
  } catch (err) {
    if (!wait) Effects = null;
    Updates = null;
    handleError(err);
  }
}
function completeUpdates(wait) {
  if (Updates) {
    runQueue(Updates);
    Updates = null;
  }
  if (wait) return;
  const e = Effects;
  Effects = null;
  if (e.length) runUpdates(() => runEffects(e), false);
}
function runQueue(queue) {
  for (let i = 0; i < queue.length; i++) runTop(queue[i]);
}
function runUserEffects(queue) {
  let i,
    userLength = 0;
  for (i = 0; i < queue.length; i++) {
    const e = queue[i];
    if (!e.user) runTop(e);else queue[userLength++] = e;
  }
  if (sharedConfig.context) setHydrateContext();
  for (i = 0; i < userLength; i++) runTop(queue[i]);
}
function lookUpstream(node, ignore) {
  const runningTransition = Transition ;
  node.state = 0;
  for (let i = 0; i < node.sources.length; i += 1) {
    const source = node.sources[i];
    if (source.sources) {
      if (source.state === STALE || runningTransition ) {
        if (source !== ignore) runTop(source);
      } else if (source.state === PENDING || runningTransition ) lookUpstream(source, ignore);
    }
  }
}
function markDownstream(node) {
  const runningTransition = Transition ;
  for (let i = 0; i < node.observers.length; i += 1) {
    const o = node.observers[i];
    if (!o.state || runningTransition ) {
      o.state = PENDING;
      if (o.pure) Updates.push(o);else Effects.push(o);
      o.observers && markDownstream(o);
    }
  }
}
function cleanNode(node) {
  let i;
  if (node.sources) {
    while (node.sources.length) {
      const source = node.sources.pop(),
        index = node.sourceSlots.pop(),
        obs = source.observers;
      if (obs && obs.length) {
        const n = obs.pop(),
          s = source.observerSlots.pop();
        if (index < obs.length) {
          n.sourceSlots[s] = index;
          obs[index] = n;
          source.observerSlots[index] = s;
        }
      }
    }
  }
  if (node.owned) {
    for (i = 0; i < node.owned.length; i++) cleanNode(node.owned[i]);
    node.owned = null;
  }
  if (node.cleanups) {
    for (i = 0; i < node.cleanups.length; i++) node.cleanups[i]();
    node.cleanups = null;
  }
  node.state = 0;
  node.context = null;
}
function castError(err) {
  if (err instanceof Error || typeof err === "string") return err;
  return new Error("Unknown error");
}
function handleError(err) {
  err = castError(err);
  throw err;
}
function resolveChildren(children) {
  if (typeof children === "function" && !children.length) return resolveChildren(children());
  if (Array.isArray(children)) {
    const results = [];
    for (let i = 0; i < children.length; i++) {
      const result = resolveChildren(children[i]);
      Array.isArray(result) ? results.push.apply(results, result) : results.push(result);
    }
    return results;
  }
  return children;
}

const FALLBACK = Symbol("fallback");
function dispose(d) {
  for (let i = 0; i < d.length; i++) d[i]();
}
function mapArray(list, mapFn, options = {}) {
  let items = [],
    mapped = [],
    disposers = [],
    len = 0,
    indexes = mapFn.length > 1 ? [] : null;
  onCleanup(() => dispose(disposers));
  return () => {
    let newItems = list() || [],
      i,
      j;
    newItems[$TRACK];
    return untrack(() => {
      let newLen = newItems.length,
        newIndices,
        newIndicesNext,
        temp,
        tempdisposers,
        tempIndexes,
        start,
        end,
        newEnd,
        item;
      if (newLen === 0) {
        if (len !== 0) {
          dispose(disposers);
          disposers = [];
          items = [];
          mapped = [];
          len = 0;
          indexes && (indexes = []);
        }
        if (options.fallback) {
          items = [FALLBACK];
          mapped[0] = createRoot(disposer => {
            disposers[0] = disposer;
            return options.fallback();
          });
          len = 1;
        }
      }
      else if (len === 0) {
        mapped = new Array(newLen);
        for (j = 0; j < newLen; j++) {
          items[j] = newItems[j];
          mapped[j] = createRoot(mapper);
        }
        len = newLen;
      } else {
        temp = new Array(newLen);
        tempdisposers = new Array(newLen);
        indexes && (tempIndexes = new Array(newLen));
        for (start = 0, end = Math.min(len, newLen); start < end && items[start] === newItems[start]; start++);
        for (end = len - 1, newEnd = newLen - 1; end >= start && newEnd >= start && items[end] === newItems[newEnd]; end--, newEnd--) {
          temp[newEnd] = mapped[end];
          tempdisposers[newEnd] = disposers[end];
          indexes && (tempIndexes[newEnd] = indexes[end]);
        }
        newIndices = new Map();
        newIndicesNext = new Array(newEnd + 1);
        for (j = newEnd; j >= start; j--) {
          item = newItems[j];
          i = newIndices.get(item);
          newIndicesNext[j] = i === undefined ? -1 : i;
          newIndices.set(item, j);
        }
        for (i = start; i <= end; i++) {
          item = items[i];
          j = newIndices.get(item);
          if (j !== undefined && j !== -1) {
            temp[j] = mapped[i];
            tempdisposers[j] = disposers[i];
            indexes && (tempIndexes[j] = indexes[i]);
            j = newIndicesNext[j];
            newIndices.set(item, j);
          } else disposers[i]();
        }
        for (j = start; j < newLen; j++) {
          if (j in temp) {
            mapped[j] = temp[j];
            disposers[j] = tempdisposers[j];
            if (indexes) {
              indexes[j] = tempIndexes[j];
              indexes[j](j);
            }
          } else mapped[j] = createRoot(mapper);
        }
        mapped = mapped.slice(0, len = newLen);
        items = newItems.slice(0);
      }
      return mapped;
    });
    function mapper(disposer) {
      disposers[j] = disposer;
      if (indexes) {
        const [s, set] = createSignal(j);
        indexes[j] = set;
        return mapFn(newItems[j], s);
      }
      return mapFn(newItems[j]);
    }
  };
}
function indexArray(list, mapFn, options = {}) {
  let items = [],
    mapped = [],
    disposers = [],
    signals = [],
    len = 0,
    i;
  onCleanup(() => dispose(disposers));
  return () => {
    const newItems = list() || [];
    newItems[$TRACK];
    return untrack(() => {
      if (newItems.length === 0) {
        if (len !== 0) {
          dispose(disposers);
          disposers = [];
          items = [];
          mapped = [];
          len = 0;
          signals = [];
        }
        if (options.fallback) {
          items = [FALLBACK];
          mapped[0] = createRoot(disposer => {
            disposers[0] = disposer;
            return options.fallback();
          });
          len = 1;
        }
        return mapped;
      }
      if (items[0] === FALLBACK) {
        disposers[0]();
        disposers = [];
        items = [];
        mapped = [];
        len = 0;
      }
      for (i = 0; i < newItems.length; i++) {
        if (i < items.length && items[i] !== newItems[i]) {
          signals[i](() => newItems[i]);
        } else if (i >= items.length) {
          mapped[i] = createRoot(mapper);
        }
      }
      for (; i < items.length; i++) {
        disposers[i]();
      }
      len = signals.length = disposers.length = newItems.length;
      items = newItems.slice(0);
      return mapped = mapped.slice(0, len);
    });
    function mapper(disposer) {
      disposers[i] = disposer;
      const [s, set] = createSignal(newItems[i]);
      signals[i] = set;
      return mapFn(s, i);
    }
  };
}
function createComponent(Comp, props) {
  return untrack(() => Comp(props || {}));
}
function trueFn() {
  return true;
}
const propTraps = {
  get(_, property, receiver) {
    if (property === $PROXY) return receiver;
    return _.get(property);
  },
  has(_, property) {
    if (property === $PROXY) return true;
    return _.has(property);
  },
  set: trueFn,
  deleteProperty: trueFn,
  getOwnPropertyDescriptor(_, property) {
    return {
      configurable: true,
      enumerable: true,
      get() {
        return _.get(property);
      },
      set: trueFn,
      deleteProperty: trueFn
    };
  },
  ownKeys(_) {
    return _.keys();
  }
};
function resolveSource(s) {
  return !(s = typeof s === "function" ? s() : s) ? {} : s;
}
function mergeProps(...sources) {
  let proxy = false;
  for (let i = 0; i < sources.length; i++) {
    const s = sources[i];
    proxy = proxy || !!s && $PROXY in s;
    sources[i] = typeof s === "function" ? (proxy = true, createMemo(s)) : s;
  }
  if (proxy) {
    return new Proxy({
      get(property) {
        for (let i = sources.length - 1; i >= 0; i--) {
          const v = resolveSource(sources[i])[property];
          if (v !== undefined) return v;
        }
      },
      has(property) {
        for (let i = sources.length - 1; i >= 0; i--) {
          if (property in resolveSource(sources[i])) return true;
        }
        return false;
      },
      keys() {
        const keys = [];
        for (let i = 0; i < sources.length; i++) keys.push(...Object.keys(resolveSource(sources[i])));
        return [...new Set(keys)];
      }
    }, propTraps);
  }
  const target = {};
  for (let i = sources.length - 1; i >= 0; i--) {
    if (sources[i]) {
      const descriptors = Object.getOwnPropertyDescriptors(sources[i]);
      for (const key in descriptors) {
        if (key in target) continue;
        Object.defineProperty(target, key, {
          enumerable: true,
          get() {
            for (let i = sources.length - 1; i >= 0; i--) {
              const v = (sources[i] || {})[key];
              if (v !== undefined) return v;
            }
          }
        });
      }
    }
  }
  return target;
}

function For(props) {
  const fallback = "fallback" in props && {
    fallback: () => props.fallback
  };
  return createMemo(mapArray(() => props.each, props.children, fallback || undefined));
}
function Index(props) {
  const fallback = "fallback" in props && {
    fallback: () => props.fallback
  };
  return createMemo(indexArray(() => props.each, props.children, fallback || undefined));
}
function Show(props) {
  let strictEqual = false;
  const keyed = props.keyed;
  const condition = createMemo(() => props.when, undefined, {
    equals: (a, b) => strictEqual ? a === b : !a === !b
  });
  return createMemo(() => {
    const c = condition();
    if (c) {
      const child = props.children;
      const fn = typeof child === "function" && child.length > 0;
      strictEqual = keyed || fn;
      return fn ? untrack(() => child(c)) : child;
    }
    return props.fallback;
  }, undefined, undefined);
}
function Switch(props) {
  let strictEqual = false;
  let keyed = false;
  const equals = (a, b) => a[0] === b[0] && (strictEqual ? a[1] === b[1] : !a[1] === !b[1]) && a[2] === b[2];
  const conditions = children(() => props.children),
    evalConditions = createMemo(() => {
      let conds = conditions();
      if (!Array.isArray(conds)) conds = [conds];
      for (let i = 0; i < conds.length; i++) {
        const c = conds[i].when;
        if (c) {
          keyed = !!conds[i].keyed;
          return [i, c, conds[i]];
        }
      }
      return [-1];
    }, undefined, {
      equals
    });
  return createMemo(() => {
    const [index, when, cond] = evalConditions();
    if (index < 0) return props.fallback;
    const c = cond.children;
    const fn = typeof c === "function" && c.length > 0;
    strictEqual = keyed || fn;
    return fn ? untrack(() => c(when)) : c;
  }, undefined, undefined);
}
function Match(props) {
  return props;
}

function reconcileArrays(parentNode, a, b) {
  let bLength = b.length,
    aEnd = a.length,
    bEnd = bLength,
    aStart = 0,
    bStart = 0,
    after = a[aEnd - 1].nextSibling,
    map = null;
  while (aStart < aEnd || bStart < bEnd) {
    if (a[aStart] === b[bStart]) {
      aStart++;
      bStart++;
      continue;
    }
    while (a[aEnd - 1] === b[bEnd - 1]) {
      aEnd--;
      bEnd--;
    }
    if (aEnd === aStart) {
      const node = bEnd < bLength ? bStart ? b[bStart - 1].nextSibling : b[bEnd - bStart] : after;
      while (bStart < bEnd) parentNode.insertBefore(b[bStart++], node);
    } else if (bEnd === bStart) {
      while (aStart < aEnd) {
        if (!map || !map.has(a[aStart])) a[aStart].remove();
        aStart++;
      }
    } else if (a[aStart] === b[bEnd - 1] && b[bStart] === a[aEnd - 1]) {
      const node = a[--aEnd].nextSibling;
      parentNode.insertBefore(b[bStart++], a[aStart++].nextSibling);
      parentNode.insertBefore(b[--bEnd], node);
      a[aEnd] = b[bEnd];
    } else {
      if (!map) {
        map = new Map();
        let i = bStart;
        while (i < bEnd) map.set(b[i], i++);
      }
      const index = map.get(a[aStart]);
      if (index != null) {
        if (bStart < index && index < bEnd) {
          let i = aStart,
            sequence = 1,
            t;
          while (++i < aEnd && i < bEnd) {
            if ((t = map.get(a[i])) == null || t !== index + sequence) break;
            sequence++;
          }
          if (sequence > index - bStart) {
            const node = a[aStart];
            while (bStart < index) parentNode.insertBefore(b[bStart++], node);
          } else parentNode.replaceChild(b[bStart++], a[aStart++]);
        } else aStart++;
      } else a[aStart++].remove();
    }
  }
}

const $$EVENTS = "_$DX_DELEGATE";
function render(code, element, init, options = {}) {
  let disposer;
  createRoot(dispose => {
    disposer = dispose;
    element === document ? code() : insert(element, code(), element.firstChild ? null : undefined, init);
  }, options.owner);
  return () => {
    disposer();
    element.textContent = "";
  };
}
function template(html, check, isSVG) {
  const t = document.createElement("template");
  t.innerHTML = html;
  let node = t.content.firstChild;
  if (isSVG) node = node.firstChild;
  return node;
}
function delegateEvents(eventNames, document = window.document) {
  const e = document[$$EVENTS] || (document[$$EVENTS] = new Set());
  for (let i = 0, l = eventNames.length; i < l; i++) {
    const name = eventNames[i];
    if (!e.has(name)) {
      e.add(name);
      document.addEventListener(name, eventHandler);
    }
  }
}
function setAttribute(node, name, value) {
  if (value == null) node.removeAttribute(name);else node.setAttribute(name, value);
}
function className(node, value) {
  if (value == null) node.removeAttribute("class");else node.className = value;
}
function addEventListener(node, name, handler, delegate) {
  if (delegate) {
    if (Array.isArray(handler)) {
      node[`$$${name}`] = handler[0];
      node[`$$${name}Data`] = handler[1];
    } else node[`$$${name}`] = handler;
  } else if (Array.isArray(handler)) {
    const handlerFn = handler[0];
    node.addEventListener(name, handler[0] = e => handlerFn.call(node, handler[1], e));
  } else node.addEventListener(name, handler);
}
function style(node, value, prev) {
  if (!value) return prev ? setAttribute(node, "style") : value;
  const nodeStyle = node.style;
  if (typeof value === "string") return nodeStyle.cssText = value;
  typeof prev === "string" && (nodeStyle.cssText = prev = undefined);
  prev || (prev = {});
  value || (value = {});
  let v, s;
  for (s in prev) {
    value[s] == null && nodeStyle.removeProperty(s);
    delete prev[s];
  }
  for (s in value) {
    v = value[s];
    if (v !== prev[s]) {
      nodeStyle.setProperty(s, v);
      prev[s] = v;
    }
  }
  return prev;
}
function use(fn, element, arg) {
  return untrack(() => fn(element, arg));
}
function insert(parent, accessor, marker, initial) {
  if (marker !== undefined && !initial) initial = [];
  if (typeof accessor !== "function") return insertExpression(parent, accessor, initial, marker);
  createRenderEffect(current => insertExpression(parent, accessor(), current, marker), initial);
}
function eventHandler(e) {
  const key = `$$${e.type}`;
  let node = e.composedPath && e.composedPath()[0] || e.target;
  if (e.target !== node) {
    Object.defineProperty(e, "target", {
      configurable: true,
      value: node
    });
  }
  Object.defineProperty(e, "currentTarget", {
    configurable: true,
    get() {
      return node || document;
    }
  });
  if (sharedConfig.registry && !sharedConfig.done) {
    sharedConfig.done = true;
    document.querySelectorAll("[id^=pl-]").forEach(elem => {
      while (elem && elem.nodeType !== 8 && elem.nodeValue !== "pl-" + e) {
        let x = elem.nextSibling;
        elem.remove();
        elem = x;
      }
      elem && elem.remove();
    });
  }
  while (node) {
    const handler = node[key];
    if (handler && !node.disabled) {
      const data = node[`${key}Data`];
      data !== undefined ? handler.call(node, data, e) : handler.call(node, e);
      if (e.cancelBubble) return;
    }
    node = node._$host || node.parentNode || node.host;
  }
}
function insertExpression(parent, value, current, marker, unwrapArray) {
  if (sharedConfig.context && !current) current = [...parent.childNodes];
  while (typeof current === "function") current = current();
  if (value === current) return current;
  const t = typeof value,
    multi = marker !== undefined;
  parent = multi && current[0] && current[0].parentNode || parent;
  if (t === "string" || t === "number") {
    if (sharedConfig.context) return current;
    if (t === "number") value = value.toString();
    if (multi) {
      let node = current[0];
      if (node && node.nodeType === 3) {
        node.data = value;
      } else node = document.createTextNode(value);
      current = cleanChildren(parent, current, marker, node);
    } else {
      if (current !== "" && typeof current === "string") {
        current = parent.firstChild.data = value;
      } else current = parent.textContent = value;
    }
  } else if (value == null || t === "boolean") {
    if (sharedConfig.context) return current;
    current = cleanChildren(parent, current, marker);
  } else if (t === "function") {
    createRenderEffect(() => {
      let v = value();
      while (typeof v === "function") v = v();
      current = insertExpression(parent, v, current, marker);
    });
    return () => current;
  } else if (Array.isArray(value)) {
    const array = [];
    const currentArray = current && Array.isArray(current);
    if (normalizeIncomingArray(array, value, current, unwrapArray)) {
      createRenderEffect(() => current = insertExpression(parent, array, current, marker, true));
      return () => current;
    }
    if (sharedConfig.context) {
      if (!array.length) return current;
      for (let i = 0; i < array.length; i++) {
        if (array[i].parentNode) return current = array;
      }
    }
    if (array.length === 0) {
      current = cleanChildren(parent, current, marker);
      if (multi) return current;
    } else if (currentArray) {
      if (current.length === 0) {
        appendNodes(parent, array, marker);
      } else reconcileArrays(parent, current, array);
    } else {
      current && cleanChildren(parent);
      appendNodes(parent, array);
    }
    current = array;
  } else if (value instanceof Node) {
    if (sharedConfig.context && value.parentNode) return current = multi ? [value] : value;
    if (Array.isArray(current)) {
      if (multi) return current = cleanChildren(parent, current, marker, value);
      cleanChildren(parent, current, null, value);
    } else if (current == null || current === "" || !parent.firstChild) {
      parent.appendChild(value);
    } else parent.replaceChild(value, parent.firstChild);
    current = value;
  } else ;
  return current;
}
function normalizeIncomingArray(normalized, array, current, unwrap) {
  let dynamic = false;
  for (let i = 0, len = array.length; i < len; i++) {
    let item = array[i],
      prev = current && current[i];
    if (item instanceof Node) {
      normalized.push(item);
    } else if (item == null || item === true || item === false) ; else if (Array.isArray(item)) {
      dynamic = normalizeIncomingArray(normalized, item, prev) || dynamic;
    } else if ((typeof item) === "function") {
      if (unwrap) {
        while (typeof item === "function") item = item();
        dynamic = normalizeIncomingArray(normalized, Array.isArray(item) ? item : [item], Array.isArray(prev) ? prev : [prev]) || dynamic;
      } else {
        normalized.push(item);
        dynamic = true;
      }
    } else {
      const value = String(item);
      if (prev && prev.nodeType === 3 && prev.data === value) {
        normalized.push(prev);
      } else normalized.push(document.createTextNode(value));
    }
  }
  return dynamic;
}
function appendNodes(parent, array, marker = null) {
  for (let i = 0, len = array.length; i < len; i++) parent.insertBefore(array[i], marker);
}
function cleanChildren(parent, current, marker, replacement) {
  if (marker === undefined) return parent.textContent = "";
  const node = replacement || document.createTextNode("");
  if (current.length) {
    let inserted = false;
    for (let i = current.length - 1; i >= 0; i--) {
      const el = current[i];
      if (node !== el) {
        const isParent = el.parentNode === parent;
        if (!inserted && !i) isParent ? parent.replaceChild(node, el) : parent.insertBefore(node, marker);else isParent && el.remove();
      } else inserted = true;
    }
  } else parent.insertBefore(node, marker);
  return [node];
}

let wasm;
const heap = new Array(128).fill(undefined);
heap.push(undefined, null, true, false);
function getObject(idx) {
  return heap[idx];
}
let heap_next = heap.length;
function dropObject(idx) {
  if (idx < 132) return;
  heap[idx] = heap_next;
  heap_next = idx;
}
function takeObject(idx) {
  const ret = getObject(idx);
  dropObject(idx);
  return ret;
}
const cachedTextDecoder = typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', {
  ignoreBOM: true,
  fatal: true
}) : {
  decode: () => {
    throw Error('TextDecoder not available');
  }
};
if (typeof TextDecoder !== 'undefined') {
  cachedTextDecoder.decode();
}
let cachedUint8Memory0 = null;
function getUint8Memory0() {
  if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
    cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachedUint8Memory0;
}
function getStringFromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}
function addHeapObject(obj) {
  if (heap_next === heap.length) heap.push(heap.length + 1);
  const idx = heap_next;
  heap_next = heap[idx];
  heap[idx] = obj;
  return idx;
}
function debugString(val) {
  // primitive types
  const type = typeof val;
  if (type == 'number' || type == 'boolean' || val == null) {
    return `${val}`;
  }
  if (type == 'string') {
    return `"${val}"`;
  }
  if (type == 'symbol') {
    const description = val.description;
    if (description == null) {
      return 'Symbol';
    } else {
      return `Symbol(${description})`;
    }
  }
  if (type == 'function') {
    const name = val.name;
    if (typeof name == 'string' && name.length > 0) {
      return `Function(${name})`;
    } else {
      return 'Function';
    }
  }
  // objects
  if (Array.isArray(val)) {
    const length = val.length;
    let debug = '[';
    if (length > 0) {
      debug += debugString(val[0]);
    }
    for (let i = 1; i < length; i++) {
      debug += ', ' + debugString(val[i]);
    }
    debug += ']';
    return debug;
  }
  // Test for built-in
  const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
  let className;
  if (builtInMatches.length > 1) {
    className = builtInMatches[1];
  } else {
    // Failed to match the standard '[object ClassName]'
    return toString.call(val);
  }
  if (className == 'Object') {
    // we're a user defined class or Object
    // JSON.stringify avoids problems with cycles, and is generally much
    // easier than looping through ownProperties of `val`.
    try {
      return 'Object(' + JSON.stringify(val) + ')';
    } catch (_) {
      return 'Object';
    }
  }
  // errors
  if (val instanceof Error) {
    return `${val.name}: ${val.message}\n${val.stack}`;
  }
  // TODO we could test for more things here, like `Set`s and `Map`s.
  return className;
}
let WASM_VECTOR_LEN = 0;
const cachedTextEncoder = typeof TextEncoder !== 'undefined' ? new TextEncoder('utf-8') : {
  encode: () => {
    throw Error('TextEncoder not available');
  }
};
const encodeString = typeof cachedTextEncoder.encodeInto === 'function' ? function (arg, view) {
  return cachedTextEncoder.encodeInto(arg, view);
} : function (arg, view) {
  const buf = cachedTextEncoder.encode(arg);
  view.set(buf);
  return {
    read: arg.length,
    written: buf.length
  };
};
function passStringToWasm0(arg, malloc, realloc) {
  if (realloc === undefined) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr = malloc(buf.length, 1) >>> 0;
    getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
    WASM_VECTOR_LEN = buf.length;
    return ptr;
  }
  let len = arg.length;
  let ptr = malloc(len, 1) >>> 0;
  const mem = getUint8Memory0();
  let offset = 0;
  for (; offset < len; offset++) {
    const code = arg.charCodeAt(offset);
    if (code > 0x7F) break;
    mem[ptr + offset] = code;
  }
  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }
    ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
    const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
    const ret = encodeString(arg, view);
    offset += ret.written;
    ptr = realloc(ptr, len, offset, 1) >>> 0;
  }
  WASM_VECTOR_LEN = offset;
  return ptr;
}
let cachedInt32Memory0 = null;
function getInt32Memory0() {
  if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
    cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
  }
  return cachedInt32Memory0;
}
/**
* @param {number} cols
* @param {number} rows
* @param {number} scrollback_limit
* @returns {Vt}
*/
function create$1(cols, rows, scrollback_limit) {
  const ret = wasm.create(cols, rows, scrollback_limit);
  return Vt.__wrap(ret);
}
let cachedUint32Memory0 = null;
function getUint32Memory0() {
  if (cachedUint32Memory0 === null || cachedUint32Memory0.byteLength === 0) {
    cachedUint32Memory0 = new Uint32Array(wasm.memory.buffer);
  }
  return cachedUint32Memory0;
}
function getArrayU32FromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return getUint32Memory0().subarray(ptr / 4, ptr / 4 + len);
}
const VtFinalization = typeof FinalizationRegistry === 'undefined' ? {
  register: () => {},
  unregister: () => {}
} : new FinalizationRegistry(ptr => wasm.__wbg_vt_free(ptr >>> 0));
/**
*/
class Vt {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(Vt.prototype);
    obj.__wbg_ptr = ptr;
    VtFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    VtFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_vt_free(ptr);
  }
  /**
  * @param {string} s
  * @returns {any}
  */
  feed(s) {
    const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.vt_feed(this.__wbg_ptr, ptr0, len0);
    return takeObject(ret);
  }
  /**
  * @param {number} cols
  * @param {number} rows
  * @returns {any}
  */
  resize(cols, rows) {
    const ret = wasm.vt_resize(this.__wbg_ptr, cols, rows);
    return takeObject(ret);
  }
  /**
  * @returns {string}
  */
  inspect() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.vt_inspect(retptr, this.__wbg_ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
  /**
  * @returns {Uint32Array}
  */
  getSize() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.vt_getSize(retptr, this.__wbg_ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v1 = getArrayU32FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 4, 4);
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} n
  * @returns {any}
  */
  getLine(n) {
    const ret = wasm.vt_getLine(this.__wbg_ptr, n);
    return takeObject(ret);
  }
  /**
  * @returns {any}
  */
  getCursor() {
    const ret = wasm.vt_getCursor(this.__wbg_ptr);
    return takeObject(ret);
  }
}
async function __wbg_load(module, imports) {
  if (typeof Response === 'function' && module instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming === 'function') {
      try {
        return await WebAssembly.instantiateStreaming(module, imports);
      } catch (e) {
        if (module.headers.get('Content-Type') != 'application/wasm') {
          console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
        } else {
          throw e;
        }
      }
    }
    const bytes = await module.arrayBuffer();
    return await WebAssembly.instantiate(bytes, imports);
  } else {
    const instance = await WebAssembly.instantiate(module, imports);
    if (instance instanceof WebAssembly.Instance) {
      return {
        instance,
        module
      };
    } else {
      return instance;
    }
  }
}
function __wbg_get_imports() {
  const imports = {};
  imports.wbg = {};
  imports.wbg.__wbindgen_object_drop_ref = function (arg0) {
    takeObject(arg0);
  };
  imports.wbg.__wbindgen_error_new = function (arg0, arg1) {
    const ret = new Error(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_object_clone_ref = function (arg0) {
    const ret = getObject(arg0);
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_number_new = function (arg0) {
    const ret = arg0;
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_bigint_from_u64 = function (arg0) {
    const ret = BigInt.asUintN(64, arg0);
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_string_new = function (arg0, arg1) {
    const ret = getStringFromWasm0(arg0, arg1);
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_set_f975102236d3c502 = function (arg0, arg1, arg2) {
    getObject(arg0)[takeObject(arg1)] = takeObject(arg2);
  };
  imports.wbg.__wbg_new_b525de17f44a8943 = function () {
    const ret = new Array();
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_new_f841cc6f2098f4b5 = function () {
    const ret = new Map();
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_new_f9876326328f45ed = function () {
    const ret = new Object();
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_is_string = function (arg0) {
    const ret = typeof getObject(arg0) === 'string';
    return ret;
  };
  imports.wbg.__wbg_set_17224bc548dd1d7b = function (arg0, arg1, arg2) {
    getObject(arg0)[arg1 >>> 0] = takeObject(arg2);
  };
  imports.wbg.__wbg_set_388c4c6422704173 = function (arg0, arg1, arg2) {
    const ret = getObject(arg0).set(getObject(arg1), getObject(arg2));
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_debug_string = function (arg0, arg1) {
    const ret = debugString(getObject(arg1));
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len1;
    getInt32Memory0()[arg0 / 4 + 0] = ptr1;
  };
  imports.wbg.__wbindgen_throw = function (arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
  };
  return imports;
}
function __wbg_finalize_init(instance, module) {
  wasm = instance.exports;
  __wbg_init.__wbindgen_wasm_module = module;
  cachedInt32Memory0 = null;
  cachedUint32Memory0 = null;
  cachedUint8Memory0 = null;
  return wasm;
}
function initSync(module) {
  if (wasm !== undefined) return wasm;
  const imports = __wbg_get_imports();
  if (!(module instanceof WebAssembly.Module)) {
    module = new WebAssembly.Module(module);
  }
  const instance = new WebAssembly.Instance(module, imports);
  return __wbg_finalize_init(instance, module);
}
async function __wbg_init(input) {
  if (wasm !== undefined) return wasm;
  const imports = __wbg_get_imports();
  if (typeof input === 'string' || typeof Request === 'function' && input instanceof Request || typeof URL === 'function' && input instanceof URL) {
    input = fetch(input);
  }
  const {
    instance,
    module
  } = await __wbg_load(await input, imports);
  return __wbg_finalize_init(instance, module);
}

var exports = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Vt: Vt,
  create: create$1,
  default: __wbg_init,
  initSync: initSync
});

const base64codes = [62,0,0,0,63,52,53,54,55,56,57,58,59,60,61,0,0,0,0,0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,0,0,0,0,0,0,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51];

        function getBase64Code(charCode) {
            return base64codes[charCode - 43];
        }

        function base64_decode(str) {
            let missingOctets = str.endsWith("==") ? 2 : str.endsWith("=") ? 1 : 0;
            let n = str.length;
            let result = new Uint8Array(3 * (n / 4));
            let buffer;

            for (let i = 0, j = 0; i < n; i += 4, j += 3) {
                buffer =
                    getBase64Code(str.charCodeAt(i)) << 18 |
                    getBase64Code(str.charCodeAt(i + 1)) << 12 |
                    getBase64Code(str.charCodeAt(i + 2)) << 6 |
                    getBase64Code(str.charCodeAt(i + 3));
                result[j] = buffer >> 16;
                result[j + 1] = (buffer >> 8) & 0xFF;
                result[j + 2] = buffer & 0xFF;
            }

            return result.subarray(0, result.length - missingOctets);
        }

        const wasm_code = base64_decode("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QQhrIgAgA08NAQwDCyAHQQhrIQALA0AgBkEEaigCACIJQYqUqNAAc0GBgoQIayAJQX9zcSAGKAIAIglBipSo0ABzQYGChAhrIAlBf3NxckGAgYKEeHENAiAGQQhqIQYgACADQQhqIgNPDQALDAELIAIgBEYEQCACIQQMBAtBACEAA0AgACAFai0AAEEKRg0CIAcgAEEBaiIARw0ACyACIQQMAwsgAyAHRgRAIAIhBAwDCwNAIAMgBWotAABBCkYEQCADIQAMAgsgByADQQFqIgNHDQALIAIhBAwCCyAAIARqIgZBAWohBAJAIAIgBk0NACAAIAVqLQAAQQpHDQBBACEFIAQiBiEADAMLIAIgBE8NAAsLQQEhBSACIgAgCCIGRw0AQQAPCwJAIAwtAABFDQAgC0H49MAAQQQgCigCDBEBAEUNAEEBDwsgACAIayEHQQAhAyAAIAhHBEAgACANai0AAEEKRiEDCyABIAhqIQAgDCADOgAAIAYhCCALIAAgByAKKAIMEQEAIgAgBXJFDQALIAAL0gYBBX8jAEHAAWsiAiQAIAAoAgAhAyACQbgBakGojMAANgIAIAJBBGoiAEGsAWpBxJDAADYCACAAQaQBakG0kMAANgIAIABBnAFqQbSQwAA2AgAgAkGYAWpBmI7AADYCACACQZABakGYjsAANgIAIAJBiAFqQaSPwAA2AgAgAkGAAWpBpJDAADYCACAAQfQAakGkj8AANgIAIAJB8ABqQaSPwAA2AgAgAkHoAGpBpI/AADYCACAAQdwAakGkj8AANgIAIAJB2ABqQZSQwAA2AgAgAkHQAGpBmI7AADYCACACQcgAakGEkMAANgIAIAJBQGtBiI/AADYCACACQThqQfSPwAA2AgAgAkEwakHkj8AANgIAIABBJGpB1I/AADYCACACQSBqQcSPwAA2AgAgAkEYakHEj8AANgIAIAJBEGpBmI7AADYCACACIANB3ABqNgKsASACIANBiAFqNgKkASACIANB9ABqNgKcASACIANBrAFqNgKUASACIANBqAFqNgKMASACIANBwgFqNgKEASACIANBwQFqNgJ8IAIgA0HAAWo2AnQgAiADQb8BajYCbCACIANBvgFqNgJkIAIgA0G9AWo2AlwgAiADQdAAajYCVCACIANBpAFqNgJMIAIgA0GwAWo2AkQgAiADQbIB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amohAiADQSBqIQMgCCAHQQRqIgdHDQALCyAGBEAgB0EDdCAFakEEaiEDA0AgAygCACACaiECIANBCGohAyAGQQFrIgYNAAsLIAEoAgwEQCACQQBIDQEgBSgCBEUgAkEQSXENASACQQF0IQILIAINAQtBASEDQQAhAgwBCyACQQBIDQFBqYzBAC0AABogAkEBENcBIgNFDQILIARBADYCCCAEIAM2AgQgBCACNgIAIARBhO/AACABEBhFDQJB5O/AAEEzIARBD2pBmPDAAEHA8MAAEF0ACxCpAQALQQEgAkHkjMEAKAIAIgBB5AAgABsRAgAACyAAIAQpAgA3AgAgAEEIaiAEQQhqKAIANgIAIARBEGokAAvVAgEHf0EBIQkCQAJAIAJFDQAgASACQQF0aiEKIABBgP4DcUEIdiELIABB/wFxIQ0DQCABQQJqIQwgByABLQABIgJqIQggCyABLQAAIgFHBEAgASALSw0CIAghByAKIAwiAUYNAgwBCwJAAkAgByAITQRAIAQgCEkNASADIAdqIQEDQCACRQ0DIAJBAWshAiABLQAAIAFBAWohASANRw0AC0EAIQkMBQsgByAIQbj5wAAQ7AEACyAIIARBuPnAABDqAQALIAghByAKIAwiAUcNAAsLIAZFDQAgBSAGaiEDIABB//8DcSEBA0AgBUEBaiEAAkAgBS0AACICwCIEQQBOBEAgACEFDAELIAAgA0cEQCAFLQABIARB/wBxQQh0ciECIAVBAmohBQwBC0Go+cAAEO4BAAsgASACayIBQQBIDQEgCUEBcyEJIAMgBUcNAAsLIAlBAXEL8wIBBH8gACgCDCECAkACQCABQYACTwRAIAAoAhghAwJAAkAgACACRgRAIABBFEEQIAAoAhQiAhtqKAIAIgENAUEAIQIMAgsgACgCCCIBIAI2AgwgAiABNgIIDAELIABBFGogAEEQaiACGyEEA0AgBCEFIAEiAigCFCEBIAJBFGogAkEQaiABGyEEIAJBFEEQIAEbaigCACIBDQALIAVBADYCAAsgA0UNAiAAIAAoAhxBAnRB+IzBAGoiASgCAEcEQCADQRBBFCADKAIQIABGG2ogAjYCACACRQ0DDAILIAEgAjYCACACDQFBlJDBAEGUkMEAKAIAQX4gACgCHHdxNgIADAILIAIgACgCCCIARwRAIAAgAjYC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IhEoAgAhDyARIAwoAgA2AgAgDCAPNgIAIAVBBGoiBUEkRw0ACyALQQxqIAMoApwBIAMoAqABIgVBAUEAIANBsgFqECsgA0EMahCKASADKAIMIgwEQCADKAIQIAxBBHRBBBDkAQsgAyALQQxqQSQQiAJB3ABqQQAgBRB4CyALQTBqJAAgAxBCCyACQQJqIQIgB0ECayIHDQALCyANBEAgBCANQQF0QQIQ5AELDCALAkAgAi8BAiIEQQEgBEEBSxtBAWsiBCACLwEEIgIgAygCoAEiBSACG0EBayICSSACIAVJcUUEQCADKAKoASEEDAELIAMgAjYCrAEgAyAENgKoAQsgA0EAOgDCASADQQA2AmggAyAEQQAgAy0AvgEbNgJsDB8LIANBAToAcCADQQA7AL0BIANBADsBugEgA0ECOgC2ASADQQI6ALIBIANBADsBsAEgA0IANwKkASADQYCAgAg2AoQBIANBAjoAgAEgA0ECOgB8IANCADcCdCADIAMoAqABQQFrNgKsAQweCyADKAKgASADKAKsASIEQQFqIAQgAygCbCIESRshBSADIAQgBSACLwECIgJBASACQQFLGyADQbIBahAiIANB3ABqIAQgBRB4DB0LIAMgAygCaCADKAJsIgRBACACLwECIgJBASACQQFLGyADQbIBahAoIAQgAygCZCICTw0dIAMoAmAgBGpBAToAAAwcCwJAAkACQAJAIAItAAFBAWsOAwECAwALIAMgAygCaCADKAJsQQEgAyADQbIBahAoIANB3ABqIAMoAmwgAygCoAEQeAwCCyADIAMoAmggAygCbEECIAMgA0GyAWoQKCADQdwAakEAIAMoAmxBAWoQeAwBCyADQQAgAygCHCADQbIBahBLIANB3ABqQQAgAygCoAEQeAsMGwsgAyADKAJoIAMoAmwiBCACLQABQQRqIAMgA0GyAWoQKCAEIAMoAmQiAk8NGyADKAJgIARqQQE6AAAMGgsgAyACLQABOgCxAQwZCyADIAItAAE6ALABDBgLIAMoAlhBAnQhAiADKAJUIQUgAygCaCEHAkACQANAIAJFDQEgAkEEayECIAUoAgAhBCAFQQRqIQUgBCAHTQ0ACyADKAKcASICQQFrIQUMAQsgAygCnAEiAkEBayIFIQQLIANBADoAwgEgAyAEIAUgAiAESxs2AmgMFwsg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+gA2AiggACAAQSRqNgIUIAAgAEEvajYCJCAAQQxqQeCXwAAQpAEACyATQRBqJAAgAAvGAQECfyMAQRBrIgAkACABKAIUQbDswABBCyABKAIYKAIMEQEAIQMgAEEIaiICQQA6AAUgAiADOgAEIAIgATYCACACIgEtAAQhAwJAIAItAAVFBEAgA0EARyEBDAELQQEhAiADRQRAIAEoAgAiAi0AHEEEcUUEQCABIAIoAhRBh/XAAEECIAIoAhgoAgwRAQAiAToABAwCCyACKAIUQYb1wABBASACKAIYKAIMEQEAIQILIAEgAjoABCACIQELIABBEGokACABCzIBAX8gAEEQahAwAkAgACgCACIBQYCAgIB4Rg0AIAFFDQAgACgCBCABQQR0QQQQ5AELCy8BAn8gACAAKAKoASICIAAoAqwBQQFqIgMgASAAQbIBahBZIABB3ABqIAIgAxB4Cy8BAn8gACAAKAKoASICIAAoAqwBQQFqIgMgASAAQbIBahAiIABB3ABqIAIgAxB4CysAIAEgAkkEQEHcosAAQSNBzKPAABCcAQALIAIgACACQQR0aiABIAJrEBILJQAgAEEBNgIEIAAgASgCBCABKAIAa0EEdiIBNgIIIAAgATYCAAslACAARQRAQfCXwABBMhD7AQALIAAgAiADIAQgBSABKAIQEQgACzAAIAEoAhQgAC0AAEECdCIAQYyFwABqKAIAIABB1ITAAGooAgAgASgCGCgCDBEBAAswACABKAIUIAAtAABBAnQiAEGEi8AAaigCACAAQfiKwABqKAIAIAEoAhgoAgwRAQALMAAgASgCFCAALQAAQQJ0IgBB2JTAAGooAgAgAEHMlMAAaigCACABKAIYKAIMEQEACyMAIABFBEBB8JfAAEEyEPsBAAsgACACIAMgBCABKAIQEQUACyMAIABFBEBB8JfAAEEyEPsBAAsgACACIAMgBCABKAIQERgACyMAIABFBEBB8JfAAEEyEPsBAAsgACACIAMgBCABKAIQERoACyMAIABFBEBB8JfAAEEyEPsBAAsgACACIAMgBCABKAIQERwACyMAIABFBEBB8JfAAEEyEPsBAAsgACACIAMgBCABKAIQEQwACygBAX8gACgCACIBQYCAgIB4ckGAgICAeEcEQCAAKAIEIAFBARDkAQsLLgAgASgCFEH8icAAQfeJ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iPjAADYCCCADQgI3AhQgA0HjADYCJCADIANBIGo2AhAgAyADQQRqNgIoIAMgAzYCICADQQhqIAIQpAEACwsAIAA1AgAgARAkC2wBAX8jAEEwayIDJAAgAyABNgIEIAMgADYCACADQSxqQeMANgIAIANBAjYCDCADQbz4wAA2AgggA0ICNwIUIANB4wA2AiQgAyADQSBqNgIQIAMgA0EEajYCKCADIAM2AiAgA0EIaiACEKQBAAsLACAAMQAAIAEQJAsPAEGt8sAAQSsgABCcAQALCwAgACkDACABECQLCwAgACMAaiQAIwALDAAgACgCACABEMMBCwsAIAAoAgAgARAnCwcAIAAQyQELBwAgABDBAQsZACABKAIUQcyHwABBBSABKAIYKAIMEQEAC5cBAQF/IAAoAgAhAiMAQUBqIgAkACAAQgA3AzggAEE4aiACKAIAEA0gACAAKAI8IgI2AjQgACAAKAI4NgIwIAAgAjYCLCAAQd8ANgIoIABBAjYCECAAQcznwAA2AgwgAEIBNwIYIAAgAEEsaiICNgIkIAAgAEEkajYCFCABKAIUIAEoAhggAEEMahAYIAIQyQEgAEFAayQAC6IBAQR/QQIhAyMAQRBrIgIkACABKAIUQazywABBASABKAIYKAIMEQEAIQUgAkEEaiIEQQA6AAUgBCAFOgAEIAQgATYCAANAIAIgADYCDCACQQRqIAJBDGpByIzAABAsIABBAWohACADQQFrIgMNAAsgAkEEaiIALQAEBH9BAQUgACgCACIAKAIUQY71wABBASAAKAIYKAIMEQEACyACQRBqJAALowEBA38jAEEQayICJAAgASgCFEGs8sAAQQEgASgCGCgCDBEBACEEIAJBBGoiA0EAOgAFIAMgBDoABCADIAE2AgBBgAQhAQNAIAIgADYCDCACQQRqIAJBDGpBuIzAABAsIABBEGohACABQRBrIgENAAsgAkEEaiIALQAEBH9BAQUgACgCACIAKAIUQY71wABBASAAKAIYKAIMEQEACyACQRBqJAALBwAgABDCAQsMACAAEIoBIAAQwQELCQAgACABEA4ACw0AQeTowABBGxD7AQALDgBB/+jAAEHPABD7AQALDQAgAEHY6sAAIAEQGAsNACAAQfDqwAAgARAYCw0AIABBhO/AACABEBgLGQAgASgCFEH87sAAQQUgASgCGCgCDBEBAAuGBAEFfyMAQRBrIgMkAAJAAn8CQCABQYABTwRAIANBADYCDCABQYAQSQ0BIAFBgIAESQRAIAMgAUE/cUGAAXI6AA4gAyABQQx2QeABcjoADCADIAFBBnZBP3FBgAFyOgANQQMMAwsgAyABQT9xQYABcjoADyADIAFBBnZBP3FBgAFyOgAOIAMgAUEMdkE/cUGAAXI6AA0gAyABQRJ2QQdxQfABcjoADEEEDAILIAAoAggiAiAAKAIARgRAIwBBIGsiBCQAAkACQCACQQFqIgJFDQAgACgCACIFQQF0IgYgAiACIAZJGyICQQggAkEISxsiAkF/c0EfdiEGIAQgBQR/IAQgBTYCHCAEIAAoAgQ2AhRBAQVBAAs2AhggBEEIaiAGIAIgBEEUahBEIAQoAggEQCAEKAIMIgBFDQEgACAEKAIQQeSMwQAoAgAiAEHkACAAGxECAAALIAQoAgwhBSAAIAI2AgAgACAFNgIEIARBIGokAAwBCxCpAQALIAAoAgghAgsgACACQQFqNgIIIAAoAgQgAmogAToAAAwCCyADIAFBP3FBgAFyOgANIAMgAUEGdkHAAXI6AAxBAgshASABIAAoAgAgACgCCCICa0sEQCAAIAIgARA+IAAoAgghAgsgACgCBCACaiADQQxqIAEQiAIaIAAgASACajYCCAsgA0EQaiQAQQALDQAgAEHg9MAAIAEQGAsKACACIAAgARATC8ECAQN/IAAoAgAhACMAQYABayIEJAACfwJAAkAgASgCHCICQRBxRQRAIAJBIHENASAANQIAIAEQJAwDCyAAKAIAIQJBACEAA0AgACAEakH/AGogAkEPcSIDQTByIANB1wBqIANBCkkbOgAAIABBAWshACACQRBJIAJBBHYhAkUNAAsMAQsgACgCACECQQAhAANAIAAgBGpB/wBqIAJBD3EiA0EwciADQTdqIANBCkkbOgAAIABBAWshACACQRBJIAJBBHYhAkUNAAsgAEGAAWoiAkGBAU8EQCACQYABQaz1wAAQ6QEACyABQbz1wABBAiAAIARqQYABakEAIABrEBUMAQsgAEGAAWoiAkGBAU8EQCACQYABQaz1wAAQ6QEACyABQbz1wABBAiAAIARqQYABakEAIABrEBULIARBgAFqJAALkQUBB38CQAJ/AkAgAiIEIAAgAWtL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AIYIEAAIAAAAjggQAA4AAACcCBAABAAAAKAIEAALAAAAmAcQAAsAAAC0BxAADgAAAKsIEAANAAAAuAgQABAAAADICBAAEAAAANgIEAAKAAAA4ggQAA0AAADvCBAACQAAAPgIEAATAAAACwkQAAsAAAAWCRAACAAAAFByaW1hcnlBbHRlcm5hdGVBcHBsaWNhdGlvbkN1cnNvcmNvbHJvd3Zpc2libGVOb25lU29tZQAAJwAAAAQAAAAEAAAAJgAAACcAAAAEAAAABAAAAEMAAABEaXJ0eUxpbmVzAAAnAAAABAAAAAQAAABEAAAABgAAAAQAAAAFAAAAVwcQAF0HEABhBxAAY2Fubm90IGFjY2VzcyBhIFRocmVhZCBMb2NhbCBTdG9yYWdlIHZhbHVlIGR1cmluZyBvciBhZnRlciBkZXN0cnVjdGlvbgAARgAAAAAAAAABAAAARwAAAC9ydXN0Yy85YjAwOTU2ZTU2MDA5YmFiMmFhMTVkN2JmZjEwOTE2NTk5ZTNkNmQ2L2xpYnJhcnkvc3RkL3NyYy90aHJlYWQvbG9jYWwucnMAvAoQAE8AAAAEAQAAGgAAAAAAAAD//////////yALEABBuJbAAAvZFiBjYW4ndCBiZSByZXByZXNlbnRlZCBhcyBhIEphdmFTY3JpcHQgbnVtYmVyHAsQAAAAAAA4CxAALAAAAEgAAAAvaG9tZS9ydW5uZXIvLmNhcmdvL3JlZ2lzdHJ5L3NyYy9pbmRleC5jcmF0ZXMuaW8tNmYxN2QyMmJiYTE1MDAxZi9zZXJkZS13YXNtLWJpbmRnZW4tMC42LjUvc3JjL2xpYi5ycwAAAHgLEABlAAAANQAAAA4AAABjbG9zdXJlIGludm9rZWQgcmVjdXJzaXZlbHkgb3IgYWZ0ZXIgYmVpbmcgZHJvcHBlZC9ydXN0Yy85YjAwOTU2ZTU2MDA5YmFiMmFhMTVkN2JmZjEwOTE2NTk5ZTNkNmQ2L2xpYnJhcnkvYWxsb2Mvc3JjL3ZlYy9tb2QucnMAACIMEABMAAAAYAgAACQAAAAiDBAATAAAABoGAAAVAAAAL2hvbWUvcnVubmVyLy5jYXJnby9yZWdpc3RyeS9zcmMvaW5kZXguY3JhdGVzLmlvLTZmMTdkMjJiYmExNTAwMWYvYXZ0LTAuMTUuMC9zcmMvcGFyc2Vy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Ai8wMTIzAgICAgICNAICNTY3Ajg5Ojs8PT4/OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5QDk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTlBAgJCQwICREVGR0hJAko5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTlLAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICOTk5OUwCAgICAk1OT1ACAgJRAlJTAgICAgICAgICAgICAlRVAgJWAlcCAlhZWltcXV5fYGECYmMCZGVmZwJoAmlqa2wCAm1ub3ACcXICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnMCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0dQICAgICAgJ2dzk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5eDk5OTk5OTk5OXl6AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ7OTl8OTl9AgICAgICAgICAgICAgICAgICAn4CAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ/AgICgIGCAgICAgICAgICAgICAgICg4QCAgICAgICAgIChYZ1AgKHAgICiAICAgICAgKJigICAgICAgICAgICAgKLjAKNjgKPkJGSk5SVlgKXAgKYmZqbAgICAgICAgICAjk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OZwdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHQICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAJ0CAgICnp8CBAIFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdAgIeAgICAgICAh8gISIjAiQlJicoKQIqAgICAqChoqOkpaYup6ipqqusrTMCAgICAgKuAgI1NjcCODk6Ozw9Pq85OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTlMAgICAgKwTk+xhYZ1AgKHAgICiAICAgICAgKJigICAgICAgICAgICAgKLjLKzjgKPkJGSk5SVlgKXAgKYmZqbAgICAgICAgICAlVVdVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVRVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQBBvLvAAAspVVVVVRUAUFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQEAQe+7wAALxAEQQRBVVVVVVVdVVVVVVVVVVVVRVVUAAEBU9d1VVVVVVVVVVRUAAAAAAFVVVVX8XVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVBQAUABQEUFVVVVVVVVUVUVVVVVVVVVUAAAAAAABAVVVVVVVVVVVV1VdVVVVVVVVVVVVVVQUAAFRVVVVVVVVVVVVVVVVVFQAAVVVRVVVVVVUFEAAAAQFQVVVVVVVVVVVVVQFVVVVVVf////9/VVVVUFUAAFVVVVVVVVVVVVUFAEHAvcAAC5gEQFVVVVVVVVVVVVVVVVVFVAEAVFEBAFVVBVVVVVVVVVVRVVVVVVVVVVVVVVVVVVVEAVRVUVUVVVUFVVVVVVVVRUFVVVVVVVVVVVVVVVVVVVRBFRRQUVVVVVVVVVVQUVVVQVVVVVVVVVVVVVVVVVVVVAEQVFFVVVVVBVVVVVVVBQBRVVVVVVVVVVVVVVVVVVUEAVRVUVUBVVUFVVVVVVVVVUVVVVVVVVVVVVVVVVVVVUVUVVVRVRVVVVVVVVVVVVVVVFRVVVVVVVVVVVVVVVVVBFQFBFBVQVVVBVVVVVVVVVVRVVVVVVVVVVVVVVVVVVUURAUEUFVBVVUFVVVVVVVVVVBVVVVVVVVVVVVVVVVVFUQBVFVBVRVVVQVVVVVVVVVVUVVVVVVVVVVVVVVVVVVVVVVVRRUFRFUVVVVVVVVVVVVVVVVVVVVVVVVVVVVRAEBVVRUAQFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVEAAFRVVQBAVVVVVVVVVVVVVVVVVVVVVVVVUFVVVVVVVRFRVVVVVVVVVVVVVVVVVQEAAEAABFUBAAABAAAAAAAAAABUVUVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVAQQAQUFVVVVVVVVQBVRVVVUBVFVVRUFVUVVVVVFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVWqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqoAQYDCwAALkANVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQFVVVVVVVVVVVVVVVUFVFVVVVVVVQVVVVVVVVVVBVVVVVVVVVUFVVVVf//99//911931tXXVRAAUFVFAQAAVVdRVVVVVVVVVVVVVRUAVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVBVVVVVVVVVVVRVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVAFVRVRVUBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVxUUVVVVVVVVVVVVVVVVVVVFAEBEAQBUFQAAFFVVVVVVVVVVVVVVVQAAAAAAAABAVVVVVVVVVVVVVVVVAFVVVVVVVVVVVVVVVQAAUAVVVVVVVVVVVVUVAABVVVVQVVVVVVVVVQVQEFBVVVVVVVVVVVVVVVVVRVARUFVVVVVVVVVVVVVVVVVVAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVAAAAABABUUVVUUFVVVVVVVVVVVVVVVVVVVVVVAEGgxcAAC5MIVVUVAFVVVVVVVQVAVVVVVVVVVVVVVVVVAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQAAAAAAAAAAVFVVVVVVVVVVVfVVVVVpVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX9V9dVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVfVVVVVVVX1VVVVVVVVVVVVVVVf///1VVVVVVVVVVVVXVVVVVVdVVVVVdVfVVVVVVfVVfVXVVV1VVVVV1VfVddV1VXfVVVVVVVVVVV1VVVVVVVVVVd9XfVVVVVVVVVVVVVVVVVVVV/VVVVVVVVVdVVdVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV1VdVVVVVVVVVVVVVVVVXXVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUVUFVVVVVVVVVVVVVVVVVVVf3///////////////9fVdVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVAAAAAAAAAACqqqqqqqqaqqqqqqqqqqqqqqqqqqqqqqqqqqqqqlVVVaqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqWlVVVVVVVaqqqqqqqqqqqqqqqqqqCgCqqqpqqaqqqqqqqqqqqqqqqqqqqqqqqqqqaoGqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqVamqqqqqqqqqqqqqqaqqqqqqqqqqqqqqqqiqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqVVWVqqqqqqqqqqqqqqpqqqqqqqqqqqqqqlVVqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqlVVVVVVVVVVVVVVVVVVVVWqqqpWqqqqqqqqqqqqqqqqqmpVVVVVVVVVVVVVVVVVX1VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVRVAAABQVVVVVVVVVQVVVVVVVVVVVVVVVVVVVVVVVVVVVVBVVVVFRRVVVVVVVVVBVVRVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUFVVVVVVVQAAAABQVUUVVVVVVVVVVVVVBQBQVVVVVVUVAABQVVVVqqqqqqqqqlZAVVVVVVVVVVVVVVUVBVBQVVVVVVVVVVVVUVVVVVVVVVVVVVVVVVVVVVUBQEFBVVUVVVVUVVVVVVVVVVVVVVVUVVVVVVVVVVVVVVVVBBRUBVFVVVVVVVVVVVVVUFVFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUVRRVVVVVaqqqqqqqqqqqlVVVQAAAAAAQBUAQb/NwAAL4QxVVVVVVVVVVUVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUAAADwqqpaVQAAAACqqqqqqqqqqmqqqqqqaqpVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUVqaqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqVlVVVVVVVVVVVVVVVVVVBVRVVVVVVVVVVVVVVVVVVVWqalVVAABUVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVRVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQVAVQFBVQBVVVVVVVVVVVVVQBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUFVVVVVVVXVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVRVUVVVVVVVVVVVVVVVVVVVVVVVVVQFVVVVVVVVVVVVVVVVVVVVVVQUAAFRVVVVVVVVVVVVVVQVQVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUVVVVVVVVVVVVVVVVVUAAABAVVVVVVVVVVVVVRRUVRVQVVVVVVVVVVVVVVUVQEFVRVVVVVVVVVVVVVVVVVVVVUBVVVVVVVVVVRUAAQBUVVVVVVVVVVVVVVVVVVUVVVVVUFVVVVVVVVVVVVVVVQUAQAVVARRVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVRVQBFVFUVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVFRUAQFVVVVVVUFVVVVVVVVVVVVVVVVUVRFRVVVVVFVVVVQUAVABUVVVVVVVVVVVVVVVVVVVVVQAABURVVVVVVUVVVVVVVVVVVVVVVVVVVVVVVVVVVRQARBEEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUVBVBVEFRVVVVVVVVQVVVVVVVVVVVVVVVVVVVVVVVVVVUVAEARVFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUVUQAQVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQEFEABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVRUAAEFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVRVFQQRVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVAAVVVFVVVVVVVVUBAEBVVVVVVVVVVVUVAARAVRVVVQFAAVVVVVVVVVVVVVUAAAAAQFBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVAEAAEFVVVVVVVVVVVVVVVVVVVVVVVVVVBQAAAAAABQAEQVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQFARRAAAFVVVVVVVVVVVVVVVVVVVVVVVVARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVFVRVVUBVVVVVVVVVVVVVVVUFQFVEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQVAAAAUFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVAFRVVVVVVVVVVVVVVVVVVQBAVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVRVVVVVVVVVVVVVVVVVVVVUVQFVVVVVVVVVVVVVVVVVVVVVVVVWqVFVVWlVVVaqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqlVVqqqqqqqqqqqqqqqqqqqqqqqqqqqqWlVVVVVVVVVVVVWqqlZVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVWqqappqqqqqqqqqqpqVVVVZVVVVVVVVVVqWVVVVapVVaqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqVVVVVVVVVVVBAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVAEGr2sAAC3VQAAAAAABAVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVEVAFAAAAAEABAFVVVVVVVVUFUFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQVUVVVVVVVVVVVVVVVVVVUAQa3bwAALAkAVAEG728AAC8UGVFVRVVVVVFVVVVUVAAEAAABVVVVVVVVVVVVVVVVVVVVVVVVVVQBAAAAAABQAEARAVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUVVVVVVVVVVVVVVVVVVVVUAVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUAQFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQBAVVVVVVVVVVVVVVVVVVVXVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVdVVVVVVVVVVVVVVVVVVVVV1/f9/VVVVVVVVVVVVVVVVVVVVVVVV9f///////25VVVWqqrqqqqqq6vq/v1WqqlZVX1VVVapaVVVVVVVV//////////9XVVX9/9////////////////////////f//////1VVVf////////////9/1f9VVVX/////V1f//////////////////////3/3/////////////////////////////////////////////////////////////9f///////////////////9fVVXVf////////1VVVVV1VVVVVVVVfVVVVVdVVVVVVVVVVVVVVVVVVVVVVVVVVdX///////////////////////////9VVVVVVVVVVVVVVVX//////////////////////19VV3/9Vf9VVdVXVf//V1VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf///1VXVVVVVVVV//////////////9////f/////////////////////////////////////////////////////////////1VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX///9X//9XVf//////////////3/9fVfX///9V//9XVf//V1WqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqWlVVVVVVVVVVWZZVYaqlWapVVVVVVZVVVVVVVVVVlVVVAEGO4sAACwEDAEGc4sAAC4oqVVVVVVWVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUVAJZqWlpqqgVAplmVZVVVVVVVVVVVAAAAAFVWVVWpVlVVVVVVVVVVVVZVVVVVVVVVVQAAAAAAAAAAVFVVVZVZWVVVZVVVaVVVVVVVVVVVVVVVlVaVaqqqqlWqqlpVVVVZVaqqqlVVVVVlVVVaVVVVVaVlVlVVVZVVVVVVVVWmlpqWWVllqZaqqmZVqlVaWVVaVmVVVVVqqqWlWlVVVaWqWlVVWVlVVVlVVVVVVZVVVVVVVVVVVVVVVVVVVVVVVVVVVWVV9VVVVWlVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVWqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqmqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqlWqqqqqqqqqqqpVVVWqqqqqpVpVVZqqWlWlpVVaWqWWpVpVVVWlWlWVVVVVfVVpWaVVX1VmVVVVVVVVVVVmVf///1VVVZqaappVVVXVVVVVVdVVVaVdVfVVVVVVvVWvqrqqq6qqmlW6qvquuq5VXfVVVVVVVVVVV1VVVVVZVVVVd9XfVVVVVVVVVaWqqlVVVVVVVdVXVVVVVVVVVVVVVVVVV61aVVVVVVVVVVVVqqqqqqqqqmqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqoAAADAqqpaVQAAAACqqqqqqqqqqmqqqqqqaqpVVVVVVVVVVVVVVVUFVFVVVVVVVVVVVVVVVVVVVapqVVUAAFRZqqpqVaqqqqqqqqpaqqqqqqqqqqqqqqqqqqpaVaqqqqqqqqq6/v+/qqqqqlZVVVVVVVVVVVVVVVVV9f///////0pzVmFsdWUoKQAAAMAzEAAIAAAAyDMQAAEAAABUcmllZCB0byBzaHJpbmsgdG8gYSBsYXJnZXIgY2FwYWNpdHncMxAAJAAAAC9ydXN0Yy85YjAwOTU2ZTU2MDA5YmFiMmFhMTVkN2JmZjEwOTE2NTk5ZTNkNmQ2L2xpYnJhcnkvYWxsb2Mvc3JjL3Jhd192ZWMucnMINBAATAAAAOcBAAAJAAAAbnVsbCBwb2ludGVyIHBhc3NlZCB0byBydXN0cmVjdXJzaXZlIHVzZSBvZiBhbiBvYmplY3QgZGV0ZWN0ZWQgd2hpY2ggd291bGQgbGVhZCB0byB1bnNhZmUgYWxpYXNpbmcgaW4gcnVzdAAAVHJpZWQgdG8gc2hyaW5rIHRvIGEgbGFyZ2VyIGNhcGFjaXR50DQQACQAAAAvcnVzdGMvOWIwMDk1NmU1NjAwOWJhYjJhYTE1ZDdiZmYxMDkxNjU5OWUzZDZkNi9saWJyYXJ5L2FsbG9jL3NyYy9yYXdfdmVjLnJz/DQQAEwAAADnAQAACQAAAGAAAAAMAAAABAAAAGEAAABiAAAAEQAAAGUAAAAMAAAABAAAAGYAAABnAAAAaAAAAC9ydXN0L2RlcHMvZGxtYWxsb2MtMC4yLjYvc3JjL2RsbWFsbG9jLnJzYXNzZXJ0aW9uIGZhaWxlZDogcHNpemUgPj0gc2l6ZSArIG1pbl9vdmVyaGVhZACINRAAKQAAAKgEAAAJAAAAYXNzZXJ0aW9uIGZhaWxlZDogcHNpemUgPD0gc2l6ZSArIG1heF9vdmVyaGVhZAAAiDUQACkAAACuBAAADQAAAEFjY2Vzc0Vycm9ybWVtb3J5IGFsbG9jYXRpb24gb2YgIGJ5dGVzIGZhaWxlZAAAADs2EAAVAAAAUDYQAA0AAABsaWJyYXJ5L3N0ZC9zcmMvYWxsb2MucnNwNhAAGAAAAGIBAAAJAAAAbGlicmFyeS9zdGQvc3JjL3Bhbmlja2luZy5yc5g2EAAcAAAAhAIAAB4AAABlAAAADAAAAAQAAABpAAAAagAAAAgAAAAEAAAAawAAAGoAAAAIAAAABAAAAGwAAABtAAAAbgAAABAAAAAEAAAAbwAAAHAAAABxAAAAAAAAAAEAAAByAAAASGFzaCB0YWJsZSBjYXBhY2l0eSBvdmVyZmxvdxw3EAAcAAAAL3J1c3QvZGVwcy9oYXNoYnJvd24tMC4xNC4zL3NyYy9yYXcvbW9kLnJzAABANxAAKgAAAFYAAAAoAAAARXJyb3IAAABzAAAADAAAAAQAAAB0AAAAdQAAAHYAAABjYXBhY2l0eSBvdmVyZmxvdwAAAJw3EAARAAAAbGlicmFyeS9hbGxvYy9zcmMvcmF3X3ZlYy5yc7g3EAAcAAAAGQAAAAUAAABhIGZvcm1hdHRpbmcgdHJhaXQgaW1wbGVtZW50YXRpb24gcmV0dXJuZWQgYW4gZXJyb3IAdwAAAAAAAAABAAAAeAAAAGxpYnJhcnkvYWxsb2Mvc3JjL2ZtdC5ycyg4EAAY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");

        var loadVt = async () => {
                await __wbg_init(wasm_code);
                return exports;
            };

function parseNpt(time) {
  if (typeof time === "number") {
    return time;
  } else if (typeof time === "string") {
    return time.split(":").reverse().map(parseFloat).reduce((sum, n, i) => sum + n * Math.pow(60, i));
  } else {
    return undefined;
  }
}
function debounce(f, delay) {
  let timeout;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    clearTimeout(timeout);
    timeout = setTimeout(() => f.apply(this, args), delay);
  };
}
function throttle(f, interval) {
  let enableCall = true;
  return function () {
    if (!enableCall) return;
    enableCall = false;
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    f.apply(this, args);
    setTimeout(() => enableCall = true, interval);
  };
}

class Clock {
  constructor() {
    let speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1.0;
    this.speed = speed;
    this.startTime = performance.now();
  }
  getTime() {
    return this.speed * (performance.now() - this.startTime) / 1000.0;
  }
  setTime(time) {
    this.startTime = performance.now() - time / this.speed * 1000.0;
  }
}
class NullClock {
  constructor() {}
  getTime(_speed) {}
  setTime(_time) {}
}

const vt = loadVt(); // trigger async loading of wasm

class State {
  constructor(core) {
    this.core = core;
    this.driver = core.driver;
  }
  onEnter(data) {}
  init() {}
  play() {}
  pause() {}
  togglePlay() {}
  seek(where) {
    return false;
  }
  step() {}
  stop() {
    this.driver.stop();
  }
}
class UninitializedState extends State {
  async init() {
    try {
      await this.core.initializeDriver();
      return this.core.setState("idle");
    } catch (e) {
      this.core.setState("errored");
      throw e;
    }
  }
  async play() {
    this.core.dispatchEvent("play");
    const idleState = await this.init();
    await idleState.doPlay();
  }
  async togglePlay() {
    await this.play();
  }
  async seek(where) {
    const idleState = await this.init();
    return await idleState.seek(where);
  }
  async step() {
    const idleState = await this.init();
    await idleState.step();
  }
  stop() {}
}
class Idle extends State {
  onEnter(_ref) {
    let {
      reason,
      message
    } = _ref;
    this.core.dispatchEvent("idle", {
      message
    });
    if (reason === "paused") {
      this.core.dispatchEvent("pause");
    }
  }
  async play() {
    this.core.dispatchEvent("play");
    await this.doPlay();
  }
  async doPlay() {
    const stop = await this.driver.play();
    if (stop === true) {
      this.core.setState("playing");
    } else if (typeof stop === "function") {
      this.core.setState("playing");
      this.driver.stop = stop;
    }
  }
  async togglePlay() {
    await this.play();
  }
  seek(where) {
    return this.driver.seek(where);
  }
  step() {
    this.driver.step();
  }
}
class PlayingState extends State {
  onEnter() {
    this.core.dispatchEvent("playing");
  }
  pause() {
    if (this.driver.pause() === true) {
      this.core.setState("idle", {
        reason: "paused"
      });
    }
  }
  togglePlay() {
    this.pause();
  }
  seek(where) {
    return this.driver.seek(where);
  }
}
class LoadingState extends State {
  onEnter() {
    this.core.dispatchEvent("loading");
  }
}
class OfflineState extends State {
  onEnter(_ref2) {
    let {
      message
    } = _ref2;
    this.core.dispatchEvent("offline", {
      message
    });
  }
}
class EndedState extends State {
  onEnter(_ref3) {
    let {
      message
    } = _ref3;
    this.core.dispatchEvent("ended", {
      message
    });
  }
  async play() {
    this.core.dispatchEvent("play");
    if (await this.driver.restart()) {
      this.core.setState('playing');
    }
  }
  async togglePlay() {
    await this.play();
  }
  seek(where) {
    if (this.driver.seek(where) === true) {
      this.core.setState('idle');
      return true;
    }
    return false;
  }
}
class ErroredState extends State {
  onEnter() {
    this.core.dispatchEvent("errored");
  }
}
class Core {
  // public

  constructor(driverFn, opts) {
    this.logger = opts.logger;
    this.state = new UninitializedState(this);
    this.stateName = "uninitialized";
    this.driver = null;
    this.driverFn = driverFn;
    this.changedLines = new Set();
    this.cursor = undefined;
    this.duration = undefined;
    this.cols = opts.cols;
    this.rows = opts.rows;
    this.speed = opts.speed ?? 1.0;
    this.loop = opts.loop;
    this.idleTimeLimit = opts.idleTimeLimit;
    this.preload = opts.preload;
    this.startAt = parseNpt(opts.startAt);
    this.poster = this.parsePoster(opts.poster);
    this.markers = this.normalizeMarkers(opts.markers);
    this.pauseOnMarkers = opts.pauseOnMarkers;
    this.commandQueue = Promise.resolve();
    this.eventHandlers = new Map([["ended", []], ["errored", []], ["idle", []], ["init", []], ["input", []], ["loading", []], ["marker", []], ["offline", []], ["pause", []], ["play", []], ["playing", []], ["reset", []], ["resize", []], ["seeked", []], ["terminalUpdate", []]]);
  }
  addEventListener(eventName, handler) {
    this.eventHandlers.get(eventName).push(handler);
  }
  dispatchEvent(eventName) {
    let data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    for (const h of this.eventHandlers.get(eventName)) {
      h(data);
    }
  }
  async init() {
    this.wasm = await vt;
    const feed = this.feed.bind(this);
    const onInput = data => {
      this.dispatchEvent("input", {
        data
      });
    };
    const onMarker = _ref4 => {
      let {
        index,
        time,
        label
      } = _ref4;
      this.dispatchEvent("marker", {
        index,
        time,
        label
      });
    };
    const now = this.now.bind(this);
    const setTimeout = (f, t) => window.setTimeout(f, t / this.speed);
    const setInterval = (f, t) => window.setInterval(f, t / this.speed);
    const reset = this.resetVt.bind(this);
    const resize = this.resizeVt.bind(this);
    const setState = this.setState.bind(this);
    const posterTime = this.poster.type === "npt" ? this.poster.value : undefined;
    this.driver = this.driverFn({
      feed,
      onInput,
      onMarker,
      reset,
      resize,
      now,
      setTimeout,
      setInterval,
      setState,
      logger: this.logger
    }, {
      cols: this.cols,
      rows: this.rows,
      idleTimeLimit: this.idleTimeLimit,
      startAt: this.startAt,
      loop: this.loop,
      posterTime: posterTime,
      markers: this.markers,
      pauseOnMarkers: this.pauseOnMarkers
    });
    if (typeof this.driver === "function") {
      this.driver = {
        play: this.driver
      };
    }
    if (this.preload || posterTime !== undefined) {
      this.withState(state => state.init());
    }
    const poster = this.poster.type === "text" ? this.renderPoster(this.poster.value) : undefined;
    const config = {
      isPausable: !!this.driver.pause,
      isSeekable: !!this.driver.seek,
      poster
    };
    if (this.driver.init === undefined) {
      this.driver.init = () => {
        return {};
      };
    }
    if (this.driver.pause === undefined) {
      this.driver.pause = () => {};
    }
    if (this.driver.seek === undefined) {
      this.driver.seek = where => false;
    }
    if (this.driver.step === undefined) {
      this.driver.step = () => {};
    }
    if (this.driver.stop === undefined) {
      this.driver.stop = () => {};
    }
    if (this.driver.restart === undefined) {
      this.driver.restart = () => {};
    }
    if (this.driver.getCurrentTime === undefined) {
      const play = this.driver.play;
      let clock = new NullClock();
      this.driver.play = () => {
        clock = new Clock(this.speed);
        return play();
      };
      this.driver.getCurrentTime = () => clock.getTime();
    }
    return config;
  }
  play() {
    return this.withState(state => state.play());
  }
  pause() {
    return this.withState(state => state.pause());
  }
  togglePlay() {
    return this.withState(state => state.togglePlay());
  }
  seek(where) {
    return this.withState(async state => {
      if (await state.seek(where)) {
        this.dispatchEvent("seeked");
      }
    });
  }
  step() {
    return this.withState(state => state.step());
  }
  stop() {
    return this.withState(state => state.stop());
  }
  withState(f) {
    return this.enqueueCommand(() => f(this.state));
  }
  enqueueCommand(f) {
    this.commandQueue = this.commandQueue.then(f);
    return this.commandQueue;
  }
  getChangedLines() {
    if (this.changedLines.size > 0) {
      const lines = new Map();
      const rows = this.vt.rows;
      for (const i of this.changedLines) {
        if (i < rows) {
          lines.set(i, {
            id: i,
            segments: this.vt.getLine(i)
          });
        }
      }
      this.changedLines.clear();
      return lines;
    }
  }
  getCursor() {
    if (this.cursor === undefined && this.vt) {
      this.cursor = this.vt.getCursor() ?? false;
    }
    return this.cursor;
  }
  getCurrentTime() {
    return this.driver.getCurrentTime();
  }
  getRemainingTime() {
    if (typeof this.duration === "number") {
      return this.duration - Math.min(this.getCurrentTime(), this.duration);
    }
  }
  getProgress() {
    if (typeof this.duration === "number") {
      return Math.min(this.getCurrentTime(), this.duration) / this.duration;
    }
  }
  getDuration() {
    return this.duration;
  }

  // private

  setState(newState) {
    let data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (this.stateName === newState) return this.state;
    this.stateName = newState;
    if (newState === "playing") {
      this.state = new PlayingState(this);
    } else if (newState === "idle") {
      this.state = new Idle(this);
    } else if (newState === "loading") {
      this.state = new LoadingState(this);
    } else if (newState === "ended") {
      this.state = new EndedState(this);
    } else if (newState === "offline") {
      this.state = new OfflineState(this);
    } else if (newState === "errored") {
      this.state = new ErroredState(this);
    } else {
      throw `invalid state: ${newState}`;
    }
    this.state.onEnter(data);
    return this.state;
  }
  feed(data) {
    this.doFeed(data);
    this.dispatchEvent("terminalUpdate");
  }
  doFeed(data) {
    const affectedLines = this.vt.feed(data);
    affectedLines.forEach(i => this.changedLines.add(i));
    this.cursor = undefined;
  }
  now() {
    return performance.now() * this.speed;
  }
  async initializeDriver() {
    const meta = await this.driver.init();
    this.cols = this.cols ?? meta.cols ?? 80;
    this.rows = this.rows ?? meta.rows ?? 24;
    this.duration = this.duration ?? meta.duration;
    this.markers = this.normalizeMarkers(meta.markers) ?? this.markers ?? [];
    if (this.cols === 0) {
      this.cols = 80;
    }
    if (this.rows === 0) {
      this.rows = 24;
    }
    this.initializeVt(this.cols, this.rows);
    const poster = meta.poster !== undefined ? this.renderPoster(meta.poster) : undefined;
    this.dispatchEvent("init", {
      cols: this.cols,
      rows: this.rows,
      duration: this.duration,
      markers: this.markers,
      theme: meta.theme,
      poster
    });
  }
  resetVt(cols, rows) {
    let init = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
    let theme = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
    this.cols = cols;
    this.rows = rows;
    this.cursor = undefined;
    this.initializeVt(cols, rows);
    if (init !== undefined && init !== "") {
      this.doFeed(init);
    }
    this.dispatchEvent("reset", {
      cols,
      rows,
      theme
    });
  }
  resizeVt(cols, rows) {
    if (cols === this.vt.cols && rows === this.vt.rows) return;
    const affectedLines = this.vt.resize(cols, rows);
    affectedLines.forEach(i => this.changedLines.add(i));
    this.cursor = undefined;
    this.vt.cols = cols;
    this.vt.rows = rows;
    this.logger.debug(`core: vt resize (${cols}x${rows})`);
    this.dispatchEvent("resize", {
      cols,
      rows
    });
  }
  initializeVt(cols, rows) {
    this.logger.debug(`core: vt init (${cols}x${rows})`);
    this.vt = this.wasm.create(cols, rows, true, 100);
    this.vt.cols = cols;
    this.vt.rows = rows;
    this.changedLines.clear();
    for (let i = 0; i < rows; i++) {
      this.changedLines.add(i);
    }
  }
  parsePoster(poster) {
    if (typeof poster !== "string") return {};
    if (poster.substring(0, 16) == "data:text/plain,") {
      return {
        type: "text",
        value: [poster.substring(16)]
      };
    } else if (poster.substring(0, 4) == "npt:") {
      return {
        type: "npt",
        value: parseNpt(poster.substring(4))
      };
    }
    return {};
  }
  renderPoster(poster) {
    const cols = this.cols ?? 80;
    const rows = this.rows ?? 24;
    this.logger.debug(`core: poster init (${cols}x${rows})`);
    const vt = this.wasm.create(cols, rows, false, 0);
    poster.forEach(text => vt.feed(text));
    const cursor = vt.getCursor() ?? false;
    const lines = [];
    for (let i = 0; i < rows; i++) {
      lines.push({
        id: i,
        segments: vt.getLine(i)
      });
    }
    return {
      cursor,
      lines
    };
  }
  normalizeMarkers(markers) {
    if (Array.isArray(markers)) {
      return markers.map(m => typeof m === "number" ? [m, ""] : m);
    }
  }
}

const $RAW = Symbol("store-raw"),
  $NODE = Symbol("store-node"),
  $NAME = Symbol("store-name");
function wrap$1(value, name) {
  let p = value[$PROXY];
  if (!p) {
    Object.defineProperty(value, $PROXY, {
      value: p = new Proxy(value, proxyTraps$1)
    });
    if (!Array.isArray(value)) {
      const keys = Object.keys(value),
        desc = Object.getOwnPropertyDescriptors(value);
      for (let i = 0, l = keys.length; i < l; i++) {
        const prop = keys[i];
        if (desc[prop].get) {
          Object.defineProperty(value, prop, {
            enumerable: desc[prop].enumerable,
            get: desc[prop].get.bind(p)
          });
        }
      }
    }
  }
  return p;
}
function isWrappable(obj) {
  let proto;
  return obj != null && typeof obj === "object" && (obj[$PROXY] || !(proto = Object.getPrototypeOf(obj)) || proto === Object.prototype || Array.isArray(obj));
}
function unwrap(item, set = new Set()) {
  let result, unwrapped, v, prop;
  if (result = item != null && item[$RAW]) return result;
  if (!isWrappable(item) || set.has(item)) return item;
  if (Array.isArray(item)) {
    if (Object.isFrozen(item)) item = item.slice(0);else set.add(item);
    for (let i = 0, l = item.length; i < l; i++) {
      v = item[i];
      if ((unwrapped = unwrap(v, set)) !== v) item[i] = unwrapped;
    }
  } else {
    if (Object.isFrozen(item)) item = Object.assign({}, item);else set.add(item);
    const keys = Object.keys(item),
      desc = Object.getOwnPropertyDescriptors(item);
    for (let i = 0, l = keys.length; i < l; i++) {
      prop = keys[i];
      if (desc[prop].get) continue;
      v = item[prop];
      if ((unwrapped = unwrap(v, set)) !== v) item[prop] = unwrapped;
    }
  }
  return item;
}
function getDataNodes(target) {
  let nodes = target[$NODE];
  if (!nodes) Object.defineProperty(target, $NODE, {
    value: nodes = {}
  });
  return nodes;
}
function getDataNode(nodes, property, value) {
  return nodes[property] || (nodes[property] = createDataNode(value));
}
function proxyDescriptor$1(target, property) {
  const desc = Reflect.getOwnPropertyDescriptor(target, property);
  if (!desc || desc.get || !desc.configurable || property === $PROXY || property === $NODE || property === $NAME) return desc;
  delete desc.value;
  delete desc.writable;
  desc.get = () => target[$PROXY][property];
  return desc;
}
function trackSelf(target) {
  if (getListener()) {
    const nodes = getDataNodes(target);
    (nodes._ || (nodes._ = createDataNode()))();
  }
}
function ownKeys(target) {
  trackSelf(target);
  return Reflect.ownKeys(target);
}
function createDataNode(value) {
  const [s, set] = createSignal(value, {
    equals: false,
    internal: true
  });
  s.$ = set;
  return s;
}
const proxyTraps$1 = {
  get(target, property, receiver) {
    if (property === $RAW) return target;
    if (property === $PROXY) return receiver;
    if (property === $TRACK) {
      trackSelf(target);
      return receiver;
    }
    const nodes = getDataNodes(target);
    const tracked = nodes.hasOwnProperty(property);
    let value = tracked ? nodes[property]() : target[property];
    if (property === $NODE || property === "__proto__") return value;
    if (!tracked) {
      const desc = Object.getOwnPropertyDescriptor(target, property);
      if (getListener() && (typeof value !== "function" || target.hasOwnProperty(property)) && !(desc && desc.get)) value = getDataNode(nodes, property, value)();
    }
    return isWrappable(value) ? wrap$1(value) : value;
  },
  has(target, property) {
    if (property === $RAW || property === $PROXY || property === $TRACK || property === $NODE || property === "__proto__") return true;
    this.get(target, property, target);
    return property in target;
  },
  set() {
    return true;
  },
  deleteProperty() {
    return true;
  },
  ownKeys: ownKeys,
  getOwnPropertyDescriptor: proxyDescriptor$1
};
function setProperty(state, property, value, deleting = false) {
  if (!deleting && state[property] === value) return;
  const prev = state[property],
    len = state.length;
  if (value === undefined) delete state[property];else state[property] = value;
  let nodes = getDataNodes(state),
    node;
  if (node = getDataNode(nodes, property, prev)) node.$(() => value);
  if (Array.isArray(state) && state.length !== len) (node = getDataNode(nodes, "length", len)) && node.$(state.length);
  (node = nodes._) && node.$();
}
function mergeStoreNode(state, value) {
  const keys = Object.keys(value);
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    setProperty(state, key, value[key]);
  }
}
function updateArray(current, next) {
  if (typeof next === "function") next = next(current);
  next = unwrap(next);
  if (Array.isArray(next)) {
    if (current === next) return;
    let i = 0,
      len = next.length;
    for (; i < len; i++) {
      const value = next[i];
      if (current[i] !== value) setProperty(current, i, value);
    }
    setProperty(current, "length", len);
  } else mergeStoreNode(current, next);
}
function updatePath(current, path, traversed = []) {
  let part,
    prev = current;
  if (path.length > 1) {
    part = path.shift();
    const partType = typeof part,
      isArray = Array.isArray(current);
    if (Array.isArray(part)) {
      for (let i = 0; i < part.length; i++) {
        updatePath(current, [part[i]].concat(path), traversed);
      }
      return;
    } else if (isArray && partType === "function") {
      for (let i = 0; i < current.length; i++) {
        if (part(current[i], i)) updatePath(current, [i].concat(path), traversed);
      }
      return;
    } else if (isArray && partType === "object") {
      const {
        from = 0,
        to = current.length - 1,
        by = 1
      } = part;
      for (let i = from; i <= to; i += by) {
        updatePath(current, [i].concat(path), traversed);
      }
      return;
    } else if (path.length > 1) {
      updatePath(current[part], path, [part].concat(traversed));
      return;
    }
    prev = current[part];
    traversed = [part].concat(traversed);
  }
  let value = path[0];
  if (typeof value === "function") {
    value = value(prev, traversed);
    if (value === prev) return;
  }
  if (part === undefined && value == undefined) return;
  value = unwrap(value);
  if (part === undefined || isWrappable(prev) && isWrappable(value) && !Array.isArray(value)) {
    mergeStoreNode(prev, value);
  } else setProperty(current, part, value);
}
function createStore(...[store, options]) {
  const unwrappedStore = unwrap(store || {});
  const isArray = Array.isArray(unwrappedStore);
  const wrappedStore = wrap$1(unwrappedStore);
  function setStore(...args) {
    batch(() => {
      isArray && args.length === 1 ? updateArray(unwrappedStore, args[0]) : updatePath(unwrappedStore, args);
    });
  }
  return [wrappedStore, setStore];
}

const $ROOT = Symbol("store-root");
function applyState(target, parent, property, merge, key) {
  const previous = parent[property];
  if (target === previous) return;
  if (!isWrappable(target) || !isWrappable(previous) || key && target[key] !== previous[key]) {
    if (target !== previous) {
      if (property === $ROOT) return target;
      setProperty(parent, property, target);
    }
    return;
  }
  if (Array.isArray(target)) {
    if (target.length && previous.length && (!merge || key && target[0] && target[0][key] != null)) {
      let i, j, start, end, newEnd, item, newIndicesNext, keyVal;
      for (start = 0, end = Math.min(previous.length, target.length); start < end && (previous[start] === target[start] || key && previous[start] && target[start] && previous[start][key] === target[start][key]); start++) {
        applyState(target[start], previous, start, merge, key);
      }
      const temp = new Array(target.length),
        newIndices = new Map();
      for (end = previous.length - 1, newEnd = target.length - 1; end >= start && newEnd >= start && (previous[end] === target[newEnd] || key && previous[start] && target[start] && previous[end][key] === target[newEnd][key]); end--, newEnd--) {
        temp[newEnd] = previous[end];
      }
      if (start > newEnd || start > end) {
        for (j = start; j <= newEnd; j++) setProperty(previous, j, target[j]);
        for (; j < target.length; j++) {
          setProperty(previous, j, temp[j]);
          applyState(target[j], previous, j, merge, key);
        }
        if (previous.length > target.length) setProperty(previous, "length", target.length);
        return;
      }
      newIndicesNext = new Array(newEnd + 1);
      for (j = newEnd; j >= start; j--) {
        item = target[j];
        keyVal = key && item ? item[key] : item;
        i = newIndices.get(keyVal);
        newIndicesNext[j] = i === undefined ? -1 : i;
        newIndices.set(keyVal, j);
      }
      for (i = start; i <= end; i++) {
        item = previous[i];
        keyVal = key && item ? item[key] : item;
        j = newIndices.get(keyVal);
        if (j !== undefined && j !== -1) {
          temp[j] = previous[i];
          j = newIndicesNext[j];
          newIndices.set(keyVal, j);
        }
      }
      for (j = start; j < target.length; j++) {
        if (j in temp) {
          setProperty(previous, j, temp[j]);
          applyState(target[j], previous, j, merge, key);
        } else setProperty(previous, j, target[j]);
      }
    } else {
      for (let i = 0, len = target.length; i < len; i++) {
        applyState(target[i], previous, i, merge, key);
      }
    }
    if (previous.length > target.length) setProperty(previous, "length", target.length);
    return;
  }
  const targetKeys = Object.keys(target);
  for (let i = 0, len = targetKeys.length; i < len; i++) {
    applyState(target[targetKeys[i]], previous, targetKeys[i], merge, key);
  }
  const previousKeys = Object.keys(previous);
  for (let i = 0, len = previousKeys.length; i < len; i++) {
    if (target[previousKeys[i]] === undefined) setProperty(previous, previousKeys[i], undefined);
  }
}
function reconcile(value, options = {}) {
  const {
      merge,
      key = "id"
    } = options,
    v = unwrap(value);
  return state => {
    if (!isWrappable(state) || !isWrappable(v)) return v;
    const res = applyState(v, {
      [$ROOT]: state
    }, $ROOT, merge, key);
    return res === undefined ? state : res;
  };
}

const _tmpl$$9 = /*#__PURE__*/template(`<span></span>`);
var Segment = (props => {
  const codePoint = createMemo(() => {
    if (props.text.length == 1) {
      const cp = props.text.codePointAt(0);
      if (cp >= 0x2580 && cp <= 0x259f || cp == 0xe0b0 || cp == 0xe0b2) {
        return cp;
      }
    }
  });
  const text = createMemo(() => codePoint() ? " " : props.text);
  const style$1 = createMemo(() => buildStyle(props.pen, props.offset, props.width));
  const className$1 = createMemo(() => buildClassName(props.pen, codePoint(), props.extraClass));
  return (() => {
    const _el$ = _tmpl$$9.cloneNode(true);
    insert(_el$, text);
    createRenderEffect(_p$ => {
      const _v$ = className$1(),
        _v$2 = style$1();
      _v$ !== _p$._v$ && className(_el$, _p$._v$ = _v$);
      _p$._v$2 = style(_el$, _v$2, _p$._v$2);
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined
    });
    return _el$;
  })();
});
function buildClassName(attrs, codePoint, extraClass) {
  const fgClass = colorClass(attrs.get("fg"), attrs.get("bold"), "fg-");
  const bgClass = colorClass(attrs.get("bg"), false, "bg-");
  let cls = extraClass ?? "";
  if (codePoint !== undefined) {
    cls += ` cp-${codePoint.toString(16)}`;
  }
  if (fgClass) {
    cls += " " + fgClass;
  }
  if (bgClass) {
    cls += " " + bgClass;
  }
  if (attrs.has("bold")) {
    cls += " ap-bright";
  }
  if (attrs.has("faint")) {
    cls += " ap-faint";
  }
  if (attrs.has("italic")) {
    cls += " ap-italic";
  }
  if (attrs.has("underline")) {
    cls += " ap-underline";
  }
  if (attrs.has("blink")) {
    cls += " ap-blink";
  }
  if (attrs.get("inverse")) {
    cls += " ap-inverse";
  }
  return cls;
}
function colorClass(color, intense, prefix) {
  if (typeof color === "number") {
    if (intense && color < 8) {
      color += 8;
    }
    return `${prefix}${color}`;
  }
}
function buildStyle(attrs, offset, width) {
  const fg = attrs.get("fg");
  const bg = attrs.get("bg");
  let style = {
    "--offset": offset,
    width: `${width + 0.01}ch`
  };
  if (typeof fg === "string") {
    style["--fg"] = fg;
  }
  if (typeof bg === "string") {
    style["--bg"] = bg;
  }
  return style;
}

const _tmpl$$8 = /*#__PURE__*/template(`<span class="ap-line" role="paragraph"></span>`);
var Line = (props => {
  const segments = () => {
    if (typeof props.cursor === "number") {
      const segs = [];
      let len = 0;
      let i = 0;
      while (i < props.segments.length && len + props.segments[i].text.length - 1 < props.cursor) {
        const seg = props.segments[i];
        segs.push(seg);
        len += seg.text.length;
        i++;
      }
      if (i < props.segments.length) {
        const seg = props.segments[i];
        const pos = props.cursor - len;
        if (pos > 0) {
          segs.push({
            ...seg,
            text: seg.text.substring(0, pos)
          });
        }
        segs.push({
          ...seg,
          text: seg.text[pos],
          offset: seg.offset + pos,
          extraClass: "ap-cursor"
        });
        if (pos < seg.text.length - 1) {
          segs.push({
            ...seg,
            text: seg.text.substring(pos + 1),
            offset: seg.offset + pos + 1
          });
        }
        i++;
        while (i < props.segments.length) {
          const seg = props.segments[i];
          segs.push(seg);
          i++;
        }
      }
      return segs;
    } else {
      return props.segments;
    }
  };
  return (() => {
    const _el$ = _tmpl$$8.cloneNode(true);
    insert(_el$, createComponent(Index, {
      get each() {
        return segments();
      },
      children: s => createComponent(Segment, mergeProps(s))
    }));
    return _el$;
  })();
});

const _tmpl$$7 = /*#__PURE__*/template(`<pre class="ap-terminal" aria-live="polite" tabindex="0"></pre>`);
var Terminal = (props => {
  const lineHeight = () => props.lineHeight ?? 1.3333333333;
  const style$1 = createMemo(() => {
    return {
      width: `${props.cols}ch`,
      height: `${lineHeight() * props.rows}em`,
      "font-size": `${(props.scale || 1.0) * 100}%`,
      "font-family": props.fontFamily,
      "--term-line-height": `${lineHeight()}em`,
      "--term-cols": props.cols
    };
  });
  const cursorCol = createMemo(() => props.cursor?.[0]);
  const cursorRow = createMemo(() => props.cursor?.[1]);
  return (() => {
    const _el$ = _tmpl$$7.cloneNode(true);
    const _ref$ = props.ref;
    typeof _ref$ === "function" ? use(_ref$, _el$) : props.ref = _el$;
    insert(_el$, createComponent(For, {
      get each() {
        return props.lines;
      },
      children: (line, i) => createComponent(Line, {
        get segments() {
          return line.segments;
        },
        get cursor() {
          return createMemo(() => i() === cursorRow())() ? cursorCol() : null;
        }
      })
    }));
    createRenderEffect(_p$ => {
      const _v$ = !!(props.blink || props.cursorHold),
        _v$2 = !!props.blink,
        _v$3 = style$1();
      _v$ !== _p$._v$ && _el$.classList.toggle("ap-cursor-on", _p$._v$ = _v$);
      _v$2 !== _p$._v$2 && _el$.classList.toggle("ap-blink", _p$._v$2 = _v$2);
      _p$._v$3 = style(_el$, _v$3, _p$._v$3);
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined
    });
    return _el$;
  })();
});

const _tmpl$$6 = /*#__PURE__*/template(`<svg version="1.1" viewBox="0 0 12 12" class="ap-icon" aria-label="Pause" role="button"><path d="M1,0 L4,0 L4,12 L1,12 Z"></path><path d="M8,0 L11,0 L11,12 L8,12 Z"></path></svg>`),
  _tmpl$2 = /*#__PURE__*/template(`<svg version="1.1" viewBox="0 0 12 12" class="ap-icon" aria-label="Play" role="button"><path d="M1,0 L11,6 L1,12 Z"></path></svg>`),
  _tmpl$3 = /*#__PURE__*/template(`<span class="ap-playback-button" tabindex="0"></span>`),
  _tmpl$4 = /*#__PURE__*/template(`<span class="ap-progressbar"><span class="ap-bar"><span class="ap-gutter ap-gutter-empty"></span><span class="ap-gutter ap-gutter-full"></span></span></span>`),
  _tmpl$5 = /*#__PURE__*/template(`<div class="ap-control-bar"><span class="ap-timer" aria-readonly="true" role="textbox" tabindex="0"><span class="ap-time-elapsed"></span><span class="ap-time-remaining"></span></span><span class="ap-fullscreen-button ap-tooltip-container" aria-label="Toggle fullscreen mode" role="button" tabindex="0"><svg version="1.1" viewBox="0 0 12 12" class="ap-icon ap-icon-fullscreen-on"><path d="M12,0 L7,0 L9,2 L7,4 L8,5 L10,3 L12,5 Z"></path><path d="M0,12 L0,7 L2,9 L4,7 L5,8 L3,10 L5,12 Z"></path></svg><svg version="1.1" viewBox="0 0 12 12" class="ap-icon ap-icon-fullscreen-off"><path d="M7,5 L7,0 L9,2 L11,0 L12,1 L10,3 L12,5 Z"></path><path d="M5,7 L0,7 L2,9 L0,11 L1,12 L3,10 L5,12 Z"></path></svg><span class="ap-tooltip">Fullscreen (f)</span></span></div>`),
  _tmpl$6 = /*#__PURE__*/template(`<span class="ap-marker-container ap-tooltip-container"><span class="ap-marker"></span><span class="ap-tooltip"></span></span>`);
function formatTime(seconds) {
  let s = Math.floor(seconds);
  const d = Math.floor(s / 86400);
  s %= 86400;
  const h = Math.floor(s / 3600);
  s %= 3600;
  const m = Math.floor(s / 60);
  s %= 60;
  if (d > 0) {
    return `${zeroPad(d)}:${zeroPad(h)}:${zeroPad(m)}:${zeroPad(s)}`;
  } else if (h > 0) {
    return `${zeroPad(h)}:${zeroPad(m)}:${zeroPad(s)}`;
  } else {
    return `${zeroPad(m)}:${zeroPad(s)}`;
  }
}
function zeroPad(n) {
  return n < 10 ? `0${n}` : n.toString();
}
var ControlBar = (props => {
  const e = f => {
    return e => {
      e.preventDefault();
      f(e);
    };
  };
  const currentTime = () => typeof props.currentTime === "number" ? formatTime(props.currentTime) : "--:--";
  const remainingTime = () => typeof props.remainingTime === "number" ? "-" + formatTime(props.remainingTime) : currentTime();
  const markers = createMemo(() => typeof props.duration === "number" ? props.markers.filter(m => m[0] < props.duration) : []);
  const markerPosition = m => `${m[0] / props.duration * 100}%`;
  const markerText = m => {
    if (m[1] === "") {
      return formatTime(m[0]);
    } else {
      return `${formatTime(m[0])} - ${m[1]}`;
    }
  };
  const isPastMarker = m => typeof props.currentTime === "number" ? m[0] <= props.currentTime : false;
  const gutterBarStyle = () => {
    return {
      transform: `scaleX(${props.progress || 0}`
    };
  };
  const calcPosition = e => {
    const barWidth = e.currentTarget.offsetWidth;
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const pos = Math.max(0, mouseX / barWidth);
    return `${pos * 100}%`;
  };
  const [mouseDown, setMouseDown] = createSignal(false);
  const throttledSeek = throttle(props.onSeekClick, 50);
  const onMouseDown = e => {
    if (e._marker) return;
    if (e.altKey || e.shiftKey || e.metaKey || e.ctrlKey || e.button !== 0) return;
    setMouseDown(true);
    props.onSeekClick(calcPosition(e));
  };
  const seekToMarker = index => {
    return e(() => {
      props.onSeekClick({
        marker: index
      });
    });
  };
  const onMove = e => {
    if (e.altKey || e.shiftKey || e.metaKey || e.ctrlKey) return;
    if (mouseDown()) {
      throttledSeek(calcPosition(e));
    }
  };
  const onDocumentMouseUp = () => {
    setMouseDown(false);
  };
  document.addEventListener("mouseup", onDocumentMouseUp);
  onCleanup(() => {
    document.removeEventListener("mouseup", onDocumentMouseUp);
  });
  return (() => {
    const _el$ = _tmpl$5.cloneNode(true),
      _el$5 = _el$.firstChild,
      _el$6 = _el$5.firstChild,
      _el$7 = _el$6.nextSibling,
      _el$12 = _el$5.nextSibling;
    const _ref$ = props.ref;
    typeof _ref$ === "function" ? use(_ref$, _el$) : props.ref = _el$;
    insert(_el$, createComponent(Show, {
      get when() {
        return props.isPausable;
      },
      get children() {
        const _el$2 = _tmpl$3.cloneNode(true);
        addEventListener(_el$2, "click", e(props.onPlayClick), true);
        insert(_el$2, createComponent(Switch, {
          get children() {
            return [createComponent(Match, {
              get when() {
                return props.isPlaying;
              },
              get children() {
                return _tmpl$$6.cloneNode(true);
              }
            }), createComponent(Match, {
              get when() {
                return !props.isPlaying;
              },
              get children() {
                return _tmpl$2.cloneNode(true);
              }
            })];
          }
        }));
        return _el$2;
      }
    }), _el$5);
    insert(_el$6, currentTime);
    insert(_el$7, remainingTime);
    insert(_el$, createComponent(Show, {
      get when() {
        return typeof props.progress === "number" || props.isSeekable;
      },
      get children() {
        const _el$8 = _tmpl$4.cloneNode(true),
          _el$9 = _el$8.firstChild,
          _el$10 = _el$9.firstChild,
          _el$11 = _el$10.nextSibling;
        _el$9.$$mousemove = onMove;
        _el$9.$$mousedown = onMouseDown;
        insert(_el$9, createComponent(For, {
          get each() {
            return markers();
          },
          children: (m, i) => (() => {
            const _el$13 = _tmpl$6.cloneNode(true),
              _el$14 = _el$13.firstChild,
              _el$15 = _el$14.nextSibling;
            _el$13.$$mousedown = e => {
              e._marker = true;
            };
            addEventListener(_el$13, "click", seekToMarker(i()), true);
            insert(_el$15, () => markerText(m));
            createRenderEffect(_p$ => {
              const _v$ = markerPosition(m),
                _v$2 = !!isPastMarker(m);
              _v$ !== _p$._v$ && _el$13.style.setProperty("left", _p$._v$ = _v$);
              _v$2 !== _p$._v$2 && _el$14.classList.toggle("ap-marker-past", _p$._v$2 = _v$2);
              return _p$;
            }, {
              _v$: undefined,
              _v$2: undefined
            });
            return _el$13;
          })()
        }), null);
        createRenderEffect(_$p => style(_el$11, gutterBarStyle(), _$p));
        return _el$8;
      }
    }), _el$12);
    addEventListener(_el$12, "click", e(props.onFullscreenClick), true);
    createRenderEffect(() => _el$.classList.toggle("ap-seekable", !!props.isSeekable));
    return _el$;
  })();
});
delegateEvents(["click", "mousedown", "mousemove"]);

const _tmpl$$5 = /*#__PURE__*/template(`<div class="ap-overlay ap-overlay-error"><span>💥</span></div>`);
var ErrorOverlay = (props => {
  return _tmpl$$5.cloneNode(true);
});

const _tmpl$$4 = /*#__PURE__*/template(`<div class="ap-overlay ap-overlay-loading"><span class="ap-loader"></span></div>`);
var LoaderOverlay = (props => {
  return _tmpl$$4.cloneNode(true);
});

const _tmpl$$3 = /*#__PURE__*/template(`<div class="ap-overlay ap-overlay-info"><span></span></div>`);
var InfoOverlay = (props => {
  const style$1 = () => {
    return {
      "font-family": props.fontFamily
    };
  };
  return (() => {
    const _el$ = _tmpl$$3.cloneNode(true),
      _el$2 = _el$.firstChild;
    insert(_el$2, () => props.message);
    createRenderEffect(_$p => style(_el$2, style$1(), _$p));
    return _el$;
  })();
});

const _tmpl$$2 = /*#__PURE__*/template(`<div class="ap-overlay ap-overlay-start"><div class="ap-play-button"><div><span><svg version="1.1" viewBox="0 0 1000.0 1000.0" class="ap-icon"><defs><mask id="small-triangle-mask"><rect width="100%" height="100%" fill="white"></rect><polygon points="700.0 500.0, 400.00000000000006 326.7949192431122, 399.9999999999999 673.2050807568877" fill="black"></polygon></mask></defs><polygon points="1000.0 500.0, 250.0000000000001 66.98729810778059, 249.99999999999977 933.0127018922192" mask="url(#small-triangle-mask)" fill="white" class="ap-play-btn-fill"></polygon><polyline points="673.2050807568878 400.0, 326.7949192431123 600.0" stroke="white" stroke-width="90" class="ap-play-btn-stroke"></polyline></svg></span></div></div></div>`);
var StartOverlay = (props => {
  const e = f => {
    return e => {
      e.preventDefault();
      f(e);
    };
  };
  return (() => {
    const _el$ = _tmpl$$2.cloneNode(true);
    addEventListener(_el$, "click", e(props.onClick), true);
    return _el$;
  })();
});
delegateEvents(["click"]);

const _tmpl$$1 = /*#__PURE__*/template(`<div class="ap-overlay ap-overlay-help"><div><div><p>Keyboard shortcuts</p><ul><li><kbd>space</kbd> - pause / resume</li><li><kbd>f</kbd> - toggle fullscreen mode</li><li><kbd>←</kbd> / <kbd>→</kbd> - rewind / fast-forward by 5 seconds</li><li><kbd>Shift</kbd> + <kbd>←</kbd> / <kbd>→</kbd> - rewind / fast-forward by 10%</li><li><kbd>[</kbd> / <kbd>]</kbd> - jump to the previous / next marker</li><li><kbd>0</kbd>, <kbd>1</kbd>, <kbd>2</kbd> ... <kbd>9</kbd> - jump to 0%, 10%, 20% ... 90%</li><li><kbd>.</kbd> - step through a recording, one frame at a time (when paused)</li><li><kbd>?</kbd> - toggle this help popup</li></ul></div></div></div>`);
var HelpOverlay = (props => {
  const style$1 = () => {
    return {
      "font-family": props.fontFamily
    };
  };
  const e = f => {
    return e => {
      e.preventDefault();
      f(e);
    };
  };
  return (() => {
    const _el$ = _tmpl$$1.cloneNode(true),
      _el$2 = _el$.firstChild;
    addEventListener(_el$, "click", e(props.onClose), true);
    _el$2.$$click = e => {
      e.stopPropagation();
    };
    createRenderEffect(_$p => style(_el$, style$1(), _$p));
    return _el$;
  })();
});
delegateEvents(["click"]);

const _tmpl$ = /*#__PURE__*/template(`<div class="ap-wrapper" tabindex="-1"><div></div></div>`);
const CONTROL_BAR_HEIGHT = 32; // must match height of div.ap-control-bar in CSS

var Player = (props => {
  const logger = props.logger;
  const core = props.core;
  const autoPlay = props.autoPlay;
  const [state, setState] = createStore({
    lines: [],
    cursor: undefined,
    charW: props.charW,
    charH: props.charH,
    bordersW: props.bordersW,
    bordersH: props.bordersH,
    containerW: 0,
    containerH: 0,
    isPausable: true,
    isSeekable: true,
    isFullscreen: false,
    currentTime: null,
    remainingTime: null,
    progress: null,
    blink: true,
    cursorHold: false
  });
  const [isPlaying, setIsPlaying] = createSignal(false);
  const [overlay, setOverlay] = createSignal(!autoPlay ? "start" : null);
  const [infoMessage, setInfoMessage] = createSignal(null);
  const [terminalSize, setTerminalSize] = createSignal({
    cols: props.cols,
    rows: props.rows
  }, {
    equals: (newVal, oldVal) => newVal.cols === oldVal.cols && newVal.rows === oldVal.rows
  });
  const [duration, setDuration] = createSignal(undefined);
  const [markers, setMarkers] = createStore([]);
  const [userActive, setUserActive] = createSignal(false);
  const [isHelpVisible, setIsHelpVisible] = createSignal(false);
  const [originalTheme, setOriginalTheme] = createSignal(undefined);
  const terminalCols = createMemo(() => terminalSize().cols || 80);
  const terminalRows = createMemo(() => terminalSize().rows || 24);
  const controlBarHeight = () => props.controls === false ? 0 : CONTROL_BAR_HEIGHT;
  const controlsVisible = () => props.controls === true || props.controls === "auto" && userActive();
  let frameRequestId;
  let userActivityTimeoutId;
  let timeUpdateIntervalId;
  let blinkIntervalId;
  let wrapperRef;
  let playerRef;
  let terminalRef;
  let controlBarRef;
  let resizeObserver;
  function onPlaying() {
    updateTerminal();
    startBlinking();
    startTimeUpdates();
  }
  function onStopped() {
    stopBlinking();
    stopTimeUpdates();
    updateTime();
  }
  function resize(size_) {
    batch(() => {
      if (size_.rows < terminalSize().rows) {
        setState("lines", state.lines.slice(0, size_.rows));
      }
      setTerminalSize(size_);
    });
  }
  function setPoster(poster) {
    if (poster !== undefined && !autoPlay) {
      setState({
        lines: poster.lines,
        cursor: poster.cursor
      });
    }
  }
  core.addEventListener("init", _ref => {
    let {
      cols,
      rows,
      duration,
      theme,
      poster,
      markers
    } = _ref;
    batch(() => {
      resize({
        cols,
        rows
      });
      setDuration(duration);
      setOriginalTheme(theme);
      setMarkers(markers);
      setPoster(poster);
    });
  });
  core.addEventListener("play", () => {
    setOverlay(null);
  });
  core.addEventListener("playing", () => {
    batch(() => {
      setIsPlaying(true);
      setOverlay(null);
      onPlaying();
    });
  });
  core.addEventListener("idle", () => {
    batch(() => {
      setIsPlaying(false);
      onStopped();
    });
  });
  core.addEventListener("loading", () => {
    batch(() => {
      setIsPlaying(false);
      onStopped();
      setOverlay("loader");
    });
  });
  core.addEventListener("offline", _ref2 => {
    let {
      message
    } = _ref2;
    batch(() => {
      setIsPlaying(false);
      onStopped();
      if (message !== undefined) {
        setInfoMessage(message);
        setOverlay("info");
      }
    });
  });
  core.addEventListener("ended", _ref3 => {
    let {
      message
    } = _ref3;
    batch(() => {
      setIsPlaying(false);
      onStopped();
      if (message !== undefined) {
        setInfoMessage(message);
        setOverlay("info");
      }
    });
  });
  core.addEventListener("errored", () => {
    setOverlay("error");
  });
  core.addEventListener("resize", resize);
  core.addEventListener("reset", _ref4 => {
    let {
      cols,
      rows,
      theme
    } = _ref4;
    batch(() => {
      resize({
        cols,
        rows
      });
      setOriginalTheme(theme);
      updateTerminal();
    });
  });
  core.addEventListener("seeked", () => {
    updateTime();
  });
  core.addEventListener("terminalUpdate", () => {
    if (frameRequestId === undefined) {
      frameRequestId = requestAnimationFrame(updateTerminal);
    }
  });
  const setupResizeObserver = () => {
    resizeObserver = new ResizeObserver(debounce(_entries => {
      setState({
        containerW: wrapperRef.offsetWidth,
        containerH: wrapperRef.offsetHeight
      });
      wrapperRef.dispatchEvent(new CustomEvent("resize", {
        detail: {
          el: playerRef
        }
      }));
    }, 10));
    resizeObserver.observe(wrapperRef);
  };
  onMount(async () => {
    logger.info("player mounted");
    logger.debug("font measurements", {
      charW: state.charW,
      charH: state.charH
    });
    setupResizeObserver();
    const {
      isPausable,
      isSeekable,
      poster
    } = await core.init();
    batch(() => {
      setState({
        isPausable,
        isSeekable,
        containerW: wrapperRef.offsetWidth,
        containerH: wrapperRef.offsetHeight
      });
      setPoster(poster);
    });
    if (autoPlay) {
      core.play();
    }
  });
  onCleanup(() => {
    core.stop();
    stopBlinking();
    stopTimeUpdates();
    resizeObserver.disconnect();
  });
  const updateTerminal = () => {
    const changedLines = core.getChangedLines();
    batch(() => {
      if (changedLines) {
        changedLines.forEach((line, i) => {
          setState("lines", i, reconcile(line));
        });
      }
      setState("cursor", reconcile(core.getCursor()));
      setState("cursorHold", true);
    });
    frameRequestId = undefined;
  };
  const terminalElementSize = createMemo(() => {
    const terminalW = state.charW * terminalCols() + state.bordersW;
    const terminalH = state.charH * terminalRows() + state.bordersH;
    let fit = props.fit ?? "width";
    if (fit === "both" || state.isFullscreen) {
      const containerRatio = state.containerW / (state.containerH - controlBarHeight());
      const terminalRatio = terminalW / terminalH;
      if (containerRatio > terminalRatio) {
        fit = "height";
      } else {
        fit = "width";
      }
    }
    if (fit === false || fit === "none") {
      return {};
    } else if (fit === "width") {
      const scale = state.containerW / terminalW;
      return {
        scale: scale,
        width: state.containerW,
        height: terminalH * scale + controlBarHeight()
      };
    } else if (fit === "height") {
      const scale = (state.containerH - controlBarHeight()) / terminalH;
      return {
        scale: scale,
        width: terminalW * scale,
        height: state.containerH
      };
    } else {
      throw `unsupported fit mode: ${fit}`;
    }
  });
  const onFullscreenChange = () => {
    setState("isFullscreen", document.fullscreenElement ?? document.webkitFullscreenElement);
  };
  const toggleFullscreen = () => {
    if (state.isFullscreen) {
      (document.exitFullscreen ?? document.webkitExitFullscreen ?? (() => {})).apply(document);
    } else {
      (wrapperRef.requestFullscreen ?? wrapperRef.webkitRequestFullscreen ?? (() => {})).apply(wrapperRef);
    }
  };
  const onKeyDown = e => {
    if (e.altKey || e.metaKey || e.ctrlKey) {
      return;
    }
    if (e.key == " ") {
      core.togglePlay();
    } else if (e.key == ".") {
      core.step();
      updateTime();
    } else if (e.key == "f") {
      toggleFullscreen();
    } else if (e.key == "[") {
      core.seek({
        marker: "prev"
      });
    } else if (e.key == "]") {
      core.seek({
        marker: "next"
      });
    } else if (e.key.charCodeAt(0) >= 48 && e.key.charCodeAt(0) <= 57) {
      const pos = (e.key.charCodeAt(0) - 48) / 10;
      core.seek(`${pos * 100}%`);
    } else if (e.key == "?") {
      if (isHelpVisible()) {
        setIsHelpVisible(false);
      } else {
        core.pause();
        setIsHelpVisible(true);
      }
    } else if (e.key == "ArrowLeft") {
      if (e.shiftKey) {
        core.seek("<<<");
      } else {
        core.seek("<<");
      }
    } else if (e.key == "ArrowRight") {
      if (e.shiftKey) {
        core.seek(">>>");
      } else {
        core.seek(">>");
      }
    } else if (e.key == "Escape") {
      setIsHelpVisible(false);
    } else {
      return;
    }
    e.stopPropagation();
    e.preventDefault();
  };
  const wrapperOnMouseMove = () => {
    if (state.isFullscreen) {
      onUserActive(true);
    }
  };
  const playerOnMouseLeave = () => {
    if (!state.isFullscreen) {
      onUserActive(false);
    }
  };
  const startTimeUpdates = () => {
    timeUpdateIntervalId = setInterval(updateTime, 100);
  };
  const stopTimeUpdates = () => {
    clearInterval(timeUpdateIntervalId);
  };
  const updateTime = () => {
    const currentTime = core.getCurrentTime();
    const remainingTime = core.getRemainingTime();
    const progress = core.getProgress();
    setState({
      currentTime,
      remainingTime,
      progress
    });
  };
  const startBlinking = () => {
    blinkIntervalId = setInterval(() => {
      setState(state => {
        const changes = {
          blink: !state.blink
        };
        if (changes.blink) {
          changes.cursorHold = false;
        }
        return changes;
      });
    }, 500);
  };
  const stopBlinking = () => {
    clearInterval(blinkIntervalId);
    setState("blink", true);
  };
  const onUserActive = show => {
    clearTimeout(userActivityTimeoutId);
    if (show) {
      userActivityTimeoutId = setTimeout(() => onUserActive(false), 2000);
    }
    setUserActive(show);
  };
  const theme = createMemo(() => {
    const name = props.theme || "auto/asciinema";
    if (name.slice(0, 5) === "auto/") {
      return {
        name: name.slice(5),
        colors: originalTheme()
      };
    } else {
      return {
        name
      };
    }
  });
  const playerStyle = () => {
    const style = {};
    if ((props.fit === false || props.fit === "none") && props.terminalFontSize !== undefined) {
      if (props.terminalFontSize === "small") {
        style["font-size"] = "12px";
      } else if (props.terminalFontSize === "medium") {
        style["font-size"] = "18px";
      } else if (props.terminalFontSize === "big") {
        style["font-size"] = "24px";
      } else {
        style["font-size"] = props.terminalFontSize;
      }
    }
    const size = terminalElementSize();
    if (size.width !== undefined) {
      style["width"] = `${size.width}px`;
      style["height"] = `${size.height}px`;
    }
    const themeColors = theme().colors;
    if (themeColors !== undefined) {
      style["--term-color-foreground"] = themeColors.foreground;
      style["--term-color-background"] = themeColors.background;
      themeColors.palette.forEach((color, i) => {
        style[`--term-color-${i}`] = color;
      });
    }
    return style;
  };
  const playerClass = () => `ap-player asciinema-player-theme-${theme().name}`;
  const terminalScale = () => terminalElementSize()?.scale;
  const el = (() => {
    const _el$ = _tmpl$.cloneNode(true),
      _el$2 = _el$.firstChild;
    const _ref$ = wrapperRef;
    typeof _ref$ === "function" ? use(_ref$, _el$) : wrapperRef = _el$;
    _el$.addEventListener("webkitfullscreenchange", onFullscreenChange);
    _el$.addEventListener("fullscreenchange", onFullscreenChange);
    _el$.$$mousemove = wrapperOnMouseMove;
    _el$.$$keydown = onKeyDown;
    const _ref$2 = playerRef;
    typeof _ref$2 === "function" ? use(_ref$2, _el$2) : playerRef = _el$2;
    _el$2.$$mousemove = () => onUserActive(true);
    _el$2.addEventListener("mouseleave", playerOnMouseLeave);
    insert(_el$2, createComponent(Terminal, {
      get cols() {
        return terminalCols();
      },
      get rows() {
        return terminalRows();
      },
      get scale() {
        return terminalScale();
      },
      get blink() {
        return state.blink;
      },
      get lines() {
        return state.lines;
      },
      get cursor() {
        return state.cursor;
      },
      get cursorHold() {
        return state.cursorHold;
      },
      get fontFamily() {
        return props.terminalFontFamily;
      },
      get lineHeight() {
        return props.terminalLineHeight;
      },
      ref(r$) {
        const _ref$3 = terminalRef;
        typeof _ref$3 === "function" ? _ref$3(r$) : terminalRef = r$;
      }
    }), null);
    insert(_el$2, createComponent(Show, {
      get when() {
        return props.controls !== false;
      },
      get children() {
        return createComponent(ControlBar, {
          get duration() {
            return duration();
          },
          get currentTime() {
            return state.currentTime;
          },
          get remainingTime() {
            return state.remainingTime;
          },
          get progress() {
            return state.progress;
          },
          markers: markers,
          get isPlaying() {
            return isPlaying();
          },
          get isPausable() {
            return state.isPausable;
          },
          get isSeekable() {
            return state.isSeekable;
          },
          onPlayClick: () => core.togglePlay(),
          onFullscreenClick: toggleFullscreen,
          onSeekClick: pos => core.seek(pos),
          ref(r$) {
            const _ref$4 = controlBarRef;
            typeof _ref$4 === "function" ? _ref$4(r$) : controlBarRef = r$;
          }
        });
      }
    }), null);
    insert(_el$2, createComponent(Switch, {
      get children() {
        return [createComponent(Match, {
          get when() {
            return overlay() == "start";
          },
          get children() {
            return createComponent(StartOverlay, {
              onClick: () => core.play()
            });
          }
        }), createComponent(Match, {
          get when() {
            return overlay() == "loader";
          },
          get children() {
            return createComponent(LoaderOverlay, {});
          }
        }), createComponent(Match, {
          get when() {
            return overlay() == "info";
          },
          get children() {
            return createComponent(InfoOverlay, {
              get message() {
                return infoMessage();
              },
              get fontFamily() {
                return props.terminalFontFamily;
              }
            });
          }
        }), createComponent(Match, {
          get when() {
            return overlay() == "error";
          },
          get children() {
            return createComponent(ErrorOverlay, {});
          }
        })];
      }
    }), null);
    insert(_el$2, createComponent(Show, {
      get when() {
        return isHelpVisible();
      },
      get children() {
        return createComponent(HelpOverlay, {
          get fontFamily() {
            return props.terminalFontFamily;
          },
          onClose: () => setIsHelpVisible(false)
        });
      }
    }), null);
    createRenderEffect(_p$ => {
      const _v$ = !!controlsVisible(),
        _v$2 = playerClass(),
        _v$3 = playerStyle();
      _v$ !== _p$._v$ && _el$.classList.toggle("ap-hud", _p$._v$ = _v$);
      _v$2 !== _p$._v$2 && className(_el$2, _p$._v$2 = _v$2);
      _p$._v$3 = style(_el$2, _v$3, _p$._v$3);
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined
    });
    return _el$;
  })();
  return el;
});
delegateEvents(["keydown", "mousemove"]);

class DummyLogger {
  log() {}
  debug() {}
  info() {}
  warn() {}
  error() {}
}
class PrefixedLogger {
  constructor(logger, prefix) {
    this.logger = logger;
    this.prefix = prefix;
  }
  log(message) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    this.logger.log(`${this.prefix}${message}`, ...args);
  }
  debug(message) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    this.logger.debug(`${this.prefix}${message}`, ...args);
  }
  info(message) {
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }
    this.logger.info(`${this.prefix}${message}`, ...args);
  }
  warn(message) {
    for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      args[_key4 - 1] = arguments[_key4];
    }
    this.logger.warn(`${this.prefix}${message}`, ...args);
  }
  error(message) {
    for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
      args[_key5 - 1] = arguments[_key5];
    }
    this.logger.error(`${this.prefix}${message}`, ...args);
  }
}

// Efficient array transformations without intermediate array objects.
// Inspired by Elixir's streams and Rust's iterator adapters.

class Stream {
  constructor(input, xfs) {
    this.input = typeof input.next === "function" ? input : input[Symbol.iterator]();
    this.xfs = xfs ?? [];
  }
  map(f) {
    return this.transform(Map$1(f));
  }
  flatMap(f) {
    return this.transform(FlatMap(f));
  }
  filter(f) {
    return this.transform(Filter(f));
  }
  take(n) {
    return this.transform(Take(n));
  }
  drop(n) {
    return this.transform(Drop(n));
  }
  transform(f) {
    return new Stream(this.input, this.xfs.concat([f]));
  }
  multiplex(other, comparator) {
    return new Stream(new Multiplexer(this[Symbol.iterator](), other[Symbol.iterator](), comparator));
  }
  toArray() {
    return Array.from(this);
  }
  [Symbol.iterator]() {
    let v = 0;
    let values = [];
    let flushed = false;
    const xf = compose(this.xfs, val => values.push(val));
    return {
      next: () => {
        if (v === values.length) {
          values = [];
          v = 0;
        }
        while (values.length === 0) {
          const next = this.input.next();
          if (next.done) {
            break;
          } else {
            xf.step(next.value);
          }
        }
        if (values.length === 0 && !flushed) {
          xf.flush();
          flushed = true;
        }
        if (values.length > 0) {
          return {
            done: false,
            value: values[v++]
          };
        } else {
          return {
            done: true
          };
        }
      }
    };
  }
}
function Map$1(f) {
  return emit => {
    return input => {
      emit(f(input));
    };
  };
}
function FlatMap(f) {
  return emit => {
    return input => {
      f(input).forEach(emit);
    };
  };
}
function Filter(f) {
  return emit => {
    return input => {
      if (f(input)) {
        emit(input);
      }
    };
  };
}
function Take(n) {
  let c = 0;
  return emit => {
    return input => {
      if (c < n) {
        emit(input);
      }
      c += 1;
    };
  };
}
function Drop(n) {
  let c = 0;
  return emit => {
    return input => {
      c += 1;
      if (c > n) {
        emit(input);
      }
    };
  };
}
function compose(xfs, push) {
  return xfs.reverse().reduce((next, curr) => {
    const xf = toXf(curr(next.step));
    return {
      step: xf.step,
      flush: () => {
        xf.flush();
        next.flush();
      }
    };
  }, toXf(push));
}
function toXf(xf) {
  if (typeof xf === "function") {
    return {
      step: xf,
      flush: () => {}
    };
  } else {
    return xf;
  }
}
class Multiplexer {
  constructor(left, right, comparator) {
    this.left = left;
    this.right = right;
    this.comparator = comparator;
  }
  [Symbol.iterator]() {
    let leftItem;
    let rightItem;
    return {
      next: () => {
        if (leftItem === undefined && this.left !== undefined) {
          const result = this.left.next();
          if (result.done) {
            this.left = undefined;
          } else {
            leftItem = result.value;
          }
        }
        if (rightItem === undefined && this.right !== undefined) {
          const result = this.right.next();
          if (result.done) {
            this.right = undefined;
          } else {
            rightItem = result.value;
          }
        }
        if (leftItem === undefined && rightItem === undefined) {
          return {
            done: true
          };
        } else if (leftItem === undefined) {
          const value = rightItem;
          rightItem = undefined;
          return {
            done: false,
            value: value
          };
        } else if (rightItem === undefined) {
          const value = leftItem;
          leftItem = undefined;
          return {
            done: false,
            value: value
          };
        } else if (this.comparator(leftItem, rightItem)) {
          const value = leftItem;
          leftItem = undefined;
          return {
            done: false,
            value: value
          };
        } else {
          const value = rightItem;
          rightItem = undefined;
          return {
            done: false,
            value: value
          };
        }
      }
    };
  }
}

async function parse$2(data) {
  let header;
  let events;
  if (data instanceof Response) {
    const text = await data.text();
    const result = parseJsonl(text);
    if (result !== undefined) {
      header = result.header;
      events = result.events;
    } else {
      header = JSON.parse(text);
    }
  } else if (typeof data === "object" && typeof data.version === "number") {
    header = data;
  } else if (Array.isArray(data)) {
    header = data[0];
    events = data.slice(1, data.length);
  } else {
    throw "invalid data";
  }
  if (header.version === 1) {
    return parseAsciicastV1(header);
  } else if (header.version === 2) {
    return parseAsciicastV2(header, events);
  } else {
    throw `asciicast v${header.version} format not supported`;
  }
}
function parseJsonl(jsonl) {
  const lines = jsonl.split("\n");
  let header;
  try {
    header = JSON.parse(lines[0]);
  } catch (_error) {
    return;
  }
  const events = new Stream(lines).drop(1).filter(l => l[0] === "[").map(JSON.parse).toArray();
  return {
    header,
    events
  };
}
function parseAsciicastV1(data) {
  let time = 0;
  const events = new Stream(data.stdout).map(e => {
    time += e[0];
    return [time, "o", e[1]];
  });
  return {
    cols: data.width,
    rows: data.height,
    events
  };
}
function parseAsciicastV2(header, events) {
  return {
    cols: header.width,
    rows: header.height,
    theme: parseTheme(header.theme),
    events,
    idleTimeLimit: header.idle_time_limit
  };
}
function parseTheme(theme) {
  const colorRegex = /^#[0-9A-Fa-f]{6}$/;
  const paletteRegex = /^(#[0-9A-Fa-f]{6}:){7,}#[0-9A-Fa-f]{6}$/;
  const fg = theme?.fg;
  const bg = theme?.bg;
  const palette = theme?.palette;
  if (colorRegex.test(fg) && colorRegex.test(bg) && paletteRegex.test(palette)) {
    return {
      foreground: fg,
      background: bg,
      palette: palette.split(":")
    };
  }
}
function unparseAsciicastV2(recording) {
  const header = JSON.stringify({
    version: 2,
    width: recording.cols,
    height: recording.rows
  });
  const events = recording.events.map(JSON.stringify).join("\n");
  return `${header}\n${events}\n`;
}

function recording(src, _ref, _ref2) {
  let {
    feed,
    resize,
    onInput,
    onMarker,
    now,
    setTimeout,
    setState,
    logger
  } = _ref;
  let {
    idleTimeLimit,
    startAt,
    loop,
    posterTime,
    markers: markers_,
    pauseOnMarkers,
    cols: initialCols,
    rows: initialRows
  } = _ref2;
  let cols;
  let rows;
  let events;
  let markers;
  let duration;
  let effectiveStartAt;
  let eventTimeoutId;
  let nextEventIndex = 0;
  let lastEventTime = 0;
  let startTime;
  let pauseElapsedTime;
  let playCount = 0;
  async function init() {
    const {
      parser,
      minFrameTime,
      inputOffset,
      dumpFilename,
      encoding = "utf-8"
    } = src;
    const recording = prepare(await parser(await doFetch(src), {
      encoding
    }), logger, {
      idleTimeLimit,
      startAt,
      minFrameTime,
      inputOffset,
      markers_
    });
    ({
      cols,
      rows,
      events,
      duration,
      effectiveStartAt
    } = recording);
    initialCols = initialCols ?? cols;
    initialRows = initialRows ?? rows;
    if (events.length === 0) {
      throw "recording is missing events";
    }
    if (dumpFilename !== undefined) {
      dump(recording, dumpFilename);
    }
    const poster = posterTime !== undefined ? getPoster(posterTime) : undefined;
    markers = events.filter(e => e[1] === "m").map(e => [e[0], e[2].label]);
    return {
      cols,
      rows,
      duration,
      theme: recording.theme,
      poster,
      markers
    };
  }
  function doFetch(_ref3) {
    let {
      url,
      data,
      fetchOpts = {}
    } = _ref3;
    if (typeof url === "string") {
      return doFetchOne(url, fetchOpts);
    } else if (Array.isArray(url)) {
      return Promise.all(url.map(url => doFetchOne(url, fetchOpts)));
    } else if (data !== undefined) {
      if (typeof data === "function") {
        data = data();
      }
      if (!(data instanceof Promise)) {
        data = Promise.resolve(data);
      }
      return data.then(value => {
        if (typeof value === "string" || value instanceof ArrayBuffer) {
          return new Response(value);
        } else {
          return value;
        }
      });
    } else {
      throw "failed fetching recording file: url/data missing in src";
    }
  }
  async function doFetchOne(url, fetchOpts) {
    const response = await fetch(url, fetchOpts);
    if (!response.ok) {
      throw `failed fetching recording from ${url}: ${response.status} ${response.statusText}`;
    }
    return response;
  }
  function delay(targetTime) {
    let delay = targetTime * 1000 - (now() - startTime);
    if (delay < 0) {
      delay = 0;
    }
    return delay;
  }
  function scheduleNextEvent() {
    const nextEvent = events[nextEventIndex];
    if (nextEvent) {
      eventTimeoutId = setTimeout(runNextEvent, delay(nextEvent[0]));
    } else {
      onEnd();
    }
  }
  function runNextEvent() {
    let event = events[nextEventIndex];
    let elapsedWallTime;
    do {
      lastEventTime = event[0];
      nextEventIndex++;
      const stop = executeEvent(event);
      if (stop) {
        return;
      }
      event = events[nextEventIndex];
      elapsedWallTime = now() - startTime;
    } while (event && elapsedWallTime > event[0] * 1000);
    scheduleNextEvent();
  }
  function cancelNextEvent() {
    clearTimeout(eventTimeoutId);
    eventTimeoutId = null;
  }
  function executeEvent(event) {
    const [time, type, data] = event;
    if (type === "o") {
      feed(data);
    } else if (type === "i") {
      onInput(data);
    } else if (type === "r") {
      const [cols, rows] = data.split("x");
      resize(cols, rows);
    } else if (type === "m") {
      onMarker(data);
      if (pauseOnMarkers) {
        pause();
        pauseElapsedTime = time * 1000;
        setState("idle", {
          reason: "paused"
        });
        return true;
      }
    }
    return false;
  }
  function onEnd() {
    cancelNextEvent();
    playCount++;
    if (loop === true || typeof loop === "number" && playCount < loop) {
      nextEventIndex = 0;
      startTime = now();
      feed("\x1bc"); // reset terminal
      resizeTerminalToInitialSize();
      scheduleNextEvent();
    } else {
      pauseElapsedTime = duration * 1000;
      setState("ended");
    }
  }
  function play() {
    if (eventTimeoutId) throw "already playing";
    if (events[nextEventIndex] === undefined) throw "already ended";
    if (effectiveStartAt !== null) {
      seek(effectiveStartAt);
    }
    resume();
    return true;
  }
  function pause() {
    if (!eventTimeoutId) return true;
    cancelNextEvent();
    pauseElapsedTime = now() - startTime;
    return true;
  }
  function resume() {
    startTime = now() - pauseElapsedTime;
    pauseElapsedTime = null;
    scheduleNextEvent();
  }
  function seek(where) {
    const isPlaying = !!eventTimeoutId;
    pause();
    const currentTime = (pauseElapsedTime ?? 0) / 1000;
    if (typeof where === "string") {
      if (where === "<<") {
        where = currentTime - 5;
      } else if (where === ">>") {
        where = currentTime + 5;
      } else if (where === "<<<") {
        where = currentTime - 0.1 * duration;
      } else if (where === ">>>") {
        where = currentTime + 0.1 * duration;
      } else if (where[where.length - 1] === "%") {
        where = parseFloat(where.substring(0, where.length - 1)) / 100 * duration;
      }
    } else if (typeof where === "object") {
      if (where.marker === "prev") {
        where = findMarkerTimeBefore(currentTime) ?? 0;
        if (isPlaying && currentTime - where < 1) {
          where = findMarkerTimeBefore(where) ?? 0;
        }
      } else if (where.marker === "next") {
        where = findMarkerTimeAfter(currentTime) ?? duration;
      } else if (typeof where.marker === "number") {
        const marker = markers[where.marker];
        if (marker === undefined) {
          throw `invalid marker index: ${where.marker}`;
        } else {
          where = marker[0];
        }
      }
    }
    const targetTime = Math.min(Math.max(where, 0), duration);
    if (targetTime < lastEventTime) {
      feed("\x1bc"); // reset terminal
      resizeTerminalToInitialSize();
      nextEventIndex = 0;
      lastEventTime = 0;
    }
    let event = events[nextEventIndex];
    while (event && event[0] <= targetTime) {
      if (event[1] === "o") {
        executeEvent(event);
      }
      lastEventTime = event[0];
      event = events[++nextEventIndex];
    }
    pauseElapsedTime = targetTime * 1000;
    effectiveStartAt = null;
    if (isPlaying) {
      resume();
    }
    return true;
  }
  function findMarkerTimeBefore(time) {
    if (markers.length == 0) return;
    let i = 0;
    let marker = markers[i];
    let lastMarkerTimeBefore;
    while (marker && marker[0] < time) {
      lastMarkerTimeBefore = marker[0];
      marker = markers[++i];
    }
    return lastMarkerTimeBefore;
  }
  function findMarkerTimeAfter(time) {
    if (markers.length == 0) return;
    let i = markers.length - 1;
    let marker = markers[i];
    let firstMarkerTimeAfter;
    while (marker && marker[0] > time) {
      firstMarkerTimeAfter = marker[0];
      marker = markers[--i];
    }
    return firstMarkerTimeAfter;
  }
  function step() {
    let nextEvent = events[nextEventIndex++];
    while (nextEvent !== undefined && nextEvent[1] !== "o") {
      nextEvent = events[nextEventIndex++];
    }
    if (nextEvent === undefined) return;
    feed(nextEvent[2]);
    const targetTime = nextEvent[0];
    lastEventTime = targetTime;
    pauseElapsedTime = targetTime * 1000;
    effectiveStartAt = null;
  }
  function restart() {
    if (eventTimeoutId) throw "still playing";
    if (events[nextEventIndex] !== undefined) throw "not ended";
    seek(0);
    resume();
    return true;
  }
  function getPoster(time) {
    return events.filter(e => e[0] < time && e[1] === "o").map(e => e[2]);
  }
  function getCurrentTime() {
    if (eventTimeoutId) {
      return (now() - startTime) / 1000;
    } else {
      return (pauseElapsedTime ?? 0) / 1000;
    }
  }
  function resizeTerminalToInitialSize() {
    resize(initialCols, initialRows);
  }
  return {
    init,
    play,
    pause,
    seek,
    step,
    restart,
    stop: pause,
    getCurrentTime
  };
}
function batcher(logger) {
  let minFrameTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1.0 / 60;
  let prevEvent;
  return emit => {
    let ic = 0;
    let oc = 0;
    return {
      step: event => {
        ic++;
        if (prevEvent === undefined) {
          prevEvent = event;
          return;
        }
        if (event[1] === "o" && prevEvent[1] === "o" && event[0] - prevEvent[0] < minFrameTime) {
          prevEvent[2] += event[2];
        } else {
          emit(prevEvent);
          prevEvent = event;
          oc++;
        }
      },
      flush: () => {
        if (prevEvent !== undefined) {
          emit(prevEvent);
          oc++;
        }
        logger.debug(`batched ${ic} frames to ${oc} frames`);
      }
    };
  };
}
function prepare(recording, logger, _ref4) {
  let {
    startAt = 0,
    idleTimeLimit,
    minFrameTime,
    inputOffset,
    markers_
  } = _ref4;
  let {
    events
  } = recording;
  if (!(events instanceof Stream)) {
    events = new Stream(events);
  }
  idleTimeLimit = idleTimeLimit ?? recording.idleTimeLimit ?? Infinity;
  const limiterOutput = {
    offset: 0
  };
  events = events.transform(batcher(logger, minFrameTime)).map(timeLimiter(idleTimeLimit, startAt, limiterOutput)).map(markerWrapper());
  if (markers_ !== undefined) {
    markers_ = new Stream(markers_).map(normalizeMarker);
    events = events.filter(e => e[1] !== "m").multiplex(markers_, (a, b) => a[0] < b[0]).map(markerWrapper());
  }
  events = events.toArray();
  if (inputOffset !== undefined) {
    events = events.map(e => e[1] === "i" ? [e[0] + inputOffset, e[1], e[2]] : e);
    events.sort((a, b) => a[0] - b[0]);
  }
  const duration = events[events.length - 1][0];
  const effectiveStartAt = startAt - limiterOutput.offset;
  return {
    ...recording,
    events,
    duration,
    effectiveStartAt
  };
}
function normalizeMarker(m) {
  return typeof m === "number" ? [m, "m", ""] : [m[0], "m", m[1]];
}
function timeLimiter(idleTimeLimit, startAt, output) {
  let prevT = 0;
  let shift = 0;
  return function (e) {
    const delay = e[0] - prevT;
    const delta = delay - idleTimeLimit;
    prevT = e[0];
    if (delta > 0) {
      shift += delta;
      if (e[0] < startAt) {
        output.offset += delta;
      }
    }
    return [e[0] - shift, e[1], e[2]];
  };
}
function markerWrapper() {
  let i = 0;
  return function (e) {
    if (e[1] === "m") {
      return [e[0], e[1], {
        index: i++,
        time: e[0],
        label: e[2]
      }];
    } else {
      return e;
    }
  };
}
function dump(recording, filename) {
  const link = document.createElement("a");
  const events = recording.events.map(e => e[1] === "m" ? [e[0], e[1], e[2].label] : e);
  const asciicast = unparseAsciicastV2({
    ...recording,
    events
  });
  link.href = URL.createObjectURL(new Blob([asciicast], {
    type: "text/plain"
  }));
  link.download = filename;
  link.click();
}

function clock(_ref, _ref2, _ref3) {
  let {
    hourColor = 3,
    minuteColor = 4,
    separatorColor = 9
  } = _ref;
  let {
    feed
  } = _ref2;
  let {
    cols = 5,
    rows = 1
  } = _ref3;
  const middleRow = Math.floor(rows / 2);
  const leftPad = Math.floor(cols / 2) - 2;
  const setupCursor = `\x1b[?25l\x1b[1m\x1b[${middleRow}B`;
  let intervalId;
  const getCurrentTime = () => {
    const d = new Date();
    const h = d.getHours();
    const m = d.getMinutes();
    const seqs = [];
    seqs.push("\r");
    for (let i = 0; i < leftPad; i++) {
      seqs.push(" ");
    }
    seqs.push(`\x1b[3${hourColor}m`);
    if (h < 10) {
      seqs.push("0");
    }
    seqs.push(`${h}`);
    seqs.push(`\x1b[3${separatorColor};5m:\x1b[25m`);
    seqs.push(`\x1b[3${minuteColor}m`);
    if (m < 10) {
      seqs.push("0");
    }
    seqs.push(`${m}`);
    return seqs;
  };
  const updateTime = () => {
    getCurrentTime().forEach(feed);
  };
  return {
    init: () => {
      const duration = 24 * 60;
      const poster = [setupCursor].concat(getCurrentTime());
      return {
        cols,
        rows,
        duration,
        poster
      };
    },
    play: () => {
      feed(setupCursor);
      updateTime();
      intervalId = setInterval(updateTime, 1000);
      return true;
    },
    stop: () => {
      clearInterval(intervalId);
    },
    getCurrentTime: () => {
      const d = new Date();
      return d.getHours() * 60 + d.getMinutes();
    }
  };
}

function random(src, _ref) {
  let {
    feed,
    setTimeout
  } = _ref;
  const base = " ".charCodeAt(0);
  const range = "~".charCodeAt(0) - base;
  let timeoutId;
  const schedule = () => {
    const t = Math.pow(5, Math.random() * 4);
    timeoutId = setTimeout(print, t);
  };
  const print = () => {
    schedule();
    const char = String.fromCharCode(base + Math.floor(Math.random() * range));
    feed(char);
  };
  return () => {
    schedule();
    return () => clearInterval(timeoutId);
  };
}

function benchmark(_ref, _ref2) {
  let {
    url,
    iterations = 10
  } = _ref;
  let {
    feed,
    setState,
    now
  } = _ref2;
  let data;
  let byteCount = 0;
  return {
    async init() {
      const recording = await parse$2(await fetch(url));
      const {
        cols,
        rows,
        events
      } = recording;
      data = Array.from(events).filter(_ref3 => {
        let [_time, type, _text] = _ref3;
        return type === "o";
      }).map(_ref4 => {
        let [time, _type, text] = _ref4;
        return [time, text];
      });
      const duration = data[data.length - 1][0];
      for (const [_, text] of data) {
        byteCount += new Blob([text]).size;
      }
      return {
        cols,
        rows,
        duration
      };
    },
    play() {
      const startTime = now();
      for (let i = 0; i < iterations; i++) {
        for (const [_, text] of data) {
          feed(text);
        }
        feed("\x1bc"); // reset terminal
      }

      const endTime = now();
      const duration = (endTime - startTime) / 1000;
      const throughput = byteCount * iterations / duration;
      const throughputMbs = byteCount / (1024 * 1024) * iterations / duration;
      console.info("benchmark: result", {
        byteCount,
        iterations,
        duration,
        throughput,
        throughputMbs
      });
      setTimeout(() => {
        setState("stopped", {
          reason: "ended"
        });
      }, 0);
      return true;
    }
  };
}

class Queue {
  constructor() {
    this.items = [];
    this.onPush = undefined;
  }
  push(item) {
    this.items.push(item);
    if (this.onPush !== undefined) {
      this.onPush(this.popAll());
      this.onPush = undefined;
    }
  }
  popAll() {
    if (this.items.length > 0) {
      const items = this.items;
      this.items = [];
      return items;
    } else {
      const thiz = this;
      return new Promise(resolve => {
        thiz.onPush = resolve;
      });
    }
  }
}

function getBuffer(bufferTime, feed, resize, setTime, baseStreamTime, minFrameTime, logger) {
  const execute = executeEvent(feed, resize);
  if (bufferTime === 0) {
    logger.debug("using no buffer");
    return nullBuffer(execute);
  } else {
    bufferTime = bufferTime ?? {};
    let getBufferTime;
    if (typeof bufferTime === "number") {
      logger.debug(`using fixed time buffer (${bufferTime} ms)`);
      getBufferTime = _latency => bufferTime;
    } else if (typeof bufferTime === "function") {
      logger.debug("using custom dynamic buffer");
      getBufferTime = bufferTime({
        logger
      });
    } else {
      logger.debug("using adaptive buffer", bufferTime);
      getBufferTime = adaptiveBufferTimeProvider({
        logger
      }, bufferTime);
    }
    return buffer(getBufferTime, execute, setTime, logger, baseStreamTime ?? 0.0, minFrameTime);
  }
}
function nullBuffer(execute) {
  return {
    pushEvent(event) {
      execute(event[1], event[2]);
    },
    pushText(text) {
      execute("o", text);
    },
    stop() {}
  };
}
function executeEvent(feed, resize) {
  return function (code, data) {
    if (code === "o") {
      feed(data);
    } else if (code === "r") {
      const [cols, rows] = data.split("x");
      resize(cols, rows);
    }
  };
}
function buffer(getBufferTime, execute, setTime, logger, baseStreamTime) {
  let minFrameTime = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1.0 / 60;
  let epoch = performance.now() - baseStreamTime * 1000;
  let bufferTime = getBufferTime(0);
  const queue = new Queue();
  minFrameTime *= 1000;
  let prevElapsedStreamTime = -minFrameTime;
  let stop = false;
  function elapsedWallTime() {
    return performance.now() - epoch;
  }
  setTimeout(async () => {
    while (!stop) {
      const events = await queue.popAll();
      if (stop) return;
      for (const event of events) {
        const elapsedStreamTime = event[0] * 1000 + bufferTime;
        if (elapsedStreamTime - prevElapsedStreamTime < minFrameTime) {
          execute(event[1], event[2]);
          continue;
        }
        const delay = elapsedStreamTime - elapsedWallTime();
        if (delay > 0) {
          await sleep(delay);
          if (stop) return;
        }
        setTime(event[0]);
        execute(event[1], event[2]);
        prevElapsedStreamTime = elapsedStreamTime;
      }
    }
  }, 0);
  return {
    pushEvent(event) {
      let latency = elapsedWallTime() - event[0] * 1000;
      if (latency < 0) {
        logger.debug(`correcting epoch by ${latency} ms`);
        epoch += latency;
        latency = 0;
      }
      bufferTime = getBufferTime(latency);
      queue.push(event);
    },
    pushText(text) {
      queue.push([elapsedWallTime(), "o", text]);
    },
    stop() {
      stop = true;
      queue.push(undefined);
    }
  };
}
function sleep(t) {
  return new Promise(resolve => {
    setTimeout(resolve, t);
  });
}
function adaptiveBufferTimeProvider(_ref, _ref2) {
  let {
    logger
  } = _ref;
  let {
    minTime = 25,
    maxLevel = 100,
    interval = 50,
    windowSize = 20,
    smoothingFactor = 0.2,
    minImprovementDuration = 1000
  } = _ref2;
  let bufferLevel = 0;
  let bufferTime = calcBufferTime(bufferLevel);
  let latencies = [];
  let maxJitter = 0;
  let jitterRange = 0;
  let improvementTs = null;
  function calcBufferTime(level) {
    if (level === 0) {
      return minTime;
    } else {
      return interval * level;
    }
  }
  return latency => {
    latencies.push(latency);
    if (latencies.length < windowSize) {
      return bufferTime;
    }
    latencies = latencies.slice(-windowSize);
    const currentMinJitter = min(latencies);
    const currentMaxJitter = max(latencies);
    const currentJitterRange = currentMaxJitter - currentMinJitter;
    maxJitter = currentMaxJitter * smoothingFactor + maxJitter * (1 - smoothingFactor);
    jitterRange = currentJitterRange * smoothingFactor + jitterRange * (1 - smoothingFactor);
    const minBufferTime = maxJitter + jitterRange;
    if (latency > bufferTime) {
      logger.debug('buffer underrun', {
        latency,
        maxJitter,
        jitterRange,
        bufferTime
      });
    }
    if (bufferLevel < maxLevel && minBufferTime > bufferTime) {
      bufferTime = calcBufferTime(bufferLevel += 1);
      logger.debug(`jitter increased, raising bufferTime`, {
        latency,
        maxJitter,
        jitterRange,
        bufferTime
      });
    } else if (bufferLevel > 1 && minBufferTime < calcBufferTime(bufferLevel - 2) || bufferLevel == 1 && minBufferTime < calcBufferTime(bufferLevel - 1)) {
      if (improvementTs === null) {
        improvementTs = performance.now();
      } else if (performance.now() - improvementTs > minImprovementDuration) {
        improvementTs = performance.now();
        bufferTime = calcBufferTime(bufferLevel -= 1);
        logger.debug(`jitter decreased, lowering bufferTime`, {
          latency,
          maxJitter,
          jitterRange,
          bufferTime
        });
      }
      return bufferTime;
    }
    improvementTs = null;
    return bufferTime;
  };
}
function min(numbers) {
  return numbers.reduce((prev, cur) => cur < prev ? cur : prev);
}
function max(numbers) {
  return numbers.reduce((prev, cur) => cur > prev ? cur : prev);
}

function exponentialDelay(attempt) {
  return Math.min(500 * Math.pow(2, attempt), 5000);
}
function websocket(_ref, _ref2) {
  let {
    url,
    bufferTime,
    reconnectDelay = exponentialDelay,
    minFrameTime
  } = _ref;
  let {
    feed,
    reset,
    resize,
    setState,
    logger
  } = _ref2;
  logger = new PrefixedLogger(logger, "websocket: ");
  const utfDecoder = new TextDecoder();
  let socket;
  let buf;
  let clock = new NullClock();
  let reconnectAttempt = 0;
  let successfulConnectionTimeout;
  let stop = false;
  let wasOnline = false;
  function initBuffer(baseStreamTime) {
    if (buf !== undefined) buf.stop();
    buf = getBuffer(bufferTime, feed, resize, t => clock.setTime(t), baseStreamTime, minFrameTime, logger);
  }
  function detectProtocol(event) {
    if (typeof event.data === "string") {
      logger.info("activating asciicast-compatible handler");
      initBuffer();
      socket.onmessage = handleJsonMessage;
      handleJsonMessage(event);
    } else {
      const arr = new Uint8Array(event.data);
      if (arr[0] == 0x41 && arr[1] == 0x4c && arr[2] == 0x69 && arr[3] == 0x53) {
        // 'ALiS'
        if (arr[4] == 1) {
          logger.info("activating ALiS v1 handler");
          socket.onmessage = handleStreamMessage;
        } else {
          logger.warn(`unsupported ALiS version (${arr[4]})`);
          socket.close();
        }
      } else {
        logger.info("activating raw text handler");
        initBuffer();
        const text = utfDecoder.decode(arr);
        const size = sizeFromResizeSeq(text) ?? sizeFromScriptStartMessage(text);
        if (size !== undefined) {
          const [cols, rows] = size;
          handleResetMessage(cols, rows, 0, undefined);
        }
        socket.onmessage = handleRawTextMessage;
        handleRawTextMessage(event);
      }
    }
  }
  function sizeFromResizeSeq(text) {
    const match = text.match(/\x1b\[8;(\d+);(\d+)t/);
    if (match !== null) {
      return [parseInt(match[2], 10), parseInt(match[1], 10)];
    }
  }
  function sizeFromScriptStartMessage(text) {
    const match = text.match(/\[.*COLUMNS="(\d{1,3})" LINES="(\d{1,3})".*\]/);
    if (match !== null) {
      return [parseInt(match[1], 10), parseInt(match[2], 10)];
    }
  }
  function handleJsonMessage(event) {
    const e = JSON.parse(event.data);
    if (Array.isArray(e)) {
      buf.pushEvent(e);
    } else if (e.cols !== undefined || e.width !== undefined) {
      handleResetMessage(e.cols ?? e.width, e.rows ?? e.height, e.time, e.init ?? undefined);
    } else if (e.status === "offline") {
      handleOfflineMessage();
    }
  }
  const THEME_LEN = 54; // (2 + 16) * 3

  function handleStreamMessage(event) {
    const buffer = event.data;
    const view = new DataView(buffer);
    const type = view.getUint8(0);
    let offset = 1;
    if (type === 0x01) {
      // reset
      const cols = view.getUint16(offset, true);
      offset += 2;
      const rows = view.getUint16(offset, true);
      offset += 2;
      const time = view.getFloat32(offset, true);
      offset += 4;
      const themeFormat = view.getUint8(offset);
      offset += 1;
      let theme;
      if (themeFormat === 1) {
        theme = parseTheme(new Uint8Array(buffer, offset, THEME_LEN));
        offset += THEME_LEN;
      }
      const initLen = view.getUint32(offset, true);
      offset += 4;
      let init;
      if (initLen > 0) {
        init = utfDecoder.decode(new Uint8Array(buffer, offset, initLen));
        offset += initLen;
      }
      handleResetMessage(cols, rows, time, init, theme);
    } else if (type === 0x6f) {
      // 'o' - output
      const time = view.getFloat32(1, true);
      const len = view.getUint32(5, true);
      const text = utfDecoder.decode(new Uint8Array(buffer, 9, len));
      buf.pushEvent([time, "o", text]);
    } else if (type === 0x72) {
      // 'r' - resize
      const time = view.getFloat32(1, true);
      const cols = view.getUint16(5, true);
      const rows = view.getUint16(7, true);
      buf.pushEvent([time, "r", `${cols}x${rows}`]);
    } else if (type === 0x04) {
      // offline (EOT)
      handleOfflineMessage();
    } else {
      logger.debug(`unknown frame type: ${type}`);
    }
  }
  function parseTheme(arr) {
    const foreground = hexColor(arr[0], arr[1], arr[2]);
    const background = hexColor(arr[3], arr[4], arr[5]);
    const palette = [];
    for (let i = 0; i < 16; i++) {
      palette.push(hexColor(arr[i * 3 + 6], arr[i * 3 + 7], arr[i * 3 + 8]));
    }
    return {
      foreground,
      background,
      palette
    };
  }
  function hexColor(r, g, b) {
    return `#${byteToHex(r)}${byteToHex(g)}${byteToHex(b)}`;
  }
  function byteToHex(value) {
    return value.toString(16).padStart(2, "0");
  }
  function handleRawTextMessage(event) {
    buf.pushText(utfDecoder.decode(event.data));
  }
  function handleResetMessage(cols, rows, time, init, theme) {
    logger.debug(`stream reset (${cols}x${rows} @${time})`);
    setState("playing");
    initBuffer(time);
    reset(cols, rows, init, theme);
    clock = new Clock();
    wasOnline = true;
    if (typeof time === "number") {
      clock.setTime(time);
    }
  }
  function handleOfflineMessage() {
    logger.info("stream offline");
    if (wasOnline) {
      setState("offline", {
        message: "Stream ended"
      });
    } else {
      setState("offline", {
        message: "Stream offline"
      });
    }
    clock = new NullClock();
  }
  function connect() {
    socket = new WebSocket(url);
    socket.binaryType = "arraybuffer";
    socket.onopen = () => {
      logger.info("opened");
      successfulConnectionTimeout = setTimeout(() => {
        reconnectAttempt = 0;
      }, 1000);
    };
    socket.onmessage = detectProtocol;
    socket.onclose = event => {
      if (stop || event.code === 1000 || event.code === 1005) {
        logger.info("closed");
        setState("ended", {
          message: "Stream ended"
        });
      } else {
        clearTimeout(successfulConnectionTimeout);
        const delay = reconnectDelay(reconnectAttempt++);
        logger.info(`unclean close, reconnecting in ${delay}...`);
        setState("loading");
        setTimeout(connect, delay);
      }
    };
    wasOnline = false;
  }
  return {
    play: () => {
      connect();
    },
    stop: () => {
      stop = true;
      if (buf !== undefined) buf.stop();
      if (socket !== undefined) socket.close();
    },
    getCurrentTime: () => clock.getTime()
  };
}

function eventsource(_ref, _ref2) {
  let {
    url,
    bufferTime,
    minFrameTime
  } = _ref;
  let {
    feed,
    reset,
    setState,
    logger
  } = _ref2;
  logger = new PrefixedLogger(logger, "eventsource: ");
  let es;
  let buf;
  let clock = new NullClock();
  function initBuffer(baseStreamTime) {
    if (buf !== undefined) buf.stop();
    buf = getBuffer(bufferTime, feed, t => clock.setTime(t), baseStreamTime, minFrameTime, logger);
  }
  return {
    play: () => {
      es = new EventSource(url);
      es.addEventListener("open", () => {
        logger.info("opened");
        initBuffer();
      });
      es.addEventListener("error", e => {
        logger.info("errored");
        logger.debug({
          e
        });
        setState("loading");
      });
      es.addEventListener("message", event => {
        const e = JSON.parse(event.data);
        if (Array.isArray(e)) {
          buf.pushEvent(e);
        } else if (e.cols !== undefined || e.width !== undefined) {
          const cols = e.cols ?? e.width;
          const rows = e.rows ?? e.height;
          logger.debug(`vt reset (${cols}x${rows})`);
          setState("playing");
          initBuffer(e.time);
          reset(cols, rows, e.init ?? undefined);
          clock = new Clock();
          if (typeof e.time === "number") {
            clock.setTime(e.time);
          }
        } else if (e.state === "offline") {
          logger.info("stream offline");
          setState("offline", {
            message: "Stream offline"
          });
          clock = new NullClock();
        }
      });
      es.addEventListener("done", () => {
        logger.info("closed");
        es.close();
        setState("ended", {
          message: "Stream ended"
        });
      });
    },
    stop: () => {
      if (buf !== undefined) buf.stop();
      if (es !== undefined) es.close();
    },
    getCurrentTime: () => clock.getTime()
  };
}

async function parse$1(responses, _ref) {
  let {
    encoding
  } = _ref;
  const textDecoder = new TextDecoder(encoding);
  let cols;
  let rows;
  let timing = (await responses[0].text()).split("\n").filter(line => line.length > 0).map(line => line.split(" "));
  if (timing[0].length < 3) {
    timing = timing.map(entry => ["O", entry[0], entry[1]]);
  }
  const buffer = await responses[1].arrayBuffer();
  const array = new Uint8Array(buffer);
  const dataOffset = array.findIndex(byte => byte == 0x0a) + 1;
  const header = textDecoder.decode(array.subarray(0, dataOffset));
  const sizeMatch = header.match(/COLUMNS="(\d+)" LINES="(\d+)"/);
  if (sizeMatch !== null) {
    cols = parseInt(sizeMatch[1], 10);
    rows = parseInt(sizeMatch[2], 10);
  }
  const stdout = {
    array,
    cursor: dataOffset
  };
  let stdin = stdout;
  if (responses[2] !== undefined) {
    const buffer = await responses[2].arrayBuffer();
    const array = new Uint8Array(buffer);
    stdin = {
      array,
      cursor: dataOffset
    };
  }
  const events = [];
  let time = 0;
  for (const entry of timing) {
    time += parseFloat(entry[1]);
    if (entry[0] === "O") {
      const count = parseInt(entry[2], 10);
      const bytes = stdout.array.subarray(stdout.cursor, stdout.cursor + count);
      const text = textDecoder.decode(bytes);
      events.push([time, "o", text]);
      stdout.cursor += count;
    } else if (entry[0] === "I") {
      const count = parseInt(entry[2], 10);
      const bytes = stdin.array.subarray(stdin.cursor, stdin.cursor + count);
      const text = textDecoder.decode(bytes);
      events.push([time, "i", text]);
      stdin.cursor += count;
    } else if (entry[0] === "S" && entry[2] === "SIGWINCH") {
      const cols = parseInt(entry[4].slice(5), 10);
      const rows = parseInt(entry[3].slice(5), 10);
      events.push([time, "r", `${cols}x${rows}`]);
    } else if (entry[0] === "H" && entry[2] === "COLUMNS") {
      cols = parseInt(entry[3], 10);
    } else if (entry[0] === "H" && entry[2] === "LINES") {
      rows = parseInt(entry[3], 10);
    }
  }
  cols = cols ?? 80;
  rows = rows ?? 24;
  return {
    cols,
    rows,
    events
  };
}

async function parse(response, _ref) {
  let {
    encoding
  } = _ref;
  const textDecoder = new TextDecoder(encoding);
  const buffer = await response.arrayBuffer();
  const array = new Uint8Array(buffer);
  const firstFrame = parseFrame(array);
  const baseTime = firstFrame.time;
  const firstFrameText = textDecoder.decode(firstFrame.data);
  const sizeMatch = firstFrameText.match(/\x1b\[8;(\d+);(\d+)t/);
  const events = [];
  let cols = 80;
  let rows = 24;
  if (sizeMatch !== null) {
    cols = parseInt(sizeMatch[2], 10);
    rows = parseInt(sizeMatch[1], 10);
  }
  let cursor = 0;
  let frame = parseFrame(array);
  while (frame !== undefined) {
    const time = frame.time - baseTime;
    const text = textDecoder.decode(frame.data);
    events.push([time, "o", text]);
    cursor += frame.len;
    frame = parseFrame(array.subarray(cursor));
  }
  return {
    cols,
    rows,
    events
  };
}
function parseFrame(array) {
  if (array.length < 13) return;
  const time = parseTimestamp(array.subarray(0, 8));
  const len = parseNumber(array.subarray(8, 12));
  const data = array.subarray(12, 12 + len);
  return {
    time,
    data,
    len: len + 12
  };
}
function parseNumber(array) {
  return array[0] + array[1] * 256 + array[2] * 256 * 256 + array[3] * 256 * 256 * 256;
}
function parseTimestamp(array) {
  const sec = parseNumber(array.subarray(0, 4));
  const usec = parseNumber(array.subarray(4, 8));
  return sec + usec / 1000000;
}

const drivers = new Map([["benchmark", benchmark], ["clock", clock], ["eventsource", eventsource], ["random", random], ["recording", recording], ["websocket", websocket]]);
const parsers = new Map([["asciicast", parse$2], ["typescript", parse$1], ["ttyrec", parse]]);
function create(src, elem) {
  let opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  const logger = opts.logger ?? new DummyLogger();
  const core = new Core(getDriver(src), {
    logger: logger,
    cols: opts.cols,
    rows: opts.rows,
    loop: opts.loop,
    speed: opts.speed,
    preload: opts.preload,
    startAt: opts.startAt,
    poster: opts.poster,
    markers: opts.markers,
    pauseOnMarkers: opts.pauseOnMarkers,
    idleTimeLimit: opts.idleTimeLimit
  });
  const metrics = measureTerminal(opts.terminalFontFamily, opts.terminalLineHeight);
  const props = {
    logger: logger,
    core: core,
    cols: opts.cols,
    rows: opts.rows,
    fit: opts.fit,
    controls: opts.controls ?? "auto",
    autoPlay: opts.autoPlay ?? opts.autoplay,
    terminalFontSize: opts.terminalFontSize,
    terminalFontFamily: opts.terminalFontFamily,
    terminalLineHeight: opts.terminalLineHeight,
    theme: opts.theme,
    ...metrics
  };
  let el;
  const dispose = render(() => {
    el = createComponent(Player, props);
    return el;
  }, elem);
  const player = {
    el: el,
    dispose: dispose,
    getCurrentTime: () => core.getCurrentTime(),
    getDuration: () => core.getDuration(),
    play: () => core.play(),
    pause: () => core.pause(),
    seek: pos => core.seek(pos)
  };
  player.addEventListener = (name, callback) => {
    return core.addEventListener(name, callback.bind(player));
  };
  return player;
}
function getDriver(src) {
  if (typeof src === "function") return src;
  if (typeof src === "string") {
    if (src.substring(0, 5) == "ws://" || src.substring(0, 6) == "wss://") {
      src = {
        driver: "websocket",
        url: src
      };
    } else if (src.substring(0, 6) == "clock:") {
      src = {
        driver: "clock"
      };
    } else if (src.substring(0, 7) == "random:") {
      src = {
        driver: "random"
      };
    } else if (src.substring(0, 10) == "benchmark:") {
      src = {
        driver: "benchmark",
        url: src.substring(10)
      };
    } else {
      src = {
        driver: "recording",
        url: src
      };
    }
  }
  if (src.driver === undefined) {
    src.driver = "recording";
  }
  if (src.driver == "recording") {
    if (src.parser === undefined) {
      src.parser = "asciicast";
    }
    if (typeof src.parser === "string") {
      if (parsers.has(src.parser)) {
        src.parser = parsers.get(src.parser);
      } else {
        throw `unknown parser: ${src.parser}`;
      }
    }
  }
  if (drivers.has(src.driver)) {
    const driver = drivers.get(src.driver);
    return (callbacks, opts) => driver(src, callbacks, opts);
  } else {
    throw `unsupported driver: ${JSON.stringify(src)}`;
  }
}
function measureTerminal(fontFamily, lineHeight) {
  const cols = 80;
  const rows = 24;
  const div = document.createElement("div");
  div.style.height = "0px";
  div.style.overflow = "hidden";
  div.style.fontSize = "15px"; // must match font-size of div.asciinema-player in CSS
  document.body.appendChild(div);
  let el;
  const dispose = render(() => {
    el = createComponent(Terminal, {
      cols: cols,
      rows: rows,
      lineHeight: lineHeight,
      fontFamily: fontFamily,
      lines: []
    });
    return el;
  }, div);
  const metrics = {
    charW: el.clientWidth / cols,
    charH: el.clientHeight / rows,
    bordersW: el.offsetWidth - el.clientWidth,
    bordersH: el.offsetHeight - el.clientHeight
  };
  dispose();
  document.body.removeChild(div);
  return metrics;
}




/***/ })

}]);
//# sourceMappingURL=asciinema-player.2191df04.js.5a742a3e.map