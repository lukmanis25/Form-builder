import { createInput, IInput, InputTypes } from "./input.js";
import { ICondition, createCondition, ConditionTypes} from "./condition.js";
import { inputHTMLBuilder } from "./inputHTMLBuilder.js";
import { InputHTMLInForm } from "./inputHTMLInForm.js";
import { roots } from "./index.js";
export class InputTreeNode {
    private id:string;
    private parent: InputTreeNode | undefined = undefined;  //undefined only for root
    private childrens: InputTreeNode[] = []; // subquestions
    private last_children_id: string // to control id unique

    private question:string = ''; 
    private type:InputTypes = InputTypes.TEXT;
    private input:IInput; 
    private condition?:ICondition; //undefined only for roots

    /* HTML creators */
    private html_builder:inputHTMLBuilder; //for build mode
    private html_in_form:InputHTMLInForm; // for form mode

    constructor(id: string, parent: InputTreeNode | undefined) {
        this.id = id;
        this.parent = parent;
        this.html_builder = new inputHTMLBuilder(this);
        this.html_in_form = new InputHTMLInForm(this);
        this.last_children_id = this.id + "_0"
        this.input = createInput(this.type, this)
    }

    /* Render in form mode */
    public renderInForm(container: HTMLFormElement, is_hide?:Boolean | undefined) {
      /* render question with input */
      this.html_in_form.renderInput(container);


      /* Add events */
      this.addEventChangeInput();

      /* do the same for each child with hide value */
      for(var subquestion of this.childrens){
        subquestion.renderInForm(container, true);
      }

      /* Show roots */
      if(is_hide === undefined || is_hide === false){
        this.visible(true)
      }
    }

    /* Change visible of input in form mode */
    public visible(visible: Boolean):void{
      /* Show */
      if(visible){
        this.html_in_form.ShowInput();
         
        //Show childrens
        for(var child of this.childrens){
          if(child.getCondition().isConditionFulfil(this.input.getValue())){
            child.visible(true);
          }
        }
      }
      /* Hide */
      else{
        this.html_in_form.HideInput();

        //Hide childrens
        for(var child of this.childrens){
          child.visible(false);
        }
      }
    }

    /* Render input in building mode */
    public render(container: HTMLDivElement):void {

      /* Render build form with question and type */
      this.html_builder.renderInput(container);

      /* Add conditions inputs if exist */
      if(this.condition !== undefined){
        this.html_builder.renderCondition();
      }

      /* Add events */
      this.addEventRemove(this.html_builder.remove_button);
      this.addEventChangeType(this.html_builder.form_type);
      this.addEventChangeQuestion(this.html_builder.form_question);
      this.addEventShowHide(this.html_builder.show_subquestion_button);
      this.addEventNewSubquest(this.html_builder.add_subquestion_button);

      //Events for conditions
      if(this.condition !== undefined){
        this.addEventChangeConditionBody(this.html_builder.condition_body);
        this.addEventChangeConditionType(this.html_builder.condition_select_type);
      }

    } 

    /* Event when user changed input in form mode */
    private addEventChangeInput(){
      this.input.addEventChangeInput();
    }

    /* Event when user changed condition type in build mode */
    private addEventChangeConditionType(select_condition_type:HTMLSelectElement){
      select_condition_type.addEventListener("change", (event)=>{
        const type: ConditionTypes = (event.target as HTMLSelectElement).value as ConditionTypes
        this.condition.setConditionType(type)
      })
    }

    /* Event when user changed condition body in build mode */
    private addEventChangeConditionBody(body:Element){
      body.addEventListener("input", (event)=>{
        this.condition.setConditionBody((event.target as HTMLInputElement).value)
      })
    }

    /* Event when user changed question for input in build mode */
    private addEventChangeQuestion(question_input:HTMLInputElement){
      question_input.addEventListener("input", (event) => {
        this.question = (event.target as HTMLInputElement).value;
      });
    }

    /* Event when user removed input (clicked x button) in build mode */
    private addEventRemove(button: HTMLButtonElement): void{
      button.addEventListener("click", (event) => {
        this.remove();
      })
    }

   /* Event when user clicked show/hide subquestion for input in build mode*/
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

    /* Event when user clicked add new subquestion button in build mode*/
    private addEventNewSubquest(button: HTMLButtonElement): void{
      button.addEventListener("click", (event) => {
          /* Create new node */
          const lastLetter:string = (+this.last_children_id.slice(-1) + 1).toString();
          this.last_children_id = this.last_children_id.slice(0, -1) + lastLetter;
          //ID schema  input_{parent_last_num_id}_{child_last_num_id}_{childchild_last_num_id}...
          let new_node:InputTreeNode  = new InputTreeNode(this.last_children_id, this)

          /* Add condition */
          new_node.setCondition(createCondition(this.type))

          /* Append subquestion to parent (this) and render */
          this.appendChild(new_node);
          const subqestions: HTMLDivElement | null = document.querySelector("#subquestions_" + this.id);
          new_node.render(subqestions);

          /* rerender button at the end of subquestions */
          const target:Element = event.target as Element;
          target.remove();
          this.html_builder.renderSubquestionsButton();
          this.addEventNewSubquest(this.html_builder.add_subquestion_button);
          
      })
    }

    /* Event when user changed input type in build mode  */
    private addEventChangeType(input_select: HTMLSelectElement ): void{
      input_select.addEventListener("change", (event)=>{
        /*Change type */
        var selected: HTMLSelectElement = event.target as HTMLSelectElement;
        this.type = selected.value as InputTypes;

        /*Unset reference from old input and create new */
        this.input.unsetInputNode()
        this.input = createInput(this.type, this)

        /* Change conditions for all child */
        for( var subquest of  this.childrens){
          subquest.setCondition(createCondition(this.type))
          subquest.html_builder.renderCondition();
          subquest.addEventChangeConditionBody(subquest.html_builder.condition_body);
          subquest.addEventChangeConditionType(subquest.html_builder.condition_select_type);
        }

      })
    }

    /* remove this node */
    public remove(): void{
      /* Delete in DOM */
      this.html_builder.removeInput();
      this.html_in_form.removeInput();
      

      /* Delete in parent childrens */
      if(this.parent !== undefined){
        this.parent.removeChild(this);
      }

      /* Delete in roots if root */
      if(this.parent === undefined){
        const index = roots.indexOf(this, 0);
        if (index > -1) {
          roots.splice(index, 1);
        }
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

    public getQuestion(): string {
      return this.question;
    }

    public getInput(): IInput{
      return this.input;
    }
    public getChildrens(): InputTreeNode[]{
      return this.childrens
    }
  }