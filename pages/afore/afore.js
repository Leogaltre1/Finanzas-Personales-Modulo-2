//alert('Connected');

document.getElementById("form").addEventListener("submit", 
    function(event) {
        event.preventDefault(); // Prevenir el envío del formulario

        // Obtener los valores de los inputs
        let salary = parseFloat(document.getElementById("salary").value);
        let startingBalance = parseFloat(document.getElementById("starting-balance").value);
        let age = parseInt(document.getElementById("age").value);
        let rateOfReturn = parseFloat(document.getElementById("rate-of-return").value) / 100; // Convertir a decimal
        let period = parseInt(document.getElementById("period").value);

        // Verificar si todos los campos son válidos
        if (isNaN(salary) || isNaN(startingBalance) || isNaN(age) || isNaN(rateOfReturn) || isNaN(period)) {
            document.getElementById("final-result")
            // alert("Por favor, ingresa valores válidos.");
            document.getElementById("final-result").textContent = "Por favor, ingresa valores válidos.";
            return;
        }

        let aportationByUs = salary * 0.0125;
        let aportationByEmployer = salary * 0.05150;
        let aportationByGobernment = salary * 0.00225;
        let aportationBimestral = 2 * (aportationByEmployer + aportationByGobernment + aportationByUs);
        let earnsStartingBalance = startingBalance * Math.pow(1 + rateOfReturn, period);
        let periodicAportation = aportationBimestral / rateOfReturn * (Math.pow(1 + rateOfReturn, period) - 1);
        let finalSavings = earnsStartingBalance + periodicAportation;
        let finalSavingsString = `$${finalSavings.toFixed(2)}`;

        // toFixed(2) valor numero a cadena de texto
        document.getElementById("final-result").textContent = finalSavingsString;
    }
);