import { loadData } from "./shared.js";

const { scanners } = loadData();

scanners.forEach((scanner) => scanner.calculateVectors());

const matches = new Map();
for (const [points1, vector1] of scanners[0].vectors) {
  for (let i = 1; i < scanners.length; i++) {
    for (const [points2, vector2] of scanners[i].vectors) {
      if (vector1.equiDistant(vector2)) {
        if (!matches.has(i)) {
          matches.set(i, 0);
        }

        //console.log(`${points1}, ${points2}, ${vector1.magnitude}`);

        matches.set(i, matches.get(i) + 1);
      }
    }
  }
}

console.log(scanners[0].rotations.get(scanners[0].beacons[0]));
