import { InputTreeNode } from "./inputTreeNode";

export class InputHTMLInForm {
    input: InputTreeNode;

    form_question: HTMLDivElement;
    form_inputs: HTMLDivElement

    
    constructor(input: InputTreeNode){
        this.input = input;
    }

    renderInput(container: HTMLFormElement){
        this.form_question = this.createFormQuestion()

        container.appendChild(this.form_question);
    }

    ShowInput(){
        if(this.form_question.classList.contains("show_form_question") === false){
            this.form_question.classList.add("show_form_question");
        }
    }

    HideInput(){
        if(this.form_question.classList.contains("show_form_question")){
            this.form_question.classList.remove("show_form_question");
        }
    }
    removeInput(){
        if(this.form_question !== undefined){
            this.form_question.remove();
        }
    }

    private createFormQuestion(): HTMLDivElement{
        var form_question = document.createElement("div");
        form_question.setAttribute("id", "form_"+this.input.getId());
        form_question.classList.add("form_question");

        var question = document.createElement("p");
        question.textContent = this.input.getQuestion();

        this.form_inputs = this.createFormInputs();


        form_question.appendChild(question);
        form_question.appendChild(this.form_inputs);

        return form_question;
    }

    private createFormInputs() :HTMLDivElement{
        var inputs = document.createElement("div");
        inputs.classList.add("form_inputs");

        this.input.getInput().createInput(inputs);

        return inputs;
    }
}