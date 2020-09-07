import { r as defineComponent, B as openBlock, C as createElementBlock, D as createBaseVNode, K as toDisplayString, L as unref, G as createTextVNode, M as createCommentVNode, _ as _export_sfc, u as useHead, I as createHead, N as Fragment, O as renderList, E as createVNode } from "./index-bbfa13ff.js";
const _hoisted_1$1 = { class: "project" };
const _hoisted_2 = { class: "page_column_wrapper" };
const _hoisted_3 = { class: "project_text" };
const _hoisted_4 = { class: "project_text_section project_header" };
const _hoisted_5 = { class: "project_text_section project_description" };
const _hoisted_6 = { class: "project_text_section" };
const _hoisted_7 = /* @__PURE__ */ createBaseVNode("i", null, "Role:", -1);
const _hoisted_8 = { class: "project_text_section" };
const _hoisted_9 = {
  key: 0,
  class: "project_link"
};
const _hoisted_10 = /* @__PURE__ */ createBaseVNode("i", null, "URL:", -1);
const _hoisted_11 = ["href"];
const _hoisted_12 = {
  key: 1,
  class: "project_link"
};
const _hoisted_13 = /* @__PURE__ */ createBaseVNode("i", null, "More info:", -1);
const _hoisted_14 = ["href"];
const _hoisted_15 = {
  key: 2,
  class: "project_link"
};
const _hoisted_16 = /* @__PURE__ */ createBaseVNode("i", null, "Source code:", -1);
const _hoisted_17 = ["href"];
const _hoisted_18 = { class: "project_text_section project_tools" };
const _hoisted_19 = /* @__PURE__ */ createBaseVNode("i", null, "Tools and technologies:", -1);
const _hoisted_20 = /* @__PURE__ */ createBaseVNode("br", null, null, -1);
const _hoisted_21 = { class: "project_text_section project_dates" };
const _hoisted_22 = /* @__PURE__ */ createBaseVNode("i", null, "Dates:", -1);
const _hoisted_23 = { class: "project_img" };
const _hoisted_24 = ["src"];
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "PortfolioProject",
  props: {
    project: Object
  },
  setup(__props) {
    const props = __props;
    const project = Object.assign(
      {
        imgUrl: null,
        linkHref: null,
        linkText: null,
        srcHref: null,
        srcText: null,
        infoHref: null,
        infoText: null
      },
      props.project
    );
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("section", _hoisted_1$1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", _hoisted_4, toDisplayString(unref(project).name), 1),
            createBaseVNode("div", _hoisted_5, toDisplayString(unref(project).description), 1),
            createBaseVNode("div", _hoisted_6, [
              _hoisted_7,
              createTextVNode(" " + toDisplayString(unref(project).role), 1)
            ]),
            createBaseVNode("div", _hoisted_8, [
              unref(project).linkHref ? (openBlock(), createElementBlock("span", _hoisted_9, [
                _hoisted_10,
                createTextVNode(),
                createBaseVNode("a", {
                  href: unref(project).linkHref
                }, toDisplayString(unref(project).linkText || unref(project).linkHref), 9, _hoisted_11)
              ])) : createCommentVNode("v-if", true),
              unref(project).infoHref ? (openBlock(), createElementBlock("span", _hoisted_12, [
                _hoisted_13,
                createTextVNode(),
                createBaseVNode("a", {
                  href: unref(project).infoHref
                }, toDisplayString(unref(project).infoText || unref(project).infoHref), 9, _hoisted_14)
              ])) : createCommentVNode("v-if", true),
              unref(project).srcHref ? (openBlock(), createElementBlock("span", _hoisted_15, [
                _hoisted_16,
                createTextVNode(),
                createBaseVNode("a", {
                  href: unref(project).srcHref
                }, toDisplayString(unref(project).srcText || unref(project).srcHref), 9, _hoisted_17)
              ])) : createCommentVNode("v-if", true)
            ]),
            createBaseVNode("div", _hoisted_18, [
              _hoisted_19,
              _hoisted_20,
              createTextVNode(" " + toDisplayString(unref(project).tools), 1)
            ]),
            createBaseVNode("div", _hoisted_21, [
              _hoisted_22,
              createTextVNode(" " + toDisplayString(unref(project).dates), 1)
            ])
          ]),
          createBaseVNode("div", _hoisted_23, [
            unref(project).imgUrl ? (openBlock(), createElementBlock("img", {
              key: 0,
              src: unref(project).imgUrl
            }, null, 8, _hoisted_24)) : createCommentVNode("v-if", true)
          ])
        ])
      ]);
    };
  }
});
const PortfolioProject = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "/media/disk/_work/Qwertovsky/site/src/components/PortfolioProject.vue"]]);
const qwertomoneyImgUrl = "/assets/portfolio_qwertomoney-b846257d.png";
const quickUrlOpenerImgUrl = "/assets/portfolio_quick_url_opener-178f6f3c.png";
const dayMonthYearCalendarImgUrl = "/assets/portfolio_day_month_year_calendar-659dd132.png";
const gps4tcxImgUrl = "/assets/portfolio_gps4tcx_javafx-50144428.png";
const mobibookImgUrl = "/assets/portfolio_mobibook-0272cd15.png";
const ovsdNotifierImgUrl = "/assets/portfolio_ovsd_notifier-237dfb07.png";
const _hoisted_1 = { id: "portfolio_page_content" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PortfolioPage",
  setup(__props) {
    useHead(createHead());
    const projects = [
      {
        name: "Document signature",
        description: `CLI program to sign documents with Rutoken PKCS#11 token. It can add a signature to PDF file and makes it visual`,
        role: `My independent project`,
        srcHref: "https://github.com/Qwertovsky/gost_sign",
        tools: `Java, Maven, Apache Commons CLI, Bouncy Castle, Apache PDFBox`,
        dates: "2022.12"
      },
      {
        name: "QwetoMoney",
        description: `Personal finance app. Losses and income tracking.
             Spending information analysis. Can help to manage you money.`,
        role: `My independent project`,
        linkHref: "https://money.qwertovsky.com",
        linkText: "money.qwertovsky.com",
        tools: `JavaScript, Vue.js, Java, Vert.x, JDBC, SQL, PostgreSQL, ECharts`,
        dates: "2010 - now",
        imgUrl: qwertomoneyImgUrl
      },
      {
        name: "Online insurance",
        description: `Web portals to create a quotes. One is for clients.
             Another is for employees.`,
        role: `Worked as part of a distributed agile team. Contributing to each layer of
             the tech stack. Improved and refactored all parts of application.
             Researched technical solutions to meet business needs.
             Writed and called new services.
             Discovered memory leaks.`,
        linkHref: "https://online.sovcomins.ru",
        tools: `Eclipse, JBoss, Java, JSF, EJB, Spring, Angular, HTML, CSS, JavaScript`,
        dates: "2014.04 - now (Sovcombank)"
      },
      {
        name: "Quick URL Opener",
        description: `It is a Firefox and Chrome Add-on
                to open new tabs for one or more URLs that contains one significant parameter.`,
        role: `My independent project`,
        srcHref: "https://github.com/Qwertovsky/quick_url_addon",
        tools: `JavaScript, CSS, WebExtension API`,
        dates: "2017.11 - now",
        imgUrl: quickUrlOpenerImgUrl
      },
      {
        name: "Day-month-year calendar",
        description: `It is a jQuery plugin that creates
             three select boxes (day, month, year) for one input field with date.`,
        role: `My independent project`,
        srcHref: "https://github.com/Qwertovsky/day-month-year-calendar",
        tools: "JavaScript, jQuery",
        dates: "2014.11",
        imgUrl: dayMonthYearCalendarImgUrl
      },
      {
        name: "Web-version of my JavaFX program",
        description: `Allow to add a GPS track to the TCX file generated by
             a Garmin watch that doesn't have a GPS sensor. Just draw the track on the Google map.`,
        role: `My independent project`,
        srcHref: "https://bitbucket.org/qwertovsky/gps4tcx_web",
        linkHref: "//qwertovsky.com/gps4tcx/",
        linkText: "qwertovsky.com/gps4tcx",
        tools: `Google Map API, Yandex.Maps API, JavaScript, CSS, SASS, Grunt`,
        dates: "2015.01",
        imgUrl: gps4tcxImgUrl
      },
      {
        name: "Cryptocurrency exchange site prototype",
        description: `Interface with a imitation of work`,
        role: `Prototype of the interface (creating a requests,
             a processing deals, a viewing charts).`,
        tools: "HTML, CSS, JavaScript, Bootstrap, Highcharts",
        dates: "2013.09 (EPAM)"
      },
      {
        name: "Online banking for Business",
        description: null,
        role: `Analized hight availability of interface for clients. Rewrited logging system.`,
        tools: "NetBeans, Oracle DB, WebSphere, Java, JPA, JMS, JavaScript",
        dates: "2013.07 - 2013.09 (EPAM)"
      },
      {
        name: "Creating the midlet to read a book on cellphone",
        description: `Program generates midlet for reading a book on the mobile
             phone that supports JavaME.`,
        role: `Independent project. Implemented generator with JavaFX.
             Design and JavaME code are not mine.`,
        infoHref: "https://qwertovsky.com/blog/tag/mobibook",
        srcHref: "https://bitbucket.org/qwertovsky/mobibook_qwertogenerator",
        tools: "Java, Eclipse, Ant, Gradle, Git, JavaFX, ini4j",
        dates: "2013.03",
        imgUrl: mobibookImgUrl
      },
      {
        name: "Inserting a GPS information into the Garmin Training Center file",
        description: `Allow to add a GPS track to the TCX file generated by a Garmin watch
             that doesn't have a GPS sensor. Just draw the track on the Google map.`,
        role: "My independent project",
        srcHref: "https://bitbucket.org/qwertovsky/gps4tcx",
        tools: "Eclipse, Ant, Gradle, Git, JavaFX, Google Map API, JAXB",
        dates: "2013.06",
        imgUrl: gps4tcxImgUrl
      },
      {
        name: "Mass mail sender",
        description: `Java library and the console program to send a mail.
             Allows to insert the personal information in a template and attach the personal files.`,
        role: "My independent project.",
        infoHref: "https://qwertovsky.com/blog/tag/qwertomailer",
        srcHref: "https://github.com/Qwertovsky/qwertomailer",
        tools: "Java, Eclipse, Ant, Git, JavaMail, Log4j, Velocity, SLF4j, Apache Commons CLI, OpenCSV, SubethaSMTP, JUnit",
        dates: "2013.02"
      },
      {
        name: `Notification manager for HP OpenView Service Desk 4.5`,
        description: `It displays a notification with full information from the task`,
        role: `My independent project.`,
        infoHref: "https://qwertovsky.com/blog/tag/ovsd45notifier",
        srcHref: "https://bitbucket.org/qwertovsky/ovsd45notifier/downloads",
        tools: `Java, Eclipse, Ant, Git, JavaMail, Log4j, Velocity,
             SWT, OV SD 4.5 web-api, Apache Commons Configuration`,
        dates: "2011.11 - 2014.02 (Rostelecom)",
        imgUrl: ovsdNotifierImgUrl
      },
      {
        name: "Preliminary estimation system of investment projects",
        description: `The system allows to initiate an investment projects,
             to estimate the cost of project.
              It is used for making an offers to potencial customers.`,
        role: `Architecture. Choice of technologies. Realization.`,
        tools: `Java, Eclipse, Git, JBoss, JPA, JDBC, JSF, JavaMail, Oracle DB, HTML, CSS`,
        dates: "2013.04 (Rostelecom)"
      }
    ];
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        (openBlock(), createElementBlock(Fragment, null, renderList(projects, (pr) => {
          return createVNode(PortfolioProject, {
            class: "project",
            key: pr.name,
            project: pr
          }, null, 8, ["project"]);
        }), 64))
      ]);
    };
  }
});
const PortfolioPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/media/disk/_work/Qwertovsky/site/src/components/PortfolioPage.vue"]]);
export {
  PortfolioPage as default
};
