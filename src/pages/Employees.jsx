import { Table, Button, Input, Avatar, Space, Typography, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import { getEmployees, saveEmployees } from "../utils/storage";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export default function Employees() {

  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setEmployees(getEmployees());
  }, []);

  // delete employee
  const deleteEmployee = (id) => {

    const newData = employees.filter(
      e => e.id !== id
    );

    saveEmployees(newData);
    setEmployees(newData);
  };

  // search
  const filtered = employees.filter(e =>
    e.name?.toLowerCase().includes(
      search.toLowerCase()
    )
  );

  const columns = [

    {
      title: "Avatar",
      render: (_, record) => (
        <Avatar src={record.avatar}>
          {record.name?.charAt(0)}
        </Avatar>
      )
    },

    {
      title: "Name",
      dataIndex: "name"
    },

    {
      title: "Email",
      dataIndex: "email"
    },

    {
      title: "Role",
      dataIndex: "role"
    },

    {
      title: "Action",
      render: (_, record) => (

        <Space>

          <Button
            type="link"
            onClick={() =>
              navigate(`/employees/${record.id}`)
            }
          >
            Detail
          </Button>

          <Popconfirm
            title="Delete this employee?"
            onConfirm={() =>
              deleteEmployee(record.id)
            }
          >

            <Button danger>
              Delete
            </Button>

          </Popconfirm>

        </Space>

      )
    }

  ];

  return (

    <div>

      <Space
        style={{
          width: "100%",
          justifyContent: "space-between",
          marginBottom: 20
        }}
      >

        <Title level={3}>
          Employees
        </Title>

        <Button
          type="primary"
          onClick={() =>
            navigate("/employees/add")
          }
        >
          Add Employee
        </Button>

      </Space>

      <Input
        placeholder="Search employee..."
        style={{ maxWidth: 300, marginBottom: 20 }}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <Table
        rowKey="id"
        columns={columns}
        dataSource={filtered}
        pagination={false}
        scroll={{ y: 500 }}
      />

    </div>
  );
}