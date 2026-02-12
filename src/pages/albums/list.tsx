import {
  DateField,
  DeleteButton,
  EditButton,
  ImageField,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { type BaseRecord, useMany } from "@refinedev/core";
import { Space, Table, Tag } from "antd";

export const AlbumList = () => {
  const { result, tableProps } = useTable({
    syncWithLocation: true,
  });

  const {
    result: { data: artists },
    query: { isLoading: artistIsLoading },
  } = useMany({
    resource: "artist",
    ids: result?.data?.map((item) => item?.artist_id).filter(Boolean) ?? [],
    queryOptions: {
      enabled: !!result?.data,
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={"ID"} width={100} />
        <Table.Column
          dataIndex="cover_image_url"
          title={"Cover"}
          render={(value: string) =>
            value ? <ImageField value={value} width={50} height={50} /> : "-"
          }
          width={80}
        />
        <Table.Column dataIndex="title" title={"Title"} />
        <Table.Column
          dataIndex={"artist_id"}
          title={"Artist"}
          render={(value) =>
            artistIsLoading ? (
              <>Loading...</>
            ) : (
              artists?.find((item) => item.id === value)?.name
            )
          }
        />
        <Table.Column
          dataIndex="release_date"
          title={"Release Date"}
          render={(value: string) => (
            <DateField value={value} format="YYYY-MM-DD" />
          )}
        />
        <Table.Column
          dataIndex="type"
          title={"Type"}
          render={(value: string) => {
            const colorMap: Record<string, string> = {
              SINGLE: "blue",
              ALBUM: "green",
              EP: "orange",
            };
            return <Tag color={colorMap[value] || "default"}>{value}</Tag>;
          }}
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
