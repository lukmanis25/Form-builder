export var InputTypes;
(function (InputTypes) {
    InputTypes["TEXT"] = "Text";
    InputTypes["NUMBER"] = "Number";
    InputTypes["YES_OR_NO"] = "Yes/No";
})(InputTypes || (InputTypes = {}));
class TextInput {
    constructor(input) {
        this.value = "";
        this.input_node = input;
    }
    addEventInputChange() {
        if (this.input_node === null) {
            return;
        }
    }
    createInput(container) {
        this.input = document.createElement("input");
        this.input.setAttribute("name", "question");
        this.input.setAttribute("type", "text");
        this.input.classList.add("writable_input");
        container.appendChild(this.input);
    }
    unsetInputNode() {
        this.input_node = null;
    }
}
class NumberInput {
    constructor(input) {
        this.input_node = input;
    }
    addEventInputChange() {
        if (this.input_node === null) {
            return;
        }
    }
    createInput(container) {
        this.input = document.createElement("input");
        this.input.setAttribute("name", "question");
        this.input.setAttribute("type", "number");
        this.input.classList.add("writable_input");
        container.appendChild(this.input);
    }
    unsetInputNode() {
        this.input_node = null;
    }
}
class YesOrNoInput {
    constructor(input) {
        this.value = "";
        this.input_node = input;
    }
    addEventInputChange() {
        if (this.input_node === null) {
            return;
        }
    }
    createInput(container) {
        this.input_yes = document.createElement("input");
        this.input_yes.setAttribute("name", "yes/no");
        this.input_yes.setAttribute("type", "radio");
        this.input_yes.setAttribute("value", "yes");
        var label_yes = document.createElement("label");
        label_yes.setAttribute("for", "yes");
        label_yes.innerHTML = "Yes";
        this.input_no = document.createElement("input");
        this.input_no.setAttribute("name", "yes/no");
        this.input_no.setAttribute("type", "radio");
        this.input_no.setAttribute("value", "no");
        var label_no = document.createElement("label");
        label_no.setAttribute("for", "no");
        label_no.innerHTML = "No";
        container.appendChild(this.input_yes);
        container.appendChild(label_yes);
        container.appendChild(this.input_no);
        container.appendChild(label_no);
    }
    unsetInputNode() {
        this.input_node = null;
    }
}
export function createInput(inputType, input_node) {
    if (inputType == InputTypes.TEXT) {
        return new TextInput(input_node);
    }
    else if (inputType == InputTypes.NUMBER) {
        return new NumberInput(input_node);
    }
    else if (inputType == InputTypes.YES_OR_NO) {
        return new YesOrNoInput(input_node);
    }
    else {
        return undefined;
    }
}
