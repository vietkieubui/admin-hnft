import { Col, Row } from "antd";
import React, { useContext } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { COLORS } from "./../assets/constants";
import FoodTable from "./Content/foodTable";
import Sidebar from "./sidebar";

export default function DashBoard() {
    const { logoutUser } = useContext(AuthContext);

    const logout = () => logoutUser();

    return (
        <div className="wrapper">
            <Navbar bg="dark" variant="dark" style={{ color: COLORS.primary }}>
                <Container>
                    <Navbar.Brand href="/home">QUẢN LÝ CỬA HÀNG</Navbar.Brand>
                    <Navbar.Collapse
                        id="navbar-dark-example"
                        className="justify-content-end"
                    >
                        <Nav>
                            <NavDropdown
                                id="nav-dropdown-dark-example"
                                title="Tùy chọn"
                                menuVariant="dark"
                                className="FaUserAlt"
                            >
                                <NavDropdown.Item href="#action/3.2">
                                    Chỉnh sửa thông tin
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">
                                    Thay đổi mật khẩu
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item
                                    href="#action/3.4"
                                    onClick={logout}
                                >
                                    Đăng xuất
                                </NavDropdown.Item>
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
