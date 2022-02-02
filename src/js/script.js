//const fs = require("fs");
import grapesjs from "grapesjs";
//const fs = __non_webpack_require__("fs");
//const fs = eval('require("fs")');
//import * as fs from "fs";
//const fs = require("fs");

//var file = require("file-system");
import "grapesjs-preset-webpage";
import "grapesjs-bootstrap4-blocks";
import "../scss/style.scss";
import code_editor from "grapesjs-component-code-editor";
import parserPostCSS from "grapesjs-parser-postcss";
import compts from "../components/ComposantTest";
//console.log(" Fake lok 25 258 ");

//console.log(window);
document.body.innerHTML += '<div id="gjs"></div>';
const myNewComponentTypes = (editor) => {
  //console.log(editor.DomComponents);
  editor.DomComponents.addType("block-icon-titre-desc", {
    isComponent: (el) => {
      // console.log("isComponent : ", el.classList);
      if (el.classList) {
        if (el.classList.contains("block-icon-titre-desc")) return true;
      }
    },
    model: {
      // Default properties
      defaults: {
        type: "block-icon-titre-desc",
        name: "Block icon + titre + description",
        attributes: {},
        draggable: false,
        droppable: false,
        badgable: false,
        copyable: false,
        editable: true,
        removable: true,
        propagate: ["removable", "draggable", "selectable", "droppable"],
        icon: "<b>icone</b>",
        // selectable: false,
        toolbar: [
          {
            icon: "<b>KKSA</b>",
            attributes: { class: "fa fa-arrows" },
            command: "tlb-nex-",
          },
        ],
        components: [],
      },
      init() {
        this.on("selected", this.ActionSelect);
      },
      ActionSelect() {
        //alert("");
        const { someprop } = this.props();
        console.log("New value of someprop: ", someprop);
      },
    },
  });
};
/**
 * -
 */
(function () {
  const editor = grapesjs.init({
    container: "#gjs",
    fromElement: true,
    showOffsets: true,
    noticeOnUnload: false,
    selectorManager: {
      componentFirst: true,
    },
    plugins: [
      "gjs-preset-webpage",
      "grapesjs-blocks-bootstrap4",
      code_editor,
      parserPostCSS,
      myNewComponentTypes,
    ],
    pluginsOpts: {
      "gjs-preset-webpage": {
        formsOpts: false,
        showStylesOnChange: false,
        // exportOpts: false,
      },
      "grapesjs-blocks-bootstrap4": {},
      code_editor,
    },
    canvas: {
      scripts: [
        "https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js",
        "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js",
      ],
      styles: [
        "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css",
      ],
    },
    autorender: false,
    on: {
      event: "load",
      callback: EditorIsLoaded,
    },
    storageManager: false,
  });
  editor.on("load", EditorIsLoaded);
  editor.render();
  // ajout d'un button;
  const pn = editor.Panels;
  const panelViews = pn.addPanel({
    id: "views",
  });
  panelViews.get("buttons").add([
    {
      attributes: {
        title: "Open Code",
      },
      className: "fa fa-file-code-o",
      command: "open-code",
      togglable: false, //do not close when button is clicked again
      id: "open-code",
    },
  ]);

  //const panelManager = editor.Panels;
  //console.log("panelManager  : ", panelManager);
  // Ajout d'un block
  var blockManager = editor.BlockManager;
  import("../componentHtml/SectionServices/Service1.html").then((data) => {
    blockManager.add("my-first-block", {
      label: "Service 1",
      content: data.default,
      media: '<img src="/imgs/section1.png" />',
      category: {
        id: "section-service",
        label: "Models services",
      },
    });
  });
  //
  function EditorIsLoaded() {
    const Categories = blockManager.getCategories().models;
    // console.log("Categories", Categories);
    Categories.map((category) => {
      category.set("open", false);
      // console.log(category);
    });
  }
  /**
   * Disable apply button;
   */
  editor.on("run:open-code", (ob, args) => {
    console.log("ob : ", ob);
    console.log("args : ", args);
    var button = document.querySelector(".cp-apply-html");
    button.tagName;
    if (button.tagName == "BUTTON") {
      // var span = document.createElement("span");
      // span.innerHTML = button.innerHTML;
      // //console.log("getAttributeNames : ", button.getAttributeNames());
      // button.getAttributeNames().forEach((attribute) => {
      //   //console.log("attribute : ", button.getAttribute(attribute));
      //   span.setAttribute(attribute, button.getAttribute(attribute));
      // });
      // button.parentNode.replaceChild(span, button);
      //console.log("button.parentNode : ", button.parentNode);
      button.addEventListener("click", function (event) {
        event.preventDefault();
        console.log("allo");
      });
    }
  });
  // Add basic components.
  // editor.addComponents(IconTitreDesc);
  (function () {
    import("../componentHtml/block-icon-titre-desc.html").then((data) => {
      // editor.addComponents(data.default);
    });
  })();
  var cmt = new compts(editor);
  cmt.build();
})();
