import React from "react";
import { Popover, Button, OverlayTrigger } from "react-bootstrap";
function NewButton() {
  // const popoverRight = (
  //   <Popover
  //     id="popover-positioned-right"
  //     title="Popover right"
  //     className="p-3"
  //   >
  //     ffffffffffffffffffffffffff.
  //   </Popover>
  // );
  const popover = () => {
    <div style={{ height: 120 }}>
      <Popover
        id="popover-basic"
        placement="right"
        positionLeft={300}
        positionTop={50}
        title="Popover right"
      >
        And here's some <strong>amazing</strong> content. It's very engaging.
        right?
      </Popover>
    </div>;
  };

  return (
    <>
      {/* <OverlayTrigger trigger="click" placement="right" overlay={popoverRight}>
        <span className="btn">Click me</span>
      </OverlayTrigger> */}
      <button onClick={popover}>click</button>;
    </>
  );
}

export default NewButton;
