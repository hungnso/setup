import React from "react";
import { auth } from "../../common/firebase";

import { toast } from "react-toastify";
import { Layout, Form, Input, Button, Typography, Row, Col, Space, Card } from "antd";

import { HiOutlineLockClosed } from "react-icons/hi";
import { FaUserLock } from "react-icons/fa";

import Profile from "../../components/profile/Profile";
import UserNav from "../../components/nav/UserNav";
function Setting() {
  const [loading, setLoading] = React.useState(false);
  const [form] = Form.useForm();
  const [, forceUpdate] = React.useState({});

  // To disable submit button at the beginning.
  React.useEffect(() => {
    forceUpdate({});
  }, []);

  const handleSubmit = async ({ password }) => {
    setLoading(true);
    // console.log(password);

    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        form.resetFields();
        toast.success("Password updated");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  const passwordUpdateForm = () => (
    <Space direction="vertical">
      {loading ? (
        <Typography.Title level={2}>Loading...</Typography.Title>
      ) : (
        <Space align="baseline">
          <FaUserLock size={28} />
          <Typography.Title level={3}>Password Update</Typography.Title>
        </Space>
      )}
      <Form form={form} size="large" layout="inline" onFinish={handleSubmit} requiredMark={false}>
        <Form.Item name="password" rules={[{ required: true }, { min: 6 }]}>
          <Input.Password prefix={<HiOutlineLockClosed size={24} />} type="password" disabled={loading} placeholder="Enter your new password..." />
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%" }}
              disabled={loading || !form.isFieldsTouched(true) || !!form.getFieldsError().filter(({ errors }) => errors.length).length}
            >
              Submit
            </Button>
          )}
        </Form.Item>
      </Form>
    </Space>
  );

  return (
    <Layout.Content>
      <Row gutter={[24, 24]}>
        <Col flex="none">
          <Profile />
          <UserNav />
        </Col>
        <Col flex="auto">
          <Card>{passwordUpdateForm()}</Card>
        </Col>
      </Row>
    </Layout.Content>
  );
}

export default Setting;
