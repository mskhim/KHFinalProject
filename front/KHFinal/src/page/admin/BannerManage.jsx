import React, { useState } from 'react';
import { Container, Table, Form, Button, Modal } from 'react-bootstrap';
import './include/css/Common.css';
import { BsSortDown, BsSortUp } from 'react-icons/bs';
import { insertBanner, deleteBanner } from './adminApi copy';
import {
  uploadImageToFirebase,
  deleteImageFromFirebase,
} from '../../utils/firebaseUtils';

const BannerManage = () => {
  // 객체 배열 변수
  const [items, setItems] = useState([
    {
      no: 1,
      event_name: '2025 해돋이 행사',
      sub_date: '2025-01-01',
    },
    {
      no: 2,
      event_name: '천을산 해맞이',
      sub_date: '2025-01-01',
    },
    {
      no: 3,
      event_name: '해맞이축제',
      sub_date: '2025-01-01',
    },
  ]);

  // 정렬할 컬럼 이름
  const [thName, setthName] = useState('');
  // 정렬 순서
  const [sortOrder, setSortOrder] = useState('asc');

  // 정렬 함수
  const handleSort = (field) => {
    const sortedItems = [...items].sort((a, b) => {
      if (sortOrder === 'asc') {
        if (typeof a[field] === 'number') {
          return a[field] - b[field];
        }
        return a[field].localeCompare(b[field]);
      } else {
        if (typeof a[field] === 'number') {
          return b[field] - a[field];
        }
        return b[field].localeCompare(a[field]);
      }
    });
    setItems(sortedItems);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setthName(field);
  };

  // ✅ 배너 추가 핸들러
  const handleAddBanner = async (e) => {
    e.preventDefault();
    const form = e.target;
    const eventName = form.eventName.value;
    const file = form.file.files[0];
    const subDate = form.subDate.value;

    if (!eventName || !file || !subDate) {
      alert('모든 필드를 입력해야 합니다.');
      return;
    }
    try {
      const imageUrl = await uploadImageToFirebase(file, 'banners');
      const formData = { eventName, imageUrl, subDate };
      const success = await insertBanner(formData);

      if (success) {
        alert('배너가 추가되었습니다.');
        // ...배너 목록 갱신 로직...
      }
    } catch (error) {
      console.error('배너 추가 중 오류 발생:', error);
    }
  };

  // ✅ 배너 삭제 핸들러
  const handleDeleteBanner = async (bannerId, imageUrl) => {
    try {
      const success = await deleteBanner(bannerId);

      if (success) {
        await deleteImageFromFirebase(imageUrl);
        alert('배너가 삭제되었습니다.');
        // ...배너 목록 갱신 로직...
      }
    } catch (error) {
      console.error('배너 삭제 중 오류 발생:', error);
    }
  };

  return (
    <Container className="admin-page text-center">
      <Table bordered hover responsive className="admin-table table">
        <thead>
          <tr>
            <th
              className="text-bg-primary text-center"
              onClick={() => handleSort('no')}
              style={{ width: '90px' }}
            >
              NO
              {thName === 'no' &&
                (sortOrder === 'asc' ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center"
              onClick={() => handleSort('event_name')}
              style={{ width: '200px' }}
            >
              축제명
              {thName === 'event_name' &&
                (sortOrder === 'asc' ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center"
              style={{ width: '200px' }}
            >
              파일 경로
            </th>
            <th
              className="text-bg-primary text-center"
              onClick={() => handleSort('sub_date')}
              style={{ width: '200px' }}
            >
              등록일
              {thName === 'sub_date' &&
                (sortOrder === 'asc' ? <BsSortDown /> : <BsSortUp />)}
            </th>
            <th
              className="text-bg-primary text-center"
              style={{ width: '110px', paddingRight: '34px' }}
            >
              추가/수정
            </th>
          </tr>
        </thead>
        <tbody>
          {/* 입력 가능한 빈 행 */}
          <tr>
            <td className="text-center" style={{ width: '90px' }}>
              -
            </td>
            <td style={{ width: '200px' }}>
              <Form.Control
                name="eventName"
                className="admin-table-td text-center"
                type="text"
                placeholder="축제명"
                style={{ border: 'none' }}
              />
            </td>
            <td style={{ width: '200px' }}>
              <Form.Control
                name="file"
                className="admin-table-td text-center"
                type="file"
                placeholder="파일경로"
                style={{ border: 'none' }}
              />
            </td>
            <td style={{ width: '200px' }}>
              <Form.Control
                name="subDate"
                className="admin-table-td text-center"
                type="date"
                style={{ border: 'none' }}
              />
            </td>
            <td style={{ width: '99.5px' }}>
              <Button
                className="btn btn-primary me-2"
                onClick={handleAddBanner}
              >
                추가
              </Button>
            </td>
          </tr>

          {/* 데이터 행 */}
          {items.map((data) => (
            <tr key={data.no}>
              <td className="text-center" style={{ width: '90px' }}>
                {data.no}
              </td>
              <td style={{ width: '200px' }}>
                <Form.Control
                  className="admin-table-td text-center"
                  type="text"
                  defaultValue={data.event_name}
                  style={{ border: 'none' }}
                />
              </td>
              <td style={{ width: '200px' }}>
                <Form.Control
                  className="admin-table-td text-center"
                  type="file"
                  ref={data.url}
                  style={{ border: 'none' }}
                />
              </td>
              <td style={{ width: '200px' }}>
                <Form.Control
                  className="admin-table-td text-center"
                  type="date"
                  defaultValue={data.sub_date}
                  style={{ border: 'none' }}
                />
              </td>
              <td style={{ width: '99.5px' }}>
                <Button
                  className="btn btn-danger me-2"
                  onClick={() => handleDeleteBanner(data.no, data.url)}
                >
                  삭제
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* FestivalAuth 모달 */}
    </Container>
  );
};

export default BannerManage;
