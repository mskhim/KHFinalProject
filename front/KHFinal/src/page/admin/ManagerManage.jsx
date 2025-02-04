import { Container, Table } from "react-bootstrap";
import "./include/Common.css";

const ManagerManage = () => {
  //객체배열변수
  const item = [
    { name: "사과", price: 5000 },
    { name: "포도", price: 4000 },
    { name: "망고", price: 3000 },
  ];

  return (
    <Container className="text-center">
      <div className="admin-button-section">
        <button>추가</button>
        <button>삭제</button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="text-bg-primary">아이디</th>
            <th className="text-bg-primary">비밀번호</th>
            <th className="text-bg-primary">관리자</th>
          </tr>
        </thead>
        <tbody>
          {item.map((data, index) => (
            <tr key={data.name}>
              <td>{index}</td>
              <td>{data.name}</td>
              <td>{data.price}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ManagerManage;
