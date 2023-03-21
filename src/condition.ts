import { InputTypes } from "./input.js";
import { InputTreeNode } from "./inputTreeNode.js";

export enum ConditionTypes {
    EQUALS = "Equals",
    GREATHER_THAN = "Greater than",
    LESS_THAN = "Less than",
}

export interface ICondition {
    createConditionBody():Element;
    getPossibleConditions(): ConditionTypes[];
    setConditionBody(body): void;
    setConditionType(type: ConditionTypes):void;
    isConditionFulfil(input_value):Boolean;
}

export class TextCondition implements ICondition{
    private conditionType: ConditionTypes.EQUALS = ConditionTypes.EQUALS;
    private conditionBody: string = "";

    isConditionFulfil(input_value: string): Boolean {
        return input_value === this.conditionBody;
    }

    setConditionBody(body: string): void {
        this.conditionBody = body;
    }
    setConditionType(type: ConditionTypes): void {
        if(type === ConditionTypes.EQUALS){
            this.conditionType = type;
        }
        else{
            throw new Error("Condition wrong type!");
        }
    }
    createConditionBody():Element {
        var input_condition_body:Element = document.createElement("input");
        input_condition_body.setAttribute("name", "condition_body");
        input_condition_body.setAttribute("type", "text");
        return input_condition_body;
    }
    getPossibleConditions(): ConditionTypes[] {
        return [ConditionTypes.EQUALS];
    }
    addEventParentInputChange(): void {
        throw new Error("Method not implemented.");
    }

}

export class NumberCondition implements ICondition{
    private conditionType: ConditionTypes.EQUALS | ConditionTypes.GREATHER_THAN | ConditionTypes.LESS_THAN = ConditionTypes.EQUALS;
    private conditionBody: number = 0;

    isConditionFulfil(input_value: number): Boolean {
        return input_value === this.conditionBody;
    }
    setConditionBody(body: number): void {
        this.conditionBody = body;
    }
    setConditionType(type: ConditionTypes): void {
        if(type === ConditionTypes.EQUALS || type === ConditionTypes.GREATHER_THAN || type === ConditionTypes.LESS_THAN){
            this.conditionType = type;
        }
        else{
            throw new Error("Condition wrong type!");
        }
    }
    createConditionBody():Element {
        var input_condition_body:Element = document.createElement("input");
        input_condition_body.setAttribute("name", "condition_body");
        input_condition_body.setAttribute("type", "number");
        return input_condition_body;
    }
    getPossibleConditions(): ConditionTypes[] {
        return [ConditionTypes.EQUALS, ConditionTypes.GREATHER_THAN, ConditionTypes.LESS_THAN];
    }

}

export class YesOrNoCondition implements ICondition{
    private conditionType: ConditionTypes.EQUALS = ConditionTypes.EQUALS;
    private conditionBody: string = "";
    
    isConditionFulfil(input_value: string): Boolean {
        return input_value === this.conditionBody;
    }
    setConditionBody(body: string): void {
        this.conditionBody = body;
    }
    setConditionType(type: ConditionTypes): void {
        if(type === ConditionTypes.EQUALS){
            this.conditionType = type;
        }
        else{
            throw new Error("Condition wrong type!");
        }
    }
    createConditionBody():Element {
        var input_condition_body:HTMLSelectElement = document.createElement("select");
        input_condition_body.setAttribute("name", "condition_body");

        var option_yes:Element = document.createElement("option");
        option_yes.setAttribute("value", "yes");
        option_yes.textContent = "Yes";
        input_condition_body.appendChild(option_yes);

        var option_no:Element = document.createElement("option");
        option_no.setAttribute("value", "no");
        option_no.textContent = "No";
        input_condition_body.appendChild(option_no);
      
        return input_condition_body;
    }
    getPossibleConditions(): ConditionTypes[] {
        return [ConditionTypes.EQUALS];
    }

}
export function createCondition(parentInputType: InputTypes): ICondition | undefined{
    if(parentInputType == InputTypes.TEXT){
        return new TextCondition
    }
    else if(parentInputType == InputTypes.NUMBER){
        return new NumberCondition
    }
    else if(parentInputType == InputTypes.YES_OR_NO){
        return new YesOrNoCondition
    }
    else{
        return undefined
    }
}