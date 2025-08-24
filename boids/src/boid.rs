use rand::Rng;

#[derive(Clone, Copy)]
pub(crate) struct Vec2 {
    pub(crate) x: f32,
    pub(crate) y: f32,
}

#[derive(Clone)]
pub(crate) struct Boid {
    pub(crate) position: Vec2,
    pub(crate) velocity: Vec2,
}

impl Vec2 {
    fn limit(&mut self, max: f32) {
        let mag = (self.x * self.x + self.y * self.y).sqrt();
        if mag > max {
            self.x = self.x * max / mag;
            self.y = self.y * max / mag;
        }
    }
}

impl Boid {
    pub fn random(width: f32, height: f32) -> Boid {
        let mut rng = rand::rng();
        Boid {
            position: Vec2 {
                x: rng.random_range(0.0..width),
                y: rng.random_range(0.0..height),
            },
            velocity: Vec2 {
                x: rng.random_range(-1.0..1.0),
                y: rng.random_range(-1.0..1.0),
            },
        }
    }
    fn separate(&self, neighbors: &[Boid], desired_dist: f32) -> Vec2 {
        let mut steer = Vec2 { x: 0.0, y: 0.0 };
        let mut count = 0;
        for other in neighbors {
            let dx = self.position.x - other.position.x;
            let dy = self.position.y - other.position.y;
            let dist = (dx * dx + dy * dy).sqrt();

            if dist > desired_dist {
                count += 1;
                steer.x += dx / dist;
                steer.y += dy / dist;
            }
        }
        if count > 0 {
            steer.x /= count as f32;
            steer.y /= count as f32;
        }
        steer
    }

    fn alignment(&self, neighbors: &[Boid]) -> Vec2 {
        let mut avg = Vec2 { x: 0.0, y: 0.0 };
        let mut count = 0;
        for other in neighbors {
            count += 1;
            avg.x += other.velocity.x;
            avg.y += other.velocity.y;
        }
        if count > 0 {
            avg.x /= count as f32;
            avg.y /= count as f32;
        }

        avg
    }

    fn cohesion(&self, neighbors: &[Boid]) -> Vec2 {
        let mut center = Vec2 { x: 0.0, y: 0.0 };
        let mut count = 0;
        for other in neighbors {
            count += 1;
            center.x += other.position.x;
            center.y += other.position.y;
        }
        if count > 0 {
            center.x /= count as f32;
            center.y /= count as f32;
            Vec2 {
                x: center.x - self.position.x,
                y: center.y - self.position.y,
            }
        } else {
            Vec2 { x: 0.0, y: 0.0 }
        }
    }

    pub(crate) fn update(&mut self, neighbors: &[Boid]) {
        let sep = self.separate(neighbors, 0.0);
        let ali = self.alignment(neighbors);
        let coh = self.cohesion(neighbors);

        self.velocity.x = sep.x * 150.0 + ali.x * 1.0 + coh.x * 1.0;
        self.velocity.y = sep.y * 150.0 + ali.y * 1.0 + coh.y * 1.0;

        self.velocity.limit(4.0);
        self.position.x += self.velocity.x;
        self.position.y += self.velocity.y;
    }
}
