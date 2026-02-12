import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select, DatePicker, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

export const UserEdit = () => {
  const { formProps, saveButtonProps, formLoading } = useForm({});

  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
      <Form
        {...formProps}
        layout="vertical"
        initialValues={{
          ...formProps.initialValues,
          date_of_birth: formProps.initialValues?.date_of_birth
            ? dayjs(formProps.initialValues.date_of_birth)
            : undefined,
        }}
      >
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
        <Form.Item label={"Full Name"} name={["full_name"]}>
          <Input />
        </Form.Item>
        <Form.Item label={"Date of Birth"} name={["date_of_birth"]}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label={"Subscription Type"} name={["subscription_type"]}>
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
              Click or drag file to upload new avatar
            </p>
          </Upload.Dragger>
        </Form.Item>
      </Form>
    </Edit>
  );
};
