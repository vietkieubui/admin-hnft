import React, { useState } from "react";
import { Input, Form, Checkbox, Button, Row, Col, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { COLORS } from "./../../../assets/constants/index";

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [categoriesList, setCategoriesList] = useState([]);
  console.log({
    username,
    password,
    repassword,
    name,
    address,
    categoriesList,
  });

  const onHandleRegister = () => {
    // navigate("/home");
  };
  return (
    <>
      <Row justify="center">
        <Col span={12}>
          <p style={{ textAlign: "center", fontSize: 20 }}>Register</p>
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
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="repassword"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                value={repassword}
                onChange={(e) => setRepassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Please input name of your store!" },
              ]}
            >
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please input address of your store! ",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Categories"
              name="categories"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Select
                mode="multiple"
                allowClear
                placeholder="Select categories"
                value={categoriesList}
                onChange={(value) => setCategoriesList(value)}
              >
                {categories.map((item) => (
                  <Select.Option key={item.id} value={item.name}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                style={{
                  backgroundColor: COLORS.primary,
                  borderRadius: "9px",
                  width: "200px",
                }}
                type="primary"
                onClick={onHandleRegister}
                htmlType="submit"
              >
                Register
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
