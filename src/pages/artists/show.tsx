import {
  BooleanField,
  DateField,
  ImageField,
  Show,
  TextField,
} from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography } from "antd";

const { Title } = Typography;

export const ArtistShow = () => {
  const { query } = useShow({});
  const { data, isLoading } = query;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{"ID"}</Title>
      <TextField value={record?.id ?? ""} />
      {record?.avatar_url && (
        <>
          <Title level={5}>{"Avatar"}</Title>
          <ImageField value={record?.avatar_url} width={200} />
        </>
      )}
      <Title level={5}>{"Name"}</Title>
      <TextField value={record?.name} />
      <Title level={5}>{"Bio"}</Title>
      <TextField value={record?.bio || "-"} />
      <Title level={5}>{"Verified"}</Title>
      <BooleanField value={record?.verified} />
      <Title level={5}>{"Created At"}</Title>
      <DateField value={record?.created_at} />
      <Title level={5}>{"Updated At"}</Title>
      <DateField value={record?.updated_at} />
    </Show>
  );
};
