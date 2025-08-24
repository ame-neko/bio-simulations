import init, { simulate } from "./pkg/predator_prey.js";

let chart;

async function run() {
    await init();

    document.getElementById("run-btn").addEventListener("click", () => {
        const alpha = parseFloat(document.getElementById("alpha").value);
        const beta = parseFloat(document.getElementById("beta").value);
        const gamma = parseFloat(document.getElementById("gamma").value);
        const delta = parseFloat(document.getElementById("delta").value);

        const data = simulate(
            500,   // steps
            0.01,  // dt
            40.0,  // prey_init
            9.0,   // predator_init
            alpha, beta, gamma, delta
        );

        const prey = [];
        const predator = [];
        const time = [];

        for (let i = 0; i < data.length; i++) {
            const [x, y] = data[i];
            prey.push(x);
            predator.push(y);
            time.push(i);
        }

        drawChart(time, prey, predator);
    });

    document.getElementById("run-btn").click();
}

function drawChart(time, prey, predator) {
    const ctx = document.getElementById("chart").getContext("2d");

    if (chart) chart.destroy(); // 古いグラフを削除

    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: time,
            datasets: [
                {
                    label: "Prey",
                    data: prey,
                    borderColor: "blue",
                    fill: false,
                },
                {
                    label: "Predator",
                    data: predator,
                    borderColor: "red",
                    fill: false,
                }
            ]
        },
        options: {
            animation: false,
            responsive: false
        }
    });
}

run();
