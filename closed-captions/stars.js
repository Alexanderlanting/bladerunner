let canvas;
let stars = [];
let risingDuration = 43.6; // Duration of the rising transition in seconds
let fallingDuration = 0.4; // Duration of the falling transition in seconds
let totalDuration = risingDuration + fallingDuration; // Total duration in seconds
let startTime = 0; // Start time of the animation in milliseconds

function setup() {
    canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    for (let i = 0; i < 800; i++) {
        stars[i] = new Star();
    }
    canvas.hide(); // Hide the canvas until 'sound13' class is added
    frameRate(120); // Assume 60 frames per second
}

function draw() {
    background(0);
    if (startTime === 0) {
        startTime = millis();
    }
    let elapsedTime = (millis() - startTime) / 1000; // Time elapsed since the start of the animation in seconds
    if (elapsedTime >= totalDuration) {
        elapsedTime = totalDuration;
    }
    for (let i = 0; i < stars.length; i++) {
        stars[i].update(elapsedTime);
        stars[i].show();
    }
}

class Star {
    constructor() {
        this.x = random(-width, width);
        this.y = random(-height, height);
        this.z = random(width);
        this.pz = this.z;
        this.speed = 2;  // Initial speed
        this.color = [255, 255, 255];  // Initial color (white)
        this.size = 2;  // Initial size
    }

    update(time) {
        this.z = this.z - this.speed;

        if (this.z < 1) {
            this.z = width;
            this.x = random(-width, width);
            this.y = random(-height, height);
            this.pz = this.z;
        }

        if (time <= risingDuration) {
            // Rising phase: gradually increase speed and change color from white to red
            this.speed = map(time, 0, risingDuration, 2, 20);
            this.color[0] = map(time, 0, risingDuration, 255, 255);
            this.color[1] = map(time, 0, risingDuration, 255, 0);
            this.color[2] = map(time, 0, risingDuration, 255, 0);
            this.size = map(time, 0, risingDuration, 10, 40);
        } else if (time <= totalDuration) {
            // Falling phase: gradually decrease speed and change color from red to white
            this.speed = map(time, risingDuration, totalDuration, 20, 2);
            this.color[0] = map(time, risingDuration, totalDuration, 255, 255);
            this.color[1] = map(time, risingDuration, totalDuration, 0, 255);
            this.color[2] = map(time, risingDuration, totalDuration, 0, 255);
            this.size = map(time, risingDuration, totalDuration, 40, 10);
        } else {
            // After the animation, set speed to 2 and color to white
            this.speed = 2;
            this.color = [255, 255, 255];
            this.size = 10;
        }
    }

    show() {
        fill(this.color);  // Use the star's color
        noStroke();

        let sx = map(this.x / this.z, 0, 1, 0, width);
        let sy = map(this.y / this.z, 0, 1, 0, height);

        let r = map(this.z, 0, width, this.size, 0);
        ellipse(sx, sy, r, r);

        let px = map(this.x / this.pz, 0, 1, 0, width);
        let py = map(this.y / this.pz, 0, 1, 0, height);

        this.pz = this.z;

        stroke(this.color);
        line(px, py, sx, sy);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// Mutation observer
const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if (mutation.attributeName === "class") {
            const classValue = mutation.target.getAttribute('class');
            if (classValue.includes('sound13')) {
                canvas.show(); // If 'sound13' class is present, show the canvas
                startTime = 0; // Reset the start time
            } else {
                canvas.hide(); // If 'sound13' class is not present, hide the canvas
            }
        }
    });
});

observer.observe(document.body, { attributes: true });

