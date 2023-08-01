/**
 * 
 * Great start Abhi,
 * Looking at this we get light appearing at a random point on the tree everytime!
 * I can see you have used bounds lightX and lightY to keep it in the tree
 * 
 * I have some challenges below that could extend this script in different directions
 * 
 * The main goal here is to animate the lights
 * 
 * The challenges I am setting out below are tough but will turn this light script into an object-oriented solution which is a great way to solve a whole host of problems further down the line
 * and make scripts easier to extend
 * 
 */


/**
 * REFACTORING CHALLENGES
 * 
 * Can we take your lights and turn them into a JavaScript Class
 * 
 * Once we have this working the same way can we add some methods to the class to change the animation OR add layers of animation
 * some ideas might be: 
 *    rotate()
 *      loop and rotate the diamond around
 * 
 *    pulse()
 *      loop the diamond growing and shrinking
 * 
 * 
 * 
 * With a class we can also then initiate the object with some starting arguments
 *    these might be radius, brightness, speed etc
 * 
 * Some other thoughts might be can we add x number of diamond shapes offset by an angle
 *    this would be nice to be progromatically generated i.e two diamonds are 90• offset, three would be 60• etc
 *  
 * 
 * if you get the Light class working with an animated effect can we...
 * change the effect by passing an argument? 
 *    this might need seperate classes that inherit from a seperate Effect class that just controls the effect produced around the Lights position,
 *    lines animating around a radius or circles or triangles
 *    flickering patterns,
 *    and any other light effects you can think of
 * 
 * If you get stuck at all - work through some of Dan Shiffmans P5 tutorials as he has many many many examples of using classes in JavaScript
 * 
 * 
 */



class Light {
  constructor(x, y, radius) {
    this.position = createVector(x, y);
    this.radius = radius;
    this.state = 255; // Set initial brightness to maximum
    this.shiningSpeed = 0.1;
    this.edgeOpacity = 50;
    this.angleOffset = random(TWO_PI); // Random initial angle offset for rotation
    this.rotationSpeed = 0.005; // Rotation speed of the diamond
    this.pulseSpeed = 0.05; // Speed of the diamond pulsing animation
    this.baseRadius = radius;
    this.lensFlareOpacity = 50; // Opacity of the lens flare
    this.lensFlareSize = 5; // Initial size of the lens flare
    this.lensFlareSpacing = 5; // Spacing between lens flare ellipses
    this.lensFlareCount = 5; // Number of lens flare ellipses
  }

  update() {
    // Update shining effect with a random factor to create a twinkling effect
    this.state = (this.state + random(-10, 10)) % 255;
  }

  drawLight() {
    // Draw shining effect (diamond shape) with lowered opacity on edges
    const angleStep = TWO_PI / 4; // Angle step for diamond shape (4 points)
    const brightness = map(this.state, 0, 255, 150, 255); // Increased brightness
    const edgeOpacity = this.edgeOpacity; // Opacity of the diamond edges
    fill(255, 255, 255, brightness); // White glare
    noStroke();
    beginShape();
    for (let j = 0; j < 4; j++) {
      let angle = (j * angleStep) + this.angleOffset;
      let xOff = cos(angle) * this.radius;
      let yOff = sin(angle) * this.radius;
      let alpha = j % 2 === 0 ? 255 : edgeOpacity; // Lower opacity on edges
      fill(255, 255, 255, alpha);
      vertex(this.position.x + xOff, this.position.y + yOff);
    }
    endShape(CLOSE);

    // Draw base light
    fill(255);
    ellipse(this.position.x, this.position.y, 6, 6);

    // Draw lens flare effect
    noStroke();
    for (let i = 0; i < this.lensFlareCount; i++) {
      let flareAlpha = map(i, 0, this.lensFlareCount - 1, this.lensFlareOpacity, 0);
      fill(255, 255, 255, flareAlpha);
      ellipse(this.position.x, this.position.y, this.lensFlareSize + i * this.lensFlareSpacing);
    }
  }

  rotate() {
    // Rotate the diamond around its center
    this.angleOffset += this.rotationSpeed;
  }

  pulse() {
    // Loop the diamond growing and shrinking
    this.radius = this.baseRadius + sin(frameCount * this.pulseSpeed) * 5;
  }
}

const numLights = 10; // Set the number of lights to 10
const lightPositions = [];
let christmasLights = [];

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
    christmasLights.push(new Light(lightX, lightY, 15)); // Radius set to 15
  }
}

function draw() {
  background(0);
  imageMode(CORNER);
  image(treeImage, 0, 0, width, height);

  for (let light of christmasLights) {
    light.update();
    light.rotate();
    light.pulse();
    light.drawLight();
  }
}

