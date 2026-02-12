import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Checkbox, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export const ArtistEdit = () => {
  const { formProps, saveButtonProps, formLoading } = useForm({});

  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"Name"}
          name={["name"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={"Bio"} name="bio">
          <Input.TextArea rows={4} />
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
        <Form.Item name="verified" valuePropName="checked">
          <Checkbox>Verified Artist</Checkbox>
        </Form.Item>
      </Form>
    </Edit>
  );
};
