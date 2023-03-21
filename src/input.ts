import { InputTreeNode } from "./inputTreeNode";

export enum InputTypes{
    TEXT = "Text",
    NUMBER = "Number",
    YES_OR_NO = "Yes/No",
}


export interface IInput {
    createInput(container:HTMLElement),
    addEventInputChange():void
    unsetInputNode(): void
}


class TextInput implements IInput {
    private value:string = "";
    private input_node:InputTreeNode | null

    private input: HTMLInputElement
    
    constructor(input:InputTreeNode){
        this.input_node = input;
    }
    addEventInputChange(): void {
        if(this.input_node === null){
            return
        }
    }

    createInput(container:HTMLElement) {
        this.input = document.createElement("input");
        this.input.setAttribute("name", "question");
        this.input.setAttribute("type", "text");
        this.input.classList.add("writable_input");

        container.appendChild(this.input)
    }

    unsetInputNode(): void {
        this.input_node = null
    }

}

class NumberInput implements IInput {
    private value:number | undefined;
    private input_node:InputTreeNode | null

    private input: HTMLInputElement

    constructor(input:InputTreeNode){
        this.input_node = input;
    }
    addEventInputChange(): void {
        if(this.input_node === null){
            return
        }
    }
    createInput(container:HTMLElement) {
        this.input = document.createElement("input");
        this.input.setAttribute("name", "question");
        this.input.setAttribute("type", "number");
        this.input.classList.add("writable_input");

        container.appendChild(this.input)
    }
    unsetInputNode(): void {
        this.input_node = null
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
    addEventInputChange(): void {
        if(this.input_node === null){
            return
        }
    }
    createInput(container:HTMLElement) {
        this.input_yes = document.createElement("input");
        this.input_yes.setAttribute("name", "yes/no");
        this.input_yes.setAttribute("type", "radio");
        this.input_yes.setAttribute("value", "yes");

        var label_yes:Element = document.createElement("label");
        label_yes.setAttribute("for", "yes");
        label_yes.innerHTML = "Yes";

        this.input_no = document.createElement("input");
        this.input_no.setAttribute("name", "yes/no");
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

}

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