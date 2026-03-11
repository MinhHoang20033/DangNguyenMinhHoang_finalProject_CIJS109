import { useParams } from "react-router-dom";
import { getProjects, saveProjects, getEmployees } from "../utils/storage";
import { Table, Typography, Avatar, Button, Input, Space } from "antd";
import { useState } from "react";

const { Title } = Typography;

export default function ProjectDetail() {

  const { id } = useParams();

  const [projects, setProjects] = useState(getProjects());
  const employees = getEmployees();

  const [search, setSearch] = useState("");
  const [assignment, setAssignment] = useState("");

  const project = projects.find(
    p => p.id === Number(id)
  );

  if (!project) return <h2>Project not found</h2>;

  if (!project.members) project.members = [];

  // nhân viên trong project
  const memberEmployees = project.members.map(member => {

    const emp = employees.find(
      e => e.id === member.employeeId
    );

    return {
      ...emp,
      assignment: member.assignment
    };
  });

  // nhân viên chưa trong project
  const availableEmployees = employees
    .filter(e =>
      !project.members.some(
        m => m.employeeId === e.id
      )
    )
    .filter(e =>
      e.name?.toLowerCase().includes(search.toLowerCase())
    );

  // thêm nhân viên + assignment
  const addMember = (employeeId) => {

    project.members.push({
      employeeId,
      assignment
    });

    saveProjects([...projects]);
    setProjects([...projects]);

    setAssignment("");
  };

  // xóa nhân viên khỏi project
  const removeMember = (employeeId) => {

    project.members = project.members.filter(
      m => m.employeeId !== employeeId
    );

    saveProjects([...projects]);
    setProjects([...projects]);
  };

  // bảng nhân viên
  const employeeColumns = [

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
      title: "Role",
      dataIndex: "role"
    },

    {
      title: "Assignment",
      render: (_, record) => (

        <Space>

          <Input
            placeholder="Assignment"
            style={{ width: 150 }}
            onChange={(e) =>
              setAssignment(e.target.value)
            }
          />

          <Button
            type="primary"
            onClick={() => addMember(record.id)}
          >
            Add
          </Button>

        </Space>

      )
    }

  ];

  // bảng member
  const memberColumns = [

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
      title: "Role",
      dataIndex: "role"
    },

    {
      title: "Assignment",
      dataIndex: "assignment"
    },

    {
      title: "Action",
      render: (_, record) => (
        <Button
          danger
          onClick={() => removeMember(record.id)}
        >
          Remove
        </Button>
      )
    }

  ];

  return (

    <div>

      <Title level={2}>{project.name}</Title>

      <br />

      <Input
        placeholder="Search employee..."
        style={{ width: 300, marginBottom: 20 }}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Title level={4}>Available Employees</Title>

      <Table
        rowKey="id"
        columns={employeeColumns}
        dataSource={availableEmployees}
        pagination={false}
        scroll={{ y: 350 }}
      />

      <br /><br />

      <Title level={4}>Project Members</Title>

      <Table
        rowKey="id"
        columns={memberColumns}
        dataSource={memberEmployees}
        pagination={false}
        scroll={{ y: 350 }}
      />

    </div>
  );
}