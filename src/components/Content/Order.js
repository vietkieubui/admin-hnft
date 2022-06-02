import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tag } from "antd";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";

function Order() {
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
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

    const order = [
        {
            key: "44",
            id: "47134823195234",
            date: "26 March 2020 12:42 AM",
            customerName: "Aui Quang Tuan",
            address: "Tân Triều, Thanh Trì, Hà Nội",
            totalPay: 10000,
            status: 0,
        },
        {
            key: "28",
            id: "47134823195235",
            date: "26 March 2020 12:42 AM",
            customerName: "Bui Quang Tuan",
            address: "Tân Triều, Thanh Trì, Hà Nội",
            totalPay: 20000,
            status: 1,
        },
        {
            key: "53",
            id: "47134823195233",
            date: "26 March 2020 12:42 AM",
            customerName: "Cui Quang Tuan",
            address: "Tân Triều, Thanh Trì, Hà Nội",
            totalPay: 30000,
            status: 2,
        },
        {
            key: "86",
            id: "47134823195231",
            date: "b26 March 2020 12:42 AM",
            customerName: "Dui Quang Tuan",
            address: "Tân Triều, Thanh Trì, Hà Nội",
            totalPay: 40000,
            status: 1,
        },
    ];

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Ngày đặt",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Tên khách hàng",
            dataIndex: "customerName",
            key: "customerName",
            width: 200,
            // sorter: (a, b) => a.customerName.length - b.customerName.length,
            ...getColumnSearchProps("customerName"),
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
            key: "address",
            // width: 200,
            ...getColumnSearchProps("address"),
        },
        {
            title: "Giá trị đơn hàng",
            dataIndex: "totalPay",
            key: "totalPay",
            sorter: (a, b) => a.totalPay - b.totalPay,
            render: (_, { totalPay }) =>
                new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                }).format(totalPay),
        },
        {
            title: "Trạng thái",
            key: "status",
            dataIndex: "status",
            filters: [
                {
                    text: "ĐÃ GIAO",
                    value: 1,
                },
                {
                    text: "ĐĂNG GIAO",
                    value: 2,
                },
                {
                    text: "ĐÃ HỦY",
                    value: 0,
                },
            ],
            // filterMode: "tree",
            // filterSearch: true,
            onFilter: (value, record) => record.status === value,
            width: 120,
            render: (_, { status }) => {
                let tag;
                let color;
                switch (status) {
                    case 1:
                        tag = "ĐÃ GIAO";
                        color = "green";
                        break;
                    case 2:
                        tag = "ĐANG GIAO";
                        color = "yellow";
                        break;
                    default:
                        tag = "ĐÃ HỦY";
                        color = "volcano";
                        break;
                }

                return (
                    <Tag
                        style={{ width: 80, textAlign: "center" }}
                        color={color}
                        key={tag}
                    >
                        {tag}
                    </Tag>
                );
            },
        },
    ];

    return <Table bordered columns={columns} dataSource={order} />;
}

export default Order;
