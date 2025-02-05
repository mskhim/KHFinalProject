import { Container, Table, Form } from "react-bootstrap";
import "./include/css/Common.css";
import { BsSortDown, BsSortUp } from "react-icons/bs";

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
    {
      no: 3,
      nickname: "인천",
      id: "incheon",
      pwd: 1234,
      phone: "010-3333-3333",
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
    {
      no: 3,
      nickname: "인천",
      id: "incheon",
      pwd: 1234,
      phone: "010-3333-3333",
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
    {
      no: 3,
      nickname: "인천",
      id: "incheon",
      pwd: 1234,
      phone: "010-3333-3333",
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
    {
      no: 3,
      nickname: "인천",
      id: "incheon",
      pwd: 1234,
      phone: "010-3333-3333",
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
    {
      no: 3,
      nickname: "인천",
      id: "incheon",
      pwd: 1234,
      phone: "010-3333-3333",
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
    {
      no: 3,
      nickname: "인천",
      id: "incheon",
      pwd: 1234,
      phone: "010-3333-3333",
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
    {
      no: 3,
      nickname: "인천",
      id: "incheon",
      pwd: 1234,
      phone: "010-3333-3333",
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
      <div className="justify-content-end d-flex mb-3">
        <button className="btn btn-danger">삭제</button>
      </div>

      <Table bordered hover responsive className="admin-table">
        <thead>
          <tr>
            <th className="text-bg-primary text-center">
              <Form.Check />
            </th>
            <th className="text-bg-primary text-center">NO</th>
            <th className="text-bg-primary text-center">담당자</th>
            <th className="text-bg-primary text-center">아이디</th>
            <th className="text-bg-primary text-center">비밀번호</th>
            <th className="text-bg-primary text-center">전화번호</th>
            <th className="text-bg-primary text-center">계정 생성일</th>
            <th className="text-bg-primary text-center">추가/수정</th>
          </tr>
        </thead>
        <tbody>
          {/* 입력 가능한 빈 행 */}
          <tr>
            <td className="text-center">
              <Form.Check />
            </td>
            <td className="text-center">-</td>
            <td>
              <Form.Control
                className=" text-center"
                type="text"
                placeholder="담당자"
              />
            </td>
            <td>
              <Form.Control
                className=" text-center"
                type="text"
                placeholder="아이디"
              />
            </td>
            <td>
              <Form.Control
                className=" text-center"
                type="text"
                placeholder="비밀번호"
              />
            </td>
            <td>
              <Form.Control
                className="admin-table-td text-center"
                type="text"
                placeholder="전화번호"
              />
            </td>
            <td>
              <Form.Control
                className="admin-table-td text-center"
                type="date"
              />
            </td>
            <td>
              <button className="btn btn-primary me-2">추가</button>
            </td>
          </tr>

          {/* 데이터 행 */}
          {item.map((data) => (
            <tr key={data.id}>
              <td className="text-center">
                <Form.Check />
              </td>
              <td>
                <Form.Control
                  required
                  className="admin-table-td text-center"
                  type="text"
                  placeholder="NO"
                  defaultValue={data.no}
                  variant="none"
                />
              </td>
              <td>
                <Form.Control
                  required
                  className="admin-table-td text-center"
                  type="text"
                  placeholder="담당자"
                  defaultValue={data.nickname}
                  variant="none"
                />
              </td>
              <td>
                <Form.Control
                  required
                  className="admin-table-td text-center"
                  type="text"
                  placeholder="아이디"
                  defaultValue={data.id}
                  variant="none"
                />
              </td>
              <td>
                <Form.Control
                  required
                  className="admin-table-td text-center"
                  type="text"
                  placeholder="비밀번호"
                  defaultValue={data.pwd}
                  variant="none"
                />
              </td>
              <td>
                <Form.Control
                  required
                  className="admin-table-td text-center"
                  type="text"
                  placeholder="전화번호"
                  defaultValue={data.phone}
                />
              </td>
              <td>
                <Form.Control
                  required
                  className="admin-table-td text-center"
                  type="date"
                  placeholder="NO"
                  defaultValue={data.reg_date}
                  variant="none"
                />
              </td>
              <td>
                <button className="btn btn-primary me-2">수정</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ManagerManage;
