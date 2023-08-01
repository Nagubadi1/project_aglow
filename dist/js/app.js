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
  constructor(/* instance args here */ radius) {
    this.radius = radius
  }

  // Methods - feel free to change these where appropriate

  getPosition() {

  }

  offsetAngle() {

  }
  
  drawLight() {

  }
}


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