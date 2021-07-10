for (let todo of todos) {
    let btn = document.querySelector("#btn");
    let mdl = new BulmaModal("#myModal");

    btn.addEventListener("click", function () {
        mdl.show();
    });

    mdl.addEventListener("modal:show", function () {
        console.log("opened");
    });

    mdl.addEventListener("modal:close", function () {
        console.log("closed");
    });

    let todoBox = document.querySelector("#todoBox");

    let columnsIsMobile = document.createElement("div");
    let column1 = document.createElement("div");
    let form1 = document.createElement("form");
    let form1Input = document.createElement("input");
    let column2 = document.createElement("div");
    let form2 = document.createElement("form");
    let form2Button = document.createElement("button");

    // defining classes
    columnsIsMobile.className = "columns is-mobile is-gapless";
    column1.className = "column";

    form1.action = `/todos/${todo._id}/?_method=PUT`;
    form1.method = "POST";

    form1Input.className = "box input px-3";
    form1Input.type = "text";
    form1Input.name = "data";
    form1Input.value = todo.data;

    column2.className = "column is-3 ml-3";
    form2.action = `/todos/${todo._id}`;
    form2.method = "POST";
    form2Button.className =
        "button is-fullwidth box has-background-success has-text-white mr-2";

    // Define content
    form2Button.innerText = "Done";

    // Append elements
    todoBox.appendChild(columnsIsMobile);

    columnsIsMobile.appendChild(column1);
    columnsIsMobile.appendChild(column2);

    column1.appendChild(form1);
    form1.appendChild(form1Input);

    column2.appendChild(form2);
    form2.appendChild(form2Button);
}
