import React, { useEffect, useState } from "react";

import { Nav } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";

function TabContents() {
  let [clickTab, clickTabChange] = useState(0);
  let [tabSwitch, tabSwitchChange] = useState(false);
  return (
    <div>
      <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link
            eventKey="link-0"
            onClick={() => {
              clickTabChange(0);
            }}
          >
            Active
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-1"
            onClick={() => {
              clickTabChange(1);
            }}
          >
            Option 2
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-2"
            onClick={() => {
              tabSwitchChange(false);
              clickTabChange(2);
            }}
          >
            Option 2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <CSSTransition in={tabSwitch} className="tabAnimation" timeout={500}>
        <TabContent clickTab={clickTab} tabSwitchChange={tabSwitchChange} />
      </CSSTransition>
    </div>
  );
}
function TabContent(props) {
  useEffect(() => {
    props.tabSwitchChange(true);
  });
  if (props.clicktab === 0) {
    return <div>0번째 내용</div>;
  } else if (props.clicktab === 1) {
    <div>1번째 내용</div>;
  } else {
    <div>2번째 내용</div>;
  }
}

export default TabContents;
