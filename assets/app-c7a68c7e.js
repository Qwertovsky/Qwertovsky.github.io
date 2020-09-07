import { i as isFunction, a as isHTMLTag, b as isSVGTag, w as warn, c as isString, d as createRenderer, e as createHydrationRenderer, f as extend, g as isOn, h as isModelListener, j as isArray, k as hyphenate, l as camelize, m as capitalize, n as isSpecialBooleanAttr, o as includeBooleanAttr, p as callWithAsyncErrorHandling, q as createHead$1, v as version, u as useHead, V as Vue2ProvideUnheadPlugin, r as defineComponent, s as ref, t as onMounted, x as createRouter, y as createWebHistory, z as createMemoryHistory, _ as _export_sfc, A as resolveComponent, B as openBlock, C as createElementBlock, D as createBaseVNode, E as createVNode, F as withCtx, G as createTextVNode, H as routes } from "./index-bbfa13ff.js";
import { _ as _imports_0 } from "./largeqwerto-4298bb8a.js";
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const svgNS = "http://www.w3.org/2000/svg";
const doc = typeof document !== "undefined" ? document : null;
const templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
const nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: (child) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, isSVG, is, props) => {
    const el = isSVG ? doc.createElementNS(svgNS, tag) : doc.createElement(tag, is ? { is } : void 0);
    if (tag === "select" && props && props.multiple != null) {
      el.setAttribute("multiple", props.multiple);
    }
    return el;
  },
  createText: (text) => doc.createTextNode(text),
  createComment: (text) => doc.createComment(text),
  setText: (node, text) => {
    node.nodeValue = text;
  },
  setElementText: (el, text) => {
    el.textContent = text;
  },
  parentNode: (node) => node.parentNode,
  nextSibling: (node) => node.nextSibling,
  querySelector: (selector) => doc.querySelector(selector),
  setScopeId(el, id) {
    el.setAttribute(id, "");
  },
  insertStaticContent(content, parent, anchor, isSVG, start, end) {
    const before = anchor ? anchor.previousSibling : parent.lastChild;
    if (start && (start === end || start.nextSibling)) {
      while (true) {
        parent.insertBefore(start.cloneNode(true), anchor);
        if (start === end || !(start = start.nextSibling))
          break;
      }
    } else {
      templateContainer.innerHTML = isSVG ? `<svg>${content}</svg>` : content;
      const template = templateContainer.content;
      if (isSVG) {
        const wrapper = template.firstChild;
        while (wrapper.firstChild) {
          template.appendChild(wrapper.firstChild);
        }
        template.removeChild(wrapper);
      }
      parent.insertBefore(template, anchor);
    }
    return [
      before ? before.nextSibling : parent.firstChild,
      anchor ? anchor.previousSibling : parent.lastChild
    ];
  }
};
function patchClass(el, value, isSVG) {
  const transitionClasses = el._vtc;
  if (transitionClasses) {
    value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
  }
  if (value == null) {
    el.removeAttribute("class");
  } else if (isSVG) {
    el.setAttribute("class", value);
  } else {
    el.className = value;
  }
}
function patchStyle(el, prev, next) {
  const style2 = el.style;
  const isCssString = isString(next);
  if (next && !isCssString) {
    for (const key in next) {
      setStyle(style2, key, next[key]);
    }
    if (prev && !isString(prev)) {
      for (const key in prev) {
        if (next[key] == null) {
          setStyle(style2, key, "");
        }
      }
    }
  } else {
    const currentDisplay = style2.display;
    if (isCssString) {
      if (prev !== next) {
        style2.cssText = next;
      }
    } else if (prev) {
      el.removeAttribute("style");
    }
    if ("_vod" in el) {
      style2.display = currentDisplay;
    }
  }
}
const semicolonRE = /[^\\];\s*$/;
const importantRE = /\s*!important$/;
function setStyle(style2, name, val) {
  if (isArray(val)) {
    val.forEach((v) => setStyle(style2, name, v));
  } else {
    if (val == null)
      val = "";
    {
      if (semicolonRE.test(val)) {
        warn(`Unexpected semicolon at the end of '${name}' style value: '${val}'`);
      }
    }
    if (name.startsWith("--")) {
      style2.setProperty(name, val);
    } else {
      const prefixed = autoPrefix(style2, name);
      if (importantRE.test(val)) {
        style2.setProperty(hyphenate(prefixed), val.replace(importantRE, ""), "important");
      } else {
        style2[prefixed] = val;
      }
    }
  }
}
const prefixes = ["Webkit", "Moz", "ms"];
const prefixCache = {};
function autoPrefix(style2, rawName) {
  const cached = prefixCache[rawName];
  if (cached) {
    return cached;
  }
  let name = camelize(rawName);
  if (name !== "filter" && name in style2) {
    return prefixCache[rawName] = name;
  }
  name = capitalize(name);
  for (let i = 0; i < prefixes.length; i++) {
    const prefixed = prefixes[i] + name;
    if (prefixed in style2) {
      return prefixCache[rawName] = prefixed;
    }
  }
  return rawName;
}
const xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value, isSVG, instance) {
  if (isSVG && key.startsWith("xlink:")) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    const isBoolean = isSpecialBooleanAttr(key);
    if (value == null || isBoolean && !includeBooleanAttr(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, isBoolean ? "" : value);
    }
  }
}
function patchDOMProp(el, key, value, prevChildren, parentComponent, parentSuspense, unmountChildren) {
  if (key === "innerHTML" || key === "textContent") {
    if (prevChildren) {
      unmountChildren(prevChildren, parentComponent, parentSuspense);
    }
    el[key] = value == null ? "" : value;
    return;
  }
  if (key === "value" && el.tagName !== "PROGRESS" && !el.tagName.includes("-")) {
    el._value = value;
    const newValue = value == null ? "" : value;
    if (el.value !== newValue || el.tagName === "OPTION") {
      el.value = newValue;
    }
    if (value == null) {
      el.removeAttribute(key);
    }
    return;
  }
  let needRemove = false;
  if (value === "" || value == null) {
    const type = typeof el[key];
    if (type === "boolean") {
      value = includeBooleanAttr(value);
    } else if (value == null && type === "string") {
      value = "";
      needRemove = true;
    } else if (type === "number") {
      value = 0;
      needRemove = true;
    }
  }
  try {
    el[key] = value;
  } catch (e) {
    if (!needRemove) {
      warn(`Failed setting prop "${key}" on <${el.tagName.toLowerCase()}>: value ${value} is invalid.`, e);
    }
  }
  needRemove && el.removeAttribute(key);
}
function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
}
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
  const invokers = el._vei || (el._vei = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    existingInvoker.value = nextValue;
  } else {
    const [name, options] = parseName(rawName);
    if (nextValue) {
      const invoker = invokers[rawName] = createInvoker(nextValue, instance);
      addEventListener(el, name, invoker, options);
    } else if (existingInvoker) {
      removeEventListener(el, name, existingInvoker, options);
      invokers[rawName] = void 0;
    }
  }
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(name) {
  let options;
  if (optionsModifierRE.test(name)) {
    options = {};
    let m;
    while (m = name.match(optionsModifierRE)) {
      name = name.slice(0, name.length - m[0].length);
      options[m[0].toLowerCase()] = true;
    }
  }
  const event = name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2));
  return [event, options];
}
let cachedNow = 0;
const p = /* @__PURE__ */ Promise.resolve();
const getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
function createInvoker(initialValue, instance) {
  const invoker = (e) => {
    if (!e._vts) {
      e._vts = Date.now();
    } else if (e._vts <= invoker.attached) {
      return;
    }
    callWithAsyncErrorHandling(patchStopImmediatePropagation(e, invoker.value), instance, 5, [e]);
  };
  invoker.value = initialValue;
  invoker.attached = getNow();
  return invoker;
}
function patchStopImmediatePropagation(e, value) {
  if (isArray(value)) {
    const originalStop = e.stopImmediatePropagation;
    e.stopImmediatePropagation = () => {
      originalStop.call(e);
      e._stopped = true;
    };
    return value.map((fn) => (e2) => !e2._stopped && fn && fn(e2));
  } else {
    return value;
  }
}
const nativeOnRE = /^on[a-z]/;
const patchProp = (el, key, prevValue, nextValue, isSVG = false, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
  if (key === "class") {
    patchClass(el, nextValue, isSVG);
  } else if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if (isOn(key)) {
    if (!isModelListener(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
    patchDOMProp(el, key, nextValue, prevChildren, parentComponent, parentSuspense, unmountChildren);
  } else {
    if (key === "true-value") {
      el._trueValue = nextValue;
    } else if (key === "false-value") {
      el._falseValue = nextValue;
    }
    patchAttr(el, key, nextValue, isSVG);
  }
};
function shouldSetAsProp(el, key, value, isSVG) {
  if (isSVG) {
    if (key === "innerHTML" || key === "textContent") {
      return true;
    }
    if (key in el && nativeOnRE.test(key) && isFunction(value)) {
      return true;
    }
    return false;
  }
  if (key === "spellcheck" || key === "draggable" || key === "translate") {
    return false;
  }
  if (key === "form") {
    return false;
  }
  if (key === "list" && el.tagName === "INPUT") {
    return false;
  }
  if (key === "type" && el.tagName === "TEXTAREA") {
    return false;
  }
  if (nativeOnRE.test(key) && isString(value)) {
    return false;
  }
  return key in el;
}
const rendererOptions = /* @__PURE__ */ extend({ patchProp }, nodeOps);
let renderer;
let enabledHydration = false;
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}
function ensureHydrationRenderer() {
  renderer = enabledHydration ? renderer : createHydrationRenderer(rendererOptions);
  enabledHydration = true;
  return renderer;
}
const createApp = (...args) => {
  const app = ensureRenderer().createApp(...args);
  {
    injectNativeTagCheck(app);
    injectCompilerOptionsCheck(app);
  }
  const { mount } = app;
  app.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (!container)
      return;
    const component = app._component;
    if (!isFunction(component) && !component.render && !component.template) {
      component.template = container.innerHTML;
    }
    container.innerHTML = "";
    const proxy = mount(container, false, container instanceof SVGElement);
    if (container instanceof Element) {
      container.removeAttribute("v-cloak");
      container.setAttribute("data-v-app", "");
    }
    return proxy;
  };
  return app;
};
const createSSRApp = (...args) => {
  const app = ensureHydrationRenderer().createApp(...args);
  {
    injectNativeTagCheck(app);
    injectCompilerOptionsCheck(app);
  }
  const { mount } = app;
  app.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (container) {
      return mount(container, true, container instanceof SVGElement);
    }
  };
  return app;
};
function injectNativeTagCheck(app) {
  Object.defineProperty(app.config, "isNativeTag", {
    value: (tag) => isHTMLTag(tag) || isSVGTag(tag),
    writable: false
  });
}
function injectCompilerOptionsCheck(app) {
  {
    const isCustomElement = app.config.isCustomElement;
    Object.defineProperty(app.config, "isCustomElement", {
      get() {
        return isCustomElement;
      },
      set() {
        warn(`The \`isCustomElement\` config option is deprecated. Use \`compilerOptions.isCustomElement\` instead.`);
      }
    });
    const compilerOptions = app.config.compilerOptions;
    const msg = `The \`compilerOptions\` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka "full build"). Since you are using the runtime-only build, \`compilerOptions\` must be passed to \`@vue/compiler-dom\` in the build setup instead.
- For vue-loader: pass it via vue-loader's \`compilerOptions\` loader option.
- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader
- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-dom`;
    Object.defineProperty(app.config, "compilerOptions", {
      get() {
        warn(msg);
        return compilerOptions;
      },
      set() {
        warn(msg);
      }
    });
  }
}
function normalizeContainer(container) {
  if (isString(container)) {
    const res = document.querySelector(container);
    if (!res) {
      warn(`Failed to mount app: mount target selector "${container}" returned null.`);
    }
    return res;
  }
  if (window.ShadowRoot && container instanceof window.ShadowRoot && container.mode === "closed") {
    warn(`mounting on a ShadowRoot with \`{mode: "closed"}\` may lead to unpredictable bugs`);
  }
  return container;
}
const TagsWithInnerContent = ["script", "style", "noscript"];
const HasElementTags = [
  "base",
  "meta",
  "link",
  "style",
  "script",
  "noscript"
];
const UniqueTags = ["base", "title", "titleTemplate", "bodyAttrs", "htmlAttrs"];
function tagDedupeKey(tag, fn) {
  const { props, tag: tagName } = tag;
  if (UniqueTags.includes(tagName))
    return tagName;
  if (tagName === "link" && props.rel === "canonical")
    return "canonical";
  if (props.charset)
    return "charset";
  const name = ["id"];
  if (tagName === "meta")
    name.push(...["name", "property", "http-equiv"]);
  for (const n of name) {
    if (typeof props[n] !== "undefined") {
      const val = String(props[n]);
      if (fn && !fn(val))
        return false;
      return `${tagName}:${n}:${val}`;
    }
  }
  return false;
}
const setAttrs = (ctx, markSideEffect) => {
  const { tag, $el } = ctx;
  if (!$el)
    return;
  Object.entries(tag.props).forEach(([k, value]) => {
    value = String(value);
    const attrSdeKey = `attr:${k}`;
    if (k === "class") {
      if (!value)
        return;
      for (const c of value.split(" ")) {
        const classSdeKey = `${attrSdeKey}:${c}`;
        if (markSideEffect)
          markSideEffect(ctx, classSdeKey, () => $el.classList.remove(c));
        if (!$el.classList.contains(c))
          $el.classList.add(c);
      }
      return;
    }
    if (markSideEffect && !k.startsWith("data-h-"))
      markSideEffect(ctx, attrSdeKey, () => $el.removeAttribute(k));
    if ($el.getAttribute(k) !== value)
      $el.setAttribute(k, value);
  });
  if (TagsWithInnerContent.includes(tag.tag) && $el.innerHTML !== (tag.children || ""))
    $el.innerHTML = tag.children || "";
};
function hashCode(s) {
  let h = 9;
  for (let i = 0; i < s.length; )
    h = Math.imul(h ^ s.charCodeAt(i++), 9 ** 9);
  return ((h ^ h >>> 9) + 65536).toString(16).substring(1, 8).toLowerCase();
}
async function renderDOMHead(head, options = {}) {
  var _a, _b;
  const ctx = { shouldRender: true };
  await head.hooks.callHook("dom:beforeRender", ctx);
  if (!ctx.shouldRender)
    return;
  const dom = options.document || window.document;
  const staleSideEffects = head._popSideEffectQueue();
  head.headEntries().map((entry) => entry._sde).forEach((sde) => {
    Object.entries(sde).forEach(([key, fn]) => {
      staleSideEffects[key] = fn;
    });
  });
  const preRenderTag = async (tag) => {
    const entry = head.headEntries().find((e) => e._i === tag._e);
    const renderCtx = {
      renderId: tag._d || hashCode(JSON.stringify({ ...tag, _e: void 0, _p: void 0 })),
      $el: null,
      shouldRender: true,
      tag,
      entry,
      staleSideEffects
    };
    await head.hooks.callHook("dom:beforeRenderTag", renderCtx);
    return renderCtx;
  };
  const renders = [];
  const pendingRenders = {
    body: [],
    head: []
  };
  const markSideEffect = (ctx2, key, fn) => {
    key = `${ctx2.renderId}:${key}`;
    if (ctx2.entry)
      ctx2.entry._sde[key] = fn;
    delete staleSideEffects[key];
  };
  const markEl = (ctx2) => {
    head._elMap[ctx2.renderId] = ctx2.$el;
    renders.push(ctx2);
    markSideEffect(ctx2, "el", () => {
      var _a2;
      (_a2 = ctx2.$el) == null ? void 0 : _a2.remove();
      delete head._elMap[ctx2.renderId];
    });
  };
  for (const t of await head.resolveTags()) {
    const ctx2 = await preRenderTag(t);
    if (!ctx2.shouldRender)
      continue;
    const { tag } = ctx2;
    if (tag.tag === "title") {
      dom.title = tag.children || "";
      renders.push(ctx2);
      continue;
    }
    if (tag.tag === "htmlAttrs" || tag.tag === "bodyAttrs") {
      ctx2.$el = dom[tag.tag === "htmlAttrs" ? "documentElement" : "body"];
      setAttrs(ctx2, markSideEffect);
      renders.push(ctx2);
      continue;
    }
    ctx2.$el = head._elMap[ctx2.renderId];
    if (!ctx2.$el && tag._hash) {
      ctx2.$el = dom.querySelector(`${((_a = tag.tagPosition) == null ? void 0 : _a.startsWith("body")) ? "body" : "head"} > ${tag.tag}[data-h-${tag._hash}]`);
    }
    if (ctx2.$el) {
      if (ctx2.tag._d)
        setAttrs(ctx2);
      markEl(ctx2);
      continue;
    }
    ctx2.$el = dom.createElement(tag.tag);
    setAttrs(ctx2);
    pendingRenders[((_b = tag.tagPosition) == null ? void 0 : _b.startsWith("body")) ? "body" : "head"].push(ctx2);
  }
  Object.entries(pendingRenders).forEach(([pos, queue]) => {
    if (!queue.length)
      return;
    for (const $el of [...dom[pos].children].reverse()) {
      const elTag = $el.tagName.toLowerCase();
      if (!HasElementTags.includes(elTag))
        continue;
      const dedupeKey = tagDedupeKey({
        tag: elTag,
        props: $el.getAttributeNames().reduce((props, name) => ({ ...props, [name]: $el.getAttribute(name) }), {})
      });
      const matchIdx = queue.findIndex((ctx2) => ctx2 && (ctx2.tag._d === dedupeKey || $el.isEqualNode(ctx2.$el)));
      if (matchIdx !== -1) {
        const ctx2 = queue[matchIdx];
        ctx2.$el = $el;
        setAttrs(ctx2);
        markEl(ctx2);
        delete queue[matchIdx];
      }
    }
    queue.forEach((ctx2) => {
      if (!ctx2.$el)
        return;
      switch (ctx2.tag.tagPosition) {
        case "bodyClose":
          dom.body.appendChild(ctx2.$el);
          break;
        case "bodyOpen":
          dom.body.insertBefore(ctx2.$el, dom.body.firstChild);
          break;
        case "head":
        default:
          dom.head.appendChild(ctx2.$el);
          break;
      }
      markEl(ctx2);
    });
  });
  for (const ctx2 of renders)
    await head.hooks.callHook("dom:renderTag", ctx2);
  Object.values(staleSideEffects).forEach((fn) => fn());
}
let domUpdatePromise = null;
async function debouncedRenderDOMHead(head, options = {}) {
  function doDomUpdate() {
    domUpdatePromise = null;
    return renderDOMHead(head, options);
  }
  const delayFn = options.delayFn || ((fn) => setTimeout(fn, 10));
  return domUpdatePromise = domUpdatePromise || new Promise((resolve) => delayFn(() => resolve(doDomUpdate())));
}
function createHead(initHeadObject) {
  const unhead = createHead$1();
  const legacyHead = {
    unhead,
    install(app) {
      if (version.startsWith("3")) {
        app.config.globalProperties.$head = unhead;
        app.provide("usehead", unhead);
      }
    },
    use(plugin) {
      unhead.use(plugin);
    },
    resolveTags() {
      return unhead.resolveTags();
    },
    headEntries() {
      return unhead.headEntries();
    },
    headTags() {
      return unhead.resolveTags();
    },
    push(input, options) {
      return unhead.push(input, options);
    },
    addEntry(input, options) {
      return unhead.push(input, options);
    },
    addHeadObjs(input, options) {
      return unhead.push(input, options);
    },
    addReactiveEntry(input, options) {
      const api = useHead(input, options);
      if (typeof api !== "undefined")
        return api.dispose;
      return () => {
      };
    },
    removeHeadObjs() {
    },
    updateDOM(document2, force) {
      if (force)
        renderDOMHead(unhead, { document: document2 });
      else
        debouncedRenderDOMHead(unhead, { delayFn: (fn) => setTimeout(() => fn(), 50), document: document2 });
    },
    internalHooks: unhead.hooks,
    hooks: {
      "before:dom": [],
      "resolved:tags": [],
      "resolved:entries": []
    }
  };
  unhead.addHeadObjs = legacyHead.addHeadObjs;
  unhead.updateDOM = legacyHead.updateDOM;
  unhead.hooks.hook("dom:beforeRender", (ctx) => {
    for (const hook of legacyHead.hooks["before:dom"]) {
      if (hook() === false)
        ctx.shouldRender = false;
    }
  });
  if (initHeadObject)
    legacyHead.addHeadObjs(initHeadObject);
  return legacyHead;
}
Vue2ProvideUnheadPlugin;
function deserializeState(state) {
  try {
    return JSON.parse(state || "{}");
  } catch (error) {
    console.error("[SSG] On state deserialization -", error, state);
    return {};
  }
}
function documentReady(_passThrough) {
  if (document.readyState === "loading") {
    return new Promise((resolve) => {
      document.addEventListener("DOMContentLoaded", () => resolve(_passThrough));
    });
  }
  return Promise.resolve(_passThrough);
}
const ClientOnly = defineComponent({
  setup(props, { slots }) {
    const mounted = ref(false);
    onMounted(() => mounted.value = true);
    return () => {
      if (!mounted.value)
        return slots.placeholder && slots.placeholder({});
      return slots.default && slots.default({});
    };
  }
});
function ViteSSG(App2, routerOptions, fn, options = {}) {
  const {
    transformState,
    registerComponents = true,
    useHead: useHead2 = true,
    rootContainer = "#app"
  } = options;
  const isClient = typeof window !== "undefined";
  async function createApp$1(client = false, routePath) {
    const app = client ? createApp(App2) : createSSRApp(App2);
    let head;
    if (useHead2) {
      head = createHead();
      app.use(head);
    }
    const router = createRouter({
      history: client ? createWebHistory(routerOptions.base) : createMemoryHistory(routerOptions.base),
      ...routerOptions
    });
    const { routes: routes2 } = routerOptions;
    if (registerComponents)
      app.component("ClientOnly", ClientOnly);
    const appRenderCallbacks = [];
    const onSSRAppRendered = client ? () => {
    } : (cb) => appRenderCallbacks.push(cb);
    const triggerOnSSRAppRendered = () => {
      return Promise.all(appRenderCallbacks.map((cb) => cb()));
    };
    const context = {
      app,
      head,
      isClient,
      router,
      routes: routes2,
      onSSRAppRendered,
      triggerOnSSRAppRendered,
      initialState: {},
      transformState,
      routePath
    };
    if (client) {
      await documentReady();
      context.initialState = (transformState == null ? void 0 : transformState(window.__INITIAL_STATE__ || {})) || deserializeState(window.__INITIAL_STATE__);
    }
    await (fn == null ? void 0 : fn(context));
    app.use(router);
    let entryRoutePath;
    let isFirstRoute = true;
    router.beforeEach((to, from, next) => {
      if (isFirstRoute || entryRoutePath && entryRoutePath === to.path) {
        isFirstRoute = false;
        entryRoutePath = to.path;
        to.meta.state = context.initialState;
      }
      next();
    });
    if (!client) {
      const route = context.routePath ?? "/";
      router.push(route);
      await router.isReady();
      context.initialState = router.currentRoute.value.meta.state || {};
    }
    const initialState = context.initialState;
    return {
      ...context,
      initialState
    };
  }
  if (isClient) {
    (async () => {
      const { app, router } = await createApp$1(true);
      await router.isReady();
      app.mount(rootContainer, true);
    })();
  }
  return createApp$1;
}
const _sfc_main$2 = {};
const _hoisted_1$1 = { id: "navigationBar" };
const _hoisted_2$1 = { class: "page_column_wrapper" };
const _hoisted_3$1 = { id: "navigationLinks" };
const _hoisted_4$1 = /* @__PURE__ */ createBaseVNode("li", null, [
  /* @__PURE__ */ createBaseVNode("a", { href: "https://qwertovsky.com/blog" }, "Blog")
], -1);
function _sfc_render(_ctx, _cache) {
  const _component_router_link = resolveComponent("router-link");
  return openBlock(), createElementBlock("nav", _hoisted_1$1, [
    createBaseVNode("div", _hoisted_2$1, [
      createBaseVNode("ul", null, [
        createBaseVNode("li", null, [
          createVNode(_component_router_link, { to: "/" }, {
            default: withCtx(() => [
              createTextVNode("Qwertovsky")
            ]),
            _: 1
          })
        ])
      ]),
      createBaseVNode("ul", _hoisted_3$1, [
        createBaseVNode("li", null, [
          createVNode(_component_router_link, { to: "/resume" }, {
            default: withCtx(() => [
              createTextVNode("Resume")
            ]),
            _: 1
          })
        ]),
        createBaseVNode("li", null, [
          createVNode(_component_router_link, { to: "/portfolio" }, {
            default: withCtx(() => [
              createTextVNode("Projects")
            ]),
            _: 1
          })
        ]),
        _hoisted_4$1
      ])
    ])
  ]);
}
const TheHeader = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render], ["__file", "/media/disk/_work/Qwertovsky/site/src/components/TheHeader.vue"]]);
const _hoisted_1 = { id: "page-footer" };
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("a", {
  class: "footer_logo",
  href: "//www.qwertovsky.com"
}, [
  /* @__PURE__ */ createBaseVNode("img", { src: _imports_0 })
], -1);
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("div", { class: "copyright" }, "Qwertovsky", -1);
const _hoisted_4 = /* @__PURE__ */ createBaseVNode("div", { class: "spacer" }, null, -1);
const _hoisted_5 = /* @__PURE__ */ createBaseVNode("a", {
  title: "bitbucket",
  href: "https://bitbucket.org/qwertovsky"
}, [
  /* @__PURE__ */ createBaseVNode("svg", {
    alt: "Bitbucket",
    version: "1.0",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "30 30 260 260"
  }, [
    /* @__PURE__ */ createBaseVNode("g", { transform: "translate(0,320) scale(0.10000, -0.100000)" }, [
      /* @__PURE__ */ createBaseVNode("path", { d: "M399 2713 c-33 -14 -51 -51 -44 -91 2 -15 7 -43 10 -62 3 -19 8 -46 10 -60 3 -14 7 -41 10 -60 3 -19 7 -46 10 -60 3 -14 8 -45 10 -68 3 -24 7 -47 9 -50 2 -4 7 -34 11 -67 3 -32 8 -62 10 -65 2 -4 7 -29 11 -56 3 -27 7 -56 9 -64 1 -8 6 -35 10 -60 4 -25 9 -54 11 -65 2 -11 11 -63 19 -115 9 -52 17 -104 19 -115 2 -11 7 -40 11 -65 4 -25 9 -54 11 -65 2 -11 7 -40 10 -65 3 -25 7 -52 9 -60 3 -8 7 -33 10 -55 3 -22 8 -49 10 -61 2 -11 7 -45 11 -75 3 -30 8 -57 10 -60 2 -4 8 -38 14 -75 5 -38 12 -80 14 -94 3 -14 8 -38 11 -55 3 -16 8 -48 10 -70 3 -22 12 -78 20 -125 8 -47 17 -98 20 -115 11 -65 17 -81 34 -102 11 -13 31 -27 45 -33 16 -6 330 -8 853 -6 455 2 833 4 840 5 7 0 21 11 32 22 18 19 23 38 36 129 2 14 11 68 20 120 9 52 18 106 20 120 2 14 18 111 35 215 17 105 33 204 36 220 2 17 9 55 14 85 18 98 91 554 95 595 3 22 7 51 10 65 8 38 13 70 20 120 3 25 8 52 10 60 2 8 6 33 10 55 6 44 5 38 35 211 25 153 25 167 -3 200 l-23 27 -1188 1 c-921 1 -1194 -1 -1217 -11z m1550 -966 c-21 -122 -40 -233 -42 -247 -3 -14 -12 -74 -22 -135 -10 -60 -22 -114 -26 -119 -6 -7 -343 -12 -490 -7 -25 1 -27 6 -43 89 -9 48 -19 98 -21 112 -3 14 -7 39 -10 55 -3 17 -8 41 -10 55 -8 37 -14 68 -25 130 -12 66 -18 97 -25 130 -3 14 -8 39 -11 55 -2 17 -9 44 -13 62 -6 22 -6 33 2 36 7 2 183 4 393 5 l380 0 -37 -221z" })
    ])
  ])
], -1);
const _hoisted_6 = /* @__PURE__ */ createBaseVNode("a", {
  title: "github",
  href: "https://github.com/Qwertovsky"
}, [
  /* @__PURE__ */ createBaseVNode("svg", {
    alt: "GitHub",
    viewBox: "0 0 16 16",
    "aria-hidden": "true"
  }, [
    /* @__PURE__ */ createBaseVNode("path", {
      "fill-rule": "evenodd",
      d: "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
    })
  ])
], -1);
const _hoisted_7 = /* @__PURE__ */ createBaseVNode("a", {
  title: "LinkedIn",
  href: "https://www.linkedin.com/in/qwertovsky"
}, [
  /* @__PURE__ */ createBaseVNode("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    alt: "LinkedIn",
    viewBox: "0 0 34 34"
  }, [
    /* @__PURE__ */ createBaseVNode("g", null, [
      /* @__PURE__ */ createBaseVNode("path", { d: "M34,2.5v29A2.5,2.5,0,0,1,31.5,34H2.5A2.5,2.5,0,0,1,0,31.5V2.5A2.5,2.5,0,0,1,2.5,0h29A2.5,2.5,0,0,1,34,2.5ZM10,13H5V29h5Zm.45-5.5A2.88,2.88,0,0,0,7.59,4.6H7.5a2.9,2.9,0,0,0,0,5.8h0a2.88,2.88,0,0,0,2.95-2.81ZM29,19.28c0-4.81-3.06-6.68-6.1-6.68a5.7,5.7,0,0,0-5.06,2.58H17.7V13H13V29h5V20.49a3.32,3.32,0,0,1,3-3.58h.19c1.59,0,2.77,1,2.77,3.52V29h5Z" })
    ])
  ])
], -1);
const _hoisted_8 = /* @__PURE__ */ createBaseVNode("a", {
  title: "twitter",
  href: "https://twitter.com/qwertovsky"
}, [
  /* @__PURE__ */ createBaseVNode("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    alt: "Twitter",
    viewBox: "0 0 512 512"
  }, [
    /* @__PURE__ */ createBaseVNode("path", {
      d: "M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z",
      class: ""
    })
  ])
], -1);
const _hoisted_9 = /* @__PURE__ */ createBaseVNode("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  alt: "Email",
  viewBox: "0 0 512 512"
}, [
  /* @__PURE__ */ createBaseVNode("path", { d: "M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z" })
], -1);
const _hoisted_10 = [
  _hoisted_9
];
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "TheFooter",
  setup(__props) {
    const email = "g7opj79577vmd3ds@fastmail.com";
    const emailHref = "mailto:" + email;
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("footer", _hoisted_1, [
        createBaseVNode("div", { class: "line" }, [
          _hoisted_2,
          _hoisted_3,
          _hoisted_4,
          createBaseVNode("div", { class: "links" }, [
            _hoisted_5,
            _hoisted_6,
            _hoisted_7,
            _hoisted_8,
            createBaseVNode("a", {
              title: "Write email",
              href: emailHref
            }, _hoisted_10)
          ])
        ])
      ]);
    };
  }
});
const TheFooter = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "/media/disk/_work/Qwertovsky/site/src/components/TheFooter.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "App",
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_router_view = resolveComponent("router-view");
      return openBlock(), createElementBlock("div", null, [
        createVNode(TheHeader),
        createVNode(_component_router_view),
        createVNode(TheFooter)
      ]);
    };
  }
});
const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/media/disk/_work/Qwertovsky/site/src/App.vue"]]);
const style = "";
ViteSSG(
  App,
  { routes },
  ({ app, router, routes: routes2, isClient, initialState }) => {
  }
);
