import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, DatePicker, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export const AlbumCreate = () => {
  const { formProps, saveButtonProps } = useForm({});

  const { selectProps: artistSelectProps } = useSelect({
    resource: "artist",
    optionLabel: "name",
    optionValue: "id",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"Title"}
          name={["title"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Artist"}
          name={["artist_id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...artistSelectProps} />
        </Form.Item>
        <Form.Item
          label={"Release Date"}
          name={["release_date"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label={"Type"} name={["type"]} initialValue={"ALBUM"}>
          <Select
            options={[
              { value: "SINGLE", label: "Single" },
              { value: "ALBUM", label: "Album" },
              { value: "EP", label: "EP" },
            ]}
          />
        </Form.Item>
        <Form.Item
          label={"Cover Image"}
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
              Click or drag file to upload cover image
            </p>
          </Upload.Dragger>
        </Form.Item>
      </Form>
    </Create>
  );
};
