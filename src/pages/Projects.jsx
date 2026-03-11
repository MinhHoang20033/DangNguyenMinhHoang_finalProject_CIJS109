import { useEffect, useState } from "react";
import {
  Button,
  Input,
  Table,
  Modal,
  Typography,
  Popconfirm,
  Space
} from "antd";

import {
  PlusOutlined,
  DeleteOutlined
} from "@ant-design/icons";

import { getProjects, saveProjects } from "../utils/storage";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export default function Projects() {

  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  // add project
  const addProject = () => {

    if (!name.trim()) return;

    const newProject = {
      id: Date.now(),
      name,
      desc,
      members: []
    };

    const newData = [...projects, newProject];

    saveProjects(newData);
    setProjects(newData);

    setName("");
    setDesc("");

    setOpen(false);
  };

  // delete project
  const deleteProject = (id) => {

    const newData = projects.filter(
      p => p.id !== id
    );

    saveProjects(newData);
    setProjects(newData);
  };

  // search
  const filtered = projects.filter(p =>
    p.name?.toLowerCase().includes(
      search.toLowerCase()
    )
  );

  const columns = [

    {
      title: "Project Name",
      dataIndex: "name",
      key: "name"
    },

    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
      render: (text) =>
        text || "No description"
    },

    {
      title: "Members",
      key: "members",
      render: (_, record) =>
        record.members?.length || 0
    },

    {
      title: "Actions",
      key: "actions",

      render: (_, record) => (

        <Space>

          <Button
            type="primary"
            onClick={() =>
              navigate(`/projects/${record.id}`)
            }
          >
            View
          </Button>

          <Popconfirm
            title="Delete this project?"
            onConfirm={() =>
              deleteProject(record.id)
            }
          >

            <Button
              danger
              icon={<DeleteOutlined />}
            >
              Delete
            </Button>

          </Popconfirm>

        </Space>

      )
    }

  ];

  return (

    <div>

      <Title level={2}>
        Projects
      </Title>

      <Space style={{ marginBottom: 20 }}>

        <Input
          placeholder="Search project..."
          style={{ width: 250 }}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setOpen(true)}
        >
          Add Project
        </Button>

      </Space>

      <Table
        columns={columns}
        dataSource={filtered}
        rowKey="id"
        pagination={false}
        scroll={{ y: 300 }}
      />

      <Modal
        title="Add Project"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={addProject}
        okText="Create"
      >

        <Input
          placeholder="Project name"
          style={{ marginBottom: 10 }}
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <Input.TextArea
          placeholder="Project description"
          rows={3}
          value={desc}
          onChange={(e) =>
            setDesc(e.target.value)
          }
        />

      </Modal>

    </div>
  );
}