// Wait for the DOM to be fully loaded before running your code
document.addEventListener("DOMContentLoaded", () => {
    // Group your DOM elements
    const operandButtons = document.querySelectorAll("[data-operand]");
    const operatorButtons = document.querySelectorAll('[data-operator]:not([data-operator="equals"]):not([data-operator="delete"])');
    const equalsButton = document.querySelector('[data-operator="equals"]');
    const clearButton = document.querySelector('[data-operator="clear"]');
    const deleteButton = document.querySelector('[data-operator="delete"]')

    const currentDisplay = {
        firstOperand: document.getElementById("current-firstOperand"),
        operator: document.getElementById("current-operator"),
        secondOperand: document.getElementById("current-secondOperand")
    };

    // Mapping of operator identifiers to display symbols
    const operatorSymbols = {
        plus: "+",
        minus: "-",
        multiply: "*",
        divide: "/"
    };

    // Encapsulate calculator state in a single object
    const state = {
        firstOperand: "",
        operator: "",
        secondOperand: "",
    };

    // Update the UI based on the current state
    function updateDisplay() {
        currentDisplay.firstOperand.textContent = state.firstOperand;
        currentDisplay.operator.textContent = operatorSymbols[state.operator] || "";
        currentDisplay.secondOperand.textContent = state.secondOperand;
    }

    // Clear the calculator state and update the display
    function clearCalculator() {
        state.firstOperand = "";
        state.operator = "";
        state.secondOperand = "";
        updateDisplay();
    }

    // Add event listeners for operand buttons
    operandButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const operand = event.target.dataset.operand;
            if (!state.operator) {
                state.firstOperand += operand;
            } else {
                state.secondOperand += operand;
            }
            updateDisplay();
        });
    });

    // Add event listeners for operator buttons
    operatorButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            state.operator = event.target.dataset.operator;
            updateDisplay();
            console.log(state.operator, "clicked");
        });
    });

    // When the equals button is clicked, perform the operation
    equalsButton.addEventListener("click", (event) => {
        state.result = operate(state.operator, state.firstOperand, state.secondOperand);

        // Reset the current operation (keeping the result visible)
        state.firstOperand = state.result;
        state.operator = "";
        state.secondOperand = "";
        updateDisplay();
    });

    // Clear the calculator when the clear button is clicked
    clearButton.addEventListener("click", clearCalculator);

    // Call delete function when delete button is clicked
    deleteButton.addEventListener("click", del);

    // Arithmetic functions (using parseFloat for consistency)
    function add(a, b) {
        return parseFloat(a) + parseFloat(b);
    }

    function subtract(a, b) {
        return parseFloat(a) - parseFloat(b);
    }

    function multiply(a, b) {
        return parseFloat(a) * parseFloat(b);
    }

    function divide(a, b) {
        if (parseFloat(b) === 0) return "Error";
        return parseFloat(a) / parseFloat(b);
    }

    // Operate function to choose the arithmetic operation
    function operate(operator, first, second) {
        switch (operator) {
            case "plus":
                return add(first, second);
            case "minus":
                return subtract(first, second);
            case "multiply":
                return multiply(first, second);
            case "divide":
                return divide(first, second);
            default:
                return;
        }
    }


    // Delete function 
    function del() {
        // If the operator variable is blank delete from firstOperand - else delete from secondOperand
        if (state.operator === "") {
            state.firstOperand = state.firstOperand.slice(0, -1);
        } else {
            state.secondOperand = state.secondOperand.slice(0, -1);
        }
        updateDisplay(); // Refresh the display after deletion
    }
});
