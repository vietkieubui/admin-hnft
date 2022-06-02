import { Col, Divider, Row, Statistic } from "antd";
import React from "react";

function StatisticCp() {
    return (
        <Row style={{ marginTop: 30 }}>
            <Col span={16} offset={4}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Statistic title="Số Đơn Hàng" value={112893} />
                    </Col>
                    <Col span={12}>
                        <Statistic
                            title="Doanh Thu (VNĐ)"
                            value={112893}
                            precision={2}
                        />
                    </Col>
                </Row>
                <Divider />
                <Row gutter={16}>
                    <Col span={12}>
                        <Statistic title="Nhận xét" value={1128} />
                    </Col>
                    <Col span={12}>
                        <Statistic title="Đánh giá" value={4.5} suffix="/ 5" />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default StatisticCp;
