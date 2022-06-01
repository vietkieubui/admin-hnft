import {
    HomeOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import FoodTable from "./foodTable";

const { Sider, Content } = Layout;

const App = () => {
    const { logoutStore } = useContext(AuthContext);

    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout style={{ height: "100%" }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <Menu
                    style={{ marginTop: 20 }}
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    items={[
                        {
                            key: "1",
                            icon: <PlusOutlined />,
                            label: "Thêm món ăn",
                        },
                        {
                            key: "2",
                            icon: <HomeOutlined />,
                            label: "Cửa hàng",
                        },
                        {
                            key: "3",
                            icon: <MenuFoldOutlined />,
                            label: "Thu nhỏ",
                            onClick: () => setCollapsed(!collapsed),
                        },
                        {
                            key: "4",
                            icon: <LogoutOutlined />,
                            label: "Đăng xuất",
                            onClick: () => logoutStore(),
                        },
                    ]}
                />
                ;
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
                    <FoodTable />
                </Content>
            </Layout>
        </Layout>
    );
};

export default App;
