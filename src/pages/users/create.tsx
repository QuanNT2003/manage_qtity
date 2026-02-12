import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Select, DatePicker, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export const UserCreate = () => {
  const { formProps, saveButtonProps } = useForm({});

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"Username"}
          name={["username"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Email"}
          name={["email"]}
          rules={[
            {
              required: true,
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Password"}
          name={["password_hash"]}
          rules={[
            {
              required: true,
              min: 6,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item label={"Full Name"} name={["full_name"]}>
          <Input />
        </Form.Item>
        <Form.Item label={"Date of Birth"} name={["date_of_birth"]}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label={"Subscription Type"}
          name={["subscription_type"]}
          initialValue={"FREE"}
        >
          <Select
            options={[
              { value: "FREE", label: "Free" },
              { value: "PREMIUM", label: "Premium" },
            ]}
          />
        </Form.Item>
        <Form.Item
          label={"Avatar"}
          name="file"
          valuePropName="fileList"
          getValueFromEvent={(e) => {
            if (Array.isArray(e)) {
              return e;
            }
            return e?.fileList;
          }}
        >
          <Upload.Dragger
            name="file"
            listType="picture"
            maxCount={1}
            beforeUpload={() => false}
          >
            <p className="ant-upload-drag-icon">
              <UploadOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to upload avatar
            </p>
          </Upload.Dragger>
        </Form.Item>
      </Form>
    </Create>
  );
};
