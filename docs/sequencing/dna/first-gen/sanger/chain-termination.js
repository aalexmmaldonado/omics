let sangerSketch = (p) => {
  let nucleotides = [];
  let templateSequence = [];
  let primerSequence = [];
  const nucleotideNumber = 70;
  const nucleotideSize = 20;
  const sequenceStartX = 10;
  const sequenceY = 300;
  const nucleotideTypes = ['A', 'T', 'C', 'G'];
  const nucleotideColors = {
    'A': [239, 71, 111],
    'T': [17, 138, 178],
    'C': [255, 209, 102],
    'G': [6, 214, 160]
  };

  let canvas, speedSlider, restartButton;

  p.setup = () => {
    canvas = p.createCanvas(800, 600);
    canvas.parent("chain-termination-container");

    speedSlider = p.createSlider(0.5, 3, 1, 0.1);
    fractionSlider = p.createSlider(0.1, 1.0, 0.3, 0.1);
    restartButton = p.createButton('Restart');
    restartButton.mousePressed(startAnimation);
    moveInterface();

    startAnimation();
  };

  p.draw = () => {
    p.background(245);
    p.text("Speed factor: " + String(speedSlider.value()), 220, 23);
    p.text("% ddNTP: " + String(fractionSlider.value()*100), 210, 48);

    // Draw DNA sequence
    drawtemplateSequence();

    // Update and draw nucleotides
    for (let nucleotide of nucleotides) {
      nucleotide.update();
      nucleotide.display();
    }

    // Check for elongation
    checkElongation();
  };

  p.windowResized = () => {
    moveInterface();
  };

  function moveInterface() {
    speedSlider.position(canvas.position().x + 5, canvas.position().y + 10);
    fractionSlider.position(canvas.position().x + 5, canvas.position().y + 35);
    restartButton.position(canvas.position().x + 8, canvas.position().y + 60);
  }

  function startAnimation() {
    nucleotides = [];
    templateSequence = [];
    primerSequence = [];

    // Generate initial DNA sequence
    for (let i = 0; i < p.width / (nucleotideSize + 5); i++) {
      let base = p.random(nucleotideTypes);
      templateSequence.push(base);
    }

    // Initialize complementary strand with first 10 nucleotides
    for (let i = 0; i < 3; i++) {
      primerSequence.push(getComplementaryBase(templateSequence[i]));
    }

    // Generate random nucleotides
    for (let i = 0; i < nucleotideNumber; i++) {
      createRandomNucleotide();
    }
  }

  function drawtemplateSequence() {
    // Draw primer strand
    for (let i = 0; i < templateSequence.length; i++) {
      let x = sequenceStartX + i * (nucleotideSize + 5);
      drawNucleotide(x, sequenceY - 15, templateSequence[i], 255);
    }

    // Draw complementary strand
    for (let i = 0; i < primerSequence.length; i++) {
      let x = sequenceStartX + i * (nucleotideSize + 5);
      // Check if the last base is a chain terminator
      let isLastBase = (i === primerSequence.length - 1);
      let isChainTerminator = isLastBase && nucleotides.length === 0;
      drawNucleotide(x, sequenceY + 15, primerSequence[i], 255, isChainTerminator);
    }
  }

  function drawNucleotide(x, y, type, alpha, isChainTerminator = false) {
    let color = nucleotideColors[type];
    p.fill(color[0], color[1], color[2], alpha);
    if (isChainTerminator) {
      p.stroke(0);
      p.strokeWeight(4);
    } else {
      p.noStroke();
    }

    if (type === 'A' || type === 'T') {
      p.ellipse(x, y, nucleotideSize);
    } else {
      p.rectMode(p.CENTER);
      p.square(x, y, nucleotideSize);
    }
    p.noStroke();

    p.fill(0);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(12);
    p.text(type, x, y);
  }

  function checkElongation() {
    if (primerSequence.length < templateSequence.length) {
      let nextBaseIndex = primerSequence.length;
      let targetBase = getComplementaryBase(templateSequence[nextBaseIndex]);
      let targetX = sequenceStartX + nextBaseIndex * (nucleotideSize + 5);
      let targetY = sequenceY + 15;

      for (let i = nucleotides.length - 1; i >= 0; i--) {
        let nucleotide = nucleotides[i];
        if (nucleotide.type === targetBase &&
            p.dist(nucleotide.x, nucleotide.y, targetX, targetY) < nucleotideSize * 1.4) {

            primerSequence.push(targetBase);
            nucleotides.splice(i, 1);
            createRandomNucleotide();
          if (nucleotide.isChainTerminator) {
            resetSequences();
          break;
          }
        }
      }
    }

    // Check if the complementary sequence is fully grown
    if (primerSequence.length === templateSequence.length) {
      nucleotides = [];  // Clear all moving nucleotides
    }
  }

  function resetSequences() {
    nucleotides = [];
  }

  function getComplementaryBase(base) {
    switch(base) {
      case 'A': return 'T';
      case 'T': return 'A';
      case 'C': return 'G';
      case 'G': return 'C';
    }
  }

  function createRandomNucleotide() {
    let maxAttempts = 50;
    let attempt = 0;
    let x, y;

    do {
      x = p.random(nucleotideSize, p.width - nucleotideSize);
      y = p.random(nucleotideSize, p.height - nucleotideSize);
      attempt++;
    } while (isPositionOccupied(x, y) && attempt < maxAttempts);

    if (attempt < maxAttempts) {
      let type = p.random(nucleotideTypes);
      let isChainTerminator = (type === 'A' && p.random(1) < fractionSlider.value());
      nucleotides.push(new Nucleotide(x, y, type, isChainTerminator));
    }
  }

  function isPositionOccupied(x, y) {
    for (let nucleotide of nucleotides) {
      if (p.dist(x, y, nucleotide.x, nucleotide.y) < nucleotideSize * 1.5) {
        return true;
      }
    }
    return false;
  }

  class Nucleotide {
    constructor(x, y, type, isChainTerminator = false) {
      this.x = x;
      this.y = y;
      this.type = type;
      this.isChainTerminator = isChainTerminator;
      this.vx = p.random(-2, 2);
      this.vy = p.random(-2, 2);
      this.minSpeed = 1.0;
      this.maxSpeed = 3.0;
    }

    update() {
      this.minSpeed = 1.0 * speedSlider.value();
      this.maxSpeed = 3.0 * speedSlider.value();

      this.x += this.vx;
      this.y += this.vy;

      this.clampVelocity();

      if (this.x < -nucleotideSize*0.1 || this.x > p.width + nucleotideSize*0.1 ||
          this.y < -nucleotideSize*0.1 || this.y > p.height + nucleotideSize*0.1) {
        let index = nucleotides.indexOf(this);
        if (index > -1) {
          nucleotides.splice(index, 1);
          createRandomNucleotide(); // Replace with a new nucleotide
        }
        return; // Exit the function early since this nucleotide is removed
      }

      if (this.x < nucleotideSize / 2 || this.x > p.width - nucleotideSize / 2) this.vx *= -1;
      if (this.y < nucleotideSize / 2 || this.y > p.height - nucleotideSize / 2) this.vy *= -1;

      for (let other of nucleotides) {
        if (other !== this && this.collidesWith(other)) {
          this.resolveCollision(other);
        }
      }
    }

    clampVelocity() {
      let speed = p.sqrt(this.vx * this.vx + this.vy * this.vy);
      if (speed < this.minSpeed) {
        let scale = this.minSpeed / speed;
        this.vx *= scale;
        this.vy *= scale;
      } else if (speed > this.maxSpeed) {
        let scale = this.maxSpeed / speed;
        this.vx *= scale;
        this.vy *= scale;
      }
    }

    collidesWith(other) {
      return p.dist(this.x, this.y, other.x, other.y) < nucleotideSize;
    }

    resolveCollision(other) {
      let dx = other.x - this.x;
      let dy = other.y - this.y;
      let distance = p.sqrt(dx * dx + dy * dy);

      if (distance < nucleotideSize) {
        let nx = dx / distance;
        let ny = dy / distance;

        let dvx = other.vx - this.vx;
        let dvy = other.vy - this.vy;
        let dotProduct = dvx * nx + dvy * ny;

        if (dotProduct > 0) return;

        let impulse = 2 * dotProduct / 2;

        this.vx += impulse * nx;
        this.vy += impulse * ny;
        other.vx -= impulse * nx;
        other.vy -= impulse * ny;
      }
    }

    display() {
      drawNucleotide(this.x, this.y, this.type, 255, this.isChainTerminator);
    }
  }
};

// To use this sketch, create a new p5 instance
new p5(sangerSketch);
