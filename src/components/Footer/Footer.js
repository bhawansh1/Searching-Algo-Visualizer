function Footer() {
  var containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#333741",
    color: "#ccc",
  };

  var innerContainer = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  return (
    <div style={containerStyle}>
      <div>
        <h3>Build By Bhawansh Singh</h3>
      </div>
      <div style={innerContainer}>
        <h4>Contact : &nbsp;</h4>
        <h4>bhawanshsingh1@gmail.com&nbsp;</h4>
      </div>
    </div>
  );
}

export default Footer;
