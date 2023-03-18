import { InputTypes } from "./inputTypes.js";
var ConditionTypes;
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
    setCondition() {
        throw new Error("Method not implemented.");
    }
    render() {
        throw new Error("Method not implemented.");
    }
    showConditions() {
        throw new Error("Method not implemented.");
    }
}
export class NumberCondition {
    constructor() {
        this.conditionType = ConditionTypes.EQUALS;
        this.conditionBody = 0;
    }
    setCondition() {
        throw new Error("Method not implemented.");
    }
    render() {
        throw new Error("Method not implemented.");
    }
    showConditions() {
        throw new Error("Method not implemented.");
    }
}
export class YesOrNoCondition {
    constructor() {
        this.conditionType = ConditionTypes.EQUALS;
        this.conditionBody = false;
    }
    setCondition() {
        throw new Error("Method not implemented.");
    }
    render() {
        throw new Error("Method not implemented.");
    }
    showConditions() {
        throw new Error("Method not implemented.");
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
