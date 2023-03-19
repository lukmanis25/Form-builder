import { InputTypes } from "./inputTypes.js";
import { ICondition, createCondition } from "./condition";
export class InputTreeNode {
    private id:string;
    private parent: InputTreeNode | undefined = undefined;  //undefined only for root
    private childrens: InputTreeNode[] = [];

    private question:string = '';
    private type:InputTypes = InputTypes.TEXT;
    private condition?:ICondition;

    //dodac eventhandler i renderer

    constructor(id: string, parent: InputTreeNode | undefined) {
        this.id = id;
        this.parent = parent;
    }

    public renderSubquests():void{

        /* Create space for subquestion */
        const subqestions: HTMLDivElement | null = document.querySelector("#subquestions_" + this.id);
        //subqestions.style.display = "none";
        const new_button:HTMLButtonElement  = document.createElement("button");
        new_button.innerHTML = "&plus; <br> Add new subquest";
        new_button.classList.add("subquest_add");
        //new_button.setAttribute("id", id);
        subqestions.appendChild(new_button);

        /* Event to add new subquest */
        this.addEventNewSubquest(new_button);
    }

    public renderInput(container: HTMLDivElement):void {
    // <div class = input id = "input_0">
    //   <div class = "input_visible">
      //   <form class="input_form">
      //     <label for="type">Type</label><br>
      //     <select name="type">
      //       <option value="Text">Text</option>
      //       <option value="Number">Number</option>
      //       <option value="Yes/No">Yes/No</option>
      //     </select><br>
      //     <label for="question">Question</label><br>
      //     <input type="text" name="question"><br>
    //      </form>
    //     <button class = "show_subquestions">Show subquestions</button>
    //   </div>
      // <div class = "subquestions" id = "subquestions_input_0">
    //     <div class= "subquestions_arrow"> &rdsh; </div>
      // </div> 
    // </div> 

      var input: Element  = document.createElement("div");
      input.classList.add("input")
      input.setAttribute("id", this.id);

      var input_visible: Element  = document.createElement("div");
      input_visible.classList.add("input_visible")
      /* Animation */
      const myTimeout = setTimeout(()=>{
        input_visible.classList.add("show_input");
      }, 0);

      var remove_button: HTMLButtonElement  = document.createElement("button");
      remove_button.classList.add("input_remove_button");
      remove_button.innerHTML = "&#10005;";
      this.addEventRemove(remove_button);

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
      label_question.innerHTML = "Question <br>";

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
      show_subquestion.classList.add("show_subquestions_button");
      show_subquestion.textContent = "Show subquestions";
      this.addEventShowHide(show_subquestion);

      var subquestions: HTMLDivElement = document.createElement("div");
      subquestions.classList.add("subquestions");
      subquestions.setAttribute("id", "subquestions_" + this.id);

      var subquestions_arrow: Element  = document.createElement("div");
      subquestions_arrow.classList.add("subquestions_arrow")
      subquestions_arrow.innerHTML = "&rdsh;";


      input_visible.appendChild(remove_button)
      input_visible.appendChild(form);
      input_visible.appendChild(show_subquestion);
      input.appendChild(input_visible);

      subquestions.appendChild(subquestions_arrow);
      input.appendChild(subquestions);

      container.appendChild(input);
      this.renderSubquests();
    }


    private addEventRemove(button: HTMLButtonElement){
      button.addEventListener("click", (event) => {
        this.removeInput();
      })
    }
    public removeInput():void{
      console.log("removed " + this.id)
      const input: HTMLDivElement | null = document.querySelector('#'+this.id);
      input.remove();
    }

   
    private addEventShowHide(button: HTMLButtonElement){
      button.addEventListener("click", (event) => {
          const subqestions: HTMLDivElement | null = document.querySelector("#subquestions_" + this.id);
          subqestions.classList.toggle("show_subquestions");

          if(subqestions.classList.contains("show_subquestions")){
            button.textContent = "Hide subquestions"
          }
          else{
            button.textContent = "Show subquestions"
          }
      })
    }

    private addEventNewSubquest(button: HTMLButtonElement){
      button.addEventListener("click", (event) => {
          /* Create new node */
          let id = this.id + "_" + this.childrens.length //ID schema  input_{parent_last_num_id}_{child_last_num_id}_{childchild_last_num_id}...
          let new_node:InputTreeNode  = new InputTreeNode(id, this)
          this.appendChild(new_node);
          const subqestions: HTMLDivElement | null = document.querySelector("#subquestions_" + this.id);
          new_node.renderInput(subqestions);

          // /* rerender button at the end */
          // const target:Element = event.target as Element;
          // target.remove();
          // this.renderSubquests();
          
      })
    }


    public remove(){
      /* Delete in DOM */
      this.removeInput()

      /* Delete in parent childrens */
      if(this.parent !== undefined){
        console.log(this.parent.childrens)
        this.parent.removeChild(this);
        console.log(this.parent.childrens)
      }

    }

    public appendChild(node: InputTreeNode):void{
      this.childrens.push(node);
    }

    public removeChild(node: InputTreeNode):void{
      const index = this.childrens.indexOf(node, 0);
      if (index > -1) {
        this.childrens.splice(index, 1);
      }
    }
  }