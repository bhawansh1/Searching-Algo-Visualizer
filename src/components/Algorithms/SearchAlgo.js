var dir = [
  [-1, 0],
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, -1],
  [-1, 1],
  [1, -1],
  [1, 1],
];

var visited = [];
var path = [];

function dfs(start, end, grid, m, n, dirlen) {
  if (visited.find((e) => JSON.stringify(e) === JSON.stringify(start)))
    return 0;
  if (JSON.stringify(start) === JSON.stringify(end)) return 1;
  visited.push(start);
  for (var i = 0; i < dirlen; ++i) {
    var d = dir[i];
    var X = start[0] + d[0],
      Y = start[1] + d[1];
    if (X >= 0 && X < m && Y >= 0 && Y < n && grid[X][Y] !== 1) {
      if (dfs([X, Y], end, grid, m, n, dirlen) === 1) {
        path.push(start);
        return 1;
      }
    }
  }
  return 0;
}

function manhatdist(p, e) {
  return Math.sqrt((p[0] - e[0]) ** 2 + (p[1] - e[1]) ** 2);
}

function dijkstras(start, end, grid, m, n, dirlen) {
  console.log("dijk");
  var mdist = {};
  var par = {};
  mdist[start] = manhatdist(start, end);
  var found = 0;
  visited.push(start);
  while (Object.keys(mdist).length > 0) {
    const minval = Math.min(...Object.values(mdist));
    var curr = Object.keys(mdist).find((e) => mdist[e] === minval);
    curr = curr
      .slice(0, curr.length)
      .split(",")
      .map((element) => {
        return Number(element);
      });
    delete mdist[curr];
    console.log(curr[0], curr[1]);
    for (var i = 0; i < dirlen; ++i) {
      var d = dir[i];
      var X = Number(curr[0]) + d[0],
        Y = Number(curr[1]) + d[1];
      if (X >= 0 && X < m && Y >= 0 && Y < n && grid[X][Y] !== 1) {
        if (visited.find((e) => JSON.stringify(e) === JSON.stringify([X, Y])))
          continue;
        par[[X, Y]] = curr;
        if (X === end[0] && Y === end[1]) {
          found = 1;
          break;
        }
        console.log("hola", X, Y);
        mdist[[X, Y]] = manhatdist([X, Y], end);
        visited.push([X, Y]);
      }
    }
    if (found === 1) break;
  }
  if (found === 1) {
    var curr = end;
    while (JSON.stringify(curr) !== JSON.stringify(start)) {
      path.push(curr);
      curr = par[curr];
    }
    path.push(curr);
  }
  return found;
}

function bfs(start, end, grid, m, n, dirlen) {
  var q = [start];
  var par = {};
  visited.push(start);
  var found = 0;
  while (q.length > 0) {
    var currelem = q.shift();
    for (var i = 0; i < dirlen; ++i) {
      var d = dir[i];
      var X = currelem[0] + d[0],
        Y = currelem[1] + d[1];
      if (X >= 0 && X < m && Y >= 0 && Y < n && grid[X][Y] !== 1) {
        if (visited.find((e) => JSON.stringify(e) === JSON.stringify([X, Y])))
          continue;
        par[[X, Y]] = currelem;
        if (X === end[0] && Y === end[1]) {
          found = 1;
          break;
        }
        q.push([X, Y]);
        visited.push([X, Y]);
      }
    }
    if (found === 1) break;
  }
  console.log("parentobject : ", par);
  if (found === 1) {
    var curr = end;
    while (JSON.stringify(curr) !== JSON.stringify(start)) {
      path.push(curr);
      curr = par[curr];
      console.log(curr);
    }
    path.push(curr);
  }
  console.log("path", path);
  return found;
}

function Dfs({
  start,
  end,
  grid,
  rows,
  cols,
  setVisited,
  setLogs,
  setRundfs,
  setPath,
  direction,
  algo,
}) {
  visited = [];
  path = [];
  setRundfs(false);
  if (start[0] === -1) {
    setLogs("No START block found! Please provide a START block!");
  } else if (end[0] === -1) {
    setLogs("No END block found! Please provide a END block!");
  } else {
    setLogs("Running Internal Algorithm...");
    if (algo === "DFS" && dfs(start, end, grid, rows, cols, direction) === 1) {
      setLogs("Algorithm Complete! Path Exists");
      setVisited(visited);
      setPath(path);
    } else if (
      algo === "BFS" &&
      bfs(start, end, grid, rows, cols, direction) === 1
    ) {
      setLogs("Algorithm Complete! Path Exists");
      setVisited(visited);
      setPath(path);
    } else if (
      algo === "DJK" &&
      dijkstras(start, end, grid, rows, cols, direction) === 1
    ) {
      setLogs("Algorithm Complete! Path Exists");
      setVisited(visited);
      setPath(path);
    } else {
      setLogs("Algorithm Complete! Path Doesn't Exist");
      console.log("NOT FOUND", visited);
    }
  }
}

export default Dfs;
