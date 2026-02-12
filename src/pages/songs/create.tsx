import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, InputNumber, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export const SongCreate = () => {
  const { formProps, saveButtonProps } = useForm({});

  const { selectProps: artistSelectProps } = useSelect({
    resource: "artist",
    optionLabel: "name",
    optionValue: "id",
    pagination: {
      pageSize: 1000,
    },
  });

  const { selectProps: albumSelectProps } = useSelect({
    resource: "album",
    optionLabel: "title",
    optionValue: "id",
    pagination: {
      pageSize: 1000,
    },
  });

  const { selectProps: genreSelectProps } = useSelect({
    resource: "genre",
    optionLabel: "name",
    optionValue: "id",
    pagination: {
      pageSize: 1000,
    },
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
        <Form.Item label={"Featured Artists"} name={["artist_ids"]}>
          <Select {...artistSelectProps} mode="multiple" allowClear />
        </Form.Item>
        <Form.Item label={"Genres"} name={["genre_ids"]}>
          <Select {...genreSelectProps} mode="multiple" allowClear />
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
          rules={[
            {
              required: true,
              message: "Please upload audio file",
            },
          ]}
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
              Click or drag audio file to upload
            </p>
            <p className="ant-upload-hint">
              Support for MP3, WAV, and other audio formats
            </p>
          </Upload.Dragger>
        </Form.Item>
      </Form>
    </Create>
  );
};
