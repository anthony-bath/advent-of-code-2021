import { loadData } from "./shared.js";

const { scanners } = loadData();

scanners.forEach((scanner) => scanner.calculateVectors());

console.log(scanners[0].vectors);
console.log(scanners[1].vectors);
