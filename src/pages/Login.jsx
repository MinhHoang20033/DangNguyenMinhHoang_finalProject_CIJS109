import { Card, Form, Input, Button, message } from "antd";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const onFinish = (values) => {
    const success = login(

        values.username,
        values.password
    );
    
    if (success) {
        navigate("/projects");
    } else {

        message.error("Login failed");
    }

};



  return (

    <Card
      title="Project Manager Login"
      style={{
        width: 350,
        margin: "120px auto"
      }}
    >

      <Form onFinish={onFinish}>

        <Form.Item name="username">
          <Input placeholder="username" />
        </Form.Item>

        <Form.Item name="password">
          <Input.Password placeholder="password" />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          block
        >
          Login
        </Button>

      </Form>

    </Card>
  );
}