
let i = 0;

for (let todo of todos) {
    let todoBox = document.querySelector("#todoBox");
    let columnsIsMobile = document.createElement("div");
    let column1 = document.createElement("div");
    let column1Button = document.createElement("button");
    let column2 = document.createElement("div");
    let form2 = document.createElement("form");
    let form2Button = document.createElement("button");

    // defining classes
    columnsIsMobile.className = "columns is-mobile is-gapless";
    column1.className = "column";

    column1Button.className = "button box input px-3";
    column1Button.name = "data";
    column1Button.id = "btn";
    // column1Button.onclick = OpenMore(i);
    // i++;
    column1Button.innerText = todo.data;

    column2.className = "column is-3 ml-3";
    form2.action = `/todos/${todo._id}`;
    form2.method = "POST";
    form2Button.className =
        "button is-fullwidth box has-background-success has-text-white mr-2";

    // Define content
    form2Button.innerText = "Done";

    displayBulmaModal(todo);

    // modals.push(new BulmaModal(".modal"));


    // Append elements
    todoBox.appendChild(columnsIsMobile);

    columnsIsMobile.appendChild(column1);
    columnsIsMobile.appendChild(column2);

    column1.appendChild(column1Button);

    column2.appendChild(form2);
    form2.appendChild(form2Button);

    // (function () {
    //     let btn = document.querySelector("#btn");
    //     let modal = document.querySelector(".modal");

    //     btn.addEventListener("click", () => {
    //         alert("Btn Clicked", todo.data);
    //         // modal.classList.add("is-active");
    //     });
    // })();

    i++;
}
let btns = document.querySelectorAll("#btn");
// let modal = document.querySelector(".modal");

// for (let btn of btns) {
//     (function () {
//         let modal = document.querySelector(".modal");

//         btn.addEventListener("click", () => {
//             console.log("Btn Clicked out ", btn);
//             modal.classList.add("is-active");
//         });
//     })();
// }

// let mdl = new BulmaModal(".modal");

// console.log("Modals: ", modals[2]);

// btn.forEach((elem) => {
//     elem.addEventListener("click", () => {
//         modal.classList.add("is-active");
//     });
// });

// modalBg.forEach((elem) => {
//     elem.addEventListener("click", () => {
//         modal.classList.remove("is-active");
//     });
// });

// modalClose.forEach((elem) => {
//     elem.addEventListener("click", () => {
//         modal.classList.remove("is-active");
//     });
// });

// btn.addEventListener("click", () => {
//     modal.classList.add("is-active");
// });

// modals[2].addEventListener("modal:show", function () {
//     console.log("opened");
// });

// modals[2].addEventListener("modal:close", function () {
//     console.log("closed");
// });

// mdl.forEach((elem) => {
//     // let mdl = new BulmaModal(elem);

//     elem.addEventListener("modal:show", function () {
//         console.log("opened");
//     });

//     elem.addEventListener("modal:close", function () {
//         console.log("closed");
//     });
// });

// btn.addEventListener("click", function () {
//     mdl.show();
// });

// let buttonEvent = document.querySelectorAll("#btn");

// buttonEvent.forEach(function (elem) {
//     elem.addEventListener("click", function () {
//         alert("Please");
//     });
// });

/////////////////////////////////////////////////////////////////////////
// $(document).ready(function () {
//     $("#btn").click(function () {
//         $("#myModal").addClass("is-active"); // modal is open
//     });

//     $("#your_id_button_close").click(function () {
//         $("#myModal").removeClass("is-active"); // modal is close
//     });
// });

/////////////////////////////////////////////////////////////////////////
// //One Modal
// function OpenModal() {
//     //Get element with Id= "modal"
//     let modal = document.getElementById("modal");
//     //Change style to display = "block"
//     modal.style.display = "block";
// }

// // //Multiple Modals
// function OpenMore(n) {
//     //Get elements with class="modal" into an array
//     let modal = document.getElementsByClassName("modal");
//     //Change style of modal number [n] to display = "block"
//     modal[n].style.display = "block";
// }

// window.onclick = function (event) {
//     //For single modal
//     let modal = document.querySelector(".modal");
//     //If the click was on the modal the modal style display = "none"
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }

//     //For multiple modals
//     let more = document.getElementsByClassName("modal");
//     //i represents which modal. It will go through all modals
//     for (let i = 0; i < more.length; i++) {
//         //If the click was on the modal for one of the modals display = "none"
//         //for all of them
//         if (event.target == more[i]) {
//             more[i].style.display = "none";
//         }
//     }
// };
