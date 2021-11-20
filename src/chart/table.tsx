import React, { useState, useEffect } from 'react';

import { Table, Input, Popconfirm, Form, Typography } from 'antd';

const { TextArea } = Input;

interface Item {
  key: string;
  name: string;
  age: number;
  address: string;
}
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'moreT' | 'text';
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'moreT' ? <TextArea /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const DataTable = (param) => {
  const [prolist, setprolist] = useState([]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record: Item) => record.key === editingKey;
  const edit = (record: Partial<Item> & { key: React.Key }) => {
    console.log('record: ', record);
    form.setFieldsValue({
      ProjectName: '',
      projectDetail: '',
      projectStartTime: '',
      projectEndTime: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };
  const save = async (key: React.Key) => {
    console.log('key: ', (await form.validateFields()) as Item);
    try {
      const row = (await form.validateFields()) as Item;
      console.log('row: ', row);


      const newData = [...prolist];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setprolist(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setprolist(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'projectName',
      dataIndex: 'projectName',
      width: '15%',
      editable: true,
    },
    {
      title: 'projectDetail',
      dataIndex: 'projectDetail',
      width: '25%',
      editable: true,
    },
    {
      title: 'projectStartTime',
      dataIndex: 'projectStartTime',
      width: '20%',
      editable: true,
    },
    {
      title: 'projectEndTime',
      dataIndex: 'projectEndTime',
      width: '20%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ''}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex == 'projectDetail' ? 'moreT' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  useEffect(() => {
    let plist = {},
      plistArr = [];
    param.columnData.forEach((item) => {
      item.projects.forEach((item2) => {
        if (plist[item2.name]) {
          plist[item2.name].timeRange.push(item.range.date);
        } else {
          plist[item2.name] = {
            projectName: item2.name,
            timeRange: [item.range.date],
          };
        }
      });
    });
    for (let i in plist) {
      if (plist[i].projectName != 'Unknow Project')
        plistArr.push({
          key: i,
          projectName: plist[i].projectName,
          projectDetail: '',
          projectStartTime: plist[i].timeRange[0],
          projectEndTime: plist[i].timeRange[plist[i].timeRange.length - 1],
        });
    }
    setprolist(plistArr);
  }, [param.columnData]);
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        columns={mergedColumns}
        rowClassName="editable-row"
        dataSource={prolist}
        pagination={false}
      ></Table>
    </Form>
  );
};

export default DataTable;
