mod model;

use wasm_bindgen::prelude::*;
use js_sys::Array;

#[wasm_bindgen]
pub fn simulate(
    steps: usize,
    dt: f64,
    prey_init: f64,
    predator_init: f64,
    alpha: f64,
    beta: f64,
    gamma: f64,
    delta: f64
) -> Array {
    model::simulate(steps, dt, prey_init, predator_init, alpha, beta, gamma, delta)
}