import {
    ArrowsAltOutlined,
    BarChartOutlined,
    ContainerOutlined,
    HomeOutlined,
    LogoutOutlined,
    PlusOutlined,
    ShoppingOutlined,
    ShrinkOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useContext, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Foods from "./Content/Foods";
import Order from "./Content/Order";
import Statistic from "./Content/Statistic";
import Store from "./Content/Store";

const { Sider, Content } = Layout;

const App = () => {
    const navigate = useNavigate();
    const { logoutStore } = useContext(AuthContext);
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout style={{ height: "100%", minHeight: "100vh" }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <Menu
                    style={{ marginTop: 20 }}
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    items={[
                        {
                            key: "1",
                            icon: <HomeOutlined />,
                            label: "Cửa hàng",
                            onClick: () => navigate("store"),
                        },
                        {
                            key: "2",
                            icon: <ContainerOutlined />,
                            label: "Món ăn",
                            onClick: () => navigate("food"),
                        },

                        {
                            key: "3",
                            icon: <ShoppingOutlined />,
                            label: "Đơn hàng",
                            onClick: () => navigate("order"),
                        },
                        {
                            key: "4",
                            icon: <BarChartOutlined />,
                            label: "Thống kê",
                            onClick: () => navigate("statistic"),
                        },
                        {
                            key: "5",
                            icon: !collapsed ? (
                                <ShrinkOutlined />
                            ) : (
                                <ArrowsAltOutlined />
                            ),
                            label: !collapsed ? "Thu nhỏ" : "Mở rộng",
                            onClick: () => setCollapsed(!collapsed),
                        },
                        {
                            key: "6",
                            icon: <LogoutOutlined />,
                            label: "Đăng xuất",
                            onClick: () => logoutStore(),
                        },
                    ]}
                />
            </Sider>
            <Layout className="site-layout">
                <Content
                    className="site-layout-background"
                    style={{
                        margin: 10,
                        padding: 10,
                        minHeight: 280,
                    }}
                >
                    {/* {content} */}
                    <Routes>
                        <Route path="/" element={<Navigate to="store" />} />
                        <Route path="/store" element={<Store />} />
                        <Route path="/food" element={<Foods />} />
                        <Route path="/order" element={<Order />} />
                        <Route path="/statistic" element={<Statistic />} />
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    );
};

export default App;
