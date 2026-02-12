import { DateField, Show, TextField, UrlField } from "@refinedev/antd";
import { useOne, useShow } from "@refinedev/core";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

export const SongShow = () => {
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

  const { data: albumData, isLoading: albumIsLoading } = useOne({
    resource: "album",
    id: record?.album_id || "",
    queryOptions: {
      enabled: !!record?.album_id,
    },
  });

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{"ID"}</Title>
      <TextField value={record?.id ?? ""} />
      <Title level={5}>{"Title"}</Title>
      <TextField value={record?.title} />
      <Title level={5}>{"Artist"}</Title>
      {artistIsLoading ? (
        <>Loading...</>
      ) : (
        <TextField value={artistData?.data?.name} />
      )}
      <Title level={5}>{"Album"}</Title>
      {record?.album_id ? (
        albumIsLoading ? (
          <>Loading...</>
        ) : (
          <TextField value={albumData?.data?.title} />
        )
      ) : (
        <TextField value="-" />
      )}
      <Title level={5}>{"Duration"}</Title>
      <TextField value={formatDuration(record?.duration || 0)} />
      <Title level={5}>{"Track Number"}</Title>
      <TextField value={record?.track_number || "-"} />
      {record?.lyrics && (
        <>
          <Title level={5}>{"Lyrics"}</Title>
          <Paragraph style={{ whiteSpace: "pre-wrap" }}>
            {record?.lyrics}
          </Paragraph>
        </>
      )}
      <Title level={5}>{"Audio File"}</Title>
      {record?.file_url ? (
        <UrlField value={record?.file_url} />
      ) : (
        <TextField value="-" />
      )}
      <Title level={5}>{"Play Count"}</Title>
      <TextField value={record?.play_count || 0} />
      <Title level={5}>{"Created At"}</Title>
      <DateField value={record?.created_at} />
      <Title level={5}>{"Updated At"}</Title>
      <DateField value={record?.updated_at} />
    </Show>
  );
};
