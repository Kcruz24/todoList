let i = 1;
for (let todo of todos) {
    console.log(i + ": " + todo.data);
    i++;
}

class BulmaModal {
    constructor(selector) {
        this.elem = document.querySelector(selector);
        this.close_data();
    }

    show() {
        this.elem.classList.toggle("is-active");
        this.on_show();
    }

    close() {
        this.elem.classList.toggle("is-active");
        this.on_close();
    }

    close_data() {
        let modalClose = this.elem.querySelectorAll(
            "[data-bulma-modal='close'], .modal-background, .delete, .modal-close"
        );
        let that = this;
        modalClose.forEach(function (e) {
            e.addEventListener("click", function () {
                that.elem.classList.toggle("is-active");

                let event = new Event("modal:close");

                that.elem.dispatchEvent(event);
            });
        });
    }

    on_show() {
        let event = new Event("modal:show");

        this.elem.dispatchEvent(event);
    }

    on_close() {
        let event = new Event("modal:close");

        this.elem.dispatchEvent(event);
    }

    addEventListener(event, callback) {
        this.elem.addEventListener(event, callback);
    }
}

