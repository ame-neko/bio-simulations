// index.js（--target web の例）
import init, { Universe } from "./pkg/boids.js";

const canvas = document.getElementById("boids-canvas");
const ctx = canvas.getContext("2d");

async function run() {
    const wasm = await init();           // ← ここ大事
    const mem  = wasm.memory;            // WebAssembly.Memory

    const uni = new Universe(200, canvas.width, canvas.height);

    function render() {
        uni.tick();

        const ptr   = uni.boids_ptr();
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
