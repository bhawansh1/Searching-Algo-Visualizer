import Box from "./Box";
import SearchAlgo from "../Algorithms/SearchAlgo";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function GridMaker({ rows, cols }) {
  const width = 30;
  const navigate = useNavigate();
  const [grid, setGrid] = useState(Array(rows).fill(Array(cols).fill(0)));
  const [selectval, setSelectval] = useState("block");
  var r = useRef(null);
  var refs = Array(rows).fill(Array(cols).fill(r));
  const [start, setStart] = useState([-1, -1]);
  const [end, setEnd] = useState([-1, -1]);
  const [rundfs, setRundfs] = useState(false);
  const colornames = ["normal", "block", "start", "end", "visited", "path"];
  const [visitedarray, setVisitedarray] = useState([]);
  const [path, setPath] = useState([]);
  const defaultlog = "Welcome to Search Algorithm Visualiser!";
  const [logs, setLogs] = useState(defaultlog);
  const [direction, setDirection] = useState(8);
  const [algo, setAlgo] = useState("DFS");
  const [simstart, setSimstart] = useState(false);

  const buttonstyle = {
    height: "2rem",
    margin: ".5rem",
    border: "none",
    backgroundColor: "#006abc",
    color: "white",
    borderRadius: "2px",
    transition: "all 0.5s ease-in-out",
  };

  useEffect(() => {
    var I = -1,
      J = -1;
    console.log(visitedarray, rundfs);
    if (visitedarray.length === 0 && grid) return;
    var countblocks = 0;
    var pst;
    const pathtrace = () => {
      ++J;
      if (J >= path.length) {
        clearInterval(pst);
        return;
      }
      if (
        JSON.stringify(path[J]) !== JSON.stringify(start) &&
        JSON.stringify(path[J]) !== JSON.stringify(end)
      )
        setGrid((prev) => {
          console.log("pathtrace", prev);
          return prev.map((row, i) => {
            return row.map((val, j) => {
              if (i === path[J][0] && j === path[J][1]) return 5;
              return val;
            });
          });
        });
    };
    var st = setInterval(() => {
      ++I;
      if (I >= visitedarray.length) {
        clearInterval(st);
        console.log("Path received", path);
        pst = setInterval(pathtrace, 10);
        return;
      }
      if (
        JSON.stringify(visitedarray[I]) !== JSON.stringify(start) &&
        JSON.stringify(visitedarray[I]) !== JSON.stringify(end)
      )
        setGrid((prev) => {
          console.log(prev);
          return prev.map((row, i) => {
            return row.map((val, j) => {
              if (i === visitedarray[I][0] && j === visitedarray[I][1])
                return 4;
              if (val === 1) ++countblocks;
              return val;
            });
          });
        });
    }, 15);
    var boxesvisperc =
      (visitedarray.length * 100) / (rows * cols - countblocks - 1);
    var redundantblocks =
      ((visitedarray.length - path.length + 1) * 100) / visitedarray.length;
    setLogs(
      "The number of blocks visited to find the end is : " +
        boxesvisperc.toFixed(2) +
        "%.   The number of redundant blocks(visited but not considered in path is : " +
        redundantblocks.toFixed(2) +
        "%."
    );
  }, [visitedarray]);

  const resetvisited = (e) => {
    setVisitedarray([]);
    setGrid((prev) => {
      return prev.map((row, i) => {
        return row.map((val, j) => {
          if (val === 4 || val === 5) return 0;
          return val;
        });
      });
    });
  };

  return (
    <div style={{ margin: "0"}}>
      <div style={{ 
          backgroundColor: "#333" ,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          padding: "0.5rem",
          gap: "0.5rem"
        }}>
        <h3 style={{ 
          margin: "0", 
          marginLeft: "0.5rem", 
          color: "white" , 
          textAlign:"center", 
          fontSize:"3rem", 
          width: "100%", 
          textShadow: "2px 2px 4px rgba(0,0,0,0.5)"
        }}>
          Search Algorithm Visualisation
        </h3>
    
        <select
          style={buttonstyle}
          value={selectval}
          onChange={(e) => {
            setSelectval(e.target.value);
          }}
          title="Select block to paint on graph"
        >
          <option value="block">Block</option>
          <option value="start">Start</option>
          <option value="end">End</option>
        </select>
        <select
          title="Select Algorithm to find path"
          style={buttonstyle}
          value={algo}
          onChange={(e) => {
            setAlgo(e.target.value);
          }}
        >
          <option value="DFS">Depth First Search</option>
          <option value="BFS">Breadth First Search</option>
          <option value="DJK">Dijkstra's Single Source Shortest Path(Manhattan Distance as cost)</option>
        </select>
        <select
          title="Determine whether the start block can move in 4 or 8 directions"
          style={buttonstyle}
          value={direction}
          onChange={(e) => {
            setDirection(e.target.value);
          }}
        >
          <option value={4}>4-directional movement</option>
          <option value={8}>8-directional movement</option>
        </select>
        <button
          style={buttonstyle}
          onClick={(e) => {
            resetvisited();
          }}
          title="Removes blue and red blocks and makes the grid ready for another simulation"
        >
          Remove Visited
        </button>
        <button
          style={buttonstyle}
          title="Removes everything from the grid, for making a fresh graph"
          onClick={(e) => {
            window.location.reload();
          }}
        >
          Reset
        </button>
        <button
          style={buttonstyle}
          onClick={(e) => {
            setRundfs((prev) => !prev);
          }}
          title="Starts the simulation"
        >
          Start Simulation
        </button>
        <button
          style={buttonstyle}
          onClick={(e) => {
            navigate("/guide");
          }}
          title="Access the guide"
        >
          Help
        </button>
      </div>
      <div style={{ marginTop: "0.125rem"}}>
        {grid &&
          grid.map((item, i) => {
            return (
              <div style={{ display: "flex"}}>
                {item.map((b, j) => {
                  return (
                    <Box
                      setStart={setStart}
                      setEnd={setEnd}
                      setGrid={setGrid}
                      colorcode={colornames[b]}
                      selectval={selectval}
                      i={i}
                      j={j}
                      reference={refs[i][j]}
                      width={width}
                      height={width}
                      start={start}
                      end={end}
                    />
                  );
                })}
              </div>
            );
          })}
      </div>
      {rundfs && (
        <SearchAlgo
          setRundfs={setRundfs}
          grid={grid}
          setLogs={setLogs}
          start={start}
          end={end}
          rows={rows}
          cols={cols}
          setVisited={setVisitedarray}
          setPath={setPath}
          direction={direction}
          algo={algo}
        />
      )}
      <textarea
        style={{ 
          margin: "10px auto",
          textAlign: "center",
          textSize: "2rem",
          backgroundColor: "#333",
          color: "white",
          border: "none",
          resize: "none",
          display: "block",
          borderRadius:"20px"
        }}
        value={logs}
        rows={2}
        cols={150}
      ></textarea>
    </div>
  );
}

export default GridMaker;
