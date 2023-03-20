export class questionHTMLBuilder {
    constructor(input) {
        this.input = input;
    }
    renderInput() {
        this.container = this.createContainer();
        // this.: HTMLDivElement
    }
    createContainer() {
        var input = document.createElement("div");
        input.classList.add("input");
        input.setAttribute("id", this.input.getId());
        return input;
    }
    createVisibleSection() {
        var visible_section = document.createElement("div");
        visible_section.classList.add("input_visible");
        /* Animation */
        const myTimeout = setTimeout(() => {
            visible_section.classList.add("show_input");
        }, 0);
        this.remove_button = this.createRemoveButton();
        return visible_section;
    }
    createRemoveButton() {
        var remove_button = document.createElement("button");
        remove_button.classList.add("input_remove_button");
        remove_button.innerHTML = "&#10005;";
        return remove_button;
    }
}
