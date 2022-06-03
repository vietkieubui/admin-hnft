import { Button, Col, Form, Input, Row, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { COLORS } from "./../../../assets/constants/index";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { Alert } from "antd";

export default function Register() {
    const navigate = useNavigate();

    // Context
    const { registerStore } = useContext(AuthContext);

    // Local state
    const [registerForm, setRegisterForm] = useState({
        phone: "",
        password: "",
        confirmPassword: "",
        name: "",
        address: "",
        listCate: [],
        avatar: "",
        foods: [],
    });

    const onChangeRegisterForm = (event) => {
        // console.log(event);
        event.target
            ? setRegisterForm({
                  ...registerForm,
                  [event.target.name]: event.target.value,
              })
            : setRegisterForm({
                  ...registerForm,
                  listCate: event,
              });
    };

    const { phone, password, confirmPassword, name, address, listCate } =
        registerForm;

    const [alert, setAlert] = useState(null);

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            setAlert({
                type: "error",
                message: "Mật khẩu và mật khẩu xác nhận không giống nhau",
            });
            setTimeout(() => setAlert(null), 3000);
        } else {
            try {
                const registerData = await registerStore(registerForm);
                if (!registerData.success) {
                    setAlert({ type: "error", message: registerData.message });
                    setTimeout(() => setAlert(null), 3000);
                }
                console.log(registerData);
            } catch (error) {
                console.log(error);
            }
        }
    };

    // console.log(registerForm);
    // console.log(listCate);

    return (
        <>
            <Row justify="center" align="middle" style={{ height: "100vh" }}>
                {alert ? (
                    <div
                        style={{
                            position: "absolute",
                            top: 20,
                            right: 0,
                            zIndex: 999,
                        }}
                    >
                        <Alert {...alert} showIcon />
                    </div>
                ) : null}
                <Col span={10}>
                    <p style={{ textAlign: "center", fontSize: 24 }}>
                        Đăng ký cửa hàng
                    </p>
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        autoComplete="off"
                        onFinish={handleRegister}
                    >
                        <Form.Item
                            name="phone"
                            label="SĐT"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập Số điện thoại",
                                },
                            ]}
                            value={phone}
                            onChange={onChangeRegisterForm}
                        >
                            <Input name="phone" />
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập mật khẩu",
                                },
                            ]}
                            value={password}
                            onChange={onChangeRegisterForm}
                        >
                            <Input.Password name="password" />
                        </Form.Item>
                        <Form.Item
                            label="Xác nhận mật khẩu"
                            name="confirmPassword"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập mật khẩu",
                                },
                            ]}
                            value={confirmPassword}
                            onChange={onChangeRegisterForm}
                        >
                            <Input.Password name="confirmPassword" />
                        </Form.Item>
                        <Form.Item
                            label="Tên cửa hàng"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập tên cửa hàng",
                                },
                            ]}
                            value={name}
                            onChange={onChangeRegisterForm}
                        >
                            <Input name="name" />
                        </Form.Item>
                        <Form.Item
                            label="Địa chỉ"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập địa chỉ ",
                                },
                            ]}
                            value={address}
                            onChange={onChangeRegisterForm}
                        >
                            <Input name="address" />
                        </Form.Item>
                        <Form.Item
                            label="Danh mục sản phẩm"
                            name="listCate"
                            rules={[
                                {
                                    required: false,
                                },
                            ]}
                        >
                            <Select
                                mode="multiple"
                                allowClear
                                placeholder="Chọn danh mục sản phẩm"
                                value={listCate}
                                onChange={onChangeRegisterForm}
                            >
                                {categories.map((item) => (
                                    <Select.Option
                                        key={item.id}
                                        value={item.name}
                                    >
                                        {item.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button
                                type="link"
                                htmlType="button"
                                onClick={() => navigate("/login")}
                            >
                                Đã có tài khoản
                            </Button>

                            <Button
                                style={{
                                    backgroundColor: COLORS.primary,
                                    borderRadius: "4px",
                                    border: "none",
                                    // width: "200px",
                                }}
                                type="primary"
                                htmlType="submit"
                            >
                                Đăng ký
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </>
    );
}

const categories = [
    {
        id: "fa6376a2-11f4-56e0-8c6d-5fe9740efe98",
        name: "Bún",
        // img: images.bun,
        des: "description of bun",
    },
    {
        id: "81ac1d5d-2138-59ae-bf32-3116306f4c73",
        name: "Phở",
        // img: images.pho,
        des: "description of pho",
    },
    {
        id: "2a67628a-cbd0-57ba-a753-6cf67d519775",
        name: "Chè",
        // img: images.che,
        des: "description of che",
    },
    {
        id: "ce203842-dbf8-5862-9222-b1192dcee547",
        name: "Cháo",
        // img: images.chao,
        des: "description of chao",
    },

    {
        id: "53360cc8-804b-574e-9dad-a5a498312068",
        name: "Xôi",
        // img: images.xoi,
        des: "description of xoi",
    },
    {
        id: "525a739b-6425-5815-9adb-c930f4c3603a",
        name: "Cốm",
        // img: images.com,
        des: "description of com",
    },
    {
        id: "f192064b-9b2f-525a-8f5a-b50634168ce8",
        name: "Bánh cuốn",
        // img: images.banhcuon,
        des: "description of banh cuon",
    },
    {
        id: "61f640fd-da82-597d-b397-426f4eefa34c",
        name: "Caffe",
        // img: images.cafe,
        des: "description of caffe",
    },
    {
        id: "68169056-3a26-5313-b95c-c53cfd5d69b5",
        name: "Bánh tôm",
        // img: images.banhtom,
        des: "description of banh tom",
    },
    {
        id: "7e5bedfd-886c-56c1-b1b2-07ecc6b478bd",
        name: "Kem",
        // img: images.kem,
        des: "description of kem",
    },
    {
        id: "53f46591-c4df-5acb-8a20-564d7ea37e47",
        name: "Chả cá",
        // img: images.chaca,
        des: "description of cha ca",
    },
];