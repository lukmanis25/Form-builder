import { InputTypes } from "./inputTypes.js";
export var ConditionTypes;
(function (ConditionTypes) {
    ConditionTypes["EQUALS"] = "Equals";
    ConditionTypes["GREATHER_THAN"] = "Greater than";
    ConditionTypes["LESS_THAN"] = "Less than";
})(ConditionTypes || (ConditionTypes = {}));
export class TextCondition {
    constructor() {
        this.conditionType = ConditionTypes.EQUALS;
        this.conditionBody = "";
    }
    setConditionBody(body) {
        this.conditionBody = body;
    }
    setConditionType(type) {
        if (type === ConditionTypes.EQUALS) {
            this.conditionType = type;
        }
        else {
            throw new Error("Condition wrong type!");
        }
    }
    createConditionBody() {
        var input_condition_body = document.createElement("input");
        input_condition_body.setAttribute("name", "condition_body");
        input_condition_body.setAttribute("type", "text");
        return input_condition_body;
    }
    getPossibleConditions() {
        return [ConditionTypes.EQUALS];
    }
}
export class NumberCondition {
    constructor() {
        this.conditionType = ConditionTypes.EQUALS;
        this.conditionBody = 0;
    }
    setConditionBody(body) {
        this.conditionBody = body;
    }
    setConditionType(type) {
        if (type === ConditionTypes.EQUALS || type === ConditionTypes.GREATHER_THAN || type === ConditionTypes.LESS_THAN) {
            this.conditionType = type;
        }
        else {
            throw new Error("Condition wrong type!");
        }
    }
    createConditionBody() {
        var input_condition_body = document.createElement("input");
        input_condition_body.setAttribute("name", "condition_body");
        input_condition_body.setAttribute("type", "number");
        return input_condition_body;
    }
    getPossibleConditions() {
        return [ConditionTypes.EQUALS, ConditionTypes.GREATHER_THAN, ConditionTypes.LESS_THAN];
    }
}
export class YesOrNoCondition {
    constructor() {
        this.conditionType = ConditionTypes.EQUALS;
        this.conditionBody = "yes";
    }
    setConditionBody(body) {
        this.conditionBody = body;
    }
    setConditionType(type) {
        if (type === ConditionTypes.EQUALS) {
            this.conditionType = type;
        }
        else {
            throw new Error("Condition wrong type!");
        }
    }
    createConditionBody() {
        var input_condition_body = document.createElement("select");
        input_condition_body.setAttribute("name", "condition_body");
        var option_yes = document.createElement("option");
        option_yes.setAttribute("value", "yes");
        option_yes.textContent = "Yes";
        input_condition_body.appendChild(option_yes);
        var option_no = document.createElement("option");
        option_no.setAttribute("value", "no");
        option_no.textContent = "No";
        input_condition_body.appendChild(option_no);
        return input_condition_body;
    }
    getPossibleConditions() {
        return [ConditionTypes.EQUALS];
    }
}
export function createCondition(parentInputType) {
    if (parentInputType == InputTypes.TEXT) {
        return new TextCondition;
    }
    else if (parentInputType == InputTypes.NUMBER) {
        return new NumberCondition;
    }
    else if (parentInputType == InputTypes.YES_OR_NO) {
        return new YesOrNoCondition;
    }
    else {
        return undefined;
    }
}
