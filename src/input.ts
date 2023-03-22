import { InputTreeNode } from "./inputTreeNode";

export enum InputTypes{
    TEXT = "Text",
    NUMBER = "Number",
    YES_OR_NO = "Yes/No",
}


export interface IInput {
    createInput(container:HTMLElement), //append input for container in DOM
    addEventChangeInput():void //Event when user changed input in form mode
    unsetInputNode(): void //unset input_node reference
    getValue()
    setvalue(value):void
}


class TextInput implements IInput {
    private value:string = "";
    private input_node:InputTreeNode | null

    private input: HTMLInputElement
    
    constructor(input_node:InputTreeNode){
        this.input_node = input_node;
    }

    
    addEventChangeInput(): void {
        this.input.addEventListener("input",(event)=>{
            this.value = (event.target as HTMLInputElement).value

            /* Check condition for subquestions */
            for(var child of this.input_node.getChildrens()){
                //Show when condition is fulfiled
                if(child.getCondition().isConditionFulfil(this.value)){
                    child.visible(true);
                }
                //hide when is no longer fulifiled
                else {
                    child.visible(false);
                }
            }
        });
    }

    createInput(container:HTMLElement) {
        this.value = ""

        this.input = document.createElement("input");
        this.input.setAttribute("name", "question");
        this.input.setAttribute("type", "text");
        this.input.classList.add("writable_input");

        container.appendChild(this.input)
    }

    unsetInputNode(): void {
        /* Set reference to null */
        this.input_node = null
    }
    getValue(): string {
        return this.value
    }
    setvalue(value: string): void {
        this.value = value
    }

}

class NumberInput implements IInput {
    private value:number | undefined;
    private input_node:InputTreeNode | null

    private input: HTMLInputElement

    constructor(input_node:InputTreeNode){
        this.input_node = input_node;
    }

    addEventChangeInput(): void {
        this.input.addEventListener("input",(event)=>{
            //Change "" to undefined
            if((event.target as HTMLInputElement).value === ""){
                this.value = undefined;
            }
            else{
                this.value = +(event.target as HTMLInputElement).value
            }

            /* Check condition for subquestions */
            for(var child of this.input_node.getChildrens()){
                //Show when condition is fulfiled
                if(child.getCondition().isConditionFulfil(this.value)){
                    child.visible(true);
                }
                //hide when is no longer fulifiled
                else {
                    child.visible(false);
                }
            }
        });
    }
    createInput(container:HTMLElement) {
        this.value = undefined

        this.input = document.createElement("input");
        this.input.setAttribute("name", "question");
        this.input.setAttribute("type", "number");
        this.input.classList.add("writable_input");

        container.appendChild(this.input)
    }
    unsetInputNode(): void {
        this.input_node = null
    }
    getValue(): number {
        return this.value
    }
    setvalue(value: number): void {
        this.value = value
    }

}

class YesOrNoInput implements IInput {
    private value:string = "";
    private input_node:InputTreeNode | null

    private input_yes: HTMLInputElement
    private input_no: HTMLInputElement

    constructor(input:InputTreeNode){
        this.input_node = input;
    }

    private changeInput(val:string){
        if (val !== this.value) {
            this.value = val
        }
        /* Check condition for subquestions */
        for(var child of this.input_node.getChildrens()){
            //Show when condition is fulfiled
            if(child.getCondition().isConditionFulfil(this.value)){
                child.visible(true);
            }
            //hide when is no longer fulifiled
            else {
                child.visible(false);
            }
        }
    }

    /* events for yes and no radio */
    addEventChangeInput(): void {
        this.input_yes.addEventListener('change', (event)=> {
            var val: string = (event.target as HTMLInputElement).value
            this.changeInput(val)
        });

        this.input_no.addEventListener('change', (event)=> {
            var val: string = (event.target as HTMLInputElement).value
            this.changeInput(val)
        });
    }
    createInput(container:HTMLElement) {
        this.value = ""

        this.input_yes = document.createElement("input");
        this.input_yes.setAttribute("name", this.input_node.getId() + "_yes/no");
        this.input_yes.setAttribute("type", "radio");
        this.input_yes.setAttribute("value", "yes");

        var label_yes:Element = document.createElement("label");
        label_yes.setAttribute("for", "yes");
        label_yes.innerHTML = "Yes";

        this.input_no = document.createElement("input");
        this.input_no.setAttribute("name", this.input_node.getId() + "_yes/no");
        this.input_no.setAttribute("type", "radio");
        this.input_no.setAttribute("value", "no");

        var label_no:Element = document.createElement("label");
        label_no.setAttribute("for", "no");
        label_no.innerHTML = "No";

        container.appendChild(this.input_yes);
        container.appendChild(label_yes);
        container.appendChild(this.input_no);
        container.appendChild(label_no);
    }
    unsetInputNode(): void {
        this.input_node = null
    }
    getValue(): string {
        return this.value
    }
    setvalue(value: string): void {
        this.value = value
    }

}

/* create input depends of inputType */
export function createInput(inputType: InputTypes, input_node: InputTreeNode): IInput | undefined{
    if(inputType == InputTypes.TEXT){
        return new TextInput(input_node)
    }
    else if(inputType == InputTypes.NUMBER){
        return new NumberInput(input_node)
    }
    else if(inputType == InputTypes.YES_OR_NO){
        return new YesOrNoInput(input_node)
    }
    else{
        return undefined
    }
}