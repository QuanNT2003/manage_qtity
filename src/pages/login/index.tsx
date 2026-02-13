import { useLogin } from "@refinedev/core";
import { Form, Input, Button, Card, Checkbox, Layout, Typography } from "antd";

const { Title } = Typography;

export const Login = () => {
  const { mutate: login } = useLogin();

  const onFinish = (values: { email: string; password: string }) => {
    login({
      email: values.email,
      password: values.password,
    });
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f0f2f5",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 400,
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          borderRadius: 8,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Title level={2}>Qtify Admin</Title>
          <Typography.Text type="secondary">
            Sign in to manage your music
          </Typography.Text>
        </div>

        <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Invalid email format" },
            ]}
          >
            <Input placeholder="admin@example.com" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="••••••••" size="large" />
          </Form.Item>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 24,
            }}
          >
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a href="/forgot-password" style={{ fontSize: "14px" }}>
              Forgot password?
            </a>
          </div>

          <Button type="primary" htmlType="submit" block size="large">
            Sign In
          </Button>
        </Form>
      </Card>
    </Layout>
  );
};
