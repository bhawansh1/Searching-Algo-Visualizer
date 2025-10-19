function Guide() {
  return (
    <div style={{
        margin: "1rem 2rem",
    }}>
      <h1>Guide</h1>
      <hr></hr>
      <div style={{
        border: "1px solid grey",
        borderRadius: "5px",
        padding: "0.5rem 2rem",
      }}>
        <h3 style={{textDecoration: "underline"}}>Color coding</h3>
        <p><span style={{backgroundColor: "transparent"}}>TRANSPARENT</span> is for Walkable Surface</p>
        <p><span style={{backgroundColor: "grey"}}>GREY</span> is for Non-Walkable Surface</p>
        <p><span style={{backgroundColor: "brown"}}>BROWN</span> is for the Path</p>
        <p><span style={{backgroundColor: "skyblue"}}>SKYBLUE</span> is for Visited Notes</p>
        <p><span style={{backgroundColor: "green"}}>GREEN</span> is for Start Node</p>
        <p><span style={{backgroundColor: "red"}}>RED</span> is for End Node</p>
        <hr></hr>
        <h3 style={{textDecoration: "underline"}}>Blocks Ceration</h3>
        <p>
          You can create a block by either pressing{" "}
          <em>
            <b>Left-Click</b>
          </em>{" "}
          on the block or if you want to fast-paint consecutive blocks then you
          can use{" "}
          <em>
            <b>Left-Ctrl</b>
          </em>
          , keep pressing Ctrl(left) and hover over the block to paint it with
          unreachable blocks.
        </p>
        <hr></hr>
        <h3 style={{textDecoration: "underline"}}>Removing Blocks</h3>
        <p>
          If you made a mistake while painting a block, you can simple erase it
          by,{" "}
          <em>
            <b>Left-Alt</b>
          </em>{" "}
          key, you can keep presing Left-Alt key and left-click the blocks you
          want to turn back to normal.
        </p>
      </div>
    </div>
  );
}

export default Guide;
