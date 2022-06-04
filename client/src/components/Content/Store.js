import { UploadOutlined } from "@ant-design/icons";
import {
    Button,
    Col,
    Form,
    Image,
    Input,
    message,
    Row,
    Select,
    TimePicker,
    Upload,
} from "antd";
import moment from "moment";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function Store() {
    const {
        authState: { store },
        updateStore,
        uploadImage,
        deleteImage,
    } = useContext(AuthContext);

    // console.log("Store:", store);
    // Local state
    const [updateForm, setUpdateForm] = useState({
        ...store,
    });

    // console.log("UpdateForm:", updateForm);

    const onChangeUpdateForm = (event) => {
        // console.log(event);
        setUpdateForm({
            ...updateForm,
            [event.target.name]: event.target.value,
        });
    };

    const { avatar, phone, name, address, timeOpen, timeClose, categories } =
        updateForm;

    const handleUpdateStore = async () => {
        // console.log(updateForm);
        try {
            const updateData = await updateStore(updateForm);

            updateData.success
                ? message.success(updateData.message)
                : message.error(updateData.message);

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

    const normFile = (e) => {
        // console.log("Upload event:", e.file);
        deleteImage(avatar)
            .then((res) => {
                if (res.data.success) {
                    uploadImage(e.file)
                        .then((res) =>
                            setUpdateForm({
                                ...updateForm,
                                avatar: res.data.avatar,
                            })
                        )
                        .catch((error) => {
                            message.error(error);
                        });
                } else {
                    message.error(res.data.message);
                }
            })
            .catch((error) => {
                message.error(error);
            });

        if (Array.isArray(e)) {
            return e;
        }

        return e?.fileList;
    };

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

    return (
        <Row>
            <Col span={12} offset={6}>
                <Row justify="center" style={{ marginBottom: 30 }}>
                    <Image
                        // width={150}
                        height={150}
                        size="cover"
                        src={avatar}
                    />
                </Row>
                <Form
                    style={{ marginTop: 30 }}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{
                        remember: true,
                        phone: store.phone,
                        name: store.name,
                        address: store.address,
                        timeOpen: moment(store.timeOpen, "HH:mm:ss"),
                        timeClose: moment(store.timeClose, "HH:mm:ss"),
                        categories: store.categories,
                    }}
                    autoComplete="off"
                    onFinish={handleUpdateStore}
                >
                    <Form.Item
                        name="avatar"
                        label="Ảnh đại diện"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <Upload
                            name="avatar"
                            listType="picture"
                            maxCount={1}
                            beforeUpload={beforeUpload}
                        >
                            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                        </Upload>
                    </Form.Item>

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
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng chọn thời gian mở cửa",
                            },
                        ]}
                        // initialValue={moment("13:30:56", "HH:mm:ss")}
                    >
                        <TimePicker
                            name="timeOpen"
                            value={moment(timeOpen, "HH:mm:ss")}
                            onChange={(a, b) =>
                                setUpdateForm({
                                    ...updateForm,
                                    timeOpen: b,
                                })
                            }
                        />
                    </Form.Item>

                    <Form.Item
                        label="Thời gian đóng cửa"
                        name="timeClose"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng chọn thời gian mở cửa",
                            },
                        ]}
                        // initialValue={moment("13:30:56", "HH:mm:ss")}
                    >
                        <TimePicker
                            name="timeClose"
                            value={moment(timeClose, "HH:mm:ss")}
                            onChange={(a, b) =>
                                setUpdateForm({
                                    ...updateForm,
                                    timeClose: b,
                                })
                            }
                        />
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
                            onChange={(listCate) =>
                                setUpdateForm({
                                    ...updateForm,
                                    categories: listCate,
                                })
                            }
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
