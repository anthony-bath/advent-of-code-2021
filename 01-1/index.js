const fs = require("fs");

const data = fs
  .readFileSync("./01-1/input.txt")
  .toString()
  .split("\n")
  .map((x) => parseInt(x, 10));

fs.writeFileSync(
  "./01-1/output.txt",
  data
    .reduce((depthIncreaseCount, depth, i) => {
      return i === 0
        ? depthIncreaseCount
        : depthIncreaseCount + (depth > data[i - 1] ? 1 : 0);
    }, 0)
    .toString()
);
