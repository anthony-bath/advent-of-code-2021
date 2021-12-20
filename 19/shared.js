import fs from "fs";

class Scanner {
  constructor(id) {
    this.id = id;
    this.points = [];
    this.vectors = {};
  }

  addPoint(point) {
    this.points.push(point);
  }

  calculateVectors() {
    for (let i = 0; i < this.points.length; i++) {
      for (let j = 0; j < this.points.length; j++) {
        if (i === j) continue;

        const p1 = this.points[i];
        const p2 = this.points[j];

        this.vectors[`${i}-${j}`] = new Vector(p1, p2);
      }
    }
  }
}

class Point {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  toString() {
    return `${this.x}, ${this.y}, ${this.z}`;
  }
}

class Vector {
  constructor(p1, p2) {
    this.direction = new Point(p2.x - p1.x, p2.y - p1.y, p2.z - p1.z);

    const { x, y, z } = this.direction;
    this.magnitude = Math.sqrt(x * x + y * y + z * z);
  }

  toString() {
    const { x, y, z } = this.direction;
    return `${this.magnitude} (${x}, ${y}, ${z})`;
  }
}

export const loadData = () => {
  const data = fs
    .readFileSync("./19/test.txt")
    .toString()
    .split("\n")
    .map((line) => line.trim());

  const scanners = [];
  let scanner;

  data.forEach((line) => {
    if (line.startsWith("---")) {
      scanner = new Scanner(line.replace(/[^\d]/g, ""));
      scanners.push(scanner);
    } else if (line && !line.startsWith("---")) {
      const [x, y, z] = line.split(",").map((n) => parseInt(n));
      scanner.addPoint(new Point(x, y, z));
    }
  });

  return { scanners };
};
