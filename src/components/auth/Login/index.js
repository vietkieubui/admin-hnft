import React, { useState, useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Input, Form, Checkbox, Button, Col, Row } from "antd";
import { COLORS } from "./../../../assets/constants/index";

export default function Login() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, username, password, loginSuccess } =
    useContext(AuthContext);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [acc, setAcc] = useState({ user: "", pass: "" });

  const onHandleLogin = () => {
    navigate("/home");
  };

  return (
    <Row justify="center">
      <Col span={12}>
        <p style={{ textAlign: "center", fontSize: 20 }}>Login</p>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              style={{
                backgroundColor: COLORS.primary,
                borderRadius: "9px",
                width: "200px",
              }}
              type="primary"
              onClick={onHandleLogin}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
