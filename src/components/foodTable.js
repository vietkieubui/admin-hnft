import React, { useState, useEffect } from "react";
import { Table, Modal } from "react-bootstrap";
import { Image, Button, Form, Input } from "antd";

export default function FoodTable() {
  const [dataEdit, setDataEdit] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const handleCloseAddModal = () => setShowAddModal(false);
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowAddModal = () => setShowAddModal(true);
  const handleUpdateFood = (data) => {
    //call API
    setShowEditModal(false);
  };

  const handleShowEditModal = (item) => {
    setDataEdit(item);
    setShowEditModal(true);
  };
  const data = [
    {
      id: "47134823195234",
      name: "bun cha 1",
      image:
        "https://delightfulplate.com/wp-content/uploads/2018/08/Vietnamese-Grilled-Pork-Meatballs-with-Vermicelli-Noodles-Bun-Cha-2.jpg",
      price: 30000,
    },
    {
      id: "47134823195235",
      name: "bun cha 2",
      image:
        "https://delightfulplate.com/wp-content/uploads/2018/08/Vietnamese-Grilled-Pork-Meatballs-with-Vermicelli-Noodles-Bun-Cha-2.jpg",
      price: 40000,
    },
    {
      id: "47134823195233",
      name: "bun cha 3",
      image:
        "https://delightfulplate.com/wp-content/uploads/2018/08/Vietnamese-Grilled-Pork-Meatballs-with-Vermicelli-Noodles-Bun-Cha-2.jpg",
      price: 30000,
    },
    {
      id: "47134823195231",
      name: "bun cha4",
      image:
        "https://delightfulplate.com/wp-content/uploads/2018/08/Vietnamese-Grilled-Pork-Meatballs-with-Vermicelli-Noodles-Bun-Cha-2.jpg",
      price: 30000,
    },
    {
      id: "47134823195212",
      name: "bun cha 6",
      image:
        "https://delightfulplate.com/wp-content/uploads/2018/08/Vietnamese-Grilled-Pork-Meatballs-with-Vermicelli-Noodles-Bun-Cha-2.jpg",
      price: 30000,
    },
  ];
  return (
    <div>
      <Button type="primary" onClick={handleShowAddModal}>
        + Add Food
      </Button>
      <AddModal
        showAddModal={showAddModal}
        handleCloseAddModal={handleCloseAddModal}
      />
      <EditModal
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        handleCloseEditModal={handleCloseEditModal}
        dataEdit={dataEdit}
      />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>
                <Image width={200} src={item.image} />
              </td>
              <td>{item.price}</td>
              <td>
                <button onClick={() => handleShowEditModal(item)}>edit</button>
              </td>
              <td>
                <button>delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

const AddModal = ({ showAddModal = false, handleCloseAddModal }) => {
  return (
    <Modal show={showAddModal} onHide={handleCloseAddModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add Food</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Image"
            name="image"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseAddModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCloseAddModal}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const EditModal = ({
  showEditModal,
  setShowEditModal,
  handleCloseEditModal,
  dataEdit,
}) => {
  const [dataSend, setDataSend] = useState({});
  useEffect(() => {
    setDataSend(dataEdit);
  }, [showEditModal]);
  console.log(dataSend);
  const handleUpdateFood = () => {
    setShowEditModal(false);
  };
  return (
    <Modal show={showEditModal} onHide={handleCloseEditModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add Food</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          fields={[
            { name: "id", value: dataSend.id },
            { name: "name", value: dataSend.name },
            { name: "image", value: dataSend.image },
            { name: "price", value: dataSend.price },
          ]}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
            ...dataSend,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="ID"
            name="id"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input
              onChange={(e) =>
                setDataSend({ ...dataSend, name: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item
            label="Image"
            name="image"
            rules={[
              {
                required: true,
                message: "Please input image!",
              },
            ]}
          >
            <Input
              onChange={(e) =>
                setDataSend({ ...dataSend, image: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input price!",
              },
            ]}
          >
            <Input
              onChange={(e) =>
                setDataSend({ ...dataSend, price: e.target.value })
              }
            />
          </Form.Item>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseEditModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdateFood}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
