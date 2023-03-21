import { InputTreeNode } from "./inputTreeNode.js";

const inputs: HTMLDivElement | null = document.querySelector('#inputs');
const generet_button: HTMLButtonElement = document.querySelector('#generate');
const form_container = document.querySelector('#form_container');
const builder_container = document.querySelector('#builder_container');
const form_content = document.querySelector('#form_content');
let roots: InputTreeNode[] = []  //main questions

let isBuildMode:Boolean = true;

export function getRoots(): InputTreeNode[]{
    return roots;
}

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

        /* Create new tree */
        let new_root:InputTreeNode  = new InputTreeNode(id, undefined)
        roots.push(new_root);
    
        /* Del button new input and add input */
        target.remove();
        new_root.render(inputs)
        

        /* Add new button add input element*/ 
        const lastLetter:string = (+id.slice(-1) + 1).toString();
        let new_input_id: string = id.slice(0, -1) + lastLetter;
        addButtonNewInput(new_input_id);
        
    })
}

function toggleVision(): void{
    form_container.classList.toggle("show_form_container");
    form_container.classList.toggle("hide_form_container");
    builder_container.classList.toggle("hide_builder_container");
    builder_container.classList.toggle("show_builder_container");
}

function toggleButtonGenerate(){
    if(isBuildMode){
        generet_button.textContent = "Stop"
        generet_button.style.backgroundColor = "red";
    }
    else{
        generet_button.textContent = "Generate Form"
        generet_button.style.backgroundColor = "#3b8811";
    }
}

function generate(): void{
    var form = document.querySelector('#form');
    /* Rerender form */
    form.remove();
    var new_form = document.createElement("form");
    new_form.setAttribute("id", "form");
    for (var input of roots) {
        console.log(input);
        input.renderInForm(new_form);
    }

    
    form_content.appendChild(new_form);
}

generet_button.addEventListener("click", (event)=>{
    /* genereta mode if we go to form mode */
    if(isBuildMode){
        generate();
    }

    /*change visons*/
    toggleVision();
    toggleButtonGenerate();

    /* change mode */
    if(isBuildMode){
        isBuildMode = false;
    }
    else{
        isBuildMode = true;
    }
})


addButtonNewInput("input_0");