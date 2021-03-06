import fs from "fs";
import { loadData, evaluate } from "./shared.js";

const { queue, risk, visited, grid } = loadData(2);
const cols = grid[0].length;
const rows = grid.length;

while (queue.length) {
  const { y, x } = queue.pop();

  if (visited[y][x]) {
    continue;
  } else {
    visited[y][x] = true;
  }

  const args = { y, x, risk, grid, queue };

  x > 0 && !visited[y][x - 1] && evaluate(y, x - 1, args);
  x < cols - 1 && !visited[y][x + 1] && evaluate(y, x + 1, args);
  y < rows - 1 && !visited[y + 1][x] && evaluate(y + 1, x, args);
  y > 0 && !visited[y - 1][x] && evaluate(y - 1, x, args);
}

fs.writeFileSync("./15/output-2.txt", risk[rows - 1][cols - 1].toString());
