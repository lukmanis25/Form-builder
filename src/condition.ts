import { InputTypes } from "./inputTypes.js";

enum ConditionTypes {
    EQUALS = "Equals",
    GREATHER_THAN = "Greater than",
    LESS_THAN = "Less than",
}

export interface ICondition {
    render():void,
    showConditions(): void,
    setCondition(): void
}

export class TextCondition implements ICondition{
    private conditionType: ConditionTypes.EQUALS = ConditionTypes.EQUALS;
    private conditionBody: string = "";

    setCondition(): void {
        throw new Error("Method not implemented.");
    }
    render(): void {
        throw new Error("Method not implemented.");
    }
    showConditions(): void {
        throw new Error("Method not implemented.");
    }

}

export class NumberCondition implements ICondition{
    private conditionType: ConditionTypes.EQUALS | ConditionTypes.GREATHER_THAN | ConditionTypes.LESS_THAN = ConditionTypes.EQUALS;
    private conditionBody: number = 0;

    setCondition(): void {
        throw new Error("Method not implemented.");
    }
    render(): void {
        throw new Error("Method not implemented.");
    }
    showConditions(): void {
        throw new Error("Method not implemented.");
    }

}

export class YesOrNoCondition implements ICondition{
    private conditionType: ConditionTypes.EQUALS = ConditionTypes.EQUALS;
    private conditionBody: Boolean = false;

    setCondition(): void {
        throw new Error("Method not implemented.");
    }
    render(): void {
        throw new Error("Method not implemented.");
    }
    showConditions(): void {
        throw new Error("Method not implemented.");
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