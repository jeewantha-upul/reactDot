import React from "react";
import { useState, useEffect, useRef } from "react";
import { Popover } from "@mui/material";
import { Form, Button, ListGroup } from "react-bootstrap";

function ImagetWO() {
  //input messages
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  //  cordinate of the clicked point relative to window
  const [cordinates, setCordinates] = useState("");
  //anchors for popups
  const [anchor, setAnchor] = useState(null);
  const [messageAnchor, setMessageAnchor] = useState(null);
  // html elements created for dots
  const [dotPoints, setDotPoints] = useState([]);

  const [showDotPoints, setShowDotPoints] = useState(true);

  //related to  retrived data
  // const [retriveCordinates, setRetriveCordinates] = useState({
  //   rX: null,
  //   rY: null,
  // });
  const [retrivedMessage, setRetrivedMessage] = useState();
  const [retrievedAllPointData, setRetrievedAllPointData] = useState(() =>
    JSON.parse(localStorage.getItem("storingPoints") || null)
  );

  useEffect(() => {
    let singleMessage = {
      mId: Math.random() + 2,
      value: message,
    };
    setMessageList([...messageList, singleMessage]);
  }, [message]);

  // ------------------ related to dot -------------- start --------------------
  const createDotPoint = () => {
    let dotHeight = 10;
    let dotWidth = 10;
    const styles = {
      height: dotHeight,
      width: dotWidth,
      backgroundColor: "purple",
      borderRadius: 50,
      display: "inline-block",
      position: "absolute",
      top: cordinates.y - (dotHeight - 5),
      left: cordinates.x - (dotWidth - 5),
    };

    const newDot = React.createElement("span", {
      style: styles,
      elementid: cordinates.x + cordinates.y,
      onClick: (e) => getMessageHandler(e),
    });
    setDotPoints([...dotPoints, newDot]);
  };

  useEffect(() => {
    createDotPoint();
  }, [cordinates.x, cordinates.y]);
  //--------------------------------------------------------- end -----------------------------
  const openPopover = (e) => {
    setRetrivedMessage("");
    // setRetriveCordinates({ rX: null, rY: null });
    setCordinates({
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    });

    // opening the popup
    setAnchor(e.currentTarget);
  };

  // --------------------------------------------  handling the form values
  const formSubmitHandler = (e) => {
    e.preventDefault();

    //if values presesnts,get them, othervise initialise to an array
    let storingPoints = JSON.parse(
      localStorage.getItem("storingPoints") || "[]"
    );
    let storeSinglePoint = {
      pointId: cordinates.x + cordinates.y,
      pointX: cordinates.x,
      pointY: cordinates.y,
      messages: messageList,
    };
    storingPoints.length > 0
      ? update_function(storingPoints, storeSinglePoint)
      : storingPoints.push(storeSinglePoint);
    localStorage.setItem("storingPoints", JSON.stringify(storingPoints));
    setMessageList([]);
    setAnchor(null);

    // let storeSinglePoint;

    // storingPoints &&
    //   storingPoints.map((onePoint) => {
    //     if (onePoint.pointId == cordinates.x + cordinates.y) {
    //       storeSinglePoint = {
    //         ...storeSinglePoint,
    //         messages: messageList,
    //       };
    //       // storingPoints.push(storeSinglePoint);
    //       // localStorage.setItem("storingPoints", JSON.stringify(storingPoints));
    //     } else {
    //       storeSinglePoint = {
    //         pointId: cordinates.x + cordinates.y,
    //         pointX: cordinates.x,
    //         pointY: cordinates.y,
    //         messages: messageList,
    //       };
    //       // storingPoints.push(storeSinglePoint);
    //       // localStorage.setItem("storingPoints", JSON.stringify(storingPoints));
    //     }
    //     storingPoints.push(storeSinglePoint);
    //     localStorage.setItem("storingPoints", JSON.stringify(storingPoints));
    //   });
  };
  const update_function = (storingPoints, storeSinglePoint) => {
    const found = storingPoints.find((single_point) => {
      const data = single_point.pointId == storeSinglePoint.pointId;
      console.log(storeSinglePoint.messages);
      if (data) {
        single_point.messages.push(messageList[0]);
        return true;
      } else {
        return false;
      }
    });
    console.log(found);
    if (!found) {
      storingPoints.push(storeSinglePoint);
      localStorage.setItem("storingPoints", JSON.stringify(storingPoints));
      setMessageList([]);
      setAnchor(null);
    }
  };

  // getting the point message when clicked the point
  const getMessageHandler = (e) => {
    setRetrivedMessage("");
    // setRetriveCordinates({ rX: null, rY: null });
    let clickedPoint = e.target.getAttribute("elementid");
    //getting data from local storage
    let items = localStorage.getItem("storingPoints");
    let getItems = JSON.parse(items);
    getItems.map((item) => {
      if (item.pointId == clickedPoint) {
        // setRetriveCordinates({ rX: item.pointX, rY: item.pointY });
        setRetrivedMessage(item.messages);
        setCordinates({
          x: item.pointX,
          y: item.pointY,
        });

        // opening the popup
        setAnchor(e.currentTarget);
      }
    });
  };

  return (
    <>
      <div>
        <div style={{ position: "relative" }}>
          <img
            src="https://images.unsplash.com/photo-1653216977228-5669df1fc892?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171"
            alt="image"
            onClick={(e) => openPopover(e)}
          />
        </div>{" "}
        {/* ------------------------ */}
        <Popover
          className="pop"
          open={Boolean(anchor)}
          anchorReference="anchorPosition"
          anchorPosition={{ top: cordinates.y, left: cordinates.x }}
          anchorEl={anchor}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          onClose={() => setAnchor(null)}
        >
          {/* entered message */}
          <Form onSubmit={formSubmitHandler}>
            <Form.Group className="m-3" controlId="formBasicEmail">
              <Form.Label>Type Here...</Form.Label>
              <Form.Control
                className="p-1"
                type="text"
                placeholder=""
                onChange={(e) => setMessage(e.target.value)}
              />
            </Form.Group>

            <Button className="m-2 p-2" variant="text" type="submit">
              Add comment
            </Button>
            {retrivedMessage && (
              <div style={{ padding: "10px" }}>
                {retrivedMessage.map((single) => (
                  <ul>
                    <li>{single.value}</li>
                  </ul>
                ))}
              </div>
            )}
          </Form>
        </Popover>
      </div>

      {/* related to getting the message */}
      {/* <Popover
        m={3}
        className="pop p-3"
        open={Boolean(messageAnchor)}
        anchorReference="anchorPosition"
        anchorPosition={{
          top: retriveCordinates.rY,
          left: retriveCordinates.rX,
        }}
        anchorEl={messageAnchor}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        onClose={() => setMessageAnchor(null)}
      > */}
      {/* <Form onSubmit={formSubmitHandler}>
          <Form.Group className="m-3" controlId="formBasicEmail">
            <Form.Label>Type Here...</Form.Label>
            <Form.Control
              className="p-1"
              type="text"
              placeholder=""
              onChange={(e) => setMessage(e.target.value)}
            />
          </Form.Group>

          <Button className="m-2 p-2" variant="text" type="submit">
            Add comment
          </Button>
        </Form> */}

      {/* entered message */}
      {/* <ul style={{ padding: 10, paddingLeft: 20, listStyle: "none" }}>
          {retrivedMessage.map((singleMessage) => (
            <li>{singleMessage}</li>
          ))}
        </ul> */}
      {/* {<div style={{ padding: "10px" }}>{retrivedMessage}</div>} */}
      {/* for inputting next comment */}
      {/* </Popover> */}

      {/* ---------------------------- showing points ---------------*/}
      {showDotPoints && dotPoints.map((dotPoint) => dotPoint)}

      {/* show hide dots */}
    </>
  );
}

export default ImagetWO;
