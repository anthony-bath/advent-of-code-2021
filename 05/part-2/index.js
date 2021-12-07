import fs from "fs";
import {
  loadData,
  plotHorizontal,
  plotVertical,
  plotDiagonal,
  evaluateGrid,
} from "../util/index.js";

const { lines, grid } = loadData();

for (const line of lines) {
  const { x1, x2, y1, y2 } = line;

  if (x1 === x2) {
    plotVertical(y1, y2, x1, grid);
  } else if (y1 === y2) {
    plotHorizontal(x1, x2, y1, grid);
  } else {
    plotDiagonal(x1, x2, y1, y2, grid);
  }
}

fs.writeFileSync("./05/part-2/output.txt", evaluateGrid(grid));