import { UserOutlined } from "@ant-design/icons";
import {
    Alert,
    Avatar,
    Button,
    Col,
    Form,
    Input,
    Row,
    Select,
    TimePicker,
} from "antd";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function Store() {
    const {
        authState: { store },
        updateStore,
    } = useContext(AuthContext);

    // console.log(store);
    // Local state
    const [updateForm, setUpdateForm] = useState({
        ...store,
    });

    const onChangeUpdateForm = (event) => {
        // console.log(event);
        event.target
            ? setUpdateForm({
                  ...updateForm,
                  [event.target.name]: event.target.value,
              })
            : setUpdateForm({
                  ...updateForm,
                  categories: event,
              });
    };

    const { phone, name, address, categories } = updateForm;

    const [alert, setAlert] = useState(null);

    const handleUpdateStore = async () => {
        // console.log(updateForm);
        try {
            const updateData = await updateStore(updateForm);
            setAlert({
                type: updateData.success ? "success" : "error",
                message: updateData.message,
            });
            setTimeout(() => setAlert(null), 3000);

            // console.log(updateData);
        } catch (error) {
            console.log(error);
        }
    };

    const categoriesData = [
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

    return (
        <Row>
            {alert ? (
                <div style={{ position: "absolute", top: 20, right: 0 }}>
                    <Alert {...alert} showIcon />
                </div>
            ) : null}

            <Col span={12} offset={6}>
                <Row justify="center">
                    <Avatar
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: 20,
                        }}
                        size={100}
                        icon={<UserOutlined />}
                    />
                </Row>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{
                        remember: true,
                        phone: store.phone,
                        name: store.name,
                        address: store.address,
                        categories: store.categories,
                    }}
                    autoComplete="off"
                    onFinish={handleUpdateStore}
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
                        onChange={onChangeUpdateForm}
                    >
                        <Input name="phone" />
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
                        onChange={onChangeUpdateForm}
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
                        onChange={onChangeUpdateForm}
                    >
                        <Input name="address" />
                    </Form.Item>

                    <Form.Item
                        label="Thời gian mở cửa"
                        name="timeOpen"
                        // rules={[
                        //     {
                        //         required: true,
                        //         message: "Vui lòng chọn thời gian mở cửa",
                        //     },
                        // ]}
                    >
                        <TimePicker.RangePicker />
                    </Form.Item>

                    <Form.Item
                        label="Danh mục sản phẩm"
                        name="categories"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng chọn danh mục sản phẩm",
                            },
                        ]}
                    >
                        <Select
                            mode="multiple"
                            allowClear
                            placeholder="Chọn danh mục sản phẩm"
                            value={categories}
                            onChange={onChangeUpdateForm}
                        >
                            {categoriesData.map((item) => (
                                <Select.Option key={item.id} value={item.name}>
                                    {item.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Lưu thay đổi
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
}

export default Store;