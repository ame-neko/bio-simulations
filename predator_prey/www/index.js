import init, { simulate } from "../pkg/predator_prey.js";

async function run() {
    await init();

    const data = simulate(
        5000,   // steps
        0.01,  // dt
        40.0,  // prey_init
        9.0,   // predator_init
        0.1,   // alpha
        0.02,  // beta
        0.3,   // gamma
        0.01   // delta
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
}

function drawChart(time, prey, predator) {
    const ctx = document.getElementById("chart").getContext("2d");
    new Chart(ctx, {
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
        }
    });
}

run();
