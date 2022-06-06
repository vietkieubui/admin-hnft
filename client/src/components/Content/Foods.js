import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {
    Button,
    Form,
    Image,
    Input,
    message,
    Modal,
    Popconfirm,
    Radio,
    Space,
    Spin,
    Table,
    Tag,
    Upload,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import { FoodsContext } from "../../contexts/FoodsContext";
// import { Modal } from "react-bootstrap";

export default function Food() {
    const {
        foodsState: { foods, foodsLoading },
        addFood,
        getFoods,
        deleteFood,
        updateFood,
    } = useContext(FoodsContext);

    // Start: Get all posts
    useEffect(() => getFoods(), [getFoods]);

    // console.log(foods);

    const [dataAddForm, setDataAddForm] = useState({
        image: "",
        name: "",
        price: "",
    });
    const [dataEditForm, setDataEditForm] = useState({});
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleUpdateFood = async () => {
        //call API
        console.log(dataEditForm);

        const res = await updateFood(dataEditForm);
        if (res.success) {
            message.success(res.message);
            setShowEditModal(false);
        } else {
            message.error(res.message);
        }
    };

    const handleAddFood = async () => {
        //call API
        // console.log(dataAddForm);

        const res = await addFood(dataAddForm);
        if (res.success) {
            message.success(res.message);
            setDataAddForm({ image: "", name: "", price: "" });
            setShowAddModal(false);
        } else {
            message.error(res.message);
        }
    };

    // console.log(dataAddForm);

    const handleShowEditModal = (item) => {
        console.log(item);
        setDataEditForm(item);
        setShowEditModal(true);
    };

    const foodsData = foods.map((food) => {
        return { ...food, key: food._id };
    });

    const columns = [
        {
            title: "ID",
            dataIndex: "_id",
            key: "_id",
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
                return (
                    <Tag
                        style={{ width: 80, textAlign: "center" }}
                        color={status === "CÒN HÀNG" ? "green" : "volcano"}
                        key={status}
                    >
                        {status}
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
                    <Popconfirm
                        title="Xóa món này ?"
                        placement="left"
                        onConfirm={() => deleteFood(record._id)}
                    >
                        <Button type="primary" danger>
                            Xóa
                        </Button>
                    </Popconfirm>
                    {/* <Button
                        type="primary"
                        danger
                        onClick={() => deleteFood(record._id)}
                    >
                        Xóa
                    </Button> */}
                </Space>
            ),
        },
    ];

    const beforeUpload = (file) => {
        const isJpgOrPng =
            file.type === "image/jpeg" || file.type === "image/png";

        if (!isJpgOrPng) {
            message.error("Chỉ có thể chọn file JPG hoặc PNG");
            return Upload.LIST_IGNORE;
        }

        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isLt2M) {
            message.error("Hình ảnh phải bé hơn 2MB");
            return Upload.LIST_IGNORE;
        }

        return false;
    };

    const normFile = (e) => {
        console.log("Upload event:", e.file);

        if (Array.isArray(e)) {
            return e;
        }

        return e?.fileList;
    };

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
                transitionName=""
                maskTransitionName=""
                onCancel={() => setShowAddModal(false)}
                footer={[
                    <Button key="back" onClick={() => setShowAddModal(false)}>
                        Đóng
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleAddFood}>
                        Thêm món
                    </Button>,
                ]}
            >
                <Form
                    name="basic"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                    fields={[
                        { name: "name", value: dataAddForm.name },
                        { name: "price", value: dataAddForm.price },
                    ]}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                >
                    <Form.Item
                        name="image"
                        label="Ảnh"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        // rules={[
                        //     {
                        //         required: true,
                        //         message: "Vui lòng chọn ảnh món ăn",
                        //     },
                        // ]}
                    >
                        <Upload
                            name="image"
                            listType="picture"
                            maxCount={1}
                            beforeUpload={beforeUpload}
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
                transitionName=""
                maskTransitionName=""
                onCancel={() => setShowEditModal(false)}
                footer={[
                    <Button key="back" onClick={() => setShowEditModal(false)}>
                        Đóng
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
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
                    fields={[
                        { name: "_id", value: dataEditForm._id },
                        { name: "name", value: dataEditForm.name },
                        { name: "price", value: dataEditForm.price },
                        { name: "status", value: dataEditForm.status },
                    ]}
                    initialValues={{ remember: true, ...dataEditForm }}
                    autoComplete="off"
                    // onFinish={handleUpdateFood}
                >
                    <Form.Item label="ID" name="_id">
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
                            onChange={(e) =>
                                setDataEditForm({
                                    ...dataEditForm,
                                    price: parseInt(e.target.value),
                                })
                            }
                        />
                    </Form.Item>

                    <Form.Item
                        label="Trạng thái"
                        name="status"
                        onChange={(e) =>
                            setDataEditForm({
                                ...dataEditForm,
                                status: e.target.value,
                            })
                        }
                    >
                        <Radio.Group>
                            <Radio value={"CÒN HÀNG"}>CÒN HÀNG</Radio>
                            <Radio value={"HẾT HÀNG"}>HẾT HÀNG</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>

            {foodsLoading ? (
                <div
                    style={{
                        height: "100vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Spin />
                </div>
            ) : (
                <Table bordered columns={columns} dataSource={foodsData} />
            )}
        </div>
    );
}
