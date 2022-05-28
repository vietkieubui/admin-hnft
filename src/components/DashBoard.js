import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Col, Row } from "antd";
import { COLORS, images } from "./../assets/constants";
import Sidebar from "./sidebar";
import FoodTable from "./foodTable";

export default function DashBoard() {
  return (
    <div className="wrapper">
      <Navbar bg="dark" variant="dark" style={{ color: COLORS.primary }} c>
        <Container>
          <Navbar.Brand href="/home">ADMIN</Navbar.Brand>
          <Navbar.Collapse
            id="navbar-dark-example"
            className="justify-content-end"
          >
            <Nav>
              <NavDropdown
                id="nav-dropdown-dark-example"
                title="UserName"
                menuVariant="dark"
                className="FaUserAlt"
              >
                <NavDropdown.Item href="#action/3.2">
                  Change Infomation
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Change Password
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Row>
        <Col span={4}>
          <Sidebar />
        </Col>
        <Col span={20}>
          <div>
            <FoodTable />
          </div>
        </Col>
      </Row>
    </div>
  );
}
