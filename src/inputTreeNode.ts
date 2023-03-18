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
   
    appendChild():void{
      console.log('x')
    }
  }