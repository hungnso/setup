import React from "react";

import { Form, Layout, Input, Button, Typography, Row, Col, Space, Card } from "antd";

import Loader from "../../components/loader/Loader";
import Profile from "../../components/profile/Profile";
import UserNav from "../../components/nav/UserNav";

function AdminDashboard() {
  const [loading, setLoading] = React.useState(false);
  return (
    <Layout.Content>
      {loading ? <Loader /> : ""}
      <Row gutter={[24, 24]} wrap={false}>
        <Col flex="none">
          <Profile />
          <UserNav />
        </Col>
        <Col flex="auto">
          <Card>
            <h1 className="text-demo">User AdminDashboard page</h1>
          </Card>
        </Col>
      </Row>
    </Layout.Content>
  );
}

export default AdminDashboard;
