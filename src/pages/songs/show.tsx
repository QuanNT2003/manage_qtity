import { DateField, Show, TextField, UrlField } from "@refinedev/antd";
import { useOne, useShow } from "@refinedev/core";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

export const SongShow = () => {
  const { query } = useShow({});
  const { data, isLoading } = query;

  const record = data?.data;

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
      <TextField value={record?.artist?.name || "-"} />
      <Title level={5}>{"Featured Artists"}</Title>
      <TextField
        value={
          record?.featured_artists?.length > 0
            ? record.featured_artists
                .map((item: any) => item.artist?.name)
                .join(", ")
            : "-"
        }
      />
      <Title level={5}>{"Genres"}</Title>
      <TextField
        value={
          record?.genres?.length > 0
            ? record.genres.map((item: any) => item.genre?.name).join(", ")
            : "-"
        }
      />
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
