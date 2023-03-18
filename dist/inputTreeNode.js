import { InputTypes } from "./inputTypes.js";
export class InputTreeNode {
    constructor(id, parent) {
        this.parent = undefined; //undefined only for root
        this.childrens = [];
        this.question = '';
        this.type = InputTypes.TEXT;
        this.id = id;
        this.parent = parent;
    }
    appendChild() {
        console.log('x');
    }
}
