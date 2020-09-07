import { r as defineComponent, u as useHead, I as createHead, A as resolveComponent, C as createElementBlock, D as createBaseVNode, E as createVNode, F as withCtx, J as createStaticVNode, B as openBlock, _ as _export_sfc } from "./index-bbfa13ff.js";
import { _ as _imports_0 } from "./largeqwerto-4298bb8a.js";
const _imports_1 = "/assets/cv-91fb7253.svg";
const _imports_2 = "/assets/portfolio-ce1d1ff4.svg";
const _imports_3 = "/assets/blog-ff67b9c1.svg";
const _imports_4 = "/assets/bitbucket-d6a766bc.svg";
const _imports_5 = "/assets/github-a735b7cb.svg";
const _imports_6 = "/assets/sovcombank-903e5066.svg";
const _imports_7 = "/assets/epam-a47ffb8f.svg";
const _imports_8 = "/assets/rostelecom-33499520.svg";
const _hoisted_1 = { id: "mainPageContent" };
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("div", {
  id: "welcomeRow",
  class: "content_section"
}, [
  /* @__PURE__ */ createBaseVNode("div", { class: "page_column_wrapper" }, [
    /* @__PURE__ */ createBaseVNode("div", { id: "welcomeText" }, [
      /* @__PURE__ */ createBaseVNode("h1", null, "Valery Qwertovsky"),
      /* @__PURE__ */ createBaseVNode("h4", null, "Full-Stack Java Software Engineer")
    ]),
    /* @__PURE__ */ createBaseVNode("div", null, [
      /* @__PURE__ */ createBaseVNode("img", {
        src: _imports_0,
        class: "large_qwerto"
      })
    ])
  ])
], -1);
const _hoisted_3 = {
  id: "moreInformation",
  class: "content_section"
};
const _hoisted_4 = { class: "page_column_wrapper" };
const _hoisted_5 = /* @__PURE__ */ createBaseVNode("h2", null, "Experience", -1);
const _hoisted_6 = /* @__PURE__ */ createBaseVNode("div", null, [
  /* @__PURE__ */ createBaseVNode("img", {
    src: _imports_1,
    class: "cv"
  }),
  /* @__PURE__ */ createBaseVNode("h4", null, "Resume"),
  /* @__PURE__ */ createBaseVNode("p", null, "Summary of my experience and background. My contacts. The skills")
], -1);
const _hoisted_7 = /* @__PURE__ */ createBaseVNode("div", null, [
  /* @__PURE__ */ createBaseVNode("img", {
    src: _imports_2,
    class: "portfolio"
  }),
  /* @__PURE__ */ createBaseVNode("h4", null, "Past projects"),
  /* @__PURE__ */ createBaseVNode("p", null, "The list of my projects. Projects in which I participated. Technologies I worked with. My role in the projects")
], -1);
const _hoisted_8 = /* @__PURE__ */ createStaticVNode('<div id="myResources" class="content_section"><div class="page_column_wrapper"><h2>Public resources</h2><a class="resource_item" href="//qwertovsky.com/blog"><img src="' + _imports_3 + '" class="cv"><h4>Blog</h4><p>Publications. Information about my projects</p></a><a class="resource_item" href="https://bitbucket.org/qwertovsky"><img src="' + _imports_4 + '" class="portfolio"><h4>Bitbucket</h4><p>Source code</p></a><a class="resource_item" href="https://github.com/Qwertovsky"><img src="' + _imports_5 + '" class="cv"><h4>GitHub</h4><p>Source code</p></a></div></div><div id="myEmployers" class="content_section"><div class="page_column_wrapper"><h2>Employers</h2><div class="employer_item"><img src="' + _imports_6 + '" class="sovcombank_logo" alt="Sovcombank Technologies"><p>Sovcombank Technologies</p></div><div class="employer_item"><img src="' + _imports_7 + '" class="epam_logo" alt="EPAM Systems"><p>EPAM Systems</p></div><div class="employer_item"><img src="' + _imports_8 + '" class="rostelecom_logo" alt="Ростелеком"><p>Rostelecom</p></div></div></div>', 2);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MainPage",
  setup(__props) {
    useHead(createHead());
    return (_ctx, _cache) => {
      const _component_router_link = resolveComponent("router-link");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _hoisted_2,
        createBaseVNode("div", _hoisted_3, [
          createBaseVNode("div", _hoisted_4, [
            _hoisted_5,
            createVNode(_component_router_link, { to: "/resume" }, {
              default: withCtx(() => [
                _hoisted_6
              ]),
              _: 1
            }),
            createVNode(_component_router_link, { to: "/portfolio" }, {
              default: withCtx(() => [
                _hoisted_7
              ]),
              _: 1
            })
          ])
        ]),
        _hoisted_8
      ]);
    };
  }
});
const MainPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/media/disk/_work/Qwertovsky/site/src/components/MainPage.vue"]]);
export {
  MainPage as default
};
