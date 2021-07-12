// ///////////////// Display Bulma Modal ///////////////////

function displayBulmaModal(todo) {
    ////// Select parent element //////
    let todoBox = document.querySelector("#todoBox");

    ////// Create Elements //////
    // Modal
    let myModal = document.createElement("div");
    let modalBackground = document.createElement("div");
    let modalCard = document.createElement("div");

    // Modal Header
    let modalCardHead = document.createElement("header");
    let modalCardTitle = document.createElement("p");
    let modalCloseButton = document.createElement("button");

    // Modal Body
    let modalCardBody = document.createElement("section");
    let modalCardForm1 = document.createElement("form");
    let modalCardForm1Input = document.createElement("input");

    // Modal Footer
    let modalCardFooter = document.createElement("footer");
    let modalCardColumn1 = document.createElement("div");
    let modalCardForm2 = document.createElement("form");
    let modalCardForm2Button = document.createElement("button");

    let modalCardColumn2 = document.createElement("div");
    let modalCardColumn2Button = document.createElement("button");

    ////// Define Attributes //////

    // Modal attributes
    myModal.className = "modal";
    myModal.id = "myModal";

    // Modal Background attributes
    modalBackground.className = "modal-background";

    // Modal Card attributes
    modalCard.className = "modal-card";

    ////// Header //////
    // Modal Header attributes
    modalCardHead.className = "modal-card-head mx-5";

    // Modal Title attributes
    modalCardTitle.className = "modal-card title has-text-centered mb-0";
    modalCardTitle.innerText = todo.data;

    // Modal close button attributes
    modalCloseButton.className = "delete";
    modalCloseButton.ariaLabel = "close";

    ////// Section //////
    // Modal body attributes
    modalCardBody.className = "modal-card-body mx-5 has-background-info";

    // Modal Edit Form attributes
    modalCardForm1.action = `/todos/${todo._id}?_method=PUT`;
    modalCardForm1.method = "POST";
    modalCardForm1.id = "editForm";

    // Modal Edit Form input attributes
    modalCardForm1Input.className = "modal-content input modalInput";
    modalCardForm1Input.type = "text";
    modalCardForm1Input.name = "data";
    modalCardForm1Input.placeholder = `${todo.data}`;

    ////// Footer //////
    // Modal Footer attributes
    modalCardFooter.className = "modal-card-foot mx-5";

    // Modal Footer Column 1 attributes
    modalCardColumn1.className = "column ml-0 mr-2 mt-0 mb-3 p-0";

    // Modal Footer Form 2 attributes
    modalCardForm2.action = `/todos/${todo._id}?_method=DELETE`;
    modalCardForm2.method = "POST";

    // Modal Footer Form 2 Button attributes
    modalCardForm2Button.className = "button is-danger is-fullwidth";
    modalCardForm2Button.innerText = "Delete";

    // Modal Footer Column 2 attributes
    modalCardColumn2.className = "column ml-2 mr-0 mt-0 mb-3 p-0";

    // Modal Footer Column 2 Button attributes
    modalCardColumn2Button.className = "button is-success is-fullwidth";
    modalCardColumn2Button.form = "editForm";
    modalCardColumn2Button.innerText = "Save changes";

    //// Add Modal to parent element ////
    todoBox.appendChild(myModal);

    ////// Build Modal Card //////
    myModal.appendChild(modalBackground);
    myModal.appendChild(modalCard);

    ////// Build Header //////
    modalCard.appendChild(modalCardHead);
    modalCardHead.appendChild(modalCardTitle);
    modalCardHead.appendChild(modalCloseButton);

    ////// Build Section //////
    modalCard.appendChild(modalCardBody);
    modalCardBody.appendChild(modalCardForm1);
    modalCardForm1.appendChild(modalCardForm1Input);

    ////// Build Footer //////
    modalCard.appendChild(modalCardFooter);
    modalCardFooter.appendChild(modalCardColumn1);
    modalCardColumn1.appendChild(modalCardForm2);
    modalCardForm2.appendChild(modalCardForm2Button);

    modalCardFooter.appendChild(modalCardColumn2);
    modalCardColumn2.appendChild(modalCardColumn2Button);
}

// Supestamente este es el codigo que tiene la pagina oficial de Bulma
// document.addEventListener("DOMContentLoaded", function () {
//     // Modals

//     let rootEl = document.documentElement;
//     let $modals = getAll(".modal");
//     let $modalButtons = getAll(".button");
//     let $modalCloses = getAll(
//         ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button"
//     );

//     if ($modalButtons.length > 0) {
//         $modalButtons.forEach(function ($el) {
//             $el.addEventListener("click", function () {
//                 let target = $el.dataset.target;
//                 let $target = document.getElementById(target);
//                 rootEl.classList.add("is-clipped");
//                 $target.classList.add("is-active");
//             });
//         });
//     }

//     if ($modalCloses.length > 0) {
//         $modalCloses.forEach(function ($el) {
//             $el.addEventListener("click", function () {
//                 closeModals();
//             });
//         });
//     }

//     document.addEventListener("keydown", function (event) {
//         let e = event || window.event;
//         if (e.keyCode === 27) {
//             closeModals();
//         }
//     });

//     function closeModals() {
//         rootEl.classList.remove("is-clipped");
//         $modals.forEach(function ($el) {
//             $el.classList.remove("is-active");
//         });
//     }

//     // Functions

//     function getAll(selector) {
//         return Array.prototype.slice.call(
//             document.querySelectorAll(selector),
//             0
//         );
//     }
// });



