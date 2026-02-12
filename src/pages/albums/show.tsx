import { DateField, ImageField, Show, TextField } from "@refinedev/antd";
import { useOne, useShow } from "@refinedev/core";
import { Typography, Tag } from "antd";

const { Title } = Typography;

export const AlbumShow = () => {
  const { query } = useShow({});
  const { data, isLoading } = query;

  const record = data?.data;

  const { data: artistData, isLoading: artistIsLoading } = useOne({
    resource: "artist",
    id: record?.artist_id || "",
    queryOptions: {
      enabled: !!record?.artist_id,
    },
  });

  const colorMap: Record<string, string> = {
    SINGLE: "blue",
    ALBUM: "green",
    EP: "orange",
  };

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{"ID"}</Title>
      <TextField value={record?.id ?? ""} />
      {record?.cover_image_url && (
        <>
          <Title level={5}>{"Cover Image"}</Title>
          <ImageField value={record?.cover_image_url} width={300} />
        </>
      )}
      <Title level={5}>{"Title"}</Title>
      <TextField value={record?.title} />
      <Title level={5}>{"Artist"}</Title>
      {artistIsLoading ? (
        <>Loading...</>
      ) : (
        <TextField value={artistData?.data?.name} />
      )}
      <Title level={5}>{"Release Date"}</Title>
      <DateField value={record?.release_date} format="YYYY-MM-DD" />
      <Title level={5}>{"Type"}</Title>
      <Tag color={colorMap[record?.type] || "default"}>{record?.type}</Tag>
      <Title level={5}>{"Created At"}</Title>
      <DateField value={record?.created_at} />
      <Title level={5}>{"Updated At"}</Title>
      <DateField value={record?.updated_at} />
    </Show>
  );
};
