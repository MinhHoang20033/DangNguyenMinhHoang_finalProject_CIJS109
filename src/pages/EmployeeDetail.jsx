import { useParams } from "react-router-dom";
import { getEmployees, saveEmployees, getProjects } from "../utils/storage";
import { Avatar, Typography, Form, Input, Button, Card, List, Row, Col } from "antd";
import { useState } from "react";

const { Title, Text } = Typography;

export default function EmployeeDetail() {

  const { id } = useParams();

  const employees = getEmployees();
  const employee = employees.find(
    e => e.id === Number(id)
  );

  const [form] = Form.useForm();

  if (!employee) return <div>Not found</div>;

  // tìm project employee tham gia
  const projects = getProjects().filter(p =>
    p.members?.some(
      m => m.employeeId === employee.id
    )
  );

  const onFinish = (values) => {

    const newEmployees = employees.map(e =>
      e.id === employee.id
        ? { ...e, ...values }
        : e
    );

    saveEmployees(newEmployees);

    window.location.reload();
  };

  return (

    <Row gutter={20}>

      {/* Left - Employee Info */}
      <Col span={16}>

        <Card>

          <div style={{ textAlign: "center", marginBottom: 20 }}>

            <Avatar
              src={employee.avatar}
              size={190}
            >
              {employee.name?.charAt(0)}
            </Avatar>

            <Title level={3} style={{ marginTop: 10 }}>
              {employee.name}
            </Title>

          </div>

          <Form
            form={form}
            layout="vertical"
            initialValues={employee}
            onFinish={onFinish}
          >

            <Form.Item
              name="name"
              label="Name"
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone"
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="address"
              label="Address"
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="role"
              label="Role"
            >
              <Input />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
            >
              Update
            </Button>

          </Form>

        </Card>

      </Col>

      {/* Right - Projects Joined */}
      <Col span={8}>

        <Card title="Projects Joined">

          <List
            dataSource={projects}
            renderItem={(item) => (

              <List.Item>
                <Text>{item.name}</Text>
              </List.Item>

            )}
          />

        </Card>

      </Col>

    </Row>

  );
}