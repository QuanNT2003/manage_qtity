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
import { Space, Table, Tag } from "antd";

export const UserList = () => {
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
        <Table.Column dataIndex="username" title={"Username"} />
        <Table.Column dataIndex="email" title={"Email"} />
        <Table.Column dataIndex="full_name" title={"Full Name"} />
        <Table.Column
          dataIndex="subscription_type"
          title={"Subscription"}
          render={(value: string) => {
            const color = value === "PREMIUM" ? "gold" : "default";
            return <Tag color={color}>{value}</Tag>;
          }}
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
