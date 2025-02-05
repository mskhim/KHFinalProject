import { Container, Table } from "react-bootstrap";
import "./include/css/Common.css";

const ManagerManage = () => {
  //객체배열변수
  const item = [
    {
      no: 1,
      nickname: "서울",
      id: "seoul",
      pwd: 1234,
      phone: "010-1111-1111",
      reg_date: "2025-02-05",
    },
    {
      no: 2,
      nickname: "경기도",
      id: "gyeonggi",
      pwd: 1234,
      phone: "010-2222-2222",
      reg_date: "2025-02-05",
    },
    {
      no: 3,
      nickname: "인천",
      id: "incheon",
      pwd: 1234,
      phone: "010-3333-3333",
      reg_date: "2025-02-05",
    },
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
            <th className="text-bg-primary">NO.</th>
            <th className="text-bg-primary">담당자</th>
            <th className="text-bg-primary">아이디</th>
            <th className="text-bg-primary">비밀번호</th>
            <th className="text-bg-primary">전화번호</th>
            <th className="text-bg-primary">계정 생성일</th>
          </tr>
        </thead>
        <tbody>
          {item.map((data, index) => (
            <tr key={data.id}>
              <td>{data.no}</td>
              <td>{data.nickname}</td>
              <td>{data.id}</td>
              <td>{data.pwd}</td>
              <td>{data.phone}</td>
              <td>{data.reg_date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ManagerManage;
