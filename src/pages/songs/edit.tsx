import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, InputNumber, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export const SongEdit = () => {
  const { formProps, saveButtonProps, formLoading, query } = useForm({});

  const songData = query?.data?.data;

  const { selectProps: artistSelectProps } = useSelect({
    resource: "artist",
    optionLabel: "name",
    optionValue: "id",
    defaultValue: songData?.artist_id,
    pagination: {
      pageSize: 1000,
    },
    queryOptions: {
      enabled: !!songData?.artist_id,
    },
  });

  const { selectProps: albumSelectProps } = useSelect({
    resource: "album",
    optionLabel: "title",
    optionValue: "id",
    defaultValue: songData?.album_id,
    pagination: {
      pageSize: 1000,
    },
    queryOptions: {
      enabled: !!songData?.album_id,
    },
  });

  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
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
        <Form.Item label={"Album"} name={["album_id"]}>
          <Select {...albumSelectProps} allowClear />
        </Form.Item>
        <Form.Item
          label={"Duration (seconds)"}
          name={["duration"]}
          rules={[
            {
              required: true,
              type: "number",
              min: 1,
            },
          ]}
        >
          <InputNumber min={1} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label={"Track Number"} name={["track_number"]}>
          <InputNumber min={1} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label={"Lyrics"} name="lyrics">
          <Input.TextArea rows={6} />
        </Form.Item>
        <Form.Item
          label={"Audio File"}
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
            listType="text"
            maxCount={1}
            beforeUpload={() => false}
            accept="audio/*"
          >
            <p className="ant-upload-drag-icon">
              <UploadOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag audio file to upload new file
            </p>
            <p className="ant-upload-hint">
              Leave empty to keep existing audio file
            </p>
          </Upload.Dragger>
        </Form.Item>
      </Form>
    </Edit>
  );
};
