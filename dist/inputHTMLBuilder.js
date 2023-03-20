import { InputTypes } from "./inputTypes.js";
export class inputHTMLBuilder {
    constructor(input) {
        this.input = input;
    }
    renderInput(container) {
        this.input_container = this.createContainer();
        this.visible_section = this.createVisibleSection();
        this.subquestion_section = this.createSubquestionSection();
        this.input_container.appendChild(this.visible_section);
        this.input_container.appendChild(this.subquestion_section);
        container.appendChild(this.input_container);
    }
    /* With rerender */
    renderCondition() {
        if (this.condition_body !== undefined) {
            this.form.removeChild(this.form.children[0]);
            this.form.removeChild(this.form.children[0]);
            this.form.removeChild(this.form.children[0]);
            this.form.removeChild(this.form.children[0]);
        }
        var label_condtion_type = document.createElement("label");
        label_condtion_type.setAttribute("for", "condtion_type");
        label_condtion_type.textContent = "Condition: ";
        this.condition_select_type = document.createElement("select");
        this.condition_select_type.setAttribute("name", "condtion_type");
        for (var condition_type of this.input.getCondition().getPossibleConditions()) {
            var option = document.createElement("option");
            option.setAttribute("value", condition_type);
            option.textContent = condition_type;
            this.condition_select_type.appendChild(option);
        }
        this.condition_body = this.input.getCondition().createConditionBody();
        this.form.prepend(document.createElement("br"));
        this.form.prepend(this.condition_body);
        this.form.prepend(this.condition_select_type);
        this.form.prepend(label_condtion_type);
    }
    renderSubquestionsButton() {
        /* Add subquestion button */
        this.add_subquestion_button = document.createElement("button");
        this.add_subquestion_button.innerHTML = "&plus; <br> Add new subquest";
        this.add_subquestion_button.classList.add("subquest_add");
        this.subquestion_section.appendChild(this.add_subquestion_button);
    }
    removeInput() {
        this.input_container.remove();
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
        this.form = this.createForm();
        this.show_subquestion_button = this.createShowSubquestionsButton();
        visible_section.appendChild(this.remove_button);
        visible_section.appendChild(this.form);
        visible_section.appendChild(this.show_subquestion_button);
        return visible_section;
    }
    createRemoveButton() {
        var remove_button = document.createElement("button");
        remove_button.classList.add("input_remove_button");
        remove_button.innerHTML = "&#10005;";
        return remove_button;
    }
    createForm() {
        var form = document.createElement("form");
        form.classList.add("input_form");
        /* Select Types */
        var label_type = document.createElement("label");
        label_type.setAttribute("for", "type");
        label_type.textContent = "Type ";
        this.form_type = document.createElement("select");
        this.form_type.setAttribute("name", "type");
        for (var type in InputTypes) {
            var option = document.createElement("option");
            option.setAttribute("value", InputTypes[type]);
            option.textContent = InputTypes[type];
            this.form_type.appendChild(option);
        }
        /* Question Input */
        var label_question = document.createElement("label");
        label_question.setAttribute("for", "question");
        label_question.innerHTML = "Question ";
        this.form_question = document.createElement("input");
        this.form_question.setAttribute("name", "question");
        this.form_question.setAttribute("type", "text");
        form.appendChild(label_type);
        form.appendChild(this.form_type);
        form.appendChild(document.createElement("br"));
        form.appendChild(label_question);
        form.appendChild(this.form_question);
        return form;
    }
    createShowSubquestionsButton() {
        var show_subquestion = document.createElement("button");
        show_subquestion.classList.add("show_subquestions_button");
        show_subquestion.textContent = "Show subquestions";
        return show_subquestion;
    }
    createSubquestionSection() {
        var subquestions = document.createElement("div");
        subquestions.classList.add("subquestions");
        subquestions.setAttribute("id", "subquestions_" + this.input.getId());
        /* Arrow */
        var subquestions_arrow = document.createElement("div");
        subquestions_arrow.classList.add("subquestions_arrow");
        subquestions_arrow.innerHTML = "&rdsh;";
        /* Add subquestion button */
        this.add_subquestion_button = document.createElement("button");
        this.add_subquestion_button.innerHTML = "&plus; <br> Add new subquest";
        this.add_subquestion_button.classList.add("subquest_add");
        subquestions.appendChild(subquestions_arrow);
        subquestions.appendChild(this.add_subquestion_button);
        return subquestions;
    }
}
