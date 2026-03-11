import { Form, Input, Button, Upload, Avatar } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { saveEmployees, getEmployees } from "../utils/storage";
import { useState } from "react";

export default function AddEmployee() {

  const navigate = useNavigate();
  const [avatar, setAvatar] = useState("");

  // convert img -> base64
  const getBase64 = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const onFinish = (values) => {

    const employees = getEmployees();

    const newEmployee = {
      id: Date.now(),
      avatar,
      ...values
    };

    saveEmployees([...employees, newEmployee]);

    navigate("/employees");
  };

  return (

    <Form
      onFinish={onFinish}
      layout="vertical"
    >

      <Form.Item label="Avatar">

        <Upload
          beforeUpload={(file) => {
            getBase64(file);
            return false;
          }}
          showUploadList={false}
        >

          <Button icon={<UploadOutlined />}>
            Upload Avatar
          </Button>

        </Upload>

        {avatar && (
          <div style={{ marginTop: 10 }}>
            <Avatar
              src={avatar}
              size={80}
            />
          </div>
        )}

      </Form.Item>

      <Form.Item name="name" label="Name">
        <Input />
      </Form.Item>

      <Form.Item name="email" label="Email">
        <Input />
      </Form.Item>

      <Form.Item name="phone" label="Phone">
        <Input />
      </Form.Item>

      <Form.Item name="address" label="Address">
        <Input />
      </Form.Item>

      <Form.Item name="role" label="Role">
        <Input />
      </Form.Item>

      <Button
        type="primary"
        htmlType="submit"
      >
        Add Employee
      </Button>

    </Form>
  );
}