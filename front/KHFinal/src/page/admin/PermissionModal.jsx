import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const PermissionModal = ({ show, onHide, onAddPermission }) => {
  const [newPermission, setNewPermission] = useState("");

  const handleAdd = () => {
    onAddPermission(newPermission);
    setNewPermission("");
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>권한 추가</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>추가할 권한을 입력하세요</Form.Label>
          <Form.Control
            type="text"
            placeholder="권한 입력"
            value={newPermission}
            onChange={(e) => setNewPermission(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          닫기
        </Button>
        <Button variant="primary" onClick={handleAdd}>
          추가
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PermissionModal;
