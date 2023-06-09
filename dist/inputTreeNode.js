import { createInput, InputTypes } from "./input.js";
import { createCondition } from "./condition.js";
import { inputHTMLBuilder } from "./inputHTMLBuilder.js";
import { InputHTMLInForm } from "./inputHTMLInForm.js";
import { roots } from "./index.js";
export class InputTreeNode {
    constructor(id, parent) {
        this.parent = undefined; //undefined only for root
        this.childrens = []; // subquestions
        this.question = '';
        this.type = InputTypes.TEXT;
        this.id = id;
        this.parent = parent;
        this.html_builder = new inputHTMLBuilder(this);
        this.html_in_form = new InputHTMLInForm(this);
        this.last_children_id = this.id + "_0";
        this.input = createInput(this.type, this);
    }
    /* Render in form mode */
    renderInForm(container, is_hide) {
        /* render question with input */
        this.html_in_form.renderInput(container);
        /* Add events */
        this.addEventChangeInput();
        /* do the same for each child with hide value */
        for (var subquestion of this.childrens) {
            subquestion.renderInForm(container, true);
        }
        /* Show roots */
        if (is_hide === undefined || is_hide === false) {
            this.visible(true);
        }
    }
    /* Change visible of input in form mode */
    visible(visible) {
        /* Show */
        if (visible) {
            this.html_in_form.ShowInput();
            //Show childrens
            for (var child of this.childrens) {
                if (child.getCondition().isConditionFulfil(this.input.getValue())) {
                    child.visible(true);
                }
            }
        }
        /* Hide */
        else {
            this.html_in_form.HideInput();
            //Hide childrens
            for (var child of this.childrens) {
                child.visible(false);
            }
        }
    }
    /* Render input in building mode */
    render(container) {
        /* Render build form with question and type */
        this.html_builder.renderInput(container);
        /* Add conditions inputs if exist */
        if (this.condition !== undefined) {
            this.html_builder.renderCondition();
        }
        /* Add events */
        this.addEventRemove(this.html_builder.remove_button);
        this.addEventChangeType(this.html_builder.form_type);
        this.addEventChangeQuestion(this.html_builder.form_question);
        this.addEventShowHide(this.html_builder.show_subquestion_button);
        this.addEventNewSubquest(this.html_builder.add_subquestion_button);
        //Events for conditions
        if (this.condition !== undefined) {
            this.addEventChangeConditionBody(this.html_builder.condition_body);
            this.addEventChangeConditionType(this.html_builder.condition_select_type);
        }
    }
    /* Event when user changed input in form mode */
    addEventChangeInput() {
        this.input.addEventChangeInput();
    }
    /* Event when user changed condition type in build mode */
    addEventChangeConditionType(select_condition_type) {
        select_condition_type.addEventListener("change", (event) => {
            const type = event.target.value;
            this.condition.setConditionType(type);
        });
    }
    /* Event when user changed condition body in build mode */
    addEventChangeConditionBody(body) {
        body.addEventListener("input", (event) => {
            this.condition.setConditionBody(event.target.value);
        });
    }
    /* Event when user changed question for input in build mode */
    addEventChangeQuestion(question_input) {
        question_input.addEventListener("input", (event) => {
            this.question = event.target.value;
        });
    }
    /* Event when user removed input (clicked x button) in build mode */
    addEventRemove(button) {
        button.addEventListener("click", (event) => {
            this.remove();
        });
    }
    /* Event when user clicked show/hide subquestion for input in build mode*/
    addEventShowHide(button) {
        button.addEventListener("click", (event) => {
            const subqestions = document.querySelector("#subquestions_" + this.id);
            subqestions.classList.toggle("show_subquestions");
            if (subqestions.classList.contains("show_subquestions")) {
                button.textContent = "Hide subquestions";
            }
            else {
                button.textContent = "Show subquestions";
            }
        });
    }
    /* Event when user clicked add new subquestion button in build mode*/
    addEventNewSubquest(button) {
        button.addEventListener("click", (event) => {
            /* Create new node */
            const lastLetter = (+this.last_children_id.slice(-1) + 1).toString();
            this.last_children_id = this.last_children_id.slice(0, -1) + lastLetter;
            //ID schema  input_{parent_last_num_id}_{child_last_num_id}_{childchild_last_num_id}...
            let new_node = new InputTreeNode(this.last_children_id, this);
            /* Add condition */
            new_node.setCondition(createCondition(this.type));
            /* Append subquestion to parent (this) and render */
            this.appendChild(new_node);
            const subqestions = document.querySelector("#subquestions_" + this.id);
            new_node.render(subqestions);
            /* rerender button at the end of subquestions */
            const target = event.target;
            target.remove();
            this.html_builder.renderSubquestionsButton();
            this.addEventNewSubquest(this.html_builder.add_subquestion_button);
        });
    }
    /* Event when user changed input type in build mode  */
    addEventChangeType(input_select) {
        input_select.addEventListener("change", (event) => {
            /*Change type */
            var selected = event.target;
            this.type = selected.value;
            /*Unset reference from old input and create new */
            this.input.unsetInputNode();
            this.input = createInput(this.type, this);
            /* Change conditions for all child */
            for (var subquest of this.childrens) {
                subquest.setCondition(createCondition(this.type));
                subquest.html_builder.renderCondition();
                subquest.addEventChangeConditionBody(subquest.html_builder.condition_body);
                subquest.addEventChangeConditionType(subquest.html_builder.condition_select_type);
            }
        });
    }
    /* remove this node */
    remove() {
        /* Delete in DOM */
        this.html_builder.removeInput();
        this.html_in_form.removeInput();
        /* Delete in parent childrens */
        if (this.parent !== undefined) {
            this.parent.removeChild(this);
        }
        /* Delete in roots if root */
        if (this.parent === undefined) {
            const index = roots.indexOf(this, 0);
            if (index > -1) {
                roots.splice(index, 1);
            }
        }
    }
    appendChild(node) {
        this.childrens.push(node);
    }
    removeChild(node) {
        const index = this.childrens.indexOf(node, 0);
        if (index > -1) {
            this.childrens.splice(index, 1);
        }
    }
    setCondition(condition) {
        this.condition = condition;
    }
    getId() {
        return this.id;
    }
    getCondition() {
        return this.condition;
    }
    getQuestion() {
        return this.question;
    }
    getInput() {
        return this.input;
    }
    getChildrens() {
        return this.childrens;
    }
}
