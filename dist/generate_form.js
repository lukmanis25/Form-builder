// import { getRoots } from "./index.js";
// import { InputTreeNode } from "./inputTreeNode.js";
// /* Generete onload */
// function generate(){
//     let roots = getRoots();
//     console.log("dziala")
//     var form = document.querySelector('#form');
//     /* Rerender form */
//     var content = document.querySelector('#content');
//     form.remove();
//     var new_form = document.createElement("form");
//     new_form.setAttribute("id", "form");
//     for (var input of roots) {
//         console.log(input);
//         input.renderInForm(new_form);
//     }
//     content.appendChild(new_form)
// }
// window.addEventListener('load', (event) => {
//     generate();
// });
// var button = document.querySelector("#regenerate");
// button.addEventListener("click", (event)=>{
//     generate();
// })
