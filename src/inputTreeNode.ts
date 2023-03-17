import { InputTypes } from "./inputTypes";
import { ICondition, createCondition } from "./condition";
class InputTreeNode {
    private parent: InputTreeNode;
    private childrens: InputTreeNode[] = [];

    private question:string = '';
    private type:InputTypes = InputTypes.TEXT;
    private condition?:ICondition;


    
   
    constructor(parent: InputTreeNode) {
      this.parent = parent;
    }
   
    greet() {
      return "Hello, ";
    }
  }