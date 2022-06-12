import React, { useState, useEffect, useRef } from "react";

function Dot() {
  const [input, setInput] = useState("");
  const [inputList, setInputList] = useState();
  const [cordinates, setCordinates] = useState({ x: "", y: "" });
  const [showDotComment, setShowDotComment] = useState(false);

  const dotStyles = {
    height: 10,
    width: 10,
    backgroundColor: "purple",
    borderRadius: 50,
    display: "inline-block",
    margin: 0,
  };
  const wholeComment = {
    position: "absolute",
    top: cordinates.y - 10,
    left: cordinates.x - 5,
  };

  const handleImageClick = (e) => {
    let offsetFromX = e.nativeEvent.offsetX;
    let offSetFromY = e.nativeEvent.offsetY;

    setCordinates({
      x: offsetFromX,
      y: offSetFromY,
    });

    setShowDotComment(true);
  };

  const submitHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const newInput = {
      id: Math.random() + 1,
      value: input,
    };
    setInputList([...inputList, newInput]);
    let point = {
      id: cordinates.x + cordinates.y,
      cX: cordinates.x,
      cY: cordinates.y,
      messages: inputList,
    };
    let points = JSON.parse(localStorage.getItem("points") || "[]");
    points.push(point);
    points && localStorage.setItem("points", JSON.stringify(points));
    setInput("");
  };
  // useEffect(() => {
  //   let point = {
  //     id: cordinates.x + cordinates.y,
  //     cX: cordinates.x,
  //     cY: cordinates.y,
  //     messages: inputList,
  //   };
  //   let points = JSON.parse(localStorage.getItem("points") || "[]");
  //   points.push(point);
  //   points && localStorage.setItem("points", JSON.stringify(points));
  //   // localStorage.setItem("points", JSON.stringify(point));
  // }, [inputList]);

  return (
    <div>
      <img
        src="https://images.unsplash.com/photo-1654032391221-6b6f3db198a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        alt="image"
        onClick={handleImageClick}
      />
      {/* showing the dot comment --------------------------*/}
      {showDotComment && (
        <div style={wholeComment}>
          <span
            style={dotStyles}
            className="dot"
            elementid={cordinates.x + cordinates.y}
          ></span>
          <div className="comment-body" style={{ backgroundColor: "#fff" }}>
            <form className="comment" onSubmit={(e) => submitHandler(e)}>
              <input
                type="text"
                placeholder="enter the message here"
                onChange={(e) => setInput(e.target.value)}
                value={input}
              />
              <button type="submit">Comment</button>
            </form>
            <ul>
              {inputList.map((item) => (
                <li>{item.value}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {/* showing dots */}
      {/* {dotList && dotList.map((singleDot) => singleDot.value)} */}
    </div>
  );
}

export default Dot;
