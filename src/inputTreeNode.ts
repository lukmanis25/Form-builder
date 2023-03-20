import { InputTypes } from "./inputTypes.js";
import { ICondition, createCondition, ConditionTypes} from "./condition.js";
import { inputHTMLBuilder } from "./inputHTMLBuilder.js";
export class InputTreeNode {
    private id:string;
    private parent: InputTreeNode | undefined = undefined;  //undefined only for root
    private childrens: InputTreeNode[] = [];
    private last_children_id: string

    private question:string = '';
    private type:InputTypes = InputTypes.TEXT;
    private condition?:ICondition;

    private html_builder:inputHTMLBuilder;

    constructor(id: string, parent: InputTreeNode | undefined) {
        this.id = id;
        this.parent = parent;
        this.html_builder = new inputHTMLBuilder(this);
        this.last_children_id = this.id + "_0"
    }


    public renderInput(container: HTMLDivElement):void {

      this.html_builder.renderInput(container);
      if(this.condition !== undefined){
        this.html_builder.renderCondition();
        this.addEventChangeConditionBody(this.html_builder.condition_body);
        this.addEventChangeConditionType(this.html_builder.condition_select_type);
      }
      this.addEventRemove(this.html_builder.remove_button);
      this.addEventChangeType(this.html_builder.form_type);
      this.addEventChangeQuestion(this.html_builder.form_question);
      this.addEventShowHide(this.html_builder.show_subquestion_button);
      this.addEventNewSubquest(this.html_builder.add_subquestion_button);

    } 

    private addEventChangeConditionType(select_condition_type:HTMLSelectElement){
      select_condition_type.addEventListener("change", (event)=>{
        const type: ConditionTypes = (event.target as HTMLSelectElement).value as ConditionTypes
        this.condition.setConditionType(type)
      })
    }

    private addEventChangeConditionBody(body:Element){
      body.addEventListener("input", (event)=>{
        this.condition.setConditionBody((event.target as HTMLInputElement).value)
      })
    }

    private addEventChangeQuestion(question_input:HTMLInputElement){
      question_input.addEventListener("input", (event) => {
        this.question = (event.target as HTMLInputElement).value;
        console.log(this.question)
      });
    }

    private addEventRemove(button: HTMLButtonElement): void{
      button.addEventListener("click", (event) => {
        this.remove();
      })
    }

   
    private addEventShowHide(button: HTMLButtonElement): void{
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

    private addEventNewSubquest(button: HTMLButtonElement): void{
      button.addEventListener("click", (event) => {
          /* Create new node */
          const lastLetter:string = (+this.last_children_id.slice(-1) + 1).toString();
          this.last_children_id = this.last_children_id.slice(0, -1) + lastLetter;
          //ID schema  input_{parent_last_num_id}_{child_last_num_id}_{childchild_last_num_id}...
          let new_node:InputTreeNode  = new InputTreeNode(this.last_children_id, this)

          /* Add condition */
          new_node.setCondition(createCondition(this.type))

          /* Append and render */
          this.appendChild(new_node);
          const subqestions: HTMLDivElement | null = document.querySelector("#subquestions_" + this.id);
          new_node.renderInput(subqestions);

          /* rerender button at the end of subquestions */
          const target:Element = event.target as Element;
          target.remove();
          this.html_builder.renderSubquestionsButton();
          this.addEventNewSubquest(this.html_builder.add_subquestion_button);
          
      })
    }

    private addEventChangeType(input_select: HTMLSelectElement ): void{
      input_select.addEventListener("change", (event)=>{
        var selected: HTMLSelectElement = event.target as HTMLSelectElement;
        this.type = selected.value as InputTypes;

        /* Change conditions on all child */
        for( var subquest of  this.childrens){
          subquest.setCondition(createCondition(this.type))
          subquest.html_builder.renderCondition();
          subquest.addEventChangeConditionBody(subquest.html_builder.condition_body);
          subquest.addEventChangeConditionType(subquest.html_builder.condition_select_type);
        }

      })
    }

    public remove(): void{
      /* Delete in DOM */
      this.html_builder.removeInput()

      /* Delete in parent childrens */
      if(this.parent !== undefined){
        this.parent.removeChild(this);
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

    public setCondition(condition: ICondition):void{
      this.condition = condition;
    }

    public getId():string{
      return this.id;
    }

    public getCondition():ICondition | undefined {
      return this.condition;
    }
  }