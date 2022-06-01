import { Button, Col, Form, Input, Row } from "antd";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { COLORS } from "./../../../assets/constants/index";
import { Alert } from "antd";

export default function Login() {
    const navigate = useNavigate();

    // const { isLoggedIn, setIsLoggedIn, phone, password, loginSuccess } =
    //     useContext(AuthContext);
    // const [user, setUser] = useState("");
    // const [pass, setPass] = useState("");
    // const [acc, setAcc] = useState({ user: "", pass: "" });

    // Context
    const { loginUser } = useContext(AuthContext);

    // Local state
    const [loginForm, setLoginForm] = useState({
        phone: "",
        password: "",
    });

    const onChangeLoginForm = (event) =>
        setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

    const { phone, password } = loginForm;

    const [alert, setAlert] = useState(null);

    const handleLogin = async () => {
        try {
            const loginData = await loginUser(loginForm);
            if (!loginData.success) {
                setAlert({ type: "error", message: loginData.message });
                setTimeout(() => setAlert(null), 3000);
            }
            console.log(loginData);
        } catch (error) {
            console.log(error);
        }
    };

    // console.log(loginForm);

    return (
        <Row justify="center" align="middle" style={{ height: "100vh" }}>
            {alert ? (
                <div style={{ position: "absolute", top: 20, right: 0 }}>
                    <Alert {...alert} showIcon />
                </div>
            ) : null}

            <Col span={8}>
                <p style={{ textAlign: "center", fontSize: 24 }}>Đăng nhập</p>

                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    // initialValues={{ remember: true }}
                    autoComplete="off"
                    onFinish={handleLogin}
                >
                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập SĐT!",
                            },
                        ]}
                        value={phone}
                        onChange={onChangeLoginForm}
                    >
                        <Input name="phone" />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập mật khẩu!",
                            },
                        ]}
                        value={password}
                        onChange={onChangeLoginForm}
                    >
                        <Input.Password name="password" />
                    </Form.Item>

                    {/* <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{ offset: 8, span: 16 }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item> */}

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button
                            type="link"
                            htmlType="button"
                            onClick={() => navigate("/register")}
                        >
                            Đăng ký cửa hàng mới
                        </Button>

                        <Button
                            style={{
                                backgroundColor: COLORS.primary,
                                borderRadius: "4px",
                                width: "100px",
                                border: "none",
                            }}
                            type="primary"
                            htmlType="submit"
                            // onClick={handleLogin}
                        >
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
}
