import { InputTreeNode } from "./inputTreeNode.js";
import { InputTypes } from "./inputTypes.js";

const inputs: HTMLDivElement | null = document.querySelector('#inputs');
let roots: InputTreeNode[] = []


function addButtonNewInput(id:string){
    /* Create button and add to inputs*/
    const new_button:HTMLButtonElement  = document.createElement("button");
    new_button.innerHTML = "&plus; <br> Add new input";
    new_button.classList.add("input_add");
    new_button.setAttribute("id", id);
    inputs.appendChild(new_button);

    /* Add event listener to new button */
    const input_add: HTMLButtonElement | null = document.querySelector('.input_add');
    input_add?.addEventListener('click', (event)=>{
        /* Get id */
        const target:Element = event.target as Element;
        const id:string = target.id;
        console.log(id);

        /* Create new tree */
        let new_root:InputTreeNode  = new InputTreeNode(id, undefined)
        roots.push(new_root);
    
        /* Del button new input and add form */
        target.remove();
        new_root.createForm(inputs)
        

        /* Add new button add input element*/ 
        const lastLetter:string = (+id.slice(-1) + 1).toString();
        let new_input_id: string = id.slice(0, -1) + lastLetter;
        addButtonNewInput(new_input_id);
        
    })
}

addButtonNewInput("input_0")




