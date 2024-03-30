document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');

    // Function to update the display
    function updateDisplay(value) {
        if (display.innerText === '0') {
            display.innerText = value;
        } else {
            display.innerText += value;
        }
    }

    // Function to safely calculate and update display with result
    function calculateResult() {
        const expression = display.innerText;
        // Replace the new Function() with a safer alternative for evaluating expressions
        try {
            // Split the expression by non-numeric characters to isolate numbers and operators
            const numbersAndOperators = expression.split(/([+\-*/])/).filter(Boolean);
            let result = parseFloat(numbersAndOperators[0]);
            for (let i = 1; i < numbersAndOperators.length; i += 2) {
                const operator = numbersAndOperators[i];
                const nextNumber = parseFloat(numbersAndOperators[i + 1]);
                switch (operator) {
                    case '+':
                        result += nextNumber;
                        break;
                    case '-':
                        result -= nextNumber;
                        break;
                    case '*':
                        result *= nextNumber;
                        break;
                    case '/':
                        if (nextNumber === 0) {
                            throw new Error('Division by zero');
                        }
                        result /= nextNumber;
                        break;
                }
            }
            display.innerText = result.toString();
        } catch (error) {
            console.error('Error calculating result:', error.message);
            display.innerText = 'Error';
        }
    }

    // Function to clear the display
    function clearDisplay() {
        display.innerText = '0';
    }

    // Adding event listeners to number and operation buttons
    document.querySelectorAll('.num, .op').forEach(button => {
        button.addEventListener('click', function() {
            if (this.id === 'op-equals') {
                calculateResult();
            } else if (this.id === 'op-clear') {
                clearDisplay();
            } else {
                updateDisplay(this.innerText);
            }
        });
    });

    console.log('Calculator initialized and event listeners added.');
}, false);