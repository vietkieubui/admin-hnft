import { SearchOutlined } from "@ant-design/icons";
import {
    Button,
    Col,
    Divider,
    Input,
    message,
    Row,
    Space,
    Statistic,
    Table,
    Tag,
} from "antd";
import Modal from "antd/lib/modal/Modal";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { apiUrl } from "../../contexts/constants";
import { formatDate } from "../../utils/utils";

function StatisticCp() {
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const [orders, setOrders] = useState(null);
    const [orderSelect, setOrderSelect] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);

    const Sum = orders
        ? orders.reduce(
              (Sum, order) =>
                  order.status === "ĐÃ GIAO" && Sum + order.totalPrice,
              0
          )
        : 0;
    // console.log(orders);

    const searchInput = useRef(null);

    useEffect(() => {
        axios
            .get(`${apiUrl}/orders/getOrderHistoryWeb`)
            .then((response) => {
                if (response.data.success) {
                    setOrders(response.data.orders);
                }
            })
            .catch((error) => message.error(error));
    }, [orderSelect]);

    const DescriptionItem = ({ title, content }) => (
        <div className="site-description-item-profile-wrapper">
            <p className="site-description-item-profile-p-label">{title}:</p>
            {content}
        </div>
    );

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
    };

    const handleShowDetailModal = (orderId) => {
        if (orders) {
            const orderSelected = orders.find((order) => order._id === orderId);
            setOrderSelect(orderSelected);
        }
        setShowDetailModal(true);
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }) => (
            <div
                style={{
                    padding: 8,
                }}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Nhập giá trị tìm kiếm`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{
                        marginBottom: 8,
                        display: "block",
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        // icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Tìm kiếm
                    </Button>
                    <Button
                        onClick={() =>
                            clearFilters && handleReset(clearFilters)
                        }
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Đặt lại
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Lọc
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? "#1890ff" : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: "#ffc069",
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });

    const columns = [
        {
            title: "Mã đơn hàng",
            dataIndex: "_id",
            key: "_id",
            ...getColumnSearchProps("_id"),
        },
        {
            title: "Ngày đặt",
            dataIndex: "createAt",
            key: "createAt",
            render: (_, { createAt }) => formatDate(createAt),
        },
        {
            title: "Tên khách hàng",
            dataIndex: ["user", "name"],
            key: "userName",
            width: 200,
            // sorter: (a, b) => a.customerName.length - b.customerName.length,
            ...getColumnSearchProps(["user", "name"]),
        },
        {
            title: "Số điện thoại",
            dataIndex: ["user", "phone"],
            key: "phone",
            ...getColumnSearchProps(["user", "phone"]),
        },
        {
            title: "Tổng tiền",
            dataIndex: "totalPrice",
            key: "totalPrice",
            with: 80,
            sorter: (a, b) => a.totalPrice - b.totalPrice,
            render: (_, { totalPrice }) =>
                new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                }).format(totalPrice),
        },
        {
            title: "Trạng thái",
            key: "status",
            dataIndex: "status",
            filters: [
                {
                    text: "ĐÃ GIAO",
                    value: "ĐÃ GIAO",
                },
                {
                    text: "ĐÃ HỦY",
                    value: "ĐÃ HỦY",
                },
            ],
            // filterMode: "tree",
            // filterSearch: true,
            onFilter: (value, record) => record.status === value,
            render: (_, { status }) => {
                let color;
                switch (status) {
                    case "ĐÃ GIAO":
                        color = "green";
                        break;
                    default:
                        color = "volcano";
                        break;
                }

                return (
                    <Tag
                        style={{ textAlign: "center", width: 111 }}
                        color={color}
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
            render: (record) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        onClick={() => handleShowDetailModal(record._id)}
                    >
                        Chi tiết
                    </Button>
                </Space>
            ),
        },
    ];

    const columnOrderDetail = [
        {
            title: "STT",
            // dataIndex: "_id",
            key: "_id",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Tên món",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Đơn giá",
            dataIndex: "price",
            key: "price",
            render: (_, { price }) =>
                new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                }).format(price),
        },
    ];

    return (
        <>
            <>
                <Table
                    bordered
                    rowKey="_id"
                    columns={columns}
                    dataSource={orders}
                />
                {/* edit modal */}
                {orderSelect && (
                    <Modal
                        // width={1000}
                        destroyOnClose={true}
                        visible={showDetailModal}
                        title="Chi tiết đơn hàng"
                        transitionName=""
                        maskTransitionName=""
                        onCancel={() => setShowDetailModal(false)}
                        footer={[
                            <Button
                                key="back"
                                onClick={() => setShowDetailModal(false)}
                            >
                                Đóng
                            </Button>,
                        ]}
                    >
                        <p className="site-description-item-profile-p">
                            Thông tin đơn hàng
                        </p>
                        <Row>
                            <Col span={24}>
                                <DescriptionItem
                                    title="Mã đơn hàng"
                                    content={orderSelect._id}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <DescriptionItem
                                    title="Thời gian đặt"
                                    content={formatDate(orderSelect.createAt)}
                                />
                            </Col>
                        </Row>

                        <Divider />

                        <p className="site-description-item-profile-p">
                            Thông tin khách hàng
                        </p>
                        <Row>
                            <Col span={12}>
                                <DescriptionItem
                                    title="Họ và Tên"
                                    content={orderSelect.user.name}
                                />
                            </Col>
                            <Col span={12}>
                                <DescriptionItem
                                    title="Số điện thoại"
                                    content={orderSelect.user.phone}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <DescriptionItem
                                    title="Địa chỉ"
                                    content={orderSelect.user.address}
                                />
                            </Col>
                        </Row>

                        <Divider />

                        <p className="site-description-item-profile-p">
                            Món đặt
                        </p>
                        <Table
                            bordered
                            rowKey="_id"
                            columns={columnOrderDetail}
                            dataSource={orderSelect.foods}
                            footer={() => (
                                <p style={{ textAlign: "end", margin: 0 }}>
                                    {"Tổng: " +
                                        new Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        }).format(orderSelect.totalPrice)}
                                </p>
                            )}
                        />
                    </Modal>
                )}
            </>

            <Row style={{ marginTop: 30 }}>
                <Col span={24} offset={4}>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Statistic
                                title="Số Đơn Hàng Đã Giao"
                                value={
                                    orders
                                        ? orders.filter(
                                              (order) =>
                                                  order.status === "ĐÃ GIAO"
                                          ).length
                                        : 0
                                }
                            />
                        </Col>
                        <Col span={6}>
                            <Statistic
                                title="Số Đơn Hàng Đã Hủy"
                                value={
                                    orders
                                        ? orders.filter(
                                              (order) =>
                                                  order.status === "ĐÃ HỦY"
                                          ).length
                                        : 0
                                }
                            />
                        </Col>
                        <Col span={6}>
                            <Statistic
                                title="Doanh Thu (VNĐ)"
                                value={Sum}
                                precision={0}
                            />
                        </Col>
                    </Row>
                    {/* <Divider />
                    <Row gutter={16}>
                        <Col span={12}>
                            <Statistic title="Nhận xét" value={1128} />
                        </Col>
                        <Col span={12}>
                            <Statistic
                                title="Đánh giá"
                                value={4.5}
                                suffix="/ 5"
                            />
                        </Col>
                    </Row> */}
                </Col>
            </Row>
        </>
    );
}

export default StatisticCp;
