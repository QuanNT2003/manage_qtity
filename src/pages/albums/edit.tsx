import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, DatePicker, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

export const AlbumEdit = () => {
  const { formProps, saveButtonProps, formLoading, query } = useForm({});

  const albumData = query?.data?.data;

  const { selectProps: artistSelectProps } = useSelect({
    resource: "artist",
    optionLabel: "name",
    optionValue: "id",
    defaultValue: albumData?.artist_id,
    queryOptions: {
      enabled: !!albumData?.artist_id,
    },
  });

  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
      <Form
        {...formProps}
        layout="vertical"
        initialValues={{
          ...formProps.initialValues,
          release_date: formProps.initialValues?.release_date
            ? dayjs(formProps.initialValues.release_date)
            : undefined,
        }}
      >
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
        <Form.Item label={"Type"} name={["type"]}>
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
              Click or drag file to upload new cover image
            </p>
          </Upload.Dragger>
        </Form.Item>
      </Form>
    </Edit>
  );
};
