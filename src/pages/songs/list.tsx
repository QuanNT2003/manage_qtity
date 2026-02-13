import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { type BaseRecord, useMany } from "@refinedev/core";
import { Space, Table } from "antd";

export const SongList = () => {
  const { result, tableProps } = useTable({
    syncWithLocation: true,
  });

  const {
    result: { data: albums },
    query: { isLoading: albumIsLoading },
  } = useMany({
    resource: "album",
    ids: result?.data?.map((item) => item?.album_id).filter(Boolean) ?? [],
    queryOptions: {
      enabled: !!result?.data,
    },
  });

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={"ID"} width={100} />
        <Table.Column dataIndex="title" title={"Title"} />
        <Table.Column
          dataIndex={"artist"}
          title={"Artist"}
          render={(value) => value?.name || "-"}
        />
        <Table.Column
          dataIndex={"featured_artists"}
          title={"Featured Artists"}
          render={(value: any[]) =>
            value?.length > 0
              ? value.map((item) => item.artist?.name).join(", ")
              : "-"
          }
        />
        <Table.Column
          dataIndex={"album_id"}
          title={"Album"}
          render={(value) =>
            albumIsLoading ? (
              <>Loading...</>
            ) : (
              albums?.find((item) => item.id === value)?.title || "-"
            )
          }
        />
        <Table.Column
          dataIndex="duration"
          title={"Duration"}
          render={(value: number) => formatDuration(value)}
          width={100}
        />
        <Table.Column dataIndex="track_number" title={"Track #"} width={100} />
        <Table.Column
          dataIndex={["created_at"]}
          title={"Created at"}
          render={(value: string) => <DateField value={value} />}
          width={150}
        />
        <Table.Column
          title={"Actions"}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
          width={120}
        />
      </Table>
    </List>
  );
};
