import { r as defineComponent, u as useHead, I as createHead, C as createElementBlock, D as createBaseVNode, G as createTextVNode, K as toDisplayString, L as unref, J as createStaticVNode, B as openBlock, _ as _export_sfc } from "./index-bbfa13ff.js";
import { _ as _imports_0 } from "./pdf-file-2f1ba593.js";
const _hoisted_1 = { id: "resume" };
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("div", { class: "full_name" }, "Валерий Квертовский", -1);
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("div", { class: "specialization" }, "Программист", -1);
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
const _hoisted_17 = /* @__PURE__ */ createStaticVNode('<div class="section key_skills"> Увлечен разработкой программного обеспечения и качеством результата. Опыт работы с Java более 10 лет. Понимание модульного тестирования в JUnit и Mockito. В бэкенде работаю с JSF, PostgreSQL, JBoss. Во фронтенде 10+ лет практики с JavaScript, HTML, CSS. Люблю Vue.js. Хорошее знание GIT. Опыт работы с Linux. Давний пользователь Eclipse. </div><div class="section experiences"><div class="header">Опыт</div><div class="experience"><div class="header">Программист, Совкомбанк Страхование, 2021 - now</div> Продолжение работы в составе распределенной команды над страховыми продуктами. <div class="skills"><span class="header">Инструменты:</span> Jboss 7, Eclipse, Git, Maven, VSCode<br><span class="header">Технологии:</span> EJB, Spring, JDBC, JSF, JavaScript, Angular, HTML, CSS </div></div><div class="experience"><div class="header">Программист, ЭПАМ Систэмз (Страхование), 04.2014 - 2020</div> Разработка веб-приложения для клиентов и сотрудников. Работа в составе распределенной agile-команды. <div class="skills"><span class="header">Инструменты:</span> Jboss 7, Eclipse, Git, Maven, Eclipse MAT, VSCode, Mockito<br><span class="header">Технологии:</span> EJB, Spring, JDBC, JSF, JavaScript, Angular, HTML, CSS </div></div><div class="experience"><div class="header">Программист, ЭПАМ Систэмз (Онлайн-банкинг), 07.2013 - 03.2014</div> Разработка веб-приложения для клиентов банка юридических лиц. Анализ производительности. Обеспечение высокой доступности и скорости приложения. Переработка системы логирования. <div class="skills"><span class="header">Инструменты:</span> Netbeans, WebSphere, SVN, Maven, Oracle<br><span class="header">Технологии:</span> JPA, JavaScript, HTML, CSS, SQL </div></div><div class="experience"><div class="header">Программист, Ростелеком, 09.2010 - 06.2013</div> Работа с биллингом и системой отчетности. Создание отчетов с помощью SQL и FastReports для помощи маркетингу. Разработаны и внедрены программные инструменты, позволяющие избавиться от рутины. <div class="skills"><span class="header">Инструменты:</span> Oracle, HP Servise Desk, Jboss 6<br><span class="header">Технологии:</span> SQL, JPA, JSP, Servlets, JSF(RichFaces), JDBC, SWT </div></div><div class="experience"><div class="header">Личные проекты</div> Эксперименты с новыми технологиями. Создание новых библиотек и инструментов. <div class="skills"><span class="header">Инструменты:</span> PostgreSQL, Eclipse, Git<br><span class="header">Технологии:</span> Java, Vert.x, JDBC, SQL, JavaScript, Vue.js, HTML, CSS </div></div></div><div class="section education"><div class="header">Образование</div><div class="skills"><span class="header">Тверской государственный технический университет:</span> Инженер по специальности Вычислительные машины, комплексы, системы и сети </div></div>', 3);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ResumeRuPage",
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
const ResumeRuPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/media/disk/_work/Qwertovsky/site/src/components/ResumeRuPage.vue"]]);
export {
  ResumeRuPage as default
};
