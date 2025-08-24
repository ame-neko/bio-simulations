use rand::rngs::ThreadRng;
use wasm_bindgen::prelude::*;
mod boid;
use boid::{Boid};

#[wasm_bindgen]
pub struct Universe {
    boids: Vec<Boid>,
    width: f32,
    height: f32,
    desired_dist: f32,
    sep_weight: f32,
    ali_weight: f32,
    coh_weight: f32,
    perception: f32,
    turn_factor: f32,
    max_speed: f32,
    noise: f32,
    rng: ThreadRng,
}

#[wasm_bindgen]
impl Universe {
    #[wasm_bindgen(constructor)]
    pub fn new(num_boids: usize, w: f32, h: f32) -> Universe {
        let mut boids = Vec::new();
        let mut rng = rand::thread_rng();
        for _ in 0..num_boids {
            boids.push(Boid::random(w, h));
        }
        Universe {
            boids,
            width: w,
            height: h,
            desired_dist: 20.0,
            sep_weight: 1.5,
            ali_weight: 1.0,
            coh_weight: 1.0,
            perception: 50.0,
            turn_factor: 0.1,
            max_speed: 4.0,
            noise: 1.0,
            rng,
        }
    }

    pub fn set_desired_dist(&mut self, v: f32) {
        self.desired_dist = v;
    }
    pub fn set_sep_weight(&mut self, v: f32) {
        self.sep_weight = v;
    }
    pub fn set_ali_weight(&mut self, v: f32) {
        self.ali_weight = v;
    }
    pub fn set_coh_weight(&mut self, v: f32) {
        self.coh_weight = v;
    }
    pub fn set_perception(&mut self, v: f32) {
        self.perception = v;
    }

    pub fn set_turn_factor(&mut self, v: f32) {
        self.turn_factor = v;
    }
    pub fn set_max_speed(&mut self, v: f32) {
        self.max_speed = v;
    }
    pub fn set_noise(&mut self, v: f32) {
        self.noise = v;
    }

    pub fn tick(&mut self) {
        let boids_closne = self.boids.clone();
        for boid in &mut self.boids {
            boid.update(
                &boids_closne,
                self.width,
                self.height,
                self.desired_dist,
                self.sep_weight,
                self.ali_weight,
                self.coh_weight,
                self.perception,
                self.turn_factor,
                self.max_speed,
                self.noise,
                &mut self.rng,
            );
        }
    }

    pub fn boids_ptr(&self) -> *const f32 {
        self.boids.as_ptr() as *const f32
    }

    pub fn len(&mut self) -> usize {
        self.boids.len()
    }
}
