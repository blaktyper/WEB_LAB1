let selectedX = null;
document.addEventListener('DOMContentLoaded', (event) => {

    const selectR = document.getElementById("R");
    const yInput = document.getElementById("y-input");
    const errorBox = document.getElementById("error-box");

    function validateY() {
        hideError();
        const rawValue = yInput.value.trim().replace(',', '.');

        if (rawValue === "") {
            showError("Поле Y не должно быть пустым");
            return false;
        }

        const val = Number(rawValue);
        if (isNaN(val)) {
            showError("Y должен быть числом");
            return false;
        }

        if (val <= -5 || val >= 3) {
            showError("Y должен быть в диапазоне от -5 до 3 (не включая границы)");
            return false;
        }

        return val;
    }

    function showError(msg) {
        if (errorBox) {
            errorBox.textContent = msg;
            errorBox.style.display = "block";
        }
    }

    function hideError() {
        if (errorBox) {
            errorBox.textContent = "";
            errorBox.style.display = "none";
        }
    }

    if (yInput) {
        yInput.addEventListener("input", () => {
            validateY();
        });
    }

    function validateX(){
        hideError();

        if (selectedX === null || selectedX === "") {
            showError("Не выбрано значение X")
            return false;
        }

        return true;
    }

    if (yInput) {
        yInput.addEventListener("input", validateY);
    }

    const buttonList = document.querySelector(".buttons_list_X");
    buttonList.addEventListener("click", (event) => {
        if(event.target.classList.contains("x-btn")) {
            const parsedValX= parseFloat(event.target.value);
            if (!isNaN(parsedValX)) {
                selectedX = parsedValX;
                console.log("Выбранный X:",selectedX);
            } else {
                console.log("X должен быть числом")
            }


        }
    });


    function validateR(){
        hideError();


        if (!selectR) {
            showError("Элемент R не найдет")
            return false;
        }

        const parsedValR= parseFloat(selectR.value);

        const validRValue = [1, 1.5, 2, 2.5, 3];

        if (isNaN(parsedValR) || !validRValue.includes(parsedValR)) {
            showError("R должен быть равен одному из следующих значений: 1, 1.5, 2, 2.5, 3");
            return false;
        }

        return  parsedValR;

    }

    if(selectR) {
        const initialR = parseFloat(selectR.value);
        draw(initialR);

        selectR.addEventListener("change", () => {
            const currentR = parseFloat(selectR.value);
            if (!isNaN(currentR)) {
                draw(currentR);
            }
        })
    }


});

