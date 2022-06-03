import React from "react";
import { Nav } from "react-bootstrap";

const Sidebar = () => {
  return (
    <>
      <Nav
        className="col-md-12 d-none d-md-block bg-light sidebar"
        activeKey="/home"
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      >
        <div className="sidebar-sticky"></div>
        <Nav.Item>
          <Nav.Link href="/home">Darboard</Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
};

export default Sidebar;
