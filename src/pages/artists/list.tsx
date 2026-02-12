import {
  DateField,
  DeleteButton,
  EditButton,
  ImageField,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { type BaseRecord } from "@refinedev/core";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Space, Table, Tag } from "antd";

export const ArtistList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={"ID"} width={100} />
        <Table.Column
          dataIndex="avatar_url"
          title={"Avatar"}
          render={(value: string) =>
            value ? <ImageField value={value} width={50} height={50} /> : "-"
          }
          width={80}
        />
        <Table.Column dataIndex="name" title={"Name"} />
        <Table.Column
          dataIndex="bio"
          title={"Bio"}
          render={(value: string) => {
            if (!value) return "-";
            return value.length > 100 ? value.slice(0, 100) + "..." : value;
          }}
        />
        <Table.Column
          dataIndex="verified"
          title={"Verified"}
          render={(value: boolean) =>
            value ? (
              <Tag icon={<CheckCircleOutlined />} color="success">
                Verified
              </Tag>
            ) : (
              <Tag icon={<CloseCircleOutlined />} color="default">
                Not Verified
              </Tag>
            )
          }
          width={120}
        />
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
