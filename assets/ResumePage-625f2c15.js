import { r as defineComponent, u as useHead, I as createHead, C as createElementBlock, D as createBaseVNode, G as createTextVNode, K as toDisplayString, L as unref, J as createStaticVNode, B as openBlock, _ as _export_sfc } from "./index-bbfa13ff.js";
import { _ as _imports_0 } from "./pdf-file-2f1ba593.js";
const _hoisted_1 = { id: "resume" };
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("div", { class: "full_name" }, "Valery Qwertovsky", -1);
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("div", { class: "specialization" }, "Full-Stack Java Software Engineer", -1);
const _hoisted_4 = { id: "contacts" };
const _hoisted_5 = {
  class: "contacts",
  style: { "margin-right": "20px" }
};
const _hoisted_6 = { class: "contact" };
const _hoisted_7 = /* @__PURE__ */ createStaticVNode('<div class="contact">Linkedin: <a href="https://www.linkedin.com/in/qwertovsky">linkedin.com/in/qwertovsky</a></div><div class="contact">Site and portfolio: <a href="https://qwertovsky.com">qwertovsky.com</a></div><div class="contact">Bitbucket: <a href="https://bitbucket.org/qwertovsky">bitbucket.org/qwertovsky</a></div><div class="contact">GitHub: <a href="https://github.com/qwertovsky">github.com/qwertovsky</a></div>', 4);
const _hoisted_11 = /* @__PURE__ */ createBaseVNode("div", null, [
  /* @__PURE__ */ createBaseVNode("a", {
    id: "pdf",
    title: "pdf",
    onclick: "window.print()"
  }, [
    /* @__PURE__ */ createBaseVNode("img", {
      width: "30",
      height: "30",
      alt: "pdf",
      src: _imports_0
    })
  ])
], -1);
const _hoisted_12 = { id: "contacts_print" };
const _hoisted_13 = { class: "contacts" };
const _hoisted_14 = { class: "contact" };
const _hoisted_15 = /* @__PURE__ */ createBaseVNode("div", { class: "contact" }, "Linkedin: linkedin.com/in/qwertovsky", -1);
const _hoisted_16 = /* @__PURE__ */ createBaseVNode("div", { class: "contacts" }, [
  /* @__PURE__ */ createBaseVNode("div", { class: "contact" }, "Site and portfolio: qwertovsky.com"),
  /* @__PURE__ */ createBaseVNode("div", { class: "contact" }, "Bitbucket: bitbucket.org/qwertovsky"),
  /* @__PURE__ */ createBaseVNode("div", { class: "contact" }, "GitHub: github.com/qwertovsky")
], -1);
const _hoisted_17 = /* @__PURE__ */ createStaticVNode('<div class="section key_skills"> Passionate about software development and product quality. Experience 10+ years with Java. Understanding of unit testing in JUnit and Mockito. Backend familiarity with JSF, PostgreSQL, JBoss. Frontend 10+ years practice of technologies such as JavaScript, HTML/CSS. Like Vue.js. Good working knowledge of GIT and working with code in a multi-developer environment. Experience with Linux. Longtime user of Eclipse. </div><div class="section experiences"><div class="header">Experience</div><div class="experience"><div class="header">Pet projects</div> Experimenting with new technologies. Creating new libraries and tools which can help in my life or work. <div class="skills"><span class="header">Tools:</span> PostgreSQL, Eclipse, Git<br><span class="header">Technologies:</span> Java, Vert.x, JDBC, SQL, JavaScript, Vue.js, HTML, CSS </div></div><div class="experience"><div class="header">Software engineer, Sovcombank Technologies, 2021 - now</div> Continuing as part of a distributed team to develop insurance products. <div class="skills"><span class="header">Tools:</span> Jboss 7, Eclipse, Git, Maven, VSCode<br><span class="header">Technologies:</span> EJB, Spring, JDBC, JSF, JavaScript, Angular, HTML, CSS </div></div><div class="experience"><div class="header">Software engineer, EPAM Systems(Insurance), 2014 - 2020</div> Worked as part of a distributed agile team. Developed scalable and secure web-applications for customers and employees contributing to each layer of the tech stack. Improved and refactored all parts of application. Researched technical solutions to meet business needs. Discovered memory leaks. Integrated Spring OAuth to applications. <div class="skills"><span class="header">Tools:</span> Jboss 7, Eclipse, Git, Maven, Eclipse MAT, VSCode, Mockito<br><span class="header">Technologies:</span> EJB, Spring, JDBC, JSF, JavaScript, Angular, HTML, CSS </div></div><div class="experience"><div class="header">Software engineer, EPAM Systems(Online banking), 2013 - 2014</div> Analized hight availability of interface for clients. Rewrited logging system. <div class="skills"><span class="header">Tools:</span> Netbeans, WebSphere, SVN, Maven, Oracle<br><span class="header">Technologies:</span> JPA, JavaScript, HTML, CSS, SQL </div></div><div class="experience"><div class="header">Software engineer, Rostelecom, 2010 - 2013</div> Work with billing and reporting system. Created reports with SQL and FastReports to help marketing. Designed and implemented software tools to get rid of routine. <div class="skills"><span class="header">Tools:</span> Oracle, HP Servise Desk, Jboss 6<br><span class="header">Technologies:</span> SQL, JPA, JSP, Servlets, JSF(RichFaces), JDBC, SWT </div></div></div><div class="section education"><div class="header">Education</div><div class="skills"><span class="header">Tver State Technical University:</span> Engineer (Computers, complexes, systems and networks) </div></div>', 3);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ResumePage",
  setup(__props) {
    useHead(createHead());
    const email = "g7opj79577vmd3ds@fastmail.com";
    const emailHref = "mailto:" + email;
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _hoisted_2,
        _hoisted_3,
        createBaseVNode("div", _hoisted_4, [
          createBaseVNode("div", _hoisted_5, [
            createBaseVNode("div", _hoisted_6, [
              createTextVNode("Email: "),
              createBaseVNode("a", { href: emailHref }, toDisplayString(unref(email)), 1)
            ]),
            _hoisted_7
          ]),
          _hoisted_11
        ]),
        createBaseVNode("div", _hoisted_12, [
          createBaseVNode("div", _hoisted_13, [
            createBaseVNode("div", _hoisted_14, "Email: " + toDisplayString(unref(email)), 1),
            _hoisted_15
          ]),
          _hoisted_16
        ]),
        _hoisted_17
      ]);
    };
  }
});
const ResumePage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/media/disk/_work/Qwertovsky/site/src/components/ResumePage.vue"]]);
export {
  ResumePage as default
};
