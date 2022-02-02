class compts {
  constructor(editor) {
    this.editor = editor;
  }
  build() {
    this.addBootstrapCanvasStyle();
    this.addTraitEditText();
    this.addTraitHref();
    this.AddTemplatesV2();
    this.addBootstrapDocument();
  }

  /**
   * Ajout d'un template basique.
   * @returns
   */
  AddTemplates() {
    this.editor.addComponents(`
    <div class="d-flex p-3 bg-info" data-gjs-type="custom-component" data-gjs-editable="false" data-gjs-removable="false" data-gjs-propagate="['removable', 'draggable']">
      <img src="http://v2lesroisdelareno.kksa/sites/default/files/styles/domaine_370x222/public/2021-03/AdobeStock_191790836-1.jpeg" />
      <span title="foo">Hello world!!!</span>
    </div>
`);
  }

  /**
   * Ajout d'un template basique.
   * @returns
   */
  AddTemplatesV2() {
    this.editor.addComponents({
      type: "custom-component",
      classes: ["d-flex", "p-3", "bg-info"],
      removable: false,
      draggable: false,
      editable: false,
      propagate: ["removable", "editable", "draggable"],
      traits: [
        {
          type: "text",
          name: "title",
          label: "Attribue title",
          value: "humm",
        },
      ],
      components: [
        {
          type: "div",
          content: `<img src="http://v2lesroisdelareno.kksa/sites/default/files/styles/domaine_370x222/public/2021-03/AdobeStock_191790836-1.jpeg" />  `,
        },
        {
          type: "div",
          classes: ["p-3", "bg-light"],
          traits: [
            {
              type: "wbu-content-titre",
              label: "Attribue title",
              value: "Votre titre ici",
            },
          ],
          content: `Beginner ....`,
        },
      ],
    });
  }

  addTraitEditText() {
    this.editor.TraitManager.addType("wbu-content-titre", {
      // remove defaut html and style for enter datas.
      templateInput: "",
      /**
       *
       * @param {*} param0
       */
      createInput({ trait }) {
        // creation du champs de saisie
        const el = document.createElement("div");
        el.innerHTML = `
          <textarea class=" wbu-textarea form-control form-control-sm"></textarea>
        `;
        return el;
      },
      //
      onEvent({ elInput, component, event }) {
        const inputType = elInput.querySelector(".wbu-textarea");
        if (inputType) component.replaceWith(inputType.value);
        console.log("component : ", component);
        console.log("inputType : ", inputType);
      },
      //
      onUpdate({ elInput, component }) {
        const collection = component.components();
        console.log("onUpdate : ", collection);
      },
    });
  }

  /**
   * ajout d'un trait href-next
   */
  addTraitHref() {
    this.editor.TraitManager.addType("href-next", {
      // Expects as return a simple HTML string or an HTML element
      createInput({ trait }) {
        // Here we can decide to use properties from the trait
        const traitOpts = trait.get("options") || [];
        const options = traitOpts.length
          ? traitOpts
          : [
              { id: "url", name: "URL" },
              { id: "email", name: "Email" },
            ];
        console.log("traitOpts : ", traitOpts);
        // Create a new element container and add some content
        const el = document.createElement("div");
        el.innerHTML = `
          <select class="href-next__type form-control input-sm form-control-sm">
            ${options
              .map((opt) => `<option value="${opt.id}">${opt.name}</option>`)
              .join("")}
              </select>
              <div class="href-next__url-inputs ">
                <input class="href-next__url form-control form-control-sm" placeholder="Insert URL"/>
              </div>
              <div class="href-next__email-inputs">
                <input class="href-next__email form-control form-control-sm" placeholder="Insert email"/>
                <input class="href-next__email-subject form-control form-control-sm" placeholder="Insert subject"/>
              </div>
        `;

        // Let's make our content interactive
        const inputsUrl = el.querySelector(".href-next__url-inputs");
        const inputsEmail = el.querySelector(".href-next__email-inputs");
        const inputType = el.querySelector(".href-next__type");
        inputType.addEventListener("change", (ev) => {
          switch (ev.target.value) {
            case "url":
              inputsUrl.style.display = "";
              inputsEmail.style.display = "none";
              break;
            case "email":
              inputsUrl.style.display = "none";
              inputsEmail.style.display = "";
              break;
          }
        });

        return el;
      },
      templateInput: "",
      onEvent({ elInput, component, event }) {
        const inputType = elInput.querySelector(".href-next__type");
        let href = "";
        switch (inputType.value) {
          case "url":
            const valUrl = elInput.querySelector(".href-next__url").value;
            href = valUrl;
            break;
          case "email":
            const valEmail = elInput.querySelector(".href-next__email").value;
            const valSubj = elInput.querySelector(
              ".href-next__email-subject"
            ).value;
            href = `mailto:${valEmail}${valSubj ? `?subject=${valSubj}` : ""}`;
            break;
        }
        component.addAttributes({ href });
      },
    });
  }

  addBootstrapCanvasStyle() {
    const head = this.editor.Canvas.getDocument().head;
    console.log("head : ", head);
    head.insertAdjacentHTML(
      "beforeend",
      `<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">`
    );
    head.insertAdjacentHTML(
      "beforeend",
      `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css">`
    );
    head.insertAdjacentHTML(
      "beforeend",
      `<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>`
    );
  }

  addBootstrapDocument() {
    const head = document.head;
    console.log("parent head : ", head);
    head.insertAdjacentHTML(
      "beforeend",
      `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css">`
    );
  }
}
export default compts;
