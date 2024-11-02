document.getElementById('inputExpression').addEventListener('input', updateVariableInputs);

function updateVariableInputs() {
    const expression = document.getElementById('inputExpression').value;
    const variableInputsDiv = document.getElementById('variableInputs');
    variableInputsDiv.innerHTML = ''; // Reset variable inputs

    // Get all unique variables from the expression
    const variables = [...new Set(expression.match(/[A-Z]/g))];

    // Create radio buttons for each variable
    for (let variable of variables) {
        const variableDiv = document.createElement('div');
        variableDiv.classList.add('variable');
        variableDiv.innerHTML = `
            <span>${variable}:</span>
            <label><input type="radio" name="${variable}" value="0" checked> 0</label>
            <label><input type="radio" name="${variable}" value="1"> 1</label>
        `;
        variableInputsDiv.appendChild(variableDiv);
    }
}

function calculate() {
    const expression = document.getElementById('inputExpression').value;
    let result;
    document.getElementById('error').innerText = ''; // Reset error message

    try {
        // Get the values from the radio buttons
        const variables = [...new Set(expression.match(/[A-Z]/g))];
        const values = {};

        for (let variable of variables) {
            const selectedValue = document.querySelector(`input[name="${variable}"]:checked`).value;
            values[variable] = selectedValue;
        }

        // Replace variables in the expression with selected values
        let evalExpression = expression;
        for (let variable in values) {
            evalExpression = evalExpression.replace(new RegExp(variable, 'g'), values[variable]);
        }

        // Calculate the result using eval
        result = eval(evalExpression);
        result = result ? 1 : 0; // Convert result to 0 or 1
    } catch (error) {
        result = null; // Set result to null if there's an error
        document.getElementById('error').innerText = "Error: " + error.message;
    }

    if (result !== null) {
        document.getElementById('result').innerText = 'Hasil: ' + result;
    }
}
