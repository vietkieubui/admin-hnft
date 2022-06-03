import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {
    Button,
    Form,
    Image,
    Input,
    Modal,
    Radio,
    Space,
    Table,
    Tag,
    Upload,
} from "antd";
import React, { useState } from "react";
// import { Modal } from "react-bootstrap";

export default function FoodTable() {
    const [dataAddForm, setDataAddForm] = useState({ name: "", price: "" });
    const [dataEditForm, setDataEditForm] = useState({});
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [loading, setLoading] = useState(false);

    const handleUpdateFood = () => {
        //call API
        console.log(dataEditForm);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setShowEditModal(false);
        }, 2000);
    };

    const handleAddFood = () => {
        //call API
        console.log(dataAddForm);

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setShowAddModal(false);
        }, 2000);
    };

    const handleDeleteFood = (foodId) => {
        //call API
        console.log(foodId);
    };

    const handleShowEditModal = (item) => {
        console.log(item);
        setDataEditForm(item);
        setShowEditModal(true);
    };

    const normFile = (e) => {
        console.log("Upload event:", e);

        if (Array.isArray(e)) {
            return e;
        }

        return e?.fileList;
    };

    const data = [
        {
            key: "44",
            id: "47134823195234",
            name: "bun cha 1",
            image: "https://delightfulplate.com/wp-content/uploads/2018/08/Vietnamese-Grilled-Pork-Meatballs-with-Vermicelli-Noodles-Bun-Cha-2.jpg",
            price: 30000,
            status: false,
        },
        {
            key: "28",
            id: "47134823195235",
            name: "bun cha 2",
            image: "https://delightfulplate.com/wp-content/uploads/2018/08/Vietnamese-Grilled-Pork-Meatballs-with-Vermicelli-Noodles-Bun-Cha-2.jpg",
            price: 40000,
            status: true,
        },
        {
            key: "53",
            id: "47134823195233",
            name: "bun cha 3",
            image: "https://delightfulplate.com/wp-content/uploads/2018/08/Vietnamese-Grilled-Pork-Meatballs-with-Vermicelli-Noodles-Bun-Cha-2.jpg",
            price: 30000,
            status: true,
        },
        {
            key: "86",
            id: "47134823195231",
            name: "bun cha4",
            image: "https://delightfulplate.com/wp-content/uploads/2018/08/Vietnamese-Grilled-Pork-Meatballs-with-Vermicelli-Noodles-Bun-Cha-2.jpg",
            price: 30000,
            status: true,
        },
    ];

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Tên món",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Hình ảnh",
            dataIndex: "image",
            key: "image",
            width: 100,
            render: (_, { image }) => <Image width={100} src={image} />,
        },
        {
            title: "Giá (VNĐ)",
            dataIndex: "price",
            key: "price",
            render: (_, { price }) =>
                new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                }).format(price),
        },
        {
            title: "Trạng thái",
            key: "status",
            dataIndex: "status",
            width: 100,
            render: (_, { status }) => {
                let tag = "HẾT HÀNG";
                let color = "volcano";
                if (status) {
                    tag = "CÒN HÀNG";
                    color = "green";
                }
                return (
                    <Tag color={color} key={tag}>
                        {tag}
                    </Tag>
                );
            },
        },
        {
            title: "Tùy chọn",
            key: "action",
            width: 150,
            render: (record) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        onClick={() => {
                            handleShowEditModal(record);
                        }}
                    >
                        Sửa
                    </Button>
                    <Button
                        type="primary"
                        danger
                        onClick={() => handleDeleteFood(record.id)}
                    >
                        Xóa
                    </Button>
                </Space>
            ),
        },
    ];

    // console.log(dataEditForm);

    return (
        <div style={{ paddingBottom: 30 }}>
            {/* add btn */}
            <div
                style={{
                    position: "fixed",
                    bottom: 16,
                    right: 20,
                    zIndex: 999,
                }}
            >
                <Button
                    className="add_btn"
                    style={{
                        display: "flex",
                        paddingLeft: 10,
                        paddingRight: 10,
                        paddingTop: 20,
                        paddingBottom: 20,
                        borderRadius: 50,
                        alignItems: "center",
                    }}
                    type="primary"
                    onClick={() => setShowAddModal(true)}
                >
                    <PlusOutlined style={{ fontSize: 20 }} />
                </Button>
            </div>

            {/* add modal */}
            <Modal
                visible={showAddModal}
                title="Thêm món ăn"
                // transitionName="zoom"
                // maskTransitionName="zoom"
                onCancel={() => setShowAddModal(false)}
                footer={[
                    <Button key="back" onClick={() => setShowAddModal(false)}>
                        Đóng
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        loading={loading}
                        onClick={handleAddFood}
                    >
                        Thêm món
                    </Button>,
                ]}
            >
                <Form
                    name="basic"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                >
                    <Form.Item
                        name="image"
                        label="Hình ảnh"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng chọn ảnh món ăn",
                            },
                        ]}
                    >
                        <Upload
                            name="logo"
                            action="/upload.do"
                            listType="picture"
                        >
                            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        label="Tên món"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập tên món ăn",
                            },
                        ]}
                        value={dataAddForm.name}
                        onChange={(e) =>
                            setDataAddForm({
                                ...dataAddForm,
                                name: e.target.value,
                            })
                        }
                    >
                        <Input name="name" />
                    </Form.Item>

                    <Form.Item
                        label="Giá"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập giá món ăn!",
                            },
                        ]}
                        value={dataAddForm.price}
                        onChange={(e) =>
                            setDataAddForm({
                                ...dataAddForm,
                                price: e.target.value,
                            })
                        }
                    >
                        <Input name="price" />
                    </Form.Item>
                </Form>
            </Modal>

            {/* edit modal */}
            <Modal
                visible={showEditModal}
                title="Cập nhật món ăn"
                onCancel={() => setShowEditModal(false)}
                footer={[
                    <Button key="back" onClick={() => setShowEditModal(false)}>
                        Đóng
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        loading={loading}
                        onClick={handleUpdateFood}
                    >
                        Lưu thay đổi
                    </Button>,
                ]}
            >
                <Form
                    name="basic"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                    initialValues={{ remember: true, ...dataEditForm }}
                    autoComplete="off"
                    // onFinish={handleUpdateFood}
                >
                    <Form.Item label="ID" name="id">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập tên món ăn",
                            },
                        ]}
                    >
                        <Input
                            name="name"
                            value={dataEditForm.name}
                            onChange={(e) =>
                                setDataEditForm({
                                    ...dataEditForm,
                                    name: e.target.value,
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        name="image1"
                        label="Hình ảnh"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng chọn ảnh món ăn",
                            },
                        ]}
                    >
                        <Upload
                            name="image1"
                            // action="/"
                            listType="picture"
                            onChange={
                                (e) => console.log(e)
                                // setDataEditForm({
                                //     ...dataEditForm,
                                //     price: e.target.value,
                                // })
                            }
                        >
                            <Button icon={<UploadOutlined />}>
                                Click to upload
                            </Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập giá món ăn",
                            },
                        ]}
                    >
                        <Input
                            name="price"
                            value={dataEditForm.price}
                            onChange={(e) =>
                                setDataEditForm({
                                    ...dataEditForm,
                                    price: parseInt(e.target.value),
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="Trạng thái" name="status">
                        <Radio.Group
                            name="status"
                            onChange={(e) =>
                                setDataEditForm({
                                    ...dataEditForm,
                                    status: e.target.value,
                                })
                            }
                            value={dataEditForm.status}
                        >
                            <Radio value={true}>CÒN HÀNG</Radio>
                            <Radio value={false}>HẾT HÀNG</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>

            <Table bordered columns={columns} dataSource={data} />
        </div>
    );
}
