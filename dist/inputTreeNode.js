import { InputTypes } from "./inputTypes.js";
export class InputTreeNode {
    constructor(id, parent) {
        this.parent = undefined; //undefined only for root
        this.childrens = [];
        this.question = '';
        this.type = InputTypes.TEXT;
        this.id = id;
        this.parent = parent;
    }
    createForm(container) {
        // <div class = input>
        //   <form class="input_form">
        //     <label for="type">Type</label><br>
        //     <select name="type">
        //       <option value="Text">Text</option>
        //       <option value="Number">Number</option>
        //       <option value="Yes/No">Yes/No</option>
        //     </select><br>
        //     <label for="question">Question</label><br>
        //     <input type="text" name="question"><br>
        //   </form>
        //   <button class = "show_subquestion">Show subquestion</button>
        //   <div class = "show_subquestion"> &rdsh; 
        //   </div> 
        // </div> 
        var input = document.createElement("div");
        input.classList.add("input");
        var form = document.createElement("form");
        form.classList.add("input_form");
        var label_type = document.createElement("label");
        label_type.setAttribute("for", "type");
        label_type.textContent = "Type";
        var select_type = document.createElement("select");
        select_type.setAttribute("name", "type");
        for (var type in InputTypes) {
            var option = document.createElement("option");
            option.setAttribute("value", InputTypes[type]);
            option.textContent = InputTypes[type];
            select_type.appendChild(option);
        }
        var label_question = document.createElement("label");
        label_question.setAttribute("for", "question");
        label_question.textContent = "Question";
        var input_question = document.createElement("input");
        input_question.setAttribute("name", "question");
        input_question.setAttribute("type", "text");
        form.appendChild(label_type);
        form.appendChild(document.createElement("br"));
        form.appendChild(select_type);
        form.appendChild(document.createElement("br"));
        form.appendChild(label_question);
        form.appendChild(input_question);
        var show_subquestion = document.createElement("button");
        show_subquestion.classList.add("show_subquestion");
        show_subquestion.textContent = "Show subquestion";
        var subquestion = document.createElement("div");
        subquestion.innerHTML = "&rdsh;";
        subquestion.classList.add("subquestion");
        container.appendChild(form);
        container.appendChild(show_subquestion);
        container.appendChild(subquestion);
    }
    appendChild() {
        console.log('x');
    }
}
