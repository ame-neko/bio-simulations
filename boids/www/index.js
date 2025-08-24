import {Pane} from "https://cdn.jsdelivr.net/npm/tweakpane@4.0.0/dist/tweakpane.min.js";

import init, {Universe} from "./pkg/boids.js";

const canvas = document.getElementById("boids-canvas");
const ctx = canvas.getContext("2d");

async function run() {
    const wasm = await init();
    const mem = wasm.memory;

    let uni = new Universe(200, canvas.width, canvas.height);

    const pane = new Pane();

    const PARAMS = {
        desired_dist: 20, separation: 5.0, alignment: 1.0, cohesion: 0.1, perception: 200, turn_factor: 1, maxSpeed: 4.0, numBoids: 200, noise: 1.0,
    };

    uni.set_desired_dist(PARAMS.desired_dist);
    uni.set_sep_weight(PARAMS.separation);
    uni.set_ali_weight(PARAMS.alignment);
    uni.set_coh_weight(PARAMS.cohesion);
    uni.set_perception(PARAMS.perception);
    uni.set_turn_factor(PARAMS.turn_factor);
    uni.set_max_speed(PARAMS.maxSpeed);
    uni.set_noise(PARAMS.noise);

    pane.addBinding(PARAMS, 'desired_dist', {min: 0, max: 40, step: 1})
        .on('change', ev => uni.set_desired_dist(ev.value));
    pane.addBinding(PARAMS, 'separation', {min: 0, max: 30, step: 0.1})
        .on('change', ev => uni.set_sep_weight(ev.value));
    pane.addBinding(PARAMS, 'alignment', {min: 0, max: 3, step: 0.1})
        .on('change', ev => uni.set_ali_weight(ev.value));
    pane.addBinding(PARAMS, 'cohesion', {min: 0, max: 3, step: 0.1})
        .on('change', ev => uni.set_coh_weight(ev.value));
    pane.addBinding(PARAMS, 'perception', {min: 10, max: 400, step: 1})
        .on('change', ev => uni.set_perception(ev.value));
    pane.addBinding(PARAMS, 'turn_factor', {min: 10, max: 100, step: 1})
        .on('change', ev => uni.set_turn_factor(ev.value));
    pane.addBinding(PARAMS, 'maxSpeed', {min: 1, max: 10, step: 0.1})
        .on('change', ev => uni.set_max_speed(ev.value));
    pane.addBinding(PARAMS, 'noise', {min: 0, max: 10, step: 0.1})
        .on('change', ev => uni.set_noise(ev.value));
    pane.addBinding(PARAMS, 'numBoids', {min: 50, max: 1000, step: 50});

    pane.addButton({title: 'Re-render Boids'})
        .on('click', () => {
            uni = new Universe(PARAMS.numBoids, canvas.width, canvas.height);
            uni.set_desired_dist(PARAMS.desired_dist);
            uni.set_sep_weight(PARAMS.separation);
            uni.set_ali_weight(PARAMS.alignment);
            uni.set_coh_weight(PARAMS.cohesion);
            uni.set_perception(PARAMS.perception);
            uni.set_turn_factor(PARAMS.turn_factor);
            uni.set_max_speed(PARAMS.maxSpeed);
        });

    function render() {
        uni.tick();

        const ptr = uni.boids_ptr();
        const len32 = uni.len();
        // ★ その都度 view を作る（保持しない）
        const floats = new Float32Array(mem.buffer, ptr, len32);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < len32; i += 4) {
            const x = floats[i], y = floats[i + 1];
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fill();
        }
        requestAnimationFrame(render);
    }

    render();
}

run();
