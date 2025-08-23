use js_sys::Array;

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
    let results = Array::new();
    let mut x = prey_init;
    let mut y = predator_init;

    for _ in 0..steps {
        let dx = alpha * x - beta * x * y;
        let dy = delta * x * y - gamma * y;
        x += dx * dt;
        y += dy * dt;

        let point = Array::new();
        point.push(&x.into());
        point.push(&y.into());
        results.push(&point);
    }

    results
}
