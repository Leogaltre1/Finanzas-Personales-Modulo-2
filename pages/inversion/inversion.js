//alert('Connected');

window.document.getElementById("form").addEventListener("submit",
    function(event){
        event.preventDefault(); // Prevenir el envío del formulario

        let saving = parseFloat(document.getElementById("saving").value);
        // Obtener el valor del radio button | Se realizo asi para no modificar el value de HTML
        let selectedPeriod = document.querySelector('input[name="period"]:checked').value;

        // Objetos con las tasas de retorno
        let nu_rate_of_return = {
            "to_view": 12.00,   // A la vista
            "28days": 12.62,    // 28 días
            "90days": 14.00,    // 90 días
            "180days": 11.76    // 180 días
        };

        let mercadoPago_rate_of_return = {
            "to_view": 15.00,   // A la vista
            "28days": null,    // No disponible
            "90days": null,    // No disponible
            "180days": null    // No disponible
        };

        let finsus_rate_of_return = {
            "to_view": 9.37,
            "28days": 9.55,
            "90days": 10.20,
            "180days": 10.43
        };

        let cetes_rate_of_return = {
            "to_view": 9.44,
            "28days": 9.44,
            "90days": 9.19,
            "180days": 9.10
        };

        const selectPeriod = (selectedPeriod) => {
            // Obtener las tasas de retorno segun selectPeriod
            let nuRate = nu_rate_of_return[selectedPeriod];
            let finsusRate = finsus_rate_of_return[selectedPeriod];
            let cetesRate = cetes_rate_of_return[selectedPeriod];
            let mercadoPagoRate = mercadoPago_rate_of_return[selectedPeriod];

            let nuEarns = `$${((1 + nuRate/100) * saving).toFixed(2)}`;
            let finsusEarns = `$${((1 + finsusRate/100) * saving).toFixed(2)}`;
            let cetesEarns = `$${((1 + cetesRate/100) * saving).toFixed(2)}`;
            let mpEarns = mercadoPagoRate ? `$${((1 + mercadoPagoRate/100) * saving).toFixed(2)}` : 'No disponible';

            return [nuEarns, finsusEarns, cetesEarns, mpEarns];
        };

        // Función para graficar los resultados
        const plotGraph = (earnings) => {
            // Crear la gráfica de barras
            const table = document.getElementById('earningsChart').getContext('2d');
            const chartData = earnings.map(value => {
                return value === 'No disponible' ? 0 : parseFloat(value.replace('$', '').replace(',', ''));
            });

            const chart = new Chart(table, {
                type: 'bar',
                data: {
                    labels: ['Nu Bank', 'Finsus', 'CETES', 'Mercado Pago'],
                    datasets: [{
                        label: 'Rendimientos Anuales $',
                        data: chartData,
                        backgroundColor: ['#9B01F2', '#F46E01', '#97F401', '#3AD3F6'],
                        borderColor: '#000',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        };

        // Modificar la función printEarnsOnText para incluir la llamada a plotGraph
        const printEarnsOnText = (arrayEarns) => {
            let nuEarns = arrayEarns[0];
            let finsusEarns = arrayEarns[1];
            let cetesEarns = arrayEarns[2];
            let mpEarns = arrayEarns[3];

            document.getElementById("Nu-Result").textContent = nuEarns;
            document.getElementById("Finsus-Result").textContent = finsusEarns;
            document.getElementById("CETES-Result").textContent = cetesEarns;
            document.getElementById("MP-Result").textContent = mpEarns;

            // Graficar los resultados
            plotGraph([nuEarns, finsusEarns, cetesEarns, mpEarns]);
        };

        //Rendimiento anual - Invertido a 28 dias - Nu: $amount_year (Tasa: 12%)
        //Rendimiento mensual - Invertido a 28 dias - Nu: $amount_month (Tasa: 12%)

        switch (selectedPeriod){
            case "to_view":
                printEarnsOnText(selectPeriod(selectedPeriod));
                break;
            case "28days":
                printEarnsOnText(selectPeriod(selectedPeriod));
                break;
            case "90days":
                printEarnsOnText(selectPeriod(selectedPeriod));
                break;
            case "180days":
                printEarnsOnText(selectPeriod(selectedPeriod));
                break;
            default:
                alert("Error inesperado");
                break;
        };
    }
);