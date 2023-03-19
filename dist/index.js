import { InputTreeNode } from "./inputTreeNode.js";
const inputs = document.querySelector('#inputs');
let roots = [];
function addButtonNewInput(id) {
    /* Create button and add to inputs*/
    const new_button = document.createElement("button");
    new_button.innerHTML = "&plus; <br> Add new input";
    new_button.classList.add("input_add");
    new_button.setAttribute("id", id);
    inputs.appendChild(new_button);
    /* Add event listener to new button */
    const input_add = document.querySelector('.input_add');
    input_add === null || input_add === void 0 ? void 0 : input_add.addEventListener('click', (event) => {
        /* Get id */
        const target = event.target;
        const id = target.id;
        console.log(id);
        /* Create new tree */
        let new_root = new InputTreeNode(id, undefined);
        roots.push(new_root);
        /* Del button new input and add input */
        target.remove();
        new_root.renderInput(inputs);
        /* Add new button add input element*/
        const lastLetter = (+id.slice(-1) + 1).toString();
        let new_input_id = id.slice(0, -1) + lastLetter;
        addButtonNewInput(new_input_id);
    });
}
addButtonNewInput("input_0");
