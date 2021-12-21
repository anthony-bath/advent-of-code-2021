import fs, { symlink } from "fs";

export class Scanner {
  constructor(id) {
    this.id = id;
    this.beacons = [];
    this.rotations = new Map();
    this.vectors = new Map();
  }

  addBeacon(beacon) {
    this.beacons.push(beacon);
    this.setRotations(beacon);
  }

  calculateVectors() {
    for (let i = 0; i < this.beacons.length; i++) {
      for (let j = 0; j < this.beacons.length; j++) {
        if (
          i === j ||
          this.vectors.has(`${i}-${j}`) ||
          this.vectors.has(`${j}-${i}`)
        ) {
          continue;
        }

        const p1 = this.beacons[i];
        const p2 = this.beacons[j];

        this.vectors.set(`${i}-${j}`, new Vector(p1, p2));
      }
    }
  }

  setRotations(beacon) {
    const { x, y, z } = beacon;

    this.rotations.set(beacon, [
      new Point(x, y, z),
      new Point(x, -z, y),
      new Point(x, -y, -z),
      new Point(x, z, -y),

      new Point(-x, -y, z),
      new Point(-x, z, y),
      new Point(-x, y, -z),
      new Point(-x, -z, -y),
    ]);
  }
}

export class Point {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  diff(point) {
    return new Point(this.x - point.x, this.y - point.y, this.z - point.z);
  }

  toString() {
    return `(${this.x}, ${this.y}, ${this.z})`;
  }
}

export class Vector {
  constructor(p1, p2) {
    this.direction = new Point(p2.x - p1.x, p2.y - p1.y, p2.z - p1.z);

    const { x, y, z } = this.direction;
    this.magnitude = Math.sqrt(x * x + y * y + z * z);
  }

  equiDistant(vector) {
    return this.magnitude === vector.magnitude;
  }

  toString() {
    return `${this.magnitude} (${this.direction.toString()})`;
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
      scanner.addBeacon(new Point(x, y, z));
    }
  });

  return { scanners };
};
