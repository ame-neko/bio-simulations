use wasm_bindgen::prelude::*;
mod boid;
use boid::{Boid, Vec2};

#[wasm_bindgen]
pub struct Universe {
    boids: Vec<Boid>,
    width: f32,
    height: f32,
}

#[wasm_bindgen]
impl Universe {
    #[wasm_bindgen(constructor)]
    pub fn new(num_boids: usize, width: f32, height: f32) -> Universe {
        let mut boids = Vec::new();
        for _ in 0..num_boids {
            boids.push(Boid::random(width, height));
        }
        Universe {
            boids,
            width,
            height,
        }
    }

    pub fn tick(&mut self) {
        let boids_closne = self.boids.clone();
        for boid in &mut self.boids {
            boid.update(&boids_closne);
        }
    }

    pub fn boids_ptr(&self) -> *const f32 {
        self.boids.as_ptr() as *const f32
    }

    pub fn len(&mut self) -> usize {
        self.boids.len()
    }
}
