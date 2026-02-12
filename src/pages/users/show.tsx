import {
  DateField,
  ImageField,
  Show,
  EmailField,
  TextField,
} from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography, Tag } from "antd";

const { Title } = Typography;

export const UserShow = () => {
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
      <Title level={5}>{"Username"}</Title>
      <TextField value={record?.username} />
      <Title level={5}>{"Email"}</Title>
      <EmailField value={record?.email} />
      <Title level={5}>{"Full Name"}</Title>
      <TextField value={record?.full_name || "-"} />
      <Title level={5}>{"Date of Birth"}</Title>
      {record?.date_of_birth ? (
        <DateField value={record?.date_of_birth} format="YYYY-MM-DD" />
      ) : (
        <TextField value="-" />
      )}
      <Title level={5}>{"Subscription Type"}</Title>
      <Tag color={record?.subscription_type === "PREMIUM" ? "gold" : "default"}>
        {record?.subscription_type}
      </Tag>
      <Title level={5}>{"Created At"}</Title>
      <DateField value={record?.created_at} />
      <Title level={5}>{"Updated At"}</Title>
      <DateField value={record?.updated_at} />
    </Show>
  );
};
