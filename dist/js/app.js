// let backgroundImage;
// let numParticles = 50;
// let particles = [];

// function preload() {
//   backgroundImage = loadImage('../img/home_overlay.png'); 
// }

// function setup() {
//   let canvas = createCanvas(600, 330);
//   canvas.parent('image');
//   for (let i = 0; i < numParticles; i++) {
//     particles.push(new Particle());
//   }
// }

// function draw() {
//   image(backgroundImage, 0, 0, width, height);

//   for (let particle of particles) {
//     particle.update();
//     particle.show();
//   }
// }


// class Particle {
//   constructor() {
//     this.colors = ['#00cf52', '#FFFFFF', '#00df96', '#FFFFFF'];
//     this.color = color(random(this.colors));
//     this.alpha = random(50, 200); 
//     this.fadeSpeed = random(2, 3); 
//     this.fadeDirection = 1; 
//     this.fadeDelay = random(100); 
//     this.radius = 1; 
//     this.pulseFactor = random(3, 5); 
//     this.timeOffset = random(100); 
//     this.resetPosition(); 
//   }

//   update() {
//     if (frameCount > this.fadeDelay) {
//       this.alpha += this.fadeSpeed * this.fadeDirection;
//       this.alpha = constrain(this.alpha, 0, 255);
//     }

//     if (this.alpha <= 0 || this.alpha >= 255) {
//       this.fadeDirection *= -1;
//       if (this.alpha <= 0) {
//         this.resetPosition();
//       }
//     }
//   }

//   resetPosition() {
//     this.x = random(width);
//     this.y = random(height);
//     this.alpha = random(100, 200); 
//     this.fadeDirection = 1;
//     this.fadeDelay = frameCount + random(100);
//   }

//   show() {
//     let pulse = sin(frameCount * 0.03 * this.pulseFactor + this.timeOffset); 
//     let amplitude = 0.3; 
//     let radiusWithPulse = this.radius * (1 + pulse * amplitude);

    
//     let fillColor = color(red(this.color), green(this.color), blue(this.color), this.alpha);
//     fill(fillColor);
//     noStroke();
//     ellipse(this.x, this.y, radiusWithPulse * 2);
//   }
// }

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }





const numLights = 10; // Set the number of lights to 6
const lightPositions = [];
const shiningSpeed = 0.1; // Adjust the shining speed (higher values make it faster)
const lightStates = [];

let treeImage;

function preload() {
  treeImage = loadImage('../img/christmas_tree.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Random light positions within the specified coordinate boundaries
  for (let i = 0; i < numLights; i++) {
    const lightX = random(width * 0.603227, width * 0.453227);
    const lightY = random(height * 0.430939, height * 0.730939);
    lightPositions.push(createVector(lightX, lightY));
  }

  for (let i = 0; i < numLights; i++) {
    lightStates.push(255); // Set initial brightness to maximum
  }
}

function draw() {
  background(0);
  imageMode(CORNER);
  image(treeImage, 0, 0, width, height);

  for (let i = 0; i < numLights; i++) {
    const x = lightPositions[i].x;
    const y = lightPositions[i].y;

    // Update shining effect with a random factor to create twinkling effect
    lightStates[i] = (lightStates[i] + random(-10, 10)) % 255;

    // Draw shining effect (diamond shape) with lowered opacity on edges
    const radius = 15; // Base radius of the diamond shape
    const angleStep = TWO_PI / 4; // Angle step for diamond shape (4 points)
    const brightness = map(lightStates[i], 0, 255, 150, 255); // Increased brightness
    const edgeOpacity = 50; // Opacity of the diamond edges
    fill(255, 255, 255, brightness); // White glare
    noStroke();
    beginShape();
    for (let j = 0; j < 4; j++) {
      let angle = j * angleStep;
      let xOff = cos(angle) * radius;
      let yOff = sin(angle) * radius;
      let alpha = j % 2 === 0 ? 255 : edgeOpacity; // Lower opacity on edges
      fill(255, 255, 255, alpha);
      vertex(x + xOff, y + yOff);
    }
    endShape(CLOSE);

    // Draw base light
    fill(255);
    ellipse(x, y, 6, 6);
  }
}