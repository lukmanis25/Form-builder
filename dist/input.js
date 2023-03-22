export var InputTypes;
(function (InputTypes) {
    InputTypes["TEXT"] = "Text";
    InputTypes["NUMBER"] = "Number";
    InputTypes["YES_OR_NO"] = "Yes/No";
})(InputTypes || (InputTypes = {}));
class TextInput {
    constructor(input_node) {
        this.value = "";
        this.input_node = input_node;
    }
    addEventChangeInput() {
        this.input.addEventListener("input", (event) => {
            this.value = event.target.value;
            /* Check condition for subquestions */
            for (var child of this.input_node.getChildrens()) {
                //Show when condition is fulfiled
                if (child.getCondition().isConditionFulfil(this.value)) {
                    child.visible(true);
                }
                //hide when is no longer fulifiled
                else {
                    child.visible(false);
                }
            }
        });
    }
    createInput(container) {
        this.value = "";
        this.input = document.createElement("input");
        this.input.setAttribute("name", "question");
        this.input.setAttribute("type", "text");
        this.input.classList.add("writable_input");
        container.appendChild(this.input);
    }
    unsetInputNode() {
        /* Set reference to null */
        this.input_node = null;
    }
    getValue() {
        return this.value;
    }
    setvalue(value) {
        this.value = value;
    }
}
class NumberInput {
    constructor(input_node) {
        this.input_node = input_node;
    }
    addEventChangeInput() {
        this.input.addEventListener("input", (event) => {
            //Change "" to undefined
            if (event.target.value === "") {
                this.value = undefined;
            }
            else {
                this.value = +event.target.value;
            }
            /* Check condition for subquestions */
            for (var child of this.input_node.getChildrens()) {
                //Show when condition is fulfiled
                if (child.getCondition().isConditionFulfil(this.value)) {
                    child.visible(true);
                }
                //hide when is no longer fulifiled
                else {
                    child.visible(false);
                }
            }
        });
    }
    createInput(container) {
        this.value = undefined;
        this.input = document.createElement("input");
        this.input.setAttribute("name", "question");
        this.input.setAttribute("type", "number");
        this.input.classList.add("writable_input");
        container.appendChild(this.input);
    }
    unsetInputNode() {
        this.input_node = null;
    }
    getValue() {
        return this.value;
    }
    setvalue(value) {
        this.value = value;
    }
}
class YesOrNoInput {
    constructor(input) {
        this.value = "";
        this.input_node = input;
    }
    changeInput(val) {
        if (val !== this.value) {
            this.value = val;
        }
        /* Check condition for subquestions */
        for (var child of this.input_node.getChildrens()) {
            //Show when condition is fulfiled
            if (child.getCondition().isConditionFulfil(this.value)) {
                child.visible(true);
            }
            //hide when is no longer fulifiled
            else {
                child.visible(false);
            }
        }
    }
    /* events for yes and no radio */
    addEventChangeInput() {
        this.input_yes.addEventListener('change', (event) => {
            var val = event.target.value;
            this.changeInput(val);
        });
        this.input_no.addEventListener('change', (event) => {
            var val = event.target.value;
            this.changeInput(val);
        });
    }
    createInput(container) {
        this.value = "";
        this.input_yes = document.createElement("input");
        this.input_yes.setAttribute("name", this.input_node.getId() + "_yes/no");
        this.input_yes.setAttribute("type", "radio");
        this.input_yes.setAttribute("value", "yes");
        var label_yes = document.createElement("label");
        label_yes.setAttribute("for", "yes");
        label_yes.innerHTML = "Yes";
        this.input_no = document.createElement("input");
        this.input_no.setAttribute("name", this.input_node.getId() + "_yes/no");
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
    getValue() {
        return this.value;
    }
    setvalue(value) {
        this.value = value;
    }
}
/* create input depends of inputType */
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
