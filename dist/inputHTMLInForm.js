export class InputHTMLInForm {
    constructor(input) {
        this.input = input;
    }
    renderInput(container) {
        this.form_question = this.createFormQuestion();
        container.appendChild(this.form_question);
    }
    toggleInput() {
        this.form_question.classList.toggle("show_form_question");
    }
    createFormQuestion() {
        var form_question = document.createElement("div");
        form_question.setAttribute("id", "form_" + this.input.getId());
        form_question.classList.add("form_question");
        var question = document.createElement("p");
        question.textContent = this.input.getQuestion();
        this.form_inputs = this.createFormInputs();
        form_question.appendChild(question);
        form_question.appendChild(this.form_inputs);
        return form_question;
    }
    createFormInputs() {
        var inputs = document.createElement("div");
        inputs.classList.add("form_inputs");
        //Dodac inputy
        this.input.getInput().createInput(inputs);
        return inputs;
    }
}
