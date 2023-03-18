import { InputTypes } from "./inputTypes.js";
import { ICondition, createCondition } from "./condition";
export class InputTreeNode {
    private id:string;
    private parent: InputTreeNode | undefined = undefined;  //undefined only for root
    private childrens: InputTreeNode[] = [];

    private question:string = '';
    private type:InputTypes = InputTypes.TEXT;
    private condition?:ICondition;


    constructor(id: string, parent: InputTreeNode | undefined) {
        this.id = id;
        this.parent = parent;
    }

    createForm(container: HTMLDivElement):void {
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

      var input: Element  = document.createElement("div");
      input.classList.add("input")

      var form:HTMLFormElement  = document.createElement("form");
      form.classList.add("input_form")

      var label_type:Element = document.createElement("label");
      label_type.setAttribute("for", "type");
      label_type.textContent = "Type";

      var select_type:Element = document.createElement("select");
      select_type.setAttribute("name", "type");

      for (var type in InputTypes) {
        var option:Element = document.createElement("option");
        option.setAttribute("value", InputTypes[type]);
        option.textContent = InputTypes[type];
        select_type.appendChild(option);
      }
      var label_question:Element = document.createElement("label");
      label_question.setAttribute("for", "question");
      label_question.textContent = "Question";

      var input_question:Element = document.createElement("input");
      input_question.setAttribute("name", "question");
      input_question.setAttribute("type", "text");

      form.appendChild(label_type);
      form.appendChild(document.createElement("br"))
      form.appendChild(select_type);
      form.appendChild(document.createElement("br"))
      form.appendChild(label_question);
      form.appendChild(input_question);

      var show_subquestion: HTMLButtonElement  = document.createElement("button");
      show_subquestion.classList.add("show_subquestion");
      show_subquestion.textContent = "Show subquestion";

      var subquestion: HTMLDivElement = document.createElement("div");
      subquestion.innerHTML = "&rdsh;";
      subquestion.classList.add("subquestion");

      container.appendChild(form);
      container.appendChild(show_subquestion);
      container.appendChild(subquestion);

    }
   
    appendChild():void{
      console.log('x')
    }
  }